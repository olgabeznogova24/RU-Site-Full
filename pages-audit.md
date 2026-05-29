# Аудит HTML-страниц CeramicaDecor

Дата проверки: 2026-05-29.

## Обязательные страницы из README

| Страница | Статус |
|---|---|
| `index.html` | есть |
| `about.html` | есть |
| `contacts.html` | есть |
| `privacy.html` | есть |
| `terms.html` | есть |
| `catalog.html` | есть |
| `glaze-palette.html` | есть |
| `restoration.html` | есть |
| `components.html` | есть |
| `cooperation.html` | есть |
| `404.html` | добавлена |
| `login.html` | добавлена |
| `password-recovery.html` | добавлена |

## Разделы каталога

| Страница | Статус |
|---|---|
| `catalog-izrazcy.html` | есть |
| `catalog-kaminy.html` | есть |
| `catalog-biokaminy.html` | есть |
| `catalog-elektrokaminy.html` | есть |
| `catalog-pech-kaminy.html` | есть |
| `catalog-mramornye-kaminy-portaly.html` | есть |
| `catalog-russkie-pechi.html` | есть |
| `catalog-otopitelnye-pechi.html` | есть |
| `catalog-barbekyu-kompleksy.html` | есть |
| `catalog-bannye-pechi.html` | есть |
| `catalog-bannye-portaly.html` | есть |
| `catalog-seriynye-modeli.html` | есть |
| `catalog-fasadnaya-keramika.html` | есть |
| `catalog-interernaya-keramika.html` | есть |
| `catalog-suvenirnaya-produkciya.html` | есть |

## Дополнительные страницы

Эти страницы были в проекте, но не входят в обязательный список README и удалены из чистого дизайн-пакета:

- `hero-review.html`
- `izrazcy.html`
- `ready.html`
- `reviews.html`

Важно: `izrazcy.html` не хранила самостоятельную базу каталога. Рабочим шаблоном раздела изразцов является `catalog-izrazcy.html`; данные остаются в `izrazcy-data.js`, `izrazcy-relations.js` и `izrazcy-360-data.js`. Поиск изразцов переключен на `catalog-izrazcy.html?article=...`.

Важно: `ready.html` была старой страницей серийных моделей. Её роль перенесена в `catalog-seriynye-modeli.html`: добавлены демонстрационные карточки серий Дорф и Ритм, используется `images/ready_banner.png`. Отдельный файл `ready.html` в чистом пакете не нужен.

## Важное

`login.html` и `password-recovery.html` являются внутренними страницами для сотрудников. Они не должны добавляться в публичную шапку, футер, поиск или `sitemap.xml`.
