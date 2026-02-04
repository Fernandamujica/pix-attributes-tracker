export interface ResearchInsight {
  wave: number;
  month: string;
  waveName: string;
  title: string;
  motive: string;
  metricType: 'qualitative' | 'quantitative' | 'competitive' | 'cohort';
  primaryMetric: string;
  metricValue: string;
  metricTrend: 'up' | 'down' | 'neutral';
  chartData?: { name: string; value: number; color?: string }[];
  highlights: string[];
  suggestions: string[];
  impactLevel: 'high' | 'medium' | 'low';
  category: 'speed' | 'simplicity' | 'safety' | 'intelligence' | 'intuitiveness' | 'competitive';
}

export const researchInsights: ResearchInsight[] = [
  {
    wave: 0,
    month: 'Jun',
    waveName: 'W0',
    title: 'Baseline - Simplified Flow Launch',
    motive: 'Establishing baseline metrics for new simplified flow vs legacy Old Flow',
    metricType: 'qualitative',
    primaryMetric: 'Baseline',
    metricValue: 'W0',
    metricTrend: 'neutral',
    chartData: [
      { name: 'Intuitive NF', value: 70, color: '#f59e0b' },
      { name: 'Intuitive OF', value: 73, color: '#94a3b8' },
      { name: 'Fast NF', value: 90, color: '#10b981' },
      { name: 'Safe NF', value: 85, color: '#10b981' }
    ],
    highlights: [
      'Baseline established for comparison',
      'New Flow: Intuitive lowest at 70% vs Old Flow 73%',
      'Old Flow slightly ahead on Fast (92% vs 90%)',
      'Simplified Flow ahead on Easy (92% vs 89%) and Accessible (88% vs 87%)',
      'Both flows equal on Practical (90%), Reliable (88%), Always Available (79%), Stable (76%)'
    ],
    suggestions: [
      'Monitor all 12 attributes month-over-month',
      'Focus on improving Intuitive score',
      'Track user perception vs technical performance'
    ],
    impactLevel: 'medium',
    category: 'simplicity'
  },
  {
    wave: 1,
    month: 'Aug',
    waveName: 'W1',
    title: 'Speed Breakthrough - Performance Tracking Perception',
    motive: 'Mid-Aug rollout at ~60% exposure with 30% faster time-to-render',
    metricType: 'quantitative',
    primaryMetric: 'Fast',
    metricValue: '+4pp',
    metricTrend: 'up',
    chartData: [
      { name: 'Fast W0', value: 90, color: '#94a3b8' },
      { name: 'Fast W1', value: 94, color: '#10b981' },
      { name: 'Immediate', value: 94, color: '#10b981' },
      { name: 'Practical', value: 92, color: '#22c55e' }
    ],
    highlights: [
      'Fast rose +4pp to 94% (stat-sig)',
      'Immediate also at 94% (+4pp)',
      'Perception tracks real 30% performance gain',
      'New flow beats old on 7 of 12 attributes',
      'Intuitive improved +5pp (70%→75%)',
      'Safe +3pp (85%→88%)'
    ],
    suggestions: [
      'Keep p90 time-to-render as lead KPI',
      'Tighten security cues to improve Safe perception',
      'Improve fee/limit/confirmation messaging',
      'Learning curve showing positive trend on Intuitive'
    ],
    impactLevel: 'high',
    category: 'speed'
  },
  {
    wave: 2,
    month: 'Sep',
    waveName: 'W2',
    title: 'Maintaining Momentum with Rollout Cohort Success',
    motive: 'Specific rollout cohort reaching 80% on Intuitive - validating simplified UX',
    metricType: 'cohort',
    primaryMetric: 'Intuitive (Rollout)',
    metricValue: '80%',
    metricTrend: 'up',
    chartData: [
      { name: 'Intuit Rollout', value: 80, color: '#10b981' },
      { name: 'Intuit NF', value: 78, color: '#22c55e' },
      { name: 'Intuit OF', value: 78, color: '#cbd5e1' },
      { name: 'Stable NF', value: 80, color: '#10b981' }
    ],
    highlights: [
      'Rollout cohort: Intuitive at 80% (+2pp vs overall)',
      'Overall New Flow Intuitive at 78%',
      'Stable at 80%, flat vs August',
      'Fast stable at 93%, Immediate 92%',
      'New Flow ahead on 4 of 12 attributes (6 ties)'
    ],
    suggestions: [
      'Continue monitoring rollout cohort separately',
      'Learning curve effect confirmed - time improves perception',
      'Stable improving but still needs engineering attention',
      'Maintain focus on speed and reliability'
    ],
    impactLevel: 'medium',
    category: 'intuitiveness'
  },
  {
    wave: 3,
    month: 'Oct',
    waveName: 'W3',
    title: 'Simplified Experience Validation',
    motive: 'Rollout users showing strong positive signals on speed, ease, and transparency',
    metricType: 'quantitative',
    primaryMetric: 'Overall Usability',
    metricValue: 'Strong',
    metricTrend: 'up',
    chartData: [
      { name: 'Fast', value: 92, color: '#10b981' },
      { name: 'Easy', value: 92, color: '#10b981' },
      { name: 'Immediate', value: 91, color: '#22c55e' },
      { name: 'Stable', value: 76, color: '#22c55e' }
    ],
    highlights: [
      'Speed outstanding across cohorts - New Flow 92%',
      'Easy at 92%, highest for New Flow',
      'Ease/practicality stay high - first-time users respond well',
      'Safety/reliability solid - trust preserved',
      'Stable at 76%, still a low performer',
      'Intuitive at 77% - still relatively lower',
      'New Flow ties or trails on 7 of 12 attributes'
    ],
    suggestions: [
      'Rollout outperforms on overall usability',
      'Better understand engineering side of Stable',
      'Continue working on Intuitive perception',
      'Maintain transparency advantage'
    ],
    impactLevel: 'medium',
    category: 'simplicity'
  },
  {
    wave: 4,
    month: 'Nov',
    waveName: 'W4',
    title: 'Strong Performance - Safety & Transparency Gains',
    motive: 'New Flow dominance with notable improvements in Safety and Transparency',
    metricType: 'quantitative',
    primaryMetric: 'New Flow Advantage',
    metricValue: '9/12',
    metricTrend: 'up',
    chartData: [
      { name: 'Transparent', value: 90, color: '#10b981' },
      { name: 'Immediate', value: 93, color: '#10b981' },
      { name: 'Safe', value: 90, color: '#10b981' },
      { name: 'Intuitive', value: 78, color: '#22c55e' }
    ],
    highlights: [
      'New Flow outperforms old flow on 9 of 12 attributes',
      'Biggest advantages: Transparent (+3pp), Immediate (+2pp), Intuitive (+4pp)',
      'Safe improved +3pp vs Oct (87%→90%) - largest positive change',
      'Intuitive improved +1pp (77%→78%), now +4pp vs Old Flow',
      'Old flow only ahead on Fast and Easy (tied or marginal)',
      'Stable up +3pp (76%→79%)'
    ],
    suggestions: [
      'Safety improvements significant - continue trajectory',
      'Monitor Stable decline with Engineering',
      'Intuitive showing steady improvement',
      'Maintain transparency communication advantage'
    ],
    impactLevel: 'high',
    category: 'safety'
  },
  {
    wave: 5,
    month: 'Dec',
    waveName: 'W5',
    title: '🚨 Broad Decline + Competitive Commoditization',
    motive: 'Engineering instability + market commoditization causing widespread perception drops',
    metricType: 'quantitative',
    primaryMetric: 'Safe',
    metricValue: '-6pp',
    metricTrend: 'down',
    chartData: [
      { name: 'Safe Nov', value: 90, color: '#94a3b8' },
      { name: 'Safe Dec', value: 84, color: '#ef4444' },
      { name: 'Immed Nov', value: 93, color: '#94a3b8' },
      { name: 'Immed Dec', value: 89, color: '#f59e0b' }
    ],
    highlights: [
      'New Flow still outperforms old on 9 of 12 attributes',
      'Biggest advantage: Intelligent (+4pp vs Old Flow)',
      'Old flow slight advantage on Stable (+2pp), not stat-sig',
      '🚨 11 of 12 attributes DECREASED vs November',
      'Safe -6pp (90%→84%) - stat-sig, engineering related',
      'Immediate -4pp (93%→89%) - stat-sig',
      'Old Flow Safe dropped -3pp (88%→85%)',
      'Competitive: Top2Box 70%, "Much Better" -8pp (43%→35%)',
      '"Same" at 26% - Pix commoditized across banks'
    ],
    suggestions: [
      'Implement Dip Detection workflow (Research + Engineering sync)',
      'Add Bot/clear warnings during instabilities',
      'One-Click Transfers to fight commoditization',
      'Lower "Same" percentage with premium features',
      'Move beyond Speed into Intelligence differentiation',
      'Investigate root causes + monitor W6 for trend confirmation',
      'Contact Photos and smart features for competitive edge'
    ],
    impactLevel: 'high',
    category: 'safety'
  },
  {
    wave: 6,
    month: 'Jan',
    waveName: 'W6',
    title: '🎉 Strong Recovery - All Attributes Above 90%',
    motive: 'Major rebound across all metrics post-holiday stabilization',
    metricType: 'quantitative',
    primaryMetric: 'Overall',
    metricValue: '+9pp avg',
    metricTrend: 'up',
    chartData: [
      { name: 'Fast W5', value: 90, color: '#94a3b8' },
      { name: 'Fast W6', value: 99, color: '#10b981' },
      { name: 'Stable W5', value: 77, color: '#94a3b8' },
      { name: 'Stable W6', value: 92, color: '#10b981' }
    ],
    highlights: [
      '🎉 ALL 12 attributes now above 90% for the first time',
      'Fast: 99% (+9pp), highest ever recorded',
      'Immediate: 99% (+10pp), full recovery',
      'Practical: 99% (+11pp), strong rebound',
      'Safe: 96% (+12pp), major improvement from Dec low',
      'Stable: 92% (+15pp), biggest improvement - now acceptable',
      'Intuitive: 92% (+18pp), finally crossed 90% threshold',
      'New Flow ahead or tied on all 12 attributes',
      'Competitive: Top2Box recovered to 74% (+4pp)',
      'Perception of changes dropped to 29% (expected stabilization)'
    ],
    suggestions: [
      'Maintain engineering stability that drove recovery',
      'Document what changed between Dec-Jan for playbook',
      'Continue monitoring Intuitive - first time above 90%',
      'Stable finally acceptable but still lowest performer',
      'Build on competitive momentum (74% T2B)',
      'Focus on "Much Better" differentiation (37%) vs "Same" (24%)'
    ],
    impactLevel: 'high',
    category: 'speed'
  }
];

export const summaryTable = [
  {
    motive: 'Trust/Safety',
    metric: '"Safe" Attribute (96% W6, recovered +12pp)',
    suggestion: 'Investigate Fraud incidents (Black Friday volume) with #fraud-business-unit; link crash logs to research waves',
    productMetrics: '"Modo rua", Fraud and limit mechanisms'
  },
  {
    motive: 'Speed/Immediate',
    metric: '"Immediate" & "Fast" (99% W6, all-time high)',
    suggestion: 'November crash caused pending transfers — continue monitoring TTFD and TTR metrics with Engineering',
    productMetrics: 'p90 time to render; TTFD; Pix SLA (P50|99)'
  },
  {
    motive: 'Stability',
    metric: 'Stable (92% W6, +15pp) & Always Available (94% W6)',
    suggestion: 'Engineering deep-dive needed — biggest improvement but still monitoring for consistency',
    productMetrics: 'Stability index; Pix SLA (P50|99)'
  },
  {
    motive: 'Intuitiveness',
    metric: '"Intuitive" (92% W6, first time above 90%)',
    suggestion: 'Design investigation needed — crossed 90% threshold, continue monitoring for sustained improvement',
    productMetrics: 'Time on task (Easy, Intuitive); UX research sessions'
  },
  {
    motive: 'Reliability/Trust',
    metric: '"Reliable" (97% W6) & "Trustworthy" implied by Safe',
    suggestion: 'Success rate monitoring and transparent error handling',
    productMetrics: 'Success rate; Transparency in fees display; Warning instabilities'
  },
  {
    motive: 'Intelligence',
    metric: '"Intelligent" (95% W6, +10pp recovery)',
    suggestion: 'Differentiate via smart features — One-click transfers, Contact Photos, smart defaults',
    productMetrics: '# unique customers doing >1 smart txns-out'
  },
  {
    motive: 'Accessibility',
    metric: '"Accessible" (98% W6, strong)',
    suggestion: 'Maintain accessibility standards across new features',
    productMetrics: 'Specific copies to screen readers; Contrasting colors; Functional screens even in zoom'
  },
  {
    motive: 'Competitive Edge',
    metric: 'Top2Box 74%, "Same" at 24%',
    suggestion: 'Move beyond "Speed" into "Intelligence" — reduce commoditization perception',
    productMetrics: 'Competitive benchmark; NPS; "Much Better" vs "Same" ratio'
  }
];