// Dataset from: [GBA|TOUT] Q1-26 - Pix attributes dataset
export const periods = ['Jun (W0)', 'Aug (W1)', 'Sep (W2)', 'Oct (W3)', 'Nov (W4)', 'Dec (W5)', 'Jan (W6)'];

export interface AttributeData {
  id: string;
  category: 'core' | 'func';
  name: string;
  icon: string; // Lucide icon name
  color: string; // Nubank palette color
  agg: number[];
  oldflow: number[];
  newflow: number[];
}

// Statistical significance tracking
// Calculated using two-proportion z-test at 95% confidence level (p < 0.05)
// Sample sizes: NewFlow ~400, OldFlow ~1650 per wave
export interface StatSigChange {
  waveIndex: number; // which wave the change occurred (comparing to previous)
  type: 'confirmed'; // all calculated at p < 0.05
  direction: 'up' | 'down';
  change: number; // pp change
  pValue?: number; // p-value from z-test
  zScore?: number; // z-score
  note?: string;
}

// Calculated stat-sig changes (two-proportion z-test, p < 0.05)
export const statSigChanges: Record<string, StatSigChange[]> = {
  'fast': [
    { waveIndex: 1, type: 'confirmed', direction: 'up', change: 4, pValue: 0.0455, zScore: 2.00, note: 'Backend optimization impact' },
    { waveIndex: 6, type: 'confirmed', direction: 'up', change: 9, pValue: 0.0000, zScore: 5.61, note: 'Post-holiday recovery' },
  ],
  'imm': [
    { waveIndex: 1, type: 'confirmed', direction: 'up', change: 4, pValue: 0.0455, zScore: 2.00, note: 'Backend optimization impact' },
    { waveIndex: 5, type: 'confirmed', direction: 'down', change: -4, pValue: 0.0481, zScore: -1.98, note: 'Nov crash pending transfers' },
    { waveIndex: 6, type: 'confirmed', direction: 'up', change: 10, pValue: 0.0000, zScore: 5.98, note: 'Post-holiday recovery' },
  ],
  'practical': [
    { waveIndex: 6, type: 'confirmed', direction: 'up', change: 11, pValue: 0.0000, zScore: 6.34, note: 'Post-holiday recovery' },
  ],
  'safe': [
    { waveIndex: 5, type: 'confirmed', direction: 'down', change: -6, pValue: 0.0116, zScore: -2.52, note: 'Fraud/instability concerns' },
    { waveIndex: 6, type: 'confirmed', direction: 'up', change: 12, pValue: 0.0000, zScore: 5.68, note: 'Post-holiday recovery' },
  ],
  'rel': [
    { waveIndex: 6, type: 'confirmed', direction: 'up', change: 9, pValue: 0.0000, zScore: 4.85, note: 'Post-holiday recovery' },
  ],
  'stab': [
    { waveIndex: 6, type: 'confirmed', direction: 'up', change: 15, pValue: 0.0000, zScore: 5.88, note: 'Engineering stability improvements' },
  ],
  'easy': [
    { waveIndex: 6, type: 'confirmed', direction: 'up', change: 9, pValue: 0.0000, zScore: 5.18, note: 'Post-holiday recovery' },
  ],
  'accessible': [
    { waveIndex: 6, type: 'confirmed', direction: 'up', change: 9, pValue: 0.0000, zScore: 5.18, note: 'Post-holiday recovery' },
  ],
  'trans': [
    { waveIndex: 6, type: 'confirmed', direction: 'up', change: 11, pValue: 0.0000, zScore: 5.60, note: 'Post-holiday recovery' },
  ],
  'int': [
    { waveIndex: 6, type: 'confirmed', direction: 'up', change: 10, pValue: 0.0000, zScore: 4.73, note: 'Post-holiday recovery' },
  ],
  'avail': [
    { waveIndex: 6, type: 'confirmed', direction: 'up', change: 14, pValue: 0.0000, zScore: 6.12, note: 'Post-holiday recovery' },
  ],
  'intuit': [
    { waveIndex: 6, type: 'confirmed', direction: 'up', change: 18, pValue: 0.0000, zScore: 6.80, note: 'Largest improvement - crossed 90% threshold' },
  ],
};

// Helper to check if a specific wave transition has stat-sig data
export const getStatSig = (attrId: string, waveIndex: number): StatSigChange | undefined => {
  return statSigChanges[attrId]?.find(s => s.waveIndex === waveIndex);
};

// Helper to get all stat-sig changes for an attribute
export const getAllStatSig = (attrId: string): StatSigChange[] => {
  return statSigChanges[attrId] || [];
};

export const attributes: AttributeData[] = [
  // Core Performance Attributes
  {
    id: 'fast',
    category: 'core',
    name: 'Fast',
    icon: 'Zap',
    color: '#820AD1', // Nubank Purple
    agg: [91, 93, 93, 92, 92, 89, 98],
    oldflow: [92, 91, 92, 92, 93, 88, 98],
    newflow: [90, 94, 93, 92, 91, 90, 99],
  },
  {
    id: 'imm',
    category: 'core',
    name: 'Immediate',
    icon: 'Clock',
    color: '#6408A1', // Nubank Dark Purple
    agg: [91, 93, 92, 91, 92, 89, 98],
    oldflow: [91, 91, 92, 91, 91, 88, 98],
    newflow: [90, 94, 92, 91, 93, 89, 99],
  },
  {
    id: 'practical',
    category: 'core',
    name: 'Practical',
    icon: 'Target',
    color: '#A028EF', // Nubank Light Purple
    agg: [90, 92, 92, 90, 89, 87, 98],
    oldflow: [90, 91, 92, 89, 88, 86, 98],
    newflow: [90, 92, 92, 90, 90, 88, 99],
  },
  {
    id: 'safe',
    category: 'core',
    name: 'Safe',
    icon: 'Shield',
    color: '#00A868', // Nubank Green
    agg: [86, 89, 88, 89, 89, 85, 97],
    oldflow: [86, 89, 89, 91, 88, 85, 97],
    newflow: [85, 88, 87, 87, 90, 84, 96],
  },
  {
    id: 'rel',
    category: 'core',
    name: 'Reliable',
    icon: 'CheckCircle',
    color: '#0077CC', // Nubank Blue
    agg: [88, 90, 90, 90, 91, 88, 97],
    oldflow: [88, 90, 89, 91, 90, 88, 97],
    newflow: [88, 90, 91, 89, 91, 88, 97],
  },
  {
    id: 'stab',
    category: 'core',
    name: 'Stable',
    icon: 'Anchor',
    color: '#006AB5', // Nubank Dark Blue
    agg: [76, 80, 78, 77, 79, 78, 93],
    oldflow: [76, 78, 76, 78, 78, 79, 93],
    newflow: [76, 81, 80, 76, 79, 77, 92],
  },

  // Functional Attributes
  {
    id: 'easy',
    category: 'func',
    name: 'Easy',
    icon: 'Smile',
    color: '#FF6633', // Nubank Orange
    agg: [91, 91, 91, 91, 92, 88, 98],
    oldflow: [89, 91, 91, 90, 93, 87, 98],
    newflow: [92, 91, 91, 92, 90, 89, 98],
  },
  {
    id: 'accessible',
    category: 'func',
    name: 'Accessible',
    icon: 'Accessibility',
    color: '#1B998B', // Nubank Teal Green
    agg: [88, 91, 89, 90, 91, 88, 97],
    oldflow: [87, 90, 89, 89, 90, 87, 97],
    newflow: [88, 91, 89, 91, 91, 89, 98],
  },
  {
    id: 'trans',
    category: 'func',
    name: 'Transparent',
    icon: 'Eye',
    color: '#00CCCC', // Nubank Teal
    agg: [88, 88, 89, 88, 89, 85, 97],
    oldflow: [88, 89, 89, 89, 87, 84, 97],
    newflow: [87, 87, 88, 87, 90, 86, 97],
  },
  {
    id: 'int',
    category: 'func',
    name: 'Intelligent',
    icon: 'Brain',
    color: '#9933FF', // Nubank Bright Purple
    agg: [83, 85, 85, 85, 81, 83, 96],
    oldflow: [84, 84, 84, 85, 81, 81, 96],
    newflow: [82, 86, 86, 84, 81, 85, 95],
  },
  {
    id: 'avail',
    category: 'func',
    name: 'Always Available',
    icon: 'Globe',
    color: '#FF3366', // Nubank Pink
    agg: [79, 84, 80, 82, 81, 81, 94],
    oldflow: [79, 83, 80, 80, 80, 80, 94],
    newflow: [79, 84, 80, 84, 82, 81, 95],
  },
  {
    id: 'intuit',
    category: 'func',
    name: 'Intuitive',
    icon: 'Lightbulb',
    color: '#FFD700', // Nubank Gold
    agg: [72, 76, 78, 76, 76, 73, 92],
    oldflow: [73, 76, 78, 75, 74, 72, 92],
    newflow: [70, 75, 78, 77, 78, 74, 92],
  },
];

export interface WaveData {
  id: number;
  name: string;
  month: string;
  perception: number;
  competitiveQuality: {
    muchBetter: number;
    better: number;
    same: number;
    worse: number;
    muchWorse: number;
    topTwoBox: number;
  };
  competitiveQualityOldFlow?: {
    muchBetter: number;
    better: number;
    same: number;
    worse: number;
    muchWorse: number;
    topTwoBox: number;
  };
}

export const waves: WaveData[] = [
  {
    id: 0,
    name: 'W0',
    month: 'Jun',
    perception: 43,
    competitiveQuality: {
      muchBetter: 41,
      better: 36,
      same: 20,
      worse: 2,
      muchWorse: 1,
      topTwoBox: 77
    },
    competitiveQualityOldFlow: {
      muchBetter: 40,
      better: 36,
      same: 20,
      worse: 3,
      muchWorse: 1,
      topTwoBox: 76,
    },
  },
  {
    id: 1,
    name: 'W1',
    month: 'Aug',
    perception: 43,
    competitiveQuality: {
      muchBetter: 40,
      better: 37,
      same: 20,
      worse: 2,
      muchWorse: 1,
      topTwoBox: 77,
    },
    competitiveQualityOldFlow: {
      muchBetter: 38,
      better: 36,
      same: 22,
      worse: 3,
      muchWorse: 1,
      topTwoBox: 74,
    },
  },
  {
    id: 2,
    name: 'W2',
    month: 'Sep',
    perception: 38,
    competitiveQuality: {
      muchBetter: 38,
      better: 37,
      same: 22,
      worse: 2,
      muchWorse: 1,
      topTwoBox: 75
    },
    competitiveQualityOldFlow: {
      muchBetter: 36,
      better: 36,
      same: 24,
      worse: 3,
      muchWorse: 1,
      topTwoBox: 72
    },
  },
  {
    id: 3,
    name: 'W3',
    month: 'Oct',
    perception: 37,
    competitiveQuality: {
      muchBetter: 37,
      better: 38,
      same: 22,
      worse: 2,
      muchWorse: 1,
      topTwoBox: 75
    },
    competitiveQualityOldFlow: {
      muchBetter: 35,
      better: 35,
      same: 26,
      worse: 3,
      muchWorse: 1,
      topTwoBox: 70
    },
  },
  {
    id: 4,
    name: 'W4',
    month: 'Nov',
    perception: 43,
    competitiveQuality: {
      muchBetter: 43,
      better: 34,
      same: 20,
      worse: 2,
      muchWorse: 1,
      topTwoBox: 77
    },
    competitiveQualityOldFlow: {
      muchBetter: 35,
      better: 35,
      same: 27,
      worse: 2,
      muchWorse: 1,
      topTwoBox: 70,
    },
  },
  {
    id: 5,
    name: 'W5',
    month: 'Dec',
    perception: 33,
    competitiveQuality: {
      muchBetter: 35,
      better: 35,
      same: 26,
      worse: 3,
      muchWorse: 1,
      topTwoBox: 70,
    },
    competitiveQualityOldFlow: {
      muchBetter: 33,
      better: 34,
      same: 29,
      worse: 3,
      muchWorse: 1,
      topTwoBox: 73,
    },
  },
  {
    id: 6,
    name: 'W6',
    month: 'Jan',
    perception: 29,
    competitiveQuality: {
      muchBetter: 37,
      better: 38,
      same: 24,
      worse: 1,
      muchWorse: 1,
      topTwoBox: 74,
    },
    competitiveQualityOldFlow: {
      muchBetter: 39,
      better: 35,
      same: 23,
      worse: 1,
      muchWorse: 1,
      topTwoBox: 74,
    },
  },
];