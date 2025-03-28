import { Link, useNavigate } from "react-router-dom";
import ListForm from "../components/List/ListForm";
import { ListFormData } from "../types";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { createList } from "../api/ListAPI";
import { toast } from "react-toastify";

const initialValues: ListFormData = {
  name: "",
  description: "",
};

export default function CreateListView() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ListFormData>({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: createList,
    onSuccess: (data) => {
      toast.success(data.message);
      reset();
      navigate("/");
    },
    onError: (error) => toast.error(error.message),
  });

  const handleCreateList = (formData: ListFormData) => {
    mutate(formData);
  };

  return (
    <>
      <div className="max-w-3xl mx-auto mt-20">
        <h1 className="text-5xl font-black text-green-dark">Crear Lista</h1>
        <p className="text-2xl font-light text-green-avocado mt-5">
          Llena el siguiente formulario para crear una lista
        </p>
        <nav className="my-10">
          <Link
            to="/"
            className="bg-green-avocado hover:bg-green-dark px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors rounded-lg"
          >
            Volver
          </Link>
        </nav>
        <form
          className="mt-10 bg-white shadow-lg p-10 rounded-lg"
          onSubmit={handleSubmit(handleCreateList)}
          noValidate
        >
          <ListForm register={register} errors={errors} />
          <button
            type="submit"
            className="bg-green-avocado hover:bg-green-dark w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded-lg"
          >
            Crear Lista
          </button>
        </form>
      </div>
    </>
  );
}
