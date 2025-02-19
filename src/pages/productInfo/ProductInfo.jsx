import { useContext, useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import myContext from "../../context/MyContext";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decrementQuantity,
  deleteFromCart,
  incrementQuantity,
} from "../../redux/cartSlice";
import toast from "react-hot-toast";
function ProductInfo() {
  const context = useContext(myContext);
  const { loading, setLoading } = context;
  const [product, setProduct] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const getProductBasedOnId = async function () {
      setLoading(true);
      try {
        const product = await getDoc(doc(fireDB, "products", id));
        // setProduct(product);
        setProduct({ ...product.data(), id: product.id });

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getProductBasedOnId();
  }, [setLoading, id]);

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

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const { category, date, description, price, productImageUrl, title } =
    product;
  const ifExist = cartItems.some((p) => p.id === product.id);
  return (
    <Layout>
      <section className="py-5 lg:py-16 font-poppins dark:bg-white">
        {loading ? (
          <>
            <div className="flex justify-center items-center">
              <Loader />
            </div>
          </>
        ) : (
          <div className="max-w-6xl px-4 mx-auto">
            <div className="flex flex-wrap mb-24 -mx-4">
              <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
                <div className="">
                  <div className="">
                    <img
                      className=" w-full lg:h-[39em] rounded-lg"
                      src={productImageUrl}
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="w-full px-4 md:w-1/2">
                <div className="lg:pl-20">
                  <div className="mb-6 ">
                    <h2 className="max-w-xl mb-6 text-xl font-semibold leading-loose tracking-wide text-black  md:text-2xl dark:text-black">
                      {title}
                    </h2>
                    <div className="flex flex-wrap items-center mb-6">
                      <ul className="flex mb-4 mr-2 lg:mb-0">
                        <li>
                          <a href="">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={16}
                              height={16}
                              fill="currentColor"
                              className="w-4 mr-1 text-red-500 dark:text-red-700 bi bi-star "
                              viewBox="0 0 16 16"
                            >
                              <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path>
                            </svg>
                          </a>
                        </li>
                        <li>
                          <a href="">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={16}
                              height={16}
                              fill="currentColor"
                              className="w-4 mr-1 text-red-500 dark:text-red-700 bi bi-star "
                              viewBox="0 0 16 16"
                            >
                              <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path>
                            </svg>
                          </a>
                        </li>
                        <li>
                          <a href="">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={16}
                              height={16}
                              fill="currentColor"
                              className="w-4 mr-1 text-red-500 dark:text-red-700 bi bi-star "
                              viewBox="0 0 16 16"
                            >
                              <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path>
                            </svg>
                          </a>
                        </li>
                        <li>
                          <a href="">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={16}
                              height={16}
                              fill="currentColor"
                              className="w-4 mr-1 text-red-500 dark:text-red-700 bi bi-star "
                              viewBox="0 0 16 16"
                            >
                              <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path>
                            </svg>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <p className="inline-block text-2xl font-semibold text-gray-800 dark:text-gray-800 ">
                      <span>${price}</span>
                    </p>
                  </div>
                  <div className="mb-6">
                    <h2 className="mb-2 text-lg font-bold text-gray-700 dark:text-gray-800">
                      Description:
                    </h2>
                    <p className="text-black">{description}</p>
                  </div>
                  <div className="mb-6 " />
                  <div className="flex flex-col justify-center items-center space-y-2">
                    {ifExist ? (
                      <>
                        <div className="flex items-center space-x-2">
                          <button
                            className="bg-gray-800 cursor-pointer text-white w-8 h-8 rounded-full flex items-center justify-center 
                                  hover:bg-gray-700 active:scale-90 transition-all shadow-md"
                            onClick={() => handleIncrement(product.id)}
                          >
                            +
                          </button>

                          <span className="text-lg font-semibold text-gray-900 min-w-[24px] text-center">
                            {cartItems.find((p) => p.id === product.id)
                              ?.quantity ?? 1}
                          </span>

                          <button
                            onClick={() => handleDecrement(product.id)}
                            className="bg-gray-800 cursor-pointer text-white w-8 h-8 rounded-full flex items-center justify-center 
                                  hover:bg-gray-700 active:scale-90 transition-all shadow-md"
                          >
                            -
                          </button>
                        </div>

                        <button
                          onClick={() => handleDeleteFromCart(product)}
                          className="bg-red-600 cursor-pointer text-white w-full py-[4px] rounded-lg font-bold hover:bg-red-700 transition-all mt-2"
                        >
                          Remove From Cart
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="bg-black cursor-pointer hover:bg-gray-700 w-full text-white py-[4px] rounded-lg font-bold"
                      >
                        Add To Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
}

export default ProductInfo;
