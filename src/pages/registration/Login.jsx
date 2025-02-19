import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/MyContext";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import {
  collection,
  onSnapshot,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import { Loader } from "lucide-react";

function Login() {
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  const navigate = useNavigate();

  // user login state
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  // user login function

  const userLoginFunciton = async () => {
    if (userLogin.email === "" || userLogin.password === "") {
      return toast.error("All Field Are Required");
    }
    setLoading(true);
    try {
      const users = await signInWithEmailAndPassword(
        auth,
        userLogin.email,
        userLogin.password
      );
      try {
        const q = query(
          collection(fireDB, "user"),
          where("uid", "==", users?.user?.uid)
        );
        const data = onSnapshot(q, (QuerySnapshot) => {
          let user;
          QuerySnapshot.forEach((doc) => (user = doc.data()));
          localStorage.setItem("users", JSON.stringify(user));
          setUserLogin({
            email: "",
            password: "",
          });
          toast.success("Login Successfully");
          setLoading(false);
          if (user.role === "user") {
            navigate("/user-dashboard");
          } else {
            navigate("/admin-dashboard");
          }
        });
        return () => data;
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error("Login failed!");
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      {loading && <Loader />}
      <div className="login_Form bg-black  px-1 lg:px-8 py-6 border border-white rounded-xl shadow-md">
        <div className="mb-5">
          <h2 className="text-center text-2xl font-bold text-white ">Login</h2>
        </div>
        <div className="mb-3">
          <input
            value={userLogin.email}
            onChange={(e) => {
              setUserLogin({
                ...userLogin,
                email: e.target.value,
              });
            }}
            type="email"
            placeholder="Email Address"
            className="bg-white  border border-white px-2 py-2 w-96 rounded-md outline-none text-black placeholder-black"
          />
        </div>
        <div className="mb-5">
          <input
            value={userLogin.password}
            onChange={(e) => {
              setUserLogin({
                ...userLogin,
                password: e.target.value,
              });
            }}
            type="password"
            placeholder="Password"
            className="bg-white  border border-white px-2 py-2 w-96 rounded-md outline-none text-black placeholder-black"
          />
        </div>
        <div className="mb-5">
          <button
            onClick={userLoginFunciton}
            type="button"
            className="bg-red-500 0 hover:bg-red-800 cursor-pointer w-full text-white text-center py-2 font-bold rounded-md "
          >
            Login
          </button>
        </div>
        <div>
          <h2 className="text-white">
            Don&apos;t Have an account{" "}
            <Link className=" text-blue-400 font-bold" to={"/signup"}>
              Signup
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Login;
