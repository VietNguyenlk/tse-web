import { SubmitHandler, useForm } from "react-hook-form";
import { RegisterData } from "../../account/register/register.reducer";

// type FormValues = {
//   datetime: string; // The value from datetime-local input will be a string
// };
interface FormValues {
  datetime: string;
}

const AdminDashboard: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    defaultValues: {},
  });

  const onSubmit: SubmitHandler<RegisterData> = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="datetime">Select Date & Time:</label>
      <span className="text-red-600">{errors.userId?.message}</span>
      <input
        type="text"
        id="datetime"
        {...register("userId", {
          required: "Date & time is required",
          validate: {
            isAfter: (value) => {
              if (value.length < 8) {
                return "ko hop le";
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
