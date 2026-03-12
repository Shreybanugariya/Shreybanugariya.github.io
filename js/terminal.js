/**
 * terminal.js — Shrey Banugaria Portfolio
 * Terminal UI effects: matrix rain, loader, glitch, nav
 */

(function () {
  'use strict';

  /* =========================================
     LOADER
     ========================================= */
  var loaderTexts = [
    'INITIALIZING...',
    'LOADING MODULES...',
    'CONNECTING TO SERVERS...',
    'COMPILING SKILLS...',
    'RENDERING PORTFOLIO...',
    'SYSTEM READY.'
  ];

  var loaderTextEl = document.getElementById('loader-text');
  var loaderPctEl  = document.getElementById('loader-pct');
  var loaderEl     = document.getElementById('ftco-loader');

  var textIdx = 0;
  var pct = 0;

  function tickLoader() {
    if (!loaderEl) return;
    pct += Math.floor(Math.random() * 18) + 5;
    if (pct > 100) pct = 100;

    if (loaderPctEl) loaderPctEl.textContent = pct + '%';
    if (loaderTextEl && textIdx < loaderTexts.length) {
      loaderTextEl.textContent = loaderTexts[textIdx];
      textIdx++;
    }

    if (pct < 100) {
      setTimeout(tickLoader, 220);
    } else {
      if (loaderTextEl) loaderTextEl.textContent = 'SYSTEM READY.';
      if (loaderPctEl) loaderPctEl.textContent = '100%';
      setTimeout(function () {
        if (loaderEl) loaderEl.classList.add('hide');
        setTimeout(function () {
          if (loaderEl) loaderEl.style.display = 'none';
        }, 700);
      }, 400);
    }
  }

  setTimeout(tickLoader, 200);

  /* =========================================
     MATRIX RAIN
     ========================================= */
  var canvas = document.getElementById('matrix-canvas');
  if (canvas) {
    var ctx = canvas.getContext('2d');

    function resizeCanvas() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    var chars = '01アイウエオカキクケコサシスセソタチツテトABCDEFGHIJKLMNOP01001101001';
    var fontSize = 13;
    var columns, drops;

    function initMatrix() {
      columns = Math.floor(canvas.width / fontSize);
      drops = new Array(columns).fill(1);
    }
    initMatrix();
    window.addEventListener('resize', initMatrix);

    function drawMatrix() {
      ctx.fillStyle = 'rgba(8, 11, 10, 0.06)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00ff41';
      ctx.font = fontSize + 'px monospace';

      for (var i = 0; i < drops.length; i++) {
        var ch = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(ch, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    setInterval(drawMatrix, 55);
  }

  /* =========================================
     AOS INIT
     ========================================= */
  document.addEventListener('DOMContentLoaded', function () {
    if (typeof AOS !== 'undefined') {
      AOS.init({ duration: 600, easing: 'ease-out', once: true, offset: 60 });
    }
  });

  /* =========================================
     MOBILE NAV TOGGLE
     ========================================= */
  document.addEventListener('DOMContentLoaded', function () {
    var toggle  = document.getElementById('nav-toggle');
    var navMenu = document.getElementById('nav-menu');

    if (toggle && navMenu) {
      toggle.addEventListener('click', function () {
        navMenu.classList.toggle('open');
      });

      // close on link click
      navMenu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          navMenu.classList.remove('open');
        });
      });
    }
  });

  /* =========================================
     SMOOTH SCROLL
     ========================================= */
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var target = document.querySelector(this.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        var navHeight = (document.querySelector('.terminal-nav') || {}).offsetHeight || 65;
        var top = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 16;
        window.scrollTo({ top: top, behavior: 'smooth' });
      });
    });
  });

  /* =========================================
     ACTIVE NAV HIGHLIGHT ON SCROLL
     ========================================= */
  document.addEventListener('DOMContentLoaded', function () {
    var sections  = document.querySelectorAll('section[id]');
    var navLinks  = document.querySelectorAll('.nav-menu a[href^="#"]');

    function setActive() {
      var scrollY = window.pageYOffset + 100;
      var current = '';

      sections.forEach(function (sec) {
        if (scrollY >= sec.offsetTop) {
          current = sec.getAttribute('id');
        }
      });

      navLinks.forEach(function (link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
          link.classList.add('active');
        }
      });
    }

    window.addEventListener('scroll', setActive, { passive: true });
    setActive();
  });

  /* =========================================
     GLITCH EFFECT ON SECTION COMMANDS
     ========================================= */
  document.addEventListener('DOMContentLoaded', function () {
    var glitchChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$_#@!';

    document.querySelectorAll('.section-cmd').forEach(function (el) {
      var original = el.textContent;
      var glitching = false;

      el.addEventListener('mouseenter', function () {
        if (glitching) return;
        glitching = true;
        var count = 0;

        var iv = setInterval(function () {
          var out = '';
          for (var i = 0; i < original.length; i++) {
            if (Math.random() > 0.8) {
              out += glitchChars[Math.floor(Math.random() * glitchChars.length)];
            } else {
              out += original[i];
            }
          }
          el.textContent = out;
          count++;
          if (count > 6) {
            clearInterval(iv);
            el.textContent = original;
            glitching = false;
          }
        }, 60);
      });
    });
  });

  /* =========================================
     TERMINAL WINDOW — RANDOM SCAN FLICKER
     ========================================= */
  document.addEventListener('DOMContentLoaded', function () {
    var windows = document.querySelectorAll('.terminal-window');
    if (!windows.length) return;

    function randomFlicker() {
      var el = windows[Math.floor(Math.random() * windows.length)];
      el.style.opacity = '0.88';
      setTimeout(function () { el.style.opacity = '1'; }, 60);
    }

    setInterval(randomFlicker, 4500);
  });

})();
