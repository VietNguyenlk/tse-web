import { Image, Link, Person } from "@mui/icons-material";

const ActivitySpeakerDetails: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Who's Speaking?</h2>
        <p className="text-gray-600">Tell us about the speaker</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
        <div className="flex gap-6">
          <div className="w-24 h-24 bg-gray-100 rounded-xl flex items-center justify-center">
            <Image className="text-gray-400" />
          </div>
          <div className="flex-1 space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Speaker's full name"
                className="w-full px-6 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Person className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Professional title / Role"
              className="w-full px-6 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <textarea
          placeholder="Speaker's bio and achievements..."
          rows={4}
          className="w-full px-6 py-4 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />

        <div className="flex gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="LinkedIn profile (optional)"
                className="w-full px-6 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Link className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ActivitySpeakerDetails;
