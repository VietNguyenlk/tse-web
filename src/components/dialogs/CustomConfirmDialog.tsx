interface CustomConfirmDialogProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
}

const CustomConfirmDialog: React.FC<CustomConfirmDialogProps> = ({
  isOpen,
  onCancel = () => {},
  onConfirm = () => {},
  title = "Bạn có chắc chắc thực hiện hành động?",
  description = "Hành động này không thể hoàn tác",
  confirmText = "Xác nhận",
  cancelText = "Huỷ",
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h2>
        <p className="mt-4 text-gray-700 dark:text-gray-300">{description}</p>
        <div className="mt-6 flex justify-end space-x-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-base font-medium text-white bg-red-600 hover:bg-red-500 rounded-lg transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-base font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
  //   return (
  //     <div
  //       className="relative z-100"
  //       aria-labelledby="modal-title"
  //       role="dialog"
  //       aria-modal="true"
  //     >
  //       <div
  //         className="fixed inset-0 bg-gray-500/75 transition-opacity"
  //         aria-hidden="true"
  //       ></div>

  //       <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
  //         <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
  //           {/* <!--
  //               Modal panel, show/hide based on modal state.

  //               Entering: "ease-out duration-300"
  //                 From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
  //                 To: "opacity-100 translate-y-0 sm:scale-100"
  //               Leaving: "ease-in duration-200"
  //                 From: "opacity-100 translate-y-0 sm:scale-100"
  //                 To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
  //             --> */}
  //           <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
  //             <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
  //               <div className="sm:flex sm:items-start">
  //                 <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
  //                   <svg
  //                     className="size-6 text-red-600"
  //                     fill="none"
  //                     viewBox="0 0 24 24"
  //                     stroke-width="1.5"
  //                     stroke="currentColor"
  //                     aria-hidden="true"
  //                     data-slot="icon"
  //                   >
  //                     <path
  //                       stroke-linecap="round"
  //                       stroke-linejoin="round"
  //                       d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
  //                     />
  //                   </svg>
  //                 </div>
  //                 <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
  //                   <h3
  //                     className="text-base font-semibold text-gray-900"
  //                     id="modal-title"
  //                   >
  //                     {title}
  //                   </h3>
  //                   <div className="mt-2">
  //                     <p className="text-sm text-gray-500">{description}</p>
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //             <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
  //               <button
  //                 type="button"
  //                 onClick={onConfirm}
  //                 className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
  //               >
  //                 {confirmText}
  //               </button>
  //               <button
  //                 type="button"
  //                 onClick={onCancel}
  //                 className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
  //               >
  //                 {cancelText}
  //               </button>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
};

export default CustomConfirmDialog;
