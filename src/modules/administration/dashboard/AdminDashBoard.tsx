import { SubmitHandler, useForm } from "react-hook-form";

type FormValues = {
  datetime: string; // The value from datetime-local input will be a string
};

const AdminDashboard: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      datetime: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="datetime">Select Date & Time:</label>
      <span className="text-red-600">{errors.datetime?.message}</span>
      <input
        type="datetime-local"
        id="datetime"
        {...register("datetime", {
          required: "Date & time is required",
          validate: {
            isAfter: (value) => {
              const today = new Date();
              const inputDate = new Date(value);
              if (inputDate.getTime() <= today.getTime()) {
                return "Phải lớn hơn ngày hiện tại";
              }
              return true;
            },
          },
        })}
      />

      <button type="submit">Submit</button>
    </form>
  );
  // return (
  //   <div className="bg-white rounded-lg shadow p-6">
  //     <h1 className="text-2xl font-bold mb-4">Welcome to HRSALE</h1>
  //     <p className="text-gray-600">
  //       This is the main content area. Add your dashboard components, charts, and
  //       tables here.
  //     </p>
  //   </div>
  // );
};

export default AdminDashboard;
