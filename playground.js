const byId = id => document.getElementById(id);
const KEY = (window.CODEX_PREFIX || "") + "codex-playground";
const fields = { html: byId("htmlCode"), css: byId("cssCode"), js: byId("jsCode") };
const defaults = { html: fields.html.value, css: fields.css.value, js: fields.js.value };

function loadSaved() {
  try {
    const s = JSON.parse(localStorage.getItem(KEY) || "null");
    if (s && typeof s === "object") for (const k in fields) if (typeof s[k] === "string") fields[k].value = s[k];
  } catch {}
}
function saveCode() {
  try { localStorage.setItem(KEY, JSON.stringify({ html: fields.html.value, css: fields.css.value, js: fields.js.value })); } catch {}
}

// يلتقط console.log و الأخطاء من داخل الـ iframe ويرسلها للصفحة
const bridge =
  '<script>(function(){var s=function(t,a){try{parent.postMessage({codex:1,type:t,text:Array.prototype.map.call(a,function(x){try{return typeof x==="object"?JSON.stringify(x):String(x)}catch(e){return String(x)}}).join(" ")},"*")}catch(e){}};' +
  '["log","info","warn","error"].forEach(function(m){var o=console[m];console[m]=function(){s(m,arguments);o.apply(console,arguments)}});' +
  'window.addEventListener("error",function(e){s("error",[e.message])});})();<\/script>';

function runCode() {
  const html = fields.html.value;
  const css = fields.css.value.replace(/<\/style/gi, "<\\/style");
  const js = fields.js.value.replace(/<\/script/gi, "<\\/script");
  clearConsole();
  const doc =
    '<!doctype html><html><head><meta charset="utf-8"><style>' + css + '</style></head><body>' +
    html + bridge + '<script>' + js + '<\/script></body></html>';
  const fr = byId("result");
  if ("srcdoc" in fr) fr.srcdoc = doc;
  else { if (fr.dataset.u) URL.revokeObjectURL(fr.dataset.u); fr.dataset.u = URL.createObjectURL(new Blob([doc], { type: "text/html" })); fr.src = fr.dataset.u; }
  saveCode();
}

const consoleBox = byId("console");
function clearConsole() {
  consoleBox.innerHTML = "";
  const e = document.createElement("div");
  e.className = "empty";
  e.textContent = "// نتيجة console.log هتظهر هنا";
  consoleBox.appendChild(e);
}
window.addEventListener("message", e => {
  if (e.source !== byId("result").contentWindow) return;
  const d = e.data;
  if (!d || d.codex !== 1) return;
  const empty = consoleBox.querySelector(".empty");
  if (empty) empty.remove();
  const line = document.createElement("div");
  line.className = d.type;
  line.textContent = (d.type === "error" ? "✖ " : d.type === "warn" ? "⚠ " : "› ") + d.text;
  consoleBox.appendChild(line);
  consoleBox.scrollTop = consoleBox.scrollHeight;
});

byId("run").addEventListener("click", runCode);
byId("clearConsole").addEventListener("click", clearConsole);
byId("reset").addEventListener("click", () => {
  if (!confirm("ترجّع الأكواد للنسخة الأصلية؟")) return;
  for (const k in fields) fields[k].value = defaults[k];
  runCode();
});
for (const ta of Object.values(fields)) {
  ta.addEventListener("keydown", e => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") { e.preventDefault(); runCode(); }
    else if (e.key === "Tab" && !e.shiftKey) { // Tab يكتب مسافتين بدل ما يخرج من الخانة
      e.preventDefault();
      const s = ta.selectionStart;
      ta.setRangeText("  ", s, ta.selectionEnd, "end");
    }
  });
}
let timer;
[fields.html, fields.css].forEach(ta => ta.addEventListener("input", () => {
  if (!byId("auto").checked) return;
  clearTimeout(timer); timer = setTimeout(runCode, 600);
}));
loadSaved();
try { // مثال جاي من صفحة الدرس
  const seed = JSON.parse(sessionStorage.getItem("codex-seed") || "null");
  if (seed) { for (const k in fields) fields[k].value = seed[k] || ""; sessionStorage.removeItem("codex-seed"); }
} catch {}
runCode();
