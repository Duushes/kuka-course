// Module 1 — Введение в KUKA
// Hero + 4 блока теории + inline SVG со схемой линейки + 3 интерактива (Quiz / DragDrop / ScenarioCard).
// Reading list — стандартные ссылки на сайт KUKA и сторонние гайды.

'use client';

import ModuleWrapper, { fadeInItem } from '@/components/ModuleWrapper';
import Quiz from '@/components/Quiz';
import DragDrop from '@/components/DragDrop';
import ScenarioCard from '@/components/ScenarioCard';
import Takeaways from '@/components/Takeaways';
import { motion } from 'framer-motion';

export default function Module1() {
  return (
    <ModuleWrapper
      moduleIndex={1}
      title="Введение в KUKA"
      subtitle="Кто такие KUKA и зачем вам её роботы"
      readingList={[
        { title: 'KUKA — официальный сайт продуктов', url: 'https://www.kuka.com/en-us/products/robotics-systems' },
        { title: 'KUKA Download Center', url: 'https://www.kuka.com/en-us/services/downloads' },
        { title: 'RoboDK — KUKA Programming Guide', url: 'https://robodk.com/blog/kuka-robot-programming-guide/' },
      ]}
    >
      {/* Введение */}
      <motion.div variants={fadeInItem} className="prose prose-invert max-w-none mb-10">
        <p className="text-muted-foreground leading-relaxed">
          Прежде чем погружаться в <strong className="text-foreground">KRL</strong>{' '}
          <span className="text-muted-foreground/70">(KUKA Robot Language &mdash; язык программирования роботов KUKA)</span>,
          конфигурирование <strong className="text-foreground">KUKA.WorkVisual</strong>{' '}
          <span className="text-muted-foreground/70">(инженерная среда KUKA для конфигурации роботизированной ячейки)</span>{' '}
          или интеграцию робота с <strong className="text-foreground">PLC</strong>{' '}
          <span className="text-muted-foreground/70">(Programmable Logic Controller, промышленный контроллер)</span>,
          полезно понять, <em>с кем именно</em> вы работаете. KUKA &mdash; не один робот,
          а целая линейка от компактных 6-осевых моделей до тяжёлых{' '}
          <strong className="text-foreground">foundry</strong>{' '}
          <span className="text-muted-foreground/70">(литейное производство)</span>-манипуляторов
          и единственного в семействе коллаборативного <strong className="text-foreground">LBR&nbsp;iiwa</strong>.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          В этом модуле мы разложим линейку по полочкам: какая серия для каких задач,
          где KUKA сильна на рынке, и как робот вписывается в типовую промышленную ячейку.
          После этого выбор инструмента под конкретный проект перестанет быть лотереей.
        </p>
      </motion.div>

      {/* Кто такие KUKA */}
      <motion.div variants={fadeInItem} className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Кто такие KUKA</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          <strong className="text-foreground">KUKA AG</strong> &mdash; немецкий производитель
          промышленных роботов, основанный в 1898 году в Аугсбурге. Сегодня компания входит
          в так называемую &laquo;большую четвёрку&raquo; робототехники наряду с
          ABB, FANUC и Yaskawa Motoman. С 2017 года KUKA принадлежит китайскому холдингу
          Midea Group, что заметно усилило её позиции на азиатском рынке.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          По установленной базе KUKA удерживает третье место в мире после FANUC и ABB.
          Около половины выручки приходится на <em>automotive</em>{' '}
          <span className="text-muted-foreground/70">(автомобильное производство)</span> &mdash;
          KUKA исторически сильна в кузовных линиях BMW, Mercedes-Benz, Volkswagen. В России среди крупных клиентов:
          Sollers, КамАЗ, ОДК, ряд предприятий металлообработки и foundry.
        </p>
      </motion.div>

      {/* Линейка серий + SVG */}
      <motion.div variants={fadeInItem} className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Линейка роботов: от AGILUS до FORTEC</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          KUKA не делает &laquo;универсального робота&raquo;. Каждая серия закрывает свой
          диапазон по <strong className="text-foreground">payload</strong>{' '}
          <span className="text-muted-foreground/70">(полезная нагрузка робота, максимальный вес инструмента и объекта)</span>{' '}
          и типичным сценариям. Запомнить пять-шесть имён достаточно,
          чтобы ориентироваться в 90% запросов от заказчиков.
        </p>

        <div className="rounded-xl border border-border/50 bg-card p-6 mb-6">
          <svg
            viewBox="0 0 480 160"
            className="w-full h-auto"
            role="img"
            aria-label="Силуэты серий роботов KUKA: AGILUS, CYBERTECH, QUANTEC, FORTEC, LBR iiwa"
          >
            {/* Базовая линия пола */}
            <line x1="10" y1="125" x2="470" y2="125" stroke="var(--accent)" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="3 3" />

            {/* AGILUS — компактный, тонкая стрела */}
            <g>
              <rect x="30" y="110" width="30" height="15" rx="2" fill="var(--accent-light)" stroke="var(--accent)" strokeWidth="1.5" />
              <rect x="40" y="80" width="10" height="32" fill="var(--accent-light)" stroke="var(--accent)" strokeWidth="1.5" />
              <path d="M 45 80 L 75 65 L 78 70 L 48 86 Z" fill="var(--accent-light)" stroke="var(--accent)" strokeWidth="1.5" />
              <circle cx="76" cy="68" r="3" fill="var(--accent)" />
              <text x="50" y="148" textAnchor="middle" fontSize="10" fill="var(--accent)" fontWeight="600">KR AGILUS</text>
              <text x="50" y="158" textAnchor="middle" fontSize="8" fill="var(--accent)" opacity="0.7">6&ndash;10 кг</text>
            </g>

            {/* CYBERTECH — средний */}
            <g>
              <rect x="115" y="105" width="40" height="20" rx="2" fill="var(--accent-light)" stroke="var(--accent)" strokeWidth="1.5" />
              <rect x="128" y="65" width="14" height="42" fill="var(--accent-light)" stroke="var(--accent)" strokeWidth="1.5" />
              <path d="M 135 65 L 175 50 L 178 56 L 138 73 Z" fill="var(--accent-light)" stroke="var(--accent)" strokeWidth="1.5" />
              <path d="M 175 50 L 190 60 L 188 65 L 173 56 Z" fill="var(--accent-light)" stroke="var(--accent)" strokeWidth="1.5" />
              <circle cx="187" cy="62" r="3" fill="var(--accent)" />
              <text x="140" y="148" textAnchor="middle" fontSize="10" fill="var(--accent)" fontWeight="600">KR CYBERTECH</text>
              <text x="140" y="158" textAnchor="middle" fontSize="8" fill="var(--accent)" opacity="0.7">8&ndash;22 кг</text>
            </g>

            {/* QUANTEC — крупный, мощная стрела */}
            <g>
              <rect x="215" y="100" width="50" height="25" rx="2" fill="var(--accent-light)" stroke="var(--accent)" strokeWidth="1.5" />
              <rect x="230" y="50" width="20" height="52" fill="var(--accent-light)" stroke="var(--accent)" strokeWidth="1.5" />
              <path d="M 240 50 L 285 30 L 290 38 L 245 60 Z" fill="var(--accent-light)" stroke="var(--accent)" strokeWidth="1.5" />
              <path d="M 285 30 L 305 45 L 302 52 L 282 38 Z" fill="var(--accent-light)" stroke="var(--accent)" strokeWidth="1.5" />
              <circle cx="303" cy="48" r="4" fill="var(--accent)" />
              <text x="245" y="148" textAnchor="middle" fontSize="10" fill="var(--accent)" fontWeight="600">KR QUANTEC</text>
              <text x="245" y="158" textAnchor="middle" fontSize="8" fill="var(--accent)" opacity="0.7">90&ndash;300 кг</text>
            </g>

            {/* FORTEC — экстра-тяжёлый */}
            <g>
              <rect x="320" y="92" width="60" height="33" rx="3" fill="var(--accent-light)" stroke="var(--accent)" strokeWidth="1.5" />
              <rect x="338" y="35" width="24" height="60" fill="var(--accent-light)" stroke="var(--accent)" strokeWidth="1.5" />
              <path d="M 350 35 L 400 18 L 405 26 L 355 45 Z" fill="var(--accent-light)" stroke="var(--accent)" strokeWidth="1.5" />
              <path d="M 400 18 L 425 35 L 421 42 L 396 26 Z" fill="var(--accent-light)" stroke="var(--accent)" strokeWidth="1.5" />
              <circle cx="423" cy="38" r="4" fill="var(--accent)" />
              <text x="360" y="148" textAnchor="middle" fontSize="10" fill="var(--accent)" fontWeight="600">KR FORTEC</text>
              <text x="360" y="158" textAnchor="middle" fontSize="8" fill="var(--accent)" opacity="0.7">360&ndash;800 кг</text>
            </g>

            {/* LBR iiwa — тонкий 7-осевой cobot */}
            <g>
              <rect x="438" y="113" width="22" height="12" rx="2" fill="var(--accent-light)" stroke="var(--accent)" strokeWidth="1.5" />
              <circle cx="449" cy="108" r="5" fill="var(--accent-light)" stroke="var(--accent)" strokeWidth="1.5" />
              <line x1="449" y1="103" x2="449" y2="85" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="449" cy="83" r="4" fill="var(--accent-light)" stroke="var(--accent)" strokeWidth="1.5" />
              <line x1="449" y1="80" x2="461" y2="68" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="462" cy="66" r="3.5" fill="var(--accent-light)" stroke="var(--accent)" strokeWidth="1.5" />
              <line x1="462" y1="63" x2="462" y2="50" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
              <circle cx="462" cy="49" r="2.5" fill="var(--accent)" />
              <text x="449" y="148" textAnchor="middle" fontSize="10" fill="var(--accent)" fontWeight="600">LBR iiwa</text>
              <text x="449" y="158" textAnchor="middle" fontSize="8" fill="var(--accent)" opacity="0.7">7/14 кг, cobot</text>
            </g>
          </svg>
          <p className="text-xs text-muted-foreground mt-3 text-center">
            Силуэты не в масштабе &mdash; задача показать рост payload и геометрии слева направо.
          </p>
        </div>

        <ul className="space-y-3 text-muted-foreground leading-relaxed">
          <li>
            <strong className="text-foreground">KR&nbsp;AGILUS</strong> &mdash; компактные 6-осевые
            роботы с payload 6&ndash;10 кг. Ставка на скорость и точность: мелкая сборка, упаковка,
            обслуживание станков.
          </li>
          <li>
            <strong className="text-foreground">KR&nbsp;CYBERTECH</strong> &mdash; средний класс,
            payload 8&ndash;22 кг. Универсальные задачи: дуговая сварка, manipulating, hand-off.
          </li>
          <li>
            <strong className="text-foreground">KR&nbsp;QUANTEC</strong> &mdash; тяжёлый класс,
            payload 90&ndash;300 кг. Точечная сварка, обработка металла, палеттирование &mdash;
            рабочая лошадка automotive.
          </li>
          <li>
            <strong className="text-foreground">KR&nbsp;FORTEC ULTRA</strong> &mdash; экстра-тяжёлый,
            payload 360&ndash;800 кг. Foundry, пресс-линии, перенос крупных кузовных деталей.
          </li>
          <li>
            <strong className="text-foreground">LBR&nbsp;iiwa</strong> (Light-weight intelligent
            industrial work&nbsp;assistant) &mdash; единственный коллаборативный 7-осевой робот
            с силомоментными сенсорами в каждом суставе. Payload 7 или 14 кг, программируется
            на Java через Sunrise.OS.
          </li>
          <li>
            <strong className="text-foreground">KMR&nbsp;iiwa</strong> &mdash; мобильная платформа:
            AGV KUKA omniMove с установленным сверху LBR&nbsp;iiwa. Ездит и манипулирует
            одновременно &mdash; редкий зверь на рынке.
          </li>
        </ul>
      </motion.div>

      <Takeaways
        items={[
          'KUKA — один из «большой четвёрки» промышленных роботов (с ABB, FANUC, Yaskawa Motoman); № 3 в мире по installed base.',
          'Линейка по payload: AGILUS (6–10 кг) → CYBERTECH (8–22) → QUANTEC (90–300) → FORTEC (360–1300). LBR iiwa — единственный cobot.',
          'Робот не работает в одиночку: типичная ячейка = робот + PLC + сенсоры + конвейер + safety-PLC. KUKA даёт пакеты для интеграции (WorkVisual, KUKA.Sim, mxAutomation).',
        ]}
      />

      {/* Quiz */}
      <motion.div variants={fadeInItem}>
        <Quiz
          question="Какая из перечисленных серий KUKA относится к коллаборативным (cobot)?"
          options={[
            { text: 'A) KR QUANTEC', explanation: 'KR QUANTEC — классический индустриальный манипулятор тяжёлого класса.' },
            { text: 'B) KR CYBERTECH', explanation: 'KR CYBERTECH — индустриальный робот среднего класса, не cobot.' },
            { text: 'C) LBR iiwa', correct: true, explanation: 'LBR iiwa — единственный cobot в линейке. Остальные — классические индустриальные манипуляторы.' },
            { text: 'D) KR AGILUS', explanation: 'KR AGILUS быстрый и компактный, но это индустриальный робот без силомоментных сенсоров в суставах.' },
          ]}
        />
      </motion.div>

      {/* Место на рынке */}
      <motion.div variants={fadeInItem} className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Место на рынке и в индустриях</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          KUKA исторически &laquo;сидит&raquo; в трёх ключевых вертикалях: <em>automotive</em>
          (точечная и дуговая сварка кузовов, hand-off деталей, палеттирование),
          <em> металлообработка</em> (загрузка/выгрузка станков, обслуживание прессов)
          и <em>foundry</em> (литейные операции, заливка форм, обращение с горячими заготовками).
        </p>
        <p className="text-muted-foreground leading-relaxed">
          В последние годы компания агрессивно идёт в <strong className="text-foreground">логистику</strong>
          {' '}и <strong className="text-foreground">медицинские применения</strong>:
          KMR iiwa в больничных лабораториях, LBR iiwa &mdash; в сборке электроники
          бок о бок с операторами. Это объясняет, почему ставку на{' '}
          <strong className="text-foreground">cobot</strong>{' '}
          <span className="text-muted-foreground/70">(коллаборативный робот, безопасный для работы рядом с человеком)</span>-серию
          делают даже там, где раньше был чисто индустриальный сегмент.
        </p>
      </motion.div>

      {/* DragDrop */}
      <motion.div variants={fadeInItem}>
        <DragDrop
          instruction="Сопоставьте серию KUKA с её типичной задачей."
          items={[
            { id: 'agilus', text: 'KR AGILUS' },
            { id: 'quantec', text: 'KR QUANTEC' },
            { id: 'iiwa', text: 'LBR iiwa' },
            { id: 'kmr', text: 'KMR iiwa' },
          ]}
          zones={[
            { id: 'small', label: 'Мелкая сборка, payload до 10 кг', acceptIds: ['agilus'] },
            { id: 'heavy', label: 'Тяжёлый payload 90–300 кг, automotive', acceptIds: ['quantec'] },
            { id: 'cobot', label: 'Коллаборативная работа рядом с человеком', acceptIds: ['iiwa'] },
            { id: 'mobile', label: 'Мобильная платформа: AGV + манипулятор', acceptIds: ['kmr'] },
          ]}
        />
      </motion.div>

      {/* Экосистема */}
      <motion.div variants={fadeInItem} className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Экосистема: робот не работает в одиночку</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          В реальной ячейке робот KUKA &mdash; лишь один из узлов. Типичная связка выглядит
          так: <strong className="text-foreground">PLC</strong> (Siemens S7-1500, Beckhoff
          или Allen-Bradley) дирижирует процессом, отдельный <em>safety-PLC</em> отвечает
          за функциональную безопасность, HMI показывает оператору состояние, датчики
          и конвейер подают заготовку, а робот выполняет манипуляцию.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          KUKA даёт целое семейство программных пакетов для интеграции:
        </p>
        <ul className="space-y-2 text-muted-foreground leading-relaxed">
          <li>
            <strong className="text-foreground">KUKA.WorkVisual</strong> &mdash; engineering-среда:
            конфигурация контроллера, mapping I/O, профили безопасности.
          </li>
          <li>
            <strong className="text-foreground">KUKA.Sim</strong>{' '}
            <span className="text-muted-foreground/70">(симулятор KUKA для офлайн-программирования)</span> &mdash;
            offline-симулятор для отладки траекторий и расчёта такта без реального робота.
          </li>
          <li>
            <strong className="text-foreground">KUKA.mxAutomation</strong>{' '}
            <span className="text-muted-foreground/70">(пакет KUKA для управления роботом из PLC)</span> &mdash;
            библиотеки для управления роботом напрямую из PLC: робот превращается в &laquo;функциональный
            блок&raquo; рядом с приводами и пневматикой.
          </li>
        </ul>
      </motion.div>

      {/* Scenario */}
      <motion.div variants={fadeInItem}>
        <ScenarioCard
          scenario="Заказчик хочет робота для палеттирования коробок до 100 кг с темпом 12 циклов в минуту на складе логистического центра. Какую серию выбираем?"
          context="Стационарный пост у конвейера, такт средний, бюджет — типовой для логистики."
          options={[
            {
              text: 'A) KR AGILUS',
              outcome: 'Не подходит: payload AGILUS до 10 кг, 30-килограммовую коробку он просто не поднимет. Это робот для мелкой сборки и упаковки.',
              score: 0,
            },
            {
              text: 'B) KR QUANTEC',
              outcome: 'Верно. KR QUANTEC закрывает payload 90–300 кг с большим запасом и считается классическим выбором для палеттирования и automotive-задач. Доступен, отлажен, недорог в обслуживании.',
              score: 1,
            },
            {
              text: 'C) LBR iiwa',
              outcome: 'Технически потянет (есть версия 14 кг — впритык), но это cobot: дороже, медленнее на длинной траектории и избыточен для огороженного поста, где не нужно работать рядом с человеком.',
              score: 0,
            },
            {
              text: 'D) KMR iiwa',
              outcome: 'Мобильность здесь не нужна — пост стационарный. Платить за AGV-базу нет смысла, к тому же payload ограничен возможностями LBR iiwa сверху.',
              score: 0,
            },
          ]}
        />
      </motion.div>

      {/* Итог */}
      <motion.div variants={fadeInItem} className="mb-4">
        <h2 className="text-xl font-semibold mb-4">Что важно унести из модуля</h2>
        <ul className="space-y-2 text-muted-foreground leading-relaxed">
          <li>
            KUKA &mdash; одна из &laquo;большой четвёрки&raquo;, № 3 по{' '}
            <strong className="text-foreground">installed base</strong>{' '}
            <span className="text-muted-foreground/70">(количество установленных роботов в эксплуатации)</span>,
            с сильной экспозицией в automotive.
          </li>
          <li>
            Линейка строится по payload: <em>AGILUS &rarr; CYBERTECH &rarr; QUANTEC &rarr; FORTEC</em>,
            плюс отдельная ветка cobot (<em>LBR iiwa</em>) и мобильный <em>KMR iiwa</em>.
          </li>
          <li>
            Робот &mdash; всегда часть ячейки с PLC, safety-PLC, HMI и датчиками.
            KUKA закрывает интеграционный слой через WorkVisual, KUKA.Sim и mxAutomation.
          </li>
        </ul>
      </motion.div>
    </ModuleWrapper>
  );
}
