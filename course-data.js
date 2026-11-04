window.CODEX_COURSES = {
  "html": [
    [
      "يعني إيه HTML؟",
      "HTML هي لغة بناء هيكل صفحة الويب. بنستخدم الوسوم (Tags) عشان نقول للمتصفح ده عنوان وده نص وده زر.",
      "<h1>أهلاً CODEX</h1>\n<p>أول صفحة ليا</p>",
      "أكمل وسم العنوان الرئيسي:\n<_____>مرحبا</h1>",
      [
        "h1",
        "p",
        "img"
      ],
      0,
      "أكمل بداية وسم العنوان:\n<_____>CODEX</h1>",
      "h1",
      "h1"
    ],
    [
      "العناوين والفقرات",
      "العناوين من h1 إلى h6. استخدم h1 للعنوان الرئيسي، وp للفقرات العادية.",
      "<h1>عنوان رئيسي</h1>\n<h2>عنوان فرعي</h2>\n<p>فقرة نصية.</p>",
      "أكمل وسم الفقرة:\n<_____>أتعلم HTML</p>",
      [
        "p",
        "h2",
        "a"
      ],
      0,
      "أكمل وسم الفقرة:\n<_____>أول صفحة</p>",
      "p",
      "p"
    ],
    [
      "الروابط",
      "الوسم a ينشئ رابطًا. الخاصية href تحدد الصفحة أو الموقع الذي سينتقل إليه المستخدم.",
      "<a href=\"https://example.com\">افتح الموقع</a>",
      "أكمل خاصية وجهة الرابط:\n<a _____=\"https://example.com\">افتح</a>",
      [
        "src",
        "href",
        "alt"
      ],
      1,
      "أكمل الخاصية الناقصة:\n<a _____=\"https://example.com\">CODEX</a>",
      "href",
      "href"
    ],
    [
      "الصور",
      "الوسم img يعرض صورة. الخاصية src لمسار الصورة وalt لوصفها عند عدم ظهورها ولمساعدة قارئات الشاشة.",
      "<img src=\"cat.jpg\" alt=\"قطة صغيرة\">",
      "أكمل خاصية مسار الصورة:\n<img _____=\"photo.jpg\" alt=\"صورة\">",
      [
        "href",
        "src",
        "class"
      ],
      1,
      "أكمل خاصية الصورة:\n<img _____=\"logo.png\" alt=\"شعار\">",
      "src",
      "src"
    ],
    [
      "النماذج والمدخلات",
      "النموذج form يجمع بيانات. input ينشئ خانة إدخال، وlabel يوضح للمستخدم المطلوب.",
      "<label for=\"name\">اسمك</label>\n<input id=\"name\" type=\"text\">",
      "أكمل نوع خانة البريد:\n<input type=\"_____\">",
      [
        "text",
        "email",
        "button"
      ],
      1,
      "أكمل نوع خانة البريد:\n<input type=\"_____\">",
      "email",
      "email"
    ]
  ],
  "css": [
    [
      "ما هي CSS؟",
      "CSS مسؤولة عن مظهر الصفحة: الألوان والخطوط والمسافات وترتيب العناصر. يمكن وضعها في ملف منفصل وربطه بـ HTML.",
      "p {\n  color: purple;\n}",
      "أكمل خاصية لون النص:\np {\n  _____: purple;\n}",
      [
        "color",
        "margin",
        "width"
      ],
      0,
      "أكمل الخاصية:\nh1 {\n  _____: red;\n}",
      "color",
      "color"
    ],
    [
      "اختيار العناصر",
      "نستخدم اسم الوسم لاختيار كل العناصر من نوعه، والنقطة لاختيار class، والهاش لاختيار id.",
      ".card {\n  background: #222;\n}",
      "أكمل طريقة اختيار class اسمها card:\n_____.card {\n  background: #222;\n}",
      [
        "#",
        ".",
        "@"
      ],
      1,
      "أكمل المحدد:\n_____box {\n  padding: 10px;\n}",
      ".",
      "."
    ],
    [
      "الألوان والخلفيات",
      "color يغير لون النص، وbackground-color يغير خلفية العنصر. يمكن كتابة الألوان بالاسم أو HEX.",
      "body {\n  color: white;\n  background-color: #111;\n}",
      "أكمل خاصية لون الخلفية:\nbody {\n  _____: black;\n}",
      [
        "font-size",
        "background-color",
        "border"
      ],
      1,
      "أكمل الخاصية:\nbody {\n  _____: #111;\n}",
      "background-color",
      "background-color"
    ],
    [
      "المسافات والحدود",
      "padding مساحة داخل العنصر، وmargin مساحة خارجه، وborder يرسم حدًا حوله.",
      ".box {\n  padding: 12px;\n  margin: 20px;\n  border: 1px solid white;\n}",
      "أكمل خاصية المساحة الخارجية:\n.box {\n  _____: 20px;\n}",
      [
        "padding",
        "margin",
        "color"
      ],
      1,
      "أكمل الخاصية:\n.card {\n  _____: 12px;\n}",
      "margin",
      "margin"
    ],
    [
      "Flexbox",
      "Flexbox يساعد في ترتيب العناصر داخل صف أو عمود. نبدأ غالبًا بـ display:flex ثم نستخدم gap وjustify-content.",
      ".row {\n  display: flex;\n  gap: 12px;\n  justify-content: center;\n}",
      "أكمل تفعيل Flexbox:\n.menu {\n  _____: flex;\n}",
      [
        "display",
        "position",
        "align"
      ],
      0,
      "أكمل الخاصية:\n.row {\n  _____: flex;\n}",
      "display",
      "display"
    ],
    [
      "المحددات المتقدمة",
      "يمكن جمع أكثر من محدد بفاصلة، واستخدام المحددات المركبة لاختيار عنصر داخل عنصر آخر.",
      "h1, h2 {\n  color: steelblue;\n}\n.card p {\n  line-height: 1.7;\n}",
      "أكمل المحدد لاختيار كل p داخل .card:\n.card _____ { color: white; }",
      [
        ">",
        "p",
        "#"
      ],
      1,
      "أكمل المحدد:\n.menu _____ { gap: 10px; }",
      "a",
      "p"
    ],
    [
      "الوراثة والتتابع",
      "بعض خصائص CSS مثل color وfont-family تنتقل غالبًا من العنصر الأب إلى الأبناء. وعند تعارض القواعد، تدخل الأسبقية والتخصص في تحديد النتيجة.",
      "body { color: #222; }\n.card { color: navy; }",
      "أكمل اسم الخاصية التي تحدد لون النص:\nbody { _____: black; }",
      [
        "background",
        "color",
        "padding"
      ],
      1,
      "أكمل الخاصية الموروثة غالبًا:\nbody { _____: Arial; }",
      "font-family",
      "color"
    ],
    [
      "نموذج الصندوق Box Model",
      "كل عنصر يتكون من محتوى ثم padding ثم border ثم margin. استخدم box-sizing:border-box لتسهيل حساب العرض والارتفاع.",
      "* { box-sizing: border-box; }\n.card { width: 300px; padding: 20px; border: 2px solid; }",
      "أكمل المساحة الداخلية حول المحتوى:\n.card { _____: 16px; }",
      [
        "margin",
        "padding",
        "outline"
      ],
      1,
      "أكمل الخاصية التي تضبط طريقة حساب العرض:\n* { box-sizing: _____; }",
      "border-box",
      "content-box"
    ],
    [
      "الخطوط والنصوص",
      "تتحكم font-family في نوع الخط، وfont-size في حجمه، وfont-weight في سمكه، وline-height في المسافة بين السطور.",
      "body {\n  font-family: Arial, sans-serif;\n  font-size: 16px;\n  line-height: 1.6;\n}",
      "أكمل خاصية حجم الخط:\nh1 { _____: 32px; }",
      [
        "font-size",
        "text-align",
        "font-style"
      ],
      0,
      "أكمل خاصية سمك الخط:\nstrong { _____: 700; }",
      "font-weight",
      "font-size"
    ],
    [
      "Display وأنواع العناصر",
      "display يحدد طريقة عرض العنصر. block يأخذ سطرًا، inline يبقى ضمن السطر، وinline-block يجمع بعض خصائصهما.",
      ".tag { display: inline-block; padding: 6px 12px; }\n.hidden { display: none; }",
      "أكمل إخفاء العنصر تمامًا:\n.box { display: _____; }",
      [
        "block",
        "none",
        "flex"
      ],
      1,
      "أكمل عرض العناصر في نفس السطر مع قبول الأبعاد:\n.tag { display: _____; }",
      "inline-block",
      "inline"
    ],
    [
      "Flexbox بمحاذاة العناصر",
      "استخدم display:flex لتفعيل Flexbox، ثم justify-content للمحور الرئيسي وalign-items للمحور المتقاطع.",
      ".navbar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 16px;\n}",
      "أكمل محاذاة العناصر رأسيًا في صف:\n.nav { display:flex; _____: center; }",
      [
        "align-items",
        "text-align",
        "flex-wrap"
      ],
      0,
      "أكمل توزيع العناصر على طرفي الحاوية:\n.nav { justify-content: _____; }",
      "space-between",
      "center"
    ],
    [
      "CSS Grid",
      "Grid مناسب لتقسيم الصفحة إلى صفوف وأعمدة. نفعّله بـ display:grid ونحدد الأعمدة باستخدام grid-template-columns.",
      ".cards {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 20px;\n}",
      "أكمل تفعيل Grid:\n.layout { display: _____; }",
      [
        "grid",
        "flexbox",
        "inline"
      ],
      0,
      "أكمل تقسيم الحاوية إلى عمودين متساويين:\n.grid { grid-template-columns: _____; }",
      "repeat(2, 1fr)",
      "1fr 1fr"
    ],
    [
      "الوحدات والمسافات",
      "px وحدة ثابتة، وrem مرتبطة بحجم خط العنصر الجذر، و% نسبة إلى سياق العنصر. استخدم وحدات مناسبة لتصميم مرن.",
      ".container { width: 90%; max-width: 1100px; margin: 0 auto; }\nh1 { font-size: 2rem; }",
      "أكمل وحدة مرتبطة بحجم خط الجذر:\nh1 { font-size: 2_____; }",
      [
        "px",
        "rem",
        "vh"
      ],
      1,
      "أكمل وحدة نسبة إلى عرض نافذة العرض:\n.hero { min-height: 100_____; }",
      "vh",
      "px"
    ],
    [
      "التصميم المتجاوب Media Queries",
      "Media Queries تسمح بتغيير التصميم حسب عرض الشاشة أو خصائص الجهاز، لتظهر الصفحة بشكل مناسب على الموبايل والكمبيوتر.",
      "@media (max-width: 600px) {\n  .cards { grid-template-columns: 1fr; }\n}",
      "أكمل قاعدة الاستجابة للشاشات الصغيرة:\n@_____ (max-width: 600px) { }",
      [
        "media",
        "keyframes",
        "supports"
      ],
      0,
      "أكمل الخاصية التي تختبر أقصى عرض:\n@media (_____ : 700px) { }",
      "max-width",
      "min-width"
    ],
    [
      "الحالات Pseudo-classes",
      "الحالات مثل :hover و:focus و:active تطبق تنسيقًا عندما يتفاعل المستخدم مع العنصر.",
      "button:hover { transform: translateY(-2px); }\ninput:focus { outline: 2px solid royalblue; }",
      "أكمل الحالة عند مرور المؤشر:\na:_____ { color: red; }",
      [
        "hover",
        "before",
        "root"
      ],
      0,
      "أكمل الحالة عند تركيز المستخدم على الحقل:\ninput:_____ { outline: 2px solid blue; }",
      "focus",
      "active"
    ],
    [
      "العناصر الوهمية Pseudo-elements",
      "::before و::after ينشئان محتوى تجميليًا قبل العنصر أو بعده، وغالبًا يحتاجان إلى خاصية content.",
      ".badge::before {\n  content: \"★\";\n  margin-inline-end: 6px;\n}",
      "أكمل العنصر الوهمي لإضافة محتوى قبل العنصر:\n.title::_____ { content: \"★\"; }",
      [
        "before",
        "hover",
        "focus"
      ],
      0,
      "أكمل الخاصية اللازمة لتوليد المحتوى:\n.item::after { _____: \"!\"; }",
      "content",
      "display"
    ],
    [
      "متغيرات CSS",
      "المتغيرات تساعد على إعادة استخدام القيم. عرّفها غالبًا داخل :root باستخدام -- ثم استدعها عبر var().",
      " :root {\n  --main-color: #7657ff;\n}\nbutton { background: var(--main-color); }",
      "أكمل بداية اسم متغير CSS:\n:root { _____main: purple; }",
      [
        "--",
        "$",
        "@"
      ],
      0,
      "أكمل دالة استدعاء المتغير:\ncolor: _____(--main-color);",
      "var",
      "calc"
    ],
    [
      "التحولات Transitions",
      "transition تجعل تغير الخصائص أكثر سلاسة عند تغير الحالة، مثل hover. حدد الخاصية والمدة ومنحنى الحركة.",
      ".button { transition: transform .2s ease, background .2s ease; }\n.button:hover { transform: scale(1.04); }",
      "أكمل خاصية الحركة السلسة:\n.button { _____: all .2s ease; }",
      [
        "animation",
        "transition",
        "transform"
      ],
      1,
      "أكمل خاصية التكبير:\n.card:hover { _____: scale(1.05); }",
      "transform",
      "transition"
    ],
    [
      "التموضع Position",
      "position:relative يبقي العنصر في التدفق مع السماح بإزاحته. absolute يتموضع نسبة لأقرب أب متموضع، وfixed يثبت بالنسبة للنافذة.",
      ".parent { position: relative; }\n.label { position: absolute; top: 8px; right: 8px; }",
      "أكمل تموضع العنصر بالنسبة لمكانه الأصلي:\n.box { position: _____; }",
      [
        "relative",
        "absolute",
        "fixed"
      ],
      0,
      "أكمل تثبيت شريط أعلى نافذة المتصفح:\n.header { position: _____; top: 0; }",
      "fixed",
      "static"
    ],
    [
      "الظلال والحدود والزوايا",
      "استخدم border لرسم الحدود وborder-radius لتدوير الزوايا وbox-shadow لإضافة ظل حول العنصر.",
      ".panel {\n  border: 1px solid #ddd;\n  border-radius: 14px;\n  box-shadow: 0 8px 24px #0002;\n}",
      "أكمل تدوير زوايا البطاقة:\n.card { _____: 12px; }",
      [
        "border-radius",
        "box-shadow",
        "outline"
      ],
      0,
      "أكمل إضافة ظل:\n.card { _____: 0 4px 12px #0002; }",
      "box-shadow",
      "text-shadow"
    ],
    [
      "مشروع CSS النهائي: بطاقة شخصية",
      "طبّق ما تعلمته لبناء بطاقة شخصية متجاوبة تحتوي على صورة واسم ووصف وروابط. اهتم بالمسافات والألوان وإمكانية القراءة.",
      ".profile {\n  max-width: 360px;\n  margin: 24px auto;\n  padding: 24px;\n  border-radius: 18px;\n  text-align: center;\n  box-shadow: 0 8px 24px #0002;\n}\n@media (max-width: 480px) {\n  .profile { width: 92%; }\n}",
      "أكمل الخاصية لتوسيط النص داخل البطاقة:\n.profile { _____: center; }",
      [
        "text-align",
        "justify-content",
        "align-items"
      ],
      0,
      "أكمل الحد الأقصى لعرض البطاقة:\n.profile { max-_____: 360px; }",
      "width",
      "height"
    ],
  ],
     "javascript": [
  [
    "مقدمة JavaScript",
    "JavaScript لغة برمجة تضيف التفاعل للمواقع. نستخدمها لتغيير المحتوى والاستجابة لأفعال المستخدم.",
    "console.log('Hello CODEX');",
    "أكمل أمر الطباعة:\n_____('Hello CODEX');",
    ["print", "console.log", "write"],
    1,
    "نستخدم console.log لعرض قيمة في وحدة التحكم.",
    "console.log('Welcome');",
    "console.log"
  ],
  [
    "المتغيرات let و const",
    "المتغير يخزن قيمة. استخدم let عندما تتوقع تغيير القيمة، وconst عندما لا تحتاج إلى إعادة إسنادها.",
    "let score = 10;\nconst username = 'Ali';\nscore = 20;",
    "أكمل تعريف متغير يمكن تغيير قيمته:\n_____ score = 10;",
    ["const", "let", "function"],
    1,
    "اختار الكلمة التي تسمح بإعادة إسناد قيمة للمتغير.",
    "let level = 1;",
    "let"
  ],
  [
    "أنواع البيانات",
    "تتعامل JavaScript مع أنواع مثل String للنصوص وNumber للأرقام وBoolean للقيم المنطقية.",
    "const name = 'Mona';\nconst age = 17;\nconst active = true;",
    "ما نوع القيمة 25؟\nconst age = 25;",
    ["String", "Number", "Boolean"],
    1,
    "القيمة 25 رقم وليست نصًا أو true/false.",
    "typeof 25",
    "Number"
  ],
  [
    "العمليات الحسابية",
    "يمكنك استخدام + و- و* و/ لإجراء العمليات الحسابية، و% للحصول على باقي القسمة.",
    "const total = 10 + 5;\nconst remainder = 10 % 3;",
    "أكمل علامة الضرب:\nconst result = 4 _____ 3;",
    ["+", "*", "/"],
    1,
    "علامة الضرب في JavaScript هي النجمة *.",
    "6 * 7",
    "*"
  ],
  [
    "الشروط if و else",
    "تسمح الشروط بتنفيذ كود مختلف حسب نتيجة التعبير المنطقي. استخدم else للحالة الأخرى.",
    "const score = 75;\nif (score >= 50) {\n  console.log('Passed');\n} else {\n  console.log('Try again');\n}",
    "أكمل بداية الشرط:\n_____ (score >= 50) {",
    ["for", "if", "const"],
    1,
    "الكلمة المستخدمة لاتخاذ قرار هي if.",
    "if (age >= 18) { console.log('Adult'); }",
    "if"
  ],
  [
    "المقارنات والقيم المنطقية",
    "تستخدم === للمساواة الصارمة و!== لعدم المساواة، كما تستخدم > و< للمقارنة. ينتج عنها true أو false.",
    "console.log(10 > 5);\nconsole.log(5 === '5');",
    "أكمل عامل المساواة الصارمة:\nconsole.log(5 _____ 5);",
    ["=", "===", "!="],
    1,
    "المساواة الصارمة تتكون من ثلاث علامات يساوي.",
    "10 !== 5",
    "==="
  ],
  [
    "الحلقات for",
    "تكرر الحلقات تنفيذ التعليمات. تستخدم for غالبًا عندما تعرف عدد مرات التكرار.",
    "for (let i = 0; i < 3; i++) {\n  console.log(i);\n}",
    "أكمل بداية حلقة التكرار:\n_____ (let i = 0; i < 3; i++) {",
    ["if", "for", "function"],
    1,
    "الكلمة المستخدمة لإنشاء حلقة التكرار هنا هي for.",
    "for (let i = 1; i <= 5; i++) {}",
    "for"
  ],
  [
    "الحلقات while",
    "تستمر while في التكرار ما دام الشرط صحيحًا. تأكد من تحديث المتغير حتى لا تصبح الحلقة لا نهائية.",
    "let count = 0;\nwhile (count < 3) {\n  console.log(count);\n  count++;\n}",
    "أكمل نوع الحلقة:\n_____ (count < 5) {",
    ["while", "if", "const"],
    0,
    "هذه الحلقة تستمر طالما الشرط صحيح.",
    "while (x > 0) { x--; }",
    "while"
  ],
  [
    "المصفوفات Arrays",
    "المصفوفة تخزن عدة قيم في متغير واحد. يبدأ ترقيم العناصر من الصفر، ويمكن الوصول إليها باستخدام الفهرس.",
    "const colors = ['red', 'blue', 'green'];\nconsole.log(colors[0]);",
    "ما الفهرس الذي يصل إلى أول عنصر؟\ncolors[_____]",
    ["1", "0", "2"],
    1,
    "أول عنصر في المصفوفة رقمه صفر.",
    "const names = ['Ali', 'Mona'];",
    "0"
  ],
  [
    "الدوال Functions",
    "الدالة مجموعة تعليمات يمكن إعادة استخدامها. يمكن أن تستقبل معاملات وتعيد نتيجة باستخدام return.",
    "function add(a, b) {\n  return a + b;\n}\nconsole.log(add(2, 3));",
    "أكمل تعريف الدالة:\n_____ add(a, b) {",
    ["function", "let", "return"],
    0,
    "الكلمة التي تبدأ تعريف الدالة التقليدي هي function.",
    "function greet() { return 'Hi'; }",
    "function"
  ],
  [
    "الكائنات Objects",
    "الكائن يجمع بيانات مرتبطة ببعضها في خصائص وقيم، ويمكن الوصول إلى الخاصية باستخدام النقطة.",
    "const user = {\n  name: 'Ali',\n  age: 17\n};\nconsole.log(user.name);",
    "أكمل الوصول إلى اسم المستخدم:\nconsole.log(user._____);",
    ["age", "name", "user"],
    1,
    "اسم الخاصية التي تخزن الاسم هو name.",
    "const car = { brand: 'Ford' };",
    "name"
  ],
  [
    "اختيار عناصر HTML",
    "يوفر document.querySelector طريقة لاختيار أول عنصر يطابق محدد CSS مثل h1 أو .card أو #menu.",
    "const heading = document.querySelector('h1');\nconsole.log(heading);",
    "أكمل دالة اختيار العنصر:\ndocument._____('h1');",
    ["querySelector", "console.log", "addEvent"],
    0,
    "اسم الدالة هو querySelector.",
    "document.querySelector('.card');",
    "querySelector"
  ],
  [
    "تغيير محتوى الصفحة",
    "يمكن تغيير النص الظاهر داخل عنصر باستخدام textContent. تأكد من اختيار العنصر أولًا.",
    "const title = document.querySelector('h1');\ntitle.textContent = 'Welcome to CODEX';",
    "أكمل الخاصية التي تغير النص:\ntitle._____ = 'Hello';",
    ["innerStyle", "textContent", "value"],
    1,
    "الخاصية المناسبة لتغيير النص هي textContent.",
    "message.textContent = 'Done';",
    "textContent"
  ],
  [
    "الأحداث Events",
    "تسمح addEventListener بتنفيذ دالة عند وقوع حدث، مثل click عند الضغط على زر.",
    "const button = document.querySelector('button');\nbutton.addEventListener('click', () => {\n  console.log('Clicked');\n});",
    "أكمل اسم حدث الضغط:\nbutton.addEventListener('_____', () => {});",
    ["hover", "click", "press"],
    1,
    "اسم حدث الضغط على العنصر هو click.",
    "window.addEventListener('load', () => {});",
    "click"
  ],
  [
    "مشروع JavaScript: عداد",
    "اجمع ما تعلمته لإنشاء عداد يزيد عند الضغط على زر. تحتاج إلى متغير لتخزين الرقم، وعنصر لعرضه، وحدث للضغط.",
    "let count = 0;\nconst button = document.querySelector('button');\nconst output = document.querySelector('p');\nbutton.addEventListener('click', () => {\n  count++;\n  output.textContent = count;\n});",
    "أكمل زيادة العداد بمقدار واحد:\ncount_____",
    ["++", "--", "==="],
    0,
    "عامل الزيادة بمقدار واحد هو ++.",
    "count++;",
    "++"
  ],
  [
    "Python",
    "ما هي Python؟",
    "Python لغة برمجة متعددة الاستخدامات، وتشتهر بوضوح كتابتها.",
    "print(\"Hello CODEX\")",
    "أكمل أمر الطباعة:\n_____(\"Hello CODEX\")",
    ["print", "echo", "show"],
    0,
    "أكمل أمر الطباعة.",
    "print(\"Welcome\")",
    "print"
  ],
  [
    "المتغيرات",
    "المتغير يخزن قيمة.",
    "name = \"Mona\"\nscore = 10",
    "أكمل إسناد القيمة:\nscore _____ 10",
    ["==", "=", "=>"],
    1,
    "علامة إسناد القيمة هي =",
    "level = 1",
    "="
  ],
  [
    "أنواع البيانات",
    "من الأنواع الأساسية النصوص والأعداد والقيم المنطقية.",
    "name = \"Ali\"\nage = 17\nprice = 2.5\nactive = True",
    "أكمل القيمة المنطقية:\nactive = _____",
    ["\"True\"", "17", "True"],
    2,
    "True قيمة منطقية صحيحة.",
    "is_ready = True",
    "True"
  ],
  [
    "الشروط",
    "نستخدم if لاختبار شرط.",
    "if score >= 50:\n    print(\"Passed\")",
    "أكمل بداية الشرط:\n_____ temperature > 30:",
    ["if", "for", "def"],
    0,
    "الكلمة المستخدمة لاختبار الشرط هي if.",
    "if score >= 50:",
    "if"
  ],
  [
    "الحلقات",
    "حلقة for تكرر تنفيذ مجموعة تعليمات.",
    "for number in range(3):\n    print(number)",
    "أكمل حلقة التكرار:\n_____ number in range(3):",
    ["if", "for", "while"],
    1,
    "الكلمة المستخدمة هنا هي for.",
    "for item in range(3):",
    "for"
    ]
  ]
};
    

