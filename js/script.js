document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("mainNav");
  const backTop = document.getElementById("backToTop");

  const onScroll = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 30);
    backTop.classList.toggle("show", window.scrollY > 500);
  };
  window.addEventListener("scroll", onScroll);
  onScroll();

  backTop.addEventListener("click", () => window.scrollTo({top:0, behavior:"smooth"}));

  // Close mobile navigation after clicking a link.
  document.querySelectorAll("#navMenu .nav-link").forEach(link => {
    link.addEventListener("click", () => {
      const menu = document.getElementById("navMenu");
      if (menu.classList.contains("show")) {
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });

  // Project filters
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projects = document.querySelectorAll(".project-item");
  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      const filter = button.dataset.filter;
      projects.forEach(project => {
        project.classList.toggle("hidden", filter !== "all" && project.dataset.category !== filter);
      });
    });
  });

  // Demo contact form validation.
  const form = document.getElementById("contactForm");
  const message = document.getElementById("formMessage");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      message.className = "form-message show";
      message.textContent = "Please complete the required fields correctly.";
      message.style.background = "rgba(255,80,80,.08)";
      message.style.borderColor = "rgba(255,80,80,.2)";
      message.style.color = "#ff9d9d";
      return;
    }
    message.className = "form-message show";
    message.style.background = "";
    message.style.borderColor = "";
    message.style.color = "";
    message.textContent = "Thanks! Your message is ready to be connected to your preferred form service.";
    form.reset();
  });

  // Reveal on scroll
  const revealItems = document.querySelectorAll(".service-card, .project-card, .timeline-card, .stat-card, .process-card, .glass-card");
  revealItems.forEach(item => item.style.transition = "opacity .6s ease, transform .6s ease, border-color .3s ease, box-shadow .3s ease");
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        obs.unobserve(entry.target);
      }
    });
  }, {threshold:0.08});
  revealItems.forEach(item => {
    item.style.opacity = "0";
    item.style.transform = "translateY(18px)";
    observer.observe(item);
  });
});
