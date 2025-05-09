type DashboardCardProps = {
  title: string;
  value: string;
  icon: string;
  trend: string;
  trendDirection?: "up" | "down";
};

export default function DashboardCard({
  title,
  value,
  icon,
  trend,
  trendDirection = "up",
}: DashboardCardProps) {
  const getIcon = () => {
    switch (icon) {
      case "users":
        return "👥";
      case "dollar":
        return "💰";
      case "projects":
        return "📁";
      default:
        return "📊";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        <span className="text-2xl">{getIcon()}</span>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-2xl font-bold">{value}</p>
          <p
            className={`text-sm ${
              trendDirection === "up" ? "text-green-500" : "text-red-500"
            }`}
          >
            {trend} {trendDirection === "up" ? "↑" : "↓"}
          </p>
        </div>
      </div>
    </div>
  );
}
