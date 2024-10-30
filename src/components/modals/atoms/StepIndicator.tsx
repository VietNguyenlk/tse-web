interface StepIndicatorProps {
  currentStep: number;
  maxStep: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, maxStep }) => {
  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200">
      <div
        className="h-full bg-blue-600 transition-all duration-500 ease-in-out"
        style={{ width: `${(currentStep / maxStep) * 100}%` }}
      />
    </div>
  );
};
export default StepIndicator;
