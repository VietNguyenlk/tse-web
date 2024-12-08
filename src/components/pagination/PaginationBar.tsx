import {
  ChevronLeft,
  ChevronRight,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
  MoreHoriz,
} from "@mui/icons-material";
import React from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  totalItems?: number;
  itemsPerPage?: number;
  isMargin?: boolean;
}

const PaginationBar: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
  onPageSizeChange,
  totalItems = 0,
  itemsPerPage = 10,
  isMargin = true,
}: PaginationProps) => {
  const getPageNumbers = () => {
    const pages = [];
    const showEllipsis = totalPages > 6;

    if (!showEllipsis) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // pages.push(1);

      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        );
      } else {
        pages.push(
          currentPage - 2,
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        );
      }
    }

    return pages;
  };

  // Calculate the range of items being displayed
  // const startItem = (currentPage - 1) * itemsPerPage + 1;
  // const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div
      className={`flex relative justify-center items-center space-y-4 ${
        isMargin ? "mt-8 mb-2" : ""
      }`}
    >
      <div className="absolute left-0 top-1/2 -translate-y-1/2 ">
        <span>Số lượng mỗi trang:&nbsp;</span>
        <select
          className="px-4 py-2 border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-10 text-sm cursor-pointer"
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
        >
          <option value={5}>5 </option>
          <option value={10}>10 </option>
          <option value={25}>25 </option>
          <option value={50}>50 </option>
          <option value={100}>100 </option>
        </select>
      </div>
      {/* Pagination controls */}
      <nav
        className="flex items-center justify-center space-x-2"
        aria-label="Pagination"
      >
        {/* Previous button */}
        <button
          onClick={() => currentPage > 1 && onPageChange(1)}
          disabled={currentPage === 1}
          className={`inline-flex items-center px-1 py-1 rounded-lg text-sm ${
            currentPage === 1
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          aria-label="Previous page"
        >
          <KeyboardDoubleArrowLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`inline-flex items-center px-1 py-1 rounded-lg text-sm ${
            currentPage === 1
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          aria-label="Previous page"
        >
          <ChevronLeft />
        </button>

        {/* Page numbers */}
        <div className="flex items-center space-x-1">
          {getPageNumbers().map((page, index) =>
            page === "..." ? (
              <span key={`ellipsis-${index}`} className="px-2 py-2">
                <MoreHoriz className="h-5 w-5 text-gray-400" />
              </span>
            ) : (
              <button
                key={index}
                onClick={() => typeof page === "number" && onPageChange(page)}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                aria-current={currentPage === page ? "page" : undefined}
              >
                {page}
              </button>
            ),
          )}
        </div>

        {/* Next button */}
        <button
          onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`inline-flex items-center px-2 py-2 rounded-lg text-sm ${
            currentPage === totalPages
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          aria-label="Next page"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        <button
          onClick={() => currentPage < totalPages && onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={`inline-flex items-center px-2 py-2 rounded-lg text-sm ${
            currentPage === totalPages
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          aria-label="Next page"
        >
          <KeyboardDoubleArrowRight className="h-5 w-5" />
        </button>
      </nav>
    </div>
  );
};

export default PaginationBar;
