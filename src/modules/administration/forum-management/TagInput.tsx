import { Close } from "@mui/icons-material";
import { useState } from "react";

const existingTags = [
  "React",
  "JavaScript",
  "Python",
  "Machine Learning",
  "Web Development",
  "Design",
  "Backend",
  "Frontend",
];

const TagInput: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [suggestedTags, setSuggestedTags] = useState(existingTags);
  const [isHashtagMode, setIsHashtagMode] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setIsHashtagMode(value.startsWith("#"));

    const filtered = existingTags.filter((tag) =>
      tag.toLowerCase().includes(value.toLowerCase()),
    );
    setSuggestedTags(filtered);
  };

  const addTag = (tag) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
      setInputValue("");
      setSuggestedTags(existingTags);
      setIsHashtagMode(false);
    }
  };

  const removeTag = (tagToRemove) => {
    setSelectedTags(selectedTags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (e.key === "Enter" && isHashtagMode) {
      e.preventDefault();
      const cleanTag = inputValue.replace("#", "").trim();
      if (cleanTag) {
        addTag(cleanTag);
      }
    }
  };

  return (
    <div className="w-full max-w-xl">
      <div className="relative">
        <div className="flex flex-wrap gap-2 mb-2">
          {selectedTags.map((tag) => (
            <div
              key={tag}
              className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
            >
              #{tag}
              <button
                onClick={() => removeTag(tag)}
                className="ml-2 hover:text-red-600"
              >
                <Close />
              </button>
            </div>
          ))}
        </div>

        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Add tags (type # and press Enter to create)"
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        />

        {inputValue && !isHashtagMode && (
          <div className="absolute z-10 w-full bg-white border rounded-md shadow-lg mt-1 max-h-48 overflow-y-auto">
            {suggestedTags.map((tag) => (
              <button
                key={tag}
                onClick={() => addTag(tag)}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TagInput;
