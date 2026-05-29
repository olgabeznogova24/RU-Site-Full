# SEO-аудит CeramicaDecor

Дата проверки: 2026-05-29.

## Что проверено

Проверены все HTML-страницы, `sitemap.xml` и `robots.txt`:

- `title`;
- `description`;
- `canonical`;
- Open Graph, включая `og:url`;
- H1;
- `robots`;
- наличие `DOMAIN` и пустых SEO-URL;
- наличие внутренних страниц в sitemap.

## Исправлено

- В `sitemap.xml` заменены временные `https://DOMAIN/...` на `https://ceramicadecor.ru/...`.
- В `robots.txt` добавлен рабочий `Sitemap: https://ceramicadecor.ru/sitemap.xml`.
- Убраны устаревшие комментарии `TODO: заменить на реальный домен`.
- Для публичных HTML-страниц добавлены или заполнены `canonical`.
- Для публичных HTML-страниц добавлены или заполнены `og:url`.
- Для `terms.html` в контактном блоке указан сайт `https://ceramicadecor.ru/`.

## Текущее состояние

| Проверка | Статус |
|---|---|
| Все HTML имеют `title` | ок |
| Все HTML имеют `description` | ок |
| Все публичные HTML имеют один H1 | ок |
| Все публичные HTML имеют `canonical` | ок |
| Все публичные HTML имеют `og:url` | ок |
| `login.html` и `password-recovery.html` имеют `noindex, nofollow` | ок |
| `login.html` и `password-recovery.html` отсутствуют в `sitemap.xml` | ок |
| `404.html` отсутствует в `sitemap.xml` и имеет `noindex, follow` | ок |
| `DOMAIN` в `sitemap.xml`, `robots.txt`, HTML | не найден |
| Пустые `canonical` и `og:url` | не найдены |

## Что осталось для интеграции

### Повторяющиеся SEO-заготовки

У 17 страниц сейчас одинаковый `description`:

`Более 50 моделей каминов и барбекю в керамической облицовке. Собственное производство, ручная работа, доставка по всей России.`

Страницы с повтором:

- `catalog.html`;
- `catalog-kaminy.html`;
- `catalog-biokaminy.html`;
- `catalog-elektrokaminy.html`;
- `catalog-pech-kaminy.html`;
- `catalog-mramornye-kaminy-portaly.html`;
- `catalog-russkie-pechi.html`;
- `catalog-otopitelnye-pechi.html`;
- `catalog-barbekyu-kompleksy.html`;
- `catalog-bannye-pechi.html`;
- `catalog-bannye-portaly.html`;
- `catalog-fasadnaya-keramika.html`;
- `catalog-interernaya-keramika.html`;
- `catalog-suvenirnaya-produkciya.html`;
- `components.html`;
- `glaze-palette.html`;
- `restoration.html`.

При интеграции нужно заменить эти описания на уникальные SEO-поля из админки или справочника страниц.

### Карточки товаров и изразцов

В статическом пакете нет отдельных HTML-страниц для каждой карточки товара/изразца. При интеграции нужно:

- создать отдельные публичные URL карточек;
- подставлять уникальные `title`, `description`, H1, `canonical`, `og:title`, `og:description`, `og:url`, `og:image`;
- добавить карточки товаров/изразцов в sitemap;
- не открывать карточки товаров как модальные окна.

### Open Graph изображения

Сейчас `og:image` указывает на локальные пути вида `images/...`. Для production нужно подставить абсолютные URL:

```text
https://ceramicadecor.ru/images/...
```

Для карточек товаров и изразцов `og:image` должен быть главным изображением конкретной карточки.

### Privacy и индексация

`privacy.html` сейчас имеет `noindex, nofollow`, но находится в `sitemap.xml`. Перед production нужно принять решение:

- либо оставить страницу noindex и убрать ее из sitemap;
- либо разрешить индексацию и оставить в sitemap.

### Счетчики и вебмастер

В HTML остаются комментарии-заглушки для Яндекс.Метрики и Яндекс.Вебмастера. Это нормально для дизайн-пакета. При интеграции нужно вставить реальные счетчики и verification meta, если они нужны.

## Вывод

Базовая SEO-структура статического пакета приведена в рабочее состояние: пустые canonical/og:url и `DOMAIN` убраны, sitemap и robots указывают на реальный домен, внутренние страницы сотрудников не попали в sitemap. Основная работа для программиста — заменить повторяющиеся SEO-заготовки на реальные поля из внутренней системы и добавить SEO для отдельных карточек товаров/изразцов.
