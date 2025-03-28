import { useState } from "react";
import { useForm } from "react-hook-form";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { UserLoginForm } from "../../types";
import ErrorMessage from "../ui/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { authenticateUser } from "../../api/AuthAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const initialValues: UserLoginForm = {
  email: "",
  password: "",
};

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginForm>({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: authenticateUser,
    onSuccess: () => {
      navigate("/");
    },
    onError: (error) => toast.error(error.message),
  });

  const handleAuthenticate = (formData: UserLoginForm) => {
    mutate(formData);
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-center text-green-dark mb-8">
        Iniciar sesión
      </h2>
      <form onSubmit={handleSubmit(handleAuthenticate)} className="space-y-6">
        <div className="relative">
          <Mail
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-avocado"
            size={20}
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-avocado"
            {...register("email", {
              required: "El correo electrónico es obligatorio",
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                message: "El correo electrónico no es válido",
              },
            })}
          />
        </div>
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

        <div className="relative">
          <Lock
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-avocado"
            size={20}
          />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            className="w-full pl-12 pr-12 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-avocado"
            {...register("password", {
              required: "La contraseña es obligatoria",
            })}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? (
              <EyeOff size={20} color="#4CAF50" className="cursor-pointer" />
            ) : (
              <Eye size={20} color="#4CAF50" className="cursor-pointer" />
            )}
          </button>
        </div>
        {errors.password && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}

        <button
          type="submit"
          className="w-full py-3 bg-green-avocado text-white rounded-lg hover:bg-green-dark transition-colors duration-200 cursor-pointer"
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}
