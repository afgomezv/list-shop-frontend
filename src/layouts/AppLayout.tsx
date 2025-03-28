import { Navigate, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "../components/ui/Navbar";
import { useAuth } from "../hook/useAuth";

export default function AppLayout() {
  const { data, isError, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <Navigate to="/auth" />;
  if (data)
    return (
      <>
        <Navbar />
        <Outlet />
        <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
      </>
    );
}
