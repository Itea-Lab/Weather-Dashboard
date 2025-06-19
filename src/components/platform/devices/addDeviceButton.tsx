"use client";

import ActionButton from "@/components/platform/ActionButton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useState } from "react";
import { devices } from "@/lib/deviceData";

export default function AddDeviceButton() {
  const [isAddDeviceOpen, setIsAddDeviceOpen] = useState(false);
  const [deviceList, setDeviceList] = useState(devices);

  const handleAddDevice = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newDevice = {
      id: `device-${Date.now()}`,
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      group: formData.get("group") as string,
      connectionType: formData.get("type") as "mqtts" | "https",
      status: "online" as const,
      lastSeen: new Date().toISOString(),
      signalStrength: -45,
    };
    setDeviceList([...deviceList, newDevice]);
    setIsAddDeviceOpen(false);
  };

  return (
    <Dialog open={isAddDeviceOpen} onOpenChange={setIsAddDeviceOpen}>
      <DialogTrigger asChild>
        <ActionButton title="Add device" icon={<Plus className="w-4 h-4" />} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleAddDevice}>
          <DialogHeader>
            <DialogTitle>Add New Device</DialogTitle>
            <DialogDescription>
              Connect a new IoT device to your platform.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label
                htmlFor="name"
                className="block text-md font-medium text-gray-700"
              >
                Device Name
              </label>
              <input
                id="name"
                name="name"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#a8cd89] focus:border-[#a8cd89]"
                placeholder="e.g., Edge station"
                required
              />
            </div>
            <div className="grid gap-2">
              <label
                htmlFor="description"
                className="block text-md font-medium text-gray-700"
              >
                Description
              </label>
              <input
                id="description"
                name="description"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#a8cd89] focus:border-[#a8cd89]"
                required
              />
            </div>
            <div className="grid gap-2">
              <label
                className="block text-md font-medium text-gray-700"
                htmlFor="type"
              >
                Things Group
              </label>
              <Select name="group" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a group" />
                </SelectTrigger>
                <SelectContent className="bg-white border shadow-md">
                  <SelectItem value="weather_station">
                    weather_station
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <label
                className="block text-md font-medium text-gray-700"
                htmlFor="type"
              >
                Connection Type
              </label>
              <Select name="type" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select connection type" />
                </SelectTrigger>
                <SelectContent className="bg-white border shadow-md">
                  <SelectItem value="mqtts">MQTTS</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <button className="rounded-md bg-white hover:bg-gray-100 mx-2 p-2 transition" type="button"
              onClick={() => setIsAddDeviceOpen(false)}
            >Cancel</button>
            <ActionButton title="Add device"></ActionButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
