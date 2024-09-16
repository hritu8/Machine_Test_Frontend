import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Navbar from "../Navbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Define the Zod schema for validation
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  mobileNo: z
    .string()
    .regex(/^\d+$/, "Mobile No must be numeric")
    .min(10, "Mobile No must be at least 10 digits"),
  designation: z.enum(
    ["HR", "Manager", "Sales"],
    "Please select a designation"
  ),
  gender: z.enum(["M", "F"], "Please select a gender"),
  course: z.array(z.string()).min(1, "Please select at least one course"),
  imgUpload: z
    .any()
    .refine(
      (files) =>
        files?.[0].type === "image/jpeg" || files?.[0].type === "image/png",
      {
        message: "Only JPG/PNG files are allowed",
      }
    ),
});

const CreateEmployee = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data) => {
    const formData = new FormData();

    // Append all fields except files to formData
    for (const key in data) {
      if (key === "imgUpload" && data.imgUpload.length > 0) {
        formData.append(key, data?.imgUpload[0]); // Append the file
      } else {
        formData.append(key, data[key]); // Append other form data
      }
    }

    axios
      .post("http://localhost:3001/addEmployee", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((result) => {
        reset();
        // Show success toast
        toast.success("Employee created successfully!", {
          position: "top-center",
        });
      })
      .catch((err) => {
        console.log(err);
        // Show error toast in case of failure
        toast.error("Error creating employee. Please try again.", {
          position: "top-center",
        });
      });
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg space-y-6"
        >
          {/* Name */}
          <div className="flex flex-col">
            <label htmlFor="name" className="text-gray-700 font-semibold mb-2">
              Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name")}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-700 font-semibold mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Mobile No */}
          <div className="flex flex-col">
            <label
              htmlFor="mobileNo"
              className="text-gray-700 font-semibold mb-2"
            >
              Mobile No
            </label>
            <input
              id="mobileNo"
              type="text"
              {...register("mobileNo")}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.mobileNo && (
              <p className="text-red-500 text-sm mt-1">
                {errors.mobileNo.message}
              </p>
            )}
          </div>

          {/* Designation */}
          <div className="flex flex-col">
            <label
              htmlFor="designation"
              className="text-gray-700 font-semibold mb-2"
            >
              Designation
            </label>
            <select
              id="designation"
              {...register("designation")}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select</option>
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>
            {errors.designation && (
              <p className="text-red-500 text-sm mt-1">
                {errors.designation.message}
              </p>
            )}
          </div>

          {/* Gender */}
          <div className="flex flex-col">
            <span className="text-gray-700 font-semibold mb-2">Gender</span>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="M"
                  {...register("gender")}
                  className="form-radio text-blue-500"
                />
                <span className="ml-2">M</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="F"
                  {...register("gender")}
                  className="form-radio text-blue-500"
                />
                <span className="ml-2">F</span>
              </label>
            </div>
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">
                {errors.gender.message}
              </p>
            )}
          </div>

          {/* Course */}
          <div className="flex flex-col">
            <span className="text-gray-700 font-semibold mb-2">Course</span>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="MCA"
                  {...register("course")}
                  className="form-checkbox text-blue-500"
                />
                <span className="ml-2">MCA</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="BCA"
                  {...register("course")}
                  className="form-checkbox text-blue-500"
                />
                <span className="ml-2">BCA</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="BSC"
                  {...register("course")}
                  className="form-checkbox text-blue-500"
                />
                <span className="ml-2">BSC</span>
              </label>
            </div>
            {errors.course && (
              <p className="text-red-500 text-sm mt-1">
                {errors.course.message}
              </p>
            )}
          </div>

          {/* Image Upload */}
          <div className="flex flex-col">
            <label
              htmlFor="imgUpload"
              className="text-gray-700 font-semibold mb-2"
            >
              Upload Image
            </label>
            <input
              id="imgUpload"
              type="file"
              {...register("imgUpload")}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.imgUpload && (
              <p className="text-red-500 text-sm mt-1">
                {errors.imgUpload.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg"
          >
            Add Employee
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default CreateEmployee;
