'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
if (sidebarBtn && sidebar) {
  sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
if (form && formBtn) {
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {

      // check form validation
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }

    });
  }
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// alias map for Indonesian / English page names
const pageAliases = {
  "home": "home",
  "beranda": "home",
  "tentang": "about",
  "tentang saya": "about",
  "about": "about",
  "about me": "about",
  "resume": "home",
  "riwayat": "home",
  "cv": "home",
  "portfolio": "portfolio",
  "portofolio": "portfolio",
  "projek": "portfolio",
  "proyek": "portfolio",
  "project": "portfolio",
  "contact": "contact",
  "kontak": "contact",
  "hubungi": "contact",
  "hubungi saya": "contact"
};

// function to navigate to a target page
const navigateToPage = function (targetPage) {
  const normalizedTarget = pageAliases[targetPage] || targetPage;

  pages.forEach((page) => {
    if (page.dataset.page.toLowerCase() === normalizedTarget) {
      page.classList.add("active");
      page.scrollTop = 0;
    } else {
      page.classList.remove("active");
    }
  });

  // Update navbar links active state
  const navbarLinks = document.querySelectorAll(".navbar-link");
  navbarLinks.forEach((link) => {
    const linkTarget = link.dataset.navLink || link.dataset.navTarget || pageAliases[link.textContent.trim().toLowerCase()] || link.textContent.trim().toLowerCase();
    if (linkTarget === normalizedTarget) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  window.scrollTo(0, 0);
};

// add event to all nav links
navigationLinks.forEach((navLink, linkIndex) => {
  navLink.addEventListener("click", function () {
    const rawText = this.textContent.trim().toLowerCase();
    const targetPage = this.dataset.navLink || this.dataset.navTarget || pageAliases[rawText] || rawText;

    const normalizedTarget = pageAliases[targetPage] || targetPage;
    let pageFound = false;
    for (let p = 0; p < pages.length; p++) {
      if (pages[p].dataset.page.toLowerCase() === normalizedTarget) {
        pageFound = true;
        break;
      }
    }

    if (pageFound) {
      navigateToPage(normalizedTarget);
    } else if (pages[linkIndex]) {
      navigateToPage(pages[linkIndex].dataset.page);
    }
  });
});



// project lightbox
const lightbox = document.getElementById("projectLightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxCategory = document.getElementById("lightboxCategory");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxOverlay = document.querySelector(".lightbox-overlay");

// open lightbox when clicking a project item
const projectItems = document.querySelectorAll(".project-item > a");

projectItems.forEach(function (item) {
  item.addEventListener("click", function (e) {
    e.preventDefault();

    const img = this.querySelector(".project-img img");
    const title = this.querySelector(".project-title");
    const category = this.querySelector(".project-category");

    if (img && lightbox) {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxTitle.textContent = title ? title.textContent : "";
      lightboxCategory.textContent = category ? category.textContent : "";
      lightbox.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  });
});

// close lightbox
function closeLightbox() {
  if (lightbox) {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  }
}

if (lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);
}

if (lightboxOverlay) {
  lightboxOverlay.addEventListener("click", closeLightbox);
}

// close with Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && lightbox && lightbox.classList.contains("active")) {
    closeLightbox();
  }
});