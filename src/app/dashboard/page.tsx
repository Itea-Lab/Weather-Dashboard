import DashboardCard from "@/components/dashboard/DashboardCard";
import WindChart from "@/components/dashboard/WindChart";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard title="Temperature" value="N/A" icon="temperature" />
          <DashboardCard title="Humidity" value="N/A" icon="humidity" />
          <DashboardCard
            title="Barometric Pressure"
            value="N/A"
            icon="barometric"
          />
        </div>
      </section>
      {/* More dashboard content */}
      <section className="my-4 grid grid-flow-col grid-rows-3 gap-6">
        <div className="col-span-1">
          <DashboardCard
            title="Barometric Pressure"
            value="N/A"
            icon="barometric"
          />
        </div>
        <div className="col-span-1 row-span-1">
          <DashboardCard
            title="Barometric Pressure"
            value="N/A"
            icon="barometric"
          />
        </div>
        <div className="col-span-1 row-span-1">
          <DashboardCard
            title="Barometric Pressure"
            value="N/A"
            icon="barometric"
          />
        </div>
        <div className="row-span-3 col-span-3">
          <WindChart></WindChart>
        </div>
      </section>
    </div>
  );
}
