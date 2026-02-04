import { WaveData } from '@/app/data/attributes';

interface NavigationBarProps {
  view: 'overview' | 'attributes' | 'research';
  onViewChange: (view: 'overview' | 'attributes' | 'research') => void;
  waves: WaveData[];
  activeWave: number;
  onWaveSelect: (waveId: number) => void;
  onSectionClick: (sectionId: string) => void;
}

export function NavigationBar({ 
  view, 
  onViewChange, 
  waves, 
  activeWave, 
  onWaveSelect,
  onSectionClick 
}: NavigationBarProps) {
  
  // Define sections for each view
  const sections = {
    overview: [
      { id: 'line-charts', label: 'Line Charts', emoji: '📈' },
      { id: 'evolution-overview', label: 'Evolution Overview', emoji: '🎯' },
      { id: 'competitive-quality', label: 'Competitive Quality', emoji: '🏆' },
    ],
    research: [
      { id: 'research-timeline', label: 'Research Timeline', emoji: '📅' },
      { id: 'summary-table', label: 'Summary Table', emoji: '📊' },
    ],
    attributes: [] // Will show wave selector instead
  };

  return (
    <div className="sticky top-0 z-50 bg-background border-b border-border mb-8 pb-4 pt-2">
      {/* Top Row: View Toggle Centered */}
      <div className="flex items-center justify-center mb-4">
        {/* View Toggle - Centered */}
        <div className="bg-card rounded-card p-1 shadow-sm border border-border inline-flex gap-1">
          <button
            onClick={() => onViewChange('overview')}
            className={`px-4 py-2 rounded-button caption font-medium transition-all ${
              view === 'overview' 
                ? 'bg-primary text-primary-foreground shadow-sm' 
                : 'text-muted-foreground hover:text-card-foreground'
            }`}
            style={{
              backgroundColor: view === 'overview' ? 'var(--color-primary)' : 'transparent',
              color: view === 'overview' ? 'rgba(255, 255, 255, 1)' : 'rgba(115, 115, 115, 1)'
            }}
          >
            📈 Total Overview
          </button>
          <button
            onClick={() => onViewChange('research')}
            className={`px-4 py-2 rounded-button caption font-medium transition-all ${
              view === 'research' 
                ? 'bg-primary text-primary-foreground shadow-sm' 
                : 'text-muted-foreground hover:text-card-foreground'
            }`}
            style={{
              backgroundColor: view === 'research' ? 'var(--color-primary)' : 'transparent',
              color: view === 'research' ? 'rgba(255, 255, 255, 1)' : 'rgba(115, 115, 115, 1)'
            }}
          >
            📊 Research Insights
          </button>
          <button
            onClick={() => onViewChange('attributes')}
            className={`px-4 py-2 rounded-button caption font-medium transition-all ${
              view === 'attributes' 
                ? 'bg-primary text-primary-foreground shadow-sm' 
                : 'text-muted-foreground hover:text-card-foreground'
            }`}
            style={{
              backgroundColor: view === 'attributes' ? 'var(--color-primary)' : 'transparent',
              color: view === 'attributes' ? 'rgba(255, 255, 255, 1)' : 'rgba(115, 115, 115, 1)'
            }}
          >
            🔍 Wave Comparison
          </button>
        </div>
      </div>

      {/* Bottom Row: Section Navigation or Wave Selector */}
      <div className="flex justify-center">
        {view === 'attributes' ? (
          // Wave Selector for Wave Comparison view
          <div className="flex gap-2 bg-card rounded-card p-1 shadow-sm border border-border">
            {waves.map((wave) => (
              <button
                key={wave.id}
                onClick={() => onWaveSelect(wave.id)}
                className="px-4 py-2 rounded-button caption font-medium transition-all"
                style={{
                  backgroundColor: activeWave === wave.id ? 'var(--color-primary)' : 'transparent',
                  color: activeWave === wave.id ? 'rgba(255, 255, 255, 1)' : 'rgba(115, 115, 115, 1)',
                }}
              >
                {wave.month} ({wave.name})
              </button>
            ))}
          </div>
        ) : (
          // Section Navigation for Overview and Research views
          <div className="flex gap-2 bg-card rounded-card p-1 shadow-sm border border-border">
            {sections[view].map((section) => (
              <button
                key={section.id}
                onClick={() => onSectionClick(section.id)}
                className="px-4 py-2 rounded-button caption font-medium transition-all text-muted-foreground hover:text-card-foreground hover:bg-secondary"
                style={{
                  color: 'rgba(115, 115, 115, 1)'
                }}
              >
                {section.emoji} {section.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}