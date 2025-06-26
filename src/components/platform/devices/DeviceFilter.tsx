export default function DeviceFilter() {
  return (
    <div className="flex items-center space-x-4">
      <label htmlFor="group" className="text-sm font-medium">
        Group:
      </label>
      <select
        id="group"
        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#688055]"
      >
        <option value="">All</option>
        <option value="group1">Group 1</option>
        <option value="group2">Group 2</option>
        <option value="group3">Group 3</option>
      </select>

      <label htmlFor="status" className="text-sm font-medium">
        Status:
      </label>
      <select
        id="status"
        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#688055]"
      >
        <option value="">All</option>
        <option value="active">Online</option>
        <option value="inactive">Offline</option>
      </select>
    </div>
  );
}
