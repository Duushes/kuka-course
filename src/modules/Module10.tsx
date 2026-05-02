'use client';

// Module 10 — Финальный экзамен. 15 вопросов с выбором из вариантов
// (multiple-choice) из KUKA_Course_Catalog.md §2.4.
// Q1–Q10 — оригинальные. Q11–Q15 — переформатированы из открытых вопросов в формат
// с выбором, эталонный ответ остаётся правильным, дистракторы строятся на
// типичных ошибках. Конфетти при результате 13/15 (87%+).

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import nextDynamic from 'next/dynamic';
import { useCourse } from '@/context/CourseContext';

const Confetti = nextDynamic(() => import('@/components/Confetti'), { ssr: false });

interface ExamQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const questions: ExamQuestion[] = [
  {
    question: '1. Какая из перечисленных серий роботов KUKA относится к коллаборативным роботам (cobot)?',
    options: [
      'KR QUANTEC',
      'KR CYBERTECH',
      'LBR iiwa',
      'KR AGILUS',
    ],
    correctIndex: 2,
    explanation:
      'LBR iiwa — единственный коллаборативный робот в перечне; остальные — классические индустриальные манипуляторы. У LBR iiwa есть силомоментные датчики в каждом суставе.',
  },
  {
    question: '2. Чем KRC5 принципиально отличается от KRC4?',
    options: [
      'Поддерживает только KRL 1.x',
      'Поддерживает KSS 8.7+ и более компактный шкаф; общий стек KSS/VSS, программно совместим с KRC4',
      'Не поддерживает PROFINET',
      'Поддерживает только LBR iiwa',
    ],
    correctIndex: 1,
    explanation:
      'KRC5 — следующее поколение шкафа управления, программно совместим с KRC4 (KSS 8.7+). KPP и KSP объединены на одной плате, шкаф занимает примерно 50% объёма KRC4.',
  },
  {
    question: '3. Какая операция используется для калибровки TCP методом XYZ 4-Point?',
    options: [
      'Базу робота сдвигают в 4 разные точки',
      'Один и тот же физический наконечник инструмента подводят под четырьмя разными ориентациями к одной фиксированной точке в пространстве',
      'TCP вычисляется автоматически из CAD',
      'Робот выполняет 4 последовательных PTP-движения',
    ],
    correctIndex: 1,
    explanation:
      'XYZ 4-Point определяет XYZ-позицию TCP из четырёх измерений; ABC 2-Point — ориентацию. KSS решает переопределённую систему методом наименьших квадратов.',
  },
  {
    question: '4. Какая команда движения гарантирует прохождение через точку (без сглаживания) с линейной траекторией в декартовом пространстве?',
    options: [
      'PTP P1',
      'LIN P1',
      'LIN P1 C_DIS',
      'SPLINE',
    ],
    correctIndex: 1,
    explanation:
      'LIN P1 без флагов сглаживания проходит точно через P1; C_DIS включает сглаживание; PTP — траектория не линейная в декартовом пространстве.',
  },
  {
    question: '5. Заказчик требует подключить счётчик энергии по Modbus TCP к WorkVisual-проекту KRC5. Какое решение корректно?',
    options: [
      'Использовать встроенную поддержку Modbus TCP в WorkVisual',
      'Установить отдельный технологический пакет KUKA для Modbus TCP, либо передавать трафик через PLC, у которого есть и Modbus, и PROFINET',
      'Переделать счётчик энергии под PROFINET — иначе никак',
      'Modbus TCP в KUKA-ячейке невозможен в принципе',
    ],
    correctIndex: 1,
    explanation:
      'WorkVisual штатно поддерживает PROFINET, EtherCAT, EtherNet/IP, ProfiBus, DeviceNet — но не Modbus TCP. Решение: либо отдельный пакет (KUKA.EthernetIP/Modbus), либо шлюз через PLC: PLC принимает Modbus от счётчика энергии и передаёт значения на робот по PROFINET.',
  },
  {
    question: '6. Что произошло с ISO/TS 15066 в 2025 году?',
    options: [
      'Он отменён без замены',
      'Его требования к коллаборативным роботам интегрированы в новую редакцию ISO 10218-1:2025',
      'Преобразован в ISO 10218-3',
      'Стал частью ISO 13849-2',
    ],
    correctIndex: 1,
    explanation:
      'В 2025 ISO 10218-1/-2 переизданы и поглотили большую часть ISO/TS 15066. Биомеханические лимиты для коллаборативных роботов теперь живут прямо в ISO 10218-1:2025. ISO 13849 — про функциональную безопасность систем управления, к биомеханике не относится.',
  },
  {
    question: '7. Какой пакет KUKA позволяет программировать робота из PLC без написания KRL-программы?',
    options: [
      'PalletTech',
      'ArcTech',
      'mxAutomation',
      'VisionTech',
    ],
    correctIndex: 2,
    explanation:
      'mxAutomation предоставляет блоки FB для S7-1500 / 1200 / 300 / 400, программирование выполняется в TIA Portal. Робот в этом случае — ведомый, исполняет команды.',
  },
  {
    question: '8. Система машинного зрения обнаруживает деталь на конвейере и должна корректировать траекторию робота с задержкой не более 10 мс. Какой протокол выбрать?',
    options: [
      'EthernetKRL (EKI) — TCP-сокеты, простая настройка',
      'OPC UA — стандарт для интеграции с SCADA',
      'RSI (Robot Sensor Interface) — UDP-кадры каждые 4–12 мс',
      'CREAD/CWRITE — унаследованный канальный обмен',
    ],
    correctIndex: 2,
    explanation:
      'RSI — единственный протокол реального времени у KUKA с гарантированным циклом 4–12 мс, укладывается в требование 10 мс. EKI — асинхронный TCP с задержкой 50+ мс. OPC UA — секунды. CREAD/CWRITE — устаревший, не предсказуем по задержкам.',
  },
  {
    question: '9. На каком языке программируется LBR iiwa в Sunrise.Workbench?',
    options: [
      'KRL',
      'Java',
      'IEC 61131-3 ST',
      'Python',
    ],
    correctIndex: 1,
    explanation:
      'Sunrise.OS использует Java (Sunrise.Workbench на базе Eclipse с RoboticsAPI). KRL применяется для KRC4/KRC5, Sunrise — для LBR iiwa.',
  },
  {
    question: '10. Студенту нужно бесплатно потренироваться программировать KUKA дома, без доступа к реальному роботу. Какой инструмент выбрать?',
    options: [
      'Gazebo с URDF из ros-industrial/kuka_experimental — для проверки геометрии и интеграции в ROS',
      'Пробная версия KUKA.Sim 4 через my.kuka Marketplace — год бесплатно, поддерживает экспорт KRL',
      'V-REP / CoppeliaSim — общий симулятор без специфики KUKA',
      'KUKA.OfficeLite — единственный путь, виртуальный KRC',
    ],
    correctIndex: 1,
    explanation:
      'KUKA.Sim 4 — самый прямой путь: год бесплатно через my.kuka, родная среда KUKA, экспорт KRL на реальный контроллер. Gazebo и V-REP — общие симуляторы, не дают семантики KRL. KUKA.OfficeLite — это виртуальный KRC, продаётся отдельно (платно).',
  },
  {
    question: '11. Зачем в проекте вводится система координат BASE поверх WORLD?',
    options: [
      'BASE — это TCP инструмента, поверх WORLD ставится для удобства',
      'BASE заменяет WORLD при включении SafeOperation',
      'BASE задаётся для удобства программирования: положение и ориентация заготовки/палеты, относительно которого пишут координаты движений; калибруется методом 3-Point',
      'BASE — синоним ROBROOT и используется только при инсталляции',
    ],
    correctIndex: 2,
    explanation:
      'BASE — пользовательская система координат для удобства программирования. Привязывается к заготовке: при сдвиге детали достаточно перекалибровать BASE (3-Point: начало координат + точка на X + точка в плоскости XY), а не переписывать каждую точку программы.',
  },
  {
    question: '12. Дан фрагмент KRL. Что вызовет ошибку при запуске?\nDEF demo()\n  INI\n  PTP HOME\n  $VEL.CP = 0.3\n  PTP P1\n  LIN P2 C_DIS\n  LIN P3\nEND',
    options: [
      '$VEL.CP = 0.3 — неправильная единица измерения',
      'P1, P2, P3 не объявлены в .dat-файле и не обучены через SmartPAD',
      'C_DIS без последующего движения LIN/PTP вызывает критическую ошибку',
      'PTP HOME не зарезервированное имя, его нужно объявлять явно',
    ],
    correctIndex: 1,
    explanation:
      'P1, P2, P3 не объявлены в demo.dat (через DECL POS) и не обучены через SmartPAD — KSS не знает координат. $VEL.CP в м/с — нормально (0.3 м/с типичная декартова скорость). HOME — стандартная глобальная точка KUKA в \\$config.dat.',
  },
  {
    question: '13. Оператор в режиме T1 мягко отпускает выключатель разрешения движения (enabling switch), а не сжимает его в резкое сжатие до упора (panic-grip). Какая категория остановки сработает?',
    options: [
      'Cat 0 — немедленное снятие питания, тормоз срабатывает после',
      'Cat 1 — управляемая остановка с сохранением питания до полной остановки, затем снятие питания',
      'Cat 2 — управляемая остановка без снятия питания',
      'Никакая остановка не срабатывает, только предупреждение',
    ],
    correctIndex: 1,
    explanation:
      'При мягком отпускании выключателя разрешения движения срабатывает Cat 1: контроллер активно тормозит, потом снимает питание. При резком сжатии до упора (panic-grip) сработал бы Cat 0 (немедленное снятие). Cat 2 не разрешён по EN ISO 13850 как аварийная остановка.',
  },
  {
    question: '14. Минимальная архитектура связи KUKA-робота с внешним ПК через RSI: какие два потока обмена данными работают?',
    options: [
      'Один поток: ПК отправляет KRL-команды на KRC по TCP',
      'KRC циклически отправляет на ПК XML с положением и сенсорами; ПК отвечает в том же цикле XML с коррекциями (декартовы или осевые) — два встречных UDP-потока с периодом 4–12 мс',
      'ПК раз в секунду опрашивает KRC через OPC UA',
      'KRC отправляет в ПК через PROFINET, ПК передаёт по EtherCAT обратно',
    ],
    correctIndex: 1,
    explanation:
      'RSI поднимает на KRC объектную конфигурацию (XML) с UDP-соединением. Циклически (4–12 мс) KRC отправляет XML-кадр с положением и данными датчиков, ПК отвечает в том же цикле кадром с коррекциями (RKorr — декартовы или AKorr — осевые). Два встречных потока: KRC → ПК и ПК → KRC.',
  },
  {
    question: '15. Робот в режиме AUT останавливается с сообщением "KSS00276 Acknowledge messages" (сообщения с подтверждением). Какой алгоритм действий правильный?',
    options: [
      'Перепрошить KSS на свежую версию',
      'Перейти в T1 и попробовать снова — обычно помогает',
      'Прочитать список активных сообщений на SmartPAD, найти все сообщения с подтверждением, устранить корневые причины (защитный контур, периферия, калибровка), затем подтвердить через "Acknowledge all" ("Подтвердить всё"); если возвращается — поиск по коду в Xpert',
      'Игнорировать сообщение и нажать "Acknowledge all" сразу',
    ],
    correctIndex: 2,
    explanation:
      'Стандартный алгоритм диагностики KUKA. KSS00276 — общий код, требующий просмотра конкретных сообщений с подтверждением (для AUT все должны быть подтверждены). Нерасследованная причина обычно возвращается; для деталей — раздел "Сообщения" на Xpert (описание + причина + действия).',
  },
];

const PASS_THRESHOLD = 13;

export default function Module10() {
  const { setCurrentModule, setExamScore, examScore } = useCourse();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() =>
    new Array(questions.length).fill(null),
  );
  const [showResult, setShowResult] = useState(examScore !== null);

  const allAnswered = answers.every((a) => a !== null);
  const score = answers.reduce<number>(
    (acc, ans, idx) => (ans !== null && ans === questions[idx].correctIndex ? acc + 1 : acc),
    0,
  );

  const handleSelect = (optionIndex: number) => {
    if (answers[currentQ] !== null) return;
    const next = [...answers];
    next[currentQ] = optionIndex;
    setAnswers(next);
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ((q) => q + 1);
    }
  };

  const handlePrev = () => {
    if (currentQ > 0) setCurrentQ((q) => q - 1);
  };

  const handleFinish = () => {
    setExamScore(score);
    setShowResult(true);
    window.scrollTo(0, 0);
  };

  const handleRestart = () => {
    setAnswers(new Array(questions.length).fill(null));
    setCurrentQ(0);
    setShowResult(false);
  };

  if (showResult) {
    const passed = score >= PASS_THRESHOLD;
    const message =
      score >= 14
        ? 'Вы больше не звоните интегратору. Интеграторы звонят вам.'
        : score >= PASS_THRESHOLD
          ? 'Уверенно владеете KUKA-стеком. Готовы к боевому проекту.'
          : score >= 10
            ? 'Хорошая база. Перечитайте слабые места и пересдавайте — пройдёте.'
            : 'Видно, что вы только знакомитесь со стеком. Пройдите модули ещё раз и возвращайтесь.';

    return (
      <>
        <Confetti active={passed} />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-3xl mx-auto px-6 py-12"
        >
          <span className="text-xs font-medium text-accent uppercase tracking-widest">
            Финальный экзамен
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold mt-2 tracking-tight">
            {passed ? 'Поздравляем!' : 'Можно лучше'}
          </h1>
          <div className="mt-3 h-0.5 w-16 rounded-full bg-gradient-to-r from-accent to-transparent" />

          <div className="mt-10 p-8 rounded-2xl bg-card border border-border/50 text-center">
            <div className="text-6xl sm:text-7xl font-bold tracking-tight">
              {score}
              <span className="text-muted-foreground/50 text-3xl sm:text-4xl">/{questions.length}</span>
            </div>
            <p className="mt-4 text-lg font-medium">{message}</p>
            <p className="mt-3 text-sm text-muted-foreground">
              Порог сдачи: {PASS_THRESHOLD} из {questions.length}.{' '}
              {passed ? 'Вы прошли.' : 'Можно перепройти модули и повторить.'}
            </p>
          </div>

          <div className="mt-10 space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Разбор ответов
            </h3>
            {questions.map((q, i) => {
              const userAnswer = answers[i];
              const correct = userAnswer === q.correctIndex;
              return (
                <details
                  key={i}
                  className="p-4 rounded-lg border border-border/50 bg-card group"
                >
                  <summary className="cursor-pointer flex items-baseline gap-3">
                    <span
                      className={`text-xs font-semibold flex-shrink-0 w-12 ${
                        correct ? 'text-success' : 'text-error'
                      }`}
                    >
                      {correct ? 'Верно' : 'Ошибка'}
                    </span>
                    <span className="text-sm flex-1">{q.question.split('\n')[0]}</span>
                  </summary>
                  <div className="mt-3 pl-16 text-sm text-muted-foreground space-y-2">
                    {userAnswer !== null && !correct && (
                      <p>
                        <span className="font-medium text-foreground">Ваш ответ:</span>{' '}
                        {q.options[userAnswer]}
                      </p>
                    )}
                    <p>
                      <span className="font-medium text-foreground">Правильный ответ:</span>{' '}
                      {q.options[q.correctIndex]}
                    </p>
                    <p className="text-xs leading-relaxed">{q.explanation}</p>
                  </div>
                </details>
              );
            })}
          </div>

          <div className="mt-12 flex justify-between items-center">
            <button
              onClick={handleRestart}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              ← Пройти заново
            </button>
            <button
              onClick={() => setCurrentModule(0)}
              className="px-6 py-2.5 bg-accent text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
            >
              На главную →
            </button>
          </div>
        </motion.div>
      </>
    );
  }

  const q = questions[currentQ];
  const userAnswer = answers[currentQ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="max-w-3xl mx-auto px-6 py-12"
    >
      <div className="mb-10">
        <span className="text-xs font-medium text-accent uppercase tracking-widest">
          Финальный экзамен · Вопрос {currentQ + 1} из {questions.length}
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold mt-2 tracking-tight">
          {q.question.split('\n')[0]}
        </h1>
        {q.question.includes('\n') && (
          <pre className="font-mono text-xs p-4 rounded-lg bg-card border border-border/50 overflow-x-auto mt-4">
            {q.question.split('\n').slice(1).join('\n')}
          </pre>
        )}
        <div className="mt-3 h-0.5 w-16 rounded-full bg-gradient-to-r from-accent to-transparent" />
      </div>

      <div className="space-y-2">
        {q.options.map((opt, i) => {
          const isSelected = userAnswer === i;
          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={userAnswer !== null}
              className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                isSelected ? 'border-accent bg-accent/5' : 'border-border/50'
              } ${userAnswer !== null && !isSelected ? 'opacity-50' : ''} ${
                userAnswer === null ? 'hover:border-accent/50 cursor-pointer' : 'cursor-default'
              }`}
            >
              <span className="text-sm whitespace-pre-line">{opt}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {userAnswer !== null && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div
              className={`mt-4 p-4 rounded-lg text-sm ${
                userAnswer === q.correctIndex
                  ? 'bg-success/10 text-success'
                  : 'bg-error/10 text-error'
              }`}
            >
              <span className="font-medium">
                {userAnswer === q.correctIndex ? 'Верно. ' : 'Не совсем. '}
              </span>
              <span className="text-foreground/70">{q.explanation}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-10 flex justify-between items-center">
        <button
          onClick={handlePrev}
          disabled={currentQ === 0}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
        >
          ← Назад
        </button>
        {currentQ < questions.length - 1 ? (
          <button
            onClick={handleNext}
            disabled={userAnswer === null}
            className="px-6 py-2.5 bg-accent text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Следующий вопрос →
          </button>
        ) : (
          <button
            onClick={handleFinish}
            disabled={!allAnswered}
            className="px-6 py-2.5 bg-accent text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Завершить экзамен
          </button>
        )}
      </div>
    </motion.div>
  );
}
