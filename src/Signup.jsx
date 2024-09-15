import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// Zod Schema for Signup validation
const SignupSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

function Signup() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignupSchema),
  });

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3001/register", data)
      .then((result) => {
        navigate("/login");
        console.log(result);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card shadow-lg"
        style={{ width: "100%", maxWidth: "400px", borderRadius: "12px" }}
      >
        <div className="card-body p-4">
          <h2 className="text-center mb-4 text-primary fw-bold">
            Create Account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label fw-semibold">
                Full Name
              </label>
              <input
                type="text"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                id="name"
                placeholder="Enter your full name"
                style={{ borderRadius: "8px" }}
                {...register("name")}
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name.message}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-semibold">
                Email Address
              </label>
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                id="email"
                placeholder="Enter your email"
                style={{ borderRadius: "8px" }}
                {...register("email")}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email.message}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-semibold">
                Password
              </label>
              <input
                type="password"
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                id="password"
                placeholder="Create a password"
                style={{ borderRadius: "8px" }}
                {...register("password")}
              />
              {errors.password && (
                <div className="invalid-feedback">
                  {errors.password.message}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              style={{
                borderRadius: "8px",
                padding: "10px",
                fontWeight: "600",
              }}
            >
              Register
            </button>
          </form>

          <p className="text-center mt-3">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-decoration-none text-primary fw-bold"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
