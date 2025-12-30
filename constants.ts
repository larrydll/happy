
import { Question } from './types';

// Oxford Happiness Questionnaire (OHQ) - 29 items
// Dimensions: 生活满意度(satisfaction), 自尊(esteem), 心理韧性(resilience), 乐观度(optimism), 自我控制(control)
export const QUESTIONS: Question[] = [
  { id: 1, text: "我不觉得特别满意我的生活。", reverse: true, dimension: 'satisfaction' },
  { id: 2, text: "我对他人非常感兴趣。", reverse: false, dimension: 'resilience' },
  { id: 3, text: "我觉得生活非常充实。", reverse: false, dimension: 'satisfaction' },
  { id: 4, text: "我对几乎每一个人都怀有温情。", reverse: false, dimension: 'resilience' },
  { id: 5, text: "我醒来时很少觉得休息得很充分。", reverse: true, dimension: 'resilience' },
  { id: 6, text: "我对未来不特别感到乐观。", reverse: true, dimension: 'optimism' },
  { id: 7, text: "我觉得大多数事情都是有趣的。", reverse: false, dimension: 'optimism' },
  { id: 8, text: "我总是致力于并参与其中。", reverse: false, dimension: 'control' },
  { id: 9, text: "生活是美好的。", reverse: false, dimension: 'satisfaction' },
  { id: 10, text: "我不认为这个世界是一个好地方。", reverse: true, dimension: 'optimism' },
  { id: 11, text: "我经常笑。", reverse: false, dimension: 'resilience' },
  { id: 12, text: "我对生活中的一切感到相当满意。", reverse: false, dimension: 'satisfaction' },
  { id: 13, text: "我不觉得自己有吸引力。", reverse: true, dimension: 'esteem' },
  { id: 14, text: "我的愿望与我实际所做的事情之间存在差距。", reverse: true, dimension: 'control' },
  { id: 15, text: "我非常幸福。", reverse: false, dimension: 'satisfaction' },
  { id: 16, text: "我在某些事情中发现了美。", reverse: false, dimension: 'optimism' },
  { id: 17, text: "我对别人总是有积极的影响。", reverse: false, dimension: 'esteem' },
  { id: 18, text: "我总能找到时间做我想做的事。", reverse: false, dimension: 'control' },
  { id: 19, text: "我觉得我并不特别掌控自己的生活。", reverse: true, dimension: 'control' },
  { id: 20, text: "我觉得我有能力承担任何事情。", reverse: false, dimension: 'esteem' },
  { id: 21, text: "我觉得精神饱满。", reverse: false, dimension: 'resilience' },
  { id: 22, text: "我经常感到愉悦和欣快。", reverse: false, dimension: 'satisfaction' },
  { id: 23, text: "我觉得做决定不容易。", reverse: true, dimension: 'control' },
  { id: 24, text: "我的生活没有特定的意义和目的。", reverse: true, dimension: 'satisfaction' },
  { id: 25, text: "我觉得我有很大的精力和活力。", reverse: false, dimension: 'resilience' },
  { id: 26, text: "我通常对事情有很好的影响。", reverse: false, dimension: 'esteem' },
  { id: 27, text: "我跟别人在一起时并不觉得开心。", reverse: true, dimension: 'resilience' },
  { id: 28, text: "我并不觉得特别健康。", reverse: true, dimension: 'resilience' },
  { id: 29, text: "我不觉得过去有特别开心的回忆。", reverse: true, dimension: 'satisfaction' },
];

export const DIMENSION_LABELS = {
  satisfaction: '生活满意度',
  esteem: '自尊感',
  resilience: '心理韧性',
  optimism: '乐观程度',
  control: '自我控制力'
};

export const OPTION_LABELS: Record<number, string> = {
  1: "强烈反对",
  2: "反对",
  3: "有些反对",
  4: "有些赞成",
  5: "赞成",
  6: "强烈赞成"
};

export const COLORS = {
  primary: '#A8D5BA', // 柔和绿
  secondary: '#BDE0FE', // 宁静蓝
  accent: '#FFC8DD', // 浅粉红
  text: '#2D3436',
  bg: '#F8FAFC'
};
