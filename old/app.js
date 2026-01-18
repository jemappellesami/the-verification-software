const { useMemo, useState } = React;

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

function ToggleGroup({ options, value, onChange }) {
  return (
    <div className="toggle-group">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          className={
            option === value ? "toggle-button is-active" : "toggle-button"
          }
          onClick={() => onChange(option)}
          aria-pressed={option === value}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

function Slider({ label, min, max, value, onChange, helper }) {
  return (
    <div className="slider-field">
      <div className="slider-header">
        <span>{label}</span>
        <span className="slider-value">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      {helper ? <p className="helper">{helper}</p> : null}
    </div>
  );
}

function FileDrop({ label, hint, accept }) {
  return (
    <label className="dropzone">
      <input type="file" accept={accept} />
      <div>
        <div className="dropzone-title">{label}</div>
        <p className="helper">{hint}</p>
      </div>
    </label>
  );
}

function PanelHeader({ badgeLabel, badgeVariant, title, status, statusVariant }) {
  const badgeClass = badgeVariant ? `badge ${badgeVariant}` : "badge";
  const statusClass = statusVariant ? `status ${statusVariant}` : "status";

  return (
    <div className="panel-header">
      <div>
        <span className={badgeClass}>{badgeLabel}</span>
        <h2>{title}</h2>
      </div>
      <span className={statusClass}>{status}</span>
    </div>
  );
}

function ModelCard({ model, onModelChange }) {
  return (
    <div className="model-card">
      <h3>Choose a computation model</h3>
      <ToggleGroup options={models} value={model} onChange={onModelChange} />
      <p className="helper">
        The model defines how the client delegates and verifies computation.
      </p>
    </div>
  );
}

function HeroSection({ model, onModelChange }) {
  return (
    <header className="hero">
      <div className="hero-copy">
        <p className="kicker">Verify Delegated Quantum Computations</p>
        <h1>Protocol Control Dashboard</h1>
        <p className="subtitle">
          Shape how the client verifies computations, model the server, and stage
          verification rounds with precision.
        </p>
        <div className="hero-actions">
          <button className="primary">Launch Session</button>
          <button className="ghost">Save Configuration</button>
        </div>
      </div>
      <ModelCard model={model} onModelChange={onModelChange} />
    </header>
  );
}

function ClientPanel({
  strategy,
  onStrategyChange,
  computationRounds,
  onComputationRounds,
  testRounds,
  onTestRounds,
  acceptedFailures,
  onAcceptedFailures,
  acceptedFailuresMax,
}) {
  return (
    <div className="panel client">
      <PanelHeader
        badgeLabel="Client"
        title="Client Configuration"
        status="Channel ready"
      />
      <div className="panel-body">
        <div className="section">
          <h4>Choose a computation</h4>
          <FileDrop
            label="Drop .qasm file"
            hint="Upload a quantum circuit description."
            accept=".qasm"
          />
        </div>

        <div className="section">
          <h4>Choose a verification strategy</h4>
          <select
            className="select"
            value={strategy}
            onChange={(event) => onStrategyChange(event.target.value)}
          >
            {verificationStrategies.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="section">
          <h4>Protocol parameters</h4>
          <div className="slider-grid">
            <Slider
              label="Number of computation rounds"
              min={10}
              max={200}
              value={computationRounds}
              onChange={onComputationRounds}
            />
            <Slider
              label="Number of test rounds"
              min={5}
              max={120}
              value={testRounds}
              onChange={onTestRounds}
            />
            <Slider
              label="Accepted test round failures"
              min={0}
              max={acceptedFailuresMax}
              value={acceptedFailures}
              onChange={onAcceptedFailures}
              helper="Must be lower than the number of test rounds."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ServerHonestSection({
  honestMode,
  onHonestMode,
  noiseModel,
  onNoiseModel,
  isCustomNoise,
}) {
  return (
    <div className="section">
      <h4>Honest server quality</h4>
      <ToggleGroup
        options={["Perfect", "Noisy"]}
        value={honestMode}
        onChange={onHonestMode}
      />
      {honestMode === "Noisy" ? (
        <div className="stack">
          <select
            className="select"
            value={noiseModel}
            onChange={(event) => onNoiseModel(event.target.value)}
          >
            {noiseModels.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {isCustomNoise ? (
            <FileDrop
              label="Upload custom noise model"
              hint="Drop a config or JSON description."
              accept=".json"
            />
          ) : null}
        </div>
      ) : (
        <p className="helper">
          Perfect execution assumes ideal gates and no decoherence.
        </p>
      )}
    </div>
  );
}

function ServerMaliciousSection({
  maliciousModel,
  onMaliciousModel,
  isCustomMalicious,
}) {
  return (
    <div className="section">
      <h4>Malicious strategy</h4>
      <div className="stack">
        <select
          className="select"
          value={maliciousModel}
          onChange={(event) => onMaliciousModel(event.target.value)}
        >
          {maliciousModels.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {isCustomMalicious ? (
          <FileDrop
            label="Upload custom malicious model"
            hint="Drop a script or JSON description."
            accept=".json"
          />
        ) : null}
      </div>
    </div>
  );
}

function ChannelCard() {
  return (
    <div className="section">
      <h4>Communication channel</h4>
      <div className="channel-card">
        <div>
          <p className="channel-title">Quantum channel status</p>
          <p className="helper">
            Synchronize qubits and classical metadata before launch.
          </p>
        </div>
        <button className="ghost">Recalibrate</button>
      </div>
    </div>
  );
}

function ServerPanel({
  serverMode,
  onServerMode,
  honestMode,
  onHonestMode,
  noiseModel,
  onNoiseModel,
  maliciousModel,
  onMaliciousModel,
  isCustomNoise,
  isCustomMalicious,
}) {
  const isHonest = serverMode === "Honest";

  return (
    <div className="panel server">
      <PanelHeader
        badgeLabel="Server"
        badgeVariant="secondary"
        title="Server Behavior"
        status="Monitoring enabled"
        statusVariant="warning"
      />
      <div className="panel-body">
        <div className="section">
          <h4>Honest vs. Malicious</h4>
          <ToggleGroup
            options={["Honest", "Malicious"]}
            value={serverMode}
            onChange={onServerMode}
          />
        </div>

        {isHonest ? (
          <ServerHonestSection
            honestMode={honestMode}
            onHonestMode={onHonestMode}
            noiseModel={noiseModel}
            onNoiseModel={onNoiseModel}
            isCustomNoise={isCustomNoise}
          />
        ) : (
          <ServerMaliciousSection
            maliciousModel={maliciousModel}
            onMaliciousModel={onMaliciousModel}
            isCustomMalicious={isCustomMalicious}
          />
        )}

        <ChannelCard />
      </div>
    </div>
  );
}

function InsightCard({ label, title, description }) {
  return (
    <div className="insight-card">
      <p className="kicker">{label}</p>
      <h3>{title}</h3>
      <p className="helper">{description}</p>
    </div>
  );
}

function InsightsSection({
  strategy,
  computationRounds,
  testRounds,
  serverMode,
  honestMode,
  maliciousModel,
  model,
}) {
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

  const handleTestRounds = (value) => {
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
      <HeroSection model={model} onModelChange={setModel} />

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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
