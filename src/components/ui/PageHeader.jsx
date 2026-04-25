export default function PageHeader({ icon, title, subtitle }) {
  return (
    <div className="page-header">
      <h1 className="page-header-title">
        {icon && <span className="page-header-icon">{icon}</span>}
        {title}
      </h1>
      {subtitle && <p className="page-header-subtitle">{subtitle}</p>}
      <div className="highlight-bar" />
    </div>
  );
}
