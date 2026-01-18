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
  model: string;
  models: string[];
  isModelMenuOpen: boolean;
  onOpenModelMenu: () => void;
  onCloseModelMenu: () => void;
  onSelectModel: (value: string) => void;
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
  model,
  models,
  isModelMenuOpen,
  onOpenModelMenu,
  onCloseModelMenu,
  onSelectModel,
}: ServerPanelProps) {
  const isHonest = serverMode === "Honest";

  return (
    <div className="panel server">
      <PanelHeader
        title="Server Behavior"
        rightContent={
          <div className="header-actions">
            <div className="model-menu-wrap">
              <button
                className="model-chip model-chip-button"
                onClick={onOpenModelMenu}
                type="button"
                aria-haspopup="dialog"
                aria-expanded={isModelMenuOpen}
              >
                <span className="chip-label">Computation model</span>
                <span className="chip-value">{model}</span>
              </button>
              {isModelMenuOpen ? (
                <div
                  className="model-menu"
                  role="dialog"
                  aria-label="Choose computation model"
                  onClick={(event) => event.stopPropagation()}
                >
                  <p className="helper">Choose a computation model.</p>
                  <div className="model-menu-actions">
                    {models.map((option) => (
                      <button
                        key={option}
                        type="button"
                        className={
                          option === model
                            ? "toggle-button is-active"
                            : "toggle-button"
                        }
                        onMouseDown={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                        }}
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          onSelectModel(option);
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="ghost model-menu-close"
                    onClick={onCloseModelMenu}
                  >
                    Close
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        }
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
