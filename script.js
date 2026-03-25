/* ============================================================
   RISHI GUPTA PORTFOLIO — Interactive Script
   Scroll Reveals · Skill Bars · 3D Tilt · Navigation
   ============================================================ */

// ---- NAV ----
function setActive(el) {
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  el.classList.add('active');
  // Close mobile menu
  document.getElementById('navLinks').classList.remove('open');
}

function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}

// Scroll-based active nav
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 150;
    if (scrollY >= top) current = sec.getAttribute('id');
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
});

// ---- SCROLL REVEAL ----
const revealElements = document.querySelectorAll(
  '.section-header,.about-card,.skill-category,.timeline-item,.poster-card,.canva-card,.edu-card,.cert-card,.achievement-list,.contact-pill,.contact-form'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 100);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// ---- SKILL BARS ----
const barFills = document.querySelectorAll('.bar-fill');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.dataset.width;
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

barFills.forEach(bar => barObserver.observe(bar));

// ---- 3D TILT ON GLASS CARDS ----
document.querySelectorAll('.glass-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const rotateX = y * -8;
    const rotateY = x * 8;
    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px) scale(1.015)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1200px) rotateX(0) rotateY(0) translateY(0) scale(1)';
  });
});

// ---- CONTACT FORM ----
function handleSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  const success = document.getElementById('formSuccess');
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i><span>Sending...</span>';
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = '<i class="fa-solid fa-check"></i><span>Sent!</span>';
    success.classList.add('show');
    setTimeout(() => {
      btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i><span>Send Message</span>';
      btn.disabled = false;
      success.classList.remove('show');
      document.getElementById('contactForm').reset();
    }, 3000);
  }, 1500);
}

// ---- SMOOTH PARALLAX ON BG ORBS ----
window.addEventListener('mousemove', (e) => {
  const mx = (e.clientX / window.innerWidth - 0.5) * 2;
  const my = (e.clientY / window.innerHeight - 0.5) * 2;
  document.querySelectorAll('.orb').forEach((orb, i) => {
    const speed = (i + 1) * 6;
    orb.style.transform += ` translate(${mx * speed}px, ${my * speed}px)`;
  });
});

// ---- IMAGE LIGHTBOX ----
function openLightbox(src, caption) {
  const overlay = document.getElementById('lightboxOverlay');
  const img = document.getElementById('lightboxImg');
  const cap = document.getElementById('lightboxCaption');
  img.src = src;
  img.alt = caption;
  cap.textContent = caption;
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const overlay = document.getElementById('lightboxOverlay');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});
