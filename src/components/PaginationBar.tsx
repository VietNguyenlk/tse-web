import { ArrowLeft, ArrowRight, FirstPage, LastPage } from "@mui/icons-material";

interface PaginationBarProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationBar: React.FC<PaginationBarProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div>
      <nav className="flex items-center flex-column flex-wrap md:flex-row justify-center">
        <ul className="inline-flex space-x-1 rtl:space-x-reverse text-sm h-8">
          <li>
            <a
              href="/admin"
              className="flex items-center justify-center px-1 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <FirstPage />
            </a>
          </li>
          <li>
            <a
              href="/admin"
              className="flex items-center justify-center px-1 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <ArrowLeft />
            </a>
          </li>
          <li>
            <a
              href="/admin"
              className="bg-blue-50 flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              2
            </a>
          </li>
          <li>
            <div className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-gray-50 cursor-not-allowed">
              ...
            </div>
          </li>
          <li>
            <a
              href="/admin"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              50
            </a>
          </li>
          <li>
            <a
              href="/admin"
              className="flex items-center justify-center px-1 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <ArrowRight />
            </a>
          </li>
          <li>
            <a
              href="/admin"
              className="flex items-center justify-center px-1 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <LastPage />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default PaginationBar;
