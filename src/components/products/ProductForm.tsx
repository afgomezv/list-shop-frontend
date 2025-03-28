import { FieldErrors, UseFormRegister } from "react-hook-form";
import ErrorMessage from "../ui/ErrorMessage";
import { ProductFormData } from "../../types";

type ProductFormProps = {
  errors: FieldErrors<ProductFormData>;
  register: UseFormRegister<ProductFormData>;
};

export default function ProductForm({ errors, register }: ProductFormProps) {
  return (
    <>
      <div className="mb-5 space-y-3">
        <input
          id="name"
          className="w-full p-3  border border-gray-200 rounded-lg focus:outline-none focus:border-green-dark"
          type="text"
          placeholder="Nombre de la lista"
          {...register("name", {
            required: "El nombre del producto es obligatorio",
          })}
        />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </div>
      <div className="mb-5 space-y-3">
        <input
          id="price"
          className="w-full p-3  border border-gray-200 rounded-lg focus:outline-none focus:border-green-dark"
          type="text"
          placeholder="Precio del producto"
          {...register("price", {
            required: "El precio es obligatorio",
            pattern: {
              value: /^[0-9]+(\.[0-9]{1,2})?$/,
              message: "Ingrese un precio válido (ej: 10.50)",
            },
          })}
        />
        {errors.price && <ErrorMessage>{errors.price.message}</ErrorMessage>}
      </div>
      <div className="mb-5 space-y-3">
        <input
          id="stock"
          className="w-full p-3  border border-gray-200 rounded-lg focus:outline-none focus:border-green-dark"
          type="text"
          placeholder="Cantidad del producto"
          {...register("stock", {
            required: "La cantidad es obligatoria",
            pattern: {
              value: /^[0-9]+$/,
              message: "Ingrese una cantidad válida (ej: 10)",
            },
          })}
        />
        {errors.stock && <ErrorMessage>{errors.stock.message}</ErrorMessage>}
      </div>
    </>
  );
}
