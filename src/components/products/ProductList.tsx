import { List, Product } from "../../types";
import ProductCard from "./ProductCard";

type ProductListProps = {
  products: Product[];
};

export default function ProductList({ products }: ProductListProps) {
  return (
    <>
      <h2 className="text-5xl font-black my-10 text-green-dark">Productos</h2>
      <div className="">
        <ul className="mt-5">
          {products.length === 0 ? (
            <li className="text-green-avocado text-center pt-3">
              No Hay Productos
            </li>
          ) : (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </ul>
      </div>
    </>
  );
}
