import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import ListForm from "./ListForm";
import { List, ListFormData } from "../../types";
import { updateList } from "../../api/ListAPI";

type EditListFormProps = {
  data: ListFormData;
  listId: List["id"];
};

const initialValues: ListFormData = {
  name: "",
  description: "",
};

export default function EditListForm({ data, listId }: EditListFormProps) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ListFormData>({
    defaultValues: {
      name: data.name,
      description: data.description,
    },
  });

  const { mutate } = useMutation({
    mutationFn: updateList,
    onSuccess: (data) => {
      toast.success(data.message);
      reset();
      navigate("/");
    },
    onError: (error) => toast.error(error.message),
  });

  const handleCreateList = (formData: ListFormData) => {
    const data = { formData, listId };
    mutate(data);
  };

  return (
    <>
      <div className="max-w-3xl mx-auto mt-20">
        <h1 className="text-5xl font-black text-green-dark">Editar Lista</h1>
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
            Guardar Lista
          </button>
        </form>
      </div>
    </>
  );
}
