import DatasetTable from "@/components/platform/dataset/DataTable";
import { Download } from "lucide-react";
import ActionButton from "@/components/platform/ActionButton";

export const metadata = {
  title: "Datasets",
  description: "Browse and manage your datasets",
};

export default function DatasetsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-3xl font-bold">Datasets</h1>
        <div className="mt-4 md:mt-0">
          <ActionButton
            title="Export"
            icon={<Download className="w-4 h-4" />}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <DatasetTable />
        </div>
      </div>
    </div>
  );
}
