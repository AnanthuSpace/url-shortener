import AppRoutes from "./routes/Routes";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Toaster richColors />
      <AppRoutes />
    </>
  );
}

export default App;
