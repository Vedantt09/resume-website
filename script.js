/* ==========================================
   EDIT YOUR SKILL NAMES AND RATINGS HERE
   Rating: 1 = beginner, 5 = excellent
========================================== */

const programmingLanguages = [
  { name: "C", rating: 4 },
  { name: "C++", rating: 4 },
  { name: "Python", rating: 4 },
  { name: "Java", rating: 3 },
  { name: "HTML", rating: 4 },
  { name: "CSS", rating: 4 },
  { name: "JavaScript", rating: 3 },
  { name: "SQL", rating: 4 },
  { name: "Kotlin", rating: 3 }
];

const applications = [
  { name: "VS Code", icon: "fa-code", rating: 4 },
  { name: "Android Studio", icon: "fa-mobile-screen-button", rating: 4 },
  { name: "Git", icon: "fa-code-branch", rating: 3 },
  { name: "MySQL", icon: "fa-database", rating: 4 },
  { name: "Excel", icon: "fa-file-excel", rating: 4 },
  { name: "MS Word", icon: "fa-file-word", rating: 4 },
  { name: "PowerPoint", icon: "fa-file-powerpoint", rating: 4 }
];

const hardwareTechnologies = [
  { name: "Internet of Things (IoT)", icon: "fa-microchip", rating: 3 },
  { name: "Raspberry Pi", icon: "fa-server", rating: 3 }
];

/* ==========================================
   CREATE FIXED, NON-INTERACTIVE STAR RATINGS
   Viewers cannot change ratings by clicking
========================================== */

function createStars(name, rating) {
  const wrapper = document.createElement("div");

  wrapper.className = "stars";
  wrapper.setAttribute("role", "img");
  wrapper.setAttribute(
    "aria-label",
    `${name}: ${rating} out of 5 stars`
  );

  // Prevent pointer interaction with the stars
  wrapper.style.pointerEvents = "none";
  wrapper.style.userSelect = "none";
  wrapper.style.cursor = "default";

  for (let i = 1; i <= 5; i++) {
    const star = document.createElement("span");

    star.className = "star";
    star.textContent = "★";
    star.setAttribute("aria-hidden", "true");

    if (i <= rating) {
      star.classList.add("filled");
    }

    wrapper.appendChild(star);
  }

  return wrapper;
}

/* ==========================================
   DISPLAY PROGRAMMING LANGUAGES
========================================== */

function renderProgrammingLanguages() {
  const container = document.getElementById("programmingSkills");

  if (!container) return;

  container.innerHTML = "";

  programmingLanguages.forEach(skill => {
    const item = document.createElement("div");
    item.className = "skill-item";

    const name = document.createElement("span");
    name.className = "skill-name";
    name.textContent = skill.name;

    item.appendChild(name);
    item.appendChild(createStars(skill.name, skill.rating));

    const rating = document.createElement("span");
    rating.className = "rating-text";
    rating.textContent = `${skill.rating}/5`;

    item.appendChild(rating);
    container.appendChild(item);
  });
}

/* ==========================================
   DISPLAY APPLICATIONS AND SOFTWARE TOOLS
========================================== */

function renderApplications() {
  const container = document.getElementById("applicationsSkills");

  if (!container) return;

  container.innerHTML = "";

  applications.forEach(app => {
    const card = document.createElement("div");
    card.className = "application-card";

    const icon = document.createElement("i");
    icon.className = `fa-solid ${app.icon} application-icon`;
    icon.setAttribute("aria-hidden", "true");

    const name = document.createElement("span");
    name.className = "application-name";
    name.textContent = app.name;

    card.appendChild(icon);
    card.appendChild(name);
    card.appendChild(createStars(app.name, app.rating));

    const rating = document.createElement("span");
    rating.className = "rating-text";
    rating.textContent = `${app.rating}/5`;

    card.appendChild(rating);
    container.appendChild(card);
  });
}

/* ==========================================
   DISPLAY HARDWARE & EMERGING TECHNOLOGIES
========================================== */

function renderHardwareTechnologies() {
  const container = document.getElementById("hardwareSkillsContainer");

  if (!container) return;

  container.innerHTML = "";

  hardwareTechnologies.forEach(item => {
    const card = document.createElement("div");
    card.className = "application-card";

    const icon = document.createElement("i");
    icon.className = `fa-solid ${item.icon} application-icon`;
    icon.setAttribute("aria-hidden", "true");

    const name = document.createElement("span");
    name.className = "application-name";
    name.textContent = item.name;

    card.appendChild(icon);
    card.appendChild(name);
    card.appendChild(createStars(item.name, item.rating));

    const rating = document.createElement("span");
    rating.className = "rating-text";
    rating.textContent = `${item.rating}/5`;

    card.appendChild(rating);
    container.appendChild(card);
  });
}

/* ==========================================
   DOWNLOAD RESUME AS PDF
========================================== */

const downloadButton = document.getElementById("downloadResume");

if (downloadButton) {
  downloadButton.addEventListener("click", () => {
    window.print();
  });
}

/* ==========================================
   CURRENT YEAR IN FOOTER
========================================== */

const yearElement = document.getElementById("currentYear");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

/* ==========================================
   BACK TO TOP BUTTON
========================================== */

const backToTop = document.getElementById("backToTop");

if (backToTop) {
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("visible", window.scrollY > 300);
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

/* ==========================================
   ACTIVE SIDEBAR NAVIGATION
========================================== */

const sections = document.querySelectorAll(".section-anchor");
const navLinks = document.querySelectorAll(".nav-link");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${entry.target.id}`
            );
          });
        }
      });
    },
    {
      rootMargin: "-15% 0px -65% 0px"
    }
  );

  sections.forEach(section => observer.observe(section));
}

/* ==========================================
   INITIALIZE PAGE
========================================== */

renderProgrammingLanguages();
renderApplications();
renderHardwareTechnologies();
