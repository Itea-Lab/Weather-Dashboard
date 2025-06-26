import { devices } from "@/lib/deviceData";
import DeviceFilter from "./DeviceFilter";

export default function DeviceTable() {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Connected Devices</h2>
          <DeviceFilter />
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-500">No devices connected yet.</p>
        {/* Device list component can be added here */}
        <table className="min-w-full divide-y divide-gray-200 mt-4">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Device Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Device Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Group
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Active
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Signal Strength
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {devices.map((device) => (
              <tr key={device.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {device.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {device.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {device.group}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {device.status}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {device.lastSeen}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {device.signalStrength} dBm
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
