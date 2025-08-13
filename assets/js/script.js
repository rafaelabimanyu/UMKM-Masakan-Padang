// Inisialisasi AOS
  AOS.init({
    duration: 1000,
    once: false
  });

  // Ambil elemen
const waButton = document.getElementById('waButton');
const heroSection = document.querySelector('.hero');

// Fungsi cek posisi scroll
function toggleWAButton() {
  const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
  if (window.scrollY > heroBottom - 80) {
    waButton.classList.add('show'); // muncul
  } else {
    waButton.classList.remove('show'); // sembunyi
  }
}

// Jalankan saat scroll & saat load
window.addEventListener('scroll', toggleWAButton);
window.addEventListener('load', toggleWAButton);