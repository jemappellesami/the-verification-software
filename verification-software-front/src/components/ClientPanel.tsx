import type { ChangeEvent } from "react";
import FileDrop from "./FileDrop";
import PanelHeader from "./PanelHeader";
import Slider from "./Slider";

type ClientPanelProps = {
  strategy: string;
  onStrategyChange: (value: string) => void;
  computationRounds: number;
  onComputationRounds: (value: number) => void;
  testRounds: number;
  onTestRounds: (value: number) => void;
  acceptedFailures: number;
  onAcceptedFailures: (value: number) => void;
  acceptedFailuresMax: number;
  verificationStrategies: string[];
  computationResetKey: number;
};

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
  verificationStrategies,
  computationResetKey,
}: ClientPanelProps) {
  const handleStrategyChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onStrategyChange(event.target.value);
  };

  return (
    <div className="panel client">
      <PanelHeader
        title="Client Configuration"
        status="Channel ready"
      />
      <div className="panel-body">
        <div className="section">
          <h4>Choose a computation</h4>
          <FileDrop
            key={computationResetKey}
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
            onChange={handleStrategyChange}
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

export default ClientPanel;
