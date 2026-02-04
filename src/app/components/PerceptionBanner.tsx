import { WaveData, waves } from '@/app/data/attributes';
import { Users, TrendingUp, TrendingDown, Eye } from 'lucide-react';

interface PerceptionBannerProps {
  wave: WaveData;
  baselinePerception: number;
}

export function PerceptionBanner({ wave, baselinePerception }: PerceptionBannerProps) {
  const delta = wave.perception - baselinePerception;
  
  // Create visual perception bar
  const perceptionWidth = wave.perception;
  const remainingWidth = 100 - wave.perception;
  const perceptionTrend = waves.map((w) => ({
    id: w.id,
    name: w.name,
    value: w.perception,
  }));

  return (
    <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-card p-6 border-2 border-primary/20 shadow-md mb-6">
      <div className="flex items-start justify-between gap-6">
        {/* Left Section - Main Info */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Eye className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
            </div>
            <div>
              <h4 className="font-medium text-card-foreground">User Perception - {wave.name}</h4>
              <p className="caption text-muted-foreground">Users who noticed changes</p>
            </div>
          </div>
          
          {/* Visual Percentage Bar */}
          <div className="mb-3">
            <div className="flex items-center gap-3 mb-2">
              <div className="text-4xl font-medium" style={{ color: 'var(--color-primary)' }}>
                {wave.perception}%
              </div>
              {delta !== 0 && (
                <div className={`flex items-center gap-1 px-3 py-1 rounded-button ${
                  delta > 0 ? 'bg-[#00A868]/10' : 'bg-destructive/10'
                }`}>
                  {delta > 0 ? (
                    <TrendingUp className="w-4 h-4" style={{ color: '#00A868' }} />
                  ) : (
                    <TrendingDown className="w-4 h-4" style={{ color: 'var(--color-destructive)' }} />
                  )}
                  <span className={`caption font-medium ${
                    delta > 0 ? 'text-[#00A868]' : 'text-destructive'
                  }`}>
                    {delta > 0 ? '+' : ''}{delta}pp
                  </span>
                </div>
              )}
            </div>
            
            {/* Horizontal Bar Chart */}
            <div className="relative h-8 bg-muted rounded-button overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-accent flex items-center justify-end pr-3 transition-all duration-500"
                style={{ width: `${perceptionWidth}%` }}
              >
                <Users className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="absolute inset-0 flex items-center px-3 pointer-events-none">
                <span className="caption font-medium text-primary-foreground mix-blend-difference">
                  {wave.perception}% noticed
                </span>
              </div>
            </div>
            
            {/* Legend */}
            <div className="flex justify-between mt-2">
              <span className="caption text-muted-foreground">
                <Users className="w-3 h-3 inline mr-1" />
                Noticed: {wave.perception}%
              </span>
              <span className="caption text-muted-foreground">
                Did not notice: {remainingWidth}%
              </span>
            </div>
          </div>
        </div>

        {/* Right Section - Mini Chart */}
        <div className="hidden md:block">
          <div className="caption text-muted-foreground uppercase tracking-wider mb-2 text-right">
            6-Month Trend
          </div>
          <div className="flex gap-1.5 items-end">
            {perceptionTrend.map((item) => {
              const isActive = item.id === wave.id;
              const barColor = isActive ? 'var(--color-primary)' : 'var(--color-chart-2)';
              return (
                <div key={item.id} className="flex flex-col items-center gap-1">
                  <div
                    className="w-6 rounded-sm transition-all duration-300 hover:opacity-80"
                    style={{
                      height: `${item.value * 1.5}px`,
                      backgroundColor: barColor,
                      maxHeight: '70px',
                    }}
                    title={`${item.name}: ${item.value}%`}
                  ></div>
                  <span className="caption text-muted-foreground">{item.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}