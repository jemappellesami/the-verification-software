import ToggleGroup from "./ToggleGroup";
import PanelHeader from "./PanelHeader";
import ServerHonestSection from "./ServerHonestSection";
import ServerMaliciousSection from "./ServerMaliciousSection";
import ChannelCard from "./ChannelCard";

type ServerPanelProps = {
  serverMode: string;
  onServerMode: (value: string) => void;
  honestMode: string;
  onHonestMode: (value: string) => void;
  noiseModel: string;
  onNoiseModel: (value: string) => void;
  maliciousModel: string;
  onMaliciousModel: (value: string) => void;
  isCustomNoise: boolean;
  isCustomMalicious: boolean;
  noiseModels: string[];
  maliciousModels: string[];
};

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
  noiseModels,
  maliciousModels,
}: ServerPanelProps) {
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
            noiseModels={noiseModels}
          />
        ) : (
          <ServerMaliciousSection
            maliciousModel={maliciousModel}
            onMaliciousModel={onMaliciousModel}
            isCustomMalicious={isCustomMalicious}
            maliciousModels={maliciousModels}
          />
        )}

        <ChannelCard />
      </div>
    </div>
  );
}

export default ServerPanel;
