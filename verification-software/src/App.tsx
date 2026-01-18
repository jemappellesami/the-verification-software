import { useMemo, useRef, useState } from "react";
import "./App.css";
import ClientPanel from "./components/ClientPanel";
import HeroSection from "./components/HeroSection";
import InsightsSection from "./components/InsightsSection";
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [model, setModel] = useState(models[0]);
  const [isModelModalOpen, setIsModelModalOpen] = useState(false);
  const [isModelModalClosing, setIsModelModalClosing] = useState(false);
  const [computationResetKey, setComputationResetKey] = useState(0);
  const [strategy, setStrategy] = useState(verificationStrategies[0]);
  const [serverMode, setServerMode] = useState("Honest");
  const [honestMode, setHonestMode] = useState("Perfect");
  const [noiseModel, setNoiseModel] = useState(noiseModels[0]);
  const [maliciousModel, setMaliciousModel] = useState(maliciousModels[0]);
  const [computationRounds, setComputationRounds] = useState(48);
  const [testRounds, setTestRounds] = useState(20);
  const [acceptedFailures, setAcceptedFailures] = useState(3);

  const acceptedFailuresMax = useMemo(() => Math.max(testRounds - 1, 0), [
    testRounds,
  ]);

  const handleTestRounds = (value: number) => {
    const nextValue = Math.max(value, 1);
    setTestRounds(nextValue);
    if (acceptedFailures >= nextValue) {
      setAcceptedFailures(Math.max(nextValue - 1, 0));
    }
  };

  const isCustomNoise = noiseModel === "Custom noise model";
  const isCustomMalicious = maliciousModel === "Custom malicious model";
  const modalTimerRef = useRef<number | null>(null);

  const closeModelModal = () => {
    setIsModelModalClosing(true);
    if (modalTimerRef.current) {
      window.clearTimeout(modalTimerRef.current);
    }
    modalTimerRef.current = window.setTimeout(() => {
      setIsModelModalOpen(false);
      setIsModelModalClosing(false);
      modalTimerRef.current = null;
    }, 240);
  };

  const openModelModal = () => {
    if (modalTimerRef.current) {
      window.clearTimeout(modalTimerRef.current);
      modalTimerRef.current = null;
    }
    setIsModelModalClosing(false);
    setIsModelModalOpen(true);
  };

  const handleModelChange = (nextModel: string) => {
    setModel(nextModel);
    setComputationResetKey((prev) => prev + 1);
    closeModelModal();
  };

  return (
    <div className="page">
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className={isSidebarOpen ? "layout" : "layout is-collapsed"}>
        <aside
          className={isSidebarOpen ? "sidebar is-open" : "sidebar"}
          aria-hidden={!isSidebarOpen}
        >
          <HeroSection />
        </aside>
        <main className="main">
          <div className="toolbar">
            <button
              className="ghost sidebar-toggle"
              onClick={() => setIsSidebarOpen((prev) => !prev)}
              type="button"
            >
              {isSidebarOpen ? "Hide Overview" : "Show Overview"}
            </button>
            <div className="model-chip">
              <span className="chip-label">Computation model</span>
              <span className="chip-value">{model}</span>
            </div>
            <button
              className="ghost model-action"
              onClick={openModelModal}
              type="button"
            >
              Change computation model
            </button>
          </div>

          <section className="dashboard">
            <ClientPanel
              strategy={strategy}
              onStrategyChange={setStrategy}
              computationRounds={computationRounds}
              onComputationRounds={setComputationRounds}
              testRounds={testRounds}
              onTestRounds={handleTestRounds}
              acceptedFailures={acceptedFailures}
              onAcceptedFailures={setAcceptedFailures}
              acceptedFailuresMax={acceptedFailuresMax}
              verificationStrategies={verificationStrategies}
              computationResetKey={computationResetKey}
            />
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
            />
          </section>
        </main>
      </div>

      <div className="cta-row">
        <button className="primary cta-button">Delegate and Verify</button>
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
      {isModelModalOpen || isModelModalClosing ? (
        <div
          className={
            isModelModalClosing
              ? "modal-overlay is-closing"
              : "modal-overlay is-open"
          }
          onClick={closeModelModal}
        >
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-label="Choose computation model"
            onClick={(event) => event.stopPropagation()}
          >
            <h3>Choose computation model</h3>
            <p className="helper">
              Switching models resets the computation input only.
            </p>
            <div className="modal-actions">
              {models.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={
                    option === model
                      ? "toggle-button is-active"
                      : "toggle-button"
                  }
                  onClick={() => handleModelChange(option)}
                >
                  {option}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="ghost modal-close"
              onClick={closeModelModal}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
