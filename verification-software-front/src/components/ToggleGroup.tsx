type ToggleGroupProps = {
  options: string[];
  value: string;
  onChange: (value: string) => void;
};

function ToggleGroup({ options, value, onChange }: ToggleGroupProps) {
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

export default ToggleGroup;
