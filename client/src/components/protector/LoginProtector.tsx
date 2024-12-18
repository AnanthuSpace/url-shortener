import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster } from "sonner";

const LoginProtector = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const userToken = sessionStorage.getItem("accessToken");

  useEffect(() => {
    if (userToken) {
      navigate("/home");
    }
  }, [navigate, userToken]);

  if (!userToken) {
    return <>{children}</>;
  }

  return (
    <>
      <Toaster />
    </>
  );
};

export default LoginProtector;
