## Основные команды для работы

- Установка - `npm i`
- Запуск локального сервера для работы - `npm start`
- Сборка проекта, минификация скриптов и оптимизация изображений перед деплоем на прод - `npm run build`

Итоговый код попадает в директорию `build`

## SVG

- Оптимизация svg - `gulp svgo`. Оптимизирует все файлы в `src/img`, возвращая на место. Запускается при сборке
- Спрайт генерируется командой `gulp sprite`. Забирает svg из папки `src/img/sprite`, генерирует `sprite_auto.svg`, который кладёт в `build/img/`
- При работе `watch` следит за svg в папке `src/img` и запускает: копирование, создание спрайта, обновление html при изменениях.

## Компоненты, используемые в вёрстке

### Первый экран

`components/first-screen/first-screen.html`

 * @@title: Заголовок
 * @@dsc:   Описание                 
 * @@bgClass: модификатор фона блока

### Заголовок секции

`components/headline/headline.html`

* @@headline: текст внутри `h2`

### Кнопка

`components/btn/btn.html`

 * @@text | текст внутри элемента,
 * @@mod | модификатор бэм-блока кнопки: `disabled` `blue` `white`,
 * @@bemElement | класс элемента бэм-блока `.parent__child`,
 * @@modal | значение атрибута data-modal для вызова модалки,
 * @@href | адрес ссылки, если не указан вставится тег button"
 * @@download | bolean, добавляет атрибутdownload

### Карточка

`components/card/card.html`
 * bemElement | "catalog__item",
 * bemMod | модификатор бэм-блока,
 * title | "Канны",
 * subtitle | "Авторский проект",
 * imgSrc | "img/catalog/project-2",
 * imgW | "950"


### Табы
