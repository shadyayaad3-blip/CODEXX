
(() => {
  "use strict";

  const S = {
    get(key) {
      try {
        return localStorage.getItem(key);
      } catch {
        throw new Error("افتح الموقع باستخدام Live Server أو HTTPS.");
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(key, value);
      } catch {
        throw new Error("تعذر حفظ البيانات على هذا الجهاز.");
      }
    },
    remove(key) {
      try {
        localStorage.removeItem(key);
      } catch {}
    }
  };

  const getUsers = () => {
    try {
      return JSON.parse(S.get("codex-users") || "{}") || {};
    } catch {
      return {};
    }
  };

  const getSession = () => {
    try {
      return sessionStorage.getItem("codex-session") ||
        S.get("codex-session");
    } catch {
      return S.get("codex-session");
    }
  };

  const onLogin = /login\.html$/i.test(location.pathname);
  let id = getSession();
  const users = getUsers();

  let record = id ? users[id] : null;

  if (!record) {
    id = null;
    record = null;
  }

  const user = record
    ? {
        id,
        name: record.name,
        type: record.type || "account"
      }
    : null;

  if (!user && !onLogin) {
    location.replace("login.html");
  }

  if (user && onLogin) {
    location.replace("index.html");
  }

  window.CODEX_USER = user;
  window.CODEX_PREFIX = user ? "u:" + user.id + ":" : "";

  const enc = new TextEncoder();

  const hex = buffer =>
    [...new Uint8Array(buffer)]
      .map(x => x.toString(16).padStart(2, "0"))
      .join("");

  async function hash(password, salt) {
    if (!crypto.subtle) {
      throw new Error("افتح الموقع باستخدام Live Server أو HTTPS.");
    }

    const key = await crypto.subtle.importKey(
      "raw",
      enc.encode(password),
      "PBKDF2",
      false,
      ["deriveBits"]
    );

    const result = await crypto.subtle.deriveBits(
      {
        name: "PBKDF2",
        hash: "SHA-256",
        salt: enc.encode(salt),
        iterations: 120000
      },
      key,
      256
    );

    return hex(result);
  }

  function makeId() {
    const bytes = crypto.getRandomValues(new Uint8Array(16));
    return "guest_" + hex(bytes);
  }

  function startSession(userId, remember = true) {
    try {
      sessionStorage.setItem("codex-session", userId);
    } catch {}

    if (remember) {
      S.set("codex-session", userId);
    } else {
      S.remove("codex-session");
    }
  }

  function currentId() {
    const sessionId = getSession();
    if (!sessionId || !getUsers()[sessionId]) {
      throw new Error("انتهت الجلسة. سجل الدخول مرة أخرى.");
    }
    return sessionId;
  }

  function refreshUser(userId, account) {
    window.CODEX_USER = {
      id: userId,
      name: account.name,
      type: account.type || "account"
    };
    window.CODEX_PREFIX = "u:" + userId + ":";
  }

  window.CodexAuth = {
    async register(name, email, password, remember = true) {
      name = String(name).trim();
      email = String(email).trim().toLowerCase();
      password = String(password);

      if (name.length < 2) {
        throw new Error("اكتب اسمًا من حرفين على الأقل.");
      }
      if (!email || !password) {
        throw new Error("املأ جميع البيانات.");
      }
      if (password.length < 8) {
        throw new Error("كلمة المرور لازم تكون 8 حروف على الأقل.");
      }

      const allUsers = getUsers();

      if (allUsers[email]) {
        throw new Error("الإيميل ده مسجل قبل كده.");
      }

      const salt = hex(crypto.getRandomValues(new Uint8Array(16)));

      allUsers[email] = {
        name,
        email,
        salt,
        hash: await hash(password, salt),
        type: "account",
        created: Date.now()
      };

      S.set("codex-users", JSON.stringify(allUsers));
      startSession(email, remember);
      refreshUser(email, allUsers[email]);
    },

    async login(email, password, remember = true) {
      email = String(email).trim().toLowerCase();

      const allUsers = getUsers();
      const account = allUsers[email];

      if (!account || !account.salt || !account.hash) {
        throw new Error("الإيميل أو كلمة المرور غير صحيحة.");
      }

      const passwordHash = await hash(String(password), account.salt);

      if (passwordHash !== account.hash) {
        throw new Error("الإيميل أو كلمة المرور غير صحيحة.");
      }

      startSession(email, remember);
      refreshUser(email, account);
    },

    async guestLogin(remember = true) {
      const allUsers = getUsers();
      let guestId = S.get("codex-guest-id");
      let guest = guestId ? allUsers[guestId] : null;

      // استعادة نفس حساب الضيف في كل مرة على نفس الجهاز
      if (!guest || guest.type !== "guest") {
        guestId = makeId();
        guest = {
          name: "Guest_" + Math.floor(1000 + Math.random() * 9000),
          type: "guest",
          created: Date.now()
        };

        allUsers[guestId] = guest;
        S.set("codex-users", JSON.stringify(allUsers));
        S.set("codex-guest-id", guestId);
      }

      startSession(guestId, remember);
      refreshUser(guestId, guest);
    },

    async changeName(name) {
      name = String(name).trim();

      if (name.length < 2) {
        throw new Error("اكتب اسمًا من حرفين على الأقل.");
      }

      const userId = currentId();
      const allUsers = getUsers();

      allUsers[userId].name = name;
      S.set("codex-users", JSON.stringify(allUsers));
      refreshUser(userId, allUsers[userId]);
    },

    async changePassword(oldPassword, newPassword) {
      if (String(newPassword).length < 8) {
        throw new Error("كلمة المرور الجديدة 8 حروف على الأقل.");
      }

      const userId = currentId();
      const allUsers = getUsers();
      const account = allUsers[userId];

      if (!account || account.type === "guest") {
        throw new Error("حساب الضيف لا يمتلك كلمة مرور.");
      }

      if (!account.salt || !account.hash) {
        throw new Error("بيانات كلمة المرور غير مكتملة.");
      }

      const oldHash = await hash(String(oldPassword), account.salt);

      if (oldHash !== account.hash) {
        throw new Error("كلمة المرور الحالية غير صحيحة.");
      }

      const salt = hex(crypto.getRandomValues(new Uint8Array(16)));
      account.salt = salt;
      account.hash = await hash(String(newPassword), salt);

      S.set("codex-users", JSON.stringify(allUsers));
    },

    deleteAccount() {
      const userId = currentId();
      const allUsers = getUsers();

      delete allUsers[userId];
      S.set("codex-users", JSON.stringify(allUsers));

      const prefix = "u:" + userId + ":";

      try {
        Object.keys(localStorage)
          .filter(key => key.startsWith(prefix))
          .forEach(key => localStorage.removeItem(key));
      } catch {}

      if (S.get("codex-guest-id") === userId) {
        S.remove("codex-guest-id");
      }

      this.logout();
    },

    logout() {
      // تسجيل الخروج لا يمسح تقدم المستخدم
      try {
        sessionStorage.removeItem("codex-session");
      } catch {}

      S.remove("codex-session");
      window.CODEX_USER = null;
      window.CODEX_PREFIX = "";

      location.replace("login.html");
    }
  };

  if (user && !onLogin) {
    document.addEventListener("DOMContentLoaded", () => {
      const header = document.querySelector(".topbar, header");
      if (!header) return;

      const style = document.createElement("style");
      style.textContent = `
        .codex-user {
          display:flex;
          align-items:center;
          gap:10px;
          font-size:13px;
          color:#e7d9ff;
        }
        .codex-user button {
          background:#292837;
          border:1px solid #444256;
          color:#e6e0f5;
          border-radius:8px;
          padding:6px 12px;
          cursor:pointer;
          font:inherit;
          font-size:12px;
        }
        .codex-user button:hover {
          border-color:#a78bfa;
        }
        .codex-user a {
          color:inherit;
          text-decoration:none;
        }
        @media(max-width:650px) {
          .codex-user a { display:none; }
        }
      `;

      document.head.appendChild(style);

      const box = document.createElement("div");
      box.className = "codex-user";

      const name = document.createElement("a");
      name.href = "profile.html";
      name.textContent = "👤 " + user.name;
      name.title = "حسابي";

      const button = document.createElement("button");
      button.type = "button";
      button.textContent = "تسجيل الخروج";
      button.addEventListener("click", () => {
        window.CodexAuth.logout();
      });

      box.append(name, button);
      header.appendChild(box);
    });
  }
})();
