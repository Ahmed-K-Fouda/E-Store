import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import myContext from "../../context/myContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { Loader } from "lucide-react";

function Signup() {
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  const navigate = useNavigate();

  // user signup state
  const [userSignup, setUserSignup] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  // user signup function
  const userSignupFunction = async () => {
    // check if all fields are filled
    if (
      userSignup.name === "" ||
      userSignup.email === "" ||
      userSignup.password === ""
    ) {
      return toast.error("All Field Are Required");
    }
    setLoading(true);
    try {
      const users = await createUserWithEmailAndPassword(
        auth,
        userSignup.email,
        userSignup.password
      );
      // create user object
      const user = {
        name: userSignup.name,
        email: userSignup.email,
        uid: users.user.uid,
        role: userSignup.role,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
        }),
      };

      // create user refrence
      const userReference = collection(fireDB, "user");

      // add user details
      addDoc(userReference, user);

      setUserSignup({
        name: "",
        email: "",
        password: "",
      });
      setLoading(false);

      toast.success("User Created Successfully");

      // redirect to login page
      navigate("/login");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Signup failed!");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {loading && <Loader />}
      <div className="login_Form bg-black text-white px-1 lg:px-8 py-6 border border-pink-100 rounded-xl shadow-md">
        <div className="mb-5">
          <h2 className="text-center text-2xl font-bold text-white ">Signup</h2>
        </div>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Full Name"
            className="bg-white text-black border border-white px-2 py-2 w-96 rounded-md outline-none placeholder-black"
            value={userSignup.name}
            onChange={(e) => {
              setUserSignup({ ...userSignup, name: e.target.value });
            }}
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            placeholder="Email Address"
            className="bg-white text-black border border-white px-2 py-2 w-96 rounded-md outline-none placeholder-black"
            value={userSignup.email}
            onChange={(e) => {
              setUserSignup({ ...userSignup, email: e.target.value });
            }}
          />
        </div>
        <div className="mb-5">
          <input
            type="password"
            placeholder="Password"
            className="bg-white text-black border border-white px-2 py-2 w-96 rounded-md outline-none placeholder-black"
            value={userSignup.password}
            onChange={(e) => {
              setUserSignup({ ...userSignup, password: e.target.value });
            }}
          />
        </div>
        <div className="mb-5">
          <button
            onClick={userSignupFunction}
            type="button"
            className="bg-red-500 0 hover:bg-red-800 cursor-pointer  w-full text-white text-center py-2 font-bold rounded-md "
          >
            Signup
          </button>
        </div>
        <div>
          <h2 className="text-white">
            Have an account{" "}
            <Link className=" text-blue-400 font-bold" to={"/login"}>
              Login
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Signup;
