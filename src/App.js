import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Body
import Navbar from "./Components/Body/Navbar";
import Sidebar from "./Components/Body/Sidebar";
import Footer from "./Components/Body/Footer";

// Auth
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import ForgotPassword from "./Components/Auth/ForgotPassword";

import AllUsers from "./Components/Users/AllUsers";
import Homepage from "./Components/Main/Homepage";
import AllCategories from "./Components/Categories/AllCategories";
import AllVendors from "./Components/Vendors/AllVendors";
import AddProduct from "./Components/Products/AddProduct";
import AllProducts from "./Components/Products/AllProducts";
import GetAllPromotion from "./Components/Promotion/GetAllPromotion";

function App() {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    setLocalLogin();
  }, []);

  const setLocalLogin = async () => {
    try {
      let userLogin = await localStorage.getItem("logIN");
      let parsed = JSON.parse(userLogin);
      if (parsed !== null) {
        setLogin(parsed);
      }
    } catch {
      return null;
    }
  };

  return (
    <div className="wrapper">
      {login === false ? (
        <Router>
          <Routes>
            <Route path="/" exact element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/ForgotPassword" element={<ForgotPassword />} />
          </Routes>
        </Router>
      ) : (
        <Router>
          <Navbar />
          <Sidebar />
          <Routes>
            
            <Route path="/" element={<Homepage />} />
            <Route path="/AllUsers" element={<AllUsers />} />
            <Route path="/AllCategories" element={<AllCategories />} />
            <Route path="/AllVendors" element={<AllVendors />} />
            <Route path="/AddProducts" element={<AddProduct />} />
            <Route path="/AllProducts" element={<AllProducts />} />
            <Route path="/GetAllPromotion" element={<GetAllPromotion />} />
            
          </Routes>
          <Footer />
        </Router>
      )}
    </div>
  );
}

export default App;
