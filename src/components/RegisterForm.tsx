import React, { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
    console.log(formData);
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-center text-green-dark mb-8">
        Crear cuenta
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <User
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-avocado"
            size={20}
          />
          <input
            type="text"
            placeholder="Nombre completo"
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-avocado"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div className="relative">
          <Mail
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-avocado"
            size={20}
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-avocado"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
        </div>

        <div className="relative">
          <Lock
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-avocado"
            size={20}
          />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            className="w-full pl-12 pr-12 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-avocado"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-avocado hover:text-gray-600"
          >
            {showPassword ? (
              <EyeOff size={20} color="#4CAF50" />
            ) : (
              <Eye size={20} color="#4CAF50" />
            )}
          </button>
        </div>

        <div className="relative">
          <Lock
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-avocado"
            size={20}
          />
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirmar contraseña"
            className="w-full pl-12 pr-12 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-avocado"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showConfirmPassword ? (
              <EyeOff size={20} color="#4CAF50" />
            ) : (
              <Eye size={20} color="#4CAF50" />
            )}
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-green-avocado text-white rounded-lg hover:bg-green-dark transition-colors duration-200"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
}
