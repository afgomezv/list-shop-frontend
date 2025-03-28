import { Fragment } from "react";
import { EllipsisVertical } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Menu, Transition } from "@headlessui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Product } from "../../types";
import { formatCurrency } from "../../utils";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const params = useParams();

  const productId = +params.productId!;

  //   const queryClient = useQueryClient();
  //   const { mutate } = useMutation({
  //     mutationFn: deleteTask,
  //     onSuccess: (data) => {
  //       toast.success(data.message);
  //       queryClient.invalidateQueries({ queryKey: ["EditProject", projectId] });
  //     },
  //     onError: (error) => {
  //       toast.error(error.message);
  //     },
  //   });

  return (
    <li className="p-5 bg-white border-b border-slate-300 flex justify-between gap-3">
      <div className="min-w-0 flex-col gap-y-4">
        <button
          type="button"
          className="text-3xl font-bold text-green-dark text-left capitalize cursor-pointer"
          onClick={() =>
            navigate(location.pathname + `?viewProduct=${product.id}`)
          }
        >
          {product.name}
        </button>
        <p className="text-xl font-semibold text-green-avocado">
          $ {formatCurrency(product.price)}
        </p>

        <div className="mt-2">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              product.isBuy
                ? "bg-green-100 text-green-avocado"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {product.isBuy ? "Comprado" : "No Comprado"}
          </span>
        </div>
      </div>
      <div className="flex items-center shrink-0 gap-x-6">
        <Menu as="div" className="relative flex-none">
          <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
            <span className="sr-only">opciones</span>
            <EllipsisVertical className="h-9 w-9" aria-hidden="true" />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
              <Menu.Item>
                <button
                  type="button"
                  className="block w-full px-3 py-1 text-sm leading-6 text-left text-gray-900 hover:bg-gray-100 cursor-pointer"
                  onClick={() =>
                    navigate(location.pathname + `?viewTask=${product.id}`)
                  }
                >
                  Ver Producto
                </button>
              </Menu.Item>
              <Menu.Item>
                <button
                  type="button"
                  className="block w-full px-3 py-1 text-sm leading-6 text-left text-gray-900 hover:bg-gray-100 cursor-pointer"
                  onClick={() =>
                    navigate(location.pathname + `?editProduct=${product.id}`)
                  }
                >
                  Editar Producto
                </button>
              </Menu.Item>
              <Menu.Item>
                <button
                  type="button"
                  className="block w-full px-3 py-1 text-sm leading-6 text-left text-red-500 font-semibold hover:bg-red-50 cursor-pointer"
                  //onClick={() => mutate({ projectId, taskId: task._id })}
                >
                  Eliminar Producto
                </button>
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </li>
  );
}
