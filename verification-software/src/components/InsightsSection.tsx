import InsightCard from "./InsightCard";

type InsightsSectionProps = {
  strategy: string;
  computationRounds: number;
  testRounds: number;
  serverMode: string;
  honestMode: string;
  maliciousModel: string;
  model: string;
};

function InsightsSection({
  strategy,
  computationRounds,
  testRounds,
  serverMode,
  honestMode,
  maliciousModel,
  model,
}: InsightsSectionProps) {
  return (
    <section className="insights">
      <InsightCard
        label="Verification readiness"
        title={strategy}
        description={`Computation rounds: ${computationRounds} | Test rounds: ${testRounds}`}
      />
      <InsightCard
        label="Server profile"
        title={serverMode}
        description={
          serverMode === "Honest"
            ? `Quality: ${honestMode}`
            : `Model: ${maliciousModel}`
        }
      />
      <InsightCard
        label="Computation model"
        title={model}
        description="Client and server remain isolated in the UI."
      />
    </section>
  );
}

export default InsightsSection;
