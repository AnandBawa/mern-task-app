import { useRef, useState } from "react";
import { Form, Link, useNavigation, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

// React Router action to register the user on form submission
export const registerAction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    delete data.repeat;
    data.email = data.email.toLowerCase();
    data.name = data.name.at(0).toUpperCase() + data.name.slice(1);

    const response = await customFetch.post("/auth/register", data);
    toast.success(response?.data?.message || "Account Created");
    return redirect("/");
  } catch (error) {
    toast.error(
      error?.response?.data?.message || "There was an error. Please try again"
    );
    return error;
  }
};

const Register = () => {
  // useNavigation hook to disable buttons when form is being submitted
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  // useRef hook to match repeat password with password input
  const passwordRef = useRef(null);

  // useState to display live input validation as field changes
  const [isNameValid, setNameValid] = useState(null);
  const [isEmailValid, setEmailValid] = useState(null);
  const [isPasswordValid, setPasswordValid] = useState(null);
  const [isRepeatValid, setRepeatValid] = useState(null);

  const nameRegex = /^[a-zA-Z]{3,20}$/;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const passwordRegex =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;

  return (
    <section className="h-screen grid justify-center content-start">
      <Form
        method="post"
        className="card sm:w-96 p-8 bg-base-200 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-xl font-semibold tracking-widest text-center underline decoration-1 underline-offset-8">
          REGISTER
        </h4>
        <h6 className="text-sm text-center ">* All fields are required</h6>
        <label className="form-control">
          <div className="label">
            <span className="label-text">First Name</span>
          </div>
          <input
            required
            type="text"
            name="name"
            className={`input input-bordered ${
              isNameValid === null
                ? ""
                : isNameValid
                ? "input-success"
                : "input-error"
            }`}
            onChange={(e) => {
              if (e.target.value === "") {
                setNameValid(null);
              } else {
                setNameValid(nameRegex.test(e.target.value));
              }
            }}
          />
          {isNameValid === false && (
            <div className="label">
              <span className="label-text-alt">
                <li>Name should be between 3 to 20 alphabets</li>
              </span>
            </div>
          )}
        </label>
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
            ref={passwordRef}
            required
            type="password"
            name="password"
            className={`input input-bordered ${
              isPasswordValid === null
                ? ""
                : isPasswordValid
                ? "input-success"
                : "input-error"
            } `}
            onChange={(e) => {
              if (e.target.value === "") {
                setPasswordValid(null);
              } else {
                setPasswordValid(passwordRegex.test(e.target.value));
              }
            }}
          />
          {isPasswordValid === false && (
            <div className="label">
              <div className="label-text-alt">
                <li>Password should be between 8 to 20 characters</li>
                <li>Combination of alphanumeric and special characters</li>
                <li>Special characters: !, @, #, $, %, ^, &, or *</li>
                <li>
                  At-least one uppercase alphabet, one lowercase alphabet, one
                  digit, and one special character
                </li>
              </div>
            </div>
          )}
        </label>
        <label className="form-control">
          <div className="label">
            <span className="label-text">Repeat Password</span>
          </div>
          <input
            required
            type="password"
            name="repeat"
            className={`input input-bordered ${
              isRepeatValid === null
                ? ""
                : isRepeatValid
                ? "input-success"
                : "input-error"
            } `}
            onChange={(e) => {
              if (e.target.value === "") {
                setRepeatValid(null);
              } else {
                setRepeatValid(e.target.value === passwordRef.current.value);
              }
            }}
          />
          {isRepeatValid === false && (
            <div className="label">
              <div className="label-text-alt">
                <li>Passwords do not match</li>
              </div>
            </div>
          )}
        </label>
        <button
          type="submit"
          className="btn btn-primary mt-2"
          disabled={
            isSubmitting ||
            !isNameValid ||
            !isEmailValid ||
            !isPasswordValid ||
            !isRepeatValid
          }
        >
          {isSubmitting ? (
            <>
              Registering <span className="loading loading-dots"></span>
            </>
          ) : (
            "Register"
          )}
        </button>
        <p className={isSubmitting ? "hidden" : "text-center"}>
          Already registered?{" "}
          <Link to="/" className="ml-2 link link-hover text-accent capitalize">
            Login
          </Link>
        </p>
      </Form>
    </section>
  );
};

export default Register;
