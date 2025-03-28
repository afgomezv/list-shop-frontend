import { useQuery } from "@tanstack/react-query";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getListById } from "../api/ListAPI";
import ProductList from "../components/products/ProductList";
import AddProductModal from "../components/products/AddProductModal";
import EditProductData from "../components/products/EditProductData";
import ProductModalDetails from "../components/products/ProductModalDetails";

export default function ListDetailView() {
  const navigate = useNavigate();
  const params = useParams();
  const listId = +params.listId!;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["ViewList", listId],
    queryFn: () => getListById(listId),
    retry: false,
  });

  if (isLoading) return <p>Cargando...</p>;
  if (isError) return <Navigate to="/404" />;

  if (data)
    return (
      <>
        <div className="max-w-3xl mx-auto mt-20">
          <h1 className="text-5xl font-black text-green-dark">{data.name}</h1>
          <p className="text-2xl font-light text-green-avocado mt-5">
            {data.description}
          </p>
          <nav className="my-5 flex gap-3">
            <button
              type="button"
              className="bg-green-dark hover:bg-green-avocado px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors rounded-lg"
              onClick={() => navigate(location.pathname + "?newProduct=true")}
            >
              Agregar Producto
            </button>
          </nav>
          <ProductList products={data.products} />
          <AddProductModal />
          <EditProductData />
          <ProductModalDetails />
        </div>
      </>
    );
}
