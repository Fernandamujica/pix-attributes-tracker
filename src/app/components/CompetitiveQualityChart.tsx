import { WaveData } from '@/app/data/attributes';
import { Trophy, TrendingUp, TrendingDown } from 'lucide-react';

interface CompetitiveQualityChartProps {
  wave: WaveData;
}

export function CompetitiveQualityChart({ wave }: CompetitiveQualityChartProps) {
  const { competitiveQuality, competitiveQualityOldFlow } = wave;
  
  // Calculate if we're at a peak or low
  const isPeak = competitiveQuality.topTwoBox >= 77;
  const isLow = competitiveQuality.topTwoBox <= 70;
  
  return (
    <div className="bg-card rounded-card p-6 shadow-sm border border-border mb-8">
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Trophy className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
            </div>
            <div>
              <h3 className="font-medium text-card-foreground" style={{ fontSize: 'var(--text-h4)' }}>
                Pix Competitive Quality - {wave.month} 2025
              </h3>
              <p className="caption text-muted-foreground mt-1">
                Nubank vs. Market: Simplified Flow vs Old Flow
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-card p-4 text-center border border-primary/20">
          <div className="caption text-muted-foreground uppercase tracking-wider mb-1">
            Top 2 Box New
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="text-2xl font-medium" style={{ color: '#820AD1' }}>
              {competitiveQuality.topTwoBox}%
            </div>
            {isPeak && <TrendingUp className="w-5 h-5" style={{ color: '#00A868' }} />}
            {isLow && <TrendingDown className="w-5 h-5" style={{ color: '#DA1E28' }} />}
          </div>
        </div>
        
        <div className="bg-secondary rounded-card p-4 text-center border border-border">
          <div className="caption text-muted-foreground uppercase tracking-wider mb-1">
            Top 2 Box Old
          </div>
          <div className="text-2xl font-medium text-muted-foreground">
            {competitiveQualityOldFlow?.topTwoBox}%
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-card p-4 text-center border border-green-500/20">
          <div className="caption text-muted-foreground uppercase tracking-wider mb-1">
            Difference
          </div>
          <div className="text-2xl font-medium" style={{ color: '#00A868' }}>
            +{competitiveQuality.topTwoBox - (competitiveQualityOldFlow?.topTwoBox || 0)}pp
          </div>
        </div>
      </div>

      {/* Visual Comparison - Horizontal Bars */}
      <div className="space-y-4 mb-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="caption font-medium text-card-foreground">Simplified Flow</span>
            <span className="caption font-medium" style={{ color: '#820AD1' }}>{competitiveQuality.topTwoBox}%</span>
          </div>
          <div className="relative h-12 rounded-button overflow-hidden shadow-inner border border-border">
            <div className="absolute inset-0 flex">
              {/* Much Better */}
              <div 
                className="flex items-center justify-center transition-all duration-500"
                style={{ 
                  width: `${competitiveQuality.muchBetter}%`,
                  backgroundColor: '#5F0897'
                }}
              >
                {competitiveQuality.muchBetter >= 8 && (
                  <span className="caption font-medium text-white">
                    {competitiveQuality.muchBetter}%
                  </span>
                )}
              </div>
              
              {/* Better */}
              <div 
                className="flex items-center justify-center transition-all duration-500"
                style={{ 
                  width: `${competitiveQuality.better}%`,
                  backgroundColor: '#820AD1'
                }}
              >
                {competitiveQuality.better >= 8 && (
                  <span className="caption font-medium text-white">
                    {competitiveQuality.better}%
                  </span>
                )}
              </div>
              
              {/* Same */}
              <div 
                className="flex items-center justify-center transition-all duration-500"
                style={{ 
                  width: `${competitiveQuality.same}%`,
                  backgroundColor: '#767676'
                }}
              >
                {competitiveQuality.same >= 8 && (
                  <span className="caption font-medium text-white">
                    {competitiveQuality.same}%
                  </span>
                )}
              </div>
              
              {/* Worse + Much Worse */}
              <div 
                className="flex items-center justify-center transition-all duration-500"
                style={{ 
                  width: `${competitiveQuality.worse + competitiveQuality.muchWorse}%`,
                  backgroundColor: '#DA1E28'
                }}
              >
                {(competitiveQuality.worse + competitiveQuality.muchWorse) >= 4 && (
                  <span className="caption font-medium text-white">
                    {competitiveQuality.worse + competitiveQuality.muchWorse}%
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {competitiveQualityOldFlow && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="caption font-medium text-muted-foreground">Old Flow</span>
              <span className="caption font-medium text-muted-foreground">{competitiveQualityOldFlow.topTwoBox}%</span>
            </div>
            <div className="relative h-12 rounded-button overflow-hidden shadow-inner border border-border opacity-70">
              <div className="absolute inset-0 flex">
                {/* Much Better */}
                <div 
                  className="flex items-center justify-center transition-all duration-500"
                  style={{ 
                    width: `${competitiveQualityOldFlow.muchBetter}%`,
                    backgroundColor: '#5F0897'
                  }}
                >
                  {competitiveQualityOldFlow.muchBetter >= 8 && (
                    <span className="caption font-medium text-white">
                      {competitiveQualityOldFlow.muchBetter}%
                    </span>
                  )}
                </div>
                
                {/* Better */}
                <div 
                  className="flex items-center justify-center transition-all duration-500"
                  style={{ 
                    width: `${competitiveQualityOldFlow.better}%`,
                    backgroundColor: '#820AD1'
                  }}
                >
                  {competitiveQualityOldFlow.better >= 8 && (
                    <span className="caption font-medium text-white">
                      {competitiveQualityOldFlow.better}%
                    </span>
                  )}
                </div>
                
                {/* Same */}
                <div 
                  className="flex items-center justify-center transition-all duration-500"
                  style={{ 
                    width: `${competitiveQualityOldFlow.same}%`,
                    backgroundColor: '#767676'
                  }}
                >
                  {competitiveQualityOldFlow.same >= 8 && (
                    <span className="caption font-medium text-white">
                      {competitiveQualityOldFlow.same}%
                    </span>
                  )}
                </div>
                
                {/* Worse + Much Worse */}
                <div 
                  className="flex items-center justify-center transition-all duration-500"
                  style={{ 
                    width: `${competitiveQualityOldFlow.worse + competitiveQualityOldFlow.muchWorse}%`,
                    backgroundColor: '#DA1E28'
                  }}
                >
                  {(competitiveQualityOldFlow.worse + competitiveQualityOldFlow.muchWorse) >= 4 && (
                    <span className="caption font-medium text-white">
                      {competitiveQualityOldFlow.worse + competitiveQualityOldFlow.muchWorse}%
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Analysis Box */}
      <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-card p-4 border border-primary/20">
        <h4 className="font-medium text-card-foreground mb-2" style={{ fontSize: 'var(--text-label)' }}>
          Wave Analysis
        </h4>
        <p className="caption text-muted-foreground leading-relaxed">
          {wave.id === 0 && "Baseline: Simplified Flow already shows +1pp advantage (77% vs 76%), establishing superiority from the start with 'Much Better' at 41%."}
          {wave.id === 1 && "Rollout Start: Simplified Flow maintains +3pp advantage (77% vs 74%), with 'Much Better' perception at 40% vs 38% for old flow."}
          {wave.id === 2 && "Rollout Expansion: Simplified Flow at +3pp (75% vs 72%). Commoditization increasing ('Same' at 22% vs 24%), but maintains consistent lead."}
          {wave.id === 3 && "Stabilization: Simplified Flow at +5pp advantage (75% vs 70%). Largest gap observed so far, with 'Same' stable at 22% vs 26%."}
          {wave.id === 4 && "🏆 Peak Excellence: Simplified Flow reaches +7pp superiority (77% vs 70%) with 43% 'Much Better'. Largest gap in the series, validating simplicity."}
          {wave.id === 5 && "⚠️ Technical Instabilities: Both flows decline, Simplified Flow now at -3pp (70% vs 73%). 'Same' rises to 26% vs 29%, indicating need for action."}
        </p>
      </div>
    </div>
  );
}