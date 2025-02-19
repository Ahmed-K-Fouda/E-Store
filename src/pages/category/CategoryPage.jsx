import { useNavigate, useParams } from "react-router";
import Loader from "../../components/loader/Loader";
import myContext from "../../context/MyContext";
import { useContext } from "react";
import Layout from "../../layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decrementQuantity,
  deleteFromCart,
  incrementQuantity,
} from "../../redux/cartSlice";
import toast from "react-hot-toast";

const CategoryPage = () => {
  const { categoryname } = useParams();

  const context = useContext(myContext);
  const { getAllProduct, loading } = context;

  const navigate = useNavigate();

  const filterProduct = getAllProduct.filter((obj) =>
    obj.category.includes(categoryname)
  );

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

  function handleIncrement(product) {
    dispatch(incrementQuantity(product));
  }

  function handleDecrement(product) {
    dispatch(decrementQuantity(product));
  }

  return (
    <Layout>
      <div className="mt-10">
        <div className="">
          <h1 className=" text-center mb-5 text-2xl font-semibold first-letter:uppercase">
            {categoryname}
          </h1>
        </div>

        {loading ? (
          <div className="flex justify-center">
            <Loader />
          </div>
        ) : (
          <section className="text-gray-600 body-font">
            <div className="container px-5 py-5 mx-auto">
              <div className="flex flex-wrap -m-4 justify-center">
                {filterProduct.length > 0 ? (
                  <>
                    {filterProduct.map((item, index) => {
                      const { id, title, price, productImageUrl } = item;
                      const ifExist = cartItems.some((p) => p.id === item.id);

                      return (
                        <div key={index} className="p-4 w-full md:w-1/4">
                          <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer">
                            <img
                              onClick={() => navigate(`/productinfo/${id}`)}
                              className="lg:h-80  h-96 w-full"
                              src={productImageUrl}
                              alt="img"
                            />
                            <div className="p-6">
                              <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                                E-bharat
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
                  </>
                ) : (
                  <div>
                    <div className="flex justify-center">
                      <img
                        className=" mb-2"
                        src="https://cdn-icons-png.flaticon.com/128/2748/2748614.png"
                        alt=""
                      />
                    </div>
                    <h1 className=" text-black text-xl">
                      No {categoryname} product found
                    </h1>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default CategoryPage;
