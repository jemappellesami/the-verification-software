type InsightCardProps = {
  label: string;
  title: string;
  description: string;
};

function InsightCard({ label, title, description }: InsightCardProps) {
  return (
    <div className="insight-card">
      <p className="kicker">{label}</p>
      <h3>{title}</h3>
      <p className="helper">{description}</p>
    </div>
  );
}

export default InsightCard;
