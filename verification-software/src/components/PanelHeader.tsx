type PanelHeaderProps = {
  badgeLabel: string;
  badgeVariant?: string;
  title: string;
  status: string;
  statusVariant?: string;
};

function PanelHeader({
  badgeLabel,
  badgeVariant,
  title,
  status,
  statusVariant,
}: PanelHeaderProps) {
  const badgeClass = badgeVariant ? `badge ${badgeVariant}` : "badge";
  const statusClass = statusVariant ? `status ${statusVariant}` : "status";

  return (
    <div className="panel-header">
      <div>
        <span className={badgeClass}>{badgeLabel}</span>
        <h2>{title}</h2>
      </div>
      <span className={statusClass}>{status}</span>
    </div>
  );
}

export default PanelHeader;
