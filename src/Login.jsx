import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// Zod Schema for Login validation
const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3001/login", data)
      .then((result) => {
        console.log(result);
        if (result.data === "Logged in successfully") {
          localStorage.setItem("token", "eprjrh36w4lu534yh");
          navigate("/home");
        }
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
          <h2 className="text-center mb-4 text-primary fw-bold">Login</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
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
                placeholder="Enter your password"
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
              Log In
            </button>
          </form>

          <p className="text-center mt-3">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-decoration-none text-primary fw-bold"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
