/*=========================================================
                PORTFOLIO JAVASCRIPT - PART 1
=========================================================*/

/*==============================
    MOBILE MENU
==============================*/

const menuIcon = document.querySelector('.menu-icon');
const navbar = document.querySelector('.navbar');

if (menuIcon) {
    menuIcon.onclick = () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    };
}

/*==============================
    STICKY HEADER
==============================*/

window.addEventListener('scroll', () => {

    const header = document.querySelector('.header');

    if (header) {
        header.classList.toggle('sticky', window.scrollY > 100);
    }

});

/*==============================
    ACTIVE NAVIGATION LINK
==============================*/

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');

window.addEventListener('scroll', () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});

/*==============================
    CLOSE MENU AFTER CLICK
==============================*/

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        if (navbar) {

            navbar.classList.remove("active");

        }

        if (menuIcon) {

            menuIcon.classList.remove("bx-x");

        }

    });

});

/*==============================
    SCROLL REVEAL ANIMATION
==============================*/

ScrollReveal({

    reset: false,

    distance: "80px",

    duration: 2000,

    delay: 200

});

ScrollReveal().reveal('.home-content', {

    origin: 'left'

});
ScrollReveal().reveal('.home-image', {
    origin: 'right'
});

ScrollReveal().reveal('.about-content, .skills-container, .projects-container, .contact-container', {
    origin: 'bottom'
});

ScrollReveal().reveal('.section-title', {
    origin: 'top'
});

/*==============================
    TYPING EFFECT
==============================*/

new Typed(".multiple-text", {
    strings: [
        "Python Developer",
        "Data Analytics Enthusiast",
        "Full Stack Learner"
    ],
    typeSpeed: 100,
    backSpeed: 80,
    backDelay: 1200,
    loop: true
});
/*=========================================================
                PORTFOLIO JAVASCRIPT - PART 2
=========================================================*/

/*==============================
    SMOOTH SCROLLING
==============================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});

/*==============================
    BACK TO TOP BUTTON
==============================*/

const backToTop = document.createElement("button");

backToTop.innerHTML = "↑";

backToTop.className = "back-to-top";

document.body.appendChild(backToTop);

window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});

backToTop.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});

/*==============================
    CONTACT FORM VALIDATION
==============================*/

const form = document.querySelector("form");

if (form) {

    form.addEventListener("submit", function(e) {

        const inputs = form.querySelectorAll("input, textarea");

        let valid = true;

        inputs.forEach(input => {

            if (input.value.trim() === "") {

                valid = false;

                input.style.border = "2px solid red";

            } else {

                input.style.border = "";

}

});

if (!valid) {

    e.preventDefault();

    alert("Please fill all fields.");

}

});

}