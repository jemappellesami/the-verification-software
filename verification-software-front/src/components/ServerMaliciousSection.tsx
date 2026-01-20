import type { ChangeEvent } from "react";
import FileDrop from "./FileDrop";
import Slider from "./Slider";

type ServerMaliciousSectionProps = {
  maliciousModel: string;
  onMaliciousModel: (value: string) => void;
  noiseProbability: number;
  onNoiseProbability: (value: number) => void;
  isCustomMalicious: boolean;
  maliciousModels: string[];
};

function ServerMaliciousSection({
  maliciousModel,
  onMaliciousModel,
  noiseProbability,
  onNoiseProbability,
  isCustomMalicious,
  maliciousModels,
}: ServerMaliciousSectionProps) {
  const handleMaliciousChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onMaliciousModel(event.target.value);
  };

  return (
    <div className="section">
      <h4>Malicious strategy</h4>
      <div className="stack">
        <select
          className="select"
          value={maliciousModel}
          onChange={handleMaliciousChange}
        >
          {maliciousModels.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <Slider
          label="Attack probability"
          min={0}
          max={1}
          step={0.01}
          value={noiseProbability}
          onChange={onNoiseProbability}
        />
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

export default ServerMaliciousSection;
