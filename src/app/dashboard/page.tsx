import DashboardCard from "@/components/dashboard/DashboardCard";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
          title="Temperature"
          value="1,245"
          icon="temperature"
        />
        <DashboardCard
          title="Humidity"
          value="$34,567"
          icon="humidity"
        />
        <DashboardCard
          title="Barometric Pressure"
          value="28"
          icon="barometric"
        />
      </div>

      {/* More dashboard content */}
    </div>
  );
}
