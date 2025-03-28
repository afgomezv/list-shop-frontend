import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { UserRegistrationForm } from "../../types";
import ErrorMessage from "../ui/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { createAccount } from "../../api/AuthAPI";
import { toast } from "react-toastify";

type RegisterFormProps = {
  setIsLogin: Dispatch<SetStateAction<boolean>>;
};

const initialValues: UserRegistrationForm = {
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
};

export default function RegisterForm({ setIsLogin }: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<UserRegistrationForm>({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: createAccount,
    onSuccess: (data) => {
      toast.success(data.message);
      reset();
      setIsLogin(true);
    },
    onError: (error) => toast.error(error.message),
  });

  const handleCreateAccount = (formData: UserRegistrationForm) => {
    mutate(formData);
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-center text-green-dark mb-8">
        Crear cuenta
      </h2>
      <form
        onSubmit={handleSubmit(handleCreateAccount)}
        className="space-y-6"
        noValidate
      >
        <div className="relative">
          <User
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-avocado"
            size={20}
          />
          <input
            type="text"
            placeholder="Nombre completo"
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-avocado"
            {...register("name", {
              required: "El nombre es obligatorio",
            })}
          />
        </div>
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}

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
              minLength: {
                value: 8,
                message: "La contraseña debe tener al menos 8 caracteres",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  "La contraseña debe tener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial",
              },
            })}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-avocado hover:text-gray-600"
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

        <div className="relative">
          <Lock
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-avocado"
            size={20}
          />
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirmar contraseña"
            className="w-full pl-12 pr-12 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-avocado"
            {...register("password_confirmation", {
              required: "La contraseña de confirmación es obligatoria",
              validate: (value) =>
                value === watch("password") || "Las contraseñas no coinciden",
            })}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showConfirmPassword ? (
              <EyeOff size={20} color="#4CAF50" className="cursor-pointer" />
            ) : (
              <Eye size={20} color="#4CAF50" className="cursor-pointer" />
            )}
          </button>
        </div>
        {errors.password_confirmation && (
          <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
        )}

        <button
          type="submit"
          className="w-full py-3 bg-green-avocado text-white rounded-lg hover:bg-green-dark transition-colors duration-200 cursor-pointer"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
}
