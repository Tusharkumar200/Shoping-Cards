import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { shoppingCartContext } from "../../context";
import Loader from "../loader";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { productDetails, setProductDetails, loading, setLoading, handleAddToCart} =
    useContext(shoppingCartContext);

  async function fetchProductDetails() {
    const apiResponse = await fetch(`https://dummyjson.com/products/${id}`);
    const result = await apiResponse.json();

    if (result) {
      setProductDetails(result);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  console.log(productDetails);

  
  if (loading) return <Loader />;
  return (
    <div className="p-6 lg:max-w-7xl max-w-4xl mx-auto">
      <div className="grid items-center grid-cols-1 lg:grid-cols-5 gap-12 shadow-sm p-6">
        <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
          <div className="px-4 py-10 rounded-xl shadow-lg relative">
            <img
              src={productDetails?.thumbnail}
              alt={productDetails?.title}
              className="w-4/5 rounded object-cover"
            />
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-2xl font-extrabold text-[#000]">
              {productDetails?.title}
            </h2>
            <div className="flex flex-wrap gap-4 mt-4">
              <p className="text-xl font-bold">$ {productDetails?.price}</p>
            </div>
            <div>
              <button onClick={()=>handleAddToCart(productDetails)} className="mt-5 min-w-[200px] px-4 py-3 border border-[#333] bg-transparent text-sm font-semibold rounded">
                Add to Cart
              </button>
              <button className="px-6 py-2 bg-black text-white rounded-lg ml-4">
                Buy
              </button>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-6 mx-auto">
            {productDetails?.images?.length
              ? productDetails?.images.map((imageItem) => (
                  <div key={imageItem} className="rounded-xl p-4 shadow-md">
                    <img
                      src={imageItem}
                      alt={productDetails?.title}
                      className="w-24 cursor-pointer"
                    />
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}
