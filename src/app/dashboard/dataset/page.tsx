// src/app/dashboard/datasets/page.tsx
import { Metadata } from "next";
import DatasetTable from "@/components/dashboard/DataTable";
import DatasetFilters from "@/components/dashboard/DataFilter";
import { Download } from "lucide-react";

export const metadata: Metadata = {
  title: "Datasets",
  description: "Browse and manage your datasets",
};

export default function DatasetsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-3xl font-bold">Datasets</h1>
        <div className="mt-4 md:mt-0">
          <button className="flex items-center  px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
            Export{" "}
            <span className="ml-2">
              <Download />
            </span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <DatasetFilters />
        </div>

        <div className="p-6">
          <DatasetTable />
        </div>
      </div>
    </div>
  );
}
