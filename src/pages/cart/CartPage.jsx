import { Trash } from "lucide-react";
import Layout from "../../layout/Layout";
import toast from "react-hot-toast";
import {
  decrementQuantity,
  deleteFromCart,
  incrementQuantity,
} from "../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import BuyNowModal from "../../components/buyNowModal/ByNowModal";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import { Navigate } from "react-router-dom";

function CartPage() {
  // address info that saveed on firebase when user ordered

  const [addressInfo, setAddressInfo] = useState({
    name: "",
    address: "",
    pincode: "",
    mobileNumber: "",
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  function handleDeleteFromCart(product) {
    dispatch(deleteFromCart(product));
    toast.success("Product Deleted Successfully");
  }
  console.log(cartItems);
  function handleIncrement(productID) {
    dispatch(incrementQuantity(productID));
  }

  function handleDecrement(productID) {
    dispatch(decrementQuantity(productID));
  }

  const cartItemTotal = cartItems
    .map((item) => item.quantity)
    .reduce((prevValue, currValue) => prevValue + currValue, 0);

  const cartTotalPrice = cartItems
    .map((item) => item.price * item.quantity)
    .reduce((prevValue, currValue) => prevValue + currValue, 0);

  // get user detail to make buy now work
  const user = JSON.parse(localStorage.getItem("users"));

  // buy now function that create new collection on firebase

  const buyNowFunction = function () {
    if (
      addressInfo.name === "" ||
      addressInfo.address === "" ||
      addressInfo.pincode === "" ||
      addressInfo.mobileNumber === ""
    ) {
      return toast.error("All Fields are required");
    }

    const orderInfo = {
      cartItems,
      addressInfo,
      email: user?.email,
      userid: user.uid,
      status: "confirmed",
      time: Timestamp.now(),
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };

    try {
      const orderRef = collection(fireDB, "order");
      addDoc(orderRef, orderInfo);
      setAddressInfo({
        name: "",
        address: "",
        pincode: "",
        mobileNumber: "",
      });
      toast.success("Order Placed Successfull");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Layout>
      <div className="container mx-auto max-w-7xl px-2 lg:px-0">
        <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Shopping Cart
          </h1>
          <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            <section
              aria-labelledby="cart-heading"
              className="rounded-lg bg-white lg:col-span-8"
            >
              <h2 id="cart-heading" className="sr-only">
                Items In Your Shopping Cart
              </h2>
              <ul role="list" className="divide-y divide-gray-200">
                {cartItems.length > 0 ? (
                  <>
                    {cartItems.map((item, i) => {
                      const {
                        id,
                        title,
                        price,
                        productImageUrl,
                        quantity,
                        category,
                      } = item;
                      return (
                        <div key={i} className="">
                          <li className="flex py-6 sm:py-6 ">
                            <div className="flex-shrink-0">
                              <img
                                src={productImageUrl}
                                alt={title}
                                className="sm:h-38 sm:w-38 h-24 w-24 rounded-md object-contain object-center"
                              />
                            </div>
                            <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                              <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                <div>
                                  <div className="flex justify-between">
                                    <h3 className="text-sm">
                                      <div className="font-semibold text-black">
                                        {title}
                                      </div>
                                    </h3>
                                  </div>
                                  <div className="mt-1 flex text-sm">
                                    <p className="text-sm text-gray-500">
                                      {category}
                                    </p>
                                  </div>
                                  <div className="mt-1 flex items-end">
                                    <p className="text-xs font-medium text-gray-500 line-through">
                                      {price}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                          <div className="mb-2 flex">
                            <div className="min-w-24 flex">
                              <button
                                type="button"
                                className="bg-gray-800 text-white w-8 h-8 rounded-full flex items-center justify-center 
                                  hover:bg-gray-700 active:scale-90 transition-all shadow-md cursor-pointer"
                                onClick={() => handleDecrement(id)}
                              >
                                -
                              </button>
                              <input
                                type="text"
                                className="mx-1 h-7 w-9 rounded-md border text-center"
                                value={quantity}
                              />
                              <button
                                onClick={() => handleIncrement(id)}
                                type="button"
                                className="bg-gray-800 text-white w-8 h-8 rounded-full flex items-center justify-center 
                                  hover:bg-gray-700 active:scale-90 transition-all shadow-md cursor-pointer"
                              >
                                +
                              </button>
                            </div>
                            <div className="ml-6 flex text-sm">
                              <button
                                onClick={() => handleDeleteFromCart(item)}
                                type="button"
                                className="flex items-center space-x-1 px-2 py-1 pl-0 cursor-pointer"
                              >
                                <Trash size={12} className="text-red-500" />
                                <span className="text-xs font-medium text-red-500">
                                  Remove
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <h1 className="bg-red-400 rounded-3xl text-4xl flex justify-center items-center text-center text-white p-5">
                    Go And Add Some Product😍
                  </h1>
                )}
              </ul>
            </section>
            {/* Order summary */}
            {cartItems.length > 0 && (
              <section
                aria-labelledby="summary-heading"
                className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0"
              >
                <h2
                  id="summary-heading"
                  className=" border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4"
                ></h2>
                <div>
                  <dl className=" space-y-1 px-2 py-4">
                    <div className="flex items-center justify-between">
                      <dt className="text-sm text-gray-800">
                        Price ({cartItemTotal} Item)
                      </dt>
                      <dd className="text-sm font-medium text-gray-900">
                        $ {cartTotalPrice}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between py-4">
                      <dt className="flex text-sm text-gray-800">
                        <span>Delivery Charges</span>
                      </dt>
                      <dd className="text-sm font-medium text-green-700">
                        Free
                      </dd>
                    </div>
                    <div className="flex items-center justify-between border-y border-dashed py-4 ">
                      <dt className="text-base font-medium text-gray-900">
                        Total Amount
                      </dt>
                      <dd className="text-base font-medium text-gray-900">
                        $ {cartTotalPrice}
                      </dd>
                    </div>
                  </dl>
                  <div className="px-2 pb-4 font-medium text-green-700">
                    <div className="flex gap-4 mb-6">
                      {user ? (
                        <BuyNowModal
                          addressInfo={addressInfo}
                          setAddressInfo={setAddressInfo}
                          buyNowFunction={buyNowFunction}
                        />
                      ) : (
                        <Navigate to={"/login"} />
                      )}
                    </div>
                  </div>
                </div>
              </section>
            )}
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default CartPage;
