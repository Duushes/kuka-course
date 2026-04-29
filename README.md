# KUKA Course

Открытый интерактивный курс по промышленным роботам KUKA. 10 модулей: от линейки роботов и архитектуры контроллера KRC4/KRC5 до KRL, безопасности (ISO 10218-1:2025), интеграции с PLC/ROS и финального экзамена из 15 вопросов.

Сайт: <https://duushes.github.io/kuka-course/>

## Стек

- Next.js 16 (App Router) + TypeScript 5
- TailwindCSS 4
- Framer Motion 12+
- Полностью клиентское (без backend), прогресс в `localStorage`
- Static export → GitHub Pages

## Локальный запуск

```bash
npm install
npm run dev
```

Откройте <http://localhost:3000/kuka-course/>. Из-за `basePath: '/kuka-course'` корень `/` редиректит на префикс.

## Production-сборка

```bash
npm run build
```

Результат — папка `out/` со статическими HTML/JS/CSS.

## Деплой на GitHub Pages

1. Создайте репозиторий `kuka-course` на GitHub.
2. Настройте Pages: Settings → Pages → Source → Deploy from branch → `gh-pages` / root.
3. Сборка и пуш:
   ```bash
   npm run build
   touch out/.nojekyll
   git -C out init && git -C out add . && git -C out commit -m "deploy"
   git -C out remote add origin git@github.com:duushes/kuka-course.git
   git -C out push -f origin HEAD:gh-pages
   ```
4. URL: `https://duushes.github.io/kuka-course/`.

## Структура

```
src/
├── app/                # layout, page, globals.css (CSS-переменные тем)
├── context/            # CourseContext — state + localStorage
├── components/         # Quiz, DragDrop, InputExercise, ScenarioCard, Confetti, …
└── modules/
    ├── Module1.tsx     # Введение в KUKA
    ├── Module2.tsx     # Архитектура KRC4/KRC5
    ├── Module3.tsx     # Координаты и кинематика
    ├── Module4.tsx     # KRL
    ├── Module5.tsx     # WorkVisual + SmartPAD
    ├── Module6.tsx     # Безопасность
    ├── Module7.tsx     # Прикладные пакеты
    ├── Module8.tsx     # Интеграция (RSI / EKI / OPC UA)
    ├── Module9.tsx     # Sunrise.OS, симуляция, диагностика
    └── Module10.tsx    # Финальный экзамен (15 MC)
```

`localStorage` ключи: `kuka-course-state` (прогресс, ответы, score), `kuka-theme` (light/dark), `kuka-scroll-positions` (позиция скролла по модулю).

## Дисклеймер

Образовательный некоммерческий проект. Не аффилирован с KUKA AG. Все упоминаемые продукты и товарные знаки (KUKA®, KR AGILUS®, LBR iiwa®, KUKA.Sim®, WorkVisual®, mxAutomation®, Sunrise.OS® и др.) принадлежат правообладателям.
