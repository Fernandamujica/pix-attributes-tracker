interface DashboardHeaderProps {
  waveName: string;
  waveMonth: string;
}

export function DashboardHeader({ waveName, waveMonth }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
      <div>
        <h2 className="font-medium text-card-foreground" style={{ fontSize: 'var(--text-h2)' }}>
          {waveMonth} ({waveName}) - Old Flow vs Simplified Flow
        </h2>
        <p className="text-muted-foreground mt-1" style={{ fontSize: 'var(--text-label)' }}>
          Comparative View: Simplified Flow vs Old Flow
        </p>
      </div>

      <div className="flex gap-6 items-center">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded bg-muted-foreground opacity-60"></span> 
          Old Flow
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded" style={{ backgroundColor: 'var(--color-primary)' }}></span>
          Simplified Flow
        </div>
      </div>
    </div>
  );
}