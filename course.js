(() => {
"use strict";
const catalog = window.CODEX_COURSES || {};
const params = new URLSearchParams(location.search);
const requested = (params.get("course") || "html").toLowerCase();
const courseKey = Object.prototype.hasOwnProperty.call(catalog, requested) ? requested : "html";
const lessons = catalog[courseKey];
const titles = { html: "HTML", css: "CSS", javascript: "JavaScript", python: "Python" };
const sequence = ["html", "css", "javascript", "python"];
const progressKey = (window.CODEX_PREFIX||"")+`codex-progress-${courseKey}`;
const xpKey = (window.CODEX_PREFIX||"") + "codex-xp";
const XP_PER_LESSON = 20;
const PFX = window.CODEX_PREFIX || "";
const $ = id => document.getElementById(id);

// localStorage قد يكون محظورًا (وضع التصفح الخاص مثلًا) — نتعامل معه بأمان
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : v; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch {} }
};

let completed = loadProgress();
let current = firstUnfinished();
let selected = null;
let xp = Number(store.get(xpKey, 0)) || 0;

function loadProgress() {
  try {
    const v = JSON.parse(store.get(progressKey, "[]"));
    return Array.isArray(v) ? [...new Set(v.filter(n => Number.isInteger(n) && n >= 0 && n < lessons.length))].sort((a, b) => a - b) : [];
  } catch { return []; }
}
function save() { store.set(progressKey, JSON.stringify(completed)); }
function firstUnfinished() {
  const i = lessons.findIndex((_, n) => !completed.includes(n));
  return i < 0 ? lessons.length - 1 : i;
}
function unlocked(i) { return i === 0 || completed.includes(i - 1); }
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
// السطر الأول شرح عربي، والباقي كود يُعرض يسار-لليمين
function setPrompt(textEl, codeEl, str) {
  const lines = String(str).split("\n");
  textEl.textContent = lines[0];
  codeEl.textContent = lines.slice(1).join("\n");
}
function setFeedback(el, text, color) { el.textContent = text; el.style.color = color || ""; }

function highlight(code, lang) {
  const esc = t => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const re = lang === "html"
    ? /(<\/?[\w-]+|\/?>)|("[^"]*")|([\w-]+(?==))/g
    : /(\/\/.*|#(?![0-9a-fA-F]{3,6}\b).*)|("[^"]*"|'[^']*')|\b(const|let|function|return|if|else|for|while|in|def|True|False|range|print|alert|display|flex)\b|(\b\d+(?:px)?\b)|([.#]?[\w-]+(?=\s*\{))/g;
  const cls = lang === "html" ? ["", "t", "s", "a"] : ["", "c", "s", "k", "n", "a"];
  let out = "", last = 0, m;
  while ((m = re.exec(code))) {
    out += esc(code.slice(last, m.index));
    const g = m.slice(1).findIndex(x => x !== undefined) + 1;
    out += `<span class="${cls[g]}">${esc(m[0])}</span>`; last = re.lastIndex;
  }
  return out + esc(code.slice(last));
}
function touchStreak() {
  const day = d => d.toLocaleDateString("en-CA"), now = new Date(), y = new Date(now - 864e5);
  let s; try { s = JSON.parse(store.get(PFX + "codex-streak", "null")); } catch {}
  if (!s || typeof s.n !== "number") s = { last: "", n: 0 };
  if (s.last !== day(now)) { s.n = s.last === day(y) ? s.n + 1 : 1; s.last = day(now); store.set(PFX + "codex-streak", JSON.stringify(s)); }
}
function certificate() {
  const c = document.createElement("canvas"); c.width = 1400; c.height = 990;
  const x = c.getContext("2d"), name = (window.CODEX_USER && window.CODEX_USER.name) || "طالب CODEX";
  const g = x.createLinearGradient(0, 0, 1400, 990); g.addColorStop(0, "#1a1230"); g.addColorStop(1, "#0b0b12");
  x.fillStyle = g; x.fillRect(0, 0, 1400, 990);
  x.strokeStyle = "#9565f5"; x.lineWidth = 6; x.strokeRect(40, 40, 1320, 910);
  x.strokeStyle = "#4a376c"; x.lineWidth = 2; x.strokeRect(62, 62, 1276, 866);
  x.textAlign = "center"; x.direction = "rtl"; x.fillStyle = "#fff";
  const f = (px, w) => x.font = `${w} ${px}px Cairo, Tahoma, sans-serif`;
  f(64, 900); x.fillText("CODEX", 700, 190);
  f(40, 700); x.fillStyle = "#b69aff"; x.fillText("شهادة إتمام مسار", 700, 290);
  f(30, 400); x.fillStyle = "#c9c5d8"; x.fillText("تشهد أكاديمية CODEX بأن", 700, 390);
  f(78, 900); x.fillStyle = "#fff"; x.fillText(name, 700, 510);
  f(32, 400); x.fillStyle = "#c9c5d8"; x.fillText("أتمّ بنجاح جميع دروس وتحديات مسار", 700, 610);
  f(60, 900); x.fillStyle = "#b69aff"; x.direction = "ltr"; x.fillText(titles[courseKey], 700, 710);
  x.direction = "rtl"; f(24, 400); x.fillStyle = "#8d8aa3"; x.fillText(new Date().toLocaleDateString("ar-EG"), 700, 850);
  c.toBlob(b => { const a = document.createElement("a"); a.href = URL.createObjectURL(b); a.download = `CODEX-${courseKey}-certificate.png`; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 2000); });
}
function tryExample() {
  const code = lessons[current][2];
  let seed = { html: "", css: "", js: "" };
  if (courseKey === "html") seed.html = code;
  else if (courseKey === "css") { seed.html = '<div class="box card row menu">\n  <h1>عنوان</h1>\n  <p>نص تجريبي</p>\n  <button>زر</button>\n</div>'; seed.css = code; }
  else { seed.html = '<button id="btn">اضغط هنا</button>'; seed.js = 'const button = document.getElementById("btn");\n' + code; }
  try { sessionStorage.setItem("codex-seed", JSON.stringify(seed)); } catch {}
  location.href = "playground.html";
}

const labs = (window.CODEX_LABS || {})[courseKey] || [];
function labResults(code, checks) {
  const d = new DOMParser().parseFromString(code, "text/html");
  return checks.map(c => {
    const els = [...d.querySelectorAll(c.sel)];
    if (els.length < (c.min || 1)) return false;
    if (c.text && els.filter(e => e.textContent.trim().length >= c.text).length < (c.min || 1)) return false;
    if (c.attr && !els.some(e => (e.getAttribute(c.attr) || "").trim())) return false;
    return true;
  });
}
const LAB_TYPE = courseKey === "css" ? "css" : courseKey === "javascript" ? "js" : "html";
const BASE = '<meta charset="utf-8"><body dir="rtl" style="font-family:Arial,sans-serif;padding:12px;color:#111;background:#fff">';
function evalLab(lab, code) {
  const fr = $("labPreview"), none = lab.checks.map(() => false);
  if (LAB_TYPE === "html") { fr.setAttribute("sandbox", ""); fr.srcdoc = BASE + code; return Promise.resolve(labResults(code, lab.checks)); }
  if (LAB_TYPE === "css") return new Promise(res => {
    fr.setAttribute("sandbox", "allow-same-origin");
    fr.onload = () => { try {
      const d = fr.contentDocument, w = fr.contentWindow, st = d.querySelector("style");
      const val = c => { const el = d.querySelector(c.sel); return el ? w.getComputedStyle(el).getPropertyValue(c.prop) : null; };
      st.disabled = true; const base = lab.checks.map(val); st.disabled = false;
      res(lab.checks.map((c, i) => { const v = val(c); return v !== null && (c.changed ? v !== base[i] : v === c.val); }));
    } catch { res(none); } };
    fr.srcdoc = '<meta charset="utf-8"><body dir="rtl">' + lab.html + "<style>" + code.replace(/<\/style/gi, "<\\/style") + "</style>";
  });
  return new Promise(res => {
    let fin = false;
    const done = r => { if (fin) return; fin = true; removeEventListener("message", h); clearTimeout(t); res(r); };
    const h = e => { if (e.source === fr.contentWindow && e.data && e.data.lab) done(e.data.r.map(Boolean)); };
    const t = setTimeout(() => done(none), 3000);
    addEventListener("message", h);
    fr.setAttribute("sandbox", "allow-scripts");
    const tests = lab.checks.map(c => c.js);
    fr.srcdoc = BASE + lab.html + "<script>" + code.replace(/<\/script/gi, "<\\/script") + "<\/script><script>var __code=" + JSON.stringify(code).replace(/</g, "\\u003c") + ";(function(){var T=" + JSON.stringify(tests).replace(/</g, "\\u003c") + ";var r=T.map(function(t){try{return !!(0,eval)(t)}catch(e){return false}});parent.postMessage({lab:1,r:r},'*')})()<\/script>";
  });
}
async function paintLab(force) {
  const lab = labs[current], code = $("labCode").value, done = completed.includes(current), id = ++labToken;
  let res = lab.checks.map(() => done);
  if (!done) {
    if (LAB_TYPE === "js" && !force) { const fr = $("labPreview"); fr.setAttribute("sandbox", ""); fr.srcdoc = BASE + lab.html; res = lastRes.length === lab.checks.length ? lastRes : res; }
    else { res = await evalLab(lab, code); if (LAB_TYPE === "js") lastRes = res; }
  }
  if (id !== labToken) return false;
  $("labChecks").innerHTML = "";
  lab.checks.forEach((c, i) => { const li = document.createElement("li"); li.className = res[i] ? "ok" : ""; li.textContent = (res[i] ? "✓ " : "○ ") + c.label; $("labChecks").appendChild(li); });
  return res.every(Boolean);
}
let labToken = 0, lastRes = [], labTimer;
function drawLab() {
  const lab = labs[current], done = completed.includes(current);
  $("fillBox").hidden = !!lab; $("labBox").hidden = !lab;
  if (!lab) return;
  $("labGoal").textContent = lab.goal;
  $("labCode").value = lab.starter;
  [$("labCode"), $("labRun"), $("labReset")].forEach(e => e.disabled = done);
  setFeedback($("labFeedback"), done ? "أحسنت! هذا الدرس مكتمل." : "", "#4ade80");
  lastRes = []; paintLab(false);
}
function markDone() {
  if (!completed.includes(current)) {
    completed.push(current); completed.sort((a, b) => a - b); save();
    xp = (Number(store.get(xpKey, xp)) || 0) + XP_PER_LESSON; store.set(xpKey, String(xp)); touchStreak();
  }
  updateProgress(); updateXP(); renderList(); updateDone();
  $("nextBtn").disabled = current === lessons.length - 1;
}

function render() {
  const l = lessons[current];
  const done = completed.includes(current);
  selected = null;

  document.title = `CODEX | ${titles[courseKey]} — ${l[0]}`;
  $("courseTitle").textContent = titles[courseKey] + " من الصفر";
  $("courseSubtitle").textContent = "اتعلم خطوة بخطوة وطبّق بعد كل درس.";
  $("lessonIndex").textContent = `الدرس ${String(current + 1).padStart(2, "0")} من ${lessons.length}`;
  $("lessonTitle").textContent = l[0];
  $("lessonText").textContent = l[1];
  $("lessonCode").innerHTML = highlight(l[2], courseKey);
  $("tryBtn").hidden = courseKey === "python";
  $("languageLabel").textContent = titles[courseKey];

  // الاختبار — ترتيب الخيارات عشوائي حتى لا تكون الإجابة دائمًا في نفس المكان
  setPrompt($("question"), $("questionCode"), l[3]);
  $("options").innerHTML = "";
  setFeedback($("feedback"), "");
  shuffle(l[4].map((_, i) => i)).forEach(orig => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "option" + (done && orig === l[5] ? " correct" : "");
    b.textContent = l[4][orig];
    b.dataset.i = orig;
    b.disabled = done;
    b.addEventListener("click", () => {
      if (completed.includes(current)) return;
      selected = orig;
      [...$("options").children].forEach(x => {
        x.classList.remove("wrong");
        x.classList.toggle("selected", x === b);
      });
    });
    $("options").appendChild(b);
  });
  $("checkBtn").disabled = done;
  $("checkBtn").textContent = done ? "تم اجتياز الاختبار ✓" : "تأكيد الإجابة (اختياري)";

  // التحدي
  setPrompt($("challengePrompt"), $("challengeCode"), l[6]);
  $("challengeInput").value = "";
  $("challengeInput").disabled = done;
  $("runChallenge").disabled = done;
  $("runChallenge").textContent = done ? "تم إنجاز التحدي ✓" : "تحقق من الحل";
  setFeedback($("challengeFeedback"), done ? "أحسنت! هذا الدرس مكتمل." : "", done ? "#4ade80" : "");
  $("hint").hidden = true;
  $("hint").textContent = "";
  $("hintBtn").disabled = done;

  $("prevBtn").disabled = current === 0;
  $("nextBtn").disabled = !done || current === lessons.length - 1;
  drawLab();
  updateProgress(); updateXP(); renderList(); updateDone();
}

function checkQuiz() {
  if (selected === null) { setFeedback($("feedback"), "اختار إجابة الأول.", "#facc15"); return; }
  const correct = lessons[current][5];
  const btns = [...$("options").children];
  if (selected === correct) {
    btns.forEach(b => {
      b.disabled = true;
      b.classList.remove("selected", "wrong");
      b.classList.toggle("correct", Number(b.dataset.i) === correct);
    });
    setFeedback($("feedback"), "إجابة صحيحة! ممتاز 🎉", "#4ade80");
    $("checkBtn").disabled = true;
    $("checkBtn").textContent = "تم اجتياز الاختبار ✓";
    if (!completed.includes(current)) setFeedback($("challengeFeedback"), "دلوقتي نفّذ التحدي العملي عشان تكمل الدرس.", "#c4b5fd");
  } else {
    // لا نكشف الإجابة الصحيحة — نعلّم الاختيار الخاطئ فقط ليحاول الطالب مجددًا
    btns.forEach(b => b.classList.remove("wrong"));
    const picked = btns.find(b => Number(b.dataset.i) === selected);
    if (picked) { picked.classList.remove("selected"); picked.classList.add("wrong"); }
    selected = null;
    setFeedback($("feedback"), "الإجابة مش صحيحة. اختار إجابة تانية وحاول.", "#fb7185");
  }
}

function normalize(s) { return s.trim().replace(/\s+/g, "").toLowerCase(); }

function checkChallenge() {
  const answer = normalize($("challengeInput").value);
  if (!answer) { setFeedback($("challengeFeedback"), "اكتب الجزء الناقص الأول (أو اضغط إظهار تلميح).", "#facc15"); return; }
  const expected = normalize(lessons[current][7]);
  // نقبل أيضًا كتابة الوسم كاملًا مثل <h1> بدل h1
  if (answer === expected || answer === "<" + expected + ">") {
    setFeedback($("challengeFeedback"), `ممتاز! كملت الكود صح، +${XP_PER_LESSON} XP 🏆`, "#4ade80");
    $("runChallenge").disabled = true;
    $("runChallenge").textContent = "تم إنجاز التحدي ✓";
    $("challengeInput").disabled = true;
    $("hintBtn").disabled = true;
    if (!completed.includes(current)) {
      completed.push(current);
      completed.sort((a, b) => a - b);
      save();
      xp = (Number(store.get(xpKey, xp)) || 0) + XP_PER_LESSON;
      store.set(xpKey, String(xp));
      touchStreak();
    }
    updateProgress(); updateXP(); renderList(); updateDone();
    $("nextBtn").disabled = current === lessons.length - 1;
  } else {
    setFeedback($("challengeFeedback"), "مش هي دي التكملة. راجع المثال أو اضغط إظهار تلميح وحاول تاني.", "#facc15");
  }
}

function showHint() {
  $("hint").textContent = "تلميح: ارجع للمثال الموجود في الدرس، وحدد الوسم أو الكلمة التي تكمل نفس الفكرة. التلميح مش هيعرض الإجابة.";
  $("hint").hidden = false;
}

function updateProgress() {
  const p = Math.min(100, Math.round(completed.length / lessons.length * 100));
  $("progressText").textContent = p + "%";
  $("progressFill").style.width = p + "%";
  $("progressCount").textContent = `${Math.min(completed.length, lessons.length)} من ${lessons.length} دروس مكتملة`;
}
function updateXP() { xp = Number(store.get(xpKey, xp)) || 0; $("xp").textContent = xp; }

function updateDone() {
  const all = completed.length === lessons.length;
  $("courseDone").hidden = !all;
  if (!all) return;
  const next = sequence[sequence.indexOf(courseKey) + 1];
  $("doneText").textContent = `أنهيت كل دروس ${titles[courseKey]}. ` + (next ? `الخطوة الجاية: ${titles[next]}.` : "كملت كل المسارات المتاحة، شغل ممتاز!");
  const link = $("nextCourse");
  link.href = next ? `course.html?course=${next}` : "index.html";
  link.textContent = next ? `ابدأ ${titles[next]} ←` : "العودة للرئيسية ←";
}

function renderList() {
  $("lessonList").innerHTML = "";
  lessons.forEach((l, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "lesson-item" + (i === current ? " active" : "") + (completed.includes(i) ? " done" : "");
    b.disabled = !unlocked(i);
    const n = document.createElement("b");
    n.className = "lesson-number";
    n.textContent = completed.includes(i) ? "✓" : unlocked(i) ? i + 1 : "🔒";
    const t = document.createElement("span");
    t.textContent = l[0];
    b.append(n, t);
    b.addEventListener("click", () => { if (unlocked(i)) { current = i; render(); } });
    $("lessonList").appendChild(b);
  });
}

function resetProgress() {
  if (!confirm(`متأكد إنك عايز تمسح تقدمك في ${titles[courseKey]}؟ هيتخصم كمان XP الخاص بالمسار.`)) return;
  const lost = completed.length * XP_PER_LESSON;
  completed = [];
  save();
  xp = Math.max(0, (Number(store.get(xpKey, xp)) || 0) - lost);
  store.set(xpKey, String(xp));
  current = 0;
  render();
}

$("checkBtn").addEventListener("click", checkQuiz);
$("runChallenge").addEventListener("click", checkChallenge);
$("hintBtn").addEventListener("click", showHint);
$("labCode").addEventListener("input", () => { clearTimeout(labTimer); lastRes = []; labTimer = setTimeout(() => paintLab(false), 300); });
$("labReset").addEventListener("click", () => { $("labCode").value = labs[current].starter; lastRes = []; paintLab(false); });
$("labRun").addEventListener("click", async () => {
  setFeedback($("labFeedback"), "جاري الفحص…", "#c4b5fd");
  if (!(await paintLab(true))) { setFeedback($("labFeedback"), "لسه في شروط ناقصة — راجع القائمة فوق.", "#facc15"); return; }
  [$("labCode"), $("labRun"), $("labReset")].forEach(e => e.disabled = true);
  setFeedback($("labFeedback"), `ممتاز! كتبت الكود صح، +${XP_PER_LESSON} XP 🏆`, "#4ade80");
  markDone();
});
$("tryBtn").addEventListener("click", tryExample);
$("certBtn").addEventListener("click", certificate);
$("resetBtn").addEventListener("click", resetProgress);
$("challengeInput").addEventListener("keydown", e => {
  if ((e.ctrlKey || e.metaKey) && e.key === "Enter") { e.preventDefault(); if (!$("runChallenge").disabled) checkChallenge(); }
});
$("prevBtn").addEventListener("click", () => { if (current > 0) { current--; render(); } });
$("nextBtn").addEventListener("click", () => { if (completed.includes(current) && current < lessons.length - 1) { current++; render(); } });
render();
})();
