/* ===== CeramicaDecor — Site Search ===== */
(function () {
  'use strict';

  /* ----- Site pages ----- */
  var PAGES = [
    { title: 'Главная', url: 'index.html', desc: 'Премиальные камины и керамическая облицовка' },
    { title: 'Каталог', url: 'catalog.html', desc: 'Все разделы каталога CeramicaDecor' },
    { title: 'Изразцы', url: 'catalog-izrazcy.html', desc: 'Каталог изразцов и керамических элементов' },
    { title: 'Камины', url: 'catalog-kaminy.html', desc: 'Камины в керамической облицовке' },
    { title: 'Биокамины', url: 'catalog-biokaminy.html', desc: 'Биокамины и декоративные облицовки' },
    { title: 'Электрокамины', url: 'catalog-elektrokaminy.html', desc: 'Электрокамины и порталы' },
    { title: 'Мраморные порталы', url: 'catalog-mramornye-portaly.html', desc: 'Мраморные каминные порталы' },
    { title: 'Камины в облицовке мрамором', url: 'catalog-kaminy-v-oblicovke-mramorom.html', desc: 'Камины в мраморной облицовке' },
    { title: 'Русские печи', url: 'catalog-russkie-pechi.html', desc: 'Русские печи с керамической облицовкой' },
    { title: 'Отопительные печи', url: 'catalog-otopitelnye-pechi.html', desc: 'Отопительные печи' },
    { title: 'Барбекю комплексы', url: 'catalog-barbekyu-kompleksy.html', desc: 'Барбекю комплексы и летние кухни' },
    { title: 'Банные печи', url: 'catalog-bannye-pechi.html', desc: 'Банные печи' },
    { title: 'Серийные модели', url: 'catalog-seriynye-modeli.html', desc: 'Серийные модели каминов и печей' },
    { title: 'Фасадная керамика', url: 'catalog-fasadnaya-keramika.html', desc: 'Фасадная керамика' },
    { title: 'Интерьерная керамика', url: 'catalog-interernaya-keramika.html', desc: 'Интерьерная керамика' },
    { title: 'Метлахская плитка', url: 'catalog-metlahskaya-plitka.html', desc: 'Метлахская плитка' },
    { title: 'Сувенирная продукция', url: 'catalog-suvenirnaya-produkciya.html', desc: 'Керамические сувениры' },
    { title: 'Проекты в работе', url: 'catalog-proekty-v-rabote.html', desc: 'Проекты каминов, печей и барбекю комплексов в разработке' },
    { title: 'Палитра глазурей', url: 'glaze-palette.html', desc: 'Палитра глазурей и оттенков' },
    { title: 'Реставрация', url: 'restoration.html', desc: 'Реставрация каминов, печей и изразцов' },
    { title: 'Оборудование', url: 'components.html', desc: 'Топки, дымоходы и оборудование' },
    { title: 'Сотрудничество', url: 'cooperation.html', desc: 'Партнерство для архитекторов, дизайнеров, строителей и дилеров' },
    { title: 'Блог', url: 'blog.html', desc: 'Материалы об изразцах, каминах, печах и керамике' },
    { title: 'Часто задаваемые вопросы', url: 'faq.html', desc: 'Ответы на частые вопросы об изразцах' },
    { title: 'О компании', url: 'about.html', desc: 'CeramicaDecor — 14 лет опыта' },
    { title: 'Контакты', url: 'contacts.html', desc: 'Связаться с нами' }
  ];

  /* ----- Catalog products (kaminy + bbq) ----- */
  var PRODUCTS = [
    {id:'kamin-albion',cat:'kaminy',name:'Камин Альбион',desc:'Классический белый камин Альбион с топкой LISEO CASTIRON',price:'от 4 000 000',img:'kamin_albion_new_1.jpg'},
    {id:'kamin-albion-bio',cat:'kaminy',name:'Биокамин Альбион',desc:'Облицовка биокамина изразцами Альбион в майоликовой глазури',price:'от 4 000 000',img:'kamin_albion_bio_new_1.jpg'},
    {id:'kamin-tulpan',cat:'kaminy',name:'Камин Тюльпан',desc:'Камин в облицовке Тюльпан с Г-образной топкой Экокамин Альфа 1000 RB',price:'от 6 000 000',img:'kamin_tulpan_new_1.jpg'},
    {id:'kamin-tulpan-arktika',cat:'kaminy',name:'Камин Тюльпан Арктика',desc:'Комплект каминной облицовки Тюльпан в цвете Арктика',price:'от 4 300 000',img:'kamin_tulpan_arktika_new_1.jpg'},
    {id:'kamin-versal',cat:'kaminy',name:'Камин Версаль',desc:'Изразцовый камин Версаль в цвете Арктическая лагуна',price:'от 5 500 000',img:'kamin_versal_new_1.jpg'},
    {id:'kamin-bristol',cat:'kaminy',name:'Камин Бристоль',desc:'Камин с П-образной топкой в облицовке Бристоль в цвете Чёрная ночь',price:'от 5 300 000',img:'kamin_bristol_new_1.jpg'},
    {id:'kamin-dorf',cat:'kaminy',name:'Камин Дорф',desc:'Биокамин Дорф с очагом Airtone Andalle 1000',price:'от 9 800 000',img:'kamin_dorf_new_1.jpg'},
    {id:'kamin-dorf-murav',cat:'kaminy',name:'Камин Дорф Муравленый',desc:'Комплект каминной облицовки Дорф в цвете Муравленый',price:'от 6 800 000',img:'kamin_dorf_murav_new_1.jpg'},
    {id:'kamin-artnuvo',cat:'kaminy',name:'Камин Арт Нуво',desc:'Комплект каминной облицовки Арт Нуво в фисташковой декоративной палитре',price:'от 4 000 000',img:'kamin_artnuvo_new_1.jpg'},
    {id:'kamin-pticy',cat:'kaminy',name:'Камин Птицы',desc:'Изразцовый камин с топкой Астов П2С в облицовке Птицы',price:'от 7 500 000',img:'kamin_pticy_new_1.jpg'},
    {id:'kamin-vizantiya',cat:'kaminy',name:'Камин Византия',desc:'Изразцовый камин Византия в росписи Олива',price:'от 6 800 000',img:'kamin_vizantiya_1.jpg'},
    {id:'kamin-rollers',cat:'kaminy',name:'Камин Роллерс',desc:'Камин с топкой Астов П2С 8457 в облицовке изразцами коллекции Роллерс',price:'от 8 000 000',img:'kamin_rollers_new_1.jpg'},
    {id:'kamin-luna',cat:'kaminy',name:'Камин Луна',desc:'Камин в классическом стиле из коллекции Луна с топкой Spartherm Linear 4S Arte',price:'от 5 000 000',img:'kamin_luna_new_1.jpg'},
    {id:'kamin-universal',cat:'kaminy',name:'Каминный портал Универсал',desc:'Каминный портал Универсал в цвете Арктика',price:'от 2 000 000',img:'kamin_universal_6.jpg'},
    {id:'kamin-universal-uglov',cat:'kaminy',name:'Угловой камин Универсал',desc:'Облицовка углового камина изразцами Универсал',price:'от 2 000 000',img:'kamin_universal_uglov_1.jpg'},
    {id:'kamin-provans',cat:'kaminy',name:'Камин Камея',desc:'Изразцовый камин в коллекции Камея с художественной росписью ручной работы',price:'от 3 300 000',img:'kamin_kameya_new_1.jpg'},
    {id:'kamin-bravo',cat:'kaminy',name:'Камин Браво',desc:'Камин в облицовке изразцами коллекции Браво с росписью',price:'от 4 600 000',img:'kamin_bravo_4.jpg'},
    {id:'kamin-soho',cat:'kaminy',name:'Камин Сохо',desc:'Облицовка камина до полки с дровниками по бокам в коллекции Сохо',price:'от 8 500 000',img:'kamin_soho_new_1.jpg'},
    {id:'kamin-usadba',cat:'kaminy',name:'Камин Усадьба',desc:'Изразцовый камин Усадьба с призматической угловой топкой',price:'от 5 100 000',img:'kamin_usadba_new_1.jpg'},
    {id:'kamin-ptichki',cat:'kaminy',name:'Камин Птички',desc:'Каминная облицовка Птички в декоративной палитре Лесная',price:'от 4 400 000',img:'kamin_ptichki_new_1.jpg'},
    {id:'kamin-elegans',cat:'kaminy',name:'Камин Элеганс',desc:'Комплект каминной облицовки Элеганс в цвете Лесной Туман',price:'от 5 100 000',img:'kamin_elegans_2.jpg'},
    {id:'kamin-minimalist',cat:'kaminy',name:'Камин Минималист',desc:'Каминная облицовка в стиле минимализм',price:'от 5 000 000',img:'kamin_minimalist_new_1.jpg'},
    {id:'kamin-venskaya',cat:'kaminy',name:'Камин Венская',desc:'Электрокамин белого цвета в изразцах коллекции Венская',price:'от 4 400 000',img:'kamin_venskaya_1.jpg'},
    {id:'kamin-dorf-brunner',cat:'kaminy',name:'Камин Венская с топкой Brunner',desc:'Классический камин в облицовке коллекции Венская с топкой Brunner',price:'от 11 500 000',img:'kamin_venskaya_brunner_new2_1.jpg'},
    {id:'bbq-albion',cat:'bbq',name:'Барбекю комплекс Альбион с мангалом и казаном',desc:'Зона барбекю с мангалом и казаном в загородном доме',price:'от 7 400 000',img:'bbq_albion_new_1.jpg'},
    {id:'bbq-albion-mini',cat:'bbq',name:'Барбекю комплекс Альбион с мангалом',desc:'Облицовка маленького печного комплекса с мангалом',price:'от 6 500 000',img:'bbq_albion_mini_new_1.jpg'},
    {id:'bbq-versal',cat:'bbq',name:'Барбекю комплекс Версаль',desc:'Барбекю комплекс в изразцовой облицовке Версаль',price:'от 18 600 000',img:'bbq_versal_new_1.jpg'},
    {id:'bbq-versal-siniy',cat:'bbq',name:'Летняя кухня Версаль',desc:'Многофункциональная летняя кухня в облицовке изразцами Версаль',price:'от 23 000 000',img:'bbq_versal_siniy_new_1.jpg'},
    {id:'bbq-tulpan',cat:'bbq',name:'Мангал Тюльпан',desc:'Белый мангал в облицовке изразцами коллекции Тюльпан',price:'от 6 400 000',img:'bbq_tulpan_new_1.jpg'},
    {id:'bbq-dorf',cat:'bbq',name:'Эксклюзивная кухня в изразцовой облицовке',desc:'Масштабный проект премиум-класса в облицовке изразцами коллекции Дорф',price:'от 25 000 000',img:'bbq_dorf_1.jpg'},
    {id:'bbq-dorf-mangal',cat:'bbq',name:'Барбекю комплекс Дорф с мангалом и духовкой',desc:'Барбекю комплекс в ярких зеленых изразцах коллекции Дорф',price:'от 9 000 000',img:'bbq_dorf_mangal_new_1.jpg'},
    {id:'bbq-ptichki',cat:'bbq',name:'Барбекю комплекс Птички',desc:'Барбекю комплекс в яркой облицовке Птички',price:'от 6 600 000',img:'bbq_ptichki_new_1.jpg'},
    {id:'bbq-ptichki-elegans',cat:'bbq',name:'Барбекю комплекс Птички и Элеганс',desc:'Печной комплекс с мангалом и печью под казан в облицовке Элеганс и Птички',price:'от 10 400 000',img:'bbq_ptichki_elegans_1.jpg'},
    {id:'bbq-pticy',cat:'bbq',name:'Барбекю комплекс Птицы',desc:'Печной комплекс из кирпича в коллекции Птицы',price:'от 21 000 000',img:'bbq_pticy_new_1.jpg'},
    {id:'bbq-vizantiya',cat:'bbq',name:'Летняя кухня Византия',desc:'Летняя кухня в изразцовой облицовке Византия',price:'от 4 600 000',img:'bbq_vizantiya_new_1.jpg'},
    {id:'bbq-vizantiya-kamin',cat:'bbq',name:'Барбекю комплекс Византия с камином',desc:'Облицовка печного комплекса с высоким открытым камином изразцами Византия',price:'от 42 000 000',img:'bbq_vizantiya_kamin_new_1.jpg'},
    {id:'bbq-vizantiya-big',cat:'bbq',name:'Печной комплекс в изразцовой облицовке Византия с беседкой',desc:'Изразцовая облицовка Византия в палитре росписи Бирюзовая',price:'от 28 500 000',img:'bbq_vizantiya_big_new_1.jpg'},
    {id:'bbq-azulezhu',cat:'bbq',name:'Мангал Азулежу',desc:'Мангал на кухне в изразцах из коллекции Азулежу',price:'от 3 700 000',img:'bbq_azulezhu_new_1.jpg'},
    {id:'bbq-elegans',cat:'bbq',name:'Барбекю комплекс Элеганс',desc:'Облицовка готового печного комплекса с мангалом, печью и плитой',price:'от 16 300 000',img:'bbq_elegans_new_1.jpg'},
    {id:'bbq-elegans-granit',cat:'bbq',name:'Летняя кухня Элеганс',desc:'Летняя кухня в изразцовой облицовке коллекции Элеганс и столешницей из гранита',price:'от 4 700 000',img:'bbq_elegans_granit_new_1.jpg'},
    {id:'bbq-scenki',cat:'bbq',name:'Барбекю комплекс Камея',desc:'Барбекю комплекс в изразцовой облицовке с художественной росписью Птицы',price:'от 9 600 000',img:'bbq_scenki_new_1.jpg'}
  ];

  /* ----- State ----- */
  var izrazcyLoaded = false;
  var izrazcyLoading = false;
  var pendingQuery = null;
  var modalEl = null;
  var inputEl, resultsEl, clearBtnEl;
  var isOpen = false;
  var searchTimer;

  /* ----- Modal template ----- */
  var SEARCH_ICON_SVG = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';

  function createModal() {
    var div = document.createElement('div');
    div.innerHTML =
      '<div class="search-modal" id="siteSearchModal" role="dialog" aria-modal="true" aria-label="Поиск">' +
        '<div class="search-modal__backdrop" id="siteSearchBackdrop"></div>' +
        '<div class="search-modal__panel">' +
          '<div class="search-modal__head">' +
            '<div class="search-modal__input-wrap">' +
              '<span class="search-modal__icon">' + SEARCH_ICON_SVG + '</span>' +
              '<input type="search" class="search-modal__input" id="siteSearchInput" placeholder="Поиск по сайту..." autocomplete="off" spellcheck="false">' +
              '<button class="search-modal__clear" id="siteSearchClear" aria-label="Очистить" style="display:none">' +
                '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
              '</button>' +
            '</div>' +
            '<button class="search-modal__close" id="siteSearchClose" aria-label="Закрыть">' +
              '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
            '</button>' +
          '</div>' +
          '<div class="search-modal__results" id="siteSearchResults"></div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(div.firstElementChild);

    modalEl = document.getElementById('siteSearchModal');
    inputEl = document.getElementById('siteSearchInput');
    resultsEl = document.getElementById('siteSearchResults');
    clearBtnEl = document.getElementById('siteSearchClear');

    document.getElementById('siteSearchClose').addEventListener('click', closeSearch);
    document.getElementById('siteSearchBackdrop').addEventListener('click', closeSearch);

    clearBtnEl.addEventListener('click', function () {
      inputEl.value = '';
      clearBtnEl.style.display = 'none';
      inputEl.focus();
      showDefault();
    });

    inputEl.addEventListener('input', onInput);
    document.addEventListener('keydown', onKeydown);
  }

  /* ----- Open / Close ----- */
  function openSearch() {
    if (!modalEl) createModal();
    // check if izrazcy is already available (e.g. on catalog-izrazcy.html)
    if (typeof window.izrazcyCatalog !== 'undefined') izrazcyLoaded = true;
    modalEl.classList.add('active');
    document.body.style.overflow = 'hidden';
    isOpen = true;
    setTimeout(function () { inputEl.focus(); }, 50);
    showDefault();
    if (!izrazcyLoaded && !izrazcyLoading) loadIzrazcyData();
  }

  function closeSearch() {
    if (!modalEl) return;
    modalEl.classList.remove('active');
    document.body.style.overflow = '';
    isOpen = false;
    inputEl.value = '';
    clearBtnEl.style.display = 'none';
    pendingQuery = null;
  }

  /* ----- Lazy load izrazcy-data.js ----- */
  function loadIzrazcyData() {
    izrazcyLoading = true;
    // Determine base path (works both from root and potential subdirs)
    var scripts = document.getElementsByTagName('script');
    var base = '';
    for (var i = 0; i < scripts.length; i++) {
      var src = scripts[i].src || '';
      if (src.indexOf('search.js') !== -1) {
        base = src.replace('search.js', '');
        break;
      }
    }
    var s = document.createElement('script');
    s.src = base + 'izrazcy-data.js';
    s.onload = function () {
      izrazcyLoaded = true;
      izrazcyLoading = false;
      if (pendingQuery && isOpen) doSearch(pendingQuery);
    };
    s.onerror = function () {
      izrazcyLoading = false;
    };
    document.head.appendChild(s);
  }

  /* ----- Input handler with debounce ----- */
  function onInput() {
    var q = inputEl.value.trim();
    clearBtnEl.style.display = q ? 'flex' : 'none';
    clearTimeout(searchTimer);
    if (!q) { showDefault(); return; }
    searchTimer = setTimeout(function () { doSearch(q); }, 200);
  }

  /* ----- Keyboard ----- */
  function onKeydown(e) {
    if (!isOpen) return;
    if (e.key === 'Escape') closeSearch();
  }

  /* ----- Search logic ----- */
  function doSearch(q) {
    var ql = q.toLowerCase();
    pendingQuery = q;

    var pageResults = PAGES.filter(function (p) {
      return contains(p.title, ql) || contains(p.desc, ql);
    });

    var kaminyResults = PRODUCTS.filter(function (p) {
      return p.cat === 'kaminy' && (contains(p.name, ql) || contains(p.desc, ql));
    }).slice(0, 6);

    var bbqResults = PRODUCTS.filter(function (p) {
      return p.cat === 'bbq' && (contains(p.name, ql) || contains(p.desc, ql));
    }).slice(0, 6);

    var izrazcyResults = [];
    if (typeof window.izrazcyCatalog !== 'undefined') {
      izrazcyLoaded = true;
      izrazcyResults = window.izrazcyCatalog.filter(function (item) {
        return contains(item.n, ql) ||
               contains(item.a, ql) ||
               (item.colors && item.colors.join(' ').toLowerCase().indexOf(ql) !== -1) ||
               contains(item.style, ql) ||
               contains(item.type, ql) ||
               contains(item.surface, ql);
      }).slice(0, 8);
    }

    renderResults(q, pageResults, kaminyResults, bbqResults, izrazcyResults);
  }

  function contains(str, sub) {
    return str && str.toLowerCase().indexOf(sub) !== -1;
  }

  /* ----- Render results ----- */
  function renderResults(q, pages, kaminy, bbq, izrazcy) {
    var total = pages.length + kaminy.length + bbq.length + izrazcy.length;
    var html = '';

    if (total === 0) {
      html = '<div class="search-empty">' +
        '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' +
        '<p>По запросу <b>«' + escHtml(q) + '»</b> ничего не найдено</p>' +
        (izrazcyLoading ? '<span class="search-loading-hint">Загружаем изразцы...</span>' : '') +
      '</div>';
      resultsEl.innerHTML = html;
      return;
    }

    if (pages.length) {
      html += '<div class="search-section">' +
        '<div class="search-section__title">Разделы сайта</div>';
      pages.forEach(function (p) {
        html += '<a href="' + escHtml(p.url) + '" class="search-result-page">' +
          '<div class="search-result-page__icon">' + SEARCH_ICON_SVG + '</div>' +
          '<div>' +
            '<div class="search-result-page__title">' + highlight(p.title, q) + '</div>' +
            '<div class="search-result-page__desc">' + escHtml(p.desc) + '</div>' +
          '</div>' +
        '</a>';
      });
      html += '</div>';
    }

    if (kaminy.length) {
      html += '<div class="search-section">' +
        '<div class="search-section__title">Камины</div>' +
        '<div class="search-products-grid">';
      kaminy.forEach(function (p) { html += productCard(p, q); });
      html += '</div></div>';
    }

    if (bbq.length) {
      html += '<div class="search-section">' +
        '<div class="search-section__title">Барбекю комплексы</div>' +
        '<div class="search-products-grid">';
      bbq.forEach(function (p) { html += productCard(p, q); });
      html += '</div></div>';
    }

    if (izrazcy.length) {
      html += '<div class="search-section">' +
        '<div class="search-section__title">Изразцы</div>' +
        '<div class="search-products-grid">';
      izrazcy.forEach(function (item) { html += izrazcyCard(item, q); });
      html += '</div></div>';
    } else if (izrazcyLoading) {
      html += '<div class="search-loading-hint">Загружаем каталог изразцов...</div>';
    }

    resultsEl.innerHTML = html;
  }

  /* ----- Default state (no query) ----- */
  function showDefault() {
    var html = '<div class="search-section"><div class="search-section__title">Разделы сайта</div>';
    PAGES.forEach(function (p) {
      html += '<a href="' + escHtml(p.url) + '" class="search-result-page">' +
        '<div class="search-result-page__icon">' + SEARCH_ICON_SVG + '</div>' +
        '<div>' +
          '<div class="search-result-page__title">' + escHtml(p.title) + '</div>' +
          '<div class="search-result-page__desc">' + escHtml(p.desc) + '</div>' +
        '</div>' +
      '</a>';
    });
    html += '</div>';
    resultsEl.innerHTML = html;
  }

  /* ----- Product card ----- */
  function productCard(p, q) {
    var url = 'catalog.html?cat=' + p.cat + '&product=' + p.id;
    return '<a href="' + escHtml(url) + '" class="search-result-product">' +
      '<div class="search-result-product__img">' +
        '<img src="images/' + escHtml(p.img) + '" alt="' + escHtml(p.name) + '" loading="lazy" onerror="this.style.display=\'none\'">' +
      '</div>' +
      '<div class="search-result-product__info">' +
        '<div class="search-result-product__name">' + highlight(p.name, q) + '</div>' +
        '<div class="search-result-product__price">' + escHtml(p.price) + ' ₽</div>' +
      '</div>' +
    '</a>';
  }

  /* ----- Izrazcy card ----- */
  function izrazcyCard(item, q) {
    var imgUrl = 'images/izrazcy/' + (item.img || '').replace(/\//g, '_') + '.jpg';
    var article = item.a || '';
    var url = 'catalog-izrazcy.html?article=' + encodeURIComponent(article);
    return '<a href="' + escHtml(url) + '" class="search-result-product">' +
      '<div class="search-result-product__img">' +
        '<img src="' + escHtml(imgUrl) + '" alt="' + escHtml(item.n || '') + '" loading="lazy" onerror="this.style.display=\'none\'">' +
      '</div>' +
      '<div class="search-result-product__info">' +
        '<div class="search-result-product__name">' + highlight(item.n || '', q) + '</div>' +
        '<div class="search-result-product__price">' + escHtml(String(item.p || '')) + ' ₽</div>' +
        (article ? '<div class="search-result-product__art">Арт. ' + escHtml(article) + '</div>' : '') +
      '</div>' +
    '</a>';
  }

  /* ----- Helpers ----- */
  function escHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function highlight(text, query) {
    var escaped = escHtml(text);
    if (!query) return escaped;
    var safeQ = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return escaped.replace(new RegExp('(' + escHtml(safeQ) + ')', 'gi'), '<mark>$1</mark>');
  }

  /* ----- Wire up buttons ----- */
  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('searchBtn');
    var btnMob = document.getElementById('searchBtnMobile');
    if (btn) btn.addEventListener('click', openSearch);
    if (btnMob) {
      btnMob.addEventListener('click', function (e) {
        e.preventDefault();
        openSearch();
      });
    }
  });

})();

