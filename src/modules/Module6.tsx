'use client';

// Module 6 — Безопасность робота: стандарты ISO 10218-1/-2:2025,
// EN ISO 13849-1, категории остановок (Cat 0/1/2 по EN 60204-1),
// аппаратные средства (e-stop, enabling switch, safety-board ESC),
// программный пакет KUKA SafeOperation (зональный мониторинг,
// SIL 3 / PLe) и биомеханические лимиты для cobot (LBR iiwa).

import ModuleWrapper, { fadeInItem } from '@/components/ModuleWrapper';
import Quiz from '@/components/Quiz';
import DragDrop from '@/components/DragDrop';
import ScenarioCard from '@/components/ScenarioCard';
import Takeaways from '@/components/Takeaways';
import { motion } from 'framer-motion';

export default function Module6() {
  return (
    <ModuleWrapper
      moduleIndex={6}
      title="Безопасность"
      subtitle="Чтобы робот никого не ударил"
      readingList={[
        { title: 'ISO 10218-1:2025 — Industrial robots safety', url: 'https://www.iso.org/standard/73933.html' },
        {
          title: 'KUKA SafeOperation — product page',
          url: 'https://www.kuka.com/en-us/products/robotics-systems/software/hub-technologies/kuka_safeoperation',
        },
        { title: 'EN ISO 13849-1 — Performance Level', url: 'https://www.iso.org/standard/73481.html' },
      ]}
    >
      {/* Введение */}
      <motion.div variants={fadeInItem} className="prose prose-invert max-w-none mb-10">
        <p className="text-muted-foreground leading-relaxed">
          Безопасность промышленного робота &mdash; это не одна красная кнопка, а целая
          пирамида: <strong className="text-foreground">международные стандарты</strong> ISO,
          поверх которых строятся <strong className="text-foreground">аппаратные средства
          </strong> (e-stop, enabling switch, safety-board), а сверху &mdash;{' '}
          <strong className="text-foreground">программная конфигурация</strong> в пакете
          SafeOperation. Без всех трёх уровней робот не получит CE-маркировку и не сможет
          легально работать в ЕС.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-4">
          Ниже разберём ключевые стандарты (ISO 10218, ISO 13849, EN 60204), категории
          остановок, специфику cobot (биомеханические лимиты) и то, как KUKA SafeOperation
          превращает геометрию ячейки в сертифицированную safety-функцию.
        </p>
      </motion.div>

      {/* Теория 1: ISO 10218 */}
      <motion.div variants={fadeInItem} className="prose prose-invert max-w-none mb-10">
        <h2 className="text-xl font-semibold mb-4">ISO 10218-1 / -2:2025</h2>
        <p className="text-muted-foreground leading-relaxed">
          <strong className="text-foreground">ISO 10218</strong> &mdash; глобальный стандарт
          безопасности промышленных роботов. Состоит из двух частей:
        </p>
        <ul className="text-muted-foreground leading-relaxed mt-3 space-y-2 list-disc pl-5">
          <li>
            <strong className="text-foreground">Часть 1</strong> &mdash; требования к самому
            роботу. Адресована <em>производителю</em> (KUKA, FANUC, ABB).
          </li>
          <li>
            <strong className="text-foreground">Часть 2</strong> &mdash; требования к
            робототехнической ячейке целиком. Адресована <em>интегратору</em>, который
            собирает линию у заказчика.
          </li>
        </ul>
        <p className="text-muted-foreground leading-relaxed mt-4">
          В <strong className="text-foreground">2025&nbsp;году</strong> обе части переизданы
          и поглотили большую часть{' '}
          <strong className="text-foreground">ISO/TS 15066</strong> &mdash; технической
          спецификации 2016&nbsp;года, которая отдельно описывала коллаборативные роботы
          (cobot). Теперь биомеханические лимиты и требования к cobot живут прямо в
          ISO 10218-1:2025. Соответствие этому стандарту обязательно для CE-маркировки в
          ЕС.
        </p>
      </motion.div>

      {/* Quiz — сразу после блока «ISO 10218-1 / -2:2025» */}
      <motion.div variants={fadeInItem}>
        <Quiz
          question="Что произошло с ISO/TS 15066 в 2025 году?"
          options={[
            {
              text: 'Он отменён без замены',
              explanation:
                'Биомеханические требования к cobot слишком важны, чтобы их «отменить». Они только переехали в другой документ.',
            },
            {
              text: 'Его требования к коллаборативным роботам интегрированы в новую редакцию ISO 10218-1:2025',
              correct: true,
              explanation:
                'В 2025 ISO 10218-1/-2 переизданы и поглотили большую часть ISO/TS 15066. Теперь cobot-требования живут в одном документе.',
            },
            {
              text: 'Преобразован в ISO 10218-3',
              explanation:
                'ISO 10218-3 не существует. Стандарт состоит из двух частей: -1 (для производителя) и -2 (для интегратора).',
            },
            {
              text: 'Стал частью ISO 13849-2',
              explanation:
                'ISO 13849 — про функциональную безопасность систем управления (Performance Level), а не про cobot-биомеханику. Содержательно эти документы не пересекаются.',
            },
          ]}
        />
      </motion.div>

      {/* Теория 2: ISO 13849 */}
      <motion.div variants={fadeInItem} className="prose prose-invert max-w-none mb-10">
        <h2 className="text-xl font-semibold mb-4">EN ISO 13849-1 &mdash; функциональная безопасность</h2>
        <p className="text-muted-foreground leading-relaxed">
          <strong className="text-foreground">EN ISO 13849-1</strong> описывает, как
          проектировать safety-функции систем управления. Ключевые понятия:
        </p>
        <ul className="text-muted-foreground leading-relaxed mt-3 space-y-2 list-disc pl-5">
          <li>
            <strong className="text-foreground">Performance Level (PL)</strong> &mdash;
            шкала надёжности safety-функции от <em>a</em> (низший) до <em>e</em> (высший).
            Большинство safety-функций робота требуют{' '}
            <strong className="text-foreground">PLd</strong> или{' '}
            <strong className="text-foreground">PLe</strong>.
          </li>
          <li>
            <strong className="text-foreground">Categories (Cat 1&ndash;4)</strong> &mdash;
            архитектурные требования: одноканальная, двухканальная, с диагностикой и т.д.
            Для KUKA типично <strong className="text-foreground">Cat 3</strong> (двухканальная
            с частичной диагностикой) или <strong className="text-foreground">Cat 4</strong>
            {' '}(двухканальная с полной диагностикой).
          </li>
        </ul>
        <p className="text-muted-foreground leading-relaxed mt-4">
          Safety-board <strong className="text-foreground">ESC</strong> в шкафу KRC4/KRC5
          сертифицирован по <strong className="text-foreground">SIL&nbsp;3 / PLe</strong>{' '}
          &mdash; этого хватает для большинства промышленных задач.
        </p>
      </motion.div>

      {/* Теория 3: категории остановок */}
      <motion.div variants={fadeInItem} className="prose prose-invert max-w-none mb-10">
        <h2 className="text-xl font-semibold mb-4">Категории остановок (EN 60204-1)</h2>
        <p className="text-muted-foreground leading-relaxed">
          Сами способы остановки робота описаны не в ISO, а в электротехническом стандарте{' '}
          <strong className="text-foreground">EN 60204-1</strong> (на него ссылается ISO
          10218). Три категории:
        </p>
        <ul className="text-muted-foreground leading-relaxed mt-3 space-y-2 list-disc pl-5">
          <li>
            <strong className="text-foreground">Cat 0</strong> &mdash; немедленное снятие
            питания приводов; механический тормоз срабатывает уже после. Самый жёсткий и
            самый быстрый stop, но возможен выбег по инерции.
          </li>
          <li>
            <strong className="text-foreground">Cat 1</strong> &mdash; управляемая остановка:
            привод активно тормозит до полной остановки, питание сохранено, и только{' '}
            <em>после</em> остановки оно снимается. Безопаснее Cat 0 для тяжёлых payload.
          </li>
          <li>
            <strong className="text-foreground">Cat 2</strong> &mdash; управляемая остановка{' '}
            <em>без</em> снятия питания: приводы остаются под напряжением.{' '}
            <strong className="text-foreground">Для emergency stop</strong> (E-stop) Cat 2{' '}
            <em>не разрешён</em> по EN&nbsp;ISO&nbsp;13850 &mdash; обязательны Cat 0 или Cat 1.
            Как обычная operational-остановка (например, по концевику) Cat 2 допустим.
          </li>
        </ul>
      </motion.div>

      {/* DragDrop — сразу после блока «Категории остановок (EN 60204-1)» */}
      <motion.div variants={fadeInItem}>
        <DragDrop
          instruction="Сопоставьте категорию остановки с её описанием"
          items={[
            { id: 'cat0', text: 'Немедленное снятие питания приводов; тормоз срабатывает после' },
            { id: 'cat1', text: 'Управляемая остановка с сохранением питания до полной остановки, затем снятие' },
            { id: 'cat2', text: 'Управляемая остановка без снятия питания (приводы остаются под напряжением)' },
          ]}
          zones={[
            { id: 'zCat0', label: 'Cat 0', acceptIds: ['cat0'] },
            { id: 'zCat1', label: 'Cat 1', acceptIds: ['cat1'] },
            { id: 'zCat2', label: 'Cat 2', acceptIds: ['cat2'] },
          ]}
        />
      </motion.div>

      {/* Теория 4: SafeOperation */}
      <motion.div variants={fadeInItem} className="prose prose-invert max-w-none mb-10">
        <h2 className="text-xl font-semibold mb-4">KUKA SafeOperation</h2>
        <p className="text-muted-foreground leading-relaxed">
          <strong className="text-foreground">SafeOperation</strong> &mdash; программная
          опция KUKA, которая превращает геометрию ячейки в сертифицированную safety-функцию.
          В <strong className="text-foreground">WorkVisual</strong> ты задаёшь safe-зоны
          (кубы, цилиндры, произвольные полигоны), а контроллер во время работы постоянно
          мониторит, что TCP не выходит за их границы. Если выйдет &mdash; немедленно stop.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-4">Что входит в пакет:</p>
        <ul className="text-muted-foreground leading-relaxed mt-3 space-y-2 list-disc pl-5">
          <li>
            <strong className="text-foreground">Safe zones</strong> &mdash; до 16
            конфигурируемых зон, каждая с независимым правилом (запретная / safe).
          </li>
          <li>
            <strong className="text-foreground">Safe Range Monitoring</strong> &mdash;
            мониторинг положения отдельных осей (например, A1 не должен выходить за
            ±90&deg;).
          </li>
          <li>
            <strong className="text-foreground">Safe Velocity</strong> &mdash; ограничение
            скорости TCP в определённых зонах.
          </li>
          <li>
            <strong className="text-foreground">Safe Tool</strong> &mdash; учёт геометрии
            конкретного инструмента (захват, сварочная горелка) при расчёте границ.
          </li>
        </ul>
        <p className="text-muted-foreground leading-relaxed mt-4">
          Весь пакет сертифицирован по{' '}
          <strong className="text-foreground">SIL&nbsp;3 / PLe</strong>, то есть может
          заменять часть физических ограждений (light curtains, защитные двери).
        </p>
      </motion.div>

      {/* Теория 5: Cobot-лимиты */}
      <motion.div variants={fadeInItem} className="prose prose-invert max-w-none mb-10">
        <h2 className="text-xl font-semibold mb-4">Cobot-лимиты (биомеханика)</h2>
        <p className="text-muted-foreground leading-relaxed">
          Для коллаборативных роботов одних только зон мало &mdash; они работают рядом с
          человеком и могут с ним соприкасаться. <strong className="text-foreground">
          ISO/TS 15066</strong> (теперь интегрирован в ISO 10218-1:2025) задаёт
          биомеханические лимиты: максимальные сила и давление контакта для разных частей
          тела.
        </p>
        <ul className="text-muted-foreground leading-relaxed mt-3 space-y-2 list-disc pl-5">
          <li>
            <strong className="text-foreground">Лоб</strong> &mdash; ~130&nbsp;Н transient
            (кратковременный контакт).
          </li>
          <li>
            <strong className="text-foreground">Грудь</strong> &mdash; ~220&nbsp;Н transient.
          </li>
          <li>
            <strong className="text-foreground">Плечо</strong> &mdash; ~150&nbsp;Н transient,
            но в quasi-static режиме лимит ниже (~65&nbsp;Н).
          </li>
        </ul>
        <p className="text-muted-foreground leading-relaxed mt-4">
          У cobot <strong className="text-foreground">LBR iiwa</strong> (KUKA) в каждом из
          семи суставов встроены{' '}
          <strong className="text-foreground">силомоментные сенсоры</strong>: робот видит
          контакт ещё до того, как сила превысит лимит, и переходит в protective stop. У
          обычного промышленного KR&nbsp;QUANTEC такой защиты нет &mdash; он опирается на
          safe zones из SafeOperation.
        </p>
      </motion.div>

      {/* SVG-схема: safe zones + категории stop */}
      <motion.div variants={fadeInItem} className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Схема: safe-зоны и категории остановок</h2>
        <div className="rounded-xl border border-border/50 bg-muted/30 p-4">
          <svg
            viewBox="0 0 480 300"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
            role="img"
            aria-label="Робот в центре, вокруг — три safe-зоны: зелёная (safe), жёлтая (reduced speed), красная (stop). Сверху — таблица категорий Cat 0/1/2."
          >
            {/* Заголовок и таблица Cat 0/1/2 */}
            <text x="240" y="22" textAnchor="middle" fontSize="11" fill="var(--muted)" fontWeight="600">
              Категории остановок (EN 60204-1)
            </text>

            {/* Cat 0 */}
            <rect x="40" y="32" width="120" height="38" rx="6" fill="var(--accent-light)" stroke="var(--accent)" strokeWidth="1" />
            <text x="100" y="48" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">Cat 0</text>
            <text x="100" y="62" textAnchor="middle" fontSize="9" fill="var(--muted)">power off → brake</text>

            {/* Cat 1 */}
            <rect x="180" y="32" width="120" height="38" rx="6" fill="var(--accent-light)" stroke="var(--accent)" strokeWidth="1" />
            <text x="240" y="48" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">Cat 1</text>
            <text x="240" y="62" textAnchor="middle" fontSize="9" fill="var(--muted)">stop → power off</text>

            {/* Cat 2 */}
            <rect x="320" y="32" width="120" height="38" rx="6" fill="var(--accent-light)" stroke="var(--accent)" strokeWidth="1" />
            <text x="380" y="48" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">Cat 2</text>
            <text x="380" y="62" textAnchor="middle" fontSize="9" fill="var(--muted)">stop, power on</text>

            {/* Зоны: red — внешняя (stop) */}
            <circle cx="240" cy="190" r="100" fill="#ef4444" fillOpacity="0.12" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="4 3" />
            <text x="240" y="100" textAnchor="middle" fontSize="10" fill="#ef4444" fontWeight="600">stop zone</text>

            {/* Зоны: yellow — reduced speed */}
            <circle cx="240" cy="190" r="70" fill="#f59e0b" fillOpacity="0.14" stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="4 3" />
            <text x="240" y="128" textAnchor="middle" fontSize="10" fill="#f59e0b" fontWeight="600">reduced speed</text>

            {/* Зоны: green — safe operation */}
            <circle cx="240" cy="190" r="42" fill="#22c55e" fillOpacity="0.16" stroke="#22c55e" strokeWidth="1.2" strokeDasharray="4 3" />
            <text x="240" y="156" textAnchor="middle" fontSize="10" fill="#22c55e" fontWeight="600">safe op</text>

            {/* Робот в центре — стилизованная фигура */}
            <rect x="232" y="192" width="16" height="34" rx="2" fill="var(--accent)" />
            <rect x="220" y="180" width="40" height="14" rx="2" fill="var(--accent)" />
            <circle cx="240" cy="174" r="6" fill="var(--accent)" />
            <line x1="240" y1="190" x2="218" y2="208" stroke="var(--accent)" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="218" y1="208" x2="206" y2="222" stroke="var(--accent)" strokeWidth="2.2" strokeLinecap="round" />

            {/* Пояснения справа */}
            <line x1="282" y1="190" x2="320" y2="190" stroke="#22c55e" strokeWidth="1" />
            <text x="324" y="194" fontSize="9" fill="var(--muted)">safe op — full speed</text>

            <line x1="310" y1="170" x2="320" y2="170" stroke="#f59e0b" strokeWidth="1" />
            <text x="324" y="174" fontSize="9" fill="var(--muted)">reduced — &lt; 250 mm/s</text>

            <line x1="340" y1="150" x2="350" y2="150" stroke="#ef4444" strokeWidth="1" />
            <text x="354" y="154" fontSize="9" fill="var(--muted)">stop — Cat 1</text>

            {/* Пояснения слева */}
            <text x="20" y="194" fontSize="9" fill="var(--muted)">TCP</text>
            <line x1="40" y1="190" x2="200" y2="190" stroke="var(--muted)" strokeWidth="0.6" strokeDasharray="2 2" />

            <text x="240" y="288" textAnchor="middle" fontSize="9" fill="var(--muted)">
              SafeOperation мониторит TCP относительно зон в реальном времени
            </text>
          </svg>
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Зелёная зона &mdash; полная скорость; жёлтая &mdash; ограничение до 250&nbsp;мм/с
          (T1-режим); красная &mdash; немедленный Cat&nbsp;1 stop.
        </p>
      </motion.div>

      <Takeaways
        items={[
          'Безопасность робота — это пирамида: ISO 10218 (стандарт) + железо (e-stop, enabling, ESC) + софт (SafeOperation).',
          'ISO 10218-1/-2:2025 поглотил ISO/TS 15066 — биомеханические требования к cobot теперь в одном документе.',
          'Категории остановок (EN 60204-1): Cat 0 (немедленное снятие питания), Cat 1 (управляемое торможение, потом снятие), Cat 2 (без снятия — недопустимо для emergency stop).',
          'У LBR iiwa встроены torque-сенсоры в каждом суставе; у промышленных KR — защита через safe zones SafeOperation.',
        ]}
      />

      {/* ScenarioCard — финальный apply, привязан к cobot-биомеханике */}
      <motion.div variants={fadeInItem}>
        <ScenarioCard
          scenario="Cobot LBR iiwa задел человека за плечо при выполнении pick-and-place. Какой stop сработал?"
          context="LBR iiwa — 7-осевой коллаборативный робот KUKA с силомоментными сенсорами в каждом суставе."
          options={[
            {
              text: 'A) Cat 0 — жёсткое снятие питания приводов',
              outcome:
                'Не лучший вариант. Жёсткое снятие питания опасно для cobot: риск падения payload, тормоз срабатывает с задержкой. Cat 0 в cobot обычно не первая реакция.',
              score: 0,
            },
            {
              text: 'B) Joint torque-сенсоры в каждом суставе детектировали внешнюю силу выше порога (~65 Н quasi-static / ~150 Н transient для плеча по ISO/TS 15066), сработал protective stop (Safety-Stop 1, аналог Cat 1)',
              outcome:
                'Верно. LBR iiwa имеет torque-сенсоры в каждом из семи суставов; контроллер по их показаниям вычисляет внешнюю силу контакта. При превышении сконфигурированного порога робот переходит в protective stop. Это специфика cobot — у промышленного KR QUANTEC такой защиты нет, он опирается на safe zones из SafeOperation.',
              score: 2,
            },
            {
              text: 'C) Cat 2 — приводы остаются под напряжением',
              outcome:
                'Не подходит. Cat 2 не разрешён как primary stop в новых редакциях ISO 10218 / EN 60204-1: приводы под током могут «дёрнуть» руку, что опасно при контакте с человеком.',
              score: 0,
            },
            {
              text: 'D) Cat 0, и больше ничего',
              outcome:
                'Слишком грубо. Cat 0 без управляемого торможения для cobot не подходит — payload по инерции продолжит движение. Нужна именно комбинация detection + Cat 1.',
              score: 0,
            },
          ]}
        />
      </motion.div>

      {/* Закрывающий абзац */}
      <motion.div variants={fadeInItem} className="prose prose-invert max-w-none mb-4">
        <p className="text-muted-foreground leading-relaxed">
          Безопасность робота &mdash; это не один стандарт, а связка ISO 10218 (требования
          к роботу), ISO 13849 (как проектировать safety-функции), EN 60204 (категории
          остановок) и аппаратно-программная реализация (ESC&nbsp;board + SafeOperation +
          силомоментные сенсоры на cobot). В следующем модуле перейдём к интеграции этой
          связки с PLC-системой завода.
        </p>
      </motion.div>
    </ModuleWrapper>
  );
}
