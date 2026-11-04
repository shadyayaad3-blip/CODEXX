// دروس HTML الإضافية (6-8) + معامل الكود التفاعلية. كل شرط: sel (محدد CSS)، min (أقل عدد)، text (أقل طول نص)، attr (خاصية غير فارغة)
window.CODEX_COURSES.html.push(
  ["القوائم", "ul للقوائم النقطية وol للمرقّمة، وكل عنصر داخل الوسم li.", "<ul>\n  <li>HTML</li>\n  <li>CSS</li>\n</ul>\n<ol>\n  <li>افتح الملف</li>\n  <li>اكتب الكود</li>\n</ol>", "أي وسم ينشئ قائمة مرقّمة؟", ["ul", "ol", "li"], 1, "", "", ""],
  ["الجداول", "table للجدول، tr للصف، th لخلية العنوان، وtd لخلية البيانات.", "<table>\n  <tr><th>الاسم</th><th>العمر</th></tr>\n  <tr><td>علي</td><td>20</td></tr>\n</table>", "أي وسم يمثل صفًا في الجدول؟", ["td", "tr", "th"], 1, "", "", ""],
  ["مشروعك الأول: صفحة كاملة", "نجمع كل اللي اتعلمناه في صفحة منظمة: header للرأس، nav للروابط، main للمحتوى، footer للتذييل.", "<header>\n  <h1>موقعي</h1>\n  <nav><a href=\"#\">الرئيسية</a></nav>\n</header>\n<main>\n  <p>أهلاً بكم</p>\n</main>\n<footer>© 2026</footer>", "أي وسم نضع فيه المحتوى الرئيسي للصفحة؟", ["main", "footer", "nav"], 0, "", "", ""]
);
window.CODEX_LABS = { html: [
  { goal: "اكتب عنوانًا رئيسيًا h1 وتحته فقرة p، وفي كل واحد نص.", starter: "<!-- اكتب كودك هنا -->\n",
    checks: [{ label: "عنوان h1 فيه نص", sel: "h1", text: 2 }, { label: "فقرة p فيها نص", sel: "p", text: 2 }] },
  { goal: "اعمل صفحة فيها h1 وعنوان فرعي h2 وفقرتين p.", starter: "<!-- h1 ثم h2 ثم فقرتين -->\n",
    checks: [{ label: "عنوان h1", sel: "h1", text: 2 }, { label: "عنوان فرعي h2", sel: "h2", text: 2 }, { label: "فقرتان p", sel: "p", min: 2, text: 2 }] },
  { goal: "أنشئ رابطًا لموقع ما، بنص واضح وخاصية href.", starter: "<!-- استخدم الوسم a -->\n",
    checks: [{ label: "وسم a فيه نص", sel: "a", text: 2 }, { label: "خاصية href غير فارغة", sel: "a", attr: "href" }] },
  { goal: "أضف صورة بمسار src ووصف alt.", starter: "<!-- استخدم الوسم img -->\n",
    checks: [{ label: "وسم img", sel: "img" }, { label: "خاصية src", sel: "img", attr: "src" }, { label: "خاصية alt (وصف الصورة)", sel: "img", attr: "alt" }] },
  { goal: "ابنِ نموذج تسجيل: label، وخانة بريد، وزر إرسال.", starter: "<!-- label + input type=\"email\" + button -->\n",
    checks: [{ label: "label فيه نص", sel: "label", text: 2 }, { label: "خانة input من نوع email", sel: "input[type=email]" }, { label: "زر button", sel: "button, input[type=submit]" }] },
  { goal: "اعمل قائمة نقطية من 3 عناصر على الأقل، وقائمة مرقّمة من عنصرين.", starter: "<!-- ul و ol -->\n",
    checks: [{ label: "قائمة ul بها 3 عناصر li", sel: "ul > li", min: 3 }, { label: "قائمة ol بها عنصران li", sel: "ol > li", min: 2 }] },
  { goal: "ارسم جدولًا: صف عناوين فيه عمودان، وصفان بيانات.", starter: "<!-- table -->\n",
    checks: [{ label: "وسم table", sel: "table" }, { label: "خليتا عنوان th", sel: "th", min: 2, text: 1 }, { label: "4 خلايا td على الأقل", sel: "td", min: 4, text: 1 }] },
  { goal: "مشروع: ابنِ صفحة كاملة بـ header (فيه h1 وnav فيه رابطين) وmain وfooter.", starter: "<!-- صفحتك الأولى -->\n",
    checks: [{ label: "header فيه h1", sel: "header h1", text: 2 }, { label: "nav فيه رابطان", sel: "nav a", min: 2, attr: "href" }, { label: "main فيه محتوى", sel: "main", text: 5 }, { label: "footer فيه نص", sel: "footer", text: 2 }] }
] };

// ---- دروس HTML إضافية قبل مشروع الختام ----
window.CODEX_COURSES.html.splice(7, 0,
  ["النص المهم والمائل", "strong يعني نصًا مهمًا (غامق)، وem يعني تشديدًا (مائل). المتصفح وقارئ الشاشة يفهمان الفرق.", "<p>HTML <strong>مهمة</strong> جدًا و<em>سهلة</em>.</p>", "أي وسم يعني نصًا مهمًا؟", ["em", "strong", "br"], 1, "", "", ""],
  ["div و span و class", "div صندوق لتجميع عناصر، وspan لتجميع جزء من نص. والخاصية class تعطي العنصر اسمًا يمكن تنسيقه بـ CSS.", "<div class=\"card\">\n  <h2>عنوان</h2>\n  <p>نص <span class=\"hl\">مميز</span></p>\n</div>", "أي وسم يجمع جزءًا من نص داخل السطر؟", ["div", "span", "section"], 1, "", "", ""],
  ["الأقسام: section و article", "section يقسّم الصفحة لأقسام، وarticle لمحتوى مستقل مثل مقال أو خبر. وفي كل منهما عنوان.", "<section>\n  <h2>آخر المقالات</h2>\n  <article>\n    <h3>مقال 1</h3>\n    <p>ملخص</p>\n  </article>\n</section>", "أي وسم يناسب مقالًا مستقلًا؟", ["article", "nav", "li"], 0, "", "", ""]
);
window.CODEX_LABS.html.splice(7, 0,
  { goal: "اكتب فقرة فيها كلمة مهمة بـ strong وكلمة مشدّدة بـ em.", starter: "<!-- p + strong + em -->\n",
    checks: [{ label: "strong داخل فقرة p", sel: "p strong", text: 2 }, { label: "em داخل فقرة p", sel: "p em", text: 2 }] },
  { goal: "اعمل div بكلاس فيه h2 وفقرة، وداخل الفقرة span بكلاس.", starter: "<!-- div class + span class -->\n",
    checks: [{ label: "div له class", sel: "div[class]" }, { label: "h2 داخل الـ div", sel: "div h2", text: 2 }, { label: "span له class داخل فقرة", sel: "div p span[class]", text: 2 }] },
  { goal: "ابنِ section فيه h2 وarticle، وداخل article عنوان h3 وفقرة.", starter: "<!-- section > article -->\n",
    checks: [{ label: "section فيه h2", sel: "section h2", text: 2 }, { label: "article داخل section", sel: "section article" }, { label: "h3 وفقرة داخل article", sel: "article h3", text: 2 }, { label: "فقرة داخل article", sel: "article p", text: 2 }] }
);

// ---- معامل CSS: الطالب يكتب CSS على HTML ثابت، والفحص على الستايل الفعلي (changed = اختلف عن الافتراضي) ----
window.CODEX_LABS.css = [
  { goal: "غيّر لون النص في الفقرة p وفي العنوان h1.", html: "<h1>عنوان</h1><p>نص تجريبي</p>", starter: "/* اكتب CSS هنا */\n",
    checks: [{ label: "لون p تغيّر", sel: "p", prop: "color", changed: 1 }, { label: "لون h1 تغيّر", sel: "h1", prop: "color", changed: 1 }] },
  { goal: "لوّن العنصر ذو الكلاس card بخلفية (بنقطة)، ولوّن العنصر ذو الـ id بالاسم note (بهاش).", html: "<div class=\"card\">بطاقة</div><p id=\"note\">ملاحظة</p>", starter: "/* .card و #note */\n",
    checks: [{ label: "خلفية .card", sel: ".card", prop: "background-color", changed: 1 }, { label: "لون #note", sel: "#note", prop: "color", changed: 1 }] },
  { goal: "اجعل خلفية الصفحة (body) داكنة ولون النص فاتحًا.", html: "<h1>عنوان</h1><p>نص</p>", starter: "/* body */\n",
    checks: [{ label: "خلفية body", sel: "body", prop: "background-color", changed: 1 }, { label: "لون نص body", sel: "body", prop: "color", changed: 1 }] },
  { goal: "أعطِ الصندوق .box مسافة داخلية padding وخارجية margin وحدًا border.", html: "<div class=\"box\">صندوق</div>", starter: "/* .box */\n",
    checks: [{ label: "padding", sel: ".box", prop: "padding-top", changed: 1 }, { label: "margin", sel: ".box", prop: "margin-top", changed: 1 }, { label: "border (استخدم 1px solid)", sel: ".box", prop: "border-top-width", changed: 1 }] },
  { goal: "رتّب العناصر داخل .row في صف باستخدام Flexbox وأضف بينها مسافة gap.", html: "<div class=\"row\"><span>1</span><span>2</span><span>3</span></div>", starter: "/* .row */\n",
    checks: [{ label: "display: flex", sel: ".row", prop: "display", val: "flex" }, { label: "gap بين العناصر", sel: ".row", prop: "column-gap", changed: 1 }] }
];

// ---- معامل JavaScript: كودك يتشغل في صندوق معزول، وبعدها تُفحص النتيجة (زر "تحقق") ----
window.CODEX_LABS.javascript = [
  { goal: "عرّف ثابتًا باستخدام const اسمه greeting وقيمته نص.", html: "", starter: "// اكتب كودك هنا\n",
    checks: [{ label: "greeting نص غير فارغ", js: "typeof greeting==='string'&&greeting.length>0" }, { label: "استخدمت const", js: "/const\\s+greeting/.test(__code)" }] },
  { goal: "عرّف score بـ let وقيمته 0، ثم غيّرها إلى 10.", html: "", starter: "// let score ...\n",
    checks: [{ label: "استخدمت let", js: "/let\\s+score/.test(__code)" }, { label: "قيمة score النهائية 10", js: "score===10" }] },
  { goal: "عرّف age = 20، واستخدم if لتخزين النص \"adult\" في المتغير result لو age >= 18.", html: "", starter: "let result = \"\";\nlet age = 20;\n// if ...\n",
    checks: [{ label: "استخدمت if", js: "/if\\s*\\(/.test(__code)" }, { label: "result يساوي adult", js: "result==='adult'" }] },
  { goal: "اكتب دالة add(a, b) ترجع مجموع الرقمين.", html: "", starter: "// function add ...\n",
    checks: [{ label: "add دالة", js: "typeof add==='function'" }, { label: "add(2, 3) = 5", js: "add(2,3)===5" }, { label: "add(10, -4) = 6", js: "add(10,-4)===6" }] },
  { goal: "عند الضغط على الزر #btn اكتب أي نص داخل العنصر #out.", html: "<button id=\"btn\">اضغط</button> <p id=\"out\"></p>", starter: "const btn = document.getElementById(\"btn\");\nconst out = document.getElementById(\"out\");\n// btn.addEventListener ...\n",
    checks: [{ label: "الضغط على الزر يكتب نصًا في #out", js: "(function(){var o=document.getElementById('out');o.textContent='';document.getElementById('btn').click();return o.textContent.trim().length>0})()" }] }
];

// ---- CODEX V6.2: توسعة منهج HTML من الأساسيات إلى بناء صفحة متكاملة ----
window.CODEX_COURSES.html.push(
  ["الوسوم الدلالية", "الوسوم الدلالية توضّح معنى أجزاء الصفحة. header لرأس الصفحة، nav للتنقل، main للمحتوى الأساسي، وfooter للتذييل.", "<header>\n  <h1>موقعي</h1>\n  <nav><a href=\"#home\">الرئيسية</a></nav>\n</header>\n<main id=\"home\">\n  <p>المحتوى الرئيسي</p>\n</main>\n<footer>حقوق النشر</footer>", "أكمل وسم المحتوى الرئيسي:\n<_____>\n  <p>أهلاً</p>\n</main>", ["section", "main", "footer"], 1, "أكمل وسم بداية المحتوى الرئيسي:\n<_____>\n  <h1>CODEX</h1>\n</main>", "main", "main"],
  ["الصوت والفيديو", "وسم audio لتشغيل ملف صوتي وvideo للفيديو. الخاصية controls تعرض أزرار التشغيل للمستخدم، وsource يحدد الملف.", "<audio controls>\n  <source src=\"song.mp3\" type=\"audio/mpeg\">\n</audio>\n<video controls width=\"320\">\n  <source src=\"clip.mp4\" type=\"video/mp4\">\n</video>", "أكمل الخاصية التي تظهر أدوات التشغيل:\n<video _____>", ["autoplay", "controls", "muted"], 1, "أكمل الخاصية التي تظهر أزرار الفيديو:\n<video _____>", "controls", "controls"],
  ["تحسين الوصول", "اكتب وصفًا واضحًا للصور في alt، واربط label بحقل الإدخال عن طريق for وid. هذا يساعد المستخدمين وتقنيات المساعدة.", "<label for=\"email\">البريد الإلكتروني</label>\n<input id=\"email\" type=\"email\">\n<img src=\"logo.png\" alt=\"شعار CODEX\">", "أكمل الخاصية التي تصف الصورة:\n<img src=\"logo.png\" _____=\"شعار الموقع\">", ["href", "alt", "for"], 1, "أكمل وصف الصورة:\n<img src=\"photo.jpg\" _____=\"صورة للحديقة\">", "alt", "alt"],
  ["هيكل ملف HTML", "ابدأ المستند بـ !DOCTYPE html، ثم html. داخل head نضع معلومات الصفحة، وداخل body نضع المحتوى الظاهر. meta charset يدعم الحروف العربية.", "<!DOCTYPE html>\n<html lang=\"ar\" dir=\"rtl\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>صفحتي</title>\n</head>\n<body>\n  <h1>أهلاً CODEX</h1>\n</body>\n</html>", "أكمل ترميز الأحرف لدعم العربية:\n<meta charset=\"_____\">", ["ASCII", "UTF-8", "HTML"], 1, "أكمل الترميز الصحيح:\n<meta charset=\"_____\">", "UTF-8", "UTF-8"],
  ["مشروع HTML النهائي", "دلوقتي هتجمع المهارات في صفحة تعريف شخصية: عنوان، صورة بوصف، نبذة، قائمة مهارات، رابط، وقسم تواصل. ركّز على ترتيب العناصر واختيار الوسوم المناسبة.", "<header><h1>اسمي</h1></header>\n<main>\n  <section>\n    <h2>نبذة عني</h2>\n    <p>أتعلم تطوير الويب.</p>\n    <img src=\"me.jpg\" alt=\"صورتي الشخصية\">\n  </section>\n  <section>\n    <h2>مهاراتي</h2>\n    <ul><li>HTML</li><li>CSS</li></ul>\n  </section>\n  <footer><a href=\"mailto:hello@example.com\">تواصل معي</a></footer>\n</main>", "أي وسم نستخدمه لعنصر قائمة داخل ul؟", ["li", "tr", "span"], 0, "أكمل وسم عنصر القائمة:\n<ul>\n  <_____>HTML</li>\n</ul>", "li", "li"]
);
window.CODEX_LABS.html.push(
  { goal: "ابنِ صفحة تستخدم header وnav وmain وfooter، واجعل داخل nav رابطًا واحدًا على الأقل.", starter: "<!-- header + nav + main + footer -->\n", checks: [{ label: "header موجود", sel: "header" }, { label: "nav يحتوي رابطًا", sel: "nav a", attr: "href" }, { label: "main يحتوي محتوى", sel: "main", text: 2 }, { label: "footer يحتوي نصًا", sel: "footer", text: 2 }] },
  { goal: "أضف audio وvideo، ولكل واحد controls وsource له src.", starter: "<!-- audio و video -->\n", checks: [{ label: "audio مع controls", sel: "audio[controls]" }, { label: "source للصوت", sel: "audio source[src]" }, { label: "video مع controls", sel: "video[controls]" }, { label: "source للفيديو", sel: "video source[src]" }] },
  { goal: "أنشئ صورة لها alt، وحقل بريد مرتبطًا بـ label باستخدام for وid.", starter: "<!-- img + label + input -->\n", checks: [{ label: "صورة لها وصف alt", sel: "img[alt]" }, { label: "label مرتبط بحقل", sel: "label[for]" }, { label: "حقل بريد إلكتروني", sel: "input[type=email][id]" }] },
  { goal: "اكتب هيكل مستند HTML كاملًا يحتوي html وhead وbody وmeta charset.", starter: "<!DOCTYPE html>\n<!-- اكتب بقية الهيكل -->\n", checks: [{ label: "عنصر html", sel: "html" }, { label: "عنصر head", sel: "head" }, { label: "عنصر body", sel: "body" }, { label: "ترميز UTF-8", sel: "meta[charset=utf-8]" }] },
  { goal: "المشروع النهائي: أنشئ صفحة شخصية فيها header، وقسما نبذة ومهارات، وصورة بوصف، وقائمة مهارات، ورابط تواصل.", starter: "<!-- ابنِ صفحة التعريف بنفسك -->\n", checks: [{ label: "عنوان داخل header", sel: "header h1", text: 2 }, { label: "قسمان على الأقل", sel: "main section", min: 2 }, { label: "صورة بوصف", sel: "img[alt]" }, { label: "قائمة بها مهارتان", sel: "ul li", min: 2 }, { label: "رابط تواصل", sel: "a[href]", text: 2 }] }
);

// إصلاح التحديات العملية للدروس الإضافية القديمة حتى لا يظهر تحدٍّ بلا إجابة.
Object.assign(window.CODEX_COURSES.html[5], {
  6: "أكمل وسم عنصر القائمة:\n<ul>\n  <_____>HTML</li>\n</ul>", 7: "li"
});
Object.assign(window.CODEX_COURSES.html[6], {
  6: "أكمل وسم صف الجدول:\n<table>\n  <_____><td>CODEX</td></tr>\n</table>", 7: "tr"
});
Object.assign(window.CODEX_COURSES.html[7], {
  6: "أكمل وسم النص المهم:\n<p><_____>مهم</strong></p>", 7: "strong"
});
Object.assign(window.CODEX_COURSES.html[8], {
  6: "أكمل الوسم الذي يجمع جزءًا من النص داخل السطر:\n<p>أنا أتعلم <_____ class=\"highlight\">HTML</span></p>", 7: "span"
});
Object.assign(window.CODEX_COURSES.html[9], {
  6: "أكمل الوسم المناسب لمقال مستقل:\n<_____><h2>عنوان المقال</h2></article>", 7: "article"
});
Object.assign(window.CODEX_COURSES.html[10], {
  6: "أكمل وسم المحتوى الرئيسي:\n<_____><p>محتوى الصفحة</p></main>", 7: "main"
});
