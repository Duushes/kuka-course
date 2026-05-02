'use client';

// Module 5 — WorkVisual и SmartPAD: инженерный фреймворк KUKA для
// проектирования ячейки и пульт оператора, на котором программа
// крутится. От создания project до обучения точек.

import ModuleWrapper, { fadeInItem } from '@/components/ModuleWrapper';
import Quiz from '@/components/Quiz';
import DragDrop from '@/components/DragDrop';
import ScenarioCard from '@/components/ScenarioCard';
import Takeaways from '@/components/Takeaways';
import { motion } from 'framer-motion';

export default function Module5() {
  return (
    <ModuleWrapper
      moduleIndex={5}
      title="WorkVisual и SmartPAD"
      subtitle="Создаём проект и обучаем точки"
      readingList={[
        {
          title: 'KUKA.WorkVisual product page',
          url: 'https://www.kuka.com/en-de/products/robot-systems/software/system-software/kuka_systemsoftware/kuka_work-visual',
        },
        { title: 'KUKA Xpert — KSS / SmartPAD documentation', url: 'https://xpert.kuka.com/' },
      ]}
    >
      {/* Введение */}
      <motion.div variants={fadeInItem} className="prose prose-invert max-w-none mb-10">
        <p className="text-muted-foreground leading-relaxed">
          У инженера-интегратора KUKA два главных инструмента.{' '}
          <strong className="text-foreground">WorkVisual</strong> &mdash; это
          инженерный фреймворк, в нём конфигурируется ячейка: какие устройства
          подключены, по каким шинам, как сигналы маппятся на адреса.{' '}
          <strong className="text-foreground">SmartPAD</strong> &mdash; пульт,
          на котором программа в итоге крутится: ключ режимов, JOG-кнопки,
          обучение точек, запуск и стоп.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-4">
          В этом модуле разбираем, как из пустого проекта в WorkVisual получить
          активный контроллер с настроенной шиной и программой; и какие режимы
          SmartPAD'а используются на разных этапах &mdash; от ручного обучения
          до автоматической эксплуатации в линии.
        </p>
      </motion.div>

      {/* Теория 1: WorkVisual — что это */}
      <motion.div variants={fadeInItem} className="prose prose-invert max-w-none mb-10">
        <h2 className="text-xl font-semibold mb-4">WorkVisual: что это</h2>
        <p className="text-muted-foreground leading-relaxed">
          <strong className="text-foreground">WorkVisual</strong> &mdash;
          Eclipse-based IDE от KUKA для проектирования роботизированных ячеек.
          Скачивается с портала my.kuka бесплатно после регистрации, ставится
          на обычный Windows-PC инженера. По сути это набор плагинов поверх
          Eclipse, заточенных под KRC.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-4">
          Внутри WorkVisual инженер собирает <strong className="text-foreground">project</strong>
          {' '}&mdash; XML-структуру, в которой описаны все устройства ячейки,
          полевые шины, маппинг сигналов и привязка к конкретному контроллеру.
          Когда project готов, его <strong className="text-foreground">transferring</strong>{' '}
          (деплоят) на KRC по TCP/IP через KLI-кабель, и после reboot контроллер
          работает по новой конфигурации.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-4">
          Версии важны для совместимости:{' '}
          <strong className="text-foreground">WorkVisual&nbsp;5.x</strong> работает
          только с KRC4. <strong className="text-foreground">WorkVisual&nbsp;6.x</strong>{' '}
          &mdash; и с KRC4 (KSS&nbsp;8.5 и новее), и с KRC5. На сегодня актуальная
          ветка &mdash; 6.x; используйте свежую версию WV под целевой KSS.
        </p>
      </motion.div>

      {/* Теория 2: пять шагов создания проекта */}
      <motion.div variants={fadeInItem} className="prose prose-invert max-w-none mb-10">
        <h2 className="text-xl font-semibold mb-4">Создание проекта: пять шагов</h2>
        <p className="text-muted-foreground leading-relaxed">
          Канонический workflow инженера в WorkVisual выглядит так:
        </p>
        <ol className="text-muted-foreground leading-relaxed mt-3 space-y-2 list-decimal pl-5">
          <li>
            <strong className="text-foreground">New project</strong> &mdash;
            создаём пустой проект, задаём имя, путь, описание.
          </li>
          <li>
            <strong className="text-foreground">Add controller</strong> &mdash;
            добавляем целевой контроллер (KRC4 или KRC5) и версию KSS. Каталог
            устройств подгружается под выбранную платформу.
          </li>
          <li>
            <strong className="text-foreground">Configure fieldbus</strong>
            {' '}&mdash; выбираем полевую шину: PROFINET, EtherCAT, EtherNet/IP,
            ProfiBus, DeviceNet или VARANBUS. Конфигуратор раскладывает её по
            слотам контроллера.
          </li>
          <li>
            <strong className="text-foreground">IO mapping</strong> &mdash;
            привязываем символьные имена сигналов (например,{' '}
            <code className="text-foreground">dlBoxReady</code>) к байтам и битам
            на шине. Программе KRL они потом доступны через{' '}
            <code className="text-foreground">$IN[...]</code> и{' '}
            <code className="text-foreground">$OUT[...]</code>.
          </li>
          <li>
            <strong className="text-foreground">Activate project</strong>{' '}
            &mdash; деплоим project на KRC. После reboot контроллер активирует
            новую конфигурацию.
          </li>
        </ol>
      </motion.div>

      {/* Теория 3: режимы SmartPAD */}
      <motion.div variants={fadeInItem} className="prose prose-invert max-w-none mb-10">
        <h2 className="text-xl font-semibold mb-4">Режимы SmartPAD: ключ-переключатель</h2>
        <p className="text-muted-foreground leading-relaxed">
          На SmartPAD'е есть аппаратный ключ, который выбирает режим работы
          контроллера. От режима зависит, кто управляет роботом и с какой
          скоростью разрешено движение:
        </p>
        <ul className="text-muted-foreground leading-relaxed mt-3 space-y-2 list-disc pl-5">
          <li>
            <strong className="text-foreground">T1 &mdash; Manual reduced velocity</strong>:
            ручной режим с ограничением скорости TCP до 250&nbsp;мм/с. Подача
            через JOG-кнопки. Обязателен для обучения точек по нормам
            безопасности &mdash; человек может находиться рядом.
          </li>
          <li>
            <strong className="text-foreground">T2 &mdash; Manual high velocity</strong>:
            ручной режим на полной программной скорости. Используется для
            визуальной проверки траектории. На современных установках в ЕС T2
            часто <strong className="text-foreground">отключают на этапе ввода
            в эксплуатацию</strong> по требованиям ISO&nbsp;10218-1:2025. Если T2
            активен &mdash; защитный барьер замкнут, оператор находится в безопасной
            зоне снаружи ограждения.
          </li>
          <li>
            <strong className="text-foreground">AUT &mdash; Automatic</strong>:
            автоматический режим, программа стартует с SmartPAD'а или из Cell
            Programming. Защитные барьеры замкнуты, скорость полная.
          </li>
          <li>
            <strong className="text-foreground">EXT &mdash; External</strong>:
            программа стартует по сигналу из PLC/SCADA через DI. Используется в
            полностью автоматизированных линиях, где роботом дирижирует внешний
            контроллер.
          </li>
        </ul>
      </motion.div>

      {/* Теория 4: JOG и обучение точек */}
      <motion.div variants={fadeInItem} className="prose prose-invert max-w-none mb-10">
        <h2 className="text-xl font-semibold mb-4">JOG и обучение точек</h2>
        <p className="text-muted-foreground leading-relaxed">
          <strong className="text-foreground">JOG</strong> &mdash; ручное
          перемещение робота через кнопки на SmartPAD'е. Доступно в режимах T1
          и T2 при удержании enabling switch в среднем положении. Подача
          возможна в двух базовых режимах:
        </p>
        <ul className="text-muted-foreground leading-relaxed mt-3 space-y-2 list-disc pl-5">
          <li>
            <strong className="text-foreground">Axis-mode</strong> &mdash;
            движение по отдельным осям A1&ndash;A6, каждая ось вращается
            независимо.
          </li>
          <li>
            <strong className="text-foreground">WORLD / BASE / TOOL</strong>{' '}
            &mdash; движение по координатам выбранной системы: WORLD (мировая),
            BASE (заготовки) или TOOL (инструмента).
          </li>
        </ul>
        <p className="text-muted-foreground leading-relaxed mt-4">
          Когда оператор довёл робота до желаемой позиции, он жмёт{' '}
          <strong className="text-foreground">Touch&nbsp;Up</strong>: KSS
          сохраняет текущие координаты в файл с расширением{' '}
          <code className="text-foreground">.dat</code>, привязанный к программе.
          Это и есть обученная точка &mdash; в KRL-программе она будет
          называться, например, <code className="text-foreground">XHome</code>{' '}
          или <code className="text-foreground">P1</code>.
        </p>
      </motion.div>

      {/* SVG-схема: project tree */}
      <motion.div variants={fadeInItem} className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Схема: project tree в WorkVisual</h2>
        <div className="rounded-xl border border-border/50 bg-muted/30 p-4">
          <svg
            viewBox="0 0 480 280"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
            role="img"
            aria-label="Иерархическое дерево проекта в WorkVisual: Project, Controller KRC5_001, Hardware, Fieldbus PROFINET, Devices Robot R1 и Vision V1, IO Mapping"
          >
            {/* Уровень 1: Project */}
            <rect x="10" y="15" width="120" height="30" rx="6" fill="var(--accent-light)" stroke="var(--accent)" strokeWidth="1.5" />
            <text x="70" y="35" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">
              Project
            </text>

            {/* Скобка от Project к Controller */}
            <path d="M 70 45 L 70 70 L 110 70" stroke="var(--muted)" strokeWidth="1" fill="none" />

            {/* Уровень 2: Controller */}
            <rect x="110" y="55" width="160" height="30" rx="6" fill="var(--accent-light)" stroke="var(--accent)" strokeWidth="1.2" />
            <text x="190" y="75" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">
              Controller (KRC5_001)
            </text>

            {/* Скобка от Controller к Hardware */}
            <path d="M 170 85 L 170 110 L 210 110" stroke="var(--muted)" strokeWidth="1" fill="none" />

            {/* Уровень 3: Hardware */}
            <rect x="210" y="95" width="120" height="30" rx="6" fill="var(--accent-light)" stroke="var(--accent)" strokeWidth="1.2" />
            <text x="270" y="115" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">
              Hardware
            </text>

            {/* Скобка от Hardware к Fieldbus */}
            <path d="M 270 125 L 270 150 L 310 150" stroke="var(--muted)" strokeWidth="1" fill="none" />

            {/* Уровень 4: Fieldbus */}
            <rect x="310" y="135" width="160" height="30" rx="6" fill="var(--accent-light)" stroke="var(--accent)" strokeWidth="1.2" />
            <text x="390" y="155" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">
              Fieldbus (PROFINET)
            </text>

            {/* Скобка от Fieldbus к Devices */}
            <path d="M 390 165 L 390 190 L 350 190" stroke="var(--muted)" strokeWidth="1" fill="none" />

            {/* Уровень 5: Devices */}
            <rect x="200" y="175" width="150" height="30" rx="6" fill="var(--accent-light)" stroke="var(--accent)" strokeWidth="1.2" />
            <text x="275" y="195" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">
              Devices
            </text>

            {/* Подуровень Devices: Robot R1 / Vision V1 */}
            <path d="M 275 205 L 275 220 L 130 220" stroke="var(--muted)" strokeWidth="1" fill="none" />
            <rect x="50" y="215" width="100" height="22" rx="4" fill="none" stroke="var(--muted)" strokeWidth="1" strokeDasharray="3 2" />
            <text x="100" y="230" textAnchor="middle" fontSize="10" fill="var(--muted)">
              Robot R1
            </text>

            <path d="M 275 205 L 275 220 L 360 220" stroke="var(--muted)" strokeWidth="1" fill="none" />
            <rect x="170" y="215" width="100" height="22" rx="4" fill="none" stroke="var(--muted)" strokeWidth="1" strokeDasharray="3 2" />
            <text x="220" y="230" textAnchor="middle" fontSize="10" fill="var(--muted)">
              Vision V1
            </text>

            {/* Скобка от Controller к IO Mapping (отдельная ветка) */}
            <path d="M 170 85 L 170 255 L 210 255" stroke="var(--muted)" strokeWidth="1" fill="none" strokeDasharray="3 2" />

            {/* IO Mapping */}
            <rect x="210" y="240" width="140" height="30" rx="6" fill="var(--accent-light)" stroke="var(--accent)" strokeWidth="1.2" />
            <text x="280" y="260" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">
              IO Mapping
            </text>
          </svg>
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Иерархия project tree: контроллер содержит hardware и io mapping, в
          hardware лежит fieldbus с подключёнными devices.
        </p>
      </motion.div>

      <Takeaways
        items={[
          'Workflow в WorkVisual: New project → Add controller → Configure fieldbus → IO mapping → Activate.',
          'WorkVisual 6.x работает с KRC4 (KSS 8.5+) и KRC5; 5.x — только с KRC4.',
          'SmartPAD — ключ режимов (T1 / T2 / AUT / EXT) + enabling switch. Без удержания enabling в среднем положении T1/T2 не двигают робота.',
          'Touch Up в JOG-режиме автоматически добавляет DECL POS в .dat.',
        ]}
      />

      {/* Quiz */}
      <motion.div variants={fadeInItem}>
        <Quiz
          question="Какой полевой стандарт НЕ поддерживается WorkVisual для IO-mapping штатно?"
          options={[
            {
              text: 'PROFINET',
              explanation:
                'PROFINET — основной выбор Siemens-окружения. WorkVisual поддерживает штатно.',
            },
            {
              text: 'EtherCAT',
              explanation:
                'EtherCAT — стандарт Beckhoff и многих робототехнических ячеек. WorkVisual поддерживает штатно.',
            },
            {
              text: 'EtherNet/IP',
              explanation:
                'EtherNet/IP — стандарт Allen-Bradley / Rockwell. WorkVisual поддерживает штатно.',
            },
            {
              text: 'Modbus TCP',
              correct: true,
              explanation:
                'WorkVisual штатно поддерживает PROFINET, PROFIBUS, EtherCAT, EtherNet/IP, DeviceNet. Для Modbus TCP нужен отдельный технологический пакет.',
            },
          ]}
        />
      </motion.div>

      {/* DragDrop: пять шагов создания проекта */}
      <motion.div variants={fadeInItem}>
        <DragDrop
          instruction="Расположите шаги создания проекта в WorkVisual в правильном порядке"
          items={[
            { id: 'new', text: 'New project' },
            { id: 'controller', text: 'Add controller (KRC4/KRC5)' },
            { id: 'fieldbus', text: 'Configure fieldbus' },
            { id: 'iomap', text: 'IO mapping (символы ↔ адреса)' },
            { id: 'activate', text: 'Activate project на KRC' },
          ]}
          zones={[
            { id: 's1', label: 'Шаг 1', acceptIds: ['new'] },
            { id: 's2', label: 'Шаг 2', acceptIds: ['controller'] },
            { id: 's3', label: 'Шаг 3', acceptIds: ['fieldbus'] },
            { id: 's4', label: 'Шаг 4', acceptIds: ['iomap'] },
            { id: 's5', label: 'Шаг 5', acceptIds: ['activate'] },
          ]}
        />
      </motion.div>

      {/* ScenarioCard: робот не отвечает на JOG */}
      <motion.div variants={fadeInItem}>
        <ScenarioCard
          scenario="Робот не отвечает на JOG в режиме T1. Что проверять первым?"
          context="Контроллер запитан, SmartPAD активен, программа загружена. Оператор жмёт JOG-кнопку — движения нет."
          options={[
            {
              text: 'Включён ли enabling switch (3-position dead-man) на SmartPAD’е',
              outcome:
                'Верно. Без удержания enabling switch в среднем положении KSS блокирует движения в T1/T2. Самая частая причина.',
              score: 3,
            },
            {
              text: 'Перепрошить KSS',
              outcome:
                'Слишком радикально, на этом этапе диагностики неуместно.',
              score: 0,
            },
            {
              text: 'Перезапустить контроллер',
              outcome: 'Поможет, но не диагностирует проблему.',
              score: 1,
            },
            {
              text: 'Проверить кабель PROFINET',
              outcome:
                'JOG не зависит от внешней шины — он локальный.',
              score: 0,
            },
          ]}
        />
      </motion.div>

      {/* Закрывающий абзац */}
      <motion.div variants={fadeInItem} className="prose prose-invert max-w-none mb-4">
        <p className="text-muted-foreground leading-relaxed">
          Теперь у нас есть проект в WorkVisual, активированный на KRC, и
          понимание режимов SmartPAD'а. В следующем модуле подключим к этой
          ячейке внешний мир: PLC по PROFINET, Vision-систему и обмен сигналами
          через IO mapping.
        </p>
      </motion.div>
    </ModuleWrapper>
  );
}
