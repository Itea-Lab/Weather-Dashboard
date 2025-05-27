import DashboardCard from "@/components/dashboard/DashboardCard";
import WindChart from "@/components/dashboard/WindChart";
import RainChart from "@/components/dashboard/RainChart";

export const metadata = {
  title: "Overview - Dashboard",
  description: "Weather station overview dashboard",
};

export default function OverviewPage() { 
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Overview</h1>
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DashboardCard
              title="Temperature"
              icon="temperature"
              apiEndpoint="/api/dataset"
              dataKey="temperature"
              unit="°C"
            />
            <DashboardCard
              title="Humidity"
              icon="humidity"
              apiEndpoint="/api/dataset"
              dataKey="humidity"
              unit="%"
            />
            <DashboardCard
              title="Barometric Pressure"
              icon="barometric"
              apiEndpoint="/api/dataset"
              dataKey="pressure"
              unit=" hPa"
            />
          </div>
        </section>
        {/* More dashboard content */}
        <section className="my-4">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left side - Wind cards */}
            <div className="lg:w-1/3 space-y-6">
              <DashboardCard
                title="Wind Speed (Avg)"
                icon="windSpeed"
                apiEndpoint="/api/windData"
                dataKey="avgWindSpeed"
                unit=" m/s"
              />
              <DashboardCard
                title="Wind Speed (Max)"
                icon="windSpeed"
                apiEndpoint="/api/windData"
                dataKey="maxWindSpeed"
                unit="m/s"
              />
              <DashboardCard
                title="Wind Direction"
                icon="windDirection"
                apiEndpoint="/api/windData"
                dataKey="windDirection"
                unit="°"
              />
            </div>

            {/* Right side - Wind chart */}
            <div className="lg:w-2/3">
              <WindChart />
            </div>
          </div>
        </section>
        <section className="">
          <RainChart></RainChart>
        </section>
      </div>
    );
}