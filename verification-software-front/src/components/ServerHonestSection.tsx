import type { ChangeEvent } from "react";
import FileDrop from "./FileDrop";
import ToggleGroup from "./ToggleGroup";
import Slider from "./Slider";

type ServerHonestSectionProps = {
  honestMode: string;
  onHonestMode: (value: string) => void;
  noiseModel: string;
  onNoiseModel: (value: string) => void;
  noiseProbability: number;
  onNoiseProbability: (value: number) => void;
  isCustomNoise: boolean;
  noiseModels: string[];
};

function ServerHonestSection({
  honestMode,
  onHonestMode,
  noiseModel,
  onNoiseModel,
  noiseProbability,
  onNoiseProbability,
  isCustomNoise,
  noiseModels,
}: ServerHonestSectionProps) {
  const handleNoiseChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onNoiseModel(event.target.value);
  };

  const showProbability = noiseModel === "Depolarizing";

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
            onChange={handleNoiseChange}
          >
            {noiseModels.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {showProbability ? (
            <Slider
              label="Noise probability"
              min={0}
              max={1}
              step={0.01}
              value={noiseProbability}
              onChange={onNoiseProbability}
              helper="Applied to all depolarizing error parameters."
            />
          ) : null}
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

export default ServerHonestSection;
