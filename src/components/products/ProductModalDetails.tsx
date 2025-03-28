import { Fragment, useEffect } from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../../api/ProductAPI";
import { formatCurrency, formatDate } from "../../utils";

export default function ProductModalDetails() {
  const params = useParams();
  const listId = +params.listId!;
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const productId = +queryParams.get("viewProduct")!;
  const show = productId ? true : false;

  const { data, isError, isLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById({ listId, productId }),
    enabled: !!productId,
    retry: false,
  });

  if (isLoading) return <p>Cargando...</p>;
  if (isError) return <Navigate to={`/404`} />;

  if (data)
    return (
      <>
        <Transition appear show={show} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => navigate(location.pathname, { replace: true })}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/60" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                    <p className="text-sm text-slate-400">
                      Agregada el: {formatDate(data.createdAt)}{" "}
                    </p>
                    <p className="text-sm text-slate-400">
                      Última actualización: {formatDate(data.updatedAt)}
                    </p>
                    <Dialog.Title
                      as="h3"
                      className="font-black text-4xl text-green-dark my-5"
                    >
                      {data.name}
                    </Dialog.Title>
                    <p className="text-lg text-green-avocado mb-2">
                      Percio: $ {formatCurrency(data.price!)}
                    </p>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    );
}
