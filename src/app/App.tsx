import { useState } from "react";
import { NavigationBar } from "@/app/components/NavigationBar";
import { DashboardHeader } from "@/app/components/DashboardHeader";
import { PerceptionBanner } from "@/app/components/PerceptionBanner";
import { PerceptionTldr } from "@/app/components/PerceptionTldr";
import { CompetitiveQualityChart } from "@/app/components/CompetitiveQualityChart";
import { PerformanceChart } from "@/app/components/PerformanceChart";
import { CompetitiveQualityOverview } from "@/app/components/CompetitiveQualityOverview";
import { ResearchTimeline } from "@/app/components/ResearchTimeline";
import { SummaryTable } from "@/app/components/SummaryTable";
import { MonthOverMonthCard } from "@/app/components/MonthOverMonthCard";
import { AttributeEvolutionChart } from "@/app/components/AttributeEvolutionChart";
import { waves } from "@/app/data/attributes";

export default function App() {
  const [activeWave, setActiveWave] = useState(0);
  const [view, setView] = useState<
    "overview" | "attributes" | "research"
  >("overview");

  const currentWave =
    waves.find((w) => w.id === activeWave) || waves[0];
  const previousWave =
    activeWave > 0
      ? waves.find((w) => w.id === activeWave - 1)
      : null;
  const baselinePerception = waves[0].perception;

  // Function to scroll to section
  const handleSectionClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -120; // Offset for sticky header
      const y =
        element.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="p-8 overflow-y-auto">
        {/* Navigation Bar */}
        <NavigationBar
          view={view}
          onViewChange={setView}
          waves={waves}
          activeWave={activeWave}
          onWaveSelect={setActiveWave}
          onSectionClick={handleSectionClick}
        />

        {view === "overview" ? (
          <>
            <div id="line-charts">
              <AttributeEvolutionChart />
            </div>
            <div id="competitive-quality" className="mt-8">
              <CompetitiveQualityOverview />
            </div>
          </>
        ) : view === "research" ? (
          <>
            <div id="summary-table">
              <SummaryTable />
            </div>
            <div id="research-timeline" className="mt-12">
              <ResearchTimeline />
            </div>
          </>
        ) : (
          <>
            <DashboardHeader
              waveName={currentWave.name}
              waveMonth={currentWave.month}
            />
            <PerceptionBanner
              wave={currentWave}
              baselinePerception={baselinePerception}
            />
            <PerceptionTldr wave={currentWave} />

            {/* Month-over-Month Comparison */}
            <MonthOverMonthCard
              currentWaveIndex={activeWave}
              currentWaveName={`${currentWave.month} (${currentWave.name})`}
              previousWaveName={
                previousWave
                  ? `${previousWave.month} (${previousWave.name})`
                  : ""
              }
            />

            <PerformanceChart selectedWave={activeWave} />
            <CompetitiveQualityChart wave={currentWave} />
          </>
        )}
      </main>
    </div>
  );
}