/* Shared motion layer, loaded in <head> by every page (see assets/motion.css).
   - frosts the sticky nav once the page scrolls
   - fades sections in as they scroll into view
   Content stays visible if this file never loads. */
(function () {
  var root = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!('IntersectionObserver' in window) || reduce) return;
  root.classList.add('gt-motion');

  // Elements revealed on every page. Siblings matched by the same selector
  // are staggered so grids and lists cascade in rather than pop together.
  var AUTO = [
    '.section-eyebrow', '.screens-section h2', '.screens-intro',
    '.feat-card', '.ben-item',
    '.features-inner h2', '.cta-section h2', '.cta-section p', '.cta-section .btn-row',
    '.page-header > *', '.pricing-hero > *', '.blog-head > *', '.article > *:not(.article-body)',
    '.faq-group', '.contact-card', '.post-card', '.policy-body > *:nth-child(-n+3)',
    '.faq-cta > *', '.contact-cta > *', '.pricing-cta > *', '.post-cta'
  ];

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    var nav = document.querySelector('nav');
    if (nav) {
      var setNav = function () {
        nav.classList.toggle('is-scrolled', window.scrollY > 8);
        root.style.setProperty('--nav-h', nav.offsetHeight + 'px');
      };
      setNav();
      window.addEventListener('scroll', setNav, { passive: true });
      window.addEventListener('resize', setNav);
    }

    AUTO.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) {
        if (!el.hasAttribute('data-reveal')) el.setAttribute('data-reveal', '');
      });
    });

    var items = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
    // Stagger by position among revealed siblings
    items.forEach(function (el) {
      if (el.style.getPropertyValue('--reveal-delay')) return;
      var i = 0, s = el.previousElementSibling;
      while (s) { if (s.hasAttribute('data-reveal')) i++; s = s.previousElementSibling; }
      el.style.setProperty('--reveal-delay', Math.min(i, 6) * 90 + 'ms');
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0 });
    items.forEach(function (el) { io.observe(el); });

    // Safety net: never leave anything hidden (e.g. print, odd layouts)
    window.addEventListener('beforeprint', function () {
      items.forEach(function (el) { el.classList.add('is-in'); });
    });
  });
})();
