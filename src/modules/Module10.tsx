'use client';

// Module 10 — Финальный экзамен. 15 multiple-choice вопросов из KUKA_Course_Catalog.md §2.4.
// Q1–Q10 — оригинальные MC. Q11–Q15 — переформатированы из open-ended в MC,
// эталонный ответ остаётся правильным, дистракторы строятся на типичных ошибках.
// Confetti при результате 13/15 (87%+).

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
    question: '1. Какая из перечисленных серий роботов KUKA относится к коллаборативным (cobot)?',
    options: [
      'KR QUANTEC',
      'KR CYBERTECH',
      'LBR iiwa',
      'KR AGILUS',
    ],
    correctIndex: 2,
    explanation:
      'LBR iiwa — единственный cobot в перечне; остальные — классические индустриальные манипуляторы. У LBR iiwa есть силомоментные сенсоры в каждом суставе.',
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
      'KRC5 — следующее поколение шкафа управления, программно совместим с KRC4 (KSS 8.7+). KPP и KSP объединены на одной плате, шкаф занимает ~50% объёма KRC4.',
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
      'XYZ 4-Point определяет XYZ-позицию TCP из четырёх измерений; ABC 2-Point — ориентацию. KSS решает overdetermined систему методом наименьших квадратов.',
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
      'LIN P1 без флагов approximation проходит точно через P1; C_DIS включает сглаживание; PTP — траектория не линейная в декартовом пространстве.',
  },
  {
    question: '5. Какой полевой стандарт НЕ поддерживается WorkVisual для IO-mapping штатно?',
    options: [
      'PROFINET',
      'EtherCAT',
      'EtherNet/IP',
      'Modbus TCP',
    ],
    correctIndex: 3,
    explanation:
      'WorkVisual поддерживает PROFINET, PROFIBUS, EtherCAT, EtherNet/IP, DeviceNet, VARANBUS. Modbus TCP — нет (нужны отдельные технологические пакеты).',
  },
  {
    question: '6. Что произошло с ISO/TS 15066 в 2025 году?',
    options: [
      'Он отменён без замены',
      'Его требования к коллаборативным роботам интегрированы в новую редакцию ISO 10218-1:2025',
      'Преобразован в ISO 10218-3',
      'Заменён ISO 9001',
    ],
    correctIndex: 1,
    explanation:
      'В 2025 ISO 10218-1/-2 переизданы и поглотили большую часть ISO/TS 15066. Биомеханические лимиты для cobot теперь живут прямо в ISO 10218-1:2025.',
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
      'mxAutomation предоставляет блоки FB для S7-1500 / 1200 / 300 / 400, программирование выполняется в TIA Portal. Робот в этом случае — slave, исполняет команды.',
  },
  {
    question: '8. Минимальная типичная периодичность цикла KUKA RSI (Robot Sensor Interface)?',
    options: [
      '100 мс',
      '50 мс',
      '4–12 мс',
      '1 с',
    ],
    correctIndex: 2,
    explanation:
      'RSI работает с интерполяционным циклом 4–12 мс (зависит от версии KSS и настроек RSI Object Configuration), что делает его пригодным для real-time коррекций.',
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
      'Sunrise.OS использует Java (Eclipse-based Sunrise.Workbench с RoboticsAPI). KRL применяется для KRC4/KRC5, Sunrise — для LBR iiwa.',
  },
  {
    question: '10. Какой свободный симулятор KUKA выдаётся в trial через my.kuka и поддерживает экспорт KRL?',
    options: [
      'Gazebo',
      'KUKA.Sim 4',
      'RoboDK Free',
      'V-REP',
    ],
    correctIndex: 1,
    explanation:
      'KUKA.Sim 4 (на базе Visual Components) выдаётся trial-ключом через my.kuka Marketplace на 1 год. RoboDK — независимый продукт, не от KUKA.',
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
      'BASE — пользовательская система координат для удобства программирования. Привязывается к заготовке: при сдвиге детали достаточно перекалибровать BASE (3-Point: origin + точка на X + точка в плоскости XY), а не переписывать каждую точку программы.',
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
      'P1, P2, P3 не объявлены в demo.dat (через DECL POS) и не обучены через SmartPAD — KSS не знает координат. $VEL.CP в м/с — нормально (0.3 м/с типичная Cartesian-скорость). HOME — стандартная глобальная точка KUKA в \\$config.dat.',
  },
  {
    question: '13. Какая категория остановки применима в режиме T1 при отпускании enabling-switch на SmartPAD?',
    options: [
      'Cat 0 — немедленное снятие питания',
      'Cat 1 — управляемая остановка с сохранением питания до полной остановки, затем снятие питания',
      'Cat 2 — управляемая остановка без снятия питания',
      'Никакая остановка не срабатывает, только предупреждение',
    ],
    correctIndex: 1,
    explanation:
      'В режиме T1 при отпускании enabling-switch SmartPAD срабатывает остановка категории 1 (программная управляемая остановка). Cat 0 — для emergency stop (более жёсткий). Cat 2 не разрешён как primary stop по новым редакциям ISO 10218 / EN 60204-1.',
  },
  {
    question: '14. Минимальная архитектура связи KUKA-робота с внешним PC через RSI: какие два потока обмена данными работают?',
    options: [
      'Один поток: PC отправляет KRL-команды на KRC по TCP',
      'KRC циклически отправляет на PC XML с положением и сенсорами; PC отвечает в том же цикле XML с коррекциями (Cartesian или axis) — два встречных UDP-потока с периодом 4–12 мс',
      'PC раз в секунду опрашивает KRC через OPC UA',
      'KRC отправляет в PC через PROFINET, PC передаёт по EtherCAT обратно',
    ],
    correctIndex: 1,
    explanation:
      'RSI поднимает на KRC объектную конфигурацию (XML) с UDP-соединением. Циклически (4–12 мс) KRC отправляет XML-фрейм с положением и сенсорами, PC отвечает в том же цикле фреймом с коррекциями (RKorr — декартовы или AKorr — осевые). Два встречных потока: KRC→PC и PC→KRC.',
  },
  {
    question: '15. Робот в режиме AUT останавливается с сообщением "KSS00276 Acknowledge messages". Какой алгоритм действий правильный?',
    options: [
      'Перепрошить KSS на свежую версию',
      'Перейти в T1 и попробовать снова — обычно помогает',
      'Прочитать список активных сообщений на SmartPAD, найти все Acknowledge-сообщения, устранить корневые причины (защитный контур, периферия, калибровка), затем подтвердить через "Acknowledge all"; если возвращается — поиск по коду в Xpert',
      'Игнорировать сообщение и нажать "Acknowledge all" сразу',
    ],
    correctIndex: 2,
    explanation:
      'Стандартный troubleshooting-алгоритм KUKA. KSS00276 — общий код, требующий просмотра конкретных Acknowledge-сообщений (для AUT все должны быть подтверждены). Нерасследованная причина обычно возвращается; для деталей — раздел "Сообщения" на Xpert (описание + причина + действия).',
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
