// Loading Screen Logic
document.addEventListener("DOMContentLoaded", () => {
    const loadingText = document.getElementById("loading-text");
    const mainIcon = document.querySelector(".main-icon");
    const subIcons = document.querySelectorAll(".sub-icons i");
    const designerText = document.getElementById("designer-text");
    const mainPage = document.getElementById("main-page");
    const loadingScreen = document.getElementById("loading-screen");

    function showElement(element, delay = 0) {
        setTimeout(() => {
            element.classList.remove("hidden");
            element.classList.add("fall");
        }, delay);
    }

    // Sequence of animations
    showElement(loadingText, 0);
    showElement(mainIcon, 800);
    subIcons.forEach((icon, idx) => {
        showElement(icon, 1600 + idx * 400);
    });
    showElement(designerText, 2800);

    // Hide loading screen and show main content
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            mainPage.classList.add("visible");
        }, 500);
    }, 4000);
});

/* Typing Effect */
const text = ["UI/UX Designer", "Vibe Coder"];
const typingText = document.querySelector(".typing-text");
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentWord = text[wordIndex];

    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(type, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % text.length;
        setTimeout(type, 500);
    } else {
        setTimeout(type, isDeleting ? 50 : 100);
    }
}

// Add cursor effect via CSS class injection if not present
if (!document.querySelector('#cursor-style')) {
    const style = document.createElement('style');
    style.id = 'cursor-style';
    style.innerHTML = `
        .typing-text::after {
            content: '|';
            color: #000;
            animation: blink 1s infinite;
            margin-left: 5px;
        }
        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// Start typing effect when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(type, 4500); // Start after loading screen
});

// Navbar Active Link on Scroll
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".ul-list li a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.parentElement.classList.remove("active");
        if (link.getAttribute("href").includes(current)) {
            link.parentElement.classList.add("active");
        }
    });
});

// Smooth Scroll for Navigation Links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href");
        const targetSection = document.querySelector(targetId);

        window.scrollTo({
            top: targetSection.offsetTop - 100,
            behavior: "smooth"
        });
    });
});

// Smooth Scroll for Hire Me Button
const hireMeBtn = document.querySelector('.btn-home1');
if (hireMeBtn) {
    hireMeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = hireMeBtn.getAttribute("href");
        const targetSection = document.querySelector(targetId);

        window.scrollTo({
            top: targetSection.offsetTop - 100,
            behavior: "smooth"
        });
    });
}

// Header Scroll Effect
const header = document.querySelector("header");

function toggleHeader() {
    if (window.scrollY > 300) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
}

window.addEventListener("scroll", toggleHeader);
toggleHeader(); // Initial check

// Contact Form Mailto Integration
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = contactForm.querySelector('input[name="user_name"]').value;
        const email = contactForm.querySelector('input[name="user_email"]').value;
        const message = contactForm.querySelector('textarea[name="message"]').value;

        const subject = `Portfolio Contact from ${name}`;
        const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;

        const mailtoLink = `mailto:scientificname05@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;

        window.location.href = mailtoLink;

        // Optional: Reset form after a short delay
        setTimeout(() => {
            contactForm.reset();
        }, 1000);
    });
}