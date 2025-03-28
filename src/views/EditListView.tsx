import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";
import { getListById } from "../api/ListAPI";
import EditListForm from "../components/List/EditListForm";

export default function EditListView() {
  const params = useParams();
  const listId = +params.listId!;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["EditList", listId],
    queryFn: () => getListById(listId),
    retry: false,
  });

  if (isLoading) return <p>Cargando...</p>;
  if (isError) return <Navigate to="/404" />;
  if (data) return <EditListForm data={data} listId={listId} />;
}
