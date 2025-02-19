import { useContext, useState } from "react";
import myContext from "../../context/MyContext";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, Timestamp } from "firebase/firestore";
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
function AddProductPage() {
  const { loading, setLoading } = useContext(myContext);
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    productImageUrl: "",
    category: "",
    quantity: 1,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  async function addProductFunction() {
    if (
      product.title == "" ||
      product.price == "" ||
      product.productImageUrl == "" ||
      product.category == "" ||
      product.description == ""
    ) {
      return toast.error("all fields are required");
    }
    setLoading(true);
    try {
      const productRef = collection(fireDB, "products");
      await addDoc(productRef, product);
      toast.success("Add product successfully");
      navigate("/admin-dashboard");
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error("Add product failed");
    }
  }

  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        {loading && <Loader />}
        <div className="login_Form bg-black px-8 py-6 border border-pink-100 rounded-xl shadow-md">
          <div className="mb-5">
            <h2 className="text-center text-2xl font-bold text-white-500 ">
              Add Product
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
                  onClick={addProductFunction}
                  className="bg-amber-600 text-white hover:bg-amber-500 hover:text-white w-full text-dark cursor-pointer text-center py-2 font-bold rounded-md "
                >
                  Add Product
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProductPage;
