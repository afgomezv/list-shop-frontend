import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Product, ProductFormData } from "../../types";
import { updateProduct } from "../../api/ProductAPI";
import ProductForm from "./ProductForm";

type EditTaskModalProps = {
  data: Product;
  productId: Product["id"];
};

export default function EditProductkModal({
  data,
  productId,
}: EditTaskModalProps) {
  const navigate = useNavigate();

  const param = useParams();
  const listId = +param.listId!;

  const initialValues: ProductFormData = {
    name: data.name,
    price: data.price,
    stock: data.stock,
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updateProduct,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [] });
      queryClient.invalidateQueries({ queryKey: [] });
      toast.success(data.message);
      reset();
      navigate(location.pathname, { replace: true });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const handleEditTask = (formData: ProductFormData) => {
    const data = { listId, productId, formData };
    mutate(data);
  };

  return (
    <Transition appear show={true} as={Fragment}>
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
                  className="text-green-dark font-black text-4xl  my-5"
                >
                  Editar Product
                </Dialog.Title>

                <p className="text-xl text-green-avocado font-bold">
                  Realiza cambios a un producto en {""}
                  <span className="text-icewave">este formulario</span>
                </p>

                <form
                  className="mt-10 space-y-3"
                  noValidate
                  onSubmit={handleSubmit(handleEditTask)}
                >
                  <ProductForm register={register} errors={errors} />
                  <button
                    type="submit"
                    className="bg-green-avocado hover:bg-green-dark w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded-lg"
                  >
                    Guardar Cambios
                  </button>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
