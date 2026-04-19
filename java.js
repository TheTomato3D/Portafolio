/* ================================================
   MAIN.JS — DevDuo Portfolio
   Handles: navbar scroll, reveal animations,
            form submit, mobile menu, filters
================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. Navbar scroll effect ──────────────── */
  const navbar = document.querySelector('.navbar');

  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  /* ── 2. Mobile hamburger menu ─────────────── */
  const hamburger = document.querySelector('.hamburger');
  const navLinks  = document.querySelector('.nav-links');
  const navCta    = document.querySelector('.nav-cta');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);

      if (isOpen) {
        navLinks.style.cssText = `
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 70px; left: 0; right: 0;
          background: rgba(8,11,16,0.98);
          backdrop-filter: blur(20px);
          padding: 32px 24px;
          border-bottom: 1px solid var(--border);
          gap: 24px;
          z-index: 999;
        `;
        if (navCta) navCta.style.marginLeft = '0';
      } else {
        navLinks.removeAttribute('style');
      }
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navLinks.removeAttribute('style');
      });
    });
  }

  /* ── 3. Scroll reveal ─────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');

  if (revealEls.length) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            // Stagger children slightly
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, i * 80);
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach(el => revealObserver.observe(el));
  }

  /* ── 4. Active nav link on scroll ────────── */
  const sections  = document.querySelectorAll('section[id]');
  const navItems  = document.querySelectorAll('.nav-links a');

  if (sections.length && navItems.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            navItems.forEach(a => a.classList.remove('active'));
            const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
            if (active) active.classList.add('active');
          }
        });
      },
      { threshold: 0.4 }
    );

    sections.forEach(s => sectionObserver.observe(s));
  }

  /* ── 5. Contact form ──────────────────────── */
  const form        = document.getElementById('contactForm');
  const successMsg  = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const btn = form.querySelector('.form-submit');
      btn.disabled = true;
      btn.textContent = 'Enviando...';

      // Simulate async send (replace with real fetch to backend)
      setTimeout(() => {
        form.style.display = 'none';
        if (successMsg) successMsg.style.display = 'block';
      }, 1400);
    });
  }

  /* ── 6. Portfolio filters ─────────────────── */
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const portCards   = document.querySelectorAll('.portfolio-card');

  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        portCards.forEach(card => {
          const match = filter === 'all' || card.dataset.category === filter;
          card.style.opacity    = '0';
          card.style.transform  = 'scale(0.96)';

          setTimeout(() => {
            card.style.display = match ? '' : 'none';
            if (match) {
              requestAnimationFrame(() => {
                card.style.opacity   = '1';
                card.style.transform = 'scale(1)';
              });
            }
          }, 200);
        });
      });
    });

    // Smooth transition setup for cards
    portCards.forEach(card => {
      card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });
  }

  /* ── 7. Typing effect in hero ─────────────── */
  const typer = document.getElementById('typer');

  if (typer) {
    const words = ['Diseñamos.', 'Desarrollamos.', 'Entregamos.'];
    let wIndex = 0, cIndex = 0, deleting = false;

    function type() {
      const word = words[wIndex];

      if (!deleting) {
        typer.textContent = word.substring(0, cIndex + 1);
        cIndex++;
        if (cIndex === word.length) {
          deleting = true;
          setTimeout(type, 1800);
          return;
        }
      } else {
        typer.textContent = word.substring(0, cIndex - 1);
        cIndex--;
        if (cIndex === 0) {
          deleting = false;
          wIndex   = (wIndex + 1) % words.length;
        }
      }

      setTimeout(type, deleting ? 55 : 100);
    }

    setTimeout(type, 1200);
  }

});