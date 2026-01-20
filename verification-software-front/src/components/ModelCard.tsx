import ToggleGroup from "./ToggleGroup";

type ModelCardProps = {
  model: string;
  onModelChange: (value: string) => void;
  models: string[];
};

function ModelCard({ model, onModelChange, models }: ModelCardProps) {
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

export default ModelCard;
