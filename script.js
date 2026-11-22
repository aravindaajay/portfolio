/*=========================================================
                PORTFOLIO JAVASCRIPT
=========================================================*/

(function () {
    "use strict";

    var reduceMotion = window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /*==============================
        MOBILE MENU
    ==============================*/

    var menuButton = document.querySelector(".menu-icon");
    var navbar = document.querySelector(".navbar");
    var navLinks = document.querySelectorAll("header nav a");

    function setMenu(open) {
        if (!menuButton || !navbar) return;
        navbar.classList.toggle("active", open);
        menuButton.setAttribute("aria-expanded", String(open));
        menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }

    if (menuButton && navbar) {
        menuButton.addEventListener("click", function () {
            setMenu(!navbar.classList.contains("active"));
        });

        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape" && navbar.classList.contains("active")) {
                setMenu(false);
                menuButton.focus();
            }
        });

        window.addEventListener("resize", function () {
            if (window.innerWidth > 860) setMenu(false);
        });
    }

    navLinks.forEach(function (link) {
        link.addEventListener("click", function () { setMenu(false); });
    });

    /*==============================
        ACTIVE NAVIGATION LINK
    ==============================*/

    var sections = document.querySelectorAll("section[id]");

    function updateActiveLink() {
        var current = "home";

        sections.forEach(function (section) {
            if (window.scrollY >= section.offsetTop - 150) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(function (link) {
            link.classList.toggle("active", link.getAttribute("href") === "#" + current);
        });
    }

    window.addEventListener("scroll", updateActiveLink, { passive: true });
    updateActiveLink();

    /*==============================
        SCROLL REVEAL ANIMATION
        (skipped if the library fails to load
         or the visitor prefers reduced motion)
    ==============================*/

    if (typeof ScrollReveal !== "undefined" && !reduceMotion) {
        var sr = ScrollReveal({
            reset: false,
            distance: "60px",
            duration: 1400,
            delay: 150
        });

        sr.reveal(".home-content", { origin: "left" });
        sr.reveal(".home-image", { origin: "right" });
        sr.reveal(".about-container, .skills-container, .projects-container, .learning-container, .education-card, .contact-info, .contact form", { origin: "bottom" });
        sr.reveal(".section-title", { origin: "top" });
    }

    /*==============================
        TYPING EFFECT
    ==============================*/

    if (typeof Typed !== "undefined" && !reduceMotion && document.querySelector(".multiple-text")) {
        new Typed(".multiple-text", {
            strings: [
                "Aspiring Embedded Systems Engineer",
                "Robotics Enthusiast",
                "Edge AI Learner"
            ],
            typeSpeed: 80,
            backSpeed: 50,
            backDelay: 1400,
            loop: true
        });
    }

    /*==============================
        CONTACT FORM
        Opens the visitor's email app with the message filled in.
    ==============================*/

    var form = document.getElementById("contact-form");

    if (form) {
        var note = document.createElement("p");
        note.className = "form-note";
        note.setAttribute("role", "status");
        form.appendChild(note);

        form.addEventListener("submit", function (e) {
            e.preventDefault();

            var fields = form.querySelectorAll("input, textarea");
            var valid = true;

            fields.forEach(function (field) {
                var empty = field.required && field.value.trim() === "";
                field.classList.toggle("invalid", empty);
                if (empty) valid = false;
            });

            if (!valid) {
                note.textContent = "Please fill in your name, email and message.";
                return;
            }

            var name = form.elements.name.value.trim();
            var email = form.elements.email.value.trim();
            var subject = form.elements.subject.value.trim() || "Portfolio contact from " + name;
            var message = form.elements.message.value.trim();

            var body = message + "\n\nFrom: " + name + " (" + email + ")";

            window.location.href = "mailto:aravindaajay4@gmail.com" +
                "?subject=" + encodeURIComponent(subject) +
                "&body=" + encodeURIComponent(body);

            note.textContent = "Opening your email app. If nothing opens, email aravindaajay4@gmail.com directly.";
        });
    }
})();
