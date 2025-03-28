import { Fragment } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Dialog, Transition } from "@headlessui/react";
import { ProductFormData } from "../../types";
import { createProduct } from "../../api/ProductAPI";
import ProductForm from "./ProductForm";

export default function AddProductModal() {
  const navigate = useNavigate();

  /** read if modal exist **/
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const modalTaks = queryParams.get("newProduct");
  const show = modalTaks ? true : false;

  /** get projectId **/
  const params = useParams();
  const listId = +params.listId!;

  const initialValues: ProductFormData = {
    name: "",
    price: null,
    stock: null,
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: createProduct,
    onSuccess: (data) => {
      toast.success(data.message);
      reset();
      queryClient.invalidateQueries({ queryKey: ["ViewList", listId] });
      navigate(location.pathname, { replace: true });
    },
    onError: (error) => toast.error(error.message),
  });
  const handleCreateTask = (formData: ProductFormData) => {
    const data = {
      formData,
      listId,
    };
    mutate(data);
  };

  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            navigate(location.pathname, { replace: true });
          }}
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
                  <Dialog.Title
                    as="h3"
                    className="font-black text-green-dark text-4xl  my-5"
                  >
                    Nuevo Producto
                  </Dialog.Title>

                  <p className="text-xl text-green-avocado font-bold">
                    Llena el formulario y crea {""}
                    <span className="text-icewave">una tarea</span>
                  </p>
                  <form
                    className="mt-10 space-y-3"
                    noValidate
                    onSubmit={handleSubmit(handleCreateTask)}
                  >
                    <ProductForm register={register} errors={errors} />
                    <button
                      type="submit"
                      className="bg-green-avocado hover:bg-green-dark w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded-lg"
                    >
                      Crear Producto
                    </button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
