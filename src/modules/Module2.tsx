'use client';

// Module 2 — Архитектура контроллера KUKA: что внутри KRC4/KRC5,
// как устроен SmartPAD, какие шины поддерживаются и как сигнал
// проходит путь от нажатия кнопки до движения оси.

import ModuleWrapper, { fadeInItem } from '@/components/ModuleWrapper';
import Quiz from '@/components/Quiz';
import DragDrop from '@/components/DragDrop';
import Takeaways from '@/components/Takeaways';
import { motion } from 'framer-motion';

export default function Module2() {
  return (
    <ModuleWrapper
      moduleIndex={2}
      title="Архитектура контроллера"
      subtitle="KRC4, KRC5 и всё, что у них внутри"
      readingList={[
        { title: 'KUKA Xpert — KRC4/KRC5 documentation', url: 'https://xpert.kuka.com/' },
        {
          title: 'KUKA WorkVisual product page',
          url: 'https://www.kuka.com/en-de/products/robot-systems/software/system-software/kuka_systemsoftware/kuka_work-visual',
        },
      ]}
    >
      {/* Введение */}
      <motion.div variants={fadeInItem} className="prose prose-invert max-w-none mb-10">
        <p className="text-muted-foreground leading-relaxed">
          Промышленный робот &mdash; это не только манипулятор. Чтобы шесть осей синхронно
          двигались по программе, рядом стоит электрический шкаф размером с тумбочку. Внутри
          него &mdash; промышленный компьютер, силовая электроника и ОС реального времени.
          Этот шкаф называется <strong className="text-foreground">контроллер</strong>, и в
          мире KUKA он носит имя <strong className="text-foreground">KR C4</strong> или
          <strong className="text-foreground"> KR C5</strong>.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-4">
          Контроллер &mdash; это мозг ячейки. Он принимает команды от оператора через
          SmartPAD, читает программу на KRL, в реальном времени считает кинематику, рассылает
          импульсы на шесть сервоприводов и слушает обратную связь от резольверов. Без
          понимания того, что внутри шкафа, невозможно ни диагностировать сбой, ни выбрать
          правильную полевую шину для интеграции.
        </p>
      </motion.div>

      {/* Теория 1: четыре части робота */}
      <motion.div variants={fadeInItem} className="prose prose-invert max-w-none mb-10">
        <h2 className="text-xl font-semibold mb-4">Четыре части промышленного робота</h2>
        <p className="text-muted-foreground leading-relaxed">
          Любая роботизированная ячейка KUKA состоит из четырёх физических компонентов,
          которые соединены кабелями:
        </p>
        <ul className="text-muted-foreground leading-relaxed mt-3 space-y-2 list-disc pl-5">
          <li>
            <strong className="text-foreground">Манипулятор</strong> &mdash; механическая
            рука с шестью осями (A1&ndash;A6), редукторами и сервомоторами.
          </li>
          <li>
            <strong className="text-foreground">Контроллер</strong> &mdash; шкаф KRC4 или
            KRC5: промышленный ПК, силовые блоки, safety-логика.
          </li>
          <li>
            <strong className="text-foreground">SmartPAD</strong> (KCP &mdash; KUKA Control
            Panel) &mdash; пульт оператора с 8.4&ldquo; touchscreen, ключом режимов и
            аварийным стопом.
          </li>
          <li>
            <strong className="text-foreground">Кабели</strong> &mdash; силовой жгут к
            манипулятору (моторы, тормоза) и сигнальный (резольверы, датчики).
          </li>
        </ul>
      </motion.div>

      {/* Теория 2: что внутри KRC4 */}
      <motion.div variants={fadeInItem} className="prose prose-invert max-w-none mb-10">
        <h2 className="text-xl font-semibold mb-4">Что внутри шкафа KRC4</h2>
        <p className="text-muted-foreground leading-relaxed">
          KRC4 &mdash; контроллер поколения 2007&ndash;2014, шкаф ~600&times;700&times;1100&nbsp;мм
          и весом 60&ndash;100&nbsp;кг. Если открыть дверцу, увидим связку модулей:
        </p>
        <ul className="text-muted-foreground leading-relaxed mt-3 space-y-2 list-disc pl-5">
          <li>
            <strong className="text-foreground">Power supply</strong> &mdash; блок питания,
            вход 400&nbsp;V AC из цеховой сети.
          </li>
          <li>
            <strong className="text-foreground">Control PC</strong> &mdash; промышленный
            x86-совместимый компьютер, на нём крутится
            <strong className="text-foreground"> KSS</strong> (KUKA System Software).
            Это набор ПО (компилятор KRL, motion planner, web-интерфейс), который работает
            поверх ОС: на KRC4 &mdash; Windows Embedded Standard&nbsp;7 с RT-расширением
            VxWin/RTX; на KRC5 &mdash; Linux с RT-патчем.
          </li>
          <li>
            <strong className="text-foreground">KPP</strong> (KUKA Power Pack) &mdash;
            силовой блок, выпрямляет AC в DC-шину для серво.
          </li>
          <li>
            <strong className="text-foreground">KSP</strong> (KUKA Servo Pack) &mdash;
            сервопреобразователи, по одному на каждую ось A1&ndash;A6.
          </li>
          <li>
            <strong className="text-foreground">RDC</strong> (Resolver Digital Converter)
            &mdash; читает резольверы осей и возвращает положение в Control PC.
          </li>
          <li>
            <strong className="text-foreground">Плата безопасности ESC</strong>{' '}
            <span className="text-muted-foreground/70">(Electronic Safety Circuit)</span>{' '}
            &mdash; обрабатывает аварийный стоп, выключатель разрешения движения, защитные
            барьеры; сертифицирована по SIL&nbsp;3&nbsp;/&nbsp;PLe.
          </li>
          <li>
            <strong className="text-foreground">Модули ввода-вывода (IO)</strong>{' '}
            и слоты под полевые шины.
          </li>
        </ul>
      </motion.div>

      {/* Теория 3: KRC5 */}
      <motion.div variants={fadeInItem} className="prose prose-invert max-w-none mb-10">
        <h2 className="text-xl font-semibold mb-4">KRC5 &mdash; следующее поколение</h2>
        <p className="text-muted-foreground leading-relaxed">
          <strong className="text-foreground">KRC5</strong> (включая варианты KR&nbsp;C5
          micro и compact) выпускается с 2018&nbsp;года. Главная инженерная идея &mdash;
          компактность: шкаф занимает примерно 50&nbsp;% объёма KRC4. Достигнуто это за
          счёт того, что <strong className="text-foreground">KPP и KSP объединены</strong>
          на одной плате, а тепловой пакет переработан.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-4">
          Программно KRC5 использует <strong className="text-foreground">общий стек
          KSS/VSS</strong> и совместим с KRC4: программа на KRL, написанная под KRC4,
          запускается на KRC5 без изменений (требуется KSS&nbsp;8.7 или новее). Это
          важная гарантия для заводов с парком из десятков роботов разных поколений.
        </p>
      </motion.div>

      {/* Теория 4: SmartPAD */}
      <motion.div variants={fadeInItem} className="prose prose-invert max-w-none mb-10">
        <h2 className="text-xl font-semibold mb-4">SmartPAD &mdash; пульт оператора</h2>
        <p className="text-muted-foreground leading-relaxed">
          <strong className="text-foreground">SmartPAD</strong> (он же KCP &mdash; KUKA
          Control Panel) &mdash; рабочая консоль с экраном 8.4&ldquo; touchscreen. Жёстко
          подключается к одному KRC специальным кабелем; горячая замена возможна на KRC4 с
          опцией SmartPAD&nbsp;2 и штатно на KRC5.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-4">
          На пульте есть три ключевых аппаратных элемента безопасности:
        </p>
        <ul className="text-muted-foreground leading-relaxed mt-3 space-y-2 list-disc pl-5">
          <li>
            <strong className="text-foreground">Ключ-переключатель режимов</strong>{' '}
            <span className="text-muted-foreground/70">(key switch)</span>:{' '}
            <strong className="text-foreground">T1</strong>{' '}
            (медленный ручной, до 250&nbsp;мм/с),{' '}
            <strong className="text-foreground">T2</strong> (быстрый ручной, для
            проверки),{' '}
            <strong className="text-foreground">AUT</strong> (автоматический запуск
            программы), <strong className="text-foreground">EXT</strong> (внешнее
            управление от PLC).
          </li>
          <li>
            <strong className="text-foreground">Выключатель разрешения движения</strong>{' '}
            <span className="text-muted-foreground/70">(enabling switch)</span> &mdash;
            трёхпозиционная кнопка-тумблер на задней стороне; движение возможно только
            в среднем положении, отпустил или резко сжал &mdash; стоп.
          </li>
          <li>
            <strong className="text-foreground">Аварийный стоп</strong>{' '}
            <span className="text-muted-foreground/70">(e-stop)</span> &mdash; красная
            грибовидная кнопка аварийной остановки.
          </li>
        </ul>
      </motion.div>

      {/* Теория 5: полевые шины */}
      <motion.div variants={fadeInItem} className="prose prose-invert max-w-none mb-10">
        <h2 className="text-xl font-semibold mb-4">Полевые шины и IO</h2>
        <p className="text-muted-foreground leading-relaxed">
          Контроллер общается с PLC и периферией через промышленные шины. WorkVisual
          поддерживает их штатно (выбираешь в каталоге устройства, конфигуратор сам
          раскладывает по слотам):
        </p>
        <ul className="text-muted-foreground leading-relaxed mt-3 space-y-2 list-disc pl-5">
          <li>
            <strong className="text-foreground">PROFINET</strong> &mdash; стандарт Siemens,
            самый распространённый на европейских заводах.
          </li>
          <li>
            <strong className="text-foreground">EtherCAT</strong> &mdash; стандарт
            Beckhoff, низкая латентность, популярен в станочных интеграциях.
          </li>
          <li>
            <strong className="text-foreground">EtherNet/IP</strong> &mdash;
            Allen-Bradley/Rockwell, доминирует в Северной Америке.
          </li>
          <li>
            <strong className="text-foreground">ProfiBus</strong>,{' '}
            <strong className="text-foreground">DeviceNet</strong>,{' '}
            <strong className="text-foreground">VARANBUS</strong> &mdash; legacy и нишевые
            шины, тоже из коробки.
          </li>
        </ul>
        <p className="text-muted-foreground leading-relaxed mt-4">
          <strong className="text-foreground">Modbus TCP</strong> в штатной комплектации
          WorkVisual нет &mdash; нужны сторонние расширения или промежуточный шлюз.
        </p>
      </motion.div>

      {/* SVG-схема: путь сигнала */}
      <motion.div variants={fadeInItem} className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Схема: от кнопки до серво</h2>
        <div className="rounded-xl border border-border/50 bg-muted/30 p-4">
          <svg
            viewBox="0 0 540 200"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
            role="img"
            aria-label="Блок-диаграмма пути сигнала: SmartPAD → KRC (Control PC + KSS, KPP/KSP/RDC) → Manipulator с осями A1-A6"
          >
            <defs>
              <marker
                id="arrow"
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

            {/* SmartPAD */}
            <rect
              x="10"
              y="65"
              width="100"
              height="70"
              rx="8"
              fill="var(--accent-light)"
              stroke="var(--accent)"
              strokeWidth="1.5"
            />
            <text x="60" y="95" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">
              SmartPAD
            </text>
            <text x="60" y="113" textAnchor="middle" fontSize="10" fill="var(--muted)">
              KCP, T1/T2/AUT/EXT
            </text>

            {/* Стрелка SmartPAD -> KRC */}
            <line
              x1="115"
              y1="100"
              x2="160"
              y2="100"
              stroke="var(--accent)"
              strokeWidth="1.5"
              markerEnd="url(#arrow)"
            />

            {/* KRC рамка */}
            <rect
              x="165"
              y="20"
              width="220"
              height="160"
              rx="10"
              fill="none"
              stroke="var(--muted)"
              strokeWidth="1"
              strokeDasharray="4 3"
            />
            <text x="275" y="38" textAnchor="middle" fontSize="11" fill="var(--muted)" fontWeight="600">
              KRC4 / KRC5
            </text>

            {/* Control PC + KSS */}
            <rect
              x="180"
              y="55"
              width="190"
              height="42"
              rx="6"
              fill="var(--accent-light)"
              stroke="var(--accent)"
              strokeWidth="1.2"
            />
            <text x="275" y="73" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">
              Control PC
            </text>
            <text x="275" y="89" textAnchor="middle" fontSize="10" fill="var(--foreground)" fillOpacity="0.7">
              KSS на Windows / Linux + RT
            </text>

            {/* KPP / KSP / RDC */}
            <rect
              x="180"
              y="110"
              width="190"
              height="50"
              rx="6"
              fill="var(--accent-light)"
              stroke="var(--accent)"
              strokeWidth="1.2"
            />
            <text x="275" y="128" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">
              KPP / KSP / RDC
            </text>
            <text x="275" y="145" textAnchor="middle" fontSize="10" fill="var(--muted)">
              Силовая + сервоприводы + резольверы
            </text>

            {/* Внутренняя стрелка Control PC -> KPP */}
            <line
              x1="275"
              y1="98"
              x2="275"
              y2="108"
              stroke="var(--accent)"
              strokeWidth="1.2"
              markerEnd="url(#arrow)"
            />

            {/* Стрелка KRC -> Manipulator */}
            <line
              x1="390"
              y1="135"
              x2="430"
              y2="135"
              stroke="var(--accent)"
              strokeWidth="1.5"
              markerEnd="url(#arrow)"
            />

            {/* Manipulator */}
            <rect
              x="435"
              y="65"
              width="95"
              height="70"
              rx="8"
              fill="var(--accent-light)"
              stroke="var(--accent)"
              strokeWidth="1.5"
            />
            <text x="482" y="92" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">
              Manipulator
            </text>
            <text x="482" y="110" textAnchor="middle" fontSize="10" fill="var(--muted)">
              A1 · A2 · A3
            </text>
            <text x="482" y="124" textAnchor="middle" fontSize="10" fill="var(--muted)">
              A4 · A5 · A6
            </text>

            {/* Обратная связь: пунктирная стрелка от Manipulator к KRC */}
            <line
              x1="435"
              y1="155"
              x2="390"
              y2="155"
              stroke="var(--muted)"
              strokeWidth="1"
              strokeDasharray="3 2"
              markerEnd="url(#arrow)"
            />
            <text x="412" y="172" textAnchor="middle" fontSize="9" fill="var(--muted)">
              feedback
            </text>
          </svg>
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Сплошные стрелки &mdash; команды; пунктирная &mdash; обратная связь от резольверов
          через RDC.
        </p>
      </motion.div>

      <Takeaways
        items={[
          'KRC4 и KRC5 — два поколения шкафа, программно совместимы (KSS 8.7+); KRC5 компактнее.',
          'SmartPAD — пульт оператора: ключ режимов (T1 / T2 / AUT / EXT) + выключатель разрешения движения (enabling switch) + аварийный стоп (e-stop).',
          'Полевые шины KUKA «из коробки»: PROFINET, EtherCAT, EtherNet/IP, ProfiBus, DeviceNet.',
        ]}
      />

      {/* Quiz */}
      <motion.div variants={fadeInItem}>
        <Quiz
          question="Чем KRC5 принципиально отличается от KRC4?"
          options={[
            {
              text: 'Поддерживает только KRL 1.x',
              explanation:
                'KRL 1.x — это даже не реальная версионность языка KUKA. KRL развивается в рамках KSS, без принципиальных революций между поколениями шкафа.',
            },
            {
              text: 'Поддерживает KSS 8.7+ и более компактный шкаф; общий стек KSS/VSS, программно совместим с KRC4',
              correct: true,
              explanation:
                'KRC5 — следующее поколение, программно совместим с KRC4 (KSS 8.7+). KPP+KSP объединены на одной плате, шкаф ~50% объёма KRC4.',
            },
            {
              text: 'Не поддерживает PROFINET',
              explanation:
                'PROFINET — базовая полевая шина для KUKA, поддерживается и KRC4, и KRC5 «из коробки».',
            },
            {
              text: 'Поддерживает только LBR iiwa',
              explanation:
                'LBR iiwa — это cobot со своим контроллером Sunrise Cabinet, не KRC. KRC5 рассчитан на классические индустриальные манипуляторы серий KR.',
            },
          ]}
        />
      </motion.div>

      {/* DragDrop: путь сигнала */}
      <motion.div variants={fadeInItem}>
        <DragDrop
          instruction="Расположите путь сигнала в правильном порядке: от нажатия кнопки на SmartPAD до движения оси"
          items={[
            { id: 'smartpad', text: 'Нажатие на SmartPAD (KCP)' },
            { id: 'controlpc', text: 'Передача в Control PC (KSS интерпретирует команду)' },
            { id: 'kpp', text: 'KPP подаёт силовое питание' },
            { id: 'ksp', text: 'KSP управляет сервоприводом оси' },
            { id: 'axis', text: 'Движение оси (резольвер → RDC обратная связь)' },
          ]}
          zones={[
            { id: 'step1', label: 'Шаг 1', acceptIds: ['smartpad'] },
            { id: 'step2', label: 'Шаг 2', acceptIds: ['controlpc'] },
            { id: 'step3', label: 'Шаг 3', acceptIds: ['kpp'] },
            { id: 'step4', label: 'Шаг 4', acceptIds: ['ksp'] },
            { id: 'step5', label: 'Шаг 5', acceptIds: ['axis'] },
          ]}
        />
      </motion.div>

      {/* Закрывающий абзац */}
      <motion.div variants={fadeInItem} className="prose prose-invert max-w-none mb-4">
        <p className="text-muted-foreground leading-relaxed">
          Дальше мы откроем WorkVisual и посмотрим, как этот шкаф представлен в
          конфигураторе: дерево устройств, слоты под шины и привязка KRL-программы к
          конкретному манипулятору.
        </p>
      </motion.div>
    </ModuleWrapper>
  );
}
