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

import { useState } from "react";

export default function ConnectButton() {
  const [isConnectOpen, setIsConnectOpen] = useState(false);
  return (
    <Dialog open={isConnectOpen} onOpenChange={setIsConnectOpen}>
      <DialogTrigger asChild>
        <ActionButton title="Test Connection" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Test Connection</DialogTitle>
          <DialogDescription>
            Connect your IoT device to the platform.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Connection form will go here */}
        </div>
        <DialogFooter>
          <button
            className="rounded-md bg-white hover:bg-gray-100 mx-2 p-2 transition"
            type="button"
            onClick={() => setIsConnectOpen(false)}
          >
            Close
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
