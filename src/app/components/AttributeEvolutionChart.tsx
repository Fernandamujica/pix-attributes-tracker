import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { attributes, periods, getStatSig } from '@/app/data/attributes';
import * as LucideIcons from 'lucide-react';

export function AttributeEvolutionChart() {
  // Create chart data for all attributes evolution
  const chartData = periods.map((period, idx) => {
    const dataPoint: any = { name: period.split(' ')[0] };
    
    // Add all attributes to this time point
    attributes.forEach(attr => {
      dataPoint[`${attr.name}_new`] = attr.newflow[idx];
      dataPoint[`${attr.name}_old`] = attr.oldflow[idx];
    });
    
    return dataPoint;
  });

  // Custom label component to show percentage on points
  const renderCustomizedLabel = (props: any) => {
    const { x, y, value } = props;
    return (
      <text 
        x={x} 
        y={y - 10} 
        fill="var(--color-text-primary)" 
        textAnchor="middle" 
        style={{ fontSize: '9px', fontWeight: '600', fontFamily: 'var(--font-body)' }}
      >
        {value}%
      </text>
    );
  };

  // Calculate stats for summary boxes
  const getAttributeTrend = (attr: typeof attributes[0]) => {
    const firstNew = attr.newflow[0];
    const lastNew = attr.newflow[attr.newflow.length - 1];
    const lastOld = attr.oldflow[attr.oldflow.length - 1];
    return {
      newFlowChange: lastNew - firstNew,
      gap: lastNew - lastOld,
    };
  };

  // Get attributes in each category
  const leadingAttrs = attributes.filter((a) => getAttributeTrend(a).gap > 0);
  const tiedAttrs = attributes.filter((a) => getAttributeTrend(a).gap === 0);
  const trailingAttrs = attributes.filter((a) => getAttributeTrend(a).gap < 0);
  const improvingAttrs = attributes.filter((a) => getAttributeTrend(a).newFlowChange > 0);
  const decliningAttrs = attributes.filter((a) => getAttributeTrend(a).newFlowChange < 0);
  
  const avgPerformance = Math.round(
    attributes.reduce((sum, a) => sum + a.newflow[a.newflow.length - 1], 0) / attributes.length
  );
  
  // Get top and bottom performers
  const sortedByPerf = [...attributes].sort((a, b) => 
    b.newflow[b.newflow.length - 1] - a.newflow[a.newflow.length - 1]
  );
  const topPerformers = sortedByPerf.slice(0, 3);
  const bottomPerformers = sortedByPerf.slice(-3).reverse();

  return (
    <div className="space-y-8">
      {/* Summary Stats - First */}
      <div className="grid grid-cols-3 gap-4">
        {/* Attributes Leading Card */}
        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-card p-5 border border-green-500/20">
          <div className="caption text-muted-foreground uppercase tracking-wider mb-1">
            Simplified Flow Ahead
          </div>
          <div className="text-3xl font-medium mb-3" style={{ color: "#00A868" }}>
            {leadingAttrs.length}/12
          </div>
          <div className="flex flex-wrap gap-1.5">
            {leadingAttrs.map(attr => (
              <span 
                key={attr.id}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium"
                style={{ backgroundColor: `${attr.color}20`, color: attr.color }}
              >
                {attr.name}
                <span className="opacity-70">+{getAttributeTrend(attr).gap}</span>
              </span>
            ))}
            {tiedAttrs.length > 0 && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 text-gray-500">
                {tiedAttrs.length} tied
              </span>
            )}
          </div>
        </div>

        {/* Avg Performance Card */}
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-card p-5 border border-primary/20">
          <div className="caption text-muted-foreground uppercase tracking-wider mb-1">
            Avg Performance (W6)
          </div>
          <div className="text-3xl font-medium mb-3" style={{ color: "var(--color-primary)" }}>
            {avgPerformance}%
          </div>
          <div className="space-y-1.5">
            <div className="flex flex-wrap gap-1">
              <span className="text-[10px] text-muted-foreground mr-1">Top:</span>
              {topPerformers.map(attr => (
                <span 
                  key={attr.id}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium"
                  style={{ backgroundColor: `${attr.color}20`, color: attr.color }}
                >
                  {attr.name} {attr.newflow[attr.newflow.length - 1]}%
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-1">
              <span className="text-[10px] text-muted-foreground mr-1">Low:</span>
              {bottomPerformers.map(attr => (
                <span 
                  key={attr.id}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-50 text-amber-700"
                >
                  {attr.name} {attr.newflow[attr.newflow.length - 1]}%
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Improving Trends Card */}
        <div className="bg-gradient-to-br from-orange-500/10 to-amber-500/10 rounded-card p-5 border border-orange-500/20">
          <div className="caption text-muted-foreground uppercase tracking-wider mb-1">
            Positive Trend (W0→W6)
          </div>
          <div className="text-3xl font-medium mb-3" style={{ color: "#FF6633" }}>
            {improvingAttrs.length}/12
          </div>
          <div className="space-y-1.5">
            <div className="flex flex-wrap gap-1">
              {improvingAttrs.slice(0, 6).map(attr => (
                <span 
                  key={attr.id}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-green-50 text-green-700"
                >
                  {attr.name}
                  <span className="text-green-500">+{getAttributeTrend(attr).newFlowChange}</span>
                </span>
              ))}
              {improvingAttrs.length > 6 && (
                <span className="text-[10px] text-muted-foreground">+{improvingAttrs.length - 6} more</span>
              )}
            </div>
            {decliningAttrs.length > 0 && (
              <div className="flex flex-wrap gap-1">
                <span className="text-[10px] text-muted-foreground mr-1">↓</span>
                {decliningAttrs.map(attr => (
                  <span 
                    key={attr.id}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-red-50 text-red-600"
                  >
                    {attr.name} {getAttributeTrend(attr).newFlowChange}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Combined Overview - Heatmap Table */}
      <div className="bg-card rounded-card p-6 shadow-sm border border-border">
        <h3 className="text-xl font-medium text-card-foreground mb-4">Combined Attributes Overview</h3>
        <p className="caption text-muted-foreground mb-6">
          Simplified Flow (top) vs Old Flow (bottom) across all waves — darker colors indicate higher scores
        </p>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-secondary">
                <th className="text-left p-3 font-medium text-card-foreground border-b border-border" style={{ fontSize: 'var(--text-label)', minWidth: '140px' }}>
                  Attribute
                </th>
                {periods.map((period, idx) => (
                  <th key={idx} className="text-center p-3 font-medium text-card-foreground border-b border-border" style={{ fontSize: 'var(--text-label)', minWidth: '90px' }}>
                    {period.split(' ')[0]}
                  </th>
                ))}
                <th className="text-center p-3 font-medium text-card-foreground border-b border-border" style={{ fontSize: 'var(--text-label)', minWidth: '70px' }}>
                  Gap
                </th>
              </tr>
            </thead>
            <tbody>
              {attributes.map((attr) => {
                const Icon = (LucideIcons as any)[attr.icon] || LucideIcons.Circle;
                const newValues = attr.newflow;
                const oldValues = attr.oldflow;
                const gap = newValues[newValues.length - 1] - oldValues[oldValues.length - 1];
                
                // Function to get background color based on value
                const getHeatColor = (value: number) => {
                  if (value >= 95) return { bg: '#00A86820', text: '#00A868' };
                  if (value >= 90) return { bg: '#00A86815', text: '#00A868' };
                  if (value >= 85) return { bg: '#22c55e10', text: '#16a34a' };
                  if (value >= 80) return { bg: '#eab30810', text: '#ca8a04' };
                  if (value >= 75) return { bg: '#f9731615', text: '#ea580c' };
                  return { bg: '#ef444415', text: '#dc2626' };
                };

                // Function to determine which flow is winning
                const getComparisonStyle = (newVal: number, oldVal: number, isNew: boolean) => {
                  const diff = newVal - oldVal;
                  if (diff === 0) return { fontWeight: 'normal', opacity: 1 };
                  if (isNew && diff > 0) return { fontWeight: '600', opacity: 1 };
                  if (!isNew && diff < 0) return { fontWeight: '600', opacity: 1 };
                  return { fontWeight: 'normal', opacity: 0.7 };
                };
                
                return (
                  <tr key={attr.id} className="hover:bg-secondary/30 transition-colors">
                    <td className="p-3 border-b border-border">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${attr.color}20` }}
                        >
                          <Icon className="w-3.5 h-3.5" style={{ color: attr.color }} />
                        </div>
                        <span className="font-medium text-card-foreground text-sm">{attr.name}</span>
                      </div>
                    </td>
                    {newValues.map((newVal, idx) => {
                      const oldVal = oldValues[idx];
                      const newColors = getHeatColor(newVal);
                      const oldColors = getHeatColor(oldVal);
                      const newStyle = getComparisonStyle(newVal, oldVal, true);
                      const oldStyle = getComparisonStyle(newVal, oldVal, false);
                      
                      // Check for stat-sig change (comparing to previous wave)
                      const statSig = getStatSig(attr.id, idx);
                      const hasStatSig = !!statSig;
                      const isConfirmed = statSig?.type === 'confirmed';
                      
                      return (
                        <td key={idx} className="p-1.5 border-b border-border text-center relative">
                          {/* Stat-sig indicator */}
                          {hasStatSig && (
                            <div 
                              className="absolute -top-0.5 -right-0.5 group cursor-help"
                              title={`Stat-sig (p=${statSig.pValue?.toFixed(4) || '<0.05'}): ${statSig.change > 0 ? '+' : ''}${statSig.change}pp${statSig.note ? ` - ${statSig.note}` : ''}`}
                            >
                              <span className="flex items-center justify-center w-4 h-4 rounded-full bg-amber-500 text-white text-[9px] font-bold shadow-sm">
                                ✱
                              </span>
                            </div>
                          )}
                          <div className="flex flex-col gap-1">
                            {/* Simplified Flow */}
                            <div 
                              className={`inline-flex items-center justify-center px-2 py-1 rounded text-xs transition-all ${hasStatSig ? 'ring-2 ring-offset-1 ring-amber-400' : ''}`}
                              style={{ 
                                backgroundColor: newColors.bg,
                                color: newColors.text,
                                fontWeight: newStyle.fontWeight,
                                opacity: newStyle.opacity
                              }}
                            >
                              {newVal}%
                              {newVal > oldVal && <span className="ml-0.5 text-[10px]">▲</span>}
                            </div>
                            {/* Old Flow */}
                            <div 
                              className="inline-flex items-center justify-center px-2 py-1 rounded text-xs transition-all border border-dashed border-gray-300"
                              style={{ 
                                backgroundColor: oldColors.bg,
                                color: '#6b7280',
                                fontWeight: oldStyle.fontWeight,
                                opacity: oldStyle.opacity
                              }}
                            >
                              {oldVal}%
                              {oldVal > newVal && <span className="ml-0.5 text-[10px]">▲</span>}
                            </div>
                          </div>
                        </td>
                      );
                    })}
                    <td className="p-3 border-b border-border text-center">
                      <div 
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium"
                        style={{ 
                          backgroundColor: gap > 0 ? '#00A86815' : gap < 0 ? '#DA1E2815' : '#76767615',
                          color: gap > 0 ? '#00A868' : gap < 0 ? '#DA1E28' : '#767676'
                        }}
                      >
                        {gap > 0 ? '+' : ''}{gap}pp
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-4 mt-6 pt-4 border-t border-border flex-wrap">
          <div className="flex items-center gap-1.5">
            <div className="px-2 py-1 rounded text-xs bg-[#820AD115] text-[#820AD1] font-medium">99%</div>
            <span className="caption text-muted-foreground">Simplified</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="px-2 py-1 rounded text-xs bg-[#94a3b815] text-[#6b7280] border border-dashed border-gray-300">98%</div>
            <span className="caption text-muted-foreground">Old Flow</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-[#00A868]">▲</span>
            <span className="caption text-muted-foreground">Leading</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="flex items-center justify-center w-4 h-4 rounded-full bg-amber-500 text-white text-[9px] font-bold">✱</span>
            <span className="caption text-muted-foreground">Stat-sig (p&lt;0.05)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded bg-[#00A86815]"></div>
            <span className="caption text-muted-foreground">≥90%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-[#ef444415]"></div>
            <span className="caption text-muted-foreground">&lt;75%</span>
          </div>
        </div>
      </div>

      {/* Header for Individual Charts - Third */}
      <div className="bg-gradient-to-r from-primary to-accent rounded-card p-8 text-primary-foreground shadow-xl">
        <h2 className="text-3xl font-medium mb-2">📊 All Attributes Evolution (Chart View)</h2>
        <p className="opacity-90">
          Side-by-side comparison of Simplified Flow vs Old Flow across 12 attributes over 7 waves (W0-W6)
        </p>
      </div>

      {/* Individual Attribute Charts - Fourth */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {attributes.map((attr) => {
          const Icon = (LucideIcons as any)[attr.icon] || LucideIcons.Circle;
          
          // Create data for this specific attribute
          const attrData = periods.map((period, idx) => ({
            name: period.split(' ')[0],
            'Simplified Flow': attr.newflow[idx],
            'Old Flow': attr.oldflow[idx],
          }));

          // Get all stat-sig changes for this attribute
          const attrStatSigs = periods.map((_, idx) => getStatSig(attr.id, idx)).filter(Boolean);
          
          return (
            <div key={attr.id} className="bg-card rounded-card p-6 shadow-sm border border-border">
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${attr.color}20` }}
                >
                  <Icon className="w-5 h-5" style={{ color: attr.color }} />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-card-foreground">{attr.name}</h3>
                  <p className="caption text-muted-foreground">
                    {attr.category === 'core' ? 'Core Attribute' : 'Functional Attribute'}
                  </p>
                </div>
                <div className="text-right">
                  <div className="caption text-muted-foreground mb-1">Latest</div>
                  <div className="font-medium" style={{ color: attr.color }}>
                    {attr.newflow[attr.newflow.length - 1]}%
                  </div>
                </div>
              </div>

              {/* Stat-sig badges */}
              {attrStatSigs.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {attrStatSigs.map((sig, i) => (
                    <div 
                      key={i}
                      className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs bg-amber-50 border border-amber-200"
                      title={sig?.note || ''}
                    >
                      <span className="flex items-center justify-center w-3.5 h-3.5 rounded-full bg-amber-500 text-white text-[8px] font-bold">
                        ✱
                      </span>
                      <span className="text-card-foreground font-medium">
                        W{sig?.waveIndex}: {sig?.change && sig.change > 0 ? '+' : ''}{sig?.change}pp
                      </span>
                      <span className="text-amber-600 font-medium">
                        p={sig?.pValue?.toFixed(sig?.pValue === 0 ? 0 : 3) || '<0.05'}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Chart */}
              <div className="w-full overflow-x-auto">
                <LineChart 
                  width={560} 
                  height={280} 
                  data={attrData}
                  margin={{ top: 25, right: 25, left: 5, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 10, fill: '#6b7280' }}
                    stroke="#d1d5db"
                    interval={0}
                  />
                  <YAxis 
                    domain={[60, 100]}
                    tick={{ fontSize: 10, fill: '#6b7280' }}
                    stroke="#d1d5db"
                    label={{ 
                      value: 'Top 2 Box %', 
                      angle: -90, 
                      position: 'insideLeft',
                      style: { fontSize: '10px', fill: '#6b7280' }
                    }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '12px',
                      padding: '8px 12px'
                    }}
                    formatter={(value: any) => [`${value}%`, '']}
                  />
                  <Legend 
                    wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
                    iconType="line"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="Simplified Flow" 
                    stroke={attr.color}
                    strokeWidth={3}
                    dot={{ fill: attr.color, r: 4 }}
                    activeDot={{ r: 6 }}
                    label={renderCustomizedLabel}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="Old Flow" 
                    stroke="#94a3b8"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ fill: '#94a3b8', r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-border">
                <div className="text-center">
                  <div className="caption text-muted-foreground mb-1">Change</div>
                  <div 
                    className="caption font-medium"
                    style={{ 
                      color: (attr.newflow[attr.newflow.length - 1] - attr.newflow[0]) >= 0 ? '#00A868' : '#DA1E28'
                    }}
                  >
                    {(attr.newflow[attr.newflow.length - 1] - attr.newflow[0]) > 0 ? '+' : ''}
                    {attr.newflow[attr.newflow.length - 1] - attr.newflow[0]}pp
                  </div>
                </div>
                <div className="text-center">
                  <div className="caption text-muted-foreground mb-1">Peak</div>
                  <div className="caption font-medium" style={{ color: attr.color }}>
                    {Math.max(...attr.newflow)}%
                  </div>
                </div>
                <div className="text-center">
                  <div className="caption text-muted-foreground mb-1">Gap</div>
                  <div 
                    className="caption font-medium"
                    style={{ 
                      color: (attr.newflow[attr.newflow.length - 1] - attr.oldflow[attr.oldflow.length - 1]) >= 0 ? '#00A868' : '#DA1E28'
                    }}
                  >
                    {(attr.newflow[attr.newflow.length - 1] - attr.oldflow[attr.oldflow.length - 1]) > 0 ? '+' : ''}
                    {attr.newflow[attr.newflow.length - 1] - attr.oldflow[attr.oldflow.length - 1]}pp
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}