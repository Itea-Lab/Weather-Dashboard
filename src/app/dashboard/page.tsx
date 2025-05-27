import DashboardCard from "@/components/dashboard/DashboardCard";
import WindChart from "@/components/dashboard/WindChart";
import RainChart from "@/components/dashboard/RainChart";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
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
      <section className="my-4 grid grid-flow-col grid-rows-3 gap-6">
        <div className="col-span-1 w-[20rem]">
          <DashboardCard
            title="Wind Speed"
            icon="default"
            apiEndpoint="/api/windData"
            dataKey="avgWindSpeed"
            unit=" m/s"
          />
        </div>
        <div className="col-span-1 w-[20rem] row-span-1">
          <DashboardCard
            title="Daily Rainfall"
            icon="default"
            apiEndpoint="/api/rainFallData"
            dataKey="rainFallbyDay"
            unit=" mm"
          />
        </div>
        <div className="col-span-1 w-[20rem] row-span-1">
          <DashboardCard
            title="Hourly Rainfall"
            icon="default"
            apiEndpoint="/api/rainFallData"
            dataKey="rainFallbyHour"
            unit=" mm"
          />
        </div>
        <div className="row-span-3 col-span-3">
          <WindChart></WindChart>
        </div>
      </section>
      <section className="">
        <RainChart></RainChart>
      </section>
    </div>
  );
}
