import { attributes } from '@/app/data/attributes';
import * as LucideIcons from 'lucide-react';

interface AttributeCardsProps {
  waveIndex: number;
}

export function AttributeCards({ waveIndex }: AttributeCardsProps) {
  const coreAttributes = attributes.filter((a) => a.category === 'core');
  const funcAttributes = attributes.filter((a) => a.category === 'func');

  const renderCard = (attr: typeof attributes[0]) => {
    const diff = attr.newflow[waveIndex] - attr.oldflow[waveIndex];
    const diffLabel = diff > 0 ? `+${diff}` : diff;
    const IconComponent = (LucideIcons as any)[attr.icon] || LucideIcons.Circle;

    return (
      <div
        key={attr.id}
        className="bg-card p-5 rounded-card border border-border shadow-sm hover:shadow-md transition-all duration-200"
      >
        <div className="flex justify-between items-center pb-3 border-b border-border">
          <div className="flex items-center gap-2">
            <IconComponent size={18} style={{ color: attr.color }} strokeWidth={2.5} />
            <h4 className="font-medium text-card-foreground" style={{ fontSize: 'var(--text-label)' }}>{attr.name}</h4>
          </div>
          <span className="caption font-medium text-muted-foreground bg-secondary px-2 py-0.5 rounded uppercase">
            {attr.category}
          </span>
        </div>

        <div className="space-y-3 mt-4">
          <div className="flex justify-between items-center p-2 rounded bg-secondary border border-border">
            <span className="caption font-medium text-muted-foreground">Legacy</span>
            <span style={{ fontSize: 'var(--text-label)' }} className="font-medium text-muted-foreground">
              {attr.oldflow[waveIndex]}%
            </span>
          </div>
          <div className="flex justify-between items-center p-2 rounded border-2" style={{ 
            backgroundColor: `${attr.color}10`,
            borderColor: `${attr.color}30`
          }}>
            <span className="caption font-medium" style={{ color: attr.color }}>Simplified Flow</span>
            <span style={{ fontSize: 'var(--text-label)', color: attr.color }} className="font-medium">
              {attr.newflow[waveIndex]}%
            </span>
          </div>
          <div className="flex justify-between items-center px-1">
            <span className="caption font-medium text-muted-foreground uppercase">Net Impact</span>
            <span
              className={`caption font-medium ${
                diff > 0 ? 'text-[#00A868]' : diff < 0 ? 'text-destructive' : 'text-muted-foreground'
              }`}
            >
              {diffLabel}pp
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-card-foreground" style={{ fontSize: 'var(--text-h4)' }}>Core Attributes</h3>
          <span className="caption font-medium text-muted-foreground uppercase tracking-wider">
            {coreAttributes.length} Metrics
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {coreAttributes.map(renderCard)}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-card-foreground" style={{ fontSize: 'var(--text-h4)' }}>Functional Attributes</h3>
          <span className="caption font-medium text-muted-foreground uppercase tracking-wider">
            {funcAttributes.length} Metrics
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
          {funcAttributes.map(renderCard)}
        </div>
      </div>
    </>
  );
}