'use client';

export default function Footer() {
  const sources = [
    { label: 'KUKA Xpert', author: 'KUKA AG', url: 'https://xpert.kuka.com/', note: 'официальная база знаний' },
    { label: 'KSS Manual', author: 'KUKA Roboter GmbH', note: 'KSS 8.3 Operating & Programming' },
    { label: 'Modern Robotics', author: 'Lynch & Park', url: 'https://hades.mech.northwestern.edu/index.php/Modern_Robotics', note: 'free PDF' },
    { label: 'KUKA.Sim 4', author: 'KUKA AG', url: 'https://www.kuka.com/en-us/products/robotics-systems/software/simulation-planning-optimization/kuka_sim' },
    { label: 'RoboDK', author: 'RoboDK Inc.', url: 'https://robodk.com/' },
    { label: 'robot-forum.com', author: 'community', url: 'https://www.robot-forum.com/' },
    { label: 'kuka_experimental', author: 'ROS-Industrial', url: 'https://github.com/ros-industrial/kuka_experimental' },
    { label: 'mxAutomation', author: 'KUKA AG', url: 'https://www.youtube.com/watch?v=eI10cOjD1JU', note: 'TIA Portal Tutorial' },
    { label: 'МГТУ Баумана', author: 'Серебренный, Ермолов', note: 'учебное пособие 2019' },
    { label: 'ISO 10218-1/-2:2025', author: 'ISO', note: 'промышленная безопасность роботов' },
  ];

  return (
    <footer className="border-t border-border/50 mt-20">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <p className="text-[11px] text-muted-foreground/70 leading-relaxed">
          Данный образовательный проект создан исключительно в некоммерческих целях. Материалы курса основаны на публично доступных источниках по промышленной робототехнике KUKA.
          Сайт не аффилирован, не спонсируется и не связан официально с KUKA AG. Все упоминаемые продукты, методологии и товарные знаки
          (KUKA<sup>®</sup>, KR AGILUS<sup>®</sup>, KR QUANTEC<sup>®</sup>, KR CYBERTECH<sup>®</sup>, LBR iiwa<sup>®</sup>, KUKA.Sim<sup>®</sup>, WorkVisual<sup>®</sup>,
          SmartPAD<sup>®</sup>, mxAutomation<sup>®</sup>, Sunrise.OS<sup>®</sup> и др.) принадлежат их правообладателям.
        </p>

        <details className="mt-4 group">
          <summary className="text-[11px] text-muted-foreground/60 cursor-pointer hover:text-muted-foreground transition-colors select-none">
            Источники и материалы ↓
          </summary>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
            {sources.map((s, i) => (
              <span key={i} className="text-[11px] text-muted-foreground/60 leading-relaxed">
                {s.url ? (
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent/70 hover:text-accent hover:underline underline-offset-2"
                  >
                    {s.label}
                  </a>
                ) : (
                  <span className="text-foreground/50">{s.label}</span>
                )}
                {' — '}
                {s.author}
                {s.note && <span className="opacity-70">{`, ${s.note}`}</span>}
              </span>
            ))}
          </div>
        </details>
      </div>
    </footer>
  );
}
