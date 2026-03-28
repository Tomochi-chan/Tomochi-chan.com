// =========================================
// TOMOCHI — Main Script
// =========================================

document.addEventListener('DOMContentLoaded', () => {

  // ─── NAV SCROLL ───────────────────────────────────
  const nav = document.getElementById('nav');
  const handleNavScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // ─── MOBILE NAV ───────────────────────────────────
  const navToggle = document.querySelector('.nav-toggle');
  navToggle?.addEventListener('click', () => {
    nav.classList.toggle('mobile-open');
  });

  // Close mobile nav on link click
  document.querySelectorAll('.nav-links a, .nav-cta').forEach(link => {
    link.addEventListener('click', () => nav.classList.remove('mobile-open'));
  });

  // ─── SCROLL REVEAL ────────────────────────────────
  const revealEls = document.querySelectorAll('.reveal, .reveal-up');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings by their index within their parent
        const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal, .reveal-up'));
        const idx = siblings.indexOf(entry.target);
        const delay = Math.min(idx * 80, 400);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  // ─── CATEGORY NAV ACTIVE ON SCROLL ───────────────
  const catNavLinks = document.querySelectorAll('.cat-nav-link');
  const catSections = document.querySelectorAll('.pcat[id]');

  const catObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        catNavLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.3 });

  catSections.forEach(sec => catObserver.observe(sec));

  // Smooth scroll for cat nav links (offset for sticky nav + cat nav)
  catNavLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const id = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      const offset = nav.offsetHeight + 60;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ─── SMOOTH ANCHOR SCROLL ─────────────────────────
  document.querySelectorAll('a[href^="#"]:not(.cat-nav-link)').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const id = anchor.getAttribute('href').slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const navHeight = nav.offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ─── CTA EMAIL FORM ───────────────────────────────
  const ctaForm = document.querySelector('.cta-form');
  const ctaInput = document.querySelector('.cta-input');
  const ctaBtn = ctaForm?.querySelector('.btn-primary');

  ctaBtn?.addEventListener('click', () => {
    const email = ctaInput?.value.trim();
    if (!email || !email.includes('@')) {
      ctaInput.style.borderColor = 'rgba(255, 107, 157, 0.8)';
      ctaInput.focus();
      setTimeout(() => { ctaInput.style.borderColor = ''; }, 2000);
      return;
    }
    ctaBtn.textContent = 'You\'re in! ✨';
    ctaBtn.style.background = 'linear-gradient(135deg, #6ee7b7, #67e8f9)';
    ctaInput.value = '';
    ctaInput.placeholder = 'Welcome to the movement!';
    setTimeout(() => {
      ctaBtn.textContent = 'Join the Movement';
      ctaBtn.style.background = '';
      ctaInput.placeholder = 'Your email address';
    }, 4000);
  });

  ctaInput?.addEventListener('keydown', e => {
    if (e.key === 'Enter') ctaBtn?.click();
  });

  // ─── PARALLAX HERO ORBS ───────────────────────────
  const orbs = document.querySelectorAll('.hero-bg .orb');
  if (window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', e => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      orbs.forEach((orb, i) => {
        const depth = (i + 1) * 8;
        orb.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
      });
    }, { passive: true });
  }

  // ─── HERO CARD TILT ───────────────────────────────
  const heroCard = document.querySelector('.card-front');
  if (heroCard && window.matchMedia('(pointer: fine)').matches) {
    heroCard.addEventListener('mousemove', e => {
      const rect = heroCard.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const rx = ((e.clientY - cy) / (rect.height / 2)) * -8;
      const ry = ((e.clientX - cx) / (rect.width / 2)) * 8;
      heroCard.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-12px)`;
    });
    heroCard.addEventListener('mouseleave', () => {
      heroCard.style.transform = '';
    });
  }

});
