import React, { useState, useEffect } from "react";
import LoadingIndicator from "./LoadingIndicator";

const LoadingOverlay: React.FC<{ isLoading: boolean; minTimeout: number }> = ({
  isLoading,
  minTimeout,
}) => {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isLoading) {
      setShouldShow(true); // Show immediately
    } else {
      timeout = setTimeout(() => setShouldShow(false), minTimeout); // Delay hiding
    }

    return () => clearTimeout(timeout); // Cleanup timeout on unmount or prop change
  }, [isLoading, minTimeout]);

  return (
    <>
      {shouldShow && (
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
          <div className="flex flex-col items-center gap-2">
            <LoadingIndicator variant="spinner" size="lg" />
            <span className="text-base text-gray-500">Loading data...</span>
          </div>
        </div>
      )}
    </>
  );
};

export default LoadingOverlay;
