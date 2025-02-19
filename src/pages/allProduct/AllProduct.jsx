import { useNavigate } from "react-router-dom";
import Layout from "../../layout/Layout";
import myContext from "../../context/MyContext";
import { useContext } from "react";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decrementQuantity,
  deleteFromCart,
  incrementQuantity,
} from "../../redux/cartSlice";
import toast from "react-hot-toast";

function AllProduct() {
  const navigate = useNavigate();
  const context = useContext(myContext);
  const { getAllProduct, loading } = context;

  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  function handleAddToCart(product) {
    const serializedProduct = {
      ...product,
      time: product?.time?.toDate().toISOString(),
    };

    dispatch(addToCart(serializedProduct));
    toast.success("Product Added Successfully");
  }

  function handleDeleteFromCart(product) {
    const serializedProduct = {
      ...product,
      time: product?.time?.toDate().toISOString(),
    };

    dispatch(deleteFromCart(serializedProduct));
    toast.success("Product Deleted Successfully");
  }

  function handleIncrement(productID) {
    dispatch(incrementQuantity(productID));
  }

  function handleDecrement(productID) {
    dispatch(decrementQuantity(productID));
  }

  return (
    <Layout>
      <div className="py-8">
        <div className="">
          <h1 className=" text-center mb-5 text-2xl font-semibold">
            All Products
          </h1>
        </div>
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-5 mx-auto">
            <div className="flex justify-center ">{loading && <Loader />}</div>

            {getAllProduct.length > 0 ? (
              <div className="flex flex-wrap -m-4">
                {getAllProduct?.map((item, index) => {
                  const ifExist = cartItems.some((p) => p.id === item.id);

                  const { id, title, price, productImageUrl } = item;
                  return (
                    <div key={index} className="p-4 w-full md:w-1/4">
                      <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer">
                        <img
                          onClick={() => navigate(`/productinfo/${id}`)}
                          className="lg:h-80  h-96 w-full"
                          src={productImageUrl}
                          alt="blog"
                        />
                        <div className="p-6">
                          <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                            E-Shop
                          </h2>
                          <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                            {title.substring(0, 25)}
                          </h1>
                          <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                            ${price}
                          </h1>
                          <div className="flex flex-col justify-center items-center space-y-2">
                            {ifExist ? (
                              <>
                                <div className="flex items-center space-x-2">
                                  <button
                                    className="bg-gray-800 text-white w-8 h-8 rounded-full flex items-center justify-center 
                                  hover:bg-gray-700 active:scale-90 transition-all shadow-md"
                                    onClick={() => handleIncrement(item.id)}
                                  >
                                    +
                                  </button>

                                  <span className="text-lg font-semibold text-gray-900 min-w-[24px] text-center">
                                    {cartItems.find((p) => p.id === item.id)
                                      ?.quantity ?? 1}
                                  </span>

                                  <button
                                    onClick={() => handleDecrement(item.id)}
                                    className="bg-gray-800 text-white w-8 h-8 rounded-full flex items-center justify-center 
                                  hover:bg-gray-700 active:scale-90 transition-all shadow-md"
                                  >
                                    -
                                  </button>
                                </div>

                                <button
                                  onClick={() => handleDeleteFromCart(item)}
                                  className="bg-red-600 text-white w-full py-[4px] rounded-lg font-bold hover:bg-red-700 transition-all mt-2"
                                >
                                  Remove From Cart
                                </button>
                              </>
                            ) : (
                              <button
                                onClick={() => handleAddToCart(item)}
                                className="bg-black cursor-pointer hover:bg-gray-700 w-full text-white py-[4px] rounded-lg font-bold"
                              >
                                Add To Cart
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-slate-500 text-white text-center text-2xl p-2 rounded-full">
                No Product Avilabale Now
              </div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default AllProduct;
