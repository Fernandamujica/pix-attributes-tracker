import { attributes } from '@/app/data/attributes';
import { TrendingUp, TrendingDown, Minus, ArrowRight } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

interface MonthOverMonthCardProps {
  currentWaveIndex: number;
  currentWaveName: string;
  previousWaveName: string;
}

export function MonthOverMonthCard({ 
  currentWaveIndex, 
  currentWaveName, 
  previousWaveName 
}: MonthOverMonthCardProps) {
  if (currentWaveIndex === 0) {
    return (
      <div className="bg-gradient-to-br from-secondary to-muted rounded-card p-6 shadow-sm border border-border mb-8">
        <div className="text-center text-muted-foreground">
          <h3 className="font-medium mb-2" style={{ fontSize: 'var(--text-h4)' }}>Baseline Wave</h3>
          <p style={{ fontSize: 'var(--text-label)' }}>No previous data for comparison</p>
        </div>
      </div>
    );
  }

  const changes = attributes.map((attr) => {
    const current = attr.newflow[currentWaveIndex];
    const previous = attr.newflow[currentWaveIndex - 1];
    const diff = current - previous;
    
    return {
      name: attr.name,
      category: attr.category,
      current,
      previous,
      diff,
      percentChange: previous !== 0 ? ((diff / previous) * 100).toFixed(1) : '0',
      color: attr.color,
      icon: attr.icon
    };
  });

  const improved = changes.filter(c => c.diff > 0);
  const declined = changes.filter(c => c.diff < 0);
  const unchanged = changes.filter(c => c.diff === 0);
  const biggestGain = changes.reduce((max, c) => c.diff > max.diff ? c : max);
  const biggestDrop = changes.reduce((min, c) => c.diff < min.diff ? c : min);

  return (
    <div className="bg-card rounded-card p-6 shadow-sm border border-border mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-medium text-card-foreground flex items-center gap-2" style={{ fontSize: 'var(--text-h4)' }}>
            Month-over-Month Changes
          </h3>
          <div className="flex items-center gap-2 text-muted-foreground mt-1" style={{ fontSize: 'var(--text-label)' }}>
            <span className="font-medium">{previousWaveName}</span>
            <ArrowRight className="w-4 h-4" />
            <span className="font-medium" style={{ color: 'var(--color-primary)' }}>{currentWaveName}</span>
          </div>
        </div>
        
        <div className="flex gap-4">
          <div className="text-center">
            <div className="text-2xl font-medium" style={{ color: '#00A868' }}>{improved.length}</div>
            <div className="caption text-muted-foreground font-medium">Improved</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-medium text-destructive">{declined.length}</div>
            <div className="caption text-muted-foreground font-medium">Declined</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-medium text-muted-foreground">{unchanged.length}</div>
            <div className="caption text-muted-foreground font-medium">Stable</div>
          </div>
        </div>
      </div>

      {/* Key Highlights */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="border-2 rounded-card p-4" style={{ 
          backgroundColor: '#00A86810',
          borderColor: '#00A86830'
        }}>
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5" style={{ color: '#00A868' }} />
            <span className="caption font-medium uppercase" style={{ color: '#00A868' }}>Biggest Gain</span>
          </div>
          <div className="font-medium text-card-foreground" style={{ fontSize: 'var(--text-h4)' }}>{biggestGain.name}</div>
          <div style={{ fontSize: 'var(--text-label)', color: '#00A868' }} className="font-medium mt-1">
            +{biggestGain.diff}pp ({biggestGain.previous}% → {biggestGain.current}%)
          </div>
        </div>

        {biggestDrop.diff < 0 && (
          <div className="border-2 rounded-card p-4" style={{ 
            backgroundColor: 'var(--color-destructive)10',
            borderColor: 'var(--color-destructive)30'
          }}>
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-5 h-5 text-destructive" />
              <span className="caption font-medium text-destructive uppercase">Biggest Drop</span>
            </div>
            <div className="font-medium text-card-foreground" style={{ fontSize: 'var(--text-h4)' }}>{biggestDrop.name}</div>
            <div style={{ fontSize: 'var(--text-label)' }} className="text-destructive font-medium mt-1">
              {biggestDrop.diff}pp ({biggestDrop.previous}% → {biggestDrop.current}%)
            </div>
          </div>
        )}
      </div>

      {/* All Changes */}
      <div className="space-y-2">
        <div className="caption font-medium text-muted-foreground uppercase tracking-wider mb-3">
          All Attribute Changes
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {changes.map((change) => {
            const IconComponent = (LucideIcons as any)[change.icon] || LucideIcons.Circle;
            
            const getTrendColor = () => {
              if (change.diff > 0) return { bg: '#00A86810', border: '#00A86830' };
              if (change.diff < 0) return { bg: 'var(--color-destructive)10', border: 'var(--color-destructive)30' };
              return { bg: 'var(--color-secondary)', border: 'var(--color-border)' };
            };

            const getTrendIcon = () => {
              if (change.diff > 0) return <TrendingUp className="w-4 h-4" style={{ color: '#00A868' }} />;
              if (change.diff < 0) return <TrendingDown className="w-4 h-4 text-destructive" />;
              return <Minus className="w-4 h-4 text-muted-foreground" />;
            };

            const getTextColor = () => {
              if (change.diff > 0) return '#00A868';
              if (change.diff < 0) return 'var(--color-destructive)';
              return 'var(--color-muted-foreground)';
            };

            const colors = getTrendColor();

            return (
              <div 
                key={change.name} 
                className="border-2 rounded-lg p-3"
                style={{ backgroundColor: colors.bg, borderColor: colors.border }}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <IconComponent size={14} style={{ color: change.color }} strokeWidth={2.5} />
                    <span className="caption font-medium text-card-foreground">{change.name}</span>
                  </div>
                  {getTrendIcon()}
                </div>
                <div style={{ fontSize: 'var(--text-label)', color: getTextColor() }} className="font-medium">
                  {change.diff > 0 ? '+' : ''}{change.diff}pp
                </div>
                <div className="caption text-muted-foreground mt-1">
                  {change.previous}% → {change.current}%
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}