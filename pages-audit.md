# Аудит HTML-страниц CeramicaDecor

Дата проверки: 2026-07-23. Предыдущая проверка: 2026-07-22.

Состав страниц перепроверен по факту: списки ниже соответствуют файлам на диске.

Всего в пакете 42 HTML-файла: 33 публичные страницы, 5 шаблонов карточек товара, 3 внутренние страницы сотрудников и `404.html`.

## Обязательные страницы из README

| Страница | Статус |
|---|---|
| `index.html` | есть |
| `about.html` | есть |
| `contacts.html` | есть |
| `privacy.html` | есть |
| `terms.html` | есть |
| `catalog.html` | есть |
| `portfolio.html` | есть |
| `glaze-palette.html` | есть |
| `restoration.html` | есть |
| `components.html` | есть |
| `cooperation.html` | есть |
| `blog.html` | есть |
| `contacts-gallery-review.html` | есть |
| `faq.html` | есть, добавлена 2026-07-23 |
| `404.html` | есть |
| `login.html` | есть |
| `password-recovery.html` | есть |
| `password-reset.html` | есть, второй шаг восстановления |

## Разделы каталога

15 разделов из README, все на месте:

| Страница | Статус |
|---|---|
| `catalog-izrazcy.html` | есть |
| `catalog-kaminy.html` | есть |
| `catalog-biokaminy.html` | есть |
| `catalog-elektrokaminy.html` | есть |
| `catalog-mramornye-portaly.html` | есть |
| `catalog-kaminy-v-oblicovke-mramorom.html` | есть |
| `catalog-russkie-pechi.html` | есть |
| `catalog-otopitelnye-pechi.html` | есть |
| `catalog-barbekyu-kompleksy.html` | есть |
| `catalog-bannye-pechi.html` | есть |
| `catalog-seriynye-modeli.html` | есть |
| `catalog-fasadnaya-keramika.html` | есть |
| `catalog-interernaya-keramika.html` | есть |
| `catalog-metlahskaya-plitka.html` | есть |
| `catalog-suvenirnaya-produkciya.html` | есть |

## Страницы сотрудничества

| Страница | Пункт меню | Статус |
|---|---|---|
| `cooperation-stovemakers.html` | `Печники` | есть |
| `cooperation-developers.html` | `Застройщики` | есть |
| `cooperation-fireplace-salons.html` | `Салоны каминов` | есть |
| `cooperation-tile-salons.html` | `Салоны интерьерных решений` | есть |

Пункт `Дизайнеры` в меню ведёт на общую `cooperation.html`.

2026-07-23: раздел `Салоны плитки` переименован в `Салоны интерьерных решений`. Имя файла `cooperation-tile-salons.html` и адрес в `sitemap.xml` намеренно оставлены прежними, чтобы не менять URL страницы. Программисту при интеграции ориентироваться на имя файла, а не на название раздела.

## Часто задаваемые вопросы

`faq.html` добавлена 2026-07-23. Структура как у остальных публичных страниц: баннер с заголовком и коротким описанием, дальше один текстовый блок с вопросами и ответами, без аккордеона и без форм.

Тексты вопросов и ответов взяты из рабочего документа заказчика (раздел «Частые вопросы») дословно, тремя группами: «Цветные изразцы» (3 вопроса), «Однотонные изразцы» (4), «Изразцы с художественной росписью» (4). Всего 11 вопросов. При интеграции этот блок должен наполняться из внутренней системы, см. `dynamic-zones-audit.md`.

Страница добавлена в `sitemap.xml`, в список страниц в `search.js` и в служебные ссылки футера (`.footer__legal`, первым пунктом перед политикой и соглашением) на всех 39 публичных страницах и шаблонах. В верхнем меню пункта нет. Внутренние страницы сотрудников футер не содержат, поэтому ссылки там не появилось.

## Шаблоны карточек товара

| Шаблон | Статус |
|---|---|
| `product-izrazec-template.html` | есть |
| `product-drovyanoi-kamin-template.html` | есть |
| `product-barbekyu-kompleks-albion-template.html` | есть |
| `product-restavraciya-izrazcovye-pechi-template.html` | есть |
| `product-components-astov-ps-7363-template.html` | есть |

Отдельных файлов под каждый товар нет и делать их не нужно, см. правило `?product=` в `readme.md`.

## Удалённые страницы

Эти страницы были в проекте и удалены из чистого дизайн-пакета намеренно:

- `hero-review.html`;
- `izrazcy.html`;
- `ready.html`;
- `reviews.html`;
- `portfolio-review.html` (удалена 2026-07-22);
- `catalog-mramornye-kaminy-portaly.html` (удалена 2026-07-22).

Раздел «Мраморные камины и порталы» был разделён на два: `catalog-mramornye-portaly.html` и `catalog-kaminy-v-oblicovke-mramorom.html`. Старый объединённый файл больше не нужен.

`izrazcy.html` не хранила самостоятельную базу каталога. Рабочим шаблоном раздела изразцов является `catalog-izrazcy.html`; данные остаются в `izrazcy-data.js`, `izrazcy-relations.js` и `izrazcy-360-data.js`. Поиск изразцов переключен на `catalog-izrazcy.html?article=...`.

`ready.html` была старой страницей серийных моделей. Её роль перенесена в `catalog-seriynye-modeli.html`: добавлены демонстрационные карточки серий Дорф и Ритм, используется `images/ready_banner.png`.

## Важное

`login.html`, `password-recovery.html` и `password-reset.html` являются внутренними страницами для сотрудников. Они не должны добавляться в публичную шапку, футер, поиск или `sitemap.xml`. Проверено 2026-07-23: в `sitemap.xml` их нет.

Восстановление пароля состоит из двух шагов: `password-recovery.html` — запрос ссылки по email, `password-reset.html` — ввод нового пароля. Второй шаг открывается по ссылке с токеном (`password-reset.html?token=...`), которую при интеграции формирует Laravel. Поле email на втором шаге должно автоматически заполняться адресом с первого шага, в вёрстке оно пустое — место отмечено HTML-комментарием. Ссылка между шагами есть только внутри success-сообщения первого шага и нужна для просмотра вёрстки.
