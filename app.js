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

  const isHonest = serverMode === "Honest";
  const isCustomNoise = noiseModel === "Custom noise model";
  const isCustomMalicious = maliciousModel === "Custom malicious model";

  return (
    <div className="page">
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <header className="hero">
        <div className="hero-copy">
          <p className="kicker">Delegated Quantum Verification</p>
          <h1>Protocol Control Dashboard</h1>
          <p className="subtitle">
            Shape how the client verifies computations, model the server, and
            stage verification rounds with precision.
          </p>
          <div className="hero-actions">
            <button className="primary">Launch Session</button>
            <button className="ghost">Save Configuration</button>
          </div>
        </div>
        <div className="model-card">
          <h3>Choose a computation model</h3>
          <ToggleGroup
            options={models}
            value={model}
            onChange={setModel}
          />
          <p className="helper">
            The model defines how the client delegates and verifies computation.
          </p>
        </div>
      </header>

      <section className="dashboard">
        <div className="panel client">
          <div className="panel-header">
            <div>
              <span className="badge">Client</span>
              <h2>Client Configuration</h2>
            </div>
            <span className="status">Channel ready</span>
          </div>
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
                onChange={(event) => setStrategy(event.target.value)}
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
                  onChange={setComputationRounds}
                />
                <Slider
                  label="Number of test rounds"
                  min={5}
                  max={120}
                  value={testRounds}
                  onChange={handleTestRounds}
                />
                <Slider
                  label="Accepted test round failures"
                  min={0}
                  max={acceptedFailuresMax}
                  value={acceptedFailures}
                  onChange={setAcceptedFailures}
                  helper="Must be lower than the number of test rounds."
                />
              </div>
            </div>
          </div>
        </div>

        <div className="panel server">
          <div className="panel-header">
            <div>
              <span className="badge secondary">Server</span>
              <h2>Server Behavior</h2>
            </div>
            <span className="status warning">Monitoring enabled</span>
          </div>
          <div className="panel-body">
            <div className="section">
              <h4>Honest vs. Malicious</h4>
              <ToggleGroup
                options={["Honest", "Malicious"]}
                value={serverMode}
                onChange={setServerMode}
              />
            </div>

            {isHonest ? (
              <div className="section">
                <h4>Honest server quality</h4>
                <ToggleGroup
                  options={["Perfect", "Noisy"]}
                  value={honestMode}
                  onChange={setHonestMode}
                />
                {honestMode === "Noisy" ? (
                  <div className="stack">
                    <select
                      className="select"
                      value={noiseModel}
                      onChange={(event) => setNoiseModel(event.target.value)}
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
            ) : (
              <div className="section">
                <h4>Malicious strategy</h4>
                <div className="stack">
                  <select
                    className="select"
                    value={maliciousModel}
                    onChange={(event) => setMaliciousModel(event.target.value)}
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
            )}

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
          </div>
        </div>
      </section>

      <section className="insights">
        <div className="insight-card">
          <p className="kicker">Verification readiness</p>
          <h3>{strategy}</h3>
          <p className="helper">
            Computation rounds: {computationRounds} | Test rounds: {testRounds}
          </p>
        </div>
        <div className="insight-card">
          <p className="kicker">Server profile</p>
          <h3>{serverMode}</h3>
          <p className="helper">
            {isHonest
              ? `Quality: ${honestMode}`
              : `Model: ${maliciousModel}`}
          </p>
        </div>
        <div className="insight-card">
          <p className="kicker">Computation model</p>
          <h3>{model}</h3>
          <p className="helper">Client and server remain isolated in the UI.</p>
        </div>
      </section>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
