import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../configs/store";
import ActivityBasicInfo from "../../../components/modals/ActivityBasicInfo";
import ActivityTimeLocation from "../../../components/modals/ActivityTimeLocation";
import FinalDetails from "../../../components/modals/FinalDetails";
import { ActivityType } from "../../../shared/models/enums/activity.enum";
import StepIndicator from "../../../components/modals/StepIndicator";
import { Close } from "@mui/icons-material";
import { IActivity } from "../../../shared/models/activity.model";
import { createActivity } from "../../activity/activity.reducer";

interface NewActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const NewActivityModal: React.FC<NewActivityModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();

  const MAX_STEPS = 3;
  const [currentStep, setCurrentStep] = useState(1);
  const [activity, setActivity] = useState<IActivity>({});
  const [validStep, setValidStep] = useState<boolean>(false);
  const [checkValid, setCheckValid] = useState<boolean>(false);
  const updateActivity = (newData: Partial<IActivity>) => {
    setActivity((prevActivity) => ({ ...prevActivity, ...newData }));
  };

  const handleCreateActivity = () => {
    dispatch(createActivity(activity));
  };

  // const handleNextStep = () => {
  //   if (validStep && currentStep < MAX_STEPS) {
  //     setCurrentStep(currentStep + 1);
  //     setValidStep(false);
  //   }
  // };

  const handleClose = () => {
    setActivity({});
    setCurrentStep(1);
    setValidStep(false);
    setCheckValid(false);
    onClose();
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 1:
        return (
          <ActivityBasicInfo
            activity={activity}
            updateActivity={updateActivity}
            setValidStep={setValidStep}
            checkValid={checkValid}
          />
        );
      case 2:
        return (
          <ActivityTimeLocation
            activity={activity}
            updateActivity={updateActivity}
            setValidStep={setValidStep}
            checkValid={checkValid}
            setCheckValid={setCheckValid}
          />
        );
      case 3:
        return (
          <FinalDetails
            activity={activity}
            updateActivity={updateActivity}
            setValidStep={setValidStep}
            checkValid={checkValid}
            setCheckValid={setCheckValid}
          />
        );
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
        <div className="relative w-full max-w-3xl rounded-lg bg-white shadow-xl">
          {currentStep !== MAX_STEPS && (
            <button
              className="absolute right-4 top-4 text-gray-600 px-2 py-2 hover:bg-gray-300 rounded-lg hover:text-gray-500"
              onClick={handleClose}
            >
              <Close />
            </button>
          )}
          {/* Body */}
          <div className="bg-gray-50 rounded-lg">
            <StepIndicator currentStep={currentStep} maxStep={MAX_STEPS} />

            <div className="max-w-3xl mx-auto px-4 py-12">
              <div className="mb-8 flex justify-center items-center">
                <div className="text-md text-gray-500">
                  Bước <strong className="text-black">{currentStep}</strong> trên
                  <strong className="text-black"> {MAX_STEPS}</strong>
                </div>
              </div>

              {renderStepContent(currentStep)}

              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => {
                    setValidStep(true);
                    setCheckValid(false);
                    currentStep > 1 && setCurrentStep(currentStep - 1);
                  }}
                  className={`text-gray-600 hover:text-gray-800 hover:border-gray-800 border rounded-xl border border-gray-600 rounded-xl px-2 py-2 font-medium ${
                    currentStep === 1 ? "invisible" : ""
                  }`}
                >
                  &larr; Trở lại
                </button>
                <button
                  onClick={() => {
                    if (validStep) {
                      setCheckValid(false);
                      if (currentStep < MAX_STEPS) {
                        setCurrentStep(currentStep + 1);

                        setCheckValid(true);
                      }
                    } else {
                      setCheckValid(true);
                    }
                    // if (!validStep) {
                    //   setCheckValid(true);
                    // } else {
                    //   setCheckValid(false);
                    //   handleNextStep();
                    // }
                  }}
                  className={`text-blue-600 hover:text-blue-800 hover:border-blue-800 font-medium border border-blue-600 rounded-xl px-2 py-2 font-medium ${
                    currentStep === MAX_STEPS ? "invisible" : ""
                  }`}
                >
                  Tiếp tục &rarr;
                </button>

                {currentStep === MAX_STEPS && (
                  <div className="space-x-3">
                    <button
                      onClick={handleClose}
                      className={`text-white bg-red-600 hover:border-red-600 border rounded-xl border border-white  rounded-xl px-4 py-2 font-medium `}
                    >
                      Huỷ
                    </button>
                    <button
                      onClick={handleCreateActivity}
                      className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium"
                    >
                      Tạo hoạt động
                    </button>
                  </div>
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
