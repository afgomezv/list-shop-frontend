import { CircuitBoard, ChevronDown } from "lucide-react";
import { useAuth } from "../../hook/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { data } = useAuth();

  const queryClient = useQueryClient();
  const logout = () => {
    localStorage.removeItem("AUTH_TOKEN");
    queryClient.invalidateQueries({ queryKey: ["profile"] });
  };

  if (data)
    return (
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <Link to="/" className="flex items-center">
                <CircuitBoard className="h-12 w-12 text-green-avocado" />
                <span className="ml-2 text-xl font-bold bg-gradient-to-r from-green-avocado to-green-dark text-transparent bg-clip-text">
                  ListShop
                </span>
              </Link>
            </div>
            <div className="flex items-center">
              <div className="relative group">
                <button className="flex items-center space-x-3 text-gray-700 hover:text-green-dark focus:outline-none">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r  from-green-avocado to-green-dark flex items-center justify-center text-white font-semibold">
                    {data.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-sm text-left">
                    <div className="font-semibold">{data.name}</div>
                    <div className="text-xs text-gray-500 truncate max-w-[150px]">
                      {data.email}
                    </div>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </button>

                <div className="absolute right-0 w-48 mt-2 py-2 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                  >
                    Mi Perfil
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                  >
                    Configuración
                  </a>
                  <hr className="my-2" />
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    onClick={logout}
                  >
                    Cerrar Sesión
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
};

export default Navbar;
