'use client';

import { motion } from 'framer-motion';
import { useCourse } from '@/context/CourseContext';

const modules = [
  {
    num: 1,
    title: 'Введение в KUKA',
    desc: 'Кто такие KUKA и зачем вам её роботы',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="6" y="2" width="6" height="3" rx="0.6" stroke="currentColor" strokeWidth="1.3" />
        <path d="M9 5V8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M5 8L9 8L13 8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M5 8V12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M13 8V12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <rect x="3" y="12" width="12" height="3" rx="0.6" stroke="currentColor" strokeWidth="1.3" />
      </svg>
    ),
  },
  {
    num: 2,
    title: 'Архитектура контроллера',
    desc: 'KRC4, KRC5 и всё, что у них внутри',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="3" y="2" width="12" height="14" rx="1" stroke="currentColor" strokeWidth="1.3" />
        <path d="M5 5H13" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        <path d="M5 8H13" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        <circle cx="6" cy="12" r="1" fill="currentColor" />
        <circle cx="9" cy="12" r="1" fill="currentColor" fillOpacity="0.5" />
      </svg>
    ),
  },
  {
    num: 3,
    title: 'Координаты и кинематика',
    desc: 'Где находится TCP и почему это важно',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M3 15V3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M3 15H15" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M3 3L1.5 5M3 3L4.5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M15 15L13 13.5M15 15L13 16.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M3 15L9 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeDasharray="2 1.5" />
        <circle cx="9" cy="9" r="1.4" fill="currentColor" />
      </svg>
    ),
  },
  {
    num: 4,
    title: 'KRL — язык программирования',
    desc: 'Пишем первую программу для робота',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M6 5L2.5 9L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 5L15.5 9L12 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10.5 4L7.5 14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: 5,
    title: 'WorkVisual и SmartPAD',
    desc: 'Создаём проект и обучаем точки',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M4.5 13.5L12 6L13.5 7.5L6 15L3 15.5L4.5 13.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
        <path d="M11 7L13 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M13.5 4.5L14.5 5.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M15 3L16 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: 6,
    title: 'Безопасность',
    desc: 'Чтобы робот никого не ударил',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 2L14.5 4V8.5C14.5 12 12 14.5 9 16C6 14.5 3.5 12 3.5 8.5V4L9 2Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
        <path d="M6.5 9L8 10.5L11 7.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    num: 7,
    title: 'Прикладные пакеты',
    desc: 'Готовые решения: палеты, сварка, машинное зрение',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.3" />
        <rect x="10" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.3" />
        <rect x="2" y="10" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.3" />
        <rect x="10" y="10" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.3" />
      </svg>
    ),
  },
  {
    num: 8,
    title: 'Интеграция',
    desc: 'Как робот говорит с внешним миром',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="14" cy="4" r="2" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="9" cy="14" r="2" stroke="currentColor" strokeWidth="1.3" />
        <line x1="5.5" y1="5.5" x2="8" y2="12.5" stroke="currentColor" strokeWidth="1.1" />
        <line x1="12.5" y1="5.5" x2="10" y2="12.5" stroke="currentColor" strokeWidth="1.1" />
        <line x1="6" y1="4" x2="12" y2="4" stroke="currentColor" strokeWidth="1.1" />
      </svg>
    ),
  },
  {
    num: 9,
    title: 'Sunrise.OS, симуляция, диагностика',
    desc: 'LBR iiwa на Java и KUKA.Sim',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="3" width="14" height="10" rx="1.2" stroke="currentColor" strokeWidth="1.3" />
        <path d="M7.5 6.5L11 9L7.5 11.5V6.5Z" fill="currentColor" />
        <path d="M5 16H13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M9 13V16" stroke="currentColor" strokeWidth="1.3" />
      </svg>
    ),
  },
  {
    num: 10,
    title: 'Финальный экзамен',
    desc: '15 вопросов на проверку знаний',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 2L11 6.5L16 7.2L12.5 10.5L13.3 15.5L9 13.2L4.7 15.5L5.5 10.5L2 7.2L7 6.5L9 2Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const learnPoints = [
  <>Различать линейку <strong className="text-foreground">KUKA</strong> и подбирать робота под задачу</>,
  <>Читать структурную схему <strong className="text-foreground">KRC4/KRC5</strong> и понимать роль каждого модуля</>,
  <>Калибровать <strong className="text-foreground">TCP</strong> и базу через <strong className="text-foreground">SmartPAD</strong></>,
  <>Писать простые программы в <strong className="text-foreground">KRL</strong>: PTP, LIN, FOLD, $&#8209;переменные</>,
  <>Понимать <strong className="text-foreground">ISO 10218&#8209;1:2025</strong> и категории остановок 0/1/2</>,
  <>Спроектировать интеграцию робота с <strong className="text-foreground">PLC</strong> через mxAutomation</>,
  <>Разбирать коды ошибок <strong className="text-foreground">KSS</strong> и проводить диагностику через <strong className="text-foreground">Xpert</strong></>,
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const } },
};

function HeroGraphic() {
  // 6-axis KUKA manipulator over WORLD coordinate grid
  return (
    <svg viewBox="0 0 280 320" fill="none" className="w-full max-w-[260px] sm:max-w-[280px]">
      {/* Grid */}
      {Array.from({ length: 9 }).map((_, i) => (
        <line key={`gh-${i}`} x1="20" y1={40 + i * 30} x2="260" y2={40 + i * 30} stroke="var(--accent)" strokeWidth="0.5" strokeOpacity="0.08" />
      ))}
      {Array.from({ length: 9 }).map((_, i) => (
        <line key={`gv-${i}`} x1={20 + i * 30} y1="40" x2={20 + i * 30} y2="280" stroke="var(--accent)" strokeWidth="0.5" strokeOpacity="0.08" />
      ))}

      {/* Glow behind robot */}
      <circle cx="140" cy="180" r="90" fill="var(--accent)" fillOpacity="0.06" />
      <circle cx="140" cy="180" r="50" fill="var(--accent)" fillOpacity="0.04" />

      {/* WORLD axes */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <line x1="40" y1="280" x2="40" y2="40" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.5" />
        <path d="M37 45 L40 38 L43 45" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <text x="32" y="34" fontSize="9" fontWeight="600" fill="var(--accent)" fillOpacity="0.7">Z</text>

        <line x1="40" y1="280" x2="260" y2="280" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.5" />
        <path d="M255 277 L262 280 L255 283" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <text x="262" y="284" fontSize="9" fontWeight="600" fill="var(--accent)" fillOpacity="0.7">X</text>

        <text x="44" y="293" fontSize="7" fill="var(--accent)" fillOpacity="0.5">WORLD</text>
      </motion.g>

      {/* Base (A1) */}
      <motion.g
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <rect x="115" y="245" width="50" height="22" rx="2" fill="var(--accent)" fillOpacity="0.18" stroke="var(--accent)" strokeWidth="1.4" />
        <text x="140" y="260" textAnchor="middle" fontSize="8" fontWeight="600" fill="var(--accent)" fillOpacity="0.85">A1</text>
      </motion.g>

      {/* Shoulder link (A2) */}
      <motion.line
        x1="140" y1="245" x2="140" y2="180"
        stroke="var(--accent)" strokeWidth="6" strokeLinecap="round"
        strokeOpacity="0.7"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      />
      <motion.circle
        cx="140" cy="245" r="6" fill="var(--accent)" fillOpacity="0.25" stroke="var(--accent)" strokeWidth="1.4"
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.55, duration: 0.3 }}
      />

      {/* Elbow link (A3) */}
      <motion.line
        x1="140" y1="180" x2="195" y2="135"
        stroke="var(--accent)" strokeWidth="5" strokeLinecap="round"
        strokeOpacity="0.7"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      />
      <motion.circle
        cx="140" cy="180" r="6" fill="var(--accent)" fillOpacity="0.25" stroke="var(--accent)" strokeWidth="1.4"
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.75, duration: 0.3 }}
      />

      {/* Wrist (A4-A5) */}
      <motion.line
        x1="195" y1="135" x2="225" y2="115"
        stroke="var(--accent)" strokeWidth="4" strokeLinecap="round"
        strokeOpacity="0.7"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.9, duration: 0.4 }}
      />
      <motion.circle
        cx="195" cy="135" r="5" fill="var(--accent)" fillOpacity="0.25" stroke="var(--accent)" strokeWidth="1.4"
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.95, duration: 0.3 }}
      />

      {/* Flange + TCP */}
      <motion.g
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1, duration: 0.4, type: 'spring', stiffness: 180 }}
        style={{ transformOrigin: '225px 115px' }}
      >
        <circle cx="225" cy="115" r="4.5" fill="var(--accent)" stroke="var(--accent)" strokeWidth="1.3" />
        <line x1="225" y1="115" x2="240" y2="105" stroke="var(--accent)" strokeWidth="1.3" strokeLinecap="round" />
        <circle cx="240" cy="105" r="3" fill="var(--accent)" fillOpacity="0.9" />
        <text x="245" y="103" fontSize="8" fontWeight="600" fill="var(--accent)">TCP</text>
      </motion.g>

      {/* Pulse on TCP */}
      <motion.circle
        cx="240" cy="105" r="3"
        fill="none" stroke="var(--accent)" strokeWidth="1"
        initial={{ r: 3, opacity: 0.5 }}
        animate={{ r: 14, opacity: 0 }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', delay: 1.3 }}
      />

      {/* Joint labels */}
      <text x="148" y="215" fontSize="7" fill="var(--accent)" fillOpacity="0.55">A2</text>
      <text x="168" y="160" fontSize="7" fill="var(--accent)" fillOpacity="0.55">A3</text>
      <text x="200" y="125" fontSize="7" fill="var(--accent)" fillOpacity="0.55">A5</text>
    </svg>
  );
}

const trustItems = ['10 модулей', 'Интерактивные задания', 'Финальный экзамен', 'Бесплатно'];

function CheatSheetBlock() {
  const series = [
    { name: 'AGILUS', desc: 'малый, грузоподъёмность до 10 кг', x: 18 },
    { name: 'CYBERTECH', desc: 'средний, 6&ndash;16 кг', x: 78 },
    { name: 'QUANTEC', desc: 'тяжёлый, 90&ndash;300 кг', x: 138 },
    { name: 'LBR iiwa', desc: 'коллаборативный (cobot)', x: 198 },
  ];

  return (
    <div className="grid sm:grid-cols-2 gap-3 mt-4">
      {/* Линейка KUKA */}
      <div className="p-4 rounded-xl bg-card border border-border/50">
        <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-3">Линейка KUKA</p>
        <svg viewBox="0 0 260 100" fill="none" className="w-full">
          {series.map((s, i) => {
            const h = [22, 36, 56, 30][i];
            const y = 70 - h;
            return (
              <g key={s.name}>
                <rect x={s.x} y={y} width="32" height={h} rx="2" fill="var(--accent)" fillOpacity={0.10 + i * 0.04} stroke="var(--accent)" strokeWidth="1" />
                <line x1={s.x + 16} y1={y} x2={s.x + 16} y2={y - 8} stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round" />
                <circle cx={s.x + 16} cy={y - 10} r="2.5" fill="var(--accent)" fillOpacity="0.7" />
                <text x={s.x + 16} y="82" textAnchor="middle" fontSize="6.5" fontWeight="600" fill="var(--accent)">{s.name}</text>
                <text x={s.x + 16} y="92" textAnchor="middle" fontSize="5.5" fill="var(--accent)" fillOpacity="0.7" dangerouslySetInnerHTML={{ __html: s.desc }} />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Команды KRL */}
      <div className="p-4 rounded-xl bg-card border border-border/50">
        <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-3">Команды KRL</p>
        <div className="space-y-1.5 text-xs text-muted-foreground">
          <div><strong className="text-foreground font-mono">PTP</strong> &mdash; быстрое движение по осям</div>
          <div><strong className="text-foreground font-mono">LIN</strong> &mdash; линейное движение TCP</div>
          <div><strong className="text-foreground font-mono">CIRC</strong> &mdash; дуга через вспомогательную точку</div>
          <div><strong className="text-foreground font-mono">SPLINE</strong> &mdash; сглаженная траектория</div>
        </div>
      </div>

      {/* Системы координат */}
      <div className="p-4 rounded-xl bg-card border border-border/50">
        <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-3">Системы координат</p>
        <div className="space-y-1.5 text-xs text-muted-foreground">
          <div><strong className="text-foreground">WORLD</strong> &mdash; мировая, неподвижна</div>
          <div><strong className="text-foreground">ROBROOT</strong> &mdash; основание робота</div>
          <div><strong className="text-foreground">BASE</strong> &mdash; деталь/стол</div>
          <div><strong className="text-foreground">TOOL</strong> &mdash; инструмент (TCP)</div>
          <div><strong className="text-foreground">FLANGE</strong> &mdash; фланец A6</div>
        </div>
      </div>

      {/* ISO 10218 */}
      <div className="p-4 rounded-xl bg-card border border-border/50">
        <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-3">ISO 10218 &mdash; категории остановок</p>
        <div className="space-y-1.5 text-xs text-muted-foreground">
          <div><strong className="text-foreground">Cat 0</strong> &mdash; мгновенный сброс питания приводов</div>
          <div><strong className="text-foreground">Cat 1</strong> &mdash; контролируемое торможение, затем сброс</div>
          <div><strong className="text-foreground">Cat 2</strong> &mdash; остановка без снятия питания</div>
        </div>
      </div>
    </div>
  );
}

export default function Landing() {
  const { setCurrentModule, completedModules } = useCourse();

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-3xl mx-auto px-6 py-16 sm:py-24"
    >
      {/* Hero */}
      <motion.div variants={item} className="relative">
        <div className="absolute -top-20 -left-20 w-[400px] h-[400px] rounded-full bg-accent/[0.06] blur-[100px] pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 sm:gap-10 relative">
          <div className="flex-1 text-center sm:text-left">
            <motion.span
              variants={item}
              className="inline-block text-xs font-medium text-accent uppercase tracking-widest mb-4"
            >
              Интерактивный курс
            </motion.span>
            <motion.h1
              variants={item}
              className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1]"
            >
              Освойте <strong className="text-accent font-bold">KUKA</strong>.
              <br />
              От архитектуры до KRL.
            </motion.h1>
            <motion.p
              variants={item}
              className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-lg"
            >
              Открытый интерактивный курс для инженеров и студентов. От первого <strong className="text-foreground">SmartPAD</strong> до интеграции с <strong className="text-foreground">PLC</strong>.
            </motion.p>

            <motion.div variants={item} className="mt-8 flex flex-wrap gap-3 justify-center sm:justify-start">
              <button
                onClick={() => setCurrentModule(1)}
                className="px-6 py-3 bg-accent text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
              >
                Начать обучение &rarr;
              </button>
            </motion.div>

            <motion.div variants={item} className="mt-6 flex flex-wrap justify-center sm:justify-start gap-x-3 gap-y-1.5 text-xs text-muted-foreground">
              {trustItems.map((t, i) => (
                <span key={i} className="flex items-center gap-2">
                  {i > 0 && <span className="text-muted-foreground/40">&middot;</span>}
                  <span>{t}</span>
                </span>
              ))}
            </motion.div>
          </div>

          <motion.div variants={item} className="flex-shrink-0">
            <HeroGraphic />
          </motion.div>
        </div>
      </motion.div>

      {/* Что такое промышленный робот за 60 секунд */}
      <motion.div variants={item} className="mt-16 mb-4">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
          Что такое промышленный робот за 60 секунд
        </h2>
        <motion.div variants={container} initial="hidden" animate="show" className="mt-6 grid sm:grid-cols-3 gap-6">
          <motion.div variants={item} className="p-5 rounded-xl border border-border/50 bg-card">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect x="10" y="25" width="12" height="4" rx="0.8" fill="var(--accent-light)" stroke="var(--accent)" strokeWidth="1.4" />
              <line x1="16" y1="25" x2="16" y2="19" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" />
              <circle cx="16" cy="19" r="2" fill="var(--accent-light)" stroke="var(--accent)" strokeWidth="1.4" />
              <line x1="16" y1="19" x2="22" y2="13" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" />
              <circle cx="22" cy="13" r="2" fill="var(--accent-light)" stroke="var(--accent)" strokeWidth="1.4" />
              <line x1="22" y1="13" x2="26" y2="9" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" />
              <circle cx="26" cy="9" r="1.6" fill="var(--accent)" stroke="var(--accent)" strokeWidth="1.2" />
            </svg>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Манипулятор</strong> &mdash; шарнирная механическая рука с 6 (или 7) подвижными осями. На конце &mdash; инструмент: захват, сварочная горелка, кисть для покраски.
            </p>
          </motion.div>

          <motion.div variants={item} className="p-5 rounded-xl border border-border/50 bg-card">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect x="6" y="5" width="16" height="22" rx="1.2" fill="var(--accent-light)" stroke="var(--accent)" strokeWidth="1.4" />
              <line x1="10" y1="9" x2="18" y2="9" stroke="var(--accent)" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="10" y1="13" x2="18" y2="13" stroke="var(--accent)" strokeWidth="1.2" strokeLinecap="round" />
              <circle cx="11" cy="20" r="1.2" fill="var(--accent)" />
              <circle cx="14.5" cy="20" r="1.2" fill="var(--accent)" fillOpacity="0.5" />
              <circle cx="18" cy="20" r="1.2" fill="var(--accent)" fillOpacity="0.3" />
              <circle cx="20" cy="16" r="0.8" fill="var(--accent)" />
              <path d="M22 20 Q26 20 26 24 L26 28" stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round" fill="none" />
            </svg>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Контроллер</strong> &mdash; отдельный электрический шкаф рядом с роботом. Внутри &mdash; промышленный компьютер, силовая электроника, ОС реального времени. У KUKA это шкаф KRC4 или KRC5.
            </p>
          </motion.div>

          <motion.div variants={item} className="p-5 rounded-xl border border-border/50 bg-card">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect x="7" y="4" width="14" height="20" rx="1.6" fill="var(--accent-light)" stroke="var(--accent)" strokeWidth="1.4" />
              <rect x="9" y="6.5" width="10" height="13" rx="0.5" stroke="var(--accent)" strokeWidth="1" fill="none" strokeOpacity="0.6" />
              <circle cx="14" cy="22" r="0.9" fill="var(--accent)" />
              <path d="M21 8 Q26 8 26 13 L26 28" stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round" fill="none" />
            </svg>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Пульт оператора</strong> &mdash; портативный сенсорный экран на кабеле. С него человек обучает точки, запускает программу, останавливает робота. У KUKA это SmartPAD.
            </p>
          </motion.div>
        </motion.div>
        <p className="mt-6 text-sm text-muted-foreground leading-relaxed">
          Этот курс &mdash; про то, как со всем этим работать на роботах KUKA, от первых движений до интеграции с PLC.
        </p>
      </motion.div>

      {/* Программа курса */}
      <motion.div variants={item} className="mt-16 sm:mt-20">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-6">
          Программа курса
        </h2>
        <div className="space-y-1">
          {modules.map((m) => (
            <motion.button
              key={m.num}
              variants={item}
              onClick={() => setCurrentModule(m.num)}
              className="w-full text-left p-4 rounded-lg hover:bg-muted/50 transition-colors flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 text-accent group-hover:bg-accent/20 transition-colors">
                  {m.icon}
                </div>
                <div>
                  <span className="text-sm font-medium group-hover:text-accent transition-colors">
                    {m.title}
                  </span>
                  <span className="block text-xs text-muted-foreground mt-0.5">{m.desc}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {completedModules.has(m.num) && (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-success">
                    <path d="M13.25 4.75L6 12L2.75 8.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-muted-foreground/30 group-hover:text-accent transition-colors">
                  <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Чему вы научитесь */}
      <motion.div variants={item} className="mt-16 sm:mt-20">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-6">
          Чему вы научитесь
        </h2>
        <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
          {learnPoints.map((p, i) => (
            <motion.li key={i} variants={item} className="flex items-start gap-3 text-sm text-muted-foreground">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-accent flex-shrink-0 mt-0.5">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.4" />
                <path d="M5 8L7 10L11 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="leading-relaxed">{p}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Шпаргалка */}
      <motion.div variants={item} className="mt-16 sm:mt-20">
        <details className="group">
          <summary className="cursor-pointer list-none flex items-center justify-between p-4 rounded-lg border border-border/50 hover:border-accent/40 transition-colors">
            <div className="flex items-center gap-3">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-accent">
                <rect x="2" y="1" width="14" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
                <path d="M5.5 5H12.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M5.5 8H12.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M5.5 11H9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              <span className="text-sm font-medium">Шпаргалка по KUKA</span>
            </div>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-muted-foreground group-open:rotate-180 transition-transform">
              <path d="M3 5L7 9L11 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </summary>
          <CheatSheetBlock />
        </details>
      </motion.div>
    </motion.div>
  );
}
