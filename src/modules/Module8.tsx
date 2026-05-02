'use client';

// Module 8 — Интеграция KUKA с внешним миром: ROS-Industrial + URDF (симуляция),
// RSI (real-time, 4-12 мс), EthernetKRL EKI (TCP/IP, 50+ мс), OPC UA (SCADA/MES),
// CREAD/CWRITE (legacy serial/TCP). Уровни latency и сценарии выбора протокола.

import ModuleWrapper, { fadeInItem } from '@/components/ModuleWrapper';
import Quiz from '@/components/Quiz';
import DragDrop from '@/components/DragDrop';
import ScenarioCard from '@/components/ScenarioCard';
import Takeaways from '@/components/Takeaways';
import { motion } from 'framer-motion';

export default function Module8() {
  return (
    <ModuleWrapper
      moduleIndex={8}
      title="Интеграция"
      subtitle="Как робот говорит с внешним миром"
      readingList={[
        { title: 'ros-industrial/kuka_experimental (GitHub)', url: 'https://github.com/ros-industrial/kuka_experimental' },
        { title: 'ROS-Industrial Training Documentation', url: 'https://industrial-training-master.readthedocs.io/' },
        { title: 'KUKA RSI 4.1 Documentation (KUKA Xpert)', url: 'https://xpert.kuka.com/' },
        { title: 'OPC UA Foundation — Robotics Companion Spec', url: 'https://reference.opcfoundation.org/Robotics/' },
      ]}
    >
      {/* Введение */}
      <motion.div variants={fadeInItem} className="prose prose-invert max-w-none mb-10">
        <p className="text-muted-foreground leading-relaxed">
          Робот <strong className="text-foreground">никогда не работает в одиночку</strong>.
          Он встроен в линию вместе с PLC, конвейерами, сенсорами, vision-системами и
          MES-уровнем. Чтобы это всё связать, KUKA предлагает{' '}
          <strong className="text-foreground">несколько слоёв коммуникации</strong> &mdash;
          от real-time коррекций каждые 4&ndash;12&nbsp;мс до высокоуровневого OPC&nbsp;UA
          для SCADA.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-4">
          Выбор протокола &mdash; это компромисс между{' '}
          <strong className="text-foreground">latency</strong>,{' '}
          <strong className="text-foreground">сложностью настройки</strong> и{' '}
          <strong className="text-foreground">гибкостью</strong>. Force-control требует RSI
          и жёсткого цикла; передать &laquo;деталь готова&raquo; на PLC можно через EKI;
          отдать состояние линии в SCADA &mdash; через OPC&nbsp;UA.
        </p>
      </motion.div>

      {/* Теория 1: ROS-Industrial / URDF */}
      <motion.div variants={fadeInItem} className="prose prose-invert max-w-none mb-10">
        <h2 className="text-xl font-semibold mb-4">ROS-Industrial и URDF</h2>
        <p className="text-muted-foreground leading-relaxed">
          <strong className="text-foreground">ROS-Industrial</strong> &mdash; open-source
          инициатива, объединяющая промышленных производителей роботов вокруг ROS (Robot
          Operating System). Для KUKA в репозитории{' '}
          <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">ros-industrial/kuka_experimental</code>{' '}
          лежат URDF-описания серий KR и драйверы; в{' '}
          <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">kuka_kss_ethernet_krl</code>{' '}
          &mdash; интеграция с KSS через EKI.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-4">
          <strong className="text-foreground">URDF</strong> (Unified Robot Description
          Format) &mdash; XML-формат, описывающий робота как граф{' '}
          <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">link</code>'ов
          (звеньев) и{' '}
          <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">joint</code>'ов
          (сочленений) с лимитами и инерциальными свойствами. Используется для симуляции в{' '}
          <strong className="text-foreground">Gazebo</strong>, визуализации в{' '}
          <strong className="text-foreground">RViz</strong> и планирования траекторий в{' '}
          <strong className="text-foreground">MoveIt!</strong>.
        </p>
        <pre className="font-mono text-xs p-4 rounded-lg bg-card border border-border/50 overflow-x-auto mt-4">{`<!-- URDF фрагмент: одно звено + сочленение KR 6 R900 -->
<link name="link_1">
  <inertial>
    <mass value="40.0"/>
    <origin xyz="0 0 0.1"/>
  </inertial>
</link>
<joint name="joint_a1" type="revolute">
  <parent link="base_link"/>
  <child  link="link_1"/>
  <axis xyz="0 0 1"/>
  <limit lower="-2.96" upper="2.96" effort="0" velocity="3.84"/>
</joint>`}</pre>
      </motion.div>

      {/* Теория 2: RSI */}
      <motion.div variants={fadeInItem} className="prose prose-invert max-w-none mb-10">
        <h2 className="text-xl font-semibold mb-4">RSI &mdash; Robot Sensor Interface</h2>
        <p className="text-muted-foreground leading-relaxed">
          <strong className="text-foreground">RSI</strong> &mdash; самый низкоуровневый,
          real-time протокол KUKA. Цикл &mdash;{' '}
          <strong className="text-foreground">4&ndash;12&nbsp;мс</strong> (зависит от
          версии KSS и настроек RSI Object Configuration; стандартные значения 4 / 8 / 12).
          На каждом тике KRC отправляет XML-фрейм с текущим положением и сенсорами,
          внешний PC отвечает XML-фреймом с коррекциями &mdash; декартовыми ($\Delta$X, $\Delta$Y, $\Delta$Z)
          или осевыми ($\Delta$A1&hellip;$\Delta$A6).
        </p>
        <p className="text-muted-foreground leading-relaxed mt-4">
          Используется там, где нужно &laquo;дотягивать&raquo; траекторию по сенсору:{' '}
          <strong className="text-foreground">force-control</strong> (полировка, сборка),{' '}
          <strong className="text-foreground">vision-guided</strong> (трекинг детали),
          лазерный seam-tracking при сварке. Требует отдельную лицензию RSI.
        </p>
        <pre className="font-mono text-xs p-4 rounded-lg bg-card border border-border/50 overflow-x-auto mt-4">{`<!-- RSI XML: фрейм коррекции от внешнего PC к KRC -->
<Sen Type="ImFree">
  <RKorr X="0.10" Y="0.00" Z="-0.05" A="0" B="0" C="0"/>
  <AKorr A1="0" A2="0" A3="0" A4="0" A5="0" A6="0"/>
  <IPOC>1234567890</IPOC>
</Sen>`}</pre>
      </motion.div>

      {/* Quiz — сразу после блока «RSI — Robot Sensor Interface» */}
      <motion.div variants={fadeInItem}>
        <Quiz
          question="Минимальная типичная периодичность цикла KUKA RSI?"
          options={[
            {
              text: '100 мс',
              explanation: '100 мс — это уровень EKI или PLC-обмена, но не RSI.',
            },
            {
              text: '50 мс',
              explanation: '50 мс — характерная latency для EthernetKRL EKI, не для real-time RSI.',
            },
            {
              text: '4–12 мс',
              correct: true,
              explanation:
                'RSI работает с интерполяционным циклом 4–12 мс (зависит от версии и настроек), что делает его пригодным для real-time коррекций.',
            },
            {
              text: '1 с',
              explanation: '1 с — это уровень OPC UA / SCADA, не подходит для real-time коррекций траектории.',
            },
          ]}
        />
      </motion.div>

      {/* Теория 3: EthernetKRL */}
      <motion.div variants={fadeInItem} className="prose prose-invert max-w-none mb-10">
        <h2 className="text-xl font-semibold mb-4">EthernetKRL (EKI) &mdash; TCP/IP сокеты</h2>
        <p className="text-muted-foreground leading-relaxed">
          <strong className="text-foreground">EthernetKRL</strong> (часто сокращают до
          EKI &mdash; Ethernet KRL Interface) &mdash; пакет KUKA для работы с TCP/IP
          сокетами прямо из KRL. Не real-time: типичная latency{' '}
          <strong className="text-foreground">50+&nbsp;мс</strong>, но сильно проще RSI и
          не требует строгих циклов.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-4">
          Конфигурация задаётся отдельным XML-файлом &mdash;{' '}
          <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">EkiConfig</code>:
          там описывают endpoints, формат сообщений, мэппинг XML-полей в KRL-переменные.
          Подходит для асинхронных сообщений между PLC, vision-системой и роботом:
          &laquo;деталь готова к pick&raquo;, &laquo;паллета заполнена&raquo;,
          &laquo;запросить новый offset&raquo;. Лицензия EthernetKRL.
        </p>
        <pre className="font-mono text-xs p-4 rounded-lg bg-card border border-border/50 overflow-x-auto mt-4">{`; KRL: открыть TCP-сокет и отправить XML
EKI_INIT("ProdServer")
EKI_OPEN("ProdServer")
EKI_SEND("ProdServer", "<Msg><State>READY</State></Msg>")
EKI_WAIT("ProdServer")
; ответ доступен в EkiConfig-mapping переменных`}</pre>
      </motion.div>

      {/* Теория 4: OPC UA */}
      <motion.div variants={fadeInItem} className="prose prose-invert max-w-none mb-10">
        <h2 className="text-xl font-semibold mb-4">OPC UA &mdash; стандарт для SCADA / MES</h2>
        <p className="text-muted-foreground leading-relaxed">
          <strong className="text-foreground">OPC UA</strong> (Open Platform Communications
          Unified Architecture) &mdash; открытый промышленный стандарт, поддерживаемый
          фондом OPC Foundation. KUKA предлагает{' '}
          <strong className="text-foreground">KUKA.OPC UA Server</strong> &mdash; отдельный
          лицензируемый технологический пакет с расширенным namespace для робота. С KSS&nbsp;8.6
          в систему добавлен базовый bootstrap-namespace, но полная функциональность (методы,
          события, security) &mdash; в платном пакете.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-4">
          Стандартные nodes: положение робота (TCP, оси), состояние программы, регистры,
          сигналы I/O. SCADA / MES подключается как клиент и читает / пишет nodes по
          read/write/subscribe. Latency &mdash; уровня секунд, годится для мониторинга и
          высокоуровневых команд (&laquo;запусти программу X&raquo;), но не для
          траекторных коррекций.
        </p>
      </motion.div>

      {/* Теория 5: CREAD/CWRITE */}
      <motion.div variants={fadeInItem} className="prose prose-invert max-w-none mb-10">
        <h2 className="text-xl font-semibold mb-4">CREAD / CWRITE &mdash; legacy каналы</h2>
        <p className="text-muted-foreground leading-relaxed">
          <strong className="text-foreground">CREAD</strong> и{' '}
          <strong className="text-foreground">CWRITE</strong> (Channel Read / Channel
          Write) &mdash; старейшие KUKA-функции последовательной и TCP-коммуникации через
          символьные каналы. Канал объявляется как{' '}
          <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">CHANNEL</code>{' '}
          в{' '}
          <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">$config.dat</code>{' '}
          и привязывается к COM-порту или TCP-сокету через системный конфиг.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-4">
          В современных проектах их вытеснили EKI и OPC&nbsp;UA, но на legacy-инсталляциях
          (KSS 5.x &mdash; 8.x с интеграцией со старым PLC через RS-232) они всё ещё в
          ходу. Не предсказуемы по времени &mdash; не подходят для real-time.
        </p>
      </motion.div>

      {/* SVG-схема: архитектура RSI */}
      <motion.div variants={fadeInItem} className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Схема: архитектура RSI</h2>
        <div className="rounded-xl border border-border/50 bg-muted/30 p-4">
          <svg
            viewBox="0 0 540 280"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
            role="img"
            aria-label="Слева KRC real-time core, справа PC controller; стрелка KRC к PC красная (положение и сенсоры, 4-12 мс), стрелка PC к KRC синяя (коррекции, 4-12 мс); снизу timeline с тиками 4, 8, 12 мс"
          >
            <defs>
              <marker
                id="arrow8-red"
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M0,0 L10,5 L0,10 z" fill="var(--error)" />
              </marker>
              <marker
                id="arrow8-blue"
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

            {/* KRC блок */}
            <rect
              x="20"
              y="40"
              width="180"
              height="140"
              rx="10"
              fill="var(--accent-light)"
              stroke="var(--accent)"
              strokeWidth="1.5"
            />
            <text x="110" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">
              KRC
            </text>
            <text x="110" y="80" textAnchor="middle" fontSize="10" fill="var(--muted)">
              Real-time core
            </text>
            <text x="110" y="108" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--muted)">
              интерполятор
            </text>
            <text x="110" y="126" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--muted)">
              сервоприводы
            </text>
            <text x="110" y="144" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--muted)">
              энкодеры
            </text>
            <text x="110" y="166" textAnchor="middle" fontSize="9" fontStyle="italic" fill="var(--muted)">
              VxWorks RTOS
            </text>

            {/* PC блок */}
            <rect
              x="340"
              y="40"
              width="180"
              height="140"
              rx="10"
              fill="var(--accent-light)"
              stroke="var(--accent)"
              strokeWidth="1.5"
            />
            <text x="430" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">
              External PC
            </text>
            <text x="430" y="80" textAnchor="middle" fontSize="10" fill="var(--muted)">
              RSI controller
            </text>
            <text x="430" y="108" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--muted)">
              force / vision
            </text>
            <text x="430" y="126" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--muted)">
              алгоритм
            </text>
            <text x="430" y="144" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--muted)">
              коррекции
            </text>
            <text x="430" y="166" textAnchor="middle" fontSize="9" fontStyle="italic" fill="var(--muted)">
              Linux RT / Windows
            </text>

            {/* Стрелка KRC → PC (красная, положение + сенсоры) */}
            <line
              x1="200"
              y1="95"
              x2="340"
              y2="95"
              stroke="var(--error)"
              strokeWidth="2"
              markerEnd="url(#arrow8-red)"
            />
            <text x="270" y="86" textAnchor="middle" fontSize="10" fill="var(--error)" fontWeight="600">
              положение + сенсоры
            </text>
            <text x="270" y="108" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="var(--error)">
              4&ndash;12 мс
            </text>

            {/* Стрелка PC → KRC (синяя, коррекции) */}
            <line
              x1="340"
              y1="140"
              x2="200"
              y2="140"
              stroke="var(--accent)"
              strokeWidth="2"
              markerEnd="url(#arrow8-blue)"
            />
            <text x="270" y="132" textAnchor="middle" fontSize="10" fill="var(--accent)" fontWeight="600">
              XML коррекции
            </text>
            <text x="270" y="155" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="var(--accent)">
              4&ndash;12 мс
            </text>

            {/* Timeline */}
            <line x1="60" y1="230" x2="500" y2="230" stroke="var(--muted)" strokeWidth="1" />
            <line x1="60" y1="225" x2="60" y2="235" stroke="var(--muted)" strokeWidth="1" />
            <line x1="207" y1="225" x2="207" y2="235" stroke="var(--accent)" strokeWidth="1.5" />
            <line x1="353" y1="225" x2="353" y2="235" stroke="var(--accent)" strokeWidth="1.5" />
            <line x1="500" y1="225" x2="500" y2="235" stroke="var(--accent)" strokeWidth="1.5" />
            <text x="60" y="252" textAnchor="middle" fontSize="9" fill="var(--muted)">
              0
            </text>
            <text x="207" y="252" textAnchor="middle" fontSize="9" fill="var(--accent)" fontWeight="600">
              4 мс
            </text>
            <text x="353" y="252" textAnchor="middle" fontSize="9" fill="var(--accent)" fontWeight="600">
              8 мс
            </text>
            <text x="500" y="252" textAnchor="middle" fontSize="9" fill="var(--accent)" fontWeight="600">
              12 мс
            </text>
            <text x="280" y="270" textAnchor="middle" fontSize="9" fill="var(--muted)" fontStyle="italic">
              интерполяционные тики RSI
            </text>
          </svg>
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          На каждом тике 4&ndash;12&nbsp;мс KRC и внешний PC обмениваются XML-фреймами.
          Если PC не отвечает в окне цикла &mdash; KSS останавливает программу с RSI
          timeout-ошибкой.
        </p>
      </motion.div>

      <Takeaways
        items={[
          'Слои интеграции по latency: RSI (4–12 мс, real-time) → EKI (50+ мс, TCP) → OPC UA (секунды, SCADA) → ROS (для симуляции и URDF).',
          'RSI работает по UDP с фиксированным IPO-циклом; используется для force-control, vision-tracking, лазерного seam-tracking.',
          'KUKA.OPC UA Server — лицензируемый пакет, не «бесплатно из коробки».',
          'CREAD/CWRITE — legacy для последовательных каналов; в новых проектах вытесняется EKI.',
        ]}
      />

      {/* DragDrop — интеграционный обзор, остаётся ближе к концу */}
      <motion.div variants={fadeInItem}>
        <DragDrop
          instruction="Расположите слои интеграции от низкого (real-time) к высокому"
          items={[
            { id: 'rsi', text: 'RSI (real-time, force / vision)' },
            { id: 'eki', text: 'EthernetKRL EKI (TCP/IP сокеты)' },
            { id: 'opcua', text: 'OPC UA (SCADA / MES)' },
            { id: 'ros', text: 'ROS / URDF (симуляция, kinematic)' },
          ]}
          zones={[
            { id: 'z-1', label: 'Уровень 1 (4–12 мс)', acceptIds: ['rsi'] },
            { id: 'z-2', label: 'Уровень 2 (50+ мс)', acceptIds: ['eki'] },
            { id: 'z-3', label: 'Уровень 3 (sec)', acceptIds: ['opcua'] },
            { id: 'z-4', label: 'Уровень 4 (info)', acceptIds: ['ros'] },
          ]}
        />
      </motion.div>

      {/* ScenarioCard */}
      <motion.div variants={fadeInItem}>
        <ScenarioCard
          scenario="Нужно отправлять корректуру траектории каждые 8 мс на основе данных от force-сенсора. Какой протокол выбрать?"
          context="Робот KR 6 R900 на сборке: датчик силы выдаёт значение каждые 4 мс, нужно подкручивать TCP по Z по нормали к поверхности."
          options={[
            {
              text: 'RSI (Robot Sensor Interface)',
              outcome:
                'Верно. RSI 4–12 мс — единственный real-time KUKA-протокол. Идеально для force-control: на каждом тике принимаем измерение, считаем коррекцию, отправляем XML-фрейм обратно в KRC.',
              score: 1,
            },
            {
              text: 'EthernetKRL (EKI)',
              outcome:
                'Нет: EKI работает на 50+ мс, не уложится в 8 мс цикл. Не real-time, годится для асинхронных сообщений между PLC и роботом.',
              score: 0,
            },
            {
              text: 'OPC UA',
              outcome:
                'Нет: OPC UA — для SCADA / MES, latency секунды. Подходит для мониторинга и высокоуровневых команд, но не для траекторных коррекций.',
              score: 0,
            },
            {
              text: 'CREAD / CWRITE',
              outcome:
                'Нет: слишком медленно и не предсказуемо для real-time. Это legacy-механизм для последовательных каналов в старых проектах.',
              score: 0,
            },
          ]}
        />
      </motion.div>

      {/* Закрывающий абзац */}
      <motion.div variants={fadeInItem} className="prose prose-invert max-w-none mb-4">
        <p className="text-muted-foreground leading-relaxed">
          На практике в одной ячейке часто живут{' '}
          <strong className="text-foreground">сразу несколько протоколов</strong>: RSI
          для seam-tracking, EKI для синхронизации с PLC, OPC&nbsp;UA для отчётов в MES,
          а ROS / URDF &mdash; на этапе off-line программирования и симуляции. Выбор
          протокола &mdash; это в первую очередь вопрос{' '}
          <strong className="text-foreground">latency</strong>: что важнее &mdash; цикл
          4&nbsp;мс или удобство интеграции.
        </p>
      </motion.div>
    </ModuleWrapper>
  );
}
