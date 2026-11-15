type StatCardProps = {
  title: string;
  value: string;
  subtitle: string;
  trend: string;
  tone: "emerald" | "blue" | "amber" | "violet";
};

export default function StatCard({
  title,
  value,
  subtitle,
  trend,
  tone,
}: StatCardProps) {
  return (
    <div className={`stat-card ${tone}`}>
      <div className="stat-head">
        <span>{title}</span>
        <span className="trend">{trend}</span>
      </div>

      <div className="stat-value">{value}</div>
      <div className="stat-subtitle">{subtitle}</div>
    </div>
  );
}
