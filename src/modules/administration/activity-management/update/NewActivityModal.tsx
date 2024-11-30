import { Close } from "@mui/icons-material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import StepIndicator from "../../../../components/loading/StepIndicator";
import { useAppDispatch } from "../../../../configs/store";
import { IActivity } from "../../../../shared/models/activity.model";
import { createActivity } from "../activity-management.reducer";
import ActivityBasicInfo from "./ActivityBasicInfo";
import ActivityTimeLocation from "./ActivityTimeLocation";
import FinalDetails from "./FinalDetails";

interface NewActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const NewActivityModal: React.FC<NewActivityModalProps> = ({ isOpen, onClose }) => {
  const timeOuts = 500;
  const dispatch = useAppDispatch();
  const {
    register,
    trigger,
    getValues,
    setValue,
    setError,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<IActivity>({
    defaultValues: {},
    mode: "onChange",
  });

  const MAX_STEPS = 3;
  const [currentStep, setCurrentStep] = useState(1);

  const handleClose = () => {
    reset();
    setCurrentStep(1);
    onClose();
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 1:
        return (
          <ActivityBasicInfo
            register={register}
            setValue={setValue}
            errors={errors}
            getValues={getValues}
          />
        );
      case 2:
        return (
          <ActivityTimeLocation
            errors={errors}
            getValues={getValues}
            register={register}
            setValue={setValue}
            setError={setError}
            clearErrors={clearErrors}
          />
        );
      case 3:
        return (
          <FinalDetails
            errors={errors}
            getValues={getValues}
            register={register}
            setValue={setValue}
            setError={setError}
            clearErrors={clearErrors}
          />
        );
      default:
        return null;
    }
  };

  const submitHandler = (data: IActivity) => {
    dispatch(createActivity(data));
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />

      {/* Modal */}
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="flex min-h-full items-start justify-center p-4">
          <div className="relative w-full max-w-3xl rounded-lg bg-white shadow-xl">
            {currentStep !== MAX_STEPS && (
              <button
                type="button"
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
                      if (currentStep > 1) {
                        setCurrentStep(currentStep - 1);
                      }
                    }}
                    type="button"
                    className={`text-gray-600 hover:text-gray-800 hover:border-gray-800 border rounded-xl border border-gray-600 rounded-xl px-2 py-2 font-medium ${
                      currentStep === 1 ? "invisible" : ""
                    }`}
                  >
                    &larr; Trở lại
                  </button>
                  <button
                    type="button"
                    onClick={async () => {
                      const isValid = await trigger();
                      if (isValid) {
                        if (currentStep < MAX_STEPS) {
                          setCurrentStep(currentStep + 1);
                        }
                      }
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
                        type="button"
                        onClick={handleClose}
                        className={`text-white bg-red-600 hover:border-red-600 border rounded-xl border border-white  rounded-xl px-4 py-2 font-medium `}
                      >
                        Huỷ
                      </button>
                      <button
                        type="submit"
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
      </form>
    </div>
  );
};

export default NewActivityModal;
