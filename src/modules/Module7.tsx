'use client';

// Module 7 — Прикладные пакеты KUKA: PalletTech, ArcTech, VisionTech,
// mxAutomation. Что закрывают, как устроены и когда какой пакет
// применять без написания тонн KRL-кода.

import ModuleWrapper, { fadeInItem } from '@/components/ModuleWrapper';
import Quiz from '@/components/Quiz';
import DragDrop from '@/components/DragDrop';
import { motion } from 'framer-motion';

export default function Module7() {
  return (
    <ModuleWrapper
      moduleIndex={7}
      title="Прикладные пакеты"
      subtitle="Готовые решения: палеты, сварка, vision, PLC"
      readingList={[
        {
          title: 'KUKA.PalletTech',
          url: 'https://www.kuka.com/en-us/products/robotics-systems/software/application-software/kuka_pallettech',
        },
        {
          title: 'KUKA.VisionTech',
          url: 'https://www.kuka.com/en-us/products/robotics-systems/software/application-software/kuka_visiontech',
        },
        {
          title: 'mxAutomation TIA Portal Tutorial',
          url: 'https://www.youtube.com/watch?v=eI10cOjD1JU',
        },
      ]}
    >
      {/* Введение */}
      <motion.div variants={fadeInItem} className="prose prose-invert max-w-none mb-10">
        <p className="text-muted-foreground leading-relaxed">
          KUKA продаёт не только робота. Над базовой системой KSS существует слой{' '}
          <strong className="text-foreground">прикладных пакетов</strong> &mdash; тематических
          расширений, которые закрывают конкретные классы задач: палеттирование, дуговая
          сварка, машинное зрение, интеграция с Siemens PLC. Цель таких пакетов &mdash;
          закрыть около 80&nbsp;% классических промышленных сценариев{' '}
          <strong className="text-foreground">без написания тонн KRL-кода</strong>.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-4">
          Вместо того чтобы вручную выписывать траекторию укладки коробок или вручную
          синхронизировать робота со сварочным источником, интегратор берёт готовый пакет,
          конфигурирует его в WorkVisual и получает рабочую ячейку за дни, а не недели.
          В этом модуле разберём четыре базовых пакета, которыми закрывается большинство
          интеграций.
        </p>
      </motion.div>

      {/* Теория 1: PalletTech */}
      <motion.div variants={fadeInItem} className="prose prose-invert max-w-none mb-10">
        <h2 className="text-xl font-semibold mb-4">PalletTech &mdash; палеттирование</h2>
        <p className="text-muted-foreground leading-relaxed">
          <strong className="text-foreground">KUKA.PalletTech</strong> &mdash; пакет для
          задач паллетирования: робот собирает коробки с конвейера и укладывает их на палету
          по заданной схеме. Главная фишка пакета &mdash;{' '}
          <strong className="text-foreground">graphical pallet editor</strong> внутри
          WorkVisual: интегратор задаёт геометрию палеты, размер коробки и схему укладки
          (pinwheel, brick, slip-sheet и т.д.), а KSS сам генерирует траекторию.
        </p>
        <ul className="text-muted-foreground leading-relaxed mt-3 space-y-2 list-disc pl-5">
          <li>
            GUI для типовых паттернов укладки: <strong className="text-foreground">pinwheel</strong>,{' '}
            <strong className="text-foreground">brick</strong>, column, interlock и т.д.
          </li>
          <li>
            Поддержка <strong className="text-foreground">многослойных палет</strong> со
            slip-sheet&rsquo;ами между слоями для устойчивости штабеля.
          </li>
          <li>
            Экспорт готовой программы в KRL: editor генерирует движение, а программисту
            остаётся описать только Pick-from-Source.
          </li>
        </ul>
        <p className="text-muted-foreground leading-relaxed mt-4">
          Без PalletTech аналогичная задача потребовала бы ручного перебора координат для
          каждой коробки в каждом слое &mdash; десятки KRL-точек, которые приходится
          поддерживать при смене формата.
        </p>
      </motion.div>

      {/* Теория 2: ArcTech */}
      <motion.div variants={fadeInItem} className="prose prose-invert max-w-none mb-10">
        <h2 className="text-xl font-semibold mb-4">ArcTech &mdash; дуговая сварка</h2>
        <p className="text-muted-foreground leading-relaxed">
          <strong className="text-foreground">KUKA.ArcTech</strong> &mdash; пакет для
          дуговой сварки. Параметры сварочного процесса (ток, скорость, weave) встроены
          прямо в команды движения KRL. Типовая строка выглядит так:
        </p>
        <pre className="text-foreground/80 bg-muted/40 rounded-md p-3 text-xs leading-relaxed overflow-x-auto mt-3">
          <code>LIN P_END WeldOn=1 ; включаем дугу в точке P_END</code>
        </pre>
        <ul className="text-muted-foreground leading-relaxed mt-3 space-y-2 list-disc pl-5">
          <li>
            Встроенные <strong className="text-foreground">параметры сварки</strong>{' '}
            прямо в KRL: команды <code className="text-foreground/80">WeldOn</code>/
            <code className="text-foreground/80">WeldOff</code>,{' '}
            <code className="text-foreground/80">Weave</code>, переключение программ
            источника.
          </li>
          <li>
            Интеграция с сварочными источниками{' '}
            <strong className="text-foreground">Lincoln, Fronius, EWM, Miller</strong> по
            DeviceNet/EtherNet/IP, в каталоге WorkVisual.
          </li>
          <li>
            Поддержка <strong className="text-foreground">torch cleaning station</strong>{' '}
            (очистка торча от брызг), тросовой подачи проволоки и сенсорных функций
            seam-tracking.
          </li>
        </ul>
      </motion.div>

      {/* Теория 3: VisionTech */}
      <motion.div variants={fadeInItem} className="prose prose-invert max-w-none mb-10">
        <h2 className="text-xl font-semibold mb-4">VisionTech &mdash; 2D-машинное зрение</h2>
        <p className="text-muted-foreground leading-relaxed">
          <strong className="text-foreground">KUKA.VisionTech</strong> &mdash; пакет
          2D-vision: камера (KUKA или сторонняя) плюс offline-калибровка плюс
          runtime-распознавание. Результат работы пакета &mdash; координаты найденного
          объекта в системе <strong className="text-foreground">BASE</strong> робота.
          Дальше робот использует эти координаты как обычную точку в LIN.
        </p>
        <ul className="text-muted-foreground leading-relaxed mt-3 space-y-2 list-disc pl-5">
          <li>
            Поддержка <strong className="text-foreground">2D-vision с auto-calibration</strong>:
            мастер калибровки сам пересчитывает связь camera&nbsp;&rarr;&nbsp;BASE по
            калибровочной мишени.
          </li>
          <li>
            Работа с <strong className="text-foreground">GigE-камерами и USB</strong> &mdash;
            и собственными KUKA, и сторонними промышленными.
          </li>
          <li>
            Распознавание по <strong className="text-foreground">template matching</strong>{' '}
            (по образцу) и <strong className="text-foreground">OCR</strong> (печатные
            символы на детали).
          </li>
          <li>
            Вывод позиций в <strong className="text-foreground">BASE-координатах</strong>{' '}
            &mdash; программисту KRL не нужно крутить матрицы вручную.
          </li>
        </ul>
      </motion.div>

      {/* Теория 4: mxAutomation */}
      <motion.div variants={fadeInItem} className="prose prose-invert max-w-none mb-10">
        <h2 className="text-xl font-semibold mb-4">mxAutomation &mdash; робот из PLC</h2>
        <p className="text-muted-foreground leading-relaxed">
          <strong className="text-foreground">KUKA.mxAutomation</strong> &mdash; самый
          необычный пакет в линейке. Он позволяет программировать робота{' '}
          <strong className="text-foreground">из PLC</strong>, без написания KRL-программ.
          KUKA поставляет блоки FB (Function Blocks) для контроллеров{' '}
          <strong className="text-foreground">S7-1500 / S7-1200 / S7-300 / S7-400</strong>{' '}
          в среде <strong className="text-foreground">TIA Portal</strong>.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-4">
          PLC посылает команды по PROFINET, KSS их исполняет. Типовые блоки:
        </p>
        <ul className="text-muted-foreground leading-relaxed mt-3 space-y-2 list-disc pl-5">
          <li>
            <code className="text-foreground/80">KRC_Initialize</code> &mdash; запуск
            драйвера на стороне робота.
          </li>
          <li>
            <code className="text-foreground/80">KRC_MoveLINAbsolute</code> &mdash; линейное
            движение в абсолютных координатах.
          </li>
          <li>
            <code className="text-foreground/80">KRC_StopMove</code> &mdash; остановка
            текущего движения.
          </li>
          <li>
            И ещё десятки FB на PTP, CIRC, IO, обработку фреймов и т.д.
          </li>
        </ul>
        <p className="text-muted-foreground leading-relaxed mt-4">
          В этом сценарии <strong className="text-foreground">KRC работает как slave</strong>:
          KRL-программа минимальна (только startup-handler, который запускает mxA-сервис),
          а вся бизнес-логика живёт в TIA Portal Step&nbsp;7. Главное преимущество &mdash;
          программистам PLC <strong className="text-foreground">не нужно учить KRL</strong>;
          они работают в привычной для себя среде. Один S7 может управлять до пяти роботов
          одновременно.
        </p>
      </motion.div>

      {/* SVG-схема: матрица «пакет × задача» */}
      <motion.div variants={fadeInItem} className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Матрица: пакет &times; задача</h2>
        <div className="rounded-xl border border-border/50 bg-muted/30 p-4">
          <svg
            viewBox="0 0 480 240"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
            role="img"
            aria-label="Матрица четырёх пакетов KUKA против четырёх задач: палеттирование, сварка, vision, интеграция через PLC. Зелёные точки — основная задача пакета, серые — пакет задачу не закрывает."
          >
            {/* Заголовки колонок (задачи) */}
            <text x="190" y="30" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--foreground)">
              Палеты
            </text>
            <text x="270" y="30" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--foreground)">
              Сварка
            </text>
            <text x="350" y="30" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--foreground)">
              Vision
            </text>
            <text x="430" y="30" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--foreground)">
              PLC
            </text>

            {/* Заголовки строк (пакеты) */}
            <text x="20" y="74" fontSize="11" fontWeight="600" fill="var(--accent)">
              PalletTech
            </text>
            <text x="20" y="118" fontSize="11" fontWeight="600" fill="var(--accent)">
              ArcTech
            </text>
            <text x="20" y="162" fontSize="11" fontWeight="600" fill="var(--accent)">
              VisionTech
            </text>
            <text x="20" y="206" fontSize="11" fontWeight="600" fill="var(--accent)">
              mxAutomation
            </text>

            {/* Линии сетки */}
            <line x1="150" y1="50" x2="470" y2="50" stroke="var(--muted)" strokeWidth="0.5" strokeDasharray="2 2" />
            <line x1="150" y1="94" x2="470" y2="94" stroke="var(--muted)" strokeWidth="0.5" strokeDasharray="2 2" />
            <line x1="150" y1="138" x2="470" y2="138" stroke="var(--muted)" strokeWidth="0.5" strokeDasharray="2 2" />
            <line x1="150" y1="182" x2="470" y2="182" stroke="var(--muted)" strokeWidth="0.5" strokeDasharray="2 2" />
            <line x1="150" y1="226" x2="470" y2="226" stroke="var(--muted)" strokeWidth="0.5" strokeDasharray="2 2" />

            {/* Строка PalletTech: палеты — зелёная, остальные — серые */}
            <circle cx="190" cy="70" r="9" fill="var(--success)" />
            <circle cx="270" cy="70" r="6" fill="var(--muted)" opacity="0.4" />
            <circle cx="350" cy="70" r="6" fill="var(--muted)" opacity="0.4" />
            <circle cx="430" cy="70" r="6" fill="var(--muted)" opacity="0.4" />

            {/* Строка ArcTech: сварка — зелёная */}
            <circle cx="190" cy="114" r="6" fill="var(--muted)" opacity="0.4" />
            <circle cx="270" cy="114" r="9" fill="var(--success)" />
            <circle cx="350" cy="114" r="6" fill="var(--muted)" opacity="0.4" />
            <circle cx="430" cy="114" r="6" fill="var(--muted)" opacity="0.4" />

            {/* Строка VisionTech: vision — зелёная */}
            <circle cx="190" cy="158" r="6" fill="var(--muted)" opacity="0.4" />
            <circle cx="270" cy="158" r="6" fill="var(--muted)" opacity="0.4" />
            <circle cx="350" cy="158" r="9" fill="var(--success)" />
            <circle cx="430" cy="158" r="6" fill="var(--muted)" opacity="0.4" />

            {/* Строка mxAutomation: PLC — зелёная */}
            <circle cx="190" cy="202" r="6" fill="var(--muted)" opacity="0.4" />
            <circle cx="270" cy="202" r="6" fill="var(--muted)" opacity="0.4" />
            <circle cx="350" cy="202" r="6" fill="var(--muted)" opacity="0.4" />
            <circle cx="430" cy="202" r="9" fill="var(--success)" />
          </svg>
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Зелёная точка &mdash; основная задача пакета; серая &mdash; пакет эту задачу не
          закрывает. Каждый пакет специализирован под свой класс задач.
        </p>
      </motion.div>

      {/* Quiz */}
      <motion.div variants={fadeInItem}>
        <Quiz
          question="Какой пакет KUKA позволяет программировать робота из PLC без написания KRL-программы?"
          options={[
            { text: 'PalletTech' },
            { text: 'ArcTech' },
            {
              text: 'mxAutomation',
              correct: true,
              explanation:
                'mxAutomation предоставляет блоки FB для S7-1500/1200/300/400, программирование выполняется в TIA Portal на стороне PLC. Робот в этом случае — slave, исполняет команды.',
            },
            { text: 'VisionTech' },
          ]}
        />
      </motion.div>

      {/* DragDrop: сопоставить задачу с пакетом */}
      <motion.div variants={fadeInItem}>
        <DragDrop
          instruction="Сопоставьте задачу с пакетом KUKA"
          items={[
            { id: 'pallet', text: 'PalletTech' },
            { id: 'arc', text: 'ArcTech' },
            { id: 'vision', text: 'VisionTech' },
            { id: 'mx', text: 'mxAutomation' },
          ]}
          zones={[
            { id: 'task-pallet', label: 'Палеттирование коробок', acceptIds: ['pallet'] },
            { id: 'task-arc', label: 'Дуговая сварка швов', acceptIds: ['arc'] },
            { id: 'task-vision', label: 'Распознавание детали камерой', acceptIds: ['vision'] },
            { id: 'task-mx', label: 'Управление из Siemens PLC', acceptIds: ['mx'] },
          ]}
        />
      </motion.div>

      {/* Закрывающий абзац */}
      <motion.div variants={fadeInItem} className="prose prose-invert max-w-none mb-4">
        <p className="text-muted-foreground leading-relaxed">
          Прикладные пакеты &mdash; это способ для KUKA продавать не часы программистов,
          а готовые решения. Если задача интегратора попадает в один из четырёх
          разобранных классов, начинать стоит именно с пакета. Самописный KRL имеет смысл
          только там, где готовое решение не закрывает специфику процесса.
        </p>
      </motion.div>
    </ModuleWrapper>
  );
}
