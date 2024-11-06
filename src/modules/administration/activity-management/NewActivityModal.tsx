import { useState } from "react";
import { useAppDispatch } from "../../../configs/store";
import ActivityBasicInfo from "../../../components/modals/ActivityBasicInfo";
import ActivityTimeLocation from "../../../components/modals/ActivityTimeLocation";
import FinalDetails from "../../../components/modals/FinalDetails";
import { ActivityType } from "../../../shared/models/enums/activity.enum";
import StepIndicator from "../../../components/modals/StepIndicator";

interface NewActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewActivityModal: React.FC<NewActivityModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();

  const maxStep = 3;
  const [currentStep, setCurrentStep] = useState(1);
  const [activityTitle, setActivityTitle] = useState<string>("");
  const [activityDescription, setActivityDescription] = useState<string>("");
  const [activityType, setActivityType] =
    useState<keyof typeof ActivityType>("SEMINAR");

  const updateActivityStateByStep = (step: number) => {
    switch (step) {
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;
      default:
        break;
    }
  };

  // const handleCreateActivity = () => {
  //   dispatch(createActivity({
  //     title: activityTitle,
  //     description: activityDescription,
  //   }))
  // }

  const renderStepContent = (step: number) => {
    switch (step) {
      case 1:
        return (
          <ActivityBasicInfo
            setActivityTitle={setActivityTitle}
            setActivityDescription={setActivityDescription}
            setActivityType={setActivityType}
          />
        );
      case 2:
        return <ActivityTimeLocation />;
      case 3:
        return <FinalDetails />;
      default:
        return null;
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
      {/* Modal */}
      <div className="flex min-h-full items-start justify-center p-4">
        <div className="relative w-full max-w-4xl rounded-lg bg-white shadow-xl">
          {/* Body */}
          <div className="bg-gray-50 rounded-lg">
            <StepIndicator currentStep={currentStep} maxStep={maxStep} />

            <div className="max-w-2xl mx-auto px-4 py-12">
              <div className="mb-8 flex justify-center items-center">
                <div className="text-md text-gray-500">
                  Step <strong className="text-black">{currentStep}</strong> of
                  <strong className="text-black"> {maxStep}</strong>
                </div>
              </div>

              {renderStepContent(currentStep)}

              <div className="mt-8 flex justify-between">
                {currentStep === 1 && (
                  <button
                    onClick={onClose}
                    className={`text-white bg-red-600 hover:border-red-600 border rounded-xl border border-white  rounded-xl px-2 py-2 font-medium `}
                  >
                    Cancel
                  </button>
                )}

                <button
                  onClick={() => currentStep > 1 && setCurrentStep(currentStep - 1)}
                  className={`text-gray-600 hover:text-gray-800 hover:border-gray-800 border rounded-xl border border-gray-600 rounded-xl px-2 py-2 font-medium ${
                    currentStep === 1 ? "invisible" : ""
                  }`}
                >
                  &larr; Back
                </button>
                <button
                  onClick={() =>
                    currentStep < maxStep && setCurrentStep(currentStep + 1)
                  }
                  className={`text-blue-600 hover:text-blue-800 hover:border-blue-800 font-medium border border-blue-600 rounded-xl px-2 py-2 font-medium ${
                    currentStep === maxStep ? "invisible" : ""
                  }`}
                >
                  Next &rarr;
                </button>

                {currentStep === maxStep && (
                  <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium">
                    Create Seminar
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewActivityModal;
