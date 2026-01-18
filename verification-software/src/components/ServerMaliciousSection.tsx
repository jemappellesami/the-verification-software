import type { ChangeEvent } from "react";
import FileDrop from "./FileDrop";

type ServerMaliciousSectionProps = {
  maliciousModel: string;
  onMaliciousModel: (value: string) => void;
  isCustomMalicious: boolean;
  maliciousModels: string[];
};

function ServerMaliciousSection({
  maliciousModel,
  onMaliciousModel,
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
