import { waves } from '@/app/data/attributes';
import { Trophy, TrendingUp, TrendingDown } from 'lucide-react';

export function CompetitiveQualityOverview() {
  // Calculate key metrics
  const latestWave = waves[waves.length - 1];
  const firstWave = waves[0];
  const latestTop2Box = latestWave.competitiveQuality.topTwoBox;
  const firstTop2Box = firstWave.competitiveQuality.topTwoBox;
  const improvement = latestTop2Box - firstTop2Box;

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-primary to-accent rounded-card p-8 text-primary-foreground shadow-xl">
        <h2 className="text-3xl font-medium mb-2">🏆 Competitive Quality Evolution</h2>
        <p className="opacity-90">
          How Pix compares to competitors across all waves (Jun–Dec 2025) - Simplified vs Old Flow
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-card p-6 border border-primary/20">
          <div className="caption text-muted-foreground uppercase tracking-wider mb-2">Latest Top 2 Box</div>
          <div className="text-3xl font-medium" style={{ color: 'var(--color-primary)' }}>
            {latestTop2Box}%
          </div>
          <p className="caption text-muted-foreground mt-2">Simplified Flow (Dec)</p>
        </div>
        
        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-card p-6 border border-green-500/20">
          <div className="caption text-muted-foreground uppercase tracking-wider mb-2">Overall Change</div>
          <div className="flex items-center gap-2">
            <div className="text-3xl font-medium" style={{ color: improvement >= 0 ? '#00A868' : '#DA1E28' }}>
              {improvement > 0 ? '+' : ''}{improvement}pp
            </div>
            {improvement > 0 && <TrendingUp className="w-6 h-6" style={{ color: '#00A868' }} />}
            {improvement < 0 && <TrendingDown className="w-6 h-6" style={{ color: '#DA1E28' }} />}
          </div>
          <p className="caption text-muted-foreground mt-2">Jun → Dec progression</p>
        </div>
        
        <div className="bg-gradient-to-br from-orange-500/10 to-amber-500/10 rounded-card p-6 border border-orange-500/20">
          <div className="caption text-muted-foreground uppercase tracking-wider mb-2">Peak Performance</div>
          <div className="text-3xl font-medium" style={{ color: '#FF6633' }}>
            {Math.max(...waves.map(w => w.competitiveQuality.topTwoBox))}%
          </div>
          <p className="caption text-muted-foreground mt-2">
            W{waves.findIndex(w => w.competitiveQuality.topTwoBox === Math.max(...waves.map(w => w.competitiveQuality.topTwoBox)))} 
            {' - '}
            {waves.find(w => w.competitiveQuality.topTwoBox === Math.max(...waves.map(w => w.competitiveQuality.topTwoBox)))?.month}
          </p>
        </div>
      </div>

      {/* Wave-by-Wave Comparison */}
      <div className="bg-card rounded-card shadow-sm border border-border">
        <div className="p-6 border-b border-border">
          <h3 className="text-xl font-medium text-card-foreground">Wave-by-Wave Evolution</h3>
          <p className="caption text-muted-foreground mt-1">
            Comparing Simplified Flow vs Old Flow competitive positioning
          </p>
        </div>

        <div className="p-6 space-y-6">
          {waves.map((wave, index) => {
            const newTop2Box = wave.competitiveQuality.topTwoBox;
            const oldTop2Box = wave.competitiveQualityOldFlow?.topTwoBox || 0;
            const diff = newTop2Box - oldTop2Box;
            const isPeak = newTop2Box >= 77;
            const isLow = newTop2Box <= 70;
            
            return (
              <div 
                key={wave.id} 
                className="border border-border rounded-card p-5 hover:shadow-md transition-all"
              >
                {/* Wave Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center font-medium text-white"
                      style={{ backgroundColor: isPeak ? '#00A868' : isLow ? '#DA1E28' : 'var(--color-primary)' }}
                    >
                      <span style={{ fontSize: 'var(--text-label)' }}>{wave.name}</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-card-foreground">{wave.month} 2025</h4>
                      <p className="caption text-muted-foreground">
                        {index === 0 && 'Baseline'}
                        {index === 1 && 'Initial Rollout'}
                        {index === 2 && 'Expanding'}
                        {index === 3 && 'Stabilization'}
                        {index === 4 && 'Peak Performance'}
                        {index === 5 && 'Technical Issues'}
                      </p>
                    </div>
                  </div>
                  
                  {isPeak && (
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 border border-green-500/40">
                      <Trophy className="w-4 h-4" style={{ color: '#00A868' }} />
                      <span className="caption font-medium" style={{ color: '#00A868' }}>Peak</span>
                    </div>
                  )}
                  
                  {isLow && (
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/40">
                      <TrendingDown className="w-4 h-4" style={{ color: '#DA1E28' }} />
                      <span className="caption font-medium" style={{ color: '#DA1E28' }}>Low</span>
                    </div>
                  )}
                </div>

                {/* Top 2 Box Comparison */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="caption text-muted-foreground mb-2">Simplified Flow - Top 2 Box</div>
                    <div className="text-3xl font-medium" style={{ color: 'var(--color-primary)' }}>
                      {newTop2Box}%
                    </div>
                  </div>
                  <div>
                    <div className="caption text-muted-foreground mb-2">Old Flow - Top 2 Box</div>
                    <div className="text-3xl font-medium text-muted-foreground opacity-60">
                      {oldTop2Box}%
                    </div>
                  </div>
                </div>

                {/* Advantage Indicator */}
                <div className="mb-4">
                  <div 
                    className="text-center py-2 px-4 rounded-button font-medium"
                    style={{ 
                      backgroundColor: diff > 0 ? '#00A86820' : '#DA1E2820',
                      color: diff > 0 ? '#00A868' : '#DA1E28'
                    }}
                  >
                    Simplified Flow {diff > 0 ? 'leads by' : 'trails by'} {Math.abs(diff)}pp
                  </div>
                </div>

                {/* Detailed Breakdown */}
                <div className="space-y-3">
                  {/* Simplified Flow Breakdown */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="caption font-medium text-card-foreground">Simplified Flow Distribution</span>
                    </div>
                    <div className="relative h-10 rounded-button overflow-hidden border border-border shadow-sm">
                      <div className="absolute inset-0 flex">
                        {/* Much Better */}
                        <div 
                          className="flex items-center justify-center transition-all duration-500 hover:opacity-80"
                          style={{ 
                            width: `${wave.competitiveQuality.muchBetter}%`,
                            backgroundColor: '#5F0897'
                          }}
                          title={`Much Better: ${wave.competitiveQuality.muchBetter}%`}
                        >
                          {wave.competitiveQuality.muchBetter >= 10 && (
                            <span className="caption font-medium text-white">
                              {wave.competitiveQuality.muchBetter}%
                            </span>
                          )}
                        </div>
                        
                        {/* Better */}
                        <div 
                          className="flex items-center justify-center transition-all duration-500 hover:opacity-80"
                          style={{ 
                            width: `${wave.competitiveQuality.better}%`,
                            backgroundColor: '#820AD1'
                          }}
                          title={`Better: ${wave.competitiveQuality.better}%`}
                        >
                          {wave.competitiveQuality.better >= 10 && (
                            <span className="caption font-medium text-white">
                              {wave.competitiveQuality.better}%
                            </span>
                          )}
                        </div>
                        
                        {/* Same */}
                        <div 
                          className="flex items-center justify-center transition-all duration-500 hover:opacity-80"
                          style={{ 
                            width: `${wave.competitiveQuality.same}%`,
                            backgroundColor: '#767676'
                          }}
                          title={`Same: ${wave.competitiveQuality.same}%`}
                        >
                          {wave.competitiveQuality.same >= 10 && (
                            <span className="caption font-medium text-white">
                              {wave.competitiveQuality.same}%
                            </span>
                          )}
                        </div>
                        
                        {/* Worse + Much Worse */}
                        <div 
                          className="flex items-center justify-center transition-all duration-500 hover:opacity-80"
                          style={{ 
                            width: `${wave.competitiveQuality.worse + wave.competitiveQuality.muchWorse}%`,
                            backgroundColor: '#DA1E28'
                          }}
                          title={`Worse/Much Worse: ${wave.competitiveQuality.worse + wave.competitiveQuality.muchWorse}%`}
                        >
                          {(wave.competitiveQuality.worse + wave.competitiveQuality.muchWorse) >= 4 && (
                            <span className="caption font-medium text-white">
                              {wave.competitiveQuality.worse + wave.competitiveQuality.muchWorse}%
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Old Flow Breakdown */}
                  {wave.competitiveQualityOldFlow && (
                    <div className="opacity-60">
                      <div className="flex items-center justify-between mb-2">
                        <span className="caption font-medium text-muted-foreground">Old Flow Distribution</span>
                      </div>
                      <div className="relative h-10 rounded-button overflow-hidden border border-border shadow-sm">
                        <div className="absolute inset-0 flex">
                          {/* Much Better */}
                          <div 
                            className="flex items-center justify-center transition-all duration-500"
                            style={{ 
                              width: `${wave.competitiveQualityOldFlow.muchBetter}%`,
                              backgroundColor: '#5F0897'
                            }}
                          >
                            {wave.competitiveQualityOldFlow.muchBetter >= 10 && (
                              <span className="caption font-medium text-white">
                                {wave.competitiveQualityOldFlow.muchBetter}%
                              </span>
                            )}
                          </div>
                          
                          {/* Better */}
                          <div 
                            className="flex items-center justify-center transition-all duration-500"
                            style={{ 
                              width: `${wave.competitiveQualityOldFlow.better}%`,
                              backgroundColor: '#820AD1'
                            }}
                          >
                            {wave.competitiveQualityOldFlow.better >= 10 && (
                              <span className="caption font-medium text-white">
                                {wave.competitiveQualityOldFlow.better}%
                              </span>
                            )}
                          </div>
                          
                          {/* Same */}
                          <div 
                            className="flex items-center justify-center transition-all duration-500"
                            style={{ 
                              width: `${wave.competitiveQualityOldFlow.same}%`,
                              backgroundColor: '#767676'
                            }}
                          >
                            {wave.competitiveQualityOldFlow.same >= 10 && (
                              <span className="caption font-medium text-white">
                                {wave.competitiveQualityOldFlow.same}%
                              </span>
                            )}
                          </div>
                          
                          {/* Worse + Much Worse */}
                          <div 
                            className="flex items-center justify-center transition-all duration-500"
                            style={{ 
                              width: `${wave.competitiveQualityOldFlow.worse + wave.competitiveQualityOldFlow.muchWorse}%`,
                              backgroundColor: '#DA1E28'
                            }}
                          >
                            {(wave.competitiveQualityOldFlow.worse + wave.competitiveQualityOldFlow.muchWorse) >= 4 && (
                              <span className="caption font-medium text-white">
                                {wave.competitiveQualityOldFlow.worse + wave.competitiveQualityOldFlow.muchWorse}%
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Legend */}
                <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#5F0897' }}></div>
                    <span className="caption text-muted-foreground">Much Better</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#820AD1' }}></div>
                    <span className="caption text-muted-foreground">Better</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#767676' }}></div>
                    <span className="caption text-muted-foreground">Same</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#DA1E28' }}></div>
                    <span className="caption text-muted-foreground">Worse</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
