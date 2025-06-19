export default function DeviceFilter() {
  return (
    <div className="flex items-center space-x-4">
      <label htmlFor="deviceType" className="text-sm font-medium">
        Device Type:
      </label>
      <select
        id="deviceType"
        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#688055]"
      >
        <option value="">All</option>
        <option value="sensor">Sensor</option>
        <option value="actuator">Actuator</option>
        <option value="gateway">Gateway</option>
      </select>

      <label htmlFor="status" className="text-sm font-medium">
        Status:
      </label>
      <select
        id="status"
        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#688055]"
      >
        <option value="">All</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
    </div>
  );
}