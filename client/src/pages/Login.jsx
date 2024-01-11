import { Form, Link, useNavigation, redirect } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { useState } from "react";

export const loginAction =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    const { action } = data;

    if (action === "guest") {
      const user = {
        email: "test@test.com",
        password: "Test@123",
      };

      try {
        const response = await customFetch.post("/auth/login", user);
        queryClient.invalidateQueries();
        toast.success(response?.data?.message || "Welcome back!");
        return redirect("/tasks");
      } catch (error) {
        toast.error(
          error?.response?.data?.message ||
            "There was an error. Please try again"
        );
        return error;
      }
    }

    if (action === "login") {
      try {
        delete data.action;
        data.email = data.email.toLowerCase();

        const response = await customFetch.post("/auth/login", data);
        queryClient.invalidateQueries();
        toast.success(response?.data?.message || "Welcome back!");
        return redirect("/tasks");
      } catch (error) {
        toast.error(
          error?.response?.data?.message ||
            "There was an error. Please try again"
        );
        return error;
      }
    }
  };

const Login = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [isEmailValid, setEmailValid] = useState(null);
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  return (
    <section className="grid justify-center content-start">
      <div className="card sm:w-96 p-8 bg-base-200 shadow-lg flex flex-col gap-y-4">
        <h4 className="text-xl font-semibold tracking-widest text-center underline decoration-1 underline-offset-8">
          LOGIN
        </h4>
        <Form method="post">
          <label className="form-control">
            <div className="label">
              <span className="label-text">Email</span>
            </div>
            <input
              required
              type="text"
              name="email"
              className={`input input-bordered ${
                isEmailValid === null
                  ? ""
                  : isEmailValid
                  ? "input-success"
                  : "input-error"
              }`}
              onChange={(e) => {
                if (e.target.value === "") {
                  setEmailValid(null);
                } else {
                  setEmailValid(emailRegex.test(e.target.value));
                }
              }}
            />
            {isEmailValid === false && (
              <div className="label">
                <span className="label-text-alt">
                  <li>Please enter a valid email</li>
                </span>
              </div>
            )}
          </label>
          <label className="form-control">
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <input
              required
              type="password"
              name="password"
              className="input input-bordered"
            />
          </label>
          <button
            type="submit"
            name="action"
            value="login"
            className="btn btn-primary mt-4 w-full"
            disabled={isSubmitting || !isEmailValid}
          >
            {isSubmitting ? (
              <>
                Logging in <span className="loading loading-dots"></span>
              </>
            ) : (
              "Login"
            )}
          </button>
        </Form>
        <Form method="post">
          <button
            type="submit"
            name="action"
            value="guest"
            className="btn btn-secondary w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                Logging in <span className="loading loading-dots"></span>
              </>
            ) : (
              "Login as Guest"
            )}
          </button>
        </Form>
        <p className={isSubmitting ? "hidden" : "text-center"}>
          Not a member?{" "}
          <Link
            to="/register"
            className="ml-2 link link-hover text-accent capitalize"
          >
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
