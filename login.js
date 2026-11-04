
(() => {
  "use strict";

  const $ = id => document.getElementById(id);
  const A = window.CodexAuth;

  if (!A || window.CODEX_USER) return;

  let mode = "login";

  const msg = (text, ok = false) => {
    $("msg").textContent = text;
    $("msg").className = "msg" + (ok ? " ok" : "");
  };

  function setMode(value) {
    mode = value;

    document.querySelectorAll(".tab").forEach(tab => {
      tab.classList.toggle("on", tab.dataset.m === mode);
    });

    document.querySelectorAll(".reg-only").forEach(element => {
      element.hidden = mode !== "register";
    });

    $("title").textContent =
      mode === "login" ? "أهلاً بعودتك 👋" : "أنشئ حسابك المجاني";

    $("submit").textContent =
      mode === "login" ? "تسجيل الدخول" : "إنشاء الحساب";

    $("pw").autocomplete =
      mode === "login" ? "current-password" : "new-password";

    msg("");
  }

  document.querySelectorAll(".tab").forEach(tab => {
    tab.addEventListener("click", () => setMode(tab.dataset.m));
  });

  $("eye").addEventListener("click", () => {
    const show = $("pw").type === "password";
    $("pw").type = show ? "text" : "password";
    $("pw2").type = $("pw").type;
  });

  $("pw").addEventListener("input", () => {
    const password = $("pw").value;

    let level = 0;

    if (password.length >= 8) level++;
    if (password.length >= 12) level++;
    if (/[A-Za-z]/.test(password) && /\d/.test(password)) level++;
    if (/[^A-Za-z0-9]/.test(password)) level++;

    if (password && level === 0) level = 1;

    $("bar").style.setProperty("--w", level * 25 + "%");

    $("bar").style.setProperty(
      "--c",
      ["#fb7185", "#fb7185", "#facc15", "#4ade80", "#22c55e"][level]
    );

    $("barText").textContent = password
      ? ["", "ضعيفة", "مقبولة", "قوية", "قوية جدًا"][level]
      : "8 حروف على الأقل";
  });

  $("form").addEventListener("submit", async event => {
    event.preventDefault();

    const email = $("email").value.trim().toLowerCase();
    const password = $("pw").value;
    const remember = $("remember").checked;
    const button = $("submit");

    button.disabled = true;

    try {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error("اكتب بريد إلكتروني صحيح.");
      }

      if (mode === "register") {
        const name = $("name").value.trim();

        if (name.length < 2) {
          throw new Error("اكتب اسمك (حرفين على الأقل).");
        }

        if (password.length < 8) {
          throw new Error("كلمة المرور لازم تكون 8 حروف على الأقل.");
        }

        if (password !== $("pw2").value) {
          throw new Error("كلمتا المرور مش متطابقتين.");
        }

        await A.register(name, email, password, remember);
      } else {
        if (!password) {
          throw new Error("اكتب كلمة المرور.");
        }

        await A.login(email, password, remember);
      }

      msg("تم بنجاح! جاري التحويل…", true);
      location.replace("index.html");

    } catch (error) {
      msg(error.message || "حصل خطأ غير متوقع، حاول تاني.");
      button.disabled = false;
    }
  });

  // تسجيل الدخول كضيف
  const guestButton = $("guestLogin");

  if (guestButton) {
    guestButton.addEventListener("click", async () => {
      guestButton.disabled = true;

      try {
        await A.guestLogin($("remember").checked);
        msg("تم الدخول كضيف! جاري التحويل…", true);
        location.replace("index.html");
      } catch (error) {
        msg(error.message || "تعذر الدخول كضيف.");
        guestButton.disabled = false;
      }
    });
  }
})();
