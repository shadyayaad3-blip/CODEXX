
(() => {
  "use strict";

  const U = window.CODEX_USER;
  const A = window.CodexAuth;

  if (!U || !A) return;

  const $ = id => document.getElementById(id);
  const P = window.CODEX_PREFIX || "";

  const rd = (key, fallback) => {
    try {
      const value = localStorage.getItem(P + key);
      return value === null ? fallback : value;
    } catch {
      return fallback;
    }
  };

  const msg = (text, ok = false) => {
    $("pmsg").textContent = text;
    $("pmsg").className = "msg" + (ok ? " ok" : "");
  };

  const names = {
    html: "HTML",
    css: "CSS",
    javascript: "JavaScript",
    python: "Python"
  };

  // إخفاء الخصائص غير المتاحة لحساب الضيف
  if (U.type === "guest") {
    $("oldPw").closest(".box").hidden = true;
    $("exp").closest(".box").hidden = true;
  }

  function draw() {
    $("hello").textContent = "أهلاً، " + U.name;
    $("mail").textContent =
      U.type === "guest" ? "حساب ضيف" : U.id;

    $("pXP").textContent = Number(rd("codex-xp", 0)) || 0;

    let total = 0;
    $("courses").innerHTML = "";

    for (const key in names) {
      let count = 0;

      try {
        const data = JSON.parse(
          rd("codex-progress-" + key, "[]")
        );

        count = Array.isArray(data)
          ? new Set(data.filter(Number.isInteger)).size
          : 0;
      } catch {}

      total += count;

      const lessons =
        ((window.CODEX_COURSES || {})[key] || []).length || 5;

      const row = document.createElement("div");
      row.className = "crs";

      const label = document.createElement("span");
      label.textContent = names[key];

      const track = document.createElement("i");
      const fill = document.createElement("b");

      fill.style.width =
        Math.min(100, Math.max(0, count / lessons * 100)) + "%";

      track.appendChild(fill);

      const amount = document.createElement("span");
      amount.textContent = `${count}/${lessons}`;

      row.append(label, track, amount);
      $("courses").appendChild(row);
    }

    $("pDone").textContent = total;

    try {
      const streak = JSON.parse(rd("codex-streak", "null"));
      const date = value => value.toLocaleDateString("en-CA");
      const today = new Date();

      $("pStreak").textContent =
        streak &&
        (streak.last === date(today) ||
         streak.last === date(new Date(today - 864e5)))
          ? streak.n
          : 0;
    } catch {
      $("pStreak").textContent = "0";
    }
  }

  $("saveName").onclick = async () => {
    const name = $("newName").value.trim();

    if (name.length < 2) {
      return msg("اكتب اسمًا من حرفين على الأقل.");
    }

    const button = $("saveName");
    button.disabled = true;

    try {
      await A.changeName(name);
      U.name = name;
      $("hello").textContent = "أهلاً، " + name;
      $("newName").value = "";
      msg("تم تحديث الاسم ✓", true);
    } catch (error) {
      msg(error.message || "حصل خطأ أثناء تحديث الاسم.");
    } finally {
      button.disabled = false;
    }
  };

  if (U.type !== "guest") {
    $("savePw").onclick = async () => {
      const oldPassword = $("oldPw").value;
      const newPassword = $("newPw").value;

      try {
        if (newPassword.length < 8) {
          throw new Error("كلمة المرور الجديدة 8 حروف على الأقل.");
        }

        await A.changePassword(oldPassword, newPassword);

        $("oldPw").value = "";
        $("newPw").value = "";

        msg("تم تغيير كلمة المرور ✓", true);
      } catch (error) {
        msg(error.message || "حصل خطأ، حاول تاني.");
      }
    };

    $("exp").onclick = () => {
      try {
        const output = {};

        Object.keys(localStorage)
          .filter(key => key.startsWith(P))
          .forEach(key => {
            output[key.slice(P.length)] =
              localStorage.getItem(key);
          });

        const blob = new Blob(
          [JSON.stringify(output, null, 2)],
          { type: "application/json" }
        );

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = "codex-progress.json";
        link.click();

        setTimeout(() => URL.revokeObjectURL(url), 2000);
        msg("تم تصدير التقدم ✓", true);
      } catch {
        msg("تعذر تصدير البيانات.");
      }
    };

    $("imp").onchange = async event => {
      const file = event.target.files[0];
      if (!file) return;

      try {
        if (file.size > 2 * 1024 * 1024) {
          throw new Error("حجم الملف أكبر من 2 ميجابايت.");
        }

        const data = JSON.parse(await file.text());

        if (!data || typeof data !== "object" || Array.isArray(data)) {
          throw new Error("الملف غير صالح.");
        }

        const allowed = /^codex-(xp|streak|progress-(html|css|javascript|python))$/;
        let count = 0;

        for (const key of Object.keys(data)) {
          if (!allowed.test(key) || typeof data[key] !== "string") {
            continue;
          }

          if (key.startsWith("codex-progress-")) {
            const parsed = JSON.parse(data[key]);

            if (!Array.isArray(parsed) ||
                !parsed.every(Number.isInteger)) {
              continue;
            }
          }

          if (key === "codex-xp") {
            const xp = Number(data[key]);
            if (!Number.isFinite(xp) || xp < 0) continue;
          }

          localStorage.setItem(P + key, data[key]);
          count++;
        }

        if (!count) {
          throw new Error("لم يتم العثور على بيانات تقدم صالحة.");
        }

        msg(`تم استيراد ${count} عنصر ✓`, true);
        draw();
      } catch (error) {
        msg(error.message || "الملف غير صالح.");
      } finally {
        event.target.value = "";
      }
    };
  }

  $("out").onclick = () => A.logout();

  $("del").onclick = () => {
    if (confirm("هيتم حذف حسابك وتقدمك نهائيًا. متأكد؟")) {
      try {
        A.deleteAccount();
      } catch (error) {
        msg(error.message || "تعذر حذف الحساب.");
      }
    }
  };

  draw();
})();
