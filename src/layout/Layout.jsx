import Navbar from "./../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

/* eslint-disable react/prop-types */
function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <div className="main-content min-h-screen">{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
