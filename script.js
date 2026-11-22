/* Portfolio behaviour: mobile menu and active navigation link.
   No external libraries. */

(function () {
    "use strict";

    var toggle = document.querySelector(".menu-toggle");
    var nav = document.getElementById("site-nav");
    var links = Array.prototype.slice.call(document.querySelectorAll(".navbar a"));

    /* ---------- Mobile menu ---------- */

    function setMenu(open) {
        if (!toggle || !nav) return;
        nav.classList.toggle("open", open);
        toggle.setAttribute("aria-expanded", String(open));
        toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }

    if (toggle && nav) {
        toggle.addEventListener("click", function () {
            setMenu(toggle.getAttribute("aria-expanded") !== "true");
        });

        links.forEach(function (link) {
            link.addEventListener("click", function () { setMenu(false); });
        });

        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape" && nav.classList.contains("open")) {
                setMenu(false);
                toggle.focus();
            }
        });

        window.addEventListener("resize", function () {
            if (window.innerWidth > 760) setMenu(false);
        });
    }

    /* ---------- Active link while scrolling ---------- */

    var sections = links
        .map(function (link) {
            var id = link.getAttribute("href").slice(1);
            return document.getElementById(id);
        })
        .filter(Boolean);

    function setActive(id) {
        links.forEach(function (link) {
            var on = link.getAttribute("href") === "#" + id;
            link.classList.toggle("active", on);
            if (on) link.setAttribute("aria-current", "true");
            else link.removeAttribute("aria-current");
        });
    }

    if ("IntersectionObserver" in window && sections.length) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) setActive(entry.target.id);
            });
        }, { rootMargin: "-45% 0px -50% 0px" });

        sections.forEach(function (section) { observer.observe(section); });
    }

    setActive("home");
})();
