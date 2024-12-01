import { Close, KeyboardArrowDown } from "@mui/icons-material";
import React, { useState, useRef, useEffect } from "react";

type FieldSize = "sm" | "md" | "lg";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  size?: FieldSize;
  options?: SelectOption[];
  onChange?: (selected: SelectOption | null) => void;
  onClear?: (selected: SelectOption | null) => void;
  placeholder?: string;
  value?: SelectOption | null;
}

const getSizeClasses = (size: FieldSize) => {
  switch (size) {
    case "sm":
      return "max-w-60";
    case "lg":
      return "max-w-100";
    default:
      return "max-w-80";
  }
};

const CustomSelect = ({
  options = [],
  onChange = () => {},
  onClear = () => {},
  size = "md",
  placeholder = "Select an option",
  value = null,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<SelectOption | null>(value);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearch("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: SelectOption) => {
    setSelected(option);
    setSearch("");
    setIsOpen(false);
    onChange(option);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelected(null);
    onChange(null);
    onClear(selected);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className={`relative ${getSizeClasses(size)}`} ref={containerRef}>
      <div
        className="min-h-10 w-full border rounded-lg bg-white px-3 py-2 cursor-pointer flex items-center gap-2"
        onClick={() => {
          setIsOpen(!isOpen);
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }}
      >
        {!isOpen ? (
          <div className="flex-1 truncate">
            {selected ? (
              <span className="text-black">{selected.label}</span>
            ) : (
              <span className="text-black">{placeholder}</span>
            )}
          </div>
        ) : (
          <input
            ref={inputRef}
            type="text"
            className="border-none focus:ring-0 w-full bg-transparent p-0"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Nhập để tìm..."
            onClick={(e) => e.stopPropagation()}
            autoFocus
          />
        )}

        {selected && (
          <button className="flex items-center" onClick={handleClear}>
            <Close className="w-4 h-4 text-gray-400" />
          </button>
        )}

        <div className="flex items-center gap-2">
          <KeyboardArrowDown
            className={`w-5 h-5 text-gray-400 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto">
          {filteredOptions.length === 0 ? (
            <div className="p-3 text-gray-500 text-center">
              {search ? "Không tìm thấy lựa chọn" : "Không có lựa chọn nào"}
            </div>
          ) : (
            filteredOptions.map((option) => (
              <div
                key={option.value}
                className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                  selected?.value === option.value ? "bg-blue-50 text-blue-600" : ""
                }`}
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
