// ═══════════════════════════════════════════════════════════════════════════
// STREAMORA — EmptyState Component
// ═══════════════════════════════════════════════════════════════════════════

export default function EmptyState({ icon = '🔍', title, subtitle, actionLabel, onAction }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">{icon}</div>
      <div className="empty-title">{title}</div>
      {subtitle && <div className="empty-sub">{subtitle}</div>}
      {actionLabel && onAction && (
        <button className="btn-primary empty-state-action" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
