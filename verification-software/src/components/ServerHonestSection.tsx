import type { ChangeEvent } from "react";
import FileDrop from "./FileDrop";
import ToggleGroup from "./ToggleGroup";

type ServerHonestSectionProps = {
  honestMode: string;
  onHonestMode: (value: string) => void;
  noiseModel: string;
  onNoiseModel: (value: string) => void;
  isCustomNoise: boolean;
  noiseModels: string[];
};

function ServerHonestSection({
  honestMode,
  onHonestMode,
  noiseModel,
  onNoiseModel,
  isCustomNoise,
  noiseModels,
}: ServerHonestSectionProps) {
  const handleNoiseChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onNoiseModel(event.target.value);
  };

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
