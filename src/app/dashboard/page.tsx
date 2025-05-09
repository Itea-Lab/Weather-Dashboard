import DashboardCard from "@/components/dashboard/DashboardCard";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
          title="Total Users"
          value="1,245"
          icon="users"
          trend="+12%"
        />
        <DashboardCard
          title="Revenue"
          value="$34,567"
          icon="dollar"
          trend="+8%"
        />
        <DashboardCard
          title="Active Projects"
          value="28"
          icon="projects"
          trend="-3%"
          trendDirection="down"
        />
      </div>

      {/* More dashboard content */}
    </div>
  );
}
