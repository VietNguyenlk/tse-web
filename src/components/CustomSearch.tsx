import { Search } from "@mui/icons-material";
import React from "react";

const CustomSearch: React.FC = () => {
  return (
    <div className="space-x-2">
      <Search className="text-gray-500" />
      <input
        type="text"
        placeholder="Search..."
        className="border rounded text-xs h-6"
      />
    </div>
  );
};

export default CustomSearch;
