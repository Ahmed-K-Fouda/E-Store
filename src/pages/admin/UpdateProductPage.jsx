import { useContext, useEffect, useState } from "react";
import myContext from "../../context/myContext";
import { useNavigate, useParams } from "react-router-dom";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import toast from "react-hot-toast";
import { fireDB } from "../../firebase/FirebaseConfig";
import Loader from "../../components/loader/Loader";

const categoryList = [
  {
    name: "fashion",
  },
  {
    name: "shirt",
  },
  {
    name: "jacket",
  },
  {
    name: "mobile",
  },
  {
    name: "laptop",
  },
  {
    name: "shoes",
  },
  {
    name: "home",
  },
  {
    name: "books",
  },
];
function UpdateProductPage() {
  const context = useContext(myContext);
  const { loading, setLoading, getAllProductFunction } = context;
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  const [product, setProduct] = useState({
    title: "",
    price: "",
    productImageUrl: "",
    category: "",
    description: "",
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  useEffect(() => {
    const getSingleProduct = async function () {
      setLoading(true);
      try {
        const getProduct = (await getDoc(doc(fireDB, "products", id))).data();
        setProduct({
          title: getProduct?.title,
          price: getProduct?.price,
          productImageUrl: getProduct?.productImageUrl,
          category: getProduct?.category,
          description: getProduct?.description,
          quantity: getProduct?.quantity,
          time: getProduct?.time,
          date: getProduct?.date,
        });
        setLoading(false);
        console.log();
      } catch (error) {
        console.log(error);
      }
    };
    getSingleProduct();
  }, [id, setLoading]);

  const updateProductFunction = async function () {
    setLoading(true);
    try {
      await setDoc(doc(fireDB, "products", id), product);
      toast.success("product updated successfully");
      getAllProductFunction();
      setLoading(false);
      navigate("/admin-dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <div className="login_Form bg-black px-8 py-6 border border-pink-100 rounded-xl shadow-md">
          <div className="mb-5">
            <h2 className="text-center text-2xl font-bold text-slate-100 ">
              Update Product
            </h2>
          </div>
          <div className="mb-3">
            <input
              style={{ background: "white" }}
              type="text"
              value={product.title}
              onChange={(e) =>
                setProduct({ ...product, title: e.target.value })
              }
              name="title"
              placeholder="Product Title"
              className="bg-pink-50 text-black border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-black"
            />
          </div>
          <div className="mb-3">
            <input
              style={{ background: "white" }}
              type="number"
              placeholder="Product Price"
              value={product.price}
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
              className="bg-pink-50 text-black border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-black"
            />
          </div>
          <div className="mb-3">
            <input
              style={{ background: "white" }}
              type="text"
              placeholder="Product Image Url"
              value={product.productImageUrl}
              onChange={(e) =>
                setProduct({ ...product, productImageUrl: e.target.value })
              }
              className="bg-pink-50 text-black border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-black"
            />
          </div>
          <div className="mb-3">
            <select
              value={product.category}
              onChange={(e) =>
                setProduct({ ...product, category: e.target.value })
              }
              className="w-full px-1 py-2 text-black bg-white border border-pink-200 rounded-md outline-none  "
            >
              <option value="">Select Product Category</option>
              {categoryList.map((value, index) => {
                const { name } = value;
                return (
                  <option
                    className=" first-letter:uppercase"
                    key={index}
                    value={name}
                  >
                    {name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="mb-3">
            <textarea
              name="description"
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
              placeholder="Product Description"
              rows="5"
              className=" w-full px-2 py-1 text-black bg-white border border-pink-200 rounded-md outline-none placeholder-black "
            ></textarea>
          </div>
          <div className="mb-3">
            <div className="flex justify-center relative top-20">
              {loading ? (
                <Loader />
              ) : (
                <button
                  type="button"
                  disabled={loading}
                  onClick={updateProductFunction}
                  className="bg-amber-400 text-white hover:bg-amber-500 hover:text-white w-full text-dark cursor-pointer text-center py-2 font-bold rounded-md "
                >
                  Update Product
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateProductPage;
