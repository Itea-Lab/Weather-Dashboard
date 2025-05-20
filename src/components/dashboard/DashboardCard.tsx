import {
  Thermometer,
  Droplets,
  Gauge,
  ChartNoAxesCombined,
} from "lucide-react";

type DashboardCardProps = {
  title: string;
  value: string;
  icon: string;
};

export default function DashboardCard({
  title,
  value,
  icon,
}: DashboardCardProps) {
  const getIcon = () => {
    switch (icon) {
      case "temperature":
        return <Thermometer/>;
      case "humidity":
        return <Droplets/>;
      case "barometric":
        return <Gauge/>;
      default:
        return <ChartNoAxesCombined/>;
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
        </div>
      </div>
    </div>
  );
}
