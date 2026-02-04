import { attributes, getStatSig } from '@/app/data/attributes';
import * as LucideIcons from 'lucide-react';
import { TrendingUp, TrendingDown, Minus, Award } from 'lucide-react';

interface PerformanceChartProps {
  selectedWave: number;
}

export function PerformanceChart({ selectedWave }: PerformanceChartProps) {
  // Get data for selected wave
  const getScoresForWave = () => {
    return attributes.map(attr => {
      const statSig = getStatSig(attr.id, selectedWave);
      const prevWaveValue = selectedWave > 0 ? attr.newflow[selectedWave - 1] : attr.newflow[0];
      const changeFromPrev = attr.newflow[selectedWave] - prevWaveValue;
      
      return {
        id: attr.id,
        name: attr.name,
        icon: attr.icon,
        color: attr.color,
        category: attr.category,
        simplifiedFlow: attr.newflow[selectedWave],
        oldFlow: attr.oldflow[selectedWave],
        gap: attr.newflow[selectedWave] - attr.oldflow[selectedWave],
        statSig,
        changeFromPrev,
      };
    });
  };

  const scoreData = getScoresForWave().sort((a, b) => b.simplifiedFlow - a.simplifiedFlow);
  
  // Calculate stats
  const avgSimplified = Math.round(scoreData.reduce((sum, d) => sum + d.simplifiedFlow, 0) / scoreData.length);
  const avgOld = Math.round(scoreData.reduce((sum, d) => sum + d.oldFlow, 0) / scoreData.length);
  const topPerformer = scoreData[0];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-card p-4 border border-primary/20">
          <div className="caption text-muted-foreground uppercase tracking-wider mb-1">Simplified Avg</div>
          <div className="text-2xl font-medium" style={{ color: 'var(--color-primary)' }}>
            {avgSimplified}%
          </div>
        </div>
        
        <div className="bg-secondary rounded-card p-4 border border-border">
          <div className="caption text-muted-foreground uppercase tracking-wider mb-1">Old Flow Avg</div>
          <div className="text-2xl font-medium text-muted-foreground">
            {avgOld}%
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-card p-4 border border-green-500/20">
          <div className="caption text-muted-foreground uppercase tracking-wider mb-1">Advantage</div>
          <div className="text-2xl font-medium" style={{ color: '#00A868' }}>
            +{avgSimplified - avgOld}pp
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-500/10 to-amber-500/10 rounded-card p-4 border border-orange-500/20">
          <div className="caption text-muted-foreground uppercase tracking-wider mb-1">Top Performer</div>
          <div className="text-lg font-medium" style={{ color: topPerformer.color }}>
            {topPerformer.name}
          </div>
          <div className="caption text-muted-foreground">{topPerformer.simplifiedFlow}%</div>
        </div>
      </div>

      {/* Performance Comparison Table */}
      <div className="bg-card rounded-card shadow-sm border border-border overflow-hidden">
        <div className="p-6 border-b border-border">
          <h3 className="text-xl font-medium text-card-foreground">Performance Comparison by Attribute</h3>
          <p className="caption text-muted-foreground mt-1">
            Top 2 Box scores comparing Simplified Flow vs Old Flow
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary">
              <tr>
                <th className="text-left p-4 font-medium text-card-foreground border-b border-border" style={{ fontSize: 'var(--text-label)' }}>
                  Attribute
                </th>
                <th className="text-center p-4 font-medium text-card-foreground border-b border-border" style={{ fontSize: 'var(--text-label)' }}>
                  Category
                </th>
                <th className="text-center p-4 font-medium text-card-foreground border-b border-border" style={{ fontSize: 'var(--text-label)' }}>
                  Simplified Flow
                </th>
                <th className="text-center p-4 font-medium text-card-foreground border-b border-border" style={{ fontSize: 'var(--text-label)' }}>
                  Old Flow
                </th>
                <th className="text-center p-4 font-medium text-card-foreground border-b border-border" style={{ fontSize: 'var(--text-label)' }}>
                  Difference
                </th>
                <th className="text-center p-4 font-medium text-card-foreground border-b border-border" style={{ fontSize: 'var(--text-label)' }}>
                  vs Prev Wave
                </th>
                <th className="text-left p-4 font-medium text-card-foreground border-b border-border" style={{ fontSize: 'var(--text-label)' }}>
                  Visual Comparison
                </th>
              </tr>
            </thead>
            <tbody>
              {scoreData.map((item, index) => {
                const Icon = (LucideIcons as any)[item.icon] || LucideIcons.Circle;
                const isTop3 = index < 3;
                
                return (
                  <tr 
                    key={item.id} 
                    className="hover:bg-secondary/50 transition-colors border-b border-border"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${item.color}20` }}
                        >
                          <Icon className="w-4 h-4" style={{ color: item.color }} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-card-foreground">{item.name}</span>
                            {isTop3 && <Award className="w-4 h-4" style={{ color: '#FFD700' }} />}
                          </div>
                        </div>
                      </div>
                    </td>
                    
                    <td className="p-4 text-center">
                      <span 
                        className="caption px-2 py-1 rounded-full"
                        style={{ 
                          backgroundColor: item.category === 'core' ? '#820AD120' : '#FF663320',
                          color: item.category === 'core' ? '#820AD1' : '#FF6633'
                        }}
                      >
                        {item.category === 'core' ? 'Core' : 'Func'}
                      </span>
                    </td>
                    
                    <td className="p-4 text-center">
                      <div className="text-lg font-medium" style={{ color: item.color }}>
                        {item.simplifiedFlow}%
                      </div>
                    </td>
                    
                    <td className="p-4 text-center">
                      <div className="text-lg font-medium text-muted-foreground opacity-60">
                        {item.oldFlow}%
                      </div>
                    </td>
                    
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        {item.gap > 0 && <TrendingUp className="w-4 h-4" style={{ color: '#00A868' }} />}
                        {item.gap < 0 && <TrendingDown className="w-4 h-4" style={{ color: '#DA1E28' }} />}
                        {item.gap === 0 && <Minus className="w-4 h-4 text-muted-foreground" />}
                        <span 
                          className="font-medium"
                          style={{ 
                            color: item.gap > 0 ? '#00A868' : item.gap < 0 ? '#DA1E28' : '#767676'
                          }}
                        >
                          {item.gap > 0 ? '+' : ''}{item.gap}pp
                        </span>
                      </div>
                    </td>
                    
                    <td className="p-4 text-center">
                      {item.statSig ? (
                        <div 
                          className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs bg-amber-50 border border-amber-200"
                          title={item.statSig.note || ''}
                        >
                          <span className="flex items-center justify-center w-3.5 h-3.5 rounded-full bg-amber-500 text-white text-[8px] font-bold">✱</span>
                          <span className="font-medium" style={{ color: item.changeFromPrev > 0 ? '#00A868' : '#DA1E28' }}>
                            {item.changeFromPrev > 0 ? '+' : ''}{item.changeFromPrev}pp
                          </span>
                        </div>
                      ) : selectedWave > 0 && item.changeFromPrev !== 0 ? (
                        <span 
                          className="text-sm opacity-60"
                          style={{ color: item.changeFromPrev > 0 ? '#00A868' : item.changeFromPrev < 0 ? '#DA1E28' : '#767676' }}
                        >
                          {item.changeFromPrev > 0 ? '+' : ''}{item.changeFromPrev}pp
                        </span>
                      ) : (
                        <span className="text-sm text-muted-foreground opacity-40">—</span>
                      )}
                    </td>
                    
                    <td className="p-4">
                      <div className="space-y-1">
                        {/* Simplified Flow Bar */}
                        <div className="flex items-center gap-2">
                          <span className="caption text-muted-foreground w-8">New</span>
                          <div className="flex-1 h-6 bg-secondary rounded-full overflow-hidden">
                            <div 
                              className="h-full rounded-full flex items-center justify-end pr-2 transition-all duration-500"
                              style={{ 
                                width: `${item.simplifiedFlow}%`,
                                backgroundColor: item.color
                              }}
                            >
                              <span className="caption font-medium text-white">
                                {item.simplifiedFlow}%
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Old Flow Bar */}
                        <div className="flex items-center gap-2 opacity-50">
                          <span className="caption text-muted-foreground w-8">Old</span>
                          <div className="flex-1 h-6 bg-secondary rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-muted-foreground rounded-full flex items-center justify-end pr-2 transition-all duration-500"
                              style={{ width: `${item.oldFlow}%` }}
                            >
                              <span className="caption font-medium text-white">
                                {item.oldFlow}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}