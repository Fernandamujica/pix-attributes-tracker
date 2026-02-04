import { researchInsights } from '@/app/data/research-insights';
import { InsightCard } from '@/app/components/InsightCard';

export function ResearchTimeline() {
  return (
    <div className="space-y-8">
      {/* Timeline Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-medium text-card-foreground mb-1" style={{ fontSize: 'var(--text-h2)' }}>
            Wave-by-Wave Insights
          </h2>
          <p className="text-muted-foreground" style={{ fontSize: 'var(--text-label)' }}>
            Key findings from each research wave (W0-W5)
          </p>
        </div>
      </div>

      {/* Grid of Insight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {researchInsights.map((insight) => (
          <InsightCard key={insight.wave} insight={insight} />
        ))}
      </div>
    </div>
  );
}