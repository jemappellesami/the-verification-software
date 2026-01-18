import { useMemo, useState } from "react";
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
  const [model, setModel] = useState(models[0]);
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

  return (
    <div className="page">
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <HeroSection model={model} onModelChange={setModel} models={models} />

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
