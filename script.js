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

  // ─── TAB SWITCHING ────────────────────────────────
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.product-grid').forEach(g => { g.style.display = 'none'; });
      btn.classList.add('active');
      const grid = document.getElementById('tab-' + btn.dataset.tab);
      if (grid) grid.style.display = 'grid';
    });
  });

  // ─── SMOOTH ANCHOR SCROLL ─────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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

  // ─── JELLY CURSOR ─────────────────────────────
  if (window.matchMedia('(pointer: fine)').matches) {
    const blob = document.getElementById('cursor-blob');
    const dot  = document.getElementById('cursor-dot');
    if (blob && dot) {
      let mx = window.innerWidth/2, my = window.innerHeight/2;
      let bx = mx, by = my;

      document.addEventListener('mousemove', e => {
        mx = e.clientX; my = e.clientY;
        dot.style.transform = `translate(${mx}px,${my}px)`;
      }, { passive: true });

      (function animateBlob() {
        bx += (mx - bx - 22) * 0.13;
        by += (my - by - 22) * 0.13;
        blob.style.transform = `translate(${bx}px,${by}px)`;
        requestAnimationFrame(animateBlob);
      })();

      document.querySelectorAll('a,button,.product-card,.world-card,.pillar,.day-step,.hero-card').forEach(el => {
        el.addEventListener('mouseenter', () => blob.classList.add('hovered'));
        el.addEventListener('mouseleave', () => blob.classList.remove('hovered'));
      });
      document.addEventListener('mousedown', () => { blob.classList.remove('clicked'); void blob.offsetWidth; blob.classList.add('clicked'); });
      document.addEventListener('mouseup',   () => blob.classList.remove('clicked'));
    }
  }

  // ─── SPARKLE PARTICLES ────────────────────────
  (function() {
    const canvas = document.getElementById('sparkle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const COLORS = ['#ff4d8d','#b96eff','#38d9f5','#fca5a5','#4eedb4','#ffb3d4'];
    let W, H;

    function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
    window.addEventListener('resize', resize, { passive:true }); resize();

    function mkp() {
      return { x: Math.random()*W, y: Math.random()*H,
        r: 1.4 + Math.random()*2.2, vy: 0.35 + Math.random()*0.65,
        vx: (Math.random()-0.5)*0.35, t: Math.random()*Math.PI*2,
        color: COLORS[Math.floor(Math.random()*COLORS.length)],
        alpha: 0.3 + Math.random()*0.55, isHeart: Math.random()<0.06 };
    }
    const pts = Array.from({length:60}, mkp);

    function draw() {
      ctx.clearRect(0,0,W,H);
      pts.forEach(p => {
        p.t += 0.018; p.y -= p.vy; p.x += Math.sin(p.t)*0.5 + p.vx;
        if (p.y < -8) { Object.assign(p, mkp()); p.y = H+8; }
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        if (p.isHeart) {
          const s = p.r * 1.3;
          ctx.save(); ctx.translate(p.x, p.y); ctx.scale(s,s);
          ctx.beginPath();
          ctx.moveTo(0,-0.5); ctx.bezierCurveTo(0.5,-1.2,1.2,-0.5,0,0.6);
          ctx.bezierCurveTo(-1.2,-0.5,-0.5,-1.2,0,-0.5);
          ctx.closePath(); ctx.fill(); ctx.restore();
        } else {
          ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
        }
      });
      ctx.globalAlpha = 1;
      requestAnimationFrame(draw);
    }
    draw();
  })();

  // ─── CARD WOBBLE ──────────────────────────────
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.classList.remove('wobble');
      void card.offsetWidth;
      card.classList.add('wobble');
    });
  });

  // ─── MAGNETIC BUTTONS ─────────────────────────
  if (window.matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('.btn, .nav-cta').forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const r = btn.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width  / 2)) * 0.26;
        const dy = (e.clientY - (r.top  + r.height / 2)) * 0.26;
        btn.style.transform = `translate(${dx}px,${dy}px)`;
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
  }


  // ─── STAT COUNT-UP ────────────────────────────
  (function() {
    const stats = document.querySelectorAll('.market-num[data-target]');
    if (!stats.length) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        obs.unobserve(el);
        const target  = parseFloat(el.dataset.target);
        const suffix  = el.dataset.suffix  || '';
        const prefix  = el.dataset.prefix  || '';
        const decimal = parseInt(el.dataset.decimal || '0');
        el.closest('.market-stat')?.classList.add('is-counting');
        let startTs = null;
        const dur = 1800;
        function tick(ts) {
          if (!startTs) startTs = ts;
          const p = Math.min((ts - startTs) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          const val = target * eased;
          el.innerHTML = prefix + val.toFixed(decimal) + suffix;
          if (p < 1) {
            requestAnimationFrame(tick);
          } else {
            el.innerHTML = prefix + target.toFixed(decimal) + suffix;
            el.closest('.market-stat')?.classList.remove('is-counting');
          }
        }
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.6 });
    stats.forEach(el => obs.observe(el));
  })();

  // ─── TAB ENTER ANIMATION ──────────────────────
  (function() {
    // Initial companions tab animation on load
    const initial = document.getElementById('tab-companions');
    if (initial) {
      initial.classList.add('tab-enter');
      initial.addEventListener('animationend', () => initial.classList.remove('tab-enter'), { once: true });
    }

    // Patch tab buttons to add slide-in on switch
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const grid = document.getElementById('tab-' + btn.dataset.tab);
        if (!grid) return;
        grid.classList.remove('tab-enter');
        void grid.offsetWidth;
        grid.classList.add('tab-enter');
        grid.addEventListener('animationend', () => grid.classList.remove('tab-enter'), { once: true });
      });
    });
  })();

  // ─── SECTION TAG POP ANIMATION ────────────────
  document.querySelectorAll('.section-tag').forEach(tag => {
    tag.style.opacity = '0';
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.style.opacity = '';
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      });
    }, { threshold: 0.8 });
    obs.observe(tag);
  });


  // ─── SCROLL PROGRESS BAR ──────────────────────
  (function() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;
    function updateBar() {
      const max = document.body.scrollHeight - window.innerHeight;
      bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
    }
    window.addEventListener('scroll', updateBar, { passive: true });
    updateBar();
  })();

  // ─── MOUSE SPARKLE TRAIL ──────────────────────
  if (window.matchMedia('(pointer: fine)').matches) {
    const SPARK_COLORS = ['#ff4d8d','#b96eff','#38d9f5','#4eedb4','#ffb347','#fca5a5'];
    let lastSparkTime = 0;
    document.addEventListener('mousemove', e => {
      const now = Date.now();
      if (now - lastSparkTime < 40) return; // throttle — 1 spark per 40ms
      lastSparkTime = now;
      const s = document.createElement('div');
      s.className = 'm-spark';
      const size = 5 + Math.random() * 6;
      s.style.cssText = [
        'width:' + size + 'px',
        'height:' + size + 'px',
        'left:' + e.clientX + 'px',
        'top:' + e.clientY + 'px',
        'background:' + SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)],
        '--dx:' + ((Math.random() - 0.5) * 30) + 'px',
        '--sd:' + (0.45 + Math.random() * 0.25) + 's',
        'box-shadow:0 0 6px currentColor'
      ].join(';');
      document.body.appendChild(s);
      s.addEventListener('animationend', () => s.remove(), { once: true });
    }, { passive: true });
  }

  // ─── BUTTON CLICK RIPPLE ──────────────────────
  document.querySelectorAll('.btn, .tab-btn, .nav-cta').forEach(btn => {
    btn.addEventListener('click', e => {
      const r = btn.getBoundingClientRect();
      const rip = document.createElement('span');
      rip.className = 'btn-ripple';
      rip.style.left = (e.clientX - r.left) + 'px';
      rip.style.top  = (e.clientY - r.top)  + 'px';
      btn.appendChild(rip);
      rip.addEventListener('animationend', () => rip.remove(), { once: true });
    });
  });


});
