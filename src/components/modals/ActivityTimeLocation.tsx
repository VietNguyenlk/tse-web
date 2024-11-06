import { AddLink, LocationOn, LockClock } from "@mui/icons-material";
import { useState } from "react";

const ActivityTimeLocation: React.FC = () => {
  const [selectedVenueType, setSelectedVenueType] = useState<string>("offline");
  const [venueValue, setVenueValue] = useState<string>("");
  const venueTypeData = [
    {
      id: "offline",
      name: "Offline",
    },
    {
      id: "online",
      name: "Online",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Time and venue</h2>
        <p className="text-gray-600">Set the perfect time and venue</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
        <div className="flex gap-4">
          <div className="flex-1 space-y-2">
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <div className="relative">
              <input
                type="date"
                className="w-full px-6 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1 space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Start Time
            </label>
            <div className="relative">
              <input
                type="time"
                className="w-full px-6 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500
                          [&::-webkit-calendar-picker-indicator]:opacity-100
                          [&::-webkit-calendar-picker-indicator]:inline-block
                          [&::-webkit-calendar-picker-indicator]:hover:cursor-pointer
                          [&::-webkit-time-picker-indicator]:opacity-100
                          [&::-webkit-time-picker-indicator]:inline-block
                          [&::-webkit-time-picker-indicator]:hover:cursor-pointer"
              />
              <LockClock className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
            </div>
          </div>
          <div className="flex-1 space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              End Time
            </label>
            <div className="relative">
              <input
                type="time"
                className="w-full px-6 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500
                          [&::-webkit-calendar-picker-indicator]:opacity-100
                          [&::-webkit-calendar-picker-indicator]:inline-block
                          [&::-webkit-calendar-picker-indicator]:hover:cursor-pointer
                          [&::-webkit-time-picker-indicator]:opacity-100
                          [&::-webkit-time-picker-indicator]:inline-block
                          [&::-webkit-time-picker-indicator]:hover:cursor-pointer"
              />
              <LockClock className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Venue Type</h3>
          <div className="flex gap-4">
            {venueTypeData.map((venueType) => (
              <button
                key={venueType.id}
                onClick={() => {
                  setSelectedVenueType(venueType.id);
                  setVenueValue("");
                }}
                className={`px-4 py-2 rounded-lg font-medium ${
                  selectedVenueType === venueType.id
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600"
                }`}
              >
                {venueType.name}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <input
            type="text"
            onChange={(e) => setVenueValue(e.target.value)}
            value={venueValue}
            placeholder={
              selectedVenueType === "offline"
                ? "Enter address location"
                : "Enter online meeting link"
            }
            className="w-full px-6 py-4 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {selectedVenueType === "offline" ? (
            <LocationOn className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
          ) : (
            <AddLink className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityTimeLocation;
