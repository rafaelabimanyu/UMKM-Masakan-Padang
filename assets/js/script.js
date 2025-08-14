// main.js
document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // Fungsi Load Komponen Async
  // =========================
  async function loadComponent(url, targetId, callback) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Gagal load ${url}`);
      const html = await res.text();
      const container = document.getElementById(targetId);
      container.innerHTML = html;
      container.classList.remove("skeleton"); // hapus placeholder
      if (callback) callback();
    } catch (err) {
      console.error(err);
      document.getElementById(targetId).innerHTML = `<!-- ${url} gagal dimuat -->`;
    }
  }

  // =========================
  // Daftar Komponen
  // =========================
  const components = [
    { url: "components/navbar.html", target: "navbar-container" },
    { url: "components/hero.html", target: "hero-container", callback: initWAButton },
    { url: "components/menu.html", target: "menu-container" },
    { url: "components/testimoni.html", target: "testimoni-container" },
    { url: "components/statistik.html", target: "statistik-container", callback: initCounter },
    { url: "components/about.html", target: "about-container", callback: () => {
        loadComponent("components/team.html", "team-container");
      }
    },
    { url: "components/contact.html", target: "contact-container" },
    { url: "components/partnerlogos.html", target: "partners-container", callback: initCarousel },
    { url: "components/footer.html", target: "footer-container" }
  ];

  // =========================
  // Load Semua Komponen
  // =========================
  Promise.all(components.map(c => loadComponent(c.url, c.target, c.callback)))
    .then(() => {
      // Init animasi AOS
      if (window.AOS) {
        AOS.init({ duration: 800, once: true });
      }
      // Sembunyikan preloader
      const preloader = document.getElementById("preloader");
      if (preloader) preloader.style.display = "none";
    });

  // =========================
  // WA Floating Button
  // =========================
  function initWAButton() {
    const waButton = document.getElementById("waButton");
    const hero = document.querySelector(".hero");
    if (!hero || !waButton) return;

    const toggleWA = () => {
      const heroBottom = hero.offsetTop + hero.offsetHeight;
      waButton.classList.toggle("show", window.scrollY > heroBottom - 80);
    };

    window.addEventListener("scroll", toggleWA);
    window.addEventListener("load", toggleWA);
  }

  // =========================
  // Statistik Counter
  // =========================
  function initCounter() {
    const counters = document.querySelectorAll(".counter");
    const speed = 200;

    const animate = counter => {
      const target = +counter.dataset.target;
      let count = 0;
      const step = target / speed;

      const update = () => {
        count += step;
        if (count < target) {
          counter.textContent = Math.ceil(count).toLocaleString();
          requestAnimationFrame(update);
        } else {
          counter.textContent = target.toLocaleString();
        }
      };

      update();
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animate(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
  }

  // =========================
  // Carousel Partner Logos
  // =========================
  function initCarousel() {
    const carousel = document.querySelector("#partnerCarousel");
    if (carousel) {
      new bootstrap.Carousel(carousel, { interval: 2000, ride: "carousel" });
    }
  }

});
