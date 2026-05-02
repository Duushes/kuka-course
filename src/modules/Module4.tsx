'use client';

// Module 4 — KRL (KUKA Robot Language): Pascal-подобный язык для KUKA,
// парные .src + .dat, типы POS/E6POS/FRAME/AXIS, движения PTP/LIN/CIRC/SPLINE,
// approximation, FOLD-блоки, $-переменные, события INTERRUPT/TRIGGER.

import ModuleWrapper, { fadeInItem } from '@/components/ModuleWrapper';
import Quiz from '@/components/Quiz';
import DragDrop from '@/components/DragDrop';
import InputExercise from '@/components/InputExercise';
import ScenarioCard from '@/components/ScenarioCard';
import Takeaways from '@/components/Takeaways';
import { motion } from 'framer-motion';

export default function Module4() {
  return (
    <ModuleWrapper
      moduleIndex={4}
      title="KRL — язык программирования"
      subtitle="Пишем первую программу для робота"
      readingList={[
        { title: 'KRL Reference Guide v4.1 (PDF)', url: 'https://robot.zaab.org/wp-content/uploads/2014/04/KRL-Reference-Guide-v4_1.pdf' },
        { title: 'UT Austin SOA Wiki — KRL Examples', url: 'https://wikis.utexas.edu/display/SOAWiki/Kuka+Robot+Language' },
        { title: 'KSS 8.3 System Software Manual', url: 'https://xpert.kuka.com/' },
      ]}
    >
      {/* Введение */}
      <motion.div variants={fadeInItem} className="prose prose-invert max-w-none mb-10">
        <p className="text-muted-foreground leading-relaxed">
          <strong className="text-foreground">KRL</strong> (KUKA Robot Language) &mdash;
          синтаксически Pascal-подобный язык для KUKA. Без указателей и пользовательских
          типов; всё сосредоточено на{' '}
          <strong className="text-foreground">движениях</strong> манипулятора и{' '}
          <strong className="text-foreground">обмене сигналами</strong> с контроллером.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-4">
          Одна программа &mdash; это{' '}
          <strong className="text-foreground">пара файлов</strong>:{' '}
          <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">demo.src</code>{' '}
          (логика) и{' '}
          <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">demo.dat</code>{' '}
          (данные точек и параметры). При обучении точки через SmartPAD KSS добавляет
          запись в{' '}
          <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">.dat</code>{' '}
          автоматически.
        </p>
      </motion.div>

      {/* Теория 1: структура программы */}
      <motion.div variants={fadeInItem} className="prose prose-invert max-w-none mb-10">
        <h2 className="text-xl font-semibold mb-4">Структура программы: .src + .dat</h2>
        <p className="text-muted-foreground leading-relaxed">
          Файл{' '}
          <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">.src</code>{' '}
          содержит исполняемый код: декларация программы{' '}
          <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">DEF</code>{' '}
          &hellip;{' '}
          <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">END</code>,
          обязательная секция инициализации{' '}
          <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">INI</code>,
          команды движения, циклы{' '}
          <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">FOR</code>,
          условия{' '}
          <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">IF</code>,
          вызовы подпрограмм. Файл{' '}
          <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">.dat</code>{' '}
          хранит декларации точек и параметров через{' '}
          <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">DECL</code>.
        </p>
        <pre className="font-mono text-xs p-4 rounded-lg bg-card border border-border/50 overflow-x-auto mt-4">{`; demo.src
DEF demo()
  INI                    ; init $BASE, $TOOL, $VEL
  PTP HOME               ; стартовая позиция
  $VEL.CP = 0.3          ; cartesian velocity, м/с
  PTP P1                 ; быстрый ход к P1
  LIN P2                 ; линейно к P2
  LIN P3                 ; линейно к P3
  PTP HOME
END`}</pre>
        <pre className="font-mono text-xs p-4 rounded-lg bg-card border border-border/50 overflow-x-auto mt-3">{`; demo.dat
DEFDAT demo
  DECL POS P1 = {X 100, Y 200, Z 300, A 0, B 0, C 0, S 6, T 18}
  DECL POS P2 = {X 150, Y 250, Z 300, A 0, B 0, C 0, S 6, T 18}
  DECL POS P3 = {X 200, Y 250, Z 280, A 0, B 0, C 0, S 6, T 18}
ENDDAT`}</pre>
      </motion.div>

      {/* Теория 2: типы данных */}
      <motion.div variants={fadeInItem} className="prose prose-invert max-w-none mb-10">
        <h2 className="text-xl font-semibold mb-4">Типы данных</h2>
        <p className="text-muted-foreground leading-relaxed">
          KRL поддерживает примитивы и составные типы для описания позиций робота:
        </p>
        <ul className="text-muted-foreground leading-relaxed mt-3 space-y-2 list-disc pl-5">
          <li>
            <strong className="text-foreground">Примитивы:</strong>{' '}
            <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">INT</code>,{' '}
            <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">REAL</code>,{' '}
            <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">BOOL</code>,{' '}
            <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">CHAR</code>.
          </li>
          <li>
            <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">{`POS = {X, Y, Z, A, B, C, S, T}`}</code>{' '}
            &mdash; декартова позиция. <strong className="text-foreground">S</strong>{' '}
            (status) &mdash; 3-битный код конфигурации руки;{' '}
            <strong className="text-foreground">T</strong> (turn) &mdash; биты для углов
            осей &gt;180&deg;. Вместе они дают KSS однозначное решение обратной задачи
            кинематики.
          </li>
          <li>
            <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">E6POS</code>{' '}
            &mdash; то же, что{' '}
            <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">POS</code>,
            плюс углы внешних осей{' '}
            <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">E1</code>&hellip;
            <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">E6</code>{' '}
            (поворотный стол, линейный трек).
          </li>
          <li>
            <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">{`FRAME = {X, Y, Z, A, B, C}`}</code>{' '}
            &mdash; система координат без status/turn. Используется для{' '}
            <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">$BASE</code>{' '}
            и <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">$TOOL</code>.
          </li>
          <li>
            <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">{`AXIS = {A1, A2, A3, A4, A5, A6}`}</code>{' '}
            &mdash; углы 6 осей в градусах, для движения в осевых координатах.
          </li>
        </ul>
      </motion.div>

      {/* Теория 3: команды движения */}
      <motion.div variants={fadeInItem} className="prose prose-invert max-w-none mb-10">
        <h2 className="text-xl font-semibold mb-4">Команды движения</h2>
        <ul className="text-muted-foreground leading-relaxed mt-3 space-y-2 list-disc pl-5">
          <li>
            <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">PTP P1</code>{' '}
            &mdash; <strong className="text-foreground">Point-to-Point</strong>: каждая
            ось идёт по своей кратчайшей траектории. Самый быстрый способ переместиться,
            но траектория TCP в декартовом пространстве непредсказуема.
          </li>
          <li>
            <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">LIN P1</code>{' '}
            &mdash; <strong className="text-foreground">Linear</strong>: TCP идёт по
            прямой в декартовом пространстве. Используется для сварки, нанесения клея,
            перемещения вдоль кромки.
          </li>
          <li>
            <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">CIRC P_AUX, P_END</code>{' '}
            &mdash; <strong className="text-foreground">Circular</strong>: дуга через
            опорную и конечную точки. Аппроксимирует окружность тремя точками (текущая,
            P_AUX, P_END).
          </li>
          <li>
            <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">SPLINE</code>{' '}
            &hellip;{' '}
            <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">ENDSPLINE</code>{' '}
            &mdash; гладкая кривая через несколько точек (доступно с KSS 8.2+). Лучшее
            качество, чем цепочка LIN с approximation, но требует подготовки траектории.
          </li>
        </ul>
      </motion.div>

      {/* Quiz — сразу после блока «Команды движения» */}
      <motion.div variants={fadeInItem}>
        <Quiz
          question="Какая команда движения гарантирует прохождение через точку (без сглаживания) с линейной траекторией в декартовом пространстве?"
          options={[
            {
              text: 'PTP P1',
              explanation:
                'PTP идёт по осям, траектория TCP в декартовом пространстве не линейная.',
            },
            {
              text: 'LIN P1',
              correct: true,
              explanation:
                'LIN P1 без флагов approximation проходит точно через P1 по прямой в декартовом пространстве.',
            },
            {
              text: 'LIN P1 C_DIS',
              explanation:
                'C_DIS — это approximation: робот скругляет траекторию около P1, не проходит точно через точку.',
            },
            {
              text: 'SPLINE ... ENDSPLINE',
              explanation:
                'SPLINE задаёт гладкую кривую через несколько точек, не прямую линию.',
            },
          ]}
        />
      </motion.div>

      {/* DragDrop — сразу после Quiz, оба про команды движения */}
      <motion.div variants={fadeInItem}>
        <DragDrop
          instruction="Сопоставьте команду движения с типом траектории"
          items={[
            { id: 'ptp', text: 'Кратчайшее движение по осям, траектория TCP не предсказуема' },
            { id: 'lin', text: 'Прямая линия в декартовом пространстве' },
            { id: 'circ', text: 'Дуга через 2 опорные точки' },
            { id: 'spline', text: 'Плавная кривая через несколько точек' },
          ]}
          zones={[
            { id: 'z-ptp', label: 'PTP', acceptIds: ['ptp'] },
            { id: 'z-lin', label: 'LIN', acceptIds: ['lin'] },
            { id: 'z-circ', label: 'CIRC', acceptIds: ['circ'] },
            { id: 'z-spline', label: 'SPLINE', acceptIds: ['spline'] },
          ]}
        />
      </motion.div>

      {/* Теория 4: approximation и FOLD */}
      <motion.div variants={fadeInItem} className="prose prose-invert max-w-none mb-10">
        <h2 className="text-xl font-semibold mb-4">Approximation и FOLD-блоки</h2>
        <p className="text-muted-foreground leading-relaxed">
          По умолчанию робот{' '}
          <strong className="text-foreground">останавливается в каждой точке</strong>: на
          подходе к P1 скорость гасится до нуля. Для плавности добавляют флаги
          approximation: <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">C_DIS</code>{' '}
          (по дистанции),{' '}
          <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">C_ORI</code>{' '}
          (по ориентации),{' '}
          <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">C_VEL</code>{' '}
          (по скорости). Флаг говорит KSS: &laquo;не доходи до точки точно &mdash;
          скругли траекторию на радиусе{' '}
          <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">$APO.CDIS</code>&raquo;.
        </p>
        <pre className="font-mono text-xs p-4 rounded-lg bg-card border border-border/50 overflow-x-auto mt-4">{`PTP P1            ; точное прохождение через P1 (стоп)
LIN P2 C_DIS      ; скругление около P2 — без остановки
LIN P3 C_DIS      ; скругление около P3
LIN P4            ; точное прохождение через P4 (стоп)`}</pre>
        <p className="text-muted-foreground leading-relaxed mt-4">
          <strong className="text-foreground">FOLD &hellip; ENDFOLD</strong> &mdash; пара
          синтаксических <em>комментариев-маркеров</em> для редактора SmartPAD: всё, что
          между ними, в IDE сворачивается за одной читаемой строкой описания (например,{' '}
          <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">;FOLD PTP P1 Vel=100% PDAT1</code>).
          Сам код внутри &mdash; обычный исполняемый KRL, не &laquo;конфигурация&raquo;.
          SmartPAD использует FOLD, чтобы спрятать сгенерированную обвязку движения и
          оставить программисту чистую читаемую программу. Развернуть и редактировать
          можно вручную.
        </p>
      </motion.div>

      {/* Теория 5: системные переменные */}
      <motion.div variants={fadeInItem} className="prose prose-invert max-w-none mb-10">
        <h2 className="text-xl font-semibold mb-4">Системные переменные ($-variables)</h2>
        <p className="text-muted-foreground leading-relaxed">
          Глобальные переменные с префиксом{' '}
          <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">$</code>{' '}
          управляют поведением робота во время выполнения программы:
        </p>
        <ul className="text-muted-foreground leading-relaxed mt-3 space-y-2 list-disc pl-5">
          <li>
            <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">$VEL.CP</code>{' '}
            &mdash; cartesian velocity для{' '}
            <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">LIN</code>/
            <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">CIRC</code>,
            единицы &mdash; <strong className="text-foreground">м/с</strong>; типичные
            значения 0.1&ndash;2&nbsp;м/с.
          </li>
          <li>
            <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">$VEL_AXIS[i]</code>{' '}
            &mdash; скорость{' '}
            <em className="text-foreground">i</em>-й оси, % от максимальной.
          </li>
          <li>
            <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">$ACC.CP</code>{' '}
            &mdash; cartesian acceleration.
          </li>
          <li>
            <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">$BASE</code>,{' '}
            <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">$TOOL</code>{' '}
            &mdash; текущая активная BASE-система и TOOL (TCP).
          </li>
          <li>
            <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">$ADVANCE</code>{' '}
            &mdash; на сколько шагов вперёд интерпретатор читает программу. Нужен для
            работы approximation: чтобы скруглить траекторию около P2, KSS должен
            заранее знать P3.
          </li>
        </ul>
      </motion.div>

      {/* InputExercise — сразу после блока «Системные переменные ($-variables)» */}
      <motion.div variants={fadeInItem}>
        <InputExercise
          prompt="Напишите команду линейного движения к точке P5 со скоростью 0.3 м/с."
          hint="Подсказка: используйте команду LIN, имя точки P5, и переменную $VEL.CP."
          placeholder="$VEL.CP = 0.3&#10;LIN P5"
          validate={(value: string) => {
            const lines = value
              .trim()
              .split('\n')
              .map((s) => s.trim())
              .filter((s) => s.length > 0 && !s.startsWith(';'));
            if (lines.length < 2) return false;
            const hasVelLine = lines.some((line) => /^\$?VEL\.?CP\s*=\s*0\.3\b/i.test(line));
            const hasLinLine = lines.some((line) => /^LIN\s+P5\b/i.test(line));
            const velIdx = lines.findIndex((line) => /^\$?VEL\.?CP\s*=\s*0\.3\b/i.test(line));
            const linIdx = lines.findIndex((line) => /^LIN\s+P5\b/i.test(line));
            return hasVelLine && hasLinLine && velIdx < linIdx;
          }}
          successMessage="Верно! Скорость задана через $VEL.CP перед линейным движением."
          exampleAnswer="$VEL.CP = 0.3
LIN P5"
        />
      </motion.div>

      {/* Теория 6: INTERRUPT / TRIGGER */}
      <motion.div variants={fadeInItem} className="prose prose-invert max-w-none mb-10">
        <h2 className="text-xl font-semibold mb-4">События: INTERRUPT и TRIGGER</h2>
        <p className="text-muted-foreground leading-relaxed">
          KRL предоставляет событийную модель для реакции на цифровые сигналы и условия
          движения. <strong className="text-foreground">INTERRUPT</strong> &mdash;
          асинхронный обработчик: при наступлении условия запускается подпрограмма
          (блокирующе или нет). <strong className="text-foreground">TRIGGER</strong>{' '}
          &mdash; действие, привязанное к моменту траектории (например, &laquo;за
          50&nbsp;мс до P5 включи выход 12&raquo;).
        </p>
        <pre className="font-mono text-xs p-4 rounded-lg bg-card border border-border/50 overflow-x-auto mt-4">{`; INTERRUPT: при сигнале на $IN[10] вызвать ZapStop()
INTERRUPT DECL 5 WHEN $IN[10]==TRUE DO ZapStop()
INTERRUPT ON 5

LIN P1
LIN P2

INTERRUPT OFF 5

; TRIGGER: за 50 мс до P5 включить $OUT[12]
TRIGGER WHEN PATH = 0 DELAY = -50 DO $OUT[12] = TRUE
LIN P5`}</pre>
      </motion.div>

      {/* SVG-схема */}
      <motion.div variants={fadeInItem} className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Схема: как связаны .src и .dat</h2>
        <div className="rounded-xl border border-border/50 bg-muted/30 p-4">
          <svg
            viewBox="0 0 540 220"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
            role="img"
            aria-label="Блок-диаграмма: левая колонка demo.src с DEF/INI/PTP/LIN/END, правая колонка demo.dat с DECL POS P1, стрелка от P1 в src к P1 в dat"
          >
            <defs>
              <marker
                id="arrow4"
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M0,0 L10,5 L0,10 z" fill="var(--accent)" />
              </marker>
            </defs>

            {/* .src колонка */}
            <rect
              x="20"
              y="20"
              width="220"
              height="180"
              rx="10"
              fill="var(--accent-light)"
              stroke="var(--accent)"
              strokeWidth="1.5"
            />
            <text x="130" y="40" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--foreground)">
              demo.src
            </text>
            <text x="35" y="62" fontSize="10" fontFamily="monospace" fill="var(--foreground)" fillOpacity="0.75">
              DEF demo()
            </text>
            <text x="35" y="80" fontSize="10" fontFamily="monospace" fill="var(--foreground)" fillOpacity="0.75">
              {'  INI'}
            </text>
            <text x="35" y="98" fontSize="10" fontFamily="monospace" fill="var(--foreground)" fillOpacity="0.75">
              {'  PTP HOME'}
            </text>
            <text x="35" y="116" fontSize="10" fontFamily="monospace" fill="var(--foreground)" fontWeight="700">
              {'  PTP P1'}
            </text>
            <text x="35" y="134" fontSize="10" fontFamily="monospace" fill="var(--foreground)" fillOpacity="0.75">
              {'  LIN P2'}
            </text>
            <text x="35" y="152" fontSize="10" fontFamily="monospace" fill="var(--foreground)" fillOpacity="0.75">
              {'  PTP HOME'}
            </text>
            <text x="35" y="170" fontSize="10" fontFamily="monospace" fill="var(--foreground)" fillOpacity="0.75">
              END
            </text>
            <text x="35" y="190" fontSize="9" fill="var(--foreground)" fillOpacity="0.6" fontStyle="italic">
              логика, команды
            </text>

            {/* стрелка от P1 в .src к P1 в .dat */}
            <line
              x1="100"
              y1="113"
              x2="305"
              y2="113"
              stroke="var(--accent)"
              strokeWidth="1.5"
              strokeDasharray="4 3"
              markerEnd="url(#arrow4)"
            />
            <rect x="160" y="96" width="80" height="14" rx="3" fill="var(--background)" stroke="var(--accent)" strokeOpacity="0.4" strokeWidth="0.8" />
            <text x="200" y="106" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--accent)">
              координаты P1
            </text>

            {/* .dat колонка */}
            <rect
              x="300"
              y="20"
              width="220"
              height="180"
              rx="10"
              fill="var(--accent-light)"
              stroke="var(--accent)"
              strokeWidth="1.5"
            />
            <text x="410" y="40" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--foreground)">
              demo.dat
            </text>
            <text x="315" y="62" fontSize="10" fontFamily="monospace" fill="var(--foreground)" fillOpacity="0.75">
              DEFDAT demo
            </text>
            <text x="315" y="86" fontSize="9" fontFamily="monospace" fill="var(--foreground)" fontWeight="700">
              {'  DECL POS P1 ='}
            </text>
            <text x="315" y="100" fontSize="9" fontFamily="monospace" fill="var(--foreground)" fillOpacity="0.75">
              {'  {X 100, Y 200,'}
            </text>
            <text x="315" y="114" fontSize="9" fontFamily="monospace" fill="var(--foreground)" fillOpacity="0.75">
              {'   Z 300, A 0,'}
            </text>
            <text x="315" y="128" fontSize="9" fontFamily="monospace" fill="var(--foreground)" fillOpacity="0.75">
              {'   B 0, C 0,'}
            </text>
            <text x="315" y="142" fontSize="9" fontFamily="monospace" fill="var(--foreground)" fillOpacity="0.75">
              {'   S 6, T 18}'}
            </text>
            <text x="315" y="160" fontSize="10" fontFamily="monospace" fill="var(--foreground)" fillOpacity="0.75">
              {'  DECL POS P2 = ...'}
            </text>
            <text x="315" y="174" fontSize="10" fontFamily="monospace" fill="var(--foreground)" fillOpacity="0.75">
              ENDDAT
            </text>
            <text x="315" y="192" fontSize="9" fill="var(--foreground)" fillOpacity="0.6" fontStyle="italic">
              данные, точки
            </text>
          </svg>
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Имена точек в{' '}
          <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">.src</code>{' '}
          ссылаются на декларации{' '}
          <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">DECL POS</code>{' '}
          в <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">.dat</code>.
          SmartPAD добавляет декларацию автоматически при обучении точки.
        </p>
      </motion.div>

      <Takeaways
        items={[
          'Программа KRL — пара файлов: .src (логика) + .dat (данные точек). Без декларации точки в .dat программа не запустится.',
          'Команды движения: PTP (по осям, нелинейная траектория), LIN (прямая в декартовом), CIRC (дуга), SPLINE (плавная кривая через несколько точек).',
          'Approximation (C_DIS / C_ORI / C_VEL) — флаги «не останавливайся, скругли». Без них робот точно проходит через точку.',
          '$VEL.CP задаёт Cartesian velocity в м/с. Типичный диапазон 0.1–2 м/с (сварка ≈ 0.01–0.1, перенос ≈ 1–2).',
        ]}
      />

      {/* ScenarioCard — финальный apply */}
      <motion.div variants={fadeInItem}>
        <p className="text-base font-medium mb-3">
          Программа ниже не запускается. Что не так?
        </p>
        <pre className="font-mono text-xs p-4 rounded-lg bg-card border border-border/50 overflow-x-auto mb-4">{`DEF demo()
  INI
  PTP HOME
  $VEL.CP = 0.3
  PTP P1
  LIN P2 C_DIS
  LIN P3
END`}</pre>
        <p className="text-sm text-muted-foreground mb-4">
          Все команды синтаксически на месте,{' '}
          <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">$VEL.CP</code>{' '}
          в м/с. Но KSS отказывается запускать программу. <em>В&nbsp;.dat&nbsp;демки декларации
          точек отсутствуют, а&nbsp;<code className="font-mono">HOME</code> в проект не добавлена.</em>
        </p>
        <ScenarioCard
          scenario="В чём причина ошибки?"
          options={[
            {
              text: '$VEL.CP = 0.3 — неправильная единица измерения',
              outcome:
                'Нет: 0.3 м/с — типичное значение для cartesian velocity (диапазон 0.1–2 м/с). Ошибки тут нет.',
              score: 0,
            },
            {
              text: 'P1, P2, P3 (и HOME, если её нет в $config.dat проекта) не объявлены — нужны DECL POS = {...} в .dat или Touch Up через SmartPAD',
              outcome:
                'Верно. KSS не знает координат точек: без DECL POS = {...} в demo.dat (или обучения через SmartPAD) программа не запустится. HOME / XHOME — конвенция KUKA, обычно создаётся инсталляционным мастером в $config.dat; в учебном проекте её тоже нужно объявить явно.',
              score: 1,
            },
            {
              text: 'C_DIS без последующего движения недопустим',
              outcome:
                'Не совсем: после LIN P2 C_DIS идёт LIN P3, поэтому approximation формально работает. KSS может выдать warning, но не error.',
              score: 0,
            },
            {
              text: 'INI блок не нужен, его и нужно убрать',
              outcome:
                'Наоборот: INI обязателен в начале программы — он инициализирует $BASE, $TOOL, $VEL и другие системные переменные. Убрать INI означает работать с непредсказуемыми значениями.',
              score: 0,
            },
          ]}
        />
      </motion.div>

      {/* Закрывающий абзац */}
      <motion.div variants={fadeInItem} className="prose prose-invert max-w-none mb-4">
        <p className="text-muted-foreground leading-relaxed">
          KRL покрывает 80&nbsp;% задач: движения, циклы, условия, события. Для сложных
          кейсов (адаптивный захват, синхронизация с PLC) есть{' '}
          <strong className="text-foreground">KUKA.PLC mxAutomation</strong>,{' '}
          <strong className="text-foreground">RoboticsAPI</strong> и{' '}
          <strong className="text-foreground">Sunrise.OS</strong> для LBR iiwa.
        </p>
      </motion.div>
    </ModuleWrapper>
  );
}
