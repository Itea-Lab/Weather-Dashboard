import AddDeviceButton from "@/components/platform/devices/addDeviceButton";
import ConnectButton from "@/components/platform/devices/connectButton";
import DeviceFilter from "@/components/platform/devices/DeviceFilter";

export const metadata = {
  title: "Devices",
  description: "Manage your IoT devices",
};

export default function DevicesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-3xl font-bold">Devices</h1>
      </div>
      {/* Device actions */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <ConnectButton />
            <AddDeviceButton />
          </div>
        </div>
      </div>
      {/* Device filter */}
      {/* Device list */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <p className="text-gray-500">No devices connected yet.</p>
          {/* Device list component can be added here */}
        </div>
      </div>
    </div>
  );
}
