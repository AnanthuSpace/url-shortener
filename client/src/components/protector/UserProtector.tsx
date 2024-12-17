import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

const UserProtector = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const userToken = sessionStorage.getItem("accessToken");

  useEffect(() => {
    if (!userToken) {
      toast.warning("Please log in to access page.");
      navigate("/");
    }
  }, [navigate, userToken]);

  if (userToken) {
    return <>{children}</>;
  }

  return (
    <>
      <Toaster />
    </>
  );
};

export default UserProtector;
