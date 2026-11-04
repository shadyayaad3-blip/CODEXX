// CODEX LOADING SCREEN
window.addEventListener("load", () => {
    setTimeout(() => {
        document.getElementById("codex-loader")
            ?.classList.add("hide");
    }, 2300);
});

// ANIMATED CODE BACKGROUND
const background = document.getElementById("code-background");

if (background) {
    const symbols = ["</>", "{ }", "01", "101", "<div>", "CSS", "JS"];

    for (let i = 0; i < 35; i++) {
        const particle = document.createElement("span");

        particle.className = "code-particle";
        particle.textContent = symbols[
            Math.floor(Math.random() * symbols.length)
        ];

        particle.style.left = Math.random() * 100 + "%";
        particle.style.animationDuration = (5 + Math.random() * 10) + "s";
        particle.style.animationDelay = (Math.random() * 8) + "s";

        background.appendChild(particle);
    }
}// =========================
// CODEX FLOATING CODE
// =========================

const codeBackground = document.getElementById("code-background");

if (codeBackground) {
    const symbols = [
        "</>", "{ }", "01", "101",
        "HTML", "CSS", "JS",
        "const", "function", "=>",
        "class", "return", "&&"
    ];

    for (let i = 0; i < 40; i++) {
        const particle = document.createElement("span");

        particle.className = "code-particle";

        particle.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        particle.style.left = Math.random() * 100 + "%";

        particle.style.animationDuration =
            (7 + Math.random() * 12) + "s";

        particle.style.animationDelay =
            (Math.random() * 10) + "s";

        particle.style.fontSize =
            (12 + Math.random() * 12) + "px";

        codeBackground.appendChild(particle);
    }
}

// =========================
// SCROLL REVEAL ANIMATION
// =========================

const revealElements = document.querySelectorAll(
    "section, .card, .course-card, .lesson-card"
);

revealElements.forEach(element => {
    element.classList.add("reveal");
});

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12
});

revealElements.forEach(element => {
    observer.observe(element);
});