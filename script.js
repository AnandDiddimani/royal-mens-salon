/* ============================================
   Maison Noir — Interactions
   ============================================ */
(function () {
    'use strict';

    /* Preloader */
    window.addEventListener('load', function () {
        var preloader = document.getElementById('preloader');
        if (preloader) {
            setTimeout(function () { preloader.classList.add('is-done'); }, 900);
        }
    });

    /* Sticky nav on scroll */
    var nav = document.getElementById('nav');
    var onScroll = function () {
        if (window.scrollY > 40) nav.classList.add('is-scrolled');
        else nav.classList.remove('is-scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* Mobile menu */
    var toggle = document.getElementById('navToggle');
    var links = document.getElementById('navLinks');
    var closeMenu = function () {
        toggle.classList.remove('is-open');
        links.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open menu');
        document.body.style.overflow = '';
    };
    toggle.addEventListener('click', function () {
        var open = links.classList.toggle('is-open');
        toggle.classList.toggle('is-open', open);
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        document.body.style.overflow = open ? 'hidden' : '';
    });
    links.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', closeMenu);
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && links.classList.contains('is-open')) {
            closeMenu();
            toggle.focus();
        }
    });
    var mobileLayout = window.matchMedia('(max-width: 980px)');
    if (mobileLayout.addEventListener) {
        mobileLayout.addEventListener('change', closeMenu);
    } else {
        mobileLayout.addListener(closeMenu);
    }

    /* Scroll reveal */
    var revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.14, rootMargin: '0px 0px -60px 0px' });
        revealEls.forEach(function (el) { io.observe(el); });
    } else {
        revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    }

    /* Testimonials carousel */
    var testimonials = Array.prototype.slice.call(document.querySelectorAll('.testimonial'));
    var dotsWrap = document.getElementById('testiDots');
    var current = 0;
    var timer;

    if (testimonials.length && dotsWrap) {
        testimonials.forEach(function (_, i) {
            var b = document.createElement('button');
            b.setAttribute('aria-label', 'Show testimonial ' + (i + 1));
            b.addEventListener('click', function () { go(i, true); });
            dotsWrap.appendChild(b);
        });
        var dots = Array.prototype.slice.call(dotsWrap.children);

        var show = function (i) {
            testimonials.forEach(function (t, idx) { t.classList.toggle('is-active', idx === i); });
            dots.forEach(function (d, idx) { d.classList.toggle('is-active', idx === i); });
            current = i;
        };
        var go = function (i, manual) {
            show(i);
            if (manual) restart();
        };
        var next = function () { show((current + 1) % testimonials.length); };
        var start = function () { timer = setInterval(next, 6000); };
        var restart = function () { clearInterval(timer); start(); };

        show(0);
        start();
    }

    /* Footer year */
    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
