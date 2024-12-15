import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
const localhostURL = import.meta.env.VITE_LOCAL_HOST

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    console.log("Signup attempt", values);
    const response = await axios.post(`${localhostURL}/signup`, {email: values.email, password: values.password})
    console.log(response)
  };

  return (
    <div className="min-h-screen bg-[#020817] text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-500 via-pink-500 to-blue-600 text-transparent bg-clip-text">
            Sign up for Linkly
          </h2>
          <p className="mt-2 text-muted-foreground">
            Start shortening your links today
          </p>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="mt-8 space-y-6">
              <div className="space-y-4">
                <div>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email address"
                    className={`w-full px-3 py-2 bg-background/50 border ${
                      errors.email && touched.email
                        ? "border-red-500"
                        : "border-muted"
                    } rounded-full text-black`}
                  />
                  {errors.email && touched.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    className={`w-full px-3 py-2 bg-background/50 border ${
                      errors.password && touched.password
                        ? "border-red-500"
                        : "border-muted"
                    } rounded-full text-black`}
                  />
                  {errors.password && touched.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div>
                  <Field
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    className={`w-full px-3 py-2 bg-background/50 border ${
                      errors.confirmPassword && touched.confirmPassword
                        ? "border-red-500"
                        : "border-muted"
                    } rounded-full text-black`}
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full transition duration-150 ease-in-out"
                >
                  Sign up
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <a
            onClick={() => navigate("/")}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
