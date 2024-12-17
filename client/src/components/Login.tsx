import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "sonner";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const localhostURL = import.meta.env.VITE_LOCAL_HOST;

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    const response = await axios.post(`${localhostURL}/login`, {
      email: values.email,
      password: values.password,
    });
    if (response.status === 200) {
      sessionStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      localStorage.setItem("userId", response.data.userData.userId);
      toast.success("Login successfully");
      navigate("/home");
    }
  };

  return (
    <div className="min-h-screen bg-[#020817] text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-500 via-pink-500 to-blue-600 text-transparent bg-clip-text">
            Log in to Linkly
          </h2>
          <p className="mt-2 text-muted-foreground">
            Shorten your links, expand your reach
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
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full transition duration-150 ease-in-out"
                >
                  Log in
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <a
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
