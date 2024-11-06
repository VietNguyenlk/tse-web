import { ErrorOutline, Group, Image } from "@mui/icons-material";

const FinalDetails: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Final Touches</h2>
        <p className="text-gray-600">Just a few more details</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
        <div className="space-y-4">
          <h3 className="font-medium">Capacity & Registration</h3>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="number"
                  placeholder="Maximum participants"
                  className="w-full px-6 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Group className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <div className="flex-1">
              <div className="relative">
                <input
                  type="datetime-local"
                  placeholder="Registration deadline"
                  className="w-full px-6 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorOutline className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Materials & Resources</h3>
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
            <Image className="mx-auto text-gray-400 mb-4" />
            <p className="text-sm text-gray-600 mb-2">
              Drag and drop files here, or click to browse
            </p>
            <p className="text-xs text-gray-400">
              Supported formats: PDF, PPT, DOC (Max 10MB)
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Additional Options</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded text-blue-600" />
              <span className="text-sm text-gray-700">
                Require approval for registration
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded text-blue-600" />
              <span className="text-sm text-gray-700">
                Send reminder emails to participants
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded text-blue-600" />
              <span className="text-sm text-gray-700">
                Allow participants to submit questions beforehand
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalDetails;
