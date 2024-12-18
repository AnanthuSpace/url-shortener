import React, { useState, useRef, useEffect } from "react";
import { useGlobalContext } from "../hooks/useGlobalContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const localhostURL = import.meta.env.VITE_LIVE_URL;

export default function OtpVerification() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { email } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.nextSibling && element.value !== "") {
      (element.nextSibling as HTMLInputElement).focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      if (inputRefs.current[index - 1]) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp.join("");
    const response = await axios.post(`${localhostURL}/otp-verification`, {
      otp: otpString,
      email: email,
    });
    if (response.status === 200) {
      await sessionStorage.setItem("accessToken", response.data.accessToken);
      await localStorage.setItem("refreshToken", response.data.refreshToken);
      toast.success("Successfully verified");
      navigate("/home");
    }
  };

  return (
    <div className="min-h-screen bg-[#020817] text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-500 via-pink-500 to-blue-600 text-transparent bg-clip-text">
            Verify Your Account
          </h2>
          <p className="mt-2 text-muted-foreground">
            We've sent a code to your email. Please enter it below.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="flex justify-center space-x-2">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                ref={(el) => (inputRefs.current[index] = el)}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                maxLength={1}
                className="w-12 h-12 text-center text-2xl bg-background/50 border border-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
              />
            ))}
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full transition duration-150 ease-in-out"
            >
              Verify
            </button>
          </div>
        </form>
        <p className="text-center text-sm text-muted-foreground">
          Didn't receive the code?{" "}
          <button className="text-blue-500 hover:underline">Resend</button>
        </p>
      </div>
    </div>
  );
}
