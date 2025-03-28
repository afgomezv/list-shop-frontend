import { useQuery } from "@tanstack/react-query";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { getProductById } from "../../api/ProductAPI";
import EditProductkModal from "./EditProductModal";

export default function EditProductData() {
  /** get productId**/
  const param = useParams();
  const listId = +param.listId!;

  /**get taskId **/
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const productId = +queryParams.get("editProduct")!;

  const { data, isError } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById({ listId, productId }),
    enabled: !!productId,
    //retry: false,
  });

  if (isError) return <Navigate to="/" />;
  if (data) return <EditProductkModal data={data} productId={productId} />;
}
