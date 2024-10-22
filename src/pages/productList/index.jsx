import { useContext } from "react";
import { shoppingCartContext } from "../../context";
import ProductTile from "../../components/productTile";
import Loader from "../loader";

export default function ProductListPage() {
  const { listOfProducts, loading } = useContext(shoppingCartContext);
  console.log(listOfProducts);

  // if (loading) return <h2>Data is Loading...</h2>;
  if (loading) return <Loader />;

  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-3xl font-extralight text-gray-950 sm:text-4xl">
            Our Featured Products
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-5 mt-10 lg:mt-16 lg:gap-8 lg:grid-cols-4">
          {listOfProducts && listOfProducts.length > 0 ? (
            listOfProducts.map((singleProductTile) => (
              <ProductTile key={singleProductTile.id} singleProductTile={singleProductTile} />
            ))
          ) : (
            <h1>No product Found</h1>
          )}
        </div>
      </div>
    </section>
  );
}