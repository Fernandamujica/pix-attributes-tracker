import { WaveData } from '@/app/data/attributes';

interface SidebarProps {
  waves: WaveData[];
  activeWave: number;
  onSelect: (waveId: number) => void;
  currentView: 'overview' | 'attributes' | 'research';
}

export function Sidebar({ waves, activeWave, onSelect, currentView }: SidebarProps) {
  return (
    <aside className="bg-sidebar text-sidebar-foreground p-6 flex flex-col gap-1 min-h-screen border-r border-sidebar-border" style={{ 
      backgroundColor: '#1a1a1a',
      color: 'rgba(255, 255, 255, 0.96)'
    }}>
      {currentView === 'attributes' && (
        <>
          <div className="caption uppercase tracking-wide mb-3 mt-6" style={{ 
            color: 'rgba(255, 255, 255, 0.6)'
          }}>
            Rollout Waves
          </div>
          <div className="flex lg:flex-col gap-1">
            {waves.map((wave) => (
              <div
                key={wave.id}
                onClick={() => onSelect(wave.id)}
                className={`
                  px-4 py-2.5 rounded-md cursor-pointer transition-all caption font-medium
                  flex items-center justify-between
                `}
                style={{
                  backgroundColor: activeWave === wave.id ? 'var(--color-primary)' : 'transparent',
                  color: activeWave === wave.id ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.7)',
                }}
                onMouseEnter={(e) => {
                  if (activeWave !== wave.id) {
                    e.currentTarget.style.backgroundColor = 'rgba(130, 10, 209, 0.2)';
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeWave !== wave.id) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
                  }
                }}
              >
                <span>{wave.month} ({wave.name})</span>
                {activeWave === wave.id && <span className="text-[10px] opacity-75">●</span>}
              </div>
            ))}
          </div>
        </>
      )}
    </aside>
  );
}