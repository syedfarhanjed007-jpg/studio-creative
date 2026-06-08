/* STUDIO - Main JavaScript */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation
  const toggle = document.querySelector('.nav__toggle');
  const mobileNav = document.querySelector('.nav__mobile');
  
  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Nav scroll effect
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // Reveal animations
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  reveals.forEach(el => revealObserver.observe(el));

  // Filter functionality
  const filterBtns = document.querySelectorAll('.filter__btn');
  const filterItems = document.querySelectorAll('[data-category]');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      filterItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = '';
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => { item.style.display = 'none'; }, 300);
        }
      });
    });
  });

  // Modal functionality
  const modal = document.querySelector('.modal');
  const modalOpenBtns = document.querySelectorAll('[data-modal-open]');
  const modalCloseBtns = document.querySelectorAll('.modal__close');

  modalOpenBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (modal) {
        const data = btn.dataset.modalOpen;
        const titleEl = modal.querySelector('.modal__title');
        const descEl = modal.querySelector('.modal__desc');
        const catEl = modal.querySelector('.modal__cat');
        if (titleEl) titleEl.textContent = btn.dataset.title || '';
        if (descEl) descEl.textContent = btn.dataset.desc || '';
        if (catEl) catEl.textContent = btn.dataset.category || '';
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (modal) {
    modalCloseBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // Form handling
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const origText = btn.textContent;
      btn.textContent = 'Sent!';
      btn.style.backgroundColor = '#2a8a4a';
      setTimeout(() => {
        btn.textContent = origText;
        btn.style.backgroundColor = '';
        form.reset();
      }, 3000);
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
