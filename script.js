
/* ==========================================
   EDIT YOUR SKILL NAMES AND RATINGS HERE
   Rating: 1 = beginner, 5 = excellent
========================================== */

const programmingLanguages = [
  { name: "C", rating: 3 },
  { name: "C++", rating: 3 },
  { name: "Python", rating: 4 },
  { name: "Java", rating: 3 },
  { name: "HTML", rating: 4 },
  { name: "CSS", rating: 4 },
  { name: "JavaScript", rating: 3 },
  { name: "SQL", rating: 3 },
  { name: "Kotlin", rating: 2 }
];

const applications = [
  { name: "VS Code", icon: "fa-code", rating: 4 },
  { name: "Android Studio", icon: "fa-mobile-screen-button", rating: 3 },
  { name: "Git", icon: "fa-code-branch", rating: 3 },
  { name: "MySQL", icon: "fa-database", rating: 3 },
  { name: "Excel", icon: "fa-file-excel", rating: 4 },
  { name: "MS Word", icon: "fa-file-word", rating: 4 },
  { name: "PowerPoint", icon: "fa-file-powerpoint", rating: 4 },
  { name: "Google Colab", icon: "fa-brain", rating: 3 }
];

/* ==========================================
   GENERATE INTERACTIVE FIVE-STAR RATINGS
========================================== */

function createStars(name, initialRating, type, index) {
  const wrapper = document.createElement("div");
  wrapper.className = "stars";
  wrapper.setAttribute("role", "group");
  wrapper.setAttribute("aria-label", `${name} skill rating`);

  for (let i = 1; i <= 5; i++) {
    const star = document.createElement("button");

    star.type = "button";
    star.className = "star";
    star.innerHTML = "★";
    star.title = `${i} out of 5 stars`;
    star.setAttribute("aria-label", `${i} out of 5 stars`);
    star.setAttribute("aria-pressed", i === initialRating ? "true" : "false");

    if (i <= initialRating) {
      star.classList.add("filled");
    }

    star.addEventListener("click", () => {
      const allStars = wrapper.querySelectorAll(".star");

      allStars.forEach((item, position) => {
        const selected = position < i;

        item.classList.toggle("filled", selected);
        item.setAttribute("aria-pressed", position + 1 === i ? "true" : "false");
      });

      const ratingText = wrapper.parentElement.querySelector(".rating-text");

      if (ratingText) {
        ratingText.textContent = `${i}/5`;
      }

      // Update the corresponding data array.
      if (type === "programming") {
        programmingLanguages[index].rating = i;
      } else {
        applications[index].rating = i;
      }

      console.log(`${name}: ${i}/5`);
    });

    wrapper.appendChild(star);
  }

  return wrapper;
}

/* ==========================================
   DISPLAY PROGRAMMING LANGUAGES
========================================== */

function renderProgrammingLanguages() {
  const container = document.getElementById("programmingSkills");
  container.innerHTML = "";

  programmingLanguages.forEach((skill, index) => {
    const item = document.createElement("div");
    item.className = "skill-item";

    const name = document.createElement("span");
    name.className = "skill-name";
    name.textContent = skill.name;

    item.appendChild(name);

    item.appendChild(
      createStars(skill.name, skill.rating, "programming", index)
    );

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
  container.innerHTML = "";

  applications.forEach((app, index) => {
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

    card.appendChild(
      createStars(app.name, app.rating, "application", index)
    );

    const rating = document.createElement("span");
    rating.className = "rating-text";
    rating.textContent = `${app.rating}/5`;

    card.appendChild(rating);
    container.appendChild(card);
  });
}

/* ==========================================
   DOWNLOAD RESUME AS PDF
========================================== */

document.getElementById("downloadResume").addEventListener("click", () => {
  window.print();
});

/* ==========================================
   CURRENT YEAR IN FOOTER
========================================== */

document.getElementById("currentYear").textContent =
  new Date().getFullYear();

/* ==========================================
   BACK TO TOP BUTTON
========================================== */

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("visible", window.scrollY > 300);
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

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

renderProgrammingLanguages();
renderApplications();
