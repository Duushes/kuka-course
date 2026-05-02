'use client';

// Module 9 — Sunrise.OS, симуляция, диагностика: отдельная экосистема KUKA
// для коллаборативного робота LBR iiwa (Java + Sunrise.Workbench + RoboticsAPI),
// автономная симуляция через KUKA.Sim 4 (на базе Visual Components),
// диагностика и устранение неполадок через SmartPAD и базу знаний Xpert.

import ModuleWrapper, { fadeInItem } from '@/components/ModuleWrapper';
import Quiz from '@/components/Quiz';
import DragDrop from '@/components/DragDrop';
import ScenarioCard from '@/components/ScenarioCard';
import Takeaways from '@/components/Takeaways';
import { motion } from 'framer-motion';

export default function Module9() {
  return (
    <ModuleWrapper
      moduleIndex={9}
      title="Sunrise.OS, симуляция, диагностика"
      subtitle="LBR iiwa на Java + KUKA.Sim + диагностика"
      readingList={[
        { title: 'IFL-CAMP/iiwa_stack (GitHub)', url: 'https://github.com/IFL-CAMP/iiwa_stack' },
        { title: 'KUKA.Sim 4 — product page', url: 'https://www.kuka.com/en-us/products/robotics-systems/software/simulation-planning-optimization/kuka_sim' },
        { title: 'KUKA Xpert — база знаний', url: 'https://xpert.kuka.com/' },
      ]}
    >
      {/* Введение */}
      <motion.div variants={fadeInItem} className="prose prose-invert max-w-none mb-10">
        <p className="text-muted-foreground leading-relaxed">
          Классический KUKA &mdash; это{' '}
          <strong className="text-foreground">KRC + KRL</strong>: индустриальный
          контроллер и Pascal-подобный язык. Но для коллаборативного{' '}
          <strong className="text-foreground">LBR iiwa</strong> используется
          отдельная экосистема{' '}
          <strong className="text-foreground">Sunrise</strong>: другой контроллер,
          другая ОС, другой язык программирования.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-4">
          Параллельно для автономного планирования есть{' '}
          <strong className="text-foreground">KUKA.Sim 4</strong> (на базе Visual
          Components), а для разбора ошибок &mdash; портал{' '}
          <strong className="text-foreground">Xpert</strong> с описанием каждого
          сообщения KSS. В этом модуле собираем три инструмента вместе.
        </p>
      </motion.div>

      {/* Теория 1: Sunrise.OS и Sunrise.Workbench */}
      <motion.div variants={fadeInItem} className="prose prose-invert max-w-none mb-10">
        <h2 className="text-xl font-semibold mb-4">Sunrise.OS и Sunrise.Workbench</h2>
        <p className="text-muted-foreground leading-relaxed">
          <strong className="text-foreground">Sunrise.OS</strong> &mdash; полный
          Linux с расширением реального времени (RT-extension) от KUKA, отдельная
          платформа для коллаборативного робота (cobot) LBR iiwa. Программируется
          на <strong className="text-foreground">Java</strong> через{' '}
          <strong className="text-foreground">Sunrise.Workbench</strong> &mdash;
          среду разработки на базе Eclipse (по аналогии с WorkVisual для KRC).
        </p>
        <p className="text-muted-foreground leading-relaxed mt-4">
          Основное API &mdash;{' '}
          <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">RoboticsAPI</code>{' '}
          с классами{' '}
          <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">Robot</code>,{' '}
          <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">Tool</code>,{' '}
          <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">MotionContainer</code>.
          Принципиально отличается от KRL: объектно-ориентированный, многопоточный
          (через стандартные{' '}
          <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">Thread</code>-классы
          и синхронизацию), имеет нативную поддержку{' '}
          <strong className="text-foreground">силомоментных операций</strong>{' '}
          (управление с импедансом, impedance control).
        </p>
        <pre className="font-mono text-xs p-4 rounded-lg bg-card border border-border/50 overflow-x-auto mt-4">{`// Sunrise.Java — типовой паттерн RoboticsAPI
@Override
public void run() {
  lbr.move(ptp(getApplicationData().getFrame("/P1")));
  lbr.move(lin(getApplicationData().getFrame("/P2")));
  tcp.move(linRel(0, 0, 50)
    .setMode(impedanceController));   // мягкий контакт
}`}</pre>
      </motion.div>

      {/* Теория 2: KRL vs Sunrise */}
      <motion.div variants={fadeInItem} className="prose prose-invert max-w-none mb-10">
        <h2 className="text-xl font-semibold mb-4">KRL и Sunrise.Java &mdash; в чём разница</h2>
        <ul className="text-muted-foreground leading-relaxed mt-3 space-y-2 list-disc pl-5">
          <li>
            <strong className="text-foreground">Контроллер:</strong> KRL работает
            на <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">KRC4</code>/
            <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">KRC5</code>,
            Sunrise.Java &mdash; только на Sunrise Cabinet для LBR iiwa.
          </li>
          <li>
            <strong className="text-foreground">Парадигма:</strong> KRL &mdash;
            процедурный, в стиле Pascal; Sunrise &mdash; объектно-ориентированная
            Java с многопоточностью и стандартными библиотеками JVM.
          </li>
          <li>
            <strong className="text-foreground">Файлы и типы:</strong> KRL хранит
            точки в{' '}
            <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">.dat</code>{' '}
            как{' '}
            <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">POS</code>/
            <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">E6POS</code>;
            Sunrise &mdash; через{' '}
            <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">Frame</code>{' '}
            и{' '}
            <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">JointPosition</code>{' '}
            в данных приложения (Application Data).
          </li>
          <li>
            <strong className="text-foreground">Команды движения:</strong> KRL &mdash;{' '}
            <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">LIN P1</code>;
            Sunrise &mdash;{' '}
            <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">{`lbr.move(ptp(getApplicationData().getFrame("/P1")))`}</code>.
          </li>
          <li>
            <strong className="text-foreground">Силомоментный режим:</strong>{' '}
            у KRL &mdash; через дополнительную опцию KUKA.ForceTorqueControl;
            у Sunrise &mdash; нативно через{' '}
            <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">CartesianImpedanceControlMode</code>.
          </li>
        </ul>
      </motion.div>

      {/* Теория 3: KUKA.Sim 4 */}
      <motion.div variants={fadeInItem} className="prose prose-invert max-w-none mb-10">
        <h2 className="text-xl font-semibold mb-4">KUKA.Sim 4 &mdash; автономное программирование</h2>
        <p className="text-muted-foreground leading-relaxed">
          <strong className="text-foreground">KUKA.Sim 4</strong> (актуальная
          ветка 4.3 в 2024) &mdash; среда автономной симуляции на основе{' '}
          <strong className="text-foreground">Visual Components</strong>. eCatalog
          с готовыми моделями роботов KUKA, конвейеров, инструментов, типовых ячеек.
          Поддерживает{' '}
          <strong className="text-foreground">экспорт KRL-программ</strong> на
          реальный контроллер: построил траекторию в симуляторе &mdash; получил{' '}
          <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">.src</code>/
          <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">.dat</code>.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-4">
          Лицензирование: пробная версия на{' '}
          <strong className="text-foreground">1 год</strong> доступна через{' '}
          <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">my.kuka</code>{' '}
          Marketplace. Важно:{' '}
          <strong className="text-foreground">KUKA.OfficeLite</strong>{' '}
          (виртуальный KRC, нужен для проверки полной KRL-логики на ПК) &mdash;{' '}
          <strong className="text-foreground">не входит в пробную версию</strong>{' '}
          и продаётся отдельно.
        </p>
      </motion.div>

      {/* Теория 4: Диагностика и Xpert */}
      <motion.div variants={fadeInItem} className="prose prose-invert max-w-none mb-10">
        <h2 className="text-xl font-semibold mb-4">Диагностика и устранение неполадок (troubleshooting)</h2>
        <p className="text-muted-foreground leading-relaxed">
          Алгоритм действий при сбое &mdash; стандартный для KUKA:
        </p>
        <ol className="text-muted-foreground leading-relaxed mt-3 space-y-2 list-decimal pl-5">
          <li>
            Прочитать список{' '}
            <strong className="text-foreground">активных сообщений</strong> на
            SmartPAD. Сообщения KSS делятся на пять типов:{' '}
            <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">Information</code>{' '}
            (информация),{' '}
            <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">Notification</code>{' '}
            (уведомление),{' '}
            <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">Acknowledgement</code>{' '}
            (требует подтверждения),{' '}
            <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">Wait</code>{' '}
            (ожидание),{' '}
            <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">Dialogue</code>{' '}
            (диалог).
          </li>
          <li>
            Найти все сообщения с подтверждением{' '}
            (<strong className="text-foreground">Acknowledge messages</strong>):
            для режима AUT все они должны быть подтверждены, иначе старт
            программы блокируется.
          </li>
          <li>
            Типичные причины: незакрытый защитный контур (E-Stop, дверь),
            не готовый периферийный сигнал (PLC, захват), ошибки калибровки осей
            или мастеринга.
          </li>
          <li>
            Устранить корневую причину, потом подтвердить кнопкой{' '}
            <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">Acknowledge all</code>{' '}
            (&laquo;Подтвердить всё&raquo;) или скриптом.
          </li>
          <li>
            Если сообщение возвращается &mdash; диагностика по коду ошибки{' '}
            (<code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">KSS00xxx</code>,{' '}
            <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">KSS01xxx</code>)
            в{' '}
            <strong className="text-foreground">Xpert</strong> (раздел{' '}
            &laquo;Сообщения&raquo;). Базовый доступ &mdash; бесплатно после
            регистрации.
          </li>
        </ol>
      </motion.div>

      {/* SVG-схема: KRL ↔ Sunrise */}
      <motion.div variants={fadeInItem} className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Схема: KRL и Sunrise.Java рядом</h2>
        <div className="rounded-xl border border-border/50 bg-muted/30 p-4">
          <svg
            viewBox="0 0 540 240"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
            role="img"
            aria-label="Сравнение: слева колонка KRL для KRC4/KRC5 (в стиле Pascal, .src+.dat, LIN P1), справа Sunrise.Java для LBR iiwa (Java, объектно-ориентированный, lbr.move). Между колонками стрелка с надписью коллаборативный робот LBR iiwa."
          >
            <defs>
              <marker
                id="arrow9"
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

            {/* KRL колонка */}
            <rect
              x="20"
              y="20"
              width="220"
              height="200"
              rx="10"
              fill="var(--accent-light)"
              stroke="var(--accent)"
              strokeWidth="1.5"
            />
            <text x="130" y="42" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">
              KRL для KRC4 / KRC5
            </text>
            <text x="35" y="68" fontSize="10" fill="var(--muted)">
              язык: в стиле Pascal
            </text>
            <text x="35" y="86" fontSize="10" fill="var(--muted)">
              файлы: .src + .dat
            </text>
            <text x="35" y="104" fontSize="10" fill="var(--muted)">
              типы: POS, E6POS
            </text>
            <text x="35" y="124" fontSize="10" fontFamily="monospace" fill="var(--muted)">
              DEF demo()
            </text>
            <text x="35" y="140" fontSize="10" fontFamily="monospace" fill="var(--muted)">
              {'  PTP HOME'}
            </text>
            <text x="35" y="156" fontSize="10" fontFamily="monospace" fill="var(--accent)" fontWeight="600">
              {'  LIN P1'}
            </text>
            <text x="35" y="172" fontSize="10" fontFamily="monospace" fill="var(--muted)">
              END
            </text>
            <text x="35" y="200" fontSize="9" fill="var(--muted)" fontStyle="italic">
              индустриальный, процедурный
            </text>

            {/* стрелка между */}
            <line
              x1="245"
              y1="120"
              x2="295"
              y2="120"
              stroke="var(--accent)"
              strokeWidth="1.5"
              markerEnd="url(#arrow9)"
            />
            <text x="270" y="110" textAnchor="middle" fontSize="9" fill="var(--accent)">
              коллаб.
            </text>
            <text x="270" y="138" textAnchor="middle" fontSize="9" fill="var(--accent)">
              LBR iiwa &rarr;
            </text>

            {/* Sunrise колонка */}
            <rect
              x="300"
              y="20"
              width="220"
              height="200"
              rx="10"
              fill="var(--accent-light)"
              stroke="var(--accent)"
              strokeWidth="1.5"
            />
            <text x="410" y="42" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">
              Sunrise.Java для LBR iiwa
            </text>
            <text x="315" y="68" fontSize="10" fill="var(--muted)">
              язык: Java (Eclipse)
            </text>
            <text x="315" y="86" fontSize="10" fill="var(--muted)">
              парадигма: ООП, многопоточность
            </text>
            <text x="315" y="104" fontSize="10" fill="var(--muted)">
              типы: Frame, JointPosition
            </text>
            <text x="315" y="124" fontSize="9" fontFamily="monospace" fill="var(--muted)">
              public void run() {'{'}
            </text>
            <text x="315" y="140" fontSize="9" fontFamily="monospace" fill="var(--accent)" fontWeight="600">
              {'  lbr.move(ptp(...))'}
            </text>
            <text x="315" y="156" fontSize="9" fontFamily="monospace" fill="var(--muted)">
              {'  lbr.move(lin(...))'}
            </text>
            <text x="315" y="172" fontSize="9" fontFamily="monospace" fill="var(--muted)">
              {'}'}
            </text>
            <text x="315" y="200" fontSize="9" fill="var(--muted)" fontStyle="italic">
              коллаборативный, импедансный
            </text>
          </svg>
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Один производитель &mdash; две экосистемы. Для KRC берём KRL и
          WorkVisual; для LBR iiwa &mdash; Sunrise.Java и Sunrise.Workbench.
        </p>
      </motion.div>

      <Takeaways
        items={[
          'LBR iiwa — отдельная экосистема: Sunrise.OS + Sunrise Cabinet + Java через Sunrise.Workbench. Не KRC, не KRL.',
          'KUKA.Sim 4 — автономный симулятор (на базе Visual Components) с экспортом KRL. Пробная версия 1 год через my.kuka. Без OfficeLite не выполняет полный KSS во время выполнения.',
          'Алгоритм диагностики: SmartPAD → активные сообщения → корневая причина → Acknowledge all → если не помогло → код ошибки в Xpert.',
        ]}
      />

      {/* Quiz */}
      <motion.div variants={fadeInItem}>
        <Quiz
          question="На каком языке программируется LBR iiwa в Sunrise.Workbench?"
          options={[
            {
              text: 'KRL',
              explanation: 'KRL применяется только на KRC4/KRC5, не на Sunrise.',
            },
            {
              text: 'Java',
              correct: true,
              explanation:
                'Sunrise.OS использует Java (Sunrise.Workbench на базе Eclipse). KRL применяется для KRC4/KRC5, Sunrise — для LBR iiwa.',
            },
            {
              text: 'IEC 61131-3 ST (Structured Text)',
              explanation: 'ST — язык PLC, не используется как основной для LBR iiwa.',
            },
            {
              text: 'Python',
              explanation: 'Python в Sunrise.Workbench не поддерживается как основной язык.',
            },
          ]}
        />
      </motion.div>

      {/* DragDrop */}
      <motion.div variants={fadeInItem}>
        <DragDrop
          instruction="Сопоставьте симулятор с производителем"
          items={[
            { id: 'kuka-ag', text: 'KUKA AG (на базе Visual Components)' },
            { id: 'robodk', text: 'RoboDK Inc. (независимый, мультибрендовый)' },
            { id: 'open-robotics', text: 'Open Robotics (с открытым исходным кодом, через ROS)' },
            { id: 'vc-oy', text: 'Visual Components OY (Финляндия, поставщик движка для KUKA.Sim)' },
          ]}
          zones={[
            { id: 'z-kukasim', label: 'KUKA.Sim 4', acceptIds: ['kuka-ag'] },
            { id: 'z-robodk', label: 'RoboDK', acceptIds: ['robodk'] },
            { id: 'z-gazebo', label: 'Gazebo', acceptIds: ['open-robotics'] },
            { id: 'z-vc', label: 'Visual Components', acceptIds: ['vc-oy'] },
          ]}
        />
      </motion.div>

      {/* ScenarioCard */}
      <motion.div variants={fadeInItem}>
        <ScenarioCard
          scenario="Робот в режиме AUT останавливается с сообщением KSS00276 «Acknowledge messages» при попытке запуска. Алгоритм действий?"
          context="Программа загружена и ранее запускалась. В предыдущей смене была сработка E-Stop и работы по обслуживанию захвата. После перезапуска KSS блокирует старт."
          options={[
            {
              text: 'Перепрошить KSS',
              outcome:
                'Слишком радикально, диагностика не выполнена. Перепрошивка стирает калибровку и не решает проблему с активным сообщением о подтверждении.',
              score: 0,
            },
            {
              text: 'Прочитать список сообщений на SmartPAD, найти сообщения с подтверждением (Acknowledge), устранить корневые причины (защитный контур, периферия, калибровка), затем Acknowledge all. Если возвращается — поиск по коду в Xpert',
              outcome:
                'Стандартный алгоритм диагностики KUKA. KSS00276 — общий код, требующий ручного просмотра конкретных сообщений с подтверждением; снимать их без устранения причины нельзя.',
              score: 1,
            },
            {
              text: 'Перейти в T1 и попробовать снова',
              outcome:
                'Не решит причину, только маскирует: T1 имеет другие правила подтверждений, но корневая ошибка останется и снова всплывёт в AUT.',
              score: 0,
            },
            {
              text: 'Игнорировать и нажать Acknowledge all сразу',
              outcome:
                'Опасно — нерасследованная причина (например, незакрытый защитный контур или некалиброванная ось) может вернуться и привести к аварийной остановке.',
              score: 0,
            },
          ]}
        />
      </motion.div>

      {/* Закрывающий абзац */}
      <motion.div variants={fadeInItem} className="prose prose-invert max-w-none mb-4">
        <p className="text-muted-foreground leading-relaxed">
          Итог модуля: для индустриальных KRC &mdash;{' '}
          <strong className="text-foreground">KRL + WorkVisual</strong>; для
          коллаборативного LBR iiwa &mdash;{' '}
          <strong className="text-foreground">Sunrise.Java + Sunrise.Workbench</strong>;
          для автономного планирования &mdash;{' '}
          <strong className="text-foreground">KUKA.Sim 4</strong>; для разбора
          ошибок &mdash; сообщения SmartPAD и база знаний{' '}
          <strong className="text-foreground">Xpert</strong>.
        </p>
      </motion.div>
    </ModuleWrapper>
  );
}
