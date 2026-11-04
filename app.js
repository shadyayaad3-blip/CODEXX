(() => {
  const P = window.CODEX_PREFIX || "";
  const read = (key, fallback) => {
    try { return localStorage.getItem(key) ?? fallback; } catch { return fallback; }
  };
  const xp = Number(read(P + "codex-xp", 0)) || 0;
  const completed = ["html", "css", "javascript", "python"].reduce((sum, key) => {
    try {
      const v = JSON.parse(read(P + "codex-progress-" + key, "[]"));
      return sum + (Array.isArray(v) ? new Set(v.filter(Number.isInteger)).size : 0);
    } catch { return sum; }
  }, 0);
  const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  const titles = { html: "HTML", css: "CSS", javascript: "JavaScript", python: "Python" };
  let resume = null;
  document.querySelectorAll(".track").forEach(card => {
    const a = card.querySelector(".track-link"); if (!a) return;
    const key = new URL(a.href).searchParams.get("course");
    let n = 0; try { const v = JSON.parse(read(P + "codex-progress-" + key, "[]")); n = Array.isArray(v) ? new Set(v.filter(Number.isInteger)).size : 0; } catch {}
    const total = ((window.CODEX_COURSES || {})[key] || []).length || 5;
    const bar = document.createElement("div");
    bar.style.cssText = "height:6px;border-radius:9px;background:#383448;overflow:hidden;margin-top:8px";
    const fill = document.createElement("i");
    fill.style.cssText = `display:block;height:100%;width:${Math.min(100, Math.max(0, n / total * 100))}%;background:linear-gradient(90deg,#7845e8,#c084fc)`;
    bar.appendChild(fill);
    card.querySelector(".track-meta").after(bar);
    if (n > 0) a.firstChild.textContent = n >= total ? "راجع المسار " : "كمّل المسار ";
    if (!resume && n > 0 && n < total) resume = key;
  });
  const hero = document.querySelector(".hero-text .btn.primary");
  if (hero && resume) { hero.href = "course.html?course=" + resume; hero.firstChild.textContent = "كمّل " + titles[resume] + " "; }
  try {
    const st = JSON.parse(read(P + "codex-streak", "null")), f = document.querySelector(".streak-float");
    const day = d => d.toLocaleDateString("en-CA"), now = new Date();
    const alive = st && (st.last === day(now) || st.last === day(new Date(now - 864e5)));
    if (f && alive) f.textContent = "🔥 " + st.n + " يوم متتالي";
  } catch {}
  set("totalXP", xp);
  set("statXP", xp);
  set("statDone", completed);
})();
