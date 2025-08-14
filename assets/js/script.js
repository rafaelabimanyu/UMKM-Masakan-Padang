// =========================
// Inisialisasi AOS
// =========================
AOS.init({
  duration: 1000,
  once: false
});

// =========================
// Load Komponen via Fetch
// =========================

// navbar
fetch("components/navbar.html")
  .then(response => response.text())
  .then(html => {
    document.getElementById("navbar-container").innerHTML = html;
  })
  .catch(err => console.log("Gagal memuat navbar:", err));

// Hero Section
fetch("components/hero.html")
  .then(response => response.text())
  .then(html => {
    document.getElementById("hero-container").innerHTML = html;

    // Setelah hero dimuat, baru jalankan logika tombol WA
    const waButton = document.getElementById("waButton");
    const heroSection = document.querySelector(".hero");

    function toggleWAButton() {
      const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
      if (window.scrollY > heroBottom - 80) {
        waButton.classList.add("show");
      } else {
        waButton.classList.remove("show");
      }
    }

    window.addEventListener("scroll", toggleWAButton);
    window.addEventListener("load", toggleWAButton);
  })
  .catch(err => console.log("Gagal memuat halaman hero:", err));


// Team Section
fetch("components/team.html")
  .then(response => response.text())
  .then(html => {
    document.getElementById("team-container").innerHTML = html;
  })
  .catch(err => console.log("Gagal memuat halaman team:", err));

// Menu Section
fetch("components/menu.html")
  .then(r => r.text())
  .then(d => {
    document.getElementById("menu-container").innerHTML = d;
  });

// Testimoni Section
fetch("components/testimoni.html")
  .then(r => r.text())
  .then(d => {
    document.getElementById("testimoni-container").innerHTML = d;
  });

// Footer Section
fetch("components/footer.html")
  .then(r => r.text())
  .then(d => {
    document.getElementById("footer-container").innerHTML = d;
  });

// Partner Logos + Carousel
fetch("components/partnerlogos.html")
  .then(r => r.text())
  .then(d => {
    document.getElementById("partners-container").innerHTML = d;

    // Inisialisasi carousel setelah HTML dimasukkan
    const carouselElement = document.querySelector("#partnerCarousel");
    if (carouselElement) {
      new bootstrap.Carousel(carouselElement, {
        interval: 2000,
        ride: "carousel"
      });
    }
  });

// =========================
// Tombol WhatsApp Floating
// =========================
const waButton = document.getElementById("waButton");
const heroSection = document.querySelector(".hero");

function toggleWAButton() {
  const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
  if (window.scrollY > heroBottom - 80) {
    waButton.classList.add("show"); // muncul
  } else {
    waButton.classList.remove("show"); // sembunyi
  }
}

window.addEventListener("scroll", toggleWAButton);
window.addEventListener("load", toggleWAButton);
