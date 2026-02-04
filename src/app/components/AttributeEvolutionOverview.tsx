import { attributes, periods } from "@/app/data/attributes";
import * as LucideIcons from "lucide-react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export function AttributeEvolutionOverview() {
  // Calculate trends for each attribute
  const getAttributeTrend = (attr: typeof attributes[0]) => {
    const firstNew = attr.newflow[0];
    const lastNew = attr.newflow[attr.newflow.length - 1];
    const firstOld = attr.oldflow[0];
    const lastOld = attr.oldflow[attr.oldflow.length - 1];

    return {
      newFlowChange: lastNew - firstNew,
      oldFlowChange: lastOld - firstOld,
      currentNew: lastNew,
      currentOld: lastOld,
      gap: lastNew - lastOld,
    };
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-primary to-accent rounded-card p-8 text-primary-foreground shadow-xl">
        <h2 className="text-3xl font-medium mb-2">
          📊 Total Attribute Evolution Overview
        </h2>
        <p className="opacity-90">
          6-month progression of all 12 attributes comparing
          Simplified Flow vs Old Flow (Jun–Dec 2025)
        </p>
      </div>

      {/* Timeline Header */}
      <div className="bg-card rounded-card p-6 shadow-sm border border-border">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-medium text-card-foreground">
            Evolution Timeline
          </h3>
          <div
            className="flex items-center gap-6"
            style={{ fontSize: "var(--text-label)" }}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full"
                style={{
                  backgroundColor: "var(--color-primary)",
                }}
              ></div>
              <span className="text-muted-foreground font-medium">
                Simplified Flow
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-muted-foreground opacity-50"></div>
              <span className="text-muted-foreground font-medium">
                Old Flow
              </span>
            </div>
          </div>
        </div>

        {/* All Attributes Grid */}
        <div className="space-y-6">
          {attributes.map((attr) => {
            const Icon =
              (LucideIcons as any)[attr.icon] ||
              LucideIcons.Circle;
            const trend = getAttributeTrend(attr);

            return (
              <div
                key={attr.id}
                className="border border-border rounded-card p-4 hover:shadow-md transition-shadow"
              >
                {/* Attribute Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: `${attr.color}20`,
                      }}
                    >
                      <Icon
                        className="w-5 h-5"
                        style={{ color: attr.color }}
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-card-foreground">
                        {attr.name}
                      </h4>
                      <p className="caption text-muted-foreground">
                        {attr.category === "core"
                          ? "Core"
                          : "Functional"}
                      </p>
                    </div>
                  </div>

                  {/* Current Scores */}
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="caption text-muted-foreground mb-1">
                        Simplified Flow
                      </div>
                      <div
                        className="text-xl font-medium"
                        style={{ color: attr.color }}
                      >
                        {trend.currentNew}%
                      </div>
                      <div className="flex items-center justify-end gap-1 mt-1">
                        {trend.newFlowChange > 0 && (
                          <TrendingUp
                            className="w-3 h-3"
                            style={{ color: "#00A868" }}
                          />
                        )}
                        {trend.newFlowChange < 0 && (
                          <TrendingDown
                            className="w-3 h-3"
                            style={{ color: "#DA1E28" }}
                          />
                        )}
                        {trend.newFlowChange === 0 && (
                          <Minus className="w-3 h-3 text-muted-foreground" />
                        )}
                        <span
                          className="caption font-medium"
                          style={{
                            color:
                              trend.newFlowChange > 0
                                ? "#00A868"
                                : trend.newFlowChange < 0
                                  ? "#DA1E28"
                                  : "#767676",
                          }}
                        >
                          {trend.newFlowChange > 0 ? "+" : ""}
                          {trend.newFlowChange}
                        </span>
                      </div>
                    </div>

                    <div className="text-right opacity-60">
                      <div className="caption text-muted-foreground mb-1">
                        Old Flow
                      </div>
                      <div className="text-xl font-medium text-muted-foreground">
                        {trend.currentOld}%
                      </div>
                      <div className="flex items-center justify-end gap-1 mt-1">
                        {trend.oldFlowChange > 0 && (
                          <TrendingUp className="w-3 h-3 text-muted-foreground" />
                        )}
                        {trend.oldFlowChange < 0 && (
                          <TrendingDown className="w-3 h-3 text-muted-foreground" />
                        )}
                        {trend.oldFlowChange === 0 && (
                          <Minus className="w-3 h-3 text-muted-foreground" />
                        )}
                        <span className="caption font-medium text-muted-foreground">
                          {trend.oldFlowChange > 0 ? "+" : ""}
                          {trend.oldFlowChange}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timeline Visualization */}
                <div className="space-y-3">
                  {/* Simplified Flow Timeline */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      {periods.map((period, idx) => (
                        <div
                          key={idx}
                          className="flex-1 text-center"
                        >
                          <div className="caption text-muted-foreground mb-1">
                            {period.split(" ")[0]}
                          </div>
                          <div
                            className="relative mx-auto rounded-full flex items-center justify-center font-medium text-white transition-all"
                            style={{
                              width: `${Math.max(attr.newflow[idx] * 0.6, 40)}px`,
                              height: `${Math.max(attr.newflow[idx] * 0.6, 40)}px`,
                              backgroundColor: attr.color,
                              fontSize: "13px",
                            }}
                          >
                            {attr.newflow[idx]}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Connection Line */}
                    <div
                      className="relative h-1 mx-auto"
                      style={{ width: "95%" }}
                    >
                      <div
                        className="absolute inset-0 rounded-full"
                        style={{
                          backgroundColor: `${attr.color}40`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Old Flow Timeline */}
                  <div className="opacity-50">
                    <div className="flex items-center gap-2 mb-2">
                      {periods.map((period, idx) => (
                        <div
                          key={idx}
                          className="flex-1 text-center"
                        >
                          <div
                            className="relative mx-auto rounded-full flex items-center justify-center font-medium text-white transition-all border-2"
                            style={{
                              width: `${Math.max(attr.oldflow[idx] * 0.6, 40)}px`,
                              height: `${Math.max(attr.oldflow[idx] * 0.6, 40)}px`,
                              backgroundColor: "#767676",
                              borderColor: attr.color,
                              fontSize: "13px",
                            }}
                          >
                            {attr.oldflow[idx]}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Connection Line */}
                    <div
                      className="relative h-1 mx-auto"
                      style={{ width: "95%" }}
                    >
                      <div
                        className="absolute inset-0 rounded-full bg-muted-foreground opacity-30"
                        style={{
                          borderTop: "2px dashed #767676",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Gap Indicator */}
                {trend.gap !== 0 && (
                  <div className="mt-3 text-center">
                    <span
                      className="caption font-medium px-3 py-1 rounded-full inline-block"
                      style={{
                        backgroundColor:
                          trend.gap > 0
                            ? "#00A86820"
                            : "#DA1E2820",
                        color:
                          trend.gap > 0 ? "#00A868" : "#DA1E28",
                      }}
                    >
                      {trend.gap > 0
                        ? `+${trend.gap}pp advantage`
                        : `${trend.gap}pp behind`}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-card p-6 border border-green-500/20">
          <div className="caption text-muted-foreground uppercase tracking-wider mb-2">
            Attributes Leading
          </div>
          <div
            className="text-3xl font-medium"
            style={{ color: "#00A868" }}
          >
            {
              attributes.filter(
                (a) => getAttributeTrend(a).gap > 0,
              ).length
            }
            /12
          </div>
          <p className="caption text-muted-foreground mt-2">
            Simplified Flow ahead
          </p>
        </div>

        <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-card p-6 border border-primary/20">
          <div className="caption text-muted-foreground uppercase tracking-wider mb-2">
            Avg Performance
          </div>
          <div
            className="text-3xl font-medium"
            style={{ color: "var(--color-primary)" }}
          >
            {Math.round(
              attributes.reduce(
                (sum, a) =>
                  sum + a.newflow[a.newflow.length - 1],
                0,
              ) / attributes.length,
            )}
            %
          </div>
          <p className="caption text-muted-foreground mt-2">
            Simplified Flow average
          </p>
        </div>

        <div className="bg-gradient-to-br from-orange-500/10 to-amber-500/10 rounded-card p-6 border border-orange-500/20">
          <div className="caption text-muted-foreground uppercase tracking-wider mb-2">
            Improving Trends
          </div>
          <div
            className="text-3xl font-medium"
            style={{ color: "#FF6633" }}
          >
            {
              attributes.filter(
                (a) => getAttributeTrend(a).newFlowChange > 0,
              ).length
            }
            /12
          </div>
          <p className="caption text-muted-foreground mt-2">
            Attributes with positive trend
          </p>
        </div>
      </div>
    </div>
  );
}