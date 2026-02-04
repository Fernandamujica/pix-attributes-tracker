import { ResearchInsight } from '@/app/data/research-insights';
import { statSigChanges } from '@/app/data/attributes';
import { TrendingUp, TrendingDown, Minus, Target, Users, Zap, Shield, Lightbulb, Eye, Trophy, ArrowRight } from 'lucide-react';

interface InsightCardProps {
  insight: ResearchInsight;
}

// Get stat-sig changes for a specific wave
const getWaveStatSigs = (waveIndex: number) => {
  const results: { attrId: string; change: number; pValue?: number; note?: string }[] = [];
  for (const [attrId, changes] of Object.entries(statSigChanges)) {
    const match = changes.find(c => c.waveIndex === waveIndex);
    if (match) {
      results.push({ attrId, change: match.change, pValue: match.pValue, note: match.note });
    }
  }
  return results;
};

export function InsightCard({ insight }: InsightCardProps) {
  const getCategoryIcon = () => {
    switch (insight.category) {
      case 'speed': return <Zap className="w-5 h-5" />;
      case 'simplicity': return <Target className="w-5 h-5" />;
      case 'safety': return <Shield className="w-5 h-5" />;
      case 'intelligence': return <Lightbulb className="w-5 h-5" />;
      case 'intuitiveness': return <Eye className="w-5 h-5" />;
      case 'competitive': return <Trophy className="w-5 h-5" />;
      default: return <Users className="w-5 h-5" />;
    }
  };

  const getCategoryColor = () => {
    switch (insight.category) {
      case 'speed': return { gradient: 'from-[#FF6633] to-[#FF3366]', solid: '#FF6633' };
      case 'simplicity': return { gradient: 'from-primary to-accent', solid: '#820AD1' };
      case 'safety': return { gradient: 'from-[#00A868] to-[#006AB5]', solid: '#00A868' };
      case 'intelligence': return { gradient: 'from-[#9933FF] to-[#820AD1]', solid: '#9933FF' };
      case 'intuitiveness': return { gradient: 'from-[#00CCCC] to-[#0077CC]', solid: '#0077CC' };
      case 'competitive': return { gradient: 'from-[#FFD700] to-[#FF6633]', solid: '#FFD700' };
      default: return { gradient: 'from-muted-foreground to-muted', solid: '#767676' };
    }
  };

  const getTrendIcon = () => {
    switch (insight.metricTrend) {
      case 'up': return <TrendingUp className="w-4 h-4" style={{ color: '#00A868' }} />;
      case 'down': return <TrendingDown className="w-4 h-4" style={{ color: '#DA1E28' }} />;
      default: return <Minus className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const colors = getCategoryColor();

  return (
    <div className="bg-card rounded-card shadow-sm border border-border overflow-hidden hover:shadow-md transition-all duration-300">
      {/* Header */}
      <div className={`bg-gradient-to-r ${colors.gradient} p-5 text-primary-foreground`}>
        <div className="flex items-center gap-2 mb-2">
          {getCategoryIcon()}
          <span className="caption font-medium opacity-90">{insight.month} • {insight.waveName}</span>
        </div>
        <h3 className="font-medium" style={{ fontSize: 'var(--text-h4)' }}>{insight.title}</h3>
      </div>

      {/* Metric Badge */}
      <div className="px-5 py-3 bg-secondary border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="caption text-muted-foreground">{insight.primaryMetric}</span>
        </div>
        <div className="flex items-center gap-1.5">
          {getTrendIcon()}
          <span className="font-medium" style={{ 
            color: insight.metricTrend === 'up' ? '#00A868' : 
                   insight.metricTrend === 'down' ? '#DA1E28' : 
                   '#767676'
          }}>
            {insight.metricValue}
          </span>
        </div>
      </div>

      {/* Highlights */}
      <div className="p-5">
        <div className="space-y-2">
          {insight.highlights.slice(0, 3).map((highlight, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: colors.solid }}></span>
              <span className="caption text-card-foreground leading-relaxed">{highlight}</span>
            </div>
          ))}
        </div>

        {/* Stat-sig changes for this wave */}
        {(() => {
          const waveStatSigs = getWaveStatSigs(insight.wave);
          if (waveStatSigs.length === 0) return null;
          
          return (
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center gap-2 mb-2">
                <span className="flex items-center justify-center w-4 h-4 rounded-full bg-amber-500 text-white text-[9px] font-bold">✱</span>
                <span className="caption font-medium text-card-foreground">Stat-sig changes (p&lt;0.05)</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {waveStatSigs.slice(0, 4).map((sig, idx) => (
                  <span 
                    key={idx}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-amber-50 border border-amber-200"
                    title={sig.note || ''}
                  >
                    <span className="text-muted-foreground capitalize">{sig.attrId}</span>
                    <span className="font-medium" style={{ color: sig.change > 0 ? '#00A868' : '#DA1E28' }}>
                      {sig.change > 0 ? '+' : ''}{sig.change}pp
                    </span>
                  </span>
                ))}
                {waveStatSigs.length > 4 && (
                  <span className="text-xs text-muted-foreground">+{waveStatSigs.length - 4} more</span>
                )}
              </div>
            </div>
          );
        })()}

        {/* Main Recommendation */}
        {insight.suggestions.length > 0 && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: colors.solid }} />
              <span className="caption font-medium text-card-foreground leading-relaxed">
                {insight.suggestions[0]}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}