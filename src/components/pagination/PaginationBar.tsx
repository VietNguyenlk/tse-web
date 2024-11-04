import { ArrowLeft, ArrowRight, FirstPage, LastPage } from "@mui/icons-material";

interface PaginationBarProps {
  currentPage: number;
  totalPages: number;
  handlePageChange?: (currentPage: number) => void;
}

const PaginationBar: React.FC<PaginationBarProps> = ({
  currentPage,
  totalPages,
  handlePageChange,
}) => {
  return (
    <div className="mt-4">
      <nav className="flex items-center flex-column flex-wrap md:flex-row justify-center">
        <ul className="inline-flex space-x-1 rtl:space-x-reverse text-sm h-8">
          <li>
            <button
              className={`flex items-center justify-center px-1 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg ${
                currentPage <= 1
                  ? ""
                  : "hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              }`}
              disabled={currentPage === 1}
              onClick={() => handlePageChange(1)}
            >
              <FirstPage />
            </button>
          </li>
          <li>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex items-center justify-center px-1 h-8 leading-tight text-gray-500 bg-white border border-gray-300 ${
                currentPage <= 1
                  ? ""
                  : "hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              }`}
            >
              <ArrowLeft />
            </button>
          </li>

          {currentPage === totalPages && (
            <li>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className="bg-gray-50 flex items-center justify-center px-3 h-8 leading-tight text-gray-500 border border-gray-300 hover:bg-blue-600 hover:text-white dark:bg-blue-600 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-blue-600 dark:hover:text-white"
              >
                {currentPage - 2}
              </button>
            </li>
          )}

          {(currentPage === totalPages - 1 || currentPage === totalPages) && (
            <li>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className="bg-gray-50 flex items-center justify-center px-3 h-8 leading-tight text-gray-500 border border-gray-300 hover:bg-blue-600 hover:text-white dark:bg-blue-600 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-blue-600 dark:hover:text-white"
              >
                {currentPage - 1}
              </button>
            </li>
          )}

          <li>
            <button className="bg-blue-500 flex items-center justify-center px-3 h-8 leading-tight text-white border border-gray-300 hover:bg-blue-600 hover:text-white dark:bg-blue-600 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-blue-600 dark:hover:text-white">
              {currentPage}
            </button>
          </li>
          {totalPages >= currentPage + 1 && (
            <li>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className="bg-gray-50 flex items-center justify-center px-3 h-8 leading-tight text-gray-500 border border-gray-300 hover:bg-blue-600 hover:text-white dark:bg-blue-600 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-blue-600 dark:hover:text-white"
              >
                {currentPage + 1}
              </button>
            </li>
          )}
          {totalPages > 4 && currentPage < totalPages - 2 && (
            <li>
              <div className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-gray-50 cursor-not-allowed">
                ...
              </div>
            </li>
          )}
          {totalPages > 3 && currentPage < totalPages - 1 && (
            <li>
              <button className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                {totalPages}
              </button>
            </li>
          )}
          <li>
            <button
              className={`flex items-center justify-center px-1 h-8 leading-tight text-gray-500 bg-white border border-gray-300 ${
                currentPage >= totalPages
                  ? ""
                  : "hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              }`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ArrowRight />
            </button>
          </li>
          <li>
            <button
              disabled={currentPage === totalPages}
              className={`flex items-center justify-center px-1 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg ${
                currentPage >= totalPages
                  ? ""
                  : "hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              }`}
            >
              <LastPage />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default PaginationBar;
