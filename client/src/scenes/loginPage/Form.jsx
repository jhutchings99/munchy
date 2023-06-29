import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state";
import Logo from "../../assets/munchy-logo.png";

const registerSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("Required"),
  password: yup.string().required("Required"),
  username: yup.string().required("Required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("Required"),
  password: yup.string().required("Required"),
});

const initialValuesRegister = {
  email: "",
  password: "",
  username: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("register");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const URL = import.meta.env.VITE_BACKEND_URL;

  const register = async (values, onSubmitProps) => {
    const registerResponse = await fetch(`${URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const savedUser = await registerResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      setPageType("login");
    }
  };

  const login = async (values, onSubmitProps) => {
    const loginResponse = await fetch(`${URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const loggedIn = await loginResponse.json();
    onSubmitProps.resetForm();

    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <div className="h-full w-full flex items-center justify-center">
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
        validationSchema={isLogin ? loginSchema : registerSchema}
      >
        {({ values, handleChange, handleBlur, handleSubmit, resetForm }) => (
          <form
            onSubmit={handleSubmit}
            className="p-3 m-6 shadow-xl bg-gray-100 rounded-md sm:w-[60vw] md:w-[50vw] lg:w-[40vw]"
          >
            <div className="flex justify-center items-center gap-2 font-medium text-xl mb-4">
              <img src={Logo} alt="Munchy Logo" className="h-14" />
              <p>Munchy</p>
            </div>
            <p className="w-full my-4 text-sm text-text">
              The Social Network for Foodies, Recipe Enthusiasts, and Kitchen
              Innovators!
            </p>
            <div className="flex flex-col gap-3">
              {isRegister && (
                <div>
                  <p className="mb-1 font-medium text-sm text-text">Username</p>
                  <input
                    label="Username"
                    placeholder="username"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.username}
                    name="username"
                    className=" p-2 rounded-md w-full text-text"
                  />
                </div>
              )}
              <div>
                <p className="mb-1 font-medium text-sm text-text">Email</p>
                <input
                  label="Email"
                  placeholder="name@example.com"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  className=" p-2 rounded-md w-full text-text"
                />
              </div>

              <div>
                <p className="mb-1 font-medium text-sm text-text">Password</p>
                <input
                  label="Password"
                  type="password"
                  placeholder="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  className="p-2 rounded-md w-full text-text"
                />
              </div>
            </div>

            {/* BUTTONS */}
            <div>
              <button
                type="submit"
                className="rounded-md bg-primary w-full my-4 p-2 bg-primary text-white font-medium"
              >
                {isLogin ? "LOGIN" : "REGISTER"}
              </button>
              <p
                onClick={() => {
                  setPageType(isLogin ? "register" : "login");
                  resetForm();
                }}
                className="underline text-text hover:cursor-pointer"
              >
                {isLogin
                  ? "Don't have an account? Sign up here."
                  : "Already have an account? Login here."}
              </p>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Form;
