// Mobile nav toggle
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Close menu when a link is clicked (nice on mobile)
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

// Light / dark mode toggle
const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  document.documentElement.classList.toggle(
    "light-mode",
    document.body.classList.contains("light-mode"),
  );
  themeToggle.textContent = document.body.classList.contains("light-mode")
    ? "☀️"
    : "🌙";

  // brief spin animation on the icon itself
  themeToggle.classList.remove("spin");
  void themeToggle.offsetWidth; // restart the animation even on rapid clicks
  themeToggle.classList.add("spin");
});

// Status bar clock
function tick() {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const clock = document.getElementById("clock");
  if (clock) clock.textContent = `${hh}:${mm}`;
}
tick();
setInterval(tick, 1000 * 30);

// Typing animation for the role text
const typedRole = document.getElementById("typed-role");
const roles = ["Web Developer", "App Developer"];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
  const currentRole = roles[roleIndex];

  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  typedRole.textContent = currentRole.substring(0, charIndex);

  let delay = isDeleting ? 40 : 90;

  if (!isDeleting && charIndex === currentRole.length) {
    delay = 1500; // pause at the end of the word
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 300; // brief pause before typing the next word
  }

  setTimeout(typeLoop, delay);
}

typeLoop();

// Contact form (front-end only — see note below)
const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // NOTE: this form has no backend yet. Wire it up to a service like
  // Formspree, EmailJS, or your own endpoint to actually receive messages.
  alert("Thanks for reaching out! (Form isn't connected to a backend yet.)");
  contactForm.reset();
});
