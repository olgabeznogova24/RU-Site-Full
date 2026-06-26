/* ===== CeramicaDecor RU — Main Script ===== */
(function () {
  'use strict';

  /* ----- Header scroll effect ----- */
  const header = document.getElementById('header');
  let lastScroll = 0;

  function onScroll() {
    const scrollY = window.scrollY;
    if (scrollY >= 42) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
    lastScroll = scrollY;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ----- Header cooperation dropdown ----- */
  const topCooperationDropdowns = document.querySelectorAll('.header__top-dropdown');

  function closeTopCooperationDropdowns(exceptDropdown) {
    topCooperationDropdowns.forEach(function (dropdown) {
      if (exceptDropdown && dropdown === exceptDropdown) return;
      dropdown.classList.remove('open');
      var trigger = dropdown.querySelector('.header__top-dropdown-toggle');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
    });
  }

  topCooperationDropdowns.forEach(function (dropdown) {
    var trigger = dropdown.querySelector('.header__top-dropdown-toggle');
    if (!trigger) return;

    trigger.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();
      closeTopCooperationDropdowns(dropdown);
      var isOpen = dropdown.classList.toggle('open');
      trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  });

  document.addEventListener('click', function (event) {
    if (!event.target.closest('.header__top-dropdown')) {
      closeTopCooperationDropdowns();
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeTopCooperationDropdowns();
  });

  /* ----- Shared calltracking contacts ----- */
  var calltrackingDefaults = {
    phone: {
      href: 'tel:+74952293046',
      label: '+7 (495) 229-30-46'
    },
    email: {
      href: 'mailto:info@ceramicadecor.ru',
      label: 'info@ceramicadecor.ru'
    }
  };

  function getCalltrackingValue(kind, value) {
    if (!value) return calltrackingDefaults[kind];
    if (typeof value === 'string') {
      return {
        href: kind === 'email' ? 'mailto:' + value : 'tel:' + value.replace(/[^\d+]/g, ''),
        label: value
      };
    }

    return {
      href: value.href || value.url || calltrackingDefaults[kind].href,
      label: value.label || value.text || value.value || calltrackingDefaults[kind].label
    };
  }

  function replaceContactText(element, fromText, toText) {
    var replaced = false;
    var walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    var nodes = [];

    while (walker.nextNode()) {
      nodes.push(walker.currentNode);
    }

    nodes.forEach(function (node) {
      if (node.nodeValue.indexOf(fromText) !== -1) {
        node.nodeValue = node.nodeValue.split(fromText).join(toText);
        replaced = true;
      }
    });

    if (!replaced && element.childElementCount === 0) {
      element.textContent = toText;
    }
  }

  function syncStructuredContactData(values) {
    document.querySelectorAll('script[type="application/ld+json"]').forEach(function (script) {
      if (!script.textContent) return;

      var updated = script.textContent
        .split(calltrackingDefaults.phone.label).join(values.phone.label)
        .split(calltrackingDefaults.email.label).join(values.email.label);

      if (updated !== script.textContent) {
        script.textContent = updated;
      }
    });
  }

  window.updateCeramicaDecorCalltracking = function (contacts) {
    var values = {
      phone: getCalltrackingValue('phone', contacts && contacts.phone),
      email: getCalltrackingValue('email', contacts && contacts.email)
    };

    document.querySelectorAll('[data-calltracking]').forEach(function (element) {
      var kind = element.dataset.calltracking;
      var value = values[kind];
      var defaults = calltrackingDefaults[kind];
      if (!value || !defaults) return;

      if (element.tagName === 'A') {
        element.href = value.href;
      }
      replaceContactText(element, defaults.label, value.label);
    });

    syncStructuredContactData(values);
  };

  if (window.CeramicaDecorCalltracking) {
    window.updateCeramicaDecorCalltracking(window.CeramicaDecorCalltracking);
  }

  function clearConsentError(consent) {
    var label = consent && consent.closest('.consent-label');
    if (label) label.classList.remove('is-error');
  }

  window.requireCeramicaDecorConsent = function (form) {
    var consent = form && form.querySelector('.consent-checkbox');
    if (!consent || consent.checked) {
      clearConsentError(consent);
      return true;
    }

    var label = consent.closest('.consent-label');
    if (label) {
      label.classList.add('is-error');
      label.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    consent.focus({ preventScroll: true });
    return false;
  };

  document.addEventListener('change', function (event) {
    if (event.target && event.target.matches('.consent-checkbox')) {
      clearConsentError(event.target);
    }
  });

  function createStandardRequestModal() {
    var modal = document.createElement('div');
    modal.className = 'request-modal standard-request-modal';
    modal.id = 'standardRequestModal';
    modal.innerHTML =
      '<div class="request-modal__overlay" data-standard-request-close></div>' +
      '<div class="request-modal__content" role="dialog" aria-modal="true" aria-labelledby="standardRequestTitle">' +
        '<button class="request-modal__close" type="button" aria-label="Закрыть" data-standard-request-close>&times;</button>' +
        '<h3 id="standardRequestTitle">Оставить заявку</h3>' +
        '<p>Оставьте контакты, и мы свяжемся с вами в ближайшее рабочее время.</p>' +
        '<form class="request-modal__form" id="standardRequestForm" autocomplete="off" novalidate>' +
          '<input type="hidden" name="source" value="">' +
          '<input type="hidden" name="product_name" value="">' +
          '<input type="hidden" name="product_article" value="">' +
          '<div class="standard-request-modal__product" data-standard-request-product hidden></div>' +
          '<div class="input-group">' +
            '<label for="standardRequestName">Ваше имя</label>' +
            '<input type="text" id="standardRequestName" name="name" placeholder="Как к вам обращаться" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" required>' +
          '</div>' +
          '<div class="input-group">' +
            '<label for="standardRequestPhone">Телефон</label>' +
            '<input type="tel" id="standardRequestPhone" name="phone" value="+7" placeholder="+7" required>' +
          '</div>' +
          '<div class="input-group">' +
            '<label for="standardRequestComment">Комментарий</label>' +
            '<textarea id="standardRequestComment" name="comment" placeholder="Ваши пожелания или вопросы"></textarea>' +
          '</div>' +
          '<label class="consent-label">' +
            '<input type="checkbox" class="consent-checkbox">' +
            '<span>Я даю согласие на обработку персональных данных в соответствии с <a href="privacy.html" target="_blank">политикой конфиденциальности</a></span>' +
          '</label>' +
          '<button type="submit" class="btn btn--primary" style="width:100%">Отправить заявку</button>' +
        '</form>' +
      '</div>';
    document.body.appendChild(modal);
    return modal;
  }

  function getStandardRequestModal() {
    return document.getElementById('standardRequestModal') || createStandardRequestModal();
  }

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>"']/g, function (char) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      }[char];
    });
  }

  function renderProductContext(productName, productArticle) {
    var name = String(productName || '').trim();
    var article = String(productArticle || '').trim();
    if (!name) return '';

    return '<strong>' + escapeHtml(name) + '</strong>' +
      (article ? '<span>\u0410\u0440\u0442. ' + escapeHtml(article) + '</span>' : '');
  }

  function isHomePage() {
    var path = location.pathname.replace(/\\/g, '/').split('/').pop();
    return !path || path === 'index.html';
  }

  window.openStandardRequestModal = function (source) {
    var modal = document.getElementById('standardRequestModal');
    if (modal && !modal.querySelector('#standardRequestForm')) {
      modal.remove();
      modal = null;
    }
    modal = modal || getStandardRequestModal();
    var form = modal.querySelector('#standardRequestForm');
    if (form) {
      form.reset();
      var sourceValue = source || document.title || location.pathname;
      var productName = '';
      var productArticle = '';

      if (source && typeof source === 'object') {
        sourceValue = source.source || document.title || location.pathname;
        productName = source.productName || '';
        productArticle = source.productArticle || '';
      }

      var sourceInput = form.querySelector('[name="source"]');
      var productNameInput = form.querySelector('[name="product_name"]');
      var productArticleInput = form.querySelector('[name="product_article"]');
      var productBox = form.querySelector('[data-standard-request-product]');

      if (sourceInput) sourceInput.value = sourceValue;
      if (productNameInput) productNameInput.value = productName;
      if (productArticleInput) productArticleInput.value = productArticle;
      if (productBox) {
        var productHtml = renderProductContext(productName, productArticle);
        productBox.innerHTML = productHtml;
        productBox.hidden = !productHtml;
      }
    }
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    var nameInput = modal.querySelector('[name="name"]');
    if (nameInput) setTimeout(function () { nameInput.focus(); }, 50);
  };

  window.openProductRequestModal = function (productName, productArticle, source) {
    if (!productName) return;
    window.openStandardRequestModal({
      source: source || location.href,
      productName: productName,
      productArticle: productArticle || ''
    });
  };

  window.closeStandardRequestModal = function () {
    var modal = document.getElementById('standardRequestModal');
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  /* ----- Mobile menu ----- */
  const burger = document.getElementById('burgerBtn');
  const nav = document.getElementById('mainNav');
  let overlay = document.createElement('div');
  overlay.className = 'mobile-overlay';
  document.body.appendChild(overlay);

  function toggleMenu() {
    const isOpen = nav.classList.toggle('open');
    burger.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function closeMenu() {
    nav.classList.remove('open');
    burger.classList.remove('active');
    overlay.classList.remove('active');
    closeCatalogDropdowns();
    document.body.style.overflow = '';
  }

  function closeCatalogDropdowns(exceptDropdown) {
    nav.querySelectorAll('.header__nav-dropdown.open').forEach(function (dropdown) {
      if (exceptDropdown && dropdown === exceptDropdown) return;
      dropdown.classList.remove('open');
      var trigger = dropdown.querySelector('.header__catalog-btn, .header__nav-link');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
    });
  }

  burger.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', closeMenu);

  nav.querySelectorAll('.header__catalog-btn').forEach(function (trigger) {
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var dropdown = this.closest('.header__nav-dropdown');
      closeCatalogDropdowns(dropdown);
      var isOpen = dropdown.classList.toggle('open');
      this.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  });

  nav.querySelectorAll('.header__mega-menu--showcase').forEach(function (menu) {
    var tabs = menu.querySelectorAll('.header__mega-tab');
    var panelsContainer = menu.querySelector('.header__mega-panels');
    var panels = menu.querySelectorAll('.header__mega-panel');
    var mobileMedia = window.matchMedia('(max-width: 960px)');
    var hasMobileSelection = false;
    var hoverSwitchDelay = 300;
    var hoverSwitchTimer = null;

    function clearHoverSwitchTimer() {
      if (hoverSwitchTimer) {
        clearTimeout(hoverSwitchTimer);
        hoverSwitchTimer = null;
      }
    }

    function restoreDesktopPanels() {
      panels.forEach(function (panel) {
        panelsContainer.appendChild(panel);
      });

      var activeTab = menu.querySelector('.header__mega-tab.active') || tabs[0];
      var target = activeTab.getAttribute('data-mega-target');
      tabs.forEach(function (tab) {
        var isActive = tab.getAttribute('data-mega-target') === target;
        tab.classList.toggle('active', isActive);
        tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });
      panels.forEach(function (panel) {
        panel.classList.toggle('active', panel.getAttribute('data-mega-panel') === target);
      });
    }

    function hideMobilePanels() {
      tabs.forEach(function (tab) {
        tab.classList.remove('active');
        tab.setAttribute('aria-selected', 'false');
      });
      panels.forEach(function (panel) {
        panel.classList.remove('active');
      });
    }

    function placeMobilePanel(target) {
      var activeTab = menu.querySelector('.header__mega-tab[data-mega-target="' + target + '"]');
      var activePanel = menu.querySelector('.header__mega-panel[data-mega-panel="' + target + '"]');
      if (activeTab && activePanel) {
        activeTab.insertAdjacentElement('afterend', activePanel);
      }
    }

    function syncMegaLayout() {
      if (mobileMedia.matches) {
        if (!hasMobileSelection) {
          hideMobilePanels();
          return;
        }

        var activeTab = menu.querySelector('.header__mega-tab.active');
        var target = activeTab ? activeTab.getAttribute('data-mega-target') : tabs[0].getAttribute('data-mega-target');
        placeMobilePanel(target);
      } else {
        hasMobileSelection = false;
        restoreDesktopPanels();
      }
    }

    function activatePanel(target, fromUserClick) {
      if (mobileMedia.matches && fromUserClick) {
        var currentTab = menu.querySelector('.header__mega-tab.active');
        var isCurrentOpen = hasMobileSelection && currentTab && currentTab.getAttribute('data-mega-target') === target;
        if (isCurrentOpen) {
          hasMobileSelection = false;
          hideMobilePanels();
          return;
        }
      }

      if (mobileMedia.matches && fromUserClick) {
        hasMobileSelection = true;
      }

      tabs.forEach(function (tab) {
        var isActive = tab.getAttribute('data-mega-target') === target;
        tab.classList.toggle('active', isActive);
        tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      panels.forEach(function (panel) {
        panel.classList.toggle('active', panel.getAttribute('data-mega-panel') === target);
      });

      syncMegaLayout();
    }

    menu.addEventListener('mouseleave', clearHoverSwitchTimer);
    panelsContainer.addEventListener('mouseenter', clearHoverSwitchTimer);

    tabs.forEach(function (tab) {
      var target = tab.getAttribute('data-mega-target');
      tab.addEventListener('mouseenter', function () {
        if (mobileMedia.matches) return;
        clearHoverSwitchTimer();
        hoverSwitchTimer = setTimeout(function () {
          activatePanel(target, false);
          hoverSwitchTimer = null;
        }, hoverSwitchDelay);
      });
      tab.addEventListener('mouseleave', clearHoverSwitchTimer);
      tab.addEventListener('pointerdown', clearHoverSwitchTimer);
      tab.addEventListener('touchstart', clearHoverSwitchTimer, { passive: true });
      tab.addEventListener('blur', clearHoverSwitchTimer);
      tab.addEventListener('focus', function () {
        if (!mobileMedia.matches) {
          clearHoverSwitchTimer();
          activatePanel(target, false);
        }
      });
      tab.addEventListener('click', function (e) {
        var href = tab.getAttribute('data-mega-href');
        if (href && !mobileMedia.matches) {
          window.location.href = href;
          return;
        }
        e.preventDefault();
        e.stopPropagation();
        activatePanel(target, true);
      });
    });

    if (mobileMedia.addEventListener) {
      mobileMedia.addEventListener('change', syncMegaLayout);
    } else {
      mobileMedia.addListener(syncMegaLayout);
    }
    syncMegaLayout();
  });

  nav.querySelectorAll('.header__nav-dropdown--simple > .header__nav-link').forEach(function (trigger) {
    trigger.addEventListener('click', function (e) {
      if (!window.matchMedia('(max-width: 960px)').matches) return;

      e.preventDefault();
      e.stopPropagation();
      var dropdown = this.closest('.header__nav-dropdown');
      closeCatalogDropdowns(dropdown);
      var isOpen = dropdown.classList.toggle('open');
      this.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.header__nav-dropdown')) {
      closeCatalogDropdowns();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeCatalogDropdowns();
  });

  // Close menu on nav link click
  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      if (
        window.matchMedia('(max-width: 960px)').matches &&
        link.matches('.header__nav-dropdown--simple > .header__nav-link')
      ) {
        return;
      }
      closeCatalogDropdowns();
      closeMenu();
    });
  });

  /* ----- Smooth scroll for anchor links ----- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#') return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        var headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h'));
        var customOffset = target.getAttribute('data-scroll-offset');
        var offset = customOffset !== null ? parseInt(customOffset, 10) || 0 : headerH + 20;
        var y = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });

  /* ----- FAQ Accordion ----- */
  document.querySelectorAll('.faq__question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = this.parentElement;
      var isOpen = item.classList.contains('active');

      // Close all
      document.querySelectorAll('.faq__item.active').forEach(function (openItem) {
        openItem.classList.remove('active');
        openItem.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
      });

      // Toggle current
      if (!isOpen) {
        item.classList.add('active');
        this.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ----- Our Products: no slider needed, grid layout ----- */

  /* ----- Category Tabs ----- */
  /* Tabs on index.html are links to catalog.html — no preventDefault needed */

  /* ----- Intersection Observer for fade-up animations ----- */
  var fadeElements = document.querySelectorAll(
    'section:not(.hero) > .container > *,' +
    '.about__card, .quality__col, .our-products__block,' +
    '.process-steps__step, .stats__item, .team__inner,' +
    '.video-reviews__card, .catalog-preview__card,' +
    '.faq__item, .cta-section__inner,' +
    '.contact__form-side, .contact__info-side,' +
    '.showcase__gallery, .showcase__name, .showcase__bottom,' +
    '.footer__top, .footer__bottom'
  );

  fadeElements.forEach(function (el) {
    // Skip cat-cards section, catalog grid and izrazcy catalog — show immediately
    if (
      el.closest('.cat-cards') ||
      el.closest('.catalog-grid') ||
      el.closest('.izrazcy-catalog') ||
      el.closest('.portfolio-page') ||
      el.closest('.blog-list') ||
      el.closest('.blog-articles')
    ) return;
    if (!el.classList.contains('fade-up')) {
      el.classList.add('fade-up');
    }
  });

  // Add stagger delays for grouped items
  document.querySelectorAll('.about__cards .about__card').forEach(function (card, i) {
    card.setAttribute('data-delay', String(i + 1));
  });
  document.querySelectorAll('.quality__col').forEach(function (col, i) {
    col.setAttribute('data-delay', String(i + 1));
  });
  // cat-cards show immediately, no stagger
  document.querySelectorAll('.stats__item').forEach(function (item, i) {
    item.setAttribute('data-delay', String(i + 1));
  });
  document.querySelectorAll('.catalog-preview__card').forEach(function (card, i) {
    card.setAttribute('data-delay', String(i + 1));
  });
  document.querySelectorAll('.video-reviews__card').forEach(function (card, i) {
    card.setAttribute('data-delay', String(i + 1));
  });
  document.querySelectorAll('.faq__item').forEach(function (item, i) {
    item.setAttribute('data-delay', String(i + 1));
  });

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    fadeElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show all immediately
    fadeElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ----- Contact form handling ----- */
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var nameInput = this.querySelector('input[name="name"]');
      var phoneInput = this.querySelector('input[name="phone"]');

      if (!nameInput.value.trim()) {
        nameInput.focus();
        nameInput.style.borderColor = '#cb3b25';
        return;
      }

      if (!phoneInput.value.trim() || phoneInput.value.trim().length < 7) {
        phoneInput.focus();
        var inputGroup = phoneInput.closest('.input-group');
        if (inputGroup) inputGroup.style.borderColor = '#cb3b25';
        return;
      }

      if (!window.requireCeramicaDecorConsent(this)) return;

      // Visual feedback
      var submitBtn = this.querySelector('button[type="submit"]');
      var originalText = submitBtn.textContent;
      submitBtn.textContent = 'Отправлено!';
      submitBtn.style.background = '#2a8a2a';
      submitBtn.style.borderColor = '#2a8a2a';
      submitBtn.disabled = true;

      fetch('https://ceramicadecor.ru/feedback/ceramicadecor_pro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ name: nameInput.value.trim(), phone: phoneInput.value.trim(), comment: '' })
      });

      setTimeout(function () {
        submitBtn.textContent = originalText;
        submitBtn.style.background = '';
        submitBtn.style.borderColor = '';
        submitBtn.disabled = false;
        contactForm.reset();
      }, 3000);
    });

    // Reset input styles on focus
    contactForm.querySelectorAll('input').forEach(function (input) {
      input.addEventListener('focus', function () {
        this.style.borderColor = '';
        var inputGroup = this.closest('.input-group');
        if (inputGroup) inputGroup.style.borderColor = '';
      });
    });
  }

  /* ----- Phone input mask (all tel inputs) ----- */
  document.querySelectorAll('input[type="tel"]').forEach(function (phoneInput) {
    phoneInput.addEventListener('focus', function () {
      if (!this.value || this.value === '+7') {
        this.value = '+7 ';
      }
    });
    phoneInput.addEventListener('input', function () {
      var val = this.value.replace(/\D/g, '');
      // Remove leading 7 if present
      if (val.charAt(0) === '7') val = val.substring(1);
      var formatted = '+7 ';
      if (val.length > 0) formatted += '(' + val.substring(0, 3);
      if (val.length >= 3) formatted += ') ';
      if (val.length > 3) formatted += val.substring(3, 6);
      if (val.length >= 6) formatted += '-';
      if (val.length > 6) formatted += val.substring(6, 8);
      if (val.length >= 8) formatted += '-';
      if (val.length > 8) formatted += val.substring(8, 10);
      this.value = formatted;
    });
  });

  /* ----- Showcase Gallery Slider (multiple galleries) ----- */
  var allGalleries = document.querySelectorAll('.showcase__item .showcase__gallery');
  allGalleries.forEach(function (showcaseGallery) {
    var track = showcaseGallery.querySelector('.showcase__track');
    var slides = showcaseGallery.querySelectorAll('.showcase__slide');
    var leftArrow = showcaseGallery.querySelector('.showcase__arrow--left');
    var rightArrow = showcaseGallery.querySelector('.showcase__arrow--right');
    var dotsContainer = showcaseGallery.querySelector('.showcase__dots');
    var currentSlide = 0;
    var totalSlides = slides.length;

    // Create dots
    for (var i = 0; i < totalSlides; i++) {
      var dot = document.createElement('button');
      dot.className = 'showcase__dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Слайд ' + (i + 1));
      dot.dataset.index = i;
      dotsContainer.appendChild(dot);
    }

    var dots = dotsContainer.querySelectorAll('.showcase__dot');

    function goToSlide(index) {
      if (index < 0) index = totalSlides - 1;
      if (index >= totalSlides) index = 0;
      currentSlide = index;
      track.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
      dots.forEach(function (d, di) {
        d.classList.toggle('active', di === currentSlide);
      });
    }

    leftArrow.addEventListener('click', function () { goToSlide(currentSlide - 1); });
    rightArrow.addEventListener('click', function () { goToSlide(currentSlide + 1); });

    dotsContainer.addEventListener('click', function (e) {
      var dot = e.target.closest('.showcase__dot');
      if (dot) goToSlide(parseInt(dot.dataset.index));
    });

    // Touch/swipe support
    var touchStartX = 0;
    var touchEndX = 0;

    showcaseGallery.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });

    showcaseGallery.addEventListener('touchend', function (e) {
      touchEndX = e.changedTouches[0].clientX;
      var diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) goToSlide(currentSlide + 1);
        else goToSlide(currentSlide - 1);
      }
    }, { passive: true });
  });

  document.querySelectorAll('.showcase__product-link--placeholder').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
    });
  });

  document.querySelectorAll('.portfolio-gallery__link[href="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
    });
  });

  document.querySelectorAll('.showcase__request-btn').forEach(function (button) {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      if (!window.openProductRequestModal) return;

      window.openProductRequestModal(
        button.dataset.projectName || button.textContent.trim(),
        button.dataset.projectArticle || '',
        'Главная страница: блок проектов клиентов'
      );
    });
  });

  /* ----- Lightbox ----- */
  var lightbox = document.getElementById('lightbox');
  if (lightbox) {
    var lightboxImg = lightbox.querySelector('.lightbox__img');
    var lightboxClose = lightbox.querySelector('.lightbox__close');
    var lightboxLeft = lightbox.querySelector('.lightbox__arrow--left');
    var lightboxRight = lightbox.querySelector('.lightbox__arrow--right');
    var lightboxSlides = document.querySelectorAll('.showcase__slide img, .portfolio-gallery__item img');
    var lightboxIndex = 0;

    function showLightbox(index) {
      if (index < 0) index = lightboxSlides.length - 1;
      if (index >= lightboxSlides.length) index = 0;
      lightboxIndex = index;
      lightboxImg.src = lightboxSlides[lightboxIndex].currentSrc || lightboxSlides[lightboxIndex].src;
      lightboxImg.alt = lightboxSlides[lightboxIndex].alt;
    }

    lightboxSlides.forEach(function (img, i) {
      var galleryItem = img.closest('.portfolio-gallery__item');
      if (galleryItem) {
        galleryItem.setAttribute('tabindex', '0');
        galleryItem.setAttribute('role', 'button');
        galleryItem.setAttribute('aria-label', '\u041e\u0442\u043a\u0440\u044b\u0442\u044c \u0444\u043e\u0442\u043e ' + (i + 1));
        galleryItem.addEventListener('keydown', function (e) {
          if (e.target.closest('a[href]')) return;
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            showLightbox(i);
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
          }
        });
      }

      img.addEventListener('click', function (e) {
        if (e.target.closest('.portfolio-gallery__project-link[href], .showcase__product-link[href]')) {
          return;
        }
        showLightbox(i);
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxLeft.addEventListener('click', function () { showLightbox(lightboxIndex - 1); });
    lightboxRight.addEventListener('click', function () { showLightbox(lightboxIndex + 1); });

    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showLightbox(lightboxIndex - 1);
      if (e.key === 'ArrowRight') showLightbox(lightboxIndex + 1);
    });

    // Swipe in lightbox
    var lbTouchStartX = 0;
    lightbox.addEventListener('touchstart', function (e) {
      lbTouchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    lightbox.addEventListener('touchend', function (e) {
      var diff = lbTouchStartX - e.changedTouches[0].screenX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) showLightbox(lightboxIndex + 1);
        else showLightbox(lightboxIndex - 1);
      }
    }, { passive: true });
  }

  /* ----- VK video reviews ----- */
  document.querySelectorAll('.one_story--video').forEach(function (card) {
    card.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var vkId = this.dataset.vk;
      if (!vkId) return;
      var parts = vkId.replace('video', '').split('_');
      var imageDiv = this.querySelector('.image');
      var iframe = document.createElement('iframe');
      iframe.src = 'https://vk.com/video_ext.php?oid=' + parts[0] + '&id=' + parts[1] + '&hd=2&autoplay=1';
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('allow', 'autoplay; encrypted-media');
      iframe.setAttribute('allowfullscreen', '');
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.position = 'absolute';
      iframe.style.top = '0';
      iframe.style.left = '0';
      iframe.style.borderRadius = '12px';
      imageDiv.style.position = 'relative';
      imageDiv.innerHTML = '';
      imageDiv.appendChild(iframe);
    });
  });

  /* ----- Stories slider arrows & counter ----- */
  var storiesSlider = document.querySelector('.stories_slider');
  if (storiesSlider) {
    var storiesItems = storiesSlider.querySelectorAll('.one_story');
    var storiesCurrent = document.querySelector('.stories_current');
    var storiesLeftBtn = document.querySelector('.stories_arrow--left');
    var storiesRightBtn = document.querySelector('.stories_arrow--right');

    function updateStoriesCounter() {
      if (!storiesCurrent || !storiesItems.length) return;
      var scrollLeft = storiesSlider.scrollLeft;
      var itemWidth = storiesItems[0].offsetWidth + 15;
      var index = Math.round(scrollLeft / itemWidth) + 1;
      storiesCurrent.textContent = Math.min(index, storiesItems.length);
    }

    storiesSlider.addEventListener('scroll', updateStoriesCounter, { passive: true });

    if (storiesLeftBtn) {
      storiesLeftBtn.addEventListener('click', function () {
        var itemWidth = storiesItems[0].offsetWidth + 15;
        if (storiesSlider.scrollLeft <= 10) {
          storiesSlider.scrollTo({ left: storiesSlider.scrollWidth, behavior: 'smooth' });
        } else {
          storiesSlider.scrollBy({ left: -itemWidth, behavior: 'smooth' });
        }
      });
    }
    if (storiesRightBtn) {
      storiesRightBtn.addEventListener('click', function () {
        var itemWidth = storiesItems[0].offsetWidth + 15;
        var maxScroll = storiesSlider.scrollWidth - storiesSlider.clientWidth;
        if (storiesSlider.scrollLeft >= maxScroll - 10) {
          storiesSlider.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          storiesSlider.scrollBy({ left: itemWidth, behavior: 'smooth' });
        }
      });
    }
  }

  /* ----- Request Modal ----- */
  if (!window.openRequestModal) {
    window.openRequestModal = function(productName) {
      var modal = document.getElementById('requestModal');
      if (!modal) return;
      if (productName) {
        var productInput = modal.querySelector('[name="product"]');
        if (productInput) productInput.value = productName;
      }
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    };
  }
  if (!window.closeRequestModal) {
    window.closeRequestModal = function() {
      var modal = document.getElementById('requestModal');
      if (!modal) return;
      modal.classList.remove('active');
      document.body.style.overflow = '';
    };
  }

  var modalOverlay = document.querySelector('.request-modal__overlay');
  if (modalOverlay) modalOverlay.addEventListener('click', closeRequestModal);
  var modalClose = document.querySelector('.request-modal__close');
  if (modalClose) modalClose.addEventListener('click', closeRequestModal);

  var modalForm = document.getElementById('modalForm');
  if (modalForm) {
    modalForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var name = this.querySelector('[name="name"]').value.trim();
      var phone = this.querySelector('[name="phone"]').value.trim();
      var product = this.querySelector('[name="product"]').value;
      if (!name || phone.replace(/\D/g,'').length < 10) return;
      if (!window.requireCeramicaDecorConsent(this)) return;

      fetch('https://ceramicadecor.ru/feedback/ceramicadecor_pro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ name: name, phone: phone, comment: product || '' })
      });
      this.innerHTML = '<p style="color:#25D366;text-align:center;padding:20px 0;">Спасибо! Мы перезвоним в ближайшее время.</p>';
    });
  }

  document.addEventListener('click', function(e) {
    var closeTrigger = e.target.closest('[data-standard-request-close]');
    if (closeTrigger) {
      e.preventDefault();
      window.closeStandardRequestModal();
      return;
    }

    var requestTrigger = e.target.closest(
      '.hero__request-btn, .header__cta-btn, a.btn[href="#contact"], a.btn[href="contacts.html"]'
    );
    if (!requestTrigger) return;

    if (isHomePage() && !requestTrigger.classList.contains('hero__request-btn')) return;

    e.preventDefault();
    if (nav && burger) closeMenu();
    window.openStandardRequestModal(
      requestTrigger.dataset.standardRequestSource || requestTrigger.textContent.trim()
    );
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      window.closeStandardRequestModal();
    }
  });

  document.addEventListener('submit', function(e) {
    var form = e.target.closest('#standardRequestForm');
    if (!form) return;

    e.preventDefault();
    var nameInput = form.querySelector('[name="name"]');
    var phoneInput = form.querySelector('[name="phone"]');
    var commentInput = form.querySelector('[name="comment"]');
    var sourceInput = form.querySelector('[name="source"]');
    var productNameInput = form.querySelector('[name="product_name"]');
    var productArticleInput = form.querySelector('[name="product_article"]');
    var name = nameInput ? nameInput.value.trim() : '';
    var phone = phoneInput ? phoneInput.value.trim() : '';
    var userComment = commentInput ? commentInput.value.trim() : '';
    var productName = productNameInput ? productNameInput.value.trim() : '';
    var productArticle = productArticleInput ? productArticleInput.value.trim() : '';

    if (!name) {
      if (nameInput) nameInput.focus();
      return;
    }
    if (!phone || phone.replace(/\D/g, '').length < 10) {
      if (phoneInput) phoneInput.focus();
      return;
    }
    if (!window.requireCeramicaDecorConsent(form)) return;

    var productContext = productName
      ? productName + (productArticle ? '\n\u0410\u0440\u0442. ' + productArticle : '') + '\n'
      : '';

    fetch('https://ceramicadecor.ru/feedback/ceramicadecor_pro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        name: name,
        phone: phone,
        comment: productContext + 'Стандартная форма заявки. Источник: ' + (sourceInput && sourceInput.value ? sourceInput.value : location.href) + (userComment ? '\nКомментарий: ' + userComment : '')
      })
    });

    form.innerHTML = '<p style="color:#25D366;text-align:center;padding:20px 0;">Спасибо! Мы свяжемся с вами в ближайшее время.</p>';
  });

  /* ----- Scroll to top ----- */
  var scrollToTopBtn = document.querySelector('.scroll-to-top');
  if (scrollToTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 400) {
        scrollToTopBtn.classList.add('visible');
      } else {
        scrollToTopBtn.classList.remove('visible');
      }
    }, { passive: true });
    scrollToTopBtn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ----- Catalog filter template ----- */
  document.querySelectorAll('[data-catalog-filter-toggle]').forEach(function(toggleBtn) {
    var section = toggleBtn.closest('.catalog-filter-template');
    var panel = section ? section.querySelector('.catalog-filter-template__inner') : null;
    if (!panel) return;

    toggleBtn.addEventListener('click', function() {
      var isOpen = panel.classList.toggle('catalog-filter-template__inner--open');
      toggleBtn.classList.toggle('catalog-filter-template__toggle--open', isOpen);
      toggleBtn.setAttribute('aria-expanded', String(isOpen));
      toggleBtn.querySelector('span').textContent = isOpen ? 'Скрыть фильтры' : 'Фильтры';
    });
  });

  /* ----- Homepage project gallery ----- */
  document.querySelectorAll('[data-project-gallery]').forEach(function(gallery) {
    var image = gallery.querySelector('[data-project-gallery-image]');
    var prevBtn = gallery.querySelector('[data-project-gallery-prev]');
    var nextBtn = gallery.querySelector('[data-project-gallery-next]');
    var dotsWrap = gallery.querySelector('[data-project-gallery-dots]');
    var photos = [
      { src: 'images/bbq_albion_new_1.jpg', alt: 'Барбекю комплекс Альбион с мангалом и казаном' },
      { src: 'images/bbq_albion_new_2.jpg', alt: 'Барбекю комплекс Альбион, ракурс 2' },
      { src: 'images/bbq_albion_new_3.jpg', alt: 'Барбекю комплекс Альбион, ракурс 3' },
      { src: 'images/bbq_albion_new_4.jpg', alt: 'Барбекю комплекс Альбион, деталь облицовки' }
    ];
    var current = 0;
    var dots = [];

    if (!image || !prevBtn || !nextBtn || !dotsWrap) return;

    function setPhoto(index) {
      current = (index + photos.length) % photos.length;
      image.src = photos[current].src;
      image.alt = photos[current].alt;
      dots.forEach(function(dot, dotIndex) {
        dot.classList.toggle('is-active', dotIndex === current);
        dot.setAttribute('aria-current', dotIndex === current ? 'true' : 'false');
      });
    }

    photos.forEach(function(photo, index) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'square_blocks_3__project-dot';
      dot.setAttribute('aria-label', 'Показать фото ' + (index + 1));
      dot.addEventListener('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        setPhoto(index);
      });
      dotsWrap.appendChild(dot);
      dots.push(dot);
    });

    prevBtn.addEventListener('click', function(event) {
      event.preventDefault();
      event.stopPropagation();
      setPhoto(current - 1);
    });
    nextBtn.addEventListener('click', function(event) {
      event.preventDefault();
      event.stopPropagation();
      setPhoto(current + 1);
    });

    setPhoto(0);
  });

  /* ----- Window resize ----- */
  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      if (window.innerWidth > 900) {
        closeMenu();
      }
    }, 200);
  });

  /* ----- Cookie banner ----- */
  var cookieBanner = document.getElementById('cookieBanner');
  var cookieAcceptBtn = document.getElementById('cookieAccept');
  if (cookieBanner && cookieAcceptBtn) {
    if (localStorage.getItem('cookieAccepted')) {
      cookieBanner.style.display = 'none';
    } else {
      cookieAcceptBtn.addEventListener('click', function () {
        localStorage.setItem('cookieAccepted', '1');
        cookieBanner.classList.add('cookie-banner--hidden');
        setTimeout(function () { cookieBanner.style.display = 'none'; }, 320);
      });

      var catSection = document.getElementById('categories');
      if (catSection && 'IntersectionObserver' in window) {
        var cookieObserver = new IntersectionObserver(function (entries) {
          if (entries[0].isIntersecting) {
            cookieBanner.classList.remove('cookie-banner--hidden');
            cookieObserver.disconnect();
          }
        }, { threshold: 0.1 });
        cookieObserver.observe(catSection);
      } else {
        cookieBanner.classList.remove('cookie-banner--hidden');
      }
    }
  }

})();
