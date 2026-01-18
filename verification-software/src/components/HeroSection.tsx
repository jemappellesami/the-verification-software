import ModelCard from "./ModelCard";

type HeroSectionProps = {
  model: string;
  onModelChange: (value: string) => void;
  models: string[];
};

function HeroSection({ model, onModelChange, models }: HeroSectionProps) {
  return (
    <header className="hero">
      <div className="hero-copy">
        <p className="kicker">Delegated Quantum Verification</p>
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
      <ModelCard model={model} onModelChange={onModelChange} models={models} />
    </header>
  );
}

export default HeroSection;
