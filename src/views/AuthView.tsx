import { useState } from "react";
import { ToastContainer } from "react-toastify";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";

export default function AuthView() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <>
      <div className="min-h-screen bg-green-light flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg p-1 shadow-sm">
              <button
                className={`px-6 py-2 rounded-md transition-colors duration-200 ${
                  isLogin
                    ? "bg-green-avocado text-white"
                    : "text-green-apple hover:text-green-dark"
                }`}
                onClick={() => setIsLogin(true)}
              >
                Iniciar sesión
              </button>
              <button
                className={`px-6 py-2 rounded-md transition-colors duration-200 ${
                  !isLogin
                    ? "bg-green-avocado text-white"
                    : "text-green-apple hover:text-green-dark"
                }`}
                onClick={() => setIsLogin(false)}
              >
                Registrarse
              </button>
            </div>
          </div>
          {isLogin ? <LoginForm /> : <RegisterForm setIsLogin={setIsLogin} />}
        </div>
      </div>
      <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
    </>
  );
}
