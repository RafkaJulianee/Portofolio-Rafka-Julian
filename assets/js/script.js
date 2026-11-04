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
  "tentang": "about",
  "tentang saya": "about",
  "about": "about",
  "about me": "about",
  "resume": "resume",
  "riwayat": "resume",
  "cv": "resume",
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

// add event to all nav links
navigationLinks.forEach((navLink, linkIndex) => {
  navLink.addEventListener("click", function () {
    const rawText = this.textContent.trim().toLowerCase();
    const targetPage = this.dataset.navLink || this.dataset.navTarget || pageAliases[rawText] || rawText;

    let pageMatched = false;

    // First try matching targetPage against data-page
    pages.forEach((page) => {
      if (page.dataset.page.toLowerCase() === targetPage) {
        page.classList.add("active");
        pageMatched = true;
      } else {
        page.classList.remove("active");
      }
    });

    // Fallback: match by link index if name did not match directly
    if (!pageMatched && pages[linkIndex]) {
      pages.forEach((page, pageIndex) => {
        if (pageIndex === linkIndex) {
          page.classList.add("active");
        } else {
          page.classList.remove("active");
        }
      });
    }

    // Set active class on navbar buttons
    navigationLinks.forEach(link => link.classList.remove("active"));
    this.classList.add("active");

    window.scrollTo(0, 0);
  });
});