import type { ReactNode } from "react";

type PanelHeaderProps = {
  badgeLabel?: string;
  badgeVariant?: string;
  title: string;
  status?: string;
  statusVariant?: string;
  rightContent?: ReactNode;
};

function PanelHeader({
  badgeLabel,
  badgeVariant,
  title,
  status,
  statusVariant,
  rightContent,
}: PanelHeaderProps) {
  const badgeClass = badgeVariant ? `badge ${badgeVariant}` : "badge";
  const statusClass = statusVariant ? `status ${statusVariant}` : "status";

  return (
    <div className="panel-header">
      <div>
        {badgeLabel ? <span className={badgeClass}>{badgeLabel}</span> : null}
        <h2>{title}</h2>
      </div>
      {rightContent ? (
        rightContent
      ) : status ? (
        <span className={statusClass}>{status}</span>
      ) : null}
    </div>
  );
}

export default PanelHeader;
