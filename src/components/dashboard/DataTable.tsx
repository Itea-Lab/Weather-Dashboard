"use client";

import { useState, useEffect } from "react";
import DatasetFilters from "./DataFilter";
import { useDatasetData, deleteDatapoint } from "@/lib/api";

export default function DatasetTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [filters, setFilters] = useState({
    search: "",
    sortOrder: "desc" as "asc" | "desc",
  });
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const { datasets = [], error, isLoading, mutate } = useDatasetData(filters);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Calculate pagination values
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = datasets.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(datasets.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleFilterChange = (newFilters: {
    search: string;
    sortOrder: "asc" | "desc";
  }) => {
    setFilters(newFilters);
  };

  const handleDelete = async (timestamp: string) => {
    try {
      const dataset = datasets.find((d) => d.timestamp === timestamp);
      if (!dataset) {
        throw new Error("Dataset not found");
      }

      // Confirm deletion
      const confirmDelete = window.confirm(
        `Are you sure you want to delete the record from ${new Date(
          dataset.timestamp
        ).toLocaleString()}?`
      );

      if (!confirmDelete) {
        return;
      }

      setIsDeleting(timestamp);
      setDeleteError(null);

      await deleteDatapoint(dataset.timestamp);
      await mutate();
      console.log("Dataset deleted successfully");
    } catch (error) {
      console.error("Error deleting dataset:", error);
      setDeleteError(
        error instanceof Error ? error.message : "Failed to delete dataset"
      );
    } finally {
      setIsDeleting(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading datasets...</div>
      </div>
    );
  }

  if (error) {
    let errorTitle = "Error Loading Data";
    let errorMessage = "An unexpected error occurred while loading datasets.";
    let errorAction = "Please try again later.";

    // Check error type
    if (error instanceof Error) {
      if ((error as any).isNetworkError) {
        errorTitle = "Connection Error";
        errorMessage = "Cannot connect to the server.";
        errorAction = "Please check your network connection and try again.";
      } else if ((error as any).status === 500) {
        errorTitle = "Database Connection Error";
        errorMessage = "Cannot connect to the database.";
        errorAction =
          "Please ensure the database is running and properly configured.";
      } else if (error.message.includes("Invalid data format")) {
        errorTitle = "Data Format Error";
        errorMessage = "The data received was not in the expected format.";
        errorAction = "Please contact support if this issue persists.";
      } else {

        errorMessage = error.message || errorMessage;
      }
    }

    return (
      <div className="flex flex-col items-center justify-center py-12 bg-white rounded-lg shadow">
        <div className="text-center px-6 max-w-md">
          <svg
            className="mx-auto h-12 w-12 text-red-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            {errorTitle}
          </h3>
          <p className="mt-1 text-gray-500">{errorMessage}</p>
          <p className="mt-1 text-sm text-gray-500">{errorAction}</p>
          <div className="mt-6">
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (datasets.length === 0 && !isLoading && !error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 bg-white rounded-lg shadow">
        <div className="text-center px-6 max-w-md">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            No Data Available
          </h3>
          <p className="mt-1 text-gray-500">
            There are no weather datasets available for the specified filters.
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your filters or check back later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <DatasetFilters
          sortOrder={filters.sortOrder}
          onFilterChange={handleFilterChange}
        />
      </div>
      {/* Show delete error if any */}
      {deleteError && (
        <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
          <p>Error: {deleteError}</p>
          <button
            onClick={() => setDeleteError(null)}
            className="text-red-800 underline text-sm mt-1"
          >
            Dismiss
          </button>
        </div>
      )}
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Timestamp
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Temperature {"(%)"}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Humidity {"(%)"}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Pressure {"(hPa)"}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Avg Wind Speed {"(m/s)"}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Max Wind Speed {"(m/s)"}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Wind Direction {"(°)"}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Rain Fall by Hour {"(mm)"}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Rain Fall by Day {"(mm)"}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Location
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.map((dataset) => (
              <tr key={dataset.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-sm font-medium text-gray-900">
                      {new Date(dataset.timestamp).toLocaleString()}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {dataset.temperature}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {dataset.humidity}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {dataset.pressure}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {dataset.avgWindSpeed}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {dataset.maxWindSpeed}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {dataset.windDirection}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {dataset.rainFallbyHour}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {dataset.rainFallbyDay}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {dataset.location}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-3">
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDelete(dataset.timestamp)}
                      disabled={isDeleting === dataset.timestamp}
                    >
                      {isDeleting === dataset.timestamp
                        ? "Deleting..."
                        : "Delete"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
        <div className="flex-1 flex justify-between sm:hidden">
          <button
            onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() =>
              paginate(currentPage < totalPages ? currentPage + 1 : totalPages)
            }
            disabled={currentPage === totalPages}
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
              <span className="font-medium">
                {indexOfLastItem > datasets.length
                  ? datasets.length
                  : indexOfLastItem}
              </span>{" "}
              of <span className="font-medium">{datasets.length}</span> results
            </p>
          </div>
          <div>
            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <button
                onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
              >
                <span className="sr-only">Previous</span>
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* Page numbers */}
              {(() => {
                const pageNumbers = [];
                const maxPagesToShow = 5;

                let startPage: number, endPage: number;

                if (totalPages <= maxPagesToShow) {
                  startPage = 1;
                  endPage = totalPages;
                } else {
                  // Calculate start and end pages
                  const middlePoint = Math.floor(maxPagesToShow / 2);

                  if (currentPage <= middlePoint + 1) {
                    startPage = 1;
                    endPage = maxPagesToShow - 1;
                    // Add last page and ellipsis
                    pageNumbers.push(
                      ...Array.from({ length: endPage }, (_, i) => i + 1).map(
                        (number) => (
                          <button
                            key={number}
                            onClick={() => paginate(number)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                              currentPage === number
                                ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                                : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                            }`}
                          >
                            {number}
                          </button>
                        )
                      )
                    );

                    // Add ellipsis if needed
                    if (totalPages > maxPagesToShow) {
                      pageNumbers.push(
                        <span
                          key="ellipsis"
                          className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                        >
                          ...
                        </span>
                      );
                    }

                    // Add last page
                    pageNumbers.push(
                      <button
                        key={totalPages}
                        onClick={() => paginate(totalPages)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          currentPage === totalPages
                            ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                            : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                        }`}
                      >
                        {totalPages}
                      </button>
                    );

                    return pageNumbers;
                  } else if (currentPage >= totalPages - middlePoint) {
                    // Near the end
                    startPage = totalPages - (maxPagesToShow - 2);
                    endPage = totalPages;

                    // Add first page
                    pageNumbers.push(
                      <button
                        key={1}
                        onClick={() => paginate(1)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          currentPage === 1
                            ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                            : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                        }`}
                      >
                        1
                      </button>
                    );

                    // Add ellipsis if needed
                    if (startPage > 2) {
                      pageNumbers.push(
                        <span
                          key="ellipsis"
                          className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                        >
                          ...
                        </span>
                      );
                    }

                    // Add remaining pages
                    pageNumbers.push(
                      ...Array.from(
                        { length: endPage - startPage + 1 },
                        (_, i) => i + startPage
                      ).map((number) => (
                        <button
                          key={number}
                          onClick={() => paginate(number)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            currentPage === number
                              ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                              : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                          }`}
                        >
                          {number}
                        </button>
                      ))
                    );

                    return pageNumbers;
                  } else {
                    // In the middle
                    startPage =
                      currentPage - Math.floor((maxPagesToShow - 3) / 2);
                    endPage = currentPage + Math.ceil((maxPagesToShow - 3) / 2);

                    // Add first page
                    pageNumbers.push(
                      <button
                        key={1}
                        onClick={() => paginate(1)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          currentPage === 1
                            ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                            : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                        }`}
                      >
                        1
                      </button>
                    );

                    // Add first ellipsis
                    if (startPage > 2) {
                      pageNumbers.push(
                        <span
                          key="ellipsis1"
                          className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                        >
                          ...
                        </span>
                      );
                    }

                    // Add middle pages
                    pageNumbers.push(
                      ...Array.from(
                        { length: endPage - startPage + 1 },
                        (_, i) => i + startPage
                      ).map((number) => (
                        <button
                          key={number}
                          onClick={() => paginate(number)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            currentPage === number
                              ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                              : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                          }`}
                        >
                          {number}
                        </button>
                      ))
                    );

                    // Add last ellipsis
                    if (endPage < totalPages - 1) {
                      pageNumbers.push(
                        <span
                          key="ellipsis2"
                          className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                        >
                          ...
                        </span>
                      );
                    }

                    // Add last page
                    if (endPage !== totalPages) {
                      pageNumbers.push(
                        <button
                          key={totalPages}
                          onClick={() => paginate(totalPages)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            currentPage === totalPages
                              ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                              : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                          }`}
                        >
                          {totalPages}
                        </button>
                      );
                    }

                    return pageNumbers;
                  }
                }

                // Handle the simple case when total pages <= maxPagesToShow
                return Array.from(
                  { length: endPage - startPage + 1 },
                  (_, i) => i + startPage
                ).map((number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      currentPage === number
                        ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                        : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    {number}
                  </button>
                ));
              })()}

              <button
                onClick={() =>
                  paginate(
                    currentPage < totalPages ? currentPage + 1 : totalPages
                  )
                }
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
              >
                <span className="sr-only">Next</span>
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
