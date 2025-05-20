"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { LayoutDashboard, Database, LogOut } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard /> },
    { name: "Dataset", path: "/dashboard/dataset", icon: <Database /> },
  ];

  const isActivePath = (path: string) => {
    return pathname === path;
  };

  return (
    <aside className="bg-indigo-800 text-white w-64 min-h-screen p-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-center">ITea Edge Hub</h2>
      </div>

      <div className="mb-6">
        <div className="px-4 py-3 rounded-lg bg-indigo-900 mb-4">
          <p className="text-sm opacity-75">Logged in as</p>
          <p className="font-medium">{user?.name}</p>
          <p className="text-sm text-indigo-300">{user?.email}</p>
        </div>
      </div>

      <nav>
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
      </nav>

      <div className="mt-auto pt-8">
        <button
          onClick={logout}
          className="w-full flex items-center px-4 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <span className="mr-3"><LogOut /></span>
          Logout
        </button>
      </div>
    </aside>
  );
}
