import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Sidebar from "@/components/dashboard/Sidebar";

export const metadata = {
  title: "Dashboard",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <div className="flex min-h-screen bg-gray-100">
          <Sidebar />
          <div className="flex-1 p-8 overflow-x-hidden">{children}</div>
        </div>
      </ProtectedRoute>
    </AuthProvider>
  );
}
