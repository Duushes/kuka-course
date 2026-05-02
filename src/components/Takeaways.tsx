'use client';

import { motion } from 'framer-motion';
import { fadeInItem } from './ModuleWrapper';

interface TakeawaysProps {
  items: string[];
}

export default function Takeaways({ items }: TakeawaysProps) {
  return (
    <motion.div
      variants={fadeInItem}
      className="mb-10 p-5 rounded-xl bg-accent/5 border border-accent/20"
    >
      <h3 className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">
        Что важно унести
      </h3>
      <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-accent mt-0.5 flex-shrink-0">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
