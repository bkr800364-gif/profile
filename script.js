/* =========================================================
   BAKR ABDALLAH - PROFESSIONAL PORTFOLIO
   JavaScript
   ========================================================= */


/* =========================================================
   ELEMENTS
   ========================================================= */

const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");

const header = document.querySelector(".header");

const typingText = document.getElementById("typingText");

const scrollTopBtn = document.getElementById("scrollTop");

const yearElement = document.getElementById("year");

const sections = document.querySelectorAll("section[id]");


/* =========================================================
   MOBILE MENU
   ========================================================= */

if (menuBtn && navbar) {

    menuBtn.addEventListener("click", () => {

        const isOpen = navbar.classList.toggle("open");

        menuBtn.textContent = isOpen ? "✕" : "☰";

        menuBtn.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    });

}


/* =========================================================
   CLOSE MENU AFTER CLICKING LINK
   ========================================================= */

navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        if (navbar) {
            navbar.classList.remove("open");
        }

        if (menuBtn) {

            menuBtn.textContent = "☰";

            menuBtn.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });

});


/* =========================================================
   HEADER + SCROLL TOP
   ========================================================= */

function handleScroll() {

    if (header) {

        header.classList.toggle(
            "scrolled",
            window.scrollY > 40
        );

    }


    if (scrollTopBtn) {

        scrollTopBtn.classList.toggle(
            "show",
            window.scrollY > 500
        );

    }

}


window.addEventListener(
    "scroll",
    handleScroll,
    { passive: true }
);

handleScroll();


/* =========================================================
   TYPING EFFECT
   ========================================================= */

if (typingText) {

    const words = [
        "مبرمج محترف",
        "Front-End Developer",
        "Back-End Developer",
        "Web Developer",
        "JavaScript Developer"
    ];

    let wordIndex = 0;

    let charIndex = 0;

    let deleting = false;


    function typeEffect() {

        const currentWord =
            words[wordIndex];


        /* كتابة الكلمة */

        if (!deleting) {

            charIndex += 1;

            typingText.textContent =
                currentWord.slice(
                    0,
                    charIndex
                );


            /* عند انتهاء الكلمة */

            if (
                charIndex ===
                currentWord.length
            ) {

                deleting = true;

                window.setTimeout(
                    typeEffect,
                    1600
                );

                return;
            }

        }


        /* حذف الكلمة */

        else {

            charIndex -= 1;

            typingText.textContent =
                currentWord.slice(
                    0,
                    charIndex
                );


            /* الانتقال للكلمة التالية */

            if (charIndex === 0) {

                deleting = false;

                wordIndex =
                    (wordIndex + 1) %
                    words.length;

            }

        }


        window.setTimeout(
            typeEffect,
            deleting ? 45 : 85
        );

    }


    typeEffect();

}


/* =========================================================
   ACTIVE NAVIGATION
   ========================================================= */

function updateActiveNav() {

    const scrollPosition =
        window.scrollY + 180;


    let currentId = "home";


    sections.forEach((section) => {

        if (
            scrollPosition >=
            section.offsetTop
        ) {

            currentId =
                section.id;

        }

    });


    navLinks.forEach((link) => {

        const href =
            link.getAttribute("href");


        link.classList.toggle(
            "active",
            href === `#${currentId}`
        );

    });

}


window.addEventListener(
    "scroll",
    updateActiveNav,
    { passive: true }
);

updateActiveNav();


/* =========================================================
   SCROLL TO TOP
   ========================================================= */

if (scrollTopBtn) {

    scrollTopBtn.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =========================================================
   CURRENT YEAR
   ========================================================= */

if (yearElement) {

    yearElement.textContent =
        String(
            new Date().getFullYear()
        );

}


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

const revealElements =
    document.querySelectorAll(
        ".skill-card, " +
        ".service-card, " +
        ".stat-card, " +
        ".about-text, " +
        ".contact-box"
    );


if (
    "IntersectionObserver" in window
) {

    const observer =
        new IntersectionObserver(
            (entries, observerInstance) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "revealed"
                            );

                            observerInstance.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(
        (element) => {

            observer.observe(element);

        }
    );

}


/* =========================================================
   CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
   ========================================================= */

document.addEventListener(
    "click",
    (event) => {

        if (
            !navbar ||
            !menuBtn
        ) {
            return;
        }


        if (
            !navbar.classList.contains(
                "open"
            )
        ) {
            return;
        }


        const clickedInsideMenu =
            navbar.contains(event.target);


        const clickedMenuButton =
            menuBtn.contains(event.target);


        if (
            !clickedInsideMenu &&
            !clickedMenuButton
        ) {

            navbar.classList.remove(
                "open"
            );

            menuBtn.textContent = "☰";

            menuBtn.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    }
);


/* =========================================================
   ESCAPE KEY
   ========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key !== "Escape"
        ) {
            return;
        }


        if (
            !navbar ||
            !menuBtn
        ) {
            return;
        }


        navbar.classList.remove(
            "open"
        );

        menuBtn.textContent = "☰";

        menuBtn.setAttribute(
            "aria-expanded",
            "false"
        );

    }
);