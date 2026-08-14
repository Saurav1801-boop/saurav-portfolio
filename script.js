// ================================
// Saurav Portfolio - JavaScript
// ================================

// 1. Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
});

// Close mobile menu after clicking a navigation link
document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
    });
});

// 2. Typing animation
const typingText = document.getElementById("typingText");

const roles = [
    "Web Developer",
    "Technology Enthusiast",
    "Problem Solver",
    "Continuous Learner"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeRole() {
    const currentRole = roles[roleIndex];

    if (!deleting) {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentRole.length) {
            deleting = true;
            setTimeout(typeRole, 1300);
            return;
        }
    } else {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }
    }

    setTimeout(typeRole, deleting ? 55 : 90);
}

typeRole();

// 3. Dynamic copyright year
document.getElementById("year").textContent = new Date().getFullYear();

// 4. Contact form demo
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();

    formStatus.textContent =
        `Thanks ${name}! Your message has been received in this demo.`;

    contactForm.reset();
});

// 5. Back-to-top button
const topButton = document.getElementById("topButton");

topButton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// 6. Reveal sections as the user scrolls
const revealElements = document.querySelectorAll(
    ".section-heading, .about-card, .stats-card, .skill-card, .project-card, .contact-card, .contact-form"
);

revealElements.forEach((element) => {
    element.classList.add("reveal");
});

const observer = new IntersectionObserver(
    (entries, observerInstance) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observerInstance.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12
    }
);

revealElements.forEach((element) => observer.observe(element));

// 7. Highlight active navigation link while scrolling
const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let currentSection = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute("id");
        }
    });

    navItems.forEach((item) => {
        item.classList.remove("active");

        if (item.getAttribute("href") === `#${currentSection}`) {
            item.classList.add("active");
        }
    });
});
