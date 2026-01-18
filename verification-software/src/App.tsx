import { useEffect, useMemo, useState } from "react";
import "./App.css";
import ClientPanel from "./components/ClientPanel";
import InsightsSection from "./components/InsightsSection";
import ResultsPanel from "./components/ResultsPanel";
import ServerPanel from "./components/ServerPanel";

const models = [
  "Measurement-Based Quantum Computing",
  "Clifford + Magic-State Injection",
];

const verificationStrategies = [
  "Single-Qubit traps",
  "Dummyless traps",
  "Random traps",
];

const noiseModels = [
  "Depolarizing",
  "Gentle Global",
  "Custom noise model",
];

const maliciousModels = [
  "Global Malicious",
  "Adaptive Tampering",
  "Custom malicious model",
];

function App() {
  const [model, setModel] = useState(models[0]);
  const [isModelMenuOpen, setIsModelMenuOpen] = useState(false);
  const [computationResetKey, setComputationResetKey] = useState(0);
  const [strategy, setStrategy] = useState(verificationStrategies[0]);
  const [serverMode, setServerMode] = useState("Honest");
  const [honestMode, setHonestMode] = useState("Perfect");
  const [noiseModel, setNoiseModel] = useState(noiseModels[0]);
  const [maliciousModel, setMaliciousModel] = useState(maliciousModels[0]);
  const [computationRounds, setComputationRounds] = useState(48);
  const [testRounds, setTestRounds] = useState(20);
  const [acceptedFailures, setAcceptedFailures] = useState(3);
  const [hasResults, setHasResults] = useState(false);
  const [isResultsStale, setIsResultsStale] = useState(false);
  const [failedTestRounds, setFailedTestRounds] = useState(0);
  const [resultBit, setResultBit] = useState<number | null>(null);

  const acceptedFailuresMax = useMemo(() => Math.max(testRounds - 1, 0), [
    testRounds,
  ]);

  const resetResults = () => {
    setHasResults(false);
    setIsResultsStale(true);
    setFailedTestRounds(0);
    setResultBit(null);
  };

  const handleTestRounds = (value: number) => {
    const nextValue = Math.max(value, 1);
    setTestRounds(nextValue);
    if (acceptedFailures >= nextValue) {
      setAcceptedFailures(Math.max(nextValue - 1, 0));
    }
    resetResults();
  };

  const isCustomNoise = noiseModel === "Custom noise model";
  const isCustomMalicious = maliciousModel === "Custom malicious model";

  const openModelMenu = () => {
    setIsModelMenuOpen(true);
  };

  const closeModelMenu = () => {
    setIsModelMenuOpen(false);
  };

  useEffect(() => {
    if (!isModelMenuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModelMenu();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModelMenuOpen]);

  const handleModelChange = (nextModel: string) => {
    setModel(nextModel);
    setComputationResetKey((prev) => prev + 1);
    closeModelMenu();
  };

  const handleDelegateVerify = () => {
    const safeTestRounds = Math.max(testRounds, 1);
    const failures = Math.floor(Math.random() * safeTestRounds);
    setFailedTestRounds(failures);
    setResultBit(Math.random() < 0.5 ? 0 : 1);
    setHasResults(true);
    setIsResultsStale(false);
  };

  const handleComputationRounds = (value: number) => {
    setComputationRounds(value);
    resetResults();
  };

  const handleAcceptedFailures = (value: number) => {
    setAcceptedFailures(value);
    resetResults();
  };

  return (
    <div className="page">
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="main">
        <section className="dashboard">
          <ClientPanel
            strategy={strategy}
            onStrategyChange={setStrategy}
            computationRounds={computationRounds}
            onComputationRounds={handleComputationRounds}
            testRounds={testRounds}
            onTestRounds={handleTestRounds}
            acceptedFailures={acceptedFailures}
            onAcceptedFailures={handleAcceptedFailures}
            acceptedFailuresMax={acceptedFailuresMax}
            verificationStrategies={verificationStrategies}
            computationResetKey={computationResetKey}
          />
          <div className="dashboard-right">
            <ServerPanel
              serverMode={serverMode}
              onServerMode={setServerMode}
              honestMode={honestMode}
              onHonestMode={setHonestMode}
              noiseModel={noiseModel}
              onNoiseModel={setNoiseModel}
              maliciousModel={maliciousModel}
              onMaliciousModel={setMaliciousModel}
              isCustomNoise={isCustomNoise}
              isCustomMalicious={isCustomMalicious}
              noiseModels={noiseModels}
              maliciousModels={maliciousModels}
              model={model}
              models={models}
              isModelMenuOpen={isModelMenuOpen}
              onOpenModelMenu={openModelMenu}
              onCloseModelMenu={closeModelMenu}
              onSelectModel={handleModelChange}
            />
            <ResultsPanel
              isVisible={hasResults}
              isStale={isResultsStale}
              failedTestRounds={failedTestRounds}
              testRounds={testRounds}
              acceptedFailures={acceptedFailures}
              resultBit={resultBit}
            />
          </div>
        </section>
      </div>

      <div className="cta-row">
        <button className="primary cta-button" onClick={handleDelegateVerify}>
          Delegate and Verify
        </button>
      </div>

      <InsightsSection
        strategy={strategy}
        computationRounds={computationRounds}
        testRounds={testRounds}
        serverMode={serverMode}
        honestMode={honestMode}
        maliciousModel={maliciousModel}
        model={model}
      />
    </div>
  );
}

export default App;
