// Module 3 — Координаты и кинематика
// Вводная по TCP, пять блоков теории про системы координат и калибровки KUKA,
// inline SVG со схемой WORLD/ROBROOT/BASE/TOOL и три интерактива (Quiz / DragDrop / InputExercise).
// Источники: KSS 8.3 Operating Manual (A4), Lynch & Park Modern Robotics (F1), Craig Robotics (F3), МГТУ Баумана (H2).

'use client';

import ModuleWrapper, { fadeInItem } from '@/components/ModuleWrapper';
import Quiz from '@/components/Quiz';
import DragDrop from '@/components/DragDrop';
import InputExercise from '@/components/InputExercise';
import Takeaways from '@/components/Takeaways';
import { motion } from 'framer-motion';

export default function Module3() {
  return (
    <ModuleWrapper
      moduleIndex={3}
      title="Координаты и кинематика"
      subtitle="Где находится TCP и почему это важно"
      readingList={[
        { title: 'Modern Robotics — Lynch & Park (Northwestern, free PDF)', url: 'https://hades.mech.northwestern.edu/index.php/Modern_Robotics' },
        { title: 'KSS 8.3 Operating & Programming Manual', url: 'https://www.kuka.com/en-us/services/downloads' },
        { title: 'Craig — Introduction to Robotics: Mechanics and Control', url: 'https://www.pearson.com/en-us/subject-catalog/p/introduction-to-robotics-mechanics-and-control/P200000003545' },
      ]}
    >
      {/* Введение */}
      <motion.div variants={fadeInItem} className="prose prose-invert max-w-none mb-10">
        <p className="text-muted-foreground leading-relaxed">
          У робота есть одна <em>главная</em> точка &mdash; кончик инструмента, которым он реально
          что-то делает: остриё сварочной горелки, центр захвата, кончик клеевого сопла или иглы
          диспенсера. Эту точку называют <strong className="text-foreground">TCP</strong> &mdash;
          Tool Center Point. Любая программа движения KUKA по сути описывает траекторию TCP в
          пространстве цеха.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Чтобы говорить о &laquo;положении TCP&raquo; внятно, KUKA вводит несколько систем
          координат: WORLD, ROBROOT, BASE, TOOL и FLANGE. Без них фраза &laquo;двигай инструмент
          в&nbsp;точку&nbsp;P1&raquo; теряет смысл &mdash; непонятно, относительно чего эта P1
          задана. В&nbsp;модуле разберёмся в&nbsp;иерархии систем, в&nbsp;ритуалах калибровки
          (XYZ&nbsp;4-Point, ABC&nbsp;2-Point, BASE&nbsp;3-Point) и&nbsp;коротко &mdash; в&nbsp;прямой
          и&nbsp;обратной кинематике.
        </p>
      </motion.div>

      {/* Системы координат KUKA */}
      <motion.div variants={fadeInItem} className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Пять систем координат, и зачем каждая</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          KUKA не пытается обходиться одной системой отсчёта. Каждая роль в ячейке получает свою
          систему, чтобы программисту было удобно описывать движения в наиболее естественных для
          задачи координатах.
        </p>
        <ul className="space-y-3 text-muted-foreground leading-relaxed">
          <li>
            <strong className="text-foreground">WORLD</strong> &mdash; мировая система,
            жёстко связана с цехом. Все остальные KUKA-координаты в конечном счёте приводятся
            к&nbsp;WORLD. Это глобальная точка отсчёта, которая &laquo;никогда&raquo; не двигается.
          </li>
          <li>
            <strong className="text-foreground">ROBROOT</strong> &mdash; основание робота,
            его положение и&nbsp;ориентация в&nbsp;WORLD. Задаётся при инсталляции. Если робот
            стоит на полу ровно &mdash; ROBROOT отличается от&nbsp;WORLD только сдвигом на высоту
            постамента.
          </li>
          <li>
            <strong className="text-foreground">BASE</strong> &mdash; пользовательская система
            для удобства программирования. Привязывается к&nbsp;заготовке, палете или приспособлению.
            Главное преимущество: если деталь подвинули, достаточно <em>перекалибровать BASE</em>,
            а&nbsp;не переписывать каждую точку программы.
          </li>
          <li>
            <strong className="text-foreground">TOOL</strong> &mdash; система координат
            инструмента, прикрученного к&nbsp;фланцу. Origin TOOL'а &mdash; это и&nbsp;есть TCP.
            Программа описывает движение TCP в&nbsp;BASE, а&nbsp;ориентация задаётся осями TOOL.
          </li>
          <li>
            <strong className="text-foreground">FLANGE</strong> &mdash; физический фланец,
            6-я ось манипулятора. Если инструмент не задан, TCP лежит на&nbsp;фланце по умолчанию.
            FLANGE используют как fallback и для калибровки самого TOOL'а.
          </li>
        </ul>
        <p className="text-muted-foreground leading-relaxed mt-4">
          Иерархия в KUKA выглядит так:{' '}
          <em>WORLD &rarr; ROBROOT &rarr; A1&hellip;A6 (кинематика манипулятора) &rarr; FLANGE &rarr; TOOL (TCP)</em>.
          Углы шести осей переводят основание робота в положение фланца, дальше TOOL даёт
          смещение до TCP. BASE &mdash; пользовательская система отсчёта, привязанная к&nbsp;WORLD
          (а не «параллельная»): она используется только как удобная точка отсчёта для координат
          в&nbsp;программе. KSS держит всю цепочку преобразований в&nbsp;памяти, поэтому одну&nbsp;и&nbsp;ту&nbsp;же
          позицию TCP можно показать оператору хоть в&nbsp;BASE, хоть в&nbsp;WORLD.
        </p>
      </motion.div>

      {/* SVG-схема систем координат */}
      <motion.div variants={fadeInItem} className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Схема: WORLD, BASE, TOOL и&nbsp;TCP в&nbsp;ячейке</h2>
        <div className="rounded-xl border border-border/50 bg-card p-6 mb-4">
          <svg
            viewBox="0 0 480 280"
            className="w-full h-auto"
            role="img"
            aria-label="Изометрическая схема систем координат KUKA: WORLD внизу слева, ROBROOT на основании робота, TOOL на конце манипулятора, TCP — кончик инструмента, BASE — на детали справа"
          >
            {/* Пол цеха */}
            <path d="M 30 240 L 450 240 L 420 260 L 0 260 Z" fill="var(--accent)" fillOpacity="0.05" stroke="var(--accent)" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="3 3" />

            {/* WORLD origin внизу слева */}
            <g>
              <line x1="60" y1="230" x2="120" y2="230" stroke="var(--error)" strokeWidth="2" markerEnd="url(#arrowR)" />
              <line x1="60" y1="230" x2="60" y2="170" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#arrowB)" />
              <line x1="60" y1="230" x2="35" y2="248" stroke="var(--success)" strokeWidth="2" markerEnd="url(#arrowG)" />
              <circle cx="60" cy="230" r="3.5" fill="var(--foreground)" />
              <text x="125" y="235" fontSize="10" fill="var(--error)" fontWeight="600">X</text>
              <text x="48" y="166" fontSize="10" fill="var(--accent)" fontWeight="600">Z</text>
              <text x="20" y="258" fontSize="10" fill="var(--success)" fontWeight="600">Y</text>
              <text x="35" y="222" fontSize="11" fill="var(--foreground)" fontWeight="700">WORLD</text>
            </g>

            {/* Постамент + ROBROOT */}
            <rect x="160" y="210" width="60" height="30" rx="2" fill="var(--accent-light)" stroke="var(--accent)" strokeWidth="1.5" />
            <text x="190" y="228" textAnchor="middle" fontSize="9" fill="var(--accent)" fontWeight="600">ROBROOT</text>

            {/* Манипулятор: основание, плечо, локоть, фланец */}
            <g>
              {/* база поверх постамента */}
              <rect x="172" y="180" width="36" height="30" rx="3" fill="var(--accent-light)" stroke="var(--accent)" strokeWidth="1.5" />
              {/* нижнее звено */}
              <path d="M 184 180 L 200 180 L 220 130 L 204 130 Z" fill="var(--accent-light)" stroke="var(--accent)" strokeWidth="1.5" />
              {/* верхнее звено / стрела */}
              <path d="M 212 130 L 224 130 L 320 95 L 308 92 Z" fill="var(--accent-light)" stroke="var(--accent)" strokeWidth="1.5" />
              {/* кисть + фланец */}
              <circle cx="318" cy="93" r="6" fill="var(--accent-light)" stroke="var(--accent)" strokeWidth="1.5" />
              <text x="318" y="78" textAnchor="middle" fontSize="9" fill="var(--accent)" fontWeight="600">FLANGE</text>
              {/* инструмент */}
              <path d="M 324 92 L 358 88 L 360 92 L 326 96 Z" fill="var(--accent)" stroke="var(--accent)" strokeWidth="1" />
              {/* TCP — крупный кружок на кончике */}
              <circle cx="362" cy="90" r="5" fill="var(--success)" stroke="var(--foreground)" strokeWidth="1.5" />
              <text x="370" y="80" fontSize="10" fill="var(--success)" fontWeight="700">TCP</text>

              {/* TOOL оси на наконечнике */}
              <line x1="362" y1="90" x2="392" y2="90" stroke="var(--error)" strokeWidth="1.5" markerEnd="url(#arrowRs)" />
              <line x1="362" y1="90" x2="362" y2="60" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#arrowBs)" />
              <line x1="362" y1="90" x2="350" y2="103" stroke="var(--success)" strokeWidth="1.5" markerEnd="url(#arrowGs)" />
              <text x="395" y="93" fontSize="9" fill="var(--error)" fontWeight="600">x</text>
              <text x="354" y="58" fontSize="9" fill="var(--accent)" fontWeight="600">z</text>
              <text x="396" y="68" fontSize="10" fill="var(--foreground)" fontWeight="700">TOOL</text>
            </g>

            {/* Деталь / заготовка справа + BASE */}
            <g>
              <rect x="370" y="195" width="90" height="40" rx="3" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.2" strokeDasharray="2 2" />
              <text x="415" y="218" textAnchor="middle" fontSize="9" fill="var(--accent)" opacity="0.8">заготовка</text>
              {/* BASE оси на углу детали */}
              <line x1="380" y1="200" x2="425" y2="200" stroke="var(--error)" strokeWidth="2" markerEnd="url(#arrowR2)" />
              <line x1="380" y1="200" x2="380" y2="170" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#arrowB2)" />
              <line x1="380" y1="200" x2="365" y2="212" stroke="var(--success)" strokeWidth="2" markerEnd="url(#arrowG2)" />
              <circle cx="380" cy="200" r="3.5" fill="var(--foreground)" />
              <text x="430" y="204" fontSize="10" fill="var(--error)" fontWeight="600">X</text>
              <text x="368" y="166" fontSize="10" fill="var(--accent)" fontWeight="600">Z</text>
              <text x="345" y="220" fontSize="10" fill="var(--success)" fontWeight="600">Y</text>
              <text x="378" y="190" fontSize="11" fill="var(--foreground)" fontWeight="700">BASE</text>
            </g>

            {/* Связь: WORLD → BASE и WORLD → ROBROOT (тонкие пунктиры) */}
            <path d="M 60 230 Q 220 235 380 200" fill="none" stroke="var(--accent)" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="3 3" />
            <path d="M 60 230 Q 110 232 175 215" fill="none" stroke="var(--accent)" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="3 3" />

            {/* Линия от TCP к заготовке — то, что TCP описывается в BASE */}
            <line x1="362" y1="90" x2="380" y2="200" stroke="var(--success)" strokeOpacity="0.5" strokeWidth="1" strokeDasharray="2 2" />

            {/* Маркеры */}
            <defs>
              <marker id="arrowR" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="var(--error)" /></marker>
              <marker id="arrowB" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="var(--accent)" /></marker>
              <marker id="arrowG" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="var(--success)" /></marker>
              <marker id="arrowR2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="var(--error)" /></marker>
              <marker id="arrowB2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="var(--accent)" /></marker>
              <marker id="arrowG2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="var(--success)" /></marker>
              <marker id="arrowRs" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="var(--error)" /></marker>
              <marker id="arrowBs" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="var(--accent)" /></marker>
              <marker id="arrowGs" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="var(--success)" /></marker>
            </defs>
          </svg>
        </div>
        <p className="text-xs text-muted-foreground text-center">
          Изометрическая проекция: WORLD &mdash; глобальная точка отсчёта, BASE привязан к&nbsp;заготовке,
          TOOL и&nbsp;TCP &mdash; на&nbsp;конце манипулятора. Зелёная пунктирная линия &mdash;
          вектор TCP в&nbsp;BASE, который и&nbsp;программирует оператор.
        </p>
      </motion.div>

      {/* DragDrop — сразу после SVG-схемы систем координат */}
      <motion.div variants={fadeInItem}>
        <DragDrop
          instruction="Сопоставьте систему координат KUKA с её ролью в ячейке."
          items={[
            { id: 'world', text: 'WORLD' },
            { id: 'robroot', text: 'ROBROOT' },
            { id: 'base', text: 'BASE' },
            { id: 'tool', text: 'TOOL' },
            { id: 'flange', text: 'FLANGE' },
          ]}
          zones={[
            { id: 'world-zone', label: 'Базовая система отсчёта, фиксированная в пространстве цеха', acceptIds: ['world'] },
            { id: 'robroot-zone', label: 'Точка крепления робота к полу или постаменту', acceptIds: ['robroot'] },
            { id: 'base-zone', label: 'Положение и ориентация заготовки или палета (можно сдвинуть)', acceptIds: ['base'] },
            { id: 'tool-zone', label: 'Инструмент на фланце (захват, сварочная горелка)', acceptIds: ['tool'] },
            { id: 'flange-zone', label: 'Шестая ось — физический фланец без инструмента', acceptIds: ['flange'] },
          ]}
        />
      </motion.div>

      {/* TCP подробнее */}
      <motion.div variants={fadeInItem} className="mb-10">
        <h2 className="text-xl font-semibold mb-4">TCP &mdash; единственная точка, которая важна программе</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          TCP &mdash; это &laquo;горячая точка&raquo; инструмента: остриё сварочной горелки, центр
          схвата захвата, кончик иглы диспенсера, центр шлифовального диска. Любая команда движения
          в&nbsp;KRL (PTP, LIN, CIRC) под капотом приводится к&nbsp;<em>траектории TCP</em>: KSS
          вычисляет, какие углы шести осей нужны, чтобы TCP оказался в&nbsp;заданной точке BASE
          с&nbsp;нужной ориентацией.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Поэтому ошибка калибровки TCP в&nbsp;1&nbsp;мм означает ошибку всех точек программы
          в&nbsp;1&nbsp;мм. Для дуговой сварки это критично, для палеттирования &mdash; не
          очень, но&nbsp;все равно неприятно. Калибровать TCP нужно <strong className="text-foreground">после
          каждой смены инструмента</strong> &mdash; даже если &laquo;тот&nbsp;же самый&raquo;
          захват прикручен заново.
        </p>
      </motion.div>

      {/* Калибровки */}
      <motion.div variants={fadeInItem} className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Три ритуала калибровки KUKA</h2>
        <div className="space-y-5 text-muted-foreground leading-relaxed">
          <div>
            <p className="mb-2">
              <strong className="text-foreground">XYZ 4-Point</strong> &mdash; калибровка позиции
              TCP. Оператор подводит остриё инструмента в&nbsp;один и&nbsp;тот же физический
              репер (обычно острая &laquo;игла&raquo; на&nbsp;стенде) <em>четыре раза с&nbsp;разной
              ориентацией</em> манипулятора. KSS получает 4&nbsp;уравнения с&nbsp;тремя неизвестными
              (XYZ TCP относительно фланца) и&nbsp;решает overdetermined систему методом наименьших
              квадратов. Результат &mdash; вектор TCP в&nbsp;координатах FLANGE.
            </p>
          </div>
          <div>
            <p className="mb-2">
              <strong className="text-foreground">ABC 2-Point</strong> &mdash; задаёт ориентацию
              TOOL'а. Первая точка &mdash; в&nbsp;направлении положительной оси&nbsp;X
              (TCP &laquo;смотрит&raquo; вдоль направления, как остриё горелки). Вторая &mdash;
              где-нибудь в&nbsp;плоскости XY. Из&nbsp;этих двух направлений KSS однозначно вычисляет
              углы A, B, C (rotation Z-Y-X).
            </p>
          </div>
          <div>
            <p className="mb-2">
              <strong className="text-foreground">BASE 3-Point</strong> &mdash; калибровка
              пользовательской системы координат. Три точки на&nbsp;заготовке: <em>origin</em>
              (откуда мы&nbsp;считаем), <em>точка на&nbsp;оси&nbsp;X</em> (определяет направление X)
              и&nbsp;<em>точка в&nbsp;плоскости XY</em> (определяет Y и&nbsp;косвенно Z через
              правую тройку). После калибровки все позиции в&nbsp;программе оживают
              в&nbsp;координатах детали, а&nbsp;не&nbsp;цеха.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Quiz — сразу после блока «Три ритуала калибровки KUKA» */}
      <motion.div variants={fadeInItem}>
        <Quiz
          question="Какая операция используется для калибровки TCP методом XYZ 4-Point?"
          options={[
            {
              text: 'A) Базу робота сдвигают в 4 разные точки и измеряют отклонение',
              explanation: 'Нет: ROBROOT задаётся при инсталляции и не двигается во время калибровки TCP.',
            },
            {
              text: 'B) Один и тот же физический наконечник инструмента подводят в одну фиксированную точку с 4 разными ориентациями',
              correct: true,
              explanation: 'Именно так. KSS из четырёх измерений в одной точке решает overdetermined систему наименьшими квадратами и получает XYZ TCP относительно фланца. ABC 2-Point добавляет ориентацию.',
            },
            {
              text: 'C) TCP вычисляется автоматически из CAD-модели инструмента',
              explanation: 'CAD даёт лишь номинальное значение. Реальный TCP зависит от того, как инструмент прикручен к фланцу, от люфтов и износа — поэтому его измеряют на ячейке.',
            },
            {
              text: 'D) Робот выполняет 4 последовательных PTP-движения по программе',
              explanation: 'PTP-движения здесь не помогут — это пустое перемещение без измерения. Нужны именно касания одного и того же физического репера.',
            },
          ]}
        />
      </motion.div>

      {/* Mastering */}
      <motion.div variants={fadeInItem} className="prose prose-invert max-w-none mb-10">
        <h2 className="text-xl font-semibold mb-4">Mastering &mdash; «обнуление» осей</h2>
        <p className="text-muted-foreground leading-relaxed">
          До любых калибровок TCP и BASE робот должен <strong className="text-foreground">знать
          свои нулевые положения по осям</strong> A1&hellip;A6. Эту привязку к эталону
          называют <strong className="text-foreground">Mastering</strong> (юстировка). Без
          него вся кинематика «уезжает»: TCP в WORLD будет вычисляться неверно, программа
          поедет криво, и&nbsp;даже идеально откалиброванный инструмент будет промахиваться.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-4">
          Делается с помощью прибора <strong className="text-foreground">EMD</strong>{' '}
          (Electronic Mastering Device) или dial gauge: оператор подводит каждую ось в
          mastering-position по эталонной риске, KSS запоминает её как ноль. Запускается
          через <em>SmartPAD &rarr; Start-up &rarr; Master &rarr; EMD</em>.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-4">
          Mastering нужен после: ввода в эксплуатацию, замены мотора, замены RDC, удара
          манипулятора. Раз сделано &mdash; держится годами, пока механика не нарушена.
          Если робот при пуске «думает», что находится в одной точке, а физически в другой
          &mdash; первое подозрение всегда на потерянный mastering.
        </p>
      </motion.div>

      <Takeaways
        items={[
          'TCP (Tool Center Point) — кончик инструмента. Все программы движений описывают траекторию TCP.',
          'Иерархия систем: WORLD → ROBROOT → A1…A6 → FLANGE → TOOL (TCP). BASE — пользовательская система отсчёта от WORLD, удобная для привязки к заготовке.',
          'Калибровки: TCP — XYZ 4-Point + ABC 2-Point; BASE — 3-Point (origin + X + точка XY). Без калибровки координаты «уезжают».',
          'Mastering — привязка нулевых положений осей через EMD. Нужен после ввода в работу, замены мотора/RDC, удара. Без него вся кинематика неверна.',
          'FK однозначна, IK имеет несколько решений; KUKA выбирает однозначно через status (S) и turn (T) в типе POS.',
        ]}
      />

      {/* FK / IK */}
      <motion.div variants={fadeInItem} className="mb-10">
        <h2 className="text-xl font-semibold mb-4">FK и IK на пальцах</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Под капотом KSS работают два направления преобразований между &laquo;углами осей&raquo;
          и&nbsp;&laquo;положением TCP&raquo;.
        </p>
        <ul className="space-y-3 text-muted-foreground leading-relaxed">
          <li>
            <strong className="text-foreground">Forward Kinematics (FK)</strong> &mdash;
            прямая задача: известны углы шести осей &rarr; вычисляем положение и&nbsp;ориентацию
            TCP в&nbsp;WORLD. Это последовательное умножение матриц по&nbsp;таблице
            Денавита-Хартенберга. Тригонометрия, замкнутая форма, всегда <em>одно</em> решение.
          </li>
          <li>
            <strong className="text-foreground">Inverse Kinematics (IK)</strong> &mdash;
            обратная задача: известно положение TCP &rarr; вычисляем углы. Решений
            обычно <em>несколько</em>: кисть &laquo;вверх/вниз&raquo;, локоть
            &laquo;вперёд/назад&raquo;, развороты последней оси. KUKA выбирает однозначно через
            два дополнительных поля в&nbsp;типе <code className="text-accent">E6POS</code>:
            <strong className="text-foreground"> status</strong> (3&nbsp;бита &mdash; конфигурация
            манипулятора) и&nbsp;<strong className="text-foreground">turn</strong> (по&nbsp;биту
            на&nbsp;каждую ось &mdash; знак угла).
          </li>
        </ul>
        <p className="text-muted-foreground leading-relaxed mt-4">
          Практический вывод: при программировании в&nbsp;<code className="text-accent">E6POS</code>
          {' '}всегда фиксируйте <code className="text-accent">S</code> и&nbsp;<code className="text-accent">T</code>,
          иначе один и&nbsp;тот же XYZ может разрешиться в&nbsp;разные конфигурации робота
          и&nbsp;манипулятор &laquo;кувыркнётся&raquo; через сингулярность.
        </p>
      </motion.div>

      {/* InputExercise */}
      <motion.div variants={fadeInItem}>
        <InputExercise
          prompt="Что произойдёт, если сместить BASE на 10 мм по оси X, не трогая программу?"
          placeholder="Опишите, что увидит оператор..."
          hint="BASE — это система координат, относительно которой описаны точки в программе. Подумайте, куда они &laquo;уедут&raquo; после сдвига BASE."
          validate={(v) => {
            const trimmed = v.trim();
            if (trimmed.length < 25) return false;
            const movesPoints = /(сместит|сдвин|переместит|поедет|уед|переедет|сместятс)/i.test(trimmed);
            const aboutProgram = /(точк|програм|траектор)/i.test(trimmed);
            return movesPoints && aboutProgram;
          }}
          successMessage="Верно — все точки программы сместятся на 10 мм по X."
          exampleAnswer="Все траектории программы сместятся на 10 мм по X относительно цеха, потому что точки описаны в BASE. Сама программа не меняется — меняется лишь система отсчёта, в которой эти точки оживают."
        />
      </motion.div>

      {/* Итог */}
      <motion.div variants={fadeInItem} className="mb-4">
        <h2 className="text-xl font-semibold mb-4">Что важно унести из модуля</h2>
        <ul className="space-y-2 text-muted-foreground leading-relaxed">
          <li>
            KUKA различает пять систем координат: <em>WORLD, ROBROOT, BASE, TOOL, FLANGE</em>.
            Программа описывает движение TCP в&nbsp;BASE, а&nbsp;KSS приводит всё к&nbsp;WORLD.
          </li>
          <li>
            Калибровки: <em>XYZ 4-Point</em> &mdash; позиция TCP, <em>ABC 2-Point</em> &mdash;
            ориентация TOOL'а, <em>BASE 3-Point</em> &mdash; пользовательская система на детали.
            Перекалибровать BASE проще, чем переписывать программу.
          </li>
          <li>
            FK даёт TCP из&nbsp;углов однозначно; IK имеет несколько решений &mdash; KUKA
            однозначно выбирает их через <code className="text-accent">status</code>
            {' '}и&nbsp;<code className="text-accent">turn</code> в&nbsp;<code className="text-accent">E6POS</code>.
          </li>
        </ul>
      </motion.div>
    </ModuleWrapper>
  );
}
