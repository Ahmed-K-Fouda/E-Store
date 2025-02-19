import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./../searchBar/SearchBar";
import toast from "react-hot-toast";
import camelCaseUser from "../../helper/helper";
import { useSelector } from "react-redux";
function Navbar() {
  const user = JSON.parse(localStorage.getItem("users"));
  const cartItems = useSelector((state) => state.cart).length;
  const navigate = useNavigate();
  function logout() {
    toast.loading("please wait", {
      duration: 1500,
    });
    setTimeout(() => {
      localStorage.removeItem("users");
      navigate("/login");
    }, 2000);
  }

  const navList = (
    <ul className="flex space-x-3 text-white font-medium text-md px-5">
      <li>
        <Link to={"/"}>Home</Link>
      </li>
      <li>
        <Link to={"/allproduct"}>All Products</Link>
      </li>
      {!user ? (
        <li>
          <Link to={"/signup"}>Signup</Link>
        </li>
      ) : (
        ""
      )}
      {!user ? (
        <li>
          <Link to={"/login"}>Login</Link>
        </li>
      ) : (
        ""
      )}
      {user?.role === "user" && (
        <li>
          <Link to={"/user-dashboard"}>{camelCaseUser(user?.name)}</Link>
        </li>
      )}
      {user?.role === "admin" && (
        <li>
          <Link to={"/admin-dashboard"}>{camelCaseUser(user?.name)}</Link>
        </li>
      )}
      {user && (
        <li className="cursor-pointer" onClick={logout}>
          Logout
        </li>
      )}
      <li>
        <Link to={"/cart"}>cart({cartItems})</Link>
      </li>
    </ul>
  );
  return (
    <nav className="bg-gray-900 sticky top-0">
      <div className="lg:flex lg:justify-between items-center py-3 lg:px-3 ">
        <div className="left py-3 lg:py-0">
          <Link to={"/"}>
            <h2 className=" font-bold text-white text-2xl text-center">
              E-Store
            </h2>
          </Link>
        </div>
        <div className="right flex justify-center mb-4 lg:mb-0">{navList}</div>
        <SearchBar />
      </div>
    </nav>
  );
}

export default Navbar;
