import { WaveData } from '@/app/data/attributes';
import { Sparkles, Target, TrendingUp, Users, BarChart3, Trophy, AlertTriangle } from 'lucide-react';

interface PerceptionTldrProps {
  wave: WaveData;
}

export function PerceptionTldr({ wave }: PerceptionTldrProps) {
  // TLDR analysis based on wave data
  const getTldrContent = () => {
    switch (wave.id) {
      case 0: // W0 - Jun
        return {
          title: "The Baseline Pilot",
          icon: Target,
          color: '#820AD1',
          goal: "Establish a baseline and validate the survey methodology.",
          insights: "Core pillars like Fast (90-92%) and Practical (90%) started with very high scores. Intuitiveness was the primary friction point (70-73%). The Simplified Flow already led on Easy (92% vs 89%), while the Old Flow still led on Fast and Intuitive.",
          verdict: "Method validated. Speed is our strength; Intuitiveness is our challenge."
        };
      case 1: // W1 - Aug
        return {
          title: "First Rollout Gains",
          icon: TrendingUp,
          color: '#00A868',
          goal: "Monitor the initial rollout to the NuCommunity.",
          insights: "Perceived speed for the Simplified Flow jumped to 94% (Fast and Immediate) after engineering optimizations. The Simplified Flow led on 7 of 12 attributes, with its biggest edge on Fast and Stable (+3pp).",
          verdict: "Backend performance improvements are directly felt by the customer. The Simplified Flow is officially pulling ahead."
        };
      case 2: // W2 - Sep
        return {
          title: 'The "Intuitive" Breakthrough',
          icon: Users,
          color: '#0077CC',
          goal: "Analyze perception among new customers who never saw the old flow.",
          insights: "New customers in the rollout hit 80% on Intuitive, while the Simplified Flow reached 78% overall. Stability stayed around 80%, and competitive advantage held at 75% Top 2 Box with 'Same' at 22%.",
          verdict: "The simplified UI is significantly more successful with new users. We maintain a clear competitive lead in UX."
        };
      case 3: // W3 - Oct
        return {
          title: "Stabilization & Ceilings",
          icon: BarChart3,
          color: '#A028EF',
          goal: "Routine monitoring of the simplified experience.",
          insights: "Fast (92%) and Easy (92%) remained consistently high. Intuitiveness stayed lower at 77% and Stability at 76%, suggesting UI changes alone weren't enough to move reliability perceptions.",
          verdict: "High satisfaction overall, but we need deep dives into Engineering (Stability) and Design (Friction) to move the needle further."
        };
      case 4: // W4 - Nov
        return {
          title: "The Historical Peak",
          icon: Trophy,
          color: '#FFD700',
          goal: "Pre-holiday performance check and competitive benchmarking.",
          insights: "The Simplified Flow led in 9 out of 12 categories. Security (Safe) reached its peak at 90%, Immediate hit 93%, and competitive superiority climbed to 77% Top 2 Box—matching the June baseline after steady improvement.",
          verdict: "Peak competitiveness achieved. Recommendation: start working on 'Differentiators' (like one-click transfers) because competitors are catching up to our basic speed."
        };
      case 5: // W5 - Dec
        return {
          title: "The Stability Crisis & Semester Wrap-up",
          icon: AlertTriangle,
          color: '#DA1E28',
          goal: "Final 2025 review and impact of late-year technical incidents.",
          insights: "While the Simplified Flow stayed ahead, 11 of 12 attributes dropped: Safe (-6pp to 84%), Immediate (-4pp to 89%), and Practical (-2pp to 88%). Intelligent was the lone increase (+4pp to 85%). Competitive advantage dropped to 70% Top 2 Box.",
          verdict: "Technical glitches damage 'Safety' trust faster than UI fixes can build it. Customers care about outcomes (did it send fast?) more than the interface."
        };
      case 6: // W6 - Jan
        return {
          title: "The Recovery & All-Time High",
          icon: Trophy,
          color: '#00A868',
          goal: "Q1 2026 kickoff: validate recovery from December incidents and set new baselines.",
          insights: "ALL 12 attributes now above 90% for the first time ever. Fast and Immediate hit 99% (+9-10pp), Safe recovered to 96% (+12pp), and Stable jumped to 92% (+15pp). Intuitive finally crossed 90% threshold (92%, +18pp). Competitive T2B recovered to 74%.",
          verdict: "Strongest wave in study history. Engineering stability drove perception recovery. Continue monitoring Stable (still lowest) and maintain momentum on Intuitive. Focus now shifts to differentiators vs. commoditization."
        };
      default:
        return {
          title: "Analysis",
          icon: Sparkles,
          color: '#820AD1',
          goal: "User perception data provides insights into how changes are noticed and integrated over time.",
          insights: "Data analysis in progress.",
          verdict: "Ongoing monitoring."
        };
    }
  };

  const content = getTldrContent();
  const IconComponent = content.icon;

  return (
    <div className="bg-gradient-to-br from-accent/5 to-primary/5 rounded-card p-5 border border-primary/20 mb-6">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center" style={{ 
          backgroundColor: `${content.color}20` 
        }}>
          <IconComponent className="w-4 h-4" style={{ color: content.color }} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <h4 className="font-medium text-card-foreground" style={{ fontSize: 'var(--text-label)' }}>
              TL;DR — {content.title}
            </h4>
          </div>
          
          <div className="space-y-2">
            <div>
              <span className="font-medium text-card-foreground" style={{ fontSize: '11px' }}>Goal: </span>
              <span className="text-muted-foreground" style={{ fontSize: '11px', lineHeight: '1.5' }}>
                {content.goal}
              </span>
            </div>
            
            <div>
              <span className="font-medium text-card-foreground" style={{ fontSize: '11px' }}>Insights: </span>
              <span className="text-muted-foreground" style={{ fontSize: '11px', lineHeight: '1.5' }}>
                {content.insights}
              </span>
            </div>
            
            <div className="pt-2 mt-2 border-t border-border/50">
              <span className="font-medium" style={{ fontSize: '11px', color: content.color }}>✓ Verdict: </span>
              <span className="text-card-foreground" style={{ fontSize: '11px', lineHeight: '1.5', fontWeight: 500 }}>
                {content.verdict}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}