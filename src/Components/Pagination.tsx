import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  setCurrentPage: (page: number) => void;
  setPageSize: (size: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  pageSize,
  setCurrentPage,
  setPageSize,
}) => {
  return (
    <div className="mt-4 flex items-center justify-between flex-wrap gap-2">
      {/* Page size selector */}
      <div>
        <label className="mr-2 font-medium">Page Size:</label>
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setCurrentPage(1); // reset to first page on size change
          }}
          className="border px-2 py-1 rounded"
        >
          <option value={10}>10</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>

      {/* Pagination buttons */}
      <div className="space-x-1 overflow-auto">
        <button
          onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, index) => {
          const pageNum = index + 1;
          return (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              className={`px-3 py-1 border rounded ${
                currentPage === pageNum ? "bg-blue-500 text-white" : "bg-white"
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
