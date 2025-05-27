"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { LayoutDashboard, Database, LogOut } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard/overview", icon: <LayoutDashboard /> },
    { name: "Dataset", path: "/dashboard/dataset", icon: <Database /> },
  ];

  const isActivePath = (path: string) => {
    return pathname === path;
  };

  return (
    <aside className="bg-indigo-800 text-white w-50 min-h-screen flex flex-col">
      <div className="p-4 flex flex-col h-full fixed">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-center">ITea EdgeHub</h2>
        </div>

        <div className="mb-6">
          <div className="px-4 py-3 rounded-lg bg-indigo-900 mb-4">
            <p className="text-sm opacity-75">Logged in as</p>
            <p className="font-medium">{user?.name}</p>
            <p className="text-sm text-indigo-300">{user?.email}</p>
          </div>
        </div>

        <nav className="flex-1">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`flex items-center px-4 py-3 rounded-lg hover:bg-indigo-700 transition-colors ${
                    isActivePath(item.path) ? "bg-indigo-900" : ""
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mt-6 space-y-2">
            <button
              onClick={logout}
              className="w-full flex items-center px-4 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <span className="mr-3">
                <LogOut />
              </span>
              Logout
            </button>
          </ul>
        </nav>
      </div>
    </aside>
  );
}
