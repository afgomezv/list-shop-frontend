import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getList } from "../api/ListAPI";
import CardList from "../components/List/CardList";

export default function ListView() {
  const { data, isLoading } = useQuery({
    queryKey: ["lists"],
    queryFn: getList,
  });

  if (isLoading) return <p>Cargando...</p>;
  if (data)
    return (
      <>
        <div className="max-w-3xl mx-auto mt-20">
          <h1 className="text-5xl font-black text-green-dark">Mis Listas</h1>
          <p className="text-2xl font-light text-green-avocado mt-5">
            Gestiona tus lista de compras
          </p>
          <nav className="my-10">
            <Link
              to="/lists/create"
              className="bg-green-avocado hover:bg-green-dark px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors rounded-lg"
            >
              Nueva Lista
            </Link>
          </nav>
          {data.length ? (
            data.map((list) => <CardList key={list.id} list={list} />)
          ) : (
            <p className="text-center py-20">
              No hay listas aún{" "}
              <Link
                to="/projects/create"
                className="text-solar-amber font-bold"
              >
                Crear Lista
              </Link>{" "}
            </p>
          )}
        </div>
      </>
    );
}
