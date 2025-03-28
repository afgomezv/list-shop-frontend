import { Fragment } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Menu, Transition } from "@headlessui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { List } from "../../types";
import { EllipsisVertical } from "lucide-react";
import { deleteList } from "../../api/ListAPI";

type CardProjectProps = {
  list: List;
};

export default function CardList({ list }: CardProjectProps) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteList,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["lists"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <>
      <ul
        role="list"
        className="divide-y divide-gray-100 border border-gray-100 bg-white shadow-lg"
      >
        <li className="flex justify-between gap-x-6 px-5 py-6">
          <div className="flex min-w-0 gap-x-4">
            <div className="min-w-0 flex-auto space-y-2">
              <Link
                to={`/lists/${list.id}`}
                className="text-green-dark cursor-pointer hover:underline text-3xl font-bold"
              >
                {list.name}
              </Link>
              <p className="text-sm text-green-avocado">{list.description}</p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-x-6">
            <Menu as="div" className="relative flex-none">
              <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                <span className="sr-only">opciones</span>
                <EllipsisVertical className="h-9 w-9" aria-hidden="true" />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                  <Menu.Item>
                    <Link
                      to={`/lists/${list.id}`}
                      className="block w-full px-3 py-1 text-sm leading-6 text-left text-gray-900 hover:bg-gray-100 cursor-pointer"
                    >
                      Ver Lista
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link
                      to={`/lists/${list.id}/edit`}
                      className="block w-full px-3 py-1 text-sm leading-6 text-left text-gray-900 hover:bg-gray-100 cursor-pointer"
                    >
                      Editar Lista
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <button
                      type="button"
                      className="block w-full px-3 py-1 text-sm leading-6 text-left text-red-500 hover:bg-red-50 cursor-pointer"
                      onClick={() => {
                        mutate(list.id);
                      }}
                    >
                      Eliminar Lista
                    </button>
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </li>
      </ul>
    </>
  );
}
