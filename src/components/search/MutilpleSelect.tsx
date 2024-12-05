import { Check, Close, KeyboardArrowDown } from "@mui/icons-material";
import React, { useState, useRef, useEffect } from "react";

type FieldSize = "sm" | "md" | "lg";

export interface MultiSelectOption {
  value: string;
  label: string;
}

interface MultiSelectProps {
  size?: FieldSize;
  placeholder?: string;
  maxSizeSelected?: number;
  options?: MultiSelectOption[];
  onChange?: (selected: MultiSelectOption[]) => void;
  onRemove?: (selected: MultiSelectOption[]) => void;
  showSelectedCount?: boolean;
  onBlur?: (selected: MultiSelectOption[]) => void; // add here
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
const MultiSelect = ({
  options = [],
  onChange = () => {},
  onRemove = () => {},
  size = "md",
  onBlur = () => {},
  placeholder = "Tất cả",
  maxSizeSelected = 1,
}: MultiSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<MultiSelectOption[]>([]);
  const [hasBlurred, setHasBlurred] = useState(false); // add
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
        // add here
        if (!hasBlurred && selected.length > 0) {
          onBlur(selected); // Trigger onBlur callback
          setHasBlurred(true);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [selected, onBlur]);

  const isSelected = (option: MultiSelectOption) =>
    selected.some((item) => item.value === option.value);

  const toggleSelect = (option: MultiSelectOption) => {
    let newSelected;
    if (isSelected(option)) {
      newSelected = selected.filter((item) => item.value !== option.value);
    } else {
      newSelected = [...selected, option];
    }
    setSelected(newSelected);
    onChange(newSelected);
  };

  const handleRemove = (optionToRemove: MultiSelectOption) => {
    const newSelected = selected.filter(
      (option) => option.value !== optionToRemove.value,
    );
    setSelected(newSelected);
    onChange(newSelected);
    onRemove(newSelected);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (e.key === "Backspace" && search === "" && selected.length > 0) {
      handleRemove(selected[selected.length - 1]);
    }
  };

  const handleClickInside = () => {
    setHasBlurred(false);
  };

  return (
    <div
      className={`relative ${getSizeClasses(size)} `}
      ref={containerRef}
      onClick={handleClickInside}
    >
      <div
        className="min-h-10 border w-full rounded-lg bg-white px-2 cursor-text flex items-center gap-1 "
        onClick={() => {
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }}
      >
        {selected.length === 0 && !search && (
          <span className="text-base absolute left-3">{placeholder}</span>
        )}

        <div className="flex gap-1 items-center">
          {/* List selected and input*/}

          {selected.slice(0, maxSizeSelected).map((option, index) => (
            <div
              key={`${option.value}-${index}`}
              className="bg-blue-100 text-blue-800 rounded px-1.5 py-0.5 text-sm flex items-center gap-1 group"
            >
              <span
                className={`block ${
                  size === "sm" ? "max-w-10" : ""
                } text-base overflow-hidden whitespace-nowrap text-ellipsis`}
              >
                {option.label}
              </span>
              <button
                onClick={(e) => {
                  handleRemove(option);
                }}
                className="hover:bg-blue-200 rounded-full p-0.5 opacity-60 group-hover:opacity-100"
              >
                <Close className="w-3 h-3" />
              </button>
            </div>
          ))}
          {selected.length > maxSizeSelected && (
            <div className="bg-blue-100 text-blue-800 rounded px-1.5 py-0.5 text-base flex items-center gap-1 group">
              +{selected.length - maxSizeSelected}
              <button
                onClick={(e) => {
                  handleRemove(selected[selected.length - 1]);
                }}
                className="hover:bg-blue-200 rounded-full p-0.5 opacity-60 group-hover:opacity-100"
              >
                <Close className="w-3 h-3" />
              </button>
            </div>
          )}
          <input
            ref={inputRef}
            type="text"
            className={`border-none focus:ring-0 w-full ${
              selected.length === 0 && !search ? "ml-3" : ""
            }`}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
          />
        </div>

        <button
          onClick={(e) => {
            setIsOpen(!isOpen);
          }}
          className="self-center ml-auto"
        >
          <KeyboardArrowDown
            className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {/* Options list */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-40 overflow-auto">
          {filteredOptions.length === 0 ? (
            <div className="p-2 text-gray-500">
              {search ? "Không tìm thấy lựa chọn" : "Không có lựa chọn nào"}
            </div>
          ) : (
            filteredOptions.map((option) => {
              const isItemSelected = isSelected(option);
              return (
                <div
                  key={option.value}
                  className={`px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2
                      ${isItemSelected ? "bg-blue-50" : ""}`}
                  onClick={() => toggleSelect(option)}
                >
                  {option.label}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
