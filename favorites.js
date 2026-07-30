/* ===== ИЗБРАННОЕ =====
   Демонстрационная реализация на localStorage: нужна, чтобы в вёрстке
   работали сердечки, счётчик в шапке и страница favorites.html.

   ТОЧКИ ИНТЕГРАЦИИ (помечены ниже как INTEGRATION):
   1. Хранилище. Сейчас список лежит в localStorage под ключом cd_favorites.
      Заменить на список пользователя из внутренней системы.
   2. Состав карточки. В вёрстке в data-атрибутах кнопки продублированы имя,
      цена и картинка — иначе favorites.html нечего показать без бэкенда.
      После интеграции достаточно идентификатора товара.
   3. Ссылка «поделиться». Токен генерируется на клиенте только для демонстрации,
      настоящий выдаёт сервер (на старом сайте — /favorite/<токен>/).
*/
(function () {
  'use strict';

  var STORAGE_KEY = 'cd_favorites';        /* INTEGRATION 1 */
  var SHARE_KEY = 'cd_favorites_token';    /* INTEGRATION 3 */

  var HEART_PATH = 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z';

  /* ===== ХРАНИЛИЩЕ ===== */

  function read() {
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      var list = raw ? JSON.parse(raw) : [];
      return Object.prototype.toString.call(list) === '[object Array]' ? list : [];
    } catch (e) {
      /* приватный режим или переполненное хранилище — работаем как с пустым списком */
      return [];
    }
  }

  function write(list) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {}
    notify();
  }

  function indexOf(list, id) {
    for (var i = 0; i < list.length; i++) {
      if (String(list[i].id) === String(id)) return i;
    }
    return -1;
  }

  /* ===== ПУБЛИЧНОЕ API ===== */

  var api = {
    list: function () {
      return read();
    },
    count: function () {
      return read().length;
    },
    has: function (id) {
      return indexOf(read(), id) !== -1;
    },
    add: function (item) {
      if (!item || !item.id) return false;
      var list = read();
      if (indexOf(list, item.id) !== -1) return false;
      list.push(item);
      write(list);
      return true;
    },
    remove: function (id) {
      var list = read();
      var i = indexOf(list, id);
      if (i === -1) return false;
      list.splice(i, 1);
      write(list);
      return true;
    },
    toggle: function (item) {
      if (!item || !item.id) return false;
      return api.has(item.id) ? (api.remove(item.id), false) : (api.add(item), true);
    },
    clear: function () {
      write([]);
    },
    /* токен для ссылки «поделиться»; настоящий выдаёт сервер — INTEGRATION 3 */
    shareToken: function () {
      var token;
      try {
        token = window.localStorage.getItem(SHARE_KEY);
      } catch (e) {}
      if (!token) {
        token = 'demo' + Math.random().toString(36).slice(2, 10);
        try {
          window.localStorage.setItem(SHARE_KEY, token);
        } catch (e) {}
      }
      return token;
    },
    shareUrl: function () {
      var base = window.location.href.split('#')[0].split('?')[0];
      return base + '?list=' + api.shareToken();
    },
    /* перерисовать сердечки и счётчики (вызывается автоматически) */
    sync: syncAll
  };

  /* ===== СОБЫТИЯ ===== */

  function notify() {
    syncAll();
    try {
      document.dispatchEvent(new CustomEvent('favorites:change', { detail: { count: api.count() } }));
    } catch (e) {
      /* старые браузеры без конструктора CustomEvent */
      var ev = document.createEvent('CustomEvent');
      ev.initCustomEvent('favorites:change', true, false, { count: api.count() });
      document.dispatchEvent(ev);
    }
  }

  /* ===== ОТРИСОВКА СОСТОЯНИЙ ===== */

  function syncButtons() {
    var list = read();
    var buttons = document.querySelectorAll('[data-fav-toggle]');
    for (var i = 0; i < buttons.length; i++) {
      var btn = buttons[i];
      var active = indexOf(list, btn.getAttribute('data-fav-id')) !== -1;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
      btn.setAttribute('aria-label', active ? 'Убрать из избранного' : 'Добавить в избранное');
      btn.setAttribute('title', active ? 'Убрать из избранного' : 'Добавить в избранное');
    }
  }

  function syncCounters() {
    var n = api.count();
    var nodes = document.querySelectorAll('[data-fav-count]');
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].textContent = n ? String(n) : '';
      nodes[i].hidden = !n;
    }
  }

  function syncAll() {
    syncButtons();
    syncCounters();
  }

  /* ===== ОБРАБОТЧИКИ ===== */

  function itemFromButton(btn) {
    return {
      id: btn.getAttribute('data-fav-id'),
      name: btn.getAttribute('data-fav-name') || '',
      price: btn.getAttribute('data-fav-price') || '',
      url: btn.getAttribute('data-fav-url') || '',
      img: btn.getAttribute('data-fav-img') || '',
      meta: btn.getAttribute('data-fav-meta') || ''
    };
  }

  /* Перехват на фазе погружения: карточка каталога по клику уходит на страницу
     товара, и её обработчик висит на самой карточке. Всплытие сюда пришло бы
     уже после перехода. */
  document.addEventListener('click', function (e) {
    var btn = e.target && e.target.closest ? e.target.closest('[data-fav-toggle]') : null;
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();
    api.toggle(itemFromButton(btn));
  }, true);

  /* 360-просмотр изразца и слайдеры ловят нажатие, а не клик — гасим и его,
     иначе нажатие на сердечко проворачивает фото */
  ['pointerdown', 'mousedown', 'touchstart'].forEach(function (type) {
    document.addEventListener(type, function (e) {
      var btn = e.target && e.target.closest ? e.target.closest('[data-fav-toggle]') : null;
      if (btn) e.stopPropagation();
    }, true);
  });

  /* карточки каталога и изразцов дорисовываются скриптом уже после загрузки,
     поэтому состояние сердечек обновляем на каждое изменение разметки */
  function watchDom() {
    if (!window.MutationObserver) return;
    var scheduled = false;
    new MutationObserver(function () {
      if (scheduled) return;
      scheduled = true;
      window.requestAnimationFrame(function () {
        scheduled = false;
        syncButtons();
      });
    }).observe(document.body, { childList: true, subtree: true });
  }

  /* избранное открыто в двух вкладках — держим их в одном состоянии.
     Через notify(), а не syncAll(): странице избранного нужно событие
     favorites:change, иначе она не перерисует список.
     Зацикливания нет — storage не приходит во вкладку-источник. */
  window.addEventListener('storage', function (e) {
    if (e.key === STORAGE_KEY) notify();
  });

  function init() {
    syncAll();
    watchDom();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.CDFavorites = api;
  window.CDFavorites.HEART_PATH = HEART_PATH;
})();
