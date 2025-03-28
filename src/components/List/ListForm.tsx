import { FieldErrors, UseFormRegister } from "react-hook-form";
import ErrorMessage from "../../components/ui/ErrorMessage";

import { ListFormData } from "../../types";

type ProjectFormProps = {
  register: UseFormRegister<ListFormData>;
  errors: FieldErrors<ListFormData>;
};

export default function ListForm({ register, errors }: ProjectFormProps) {
  return (
    <>
      <div className="mb-5 space-y-3">
        <input
          id="name"
          className="w-full p-3  border border-gray-200 rounded-lg focus:outline-none focus:border-green-dark"
          type="text"
          placeholder="Nombre de la lista"
          {...register("name", {
            required: "El Nombre del Proyecto es obligatorio",
          })}
        />

        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </div>

      <div className="mb-5 space-y-3">
        <textarea
          id="description"
          className="w-full p-3  border border-gray-200 rounded-lg focus:outline-none focus:border-green-dark"
          placeholder="Descripción de la lista"
          {...register("description", {
            required: "La descripción del proyecto es obligatoria",
          })}
        />

        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}
      </div>
    </>
  );
}
