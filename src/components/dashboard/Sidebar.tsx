"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { LayoutDashboard, Database, LogOut } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const menuItems = [
    {
      name: "Overview",
      path: "/dashboard/overview",
      icon: <LayoutDashboard />,
    },
    { name: "Dataset", path: "/dashboard/dataset", icon: <Database /> },
  ];

  const isActivePath = (path: string) => {
    return pathname === path;
  };

  return (
    <aside className="bg-[#4D5E3F] text-white w-50 min-h-screen flex flex-col py-6">
      <div className="p-3 flex flex-col h-full fixed">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-center">ITea EdgeHub</h2>
        </div>

        <div className="mb-6">
          <div className="px-4 py-3 rounded-lg bg-[#688055] mb-4">
            <p className="text-sm opacity-75">Logged in as</p>
            <p className="font-medium">{user?.name || "Loading..."}</p>
            <p className="text-sm text-[#A8CD89]">
              {user?.email || "Loading..."}
            </p>
          </div>
        </div>

        <nav className="flex-1">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`flex items-center px-4 py-3 rounded-lg hover:bg-[#84A26C] transition-colors ${
                    isActivePath(item.path) ? "bg-[#688055]" : ""
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <button
            onClick={logout}
            className="mt-6 space-y-2 w-full flex items-center px-4 py-3 rounded-lg hover:bg-[#84A26C] transition-colors"
          >
            <span className="mr-3">
              <LogOut />
            </span>
            Logout
          </button>
        </nav>
      </div>
    </aside>
  );
}
