type LoaderSize = "sm" | "md" | "lg";
type LoaderVariant = "spinner" | "dots" | "pulse" | "skeleton";

interface LoadingIndicatorProps {
  size?: LoaderSize;
  variant?: LoaderVariant;
  className?: string;
  text?: string;
}

const getSizeClasses = (size: LoaderSize) => {
  switch (size) {
    case "sm":
      return "w-4 h-4";
    case "lg":
      return "w-8 h-8";
    default:
      return "w-6 h-6";
  }
};

const Spinner = ({
  size = "md",
  className = "",
}: {
  size: LoaderSize;
  className?: string;
}) => (
  <div className={`animate-spin ${getSizeClasses(size)} ${className}`}>
    <svg className="w-full h-full text-gray-300" viewBox="0 0 24 24">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  </div>
);

const DotsLoader = ({ size = "md" }: { size: LoaderSize }) => {
  const dotSize = size === "sm" ? "w-1 h-1" : size === "lg" ? "w-3 h-3" : "w-2 h-2";
  return (
    <div className="flex space-x-1">
      <div className={`${dotSize} bg-gray-600 rounded-full animate-bounce`} />
      <div
        className={`${dotSize} bg-gray-600 rounded-full animate-bounce [animation-delay:0.2s]`}
      />
      <div
        className={`${dotSize} bg-gray-600 rounded-full animate-bounce [animation-delay:0.4s]`}
      />
    </div>
  );
};

const SkeletonLoader = () => (
  <div className="space-y-3">
    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
    <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
  </div>
);

const PulseLoader = ({ size = "md" }: { size: LoaderSize }) => {
  const pulseSize = getSizeClasses(size);
  return <div className={`${pulseSize} rounded-full bg-gray-600 animate-pulse`} />;
};

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  size = "md",
  variant = "spinner",
  className = "",
  text,
}) => {
  const renderLoader = () => {
    switch (variant) {
      case "dots":
        return <DotsLoader size={size} />;
      case "pulse":
        return <PulseLoader size={size} />;
      case "skeleton":
        return <SkeletonLoader />;
      default:
        return <Spinner size={size} className={className} />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      {renderLoader()}
      {text && <span className="text-sm text-gray-500">{text}</span>}
    </div>
  );
};

export default LoadingIndicator;
