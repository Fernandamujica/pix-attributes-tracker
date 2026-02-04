import { summaryTable } from '@/app/data/research-insights';
import { Shield, Zap, Anchor, Lightbulb, Trophy, Eye, ArrowRight, CheckCircle, Brain, Accessibility, BarChart3 } from 'lucide-react';

const motiveIcons: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
  'Trust/Safety': { 
    icon: <Shield className="w-5 h-5" />, 
    color: '#00A868', 
    bg: '#00A86810' 
  },
  'Speed/Immediate': { 
    icon: <Zap className="w-5 h-5" />, 
    color: '#FF6633', 
    bg: '#FF663310' 
  },
  'Stability': { 
    icon: <Anchor className="w-5 h-5" />, 
    color: '#006AB5', 
    bg: '#006AB510' 
  },
  'Intuitiveness': { 
    icon: <Lightbulb className="w-5 h-5" />, 
    color: '#FFD700', 
    bg: '#FFD70015' 
  },
  'Reliability/Trust': { 
    icon: <CheckCircle className="w-5 h-5" />, 
    color: '#0077CC', 
    bg: '#0077CC10' 
  },
  'Intelligence': { 
    icon: <Brain className="w-5 h-5" />, 
    color: '#9933FF', 
    bg: '#9933FF10' 
  },
  'Accessibility': { 
    icon: <Accessibility className="w-5 h-5" />, 
    color: '#1B998B', 
    bg: '#1B998B10' 
  },
  'Competitive Edge': { 
    icon: <Trophy className="w-5 h-5" />, 
    color: '#820AD1', 
    bg: '#820AD110' 
  },
  'Change Awareness': { 
    icon: <Eye className="w-5 h-5" />, 
    color: '#0077CC', 
    bg: '#0077CC10' 
  },
};

export function SummaryTable() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent rounded-card p-8 text-primary-foreground shadow-xl">
        <h2 className="text-3xl font-medium mb-2">🎯 Strategic Recommendations</h2>
        <p className="opacity-90">
          Key insights and actionable next steps from our Q3 2025 - Q1 2026 research
        </p>
      </div>

      {/* Recommendations Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {summaryTable.map((row, idx) => {
          const config = motiveIcons[row.motive] || { 
            icon: <Shield className="w-5 h-5" />, 
            color: '#820AD1', 
            bg: '#820AD110' 
          };
          
          return (
            <div 
              key={idx} 
              className="bg-card rounded-card p-5 shadow-sm border border-border hover:shadow-md transition-all"
            >
              {/* Icon and Motive */}
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: config.bg }}
                >
                  <span style={{ color: config.color }}>{config.icon}</span>
                </div>
                <div>
                  <h4 className="font-medium text-card-foreground">{row.motive}</h4>
                  <p className="caption text-muted-foreground">Priority Area</p>
                </div>
              </div>

              {/* Metric */}
              <div className="mb-3 p-3 rounded-lg bg-secondary border border-border">
                <div className="caption text-muted-foreground uppercase tracking-wider mb-1">
                  Key Metric
                </div>
                <div className="text-sm font-medium text-card-foreground">
                  {row.metric}
                </div>
              </div>

              {/* Product Metrics to Track */}
              {row.productMetrics && (
                <div className="mb-3 p-3 rounded-lg border border-dashed border-border bg-background">
                  <div className="flex items-center gap-1.5 mb-1">
                    <BarChart3 className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="caption text-muted-foreground uppercase tracking-wider">
                      Product Metrics to Track
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground leading-relaxed">
                    {row.productMetrics}
                  </div>
                </div>
              )}

              {/* Recommendation */}
              <div className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: config.color }} />
                <p className="text-sm text-card-foreground leading-relaxed">
                  {row.suggestion}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}