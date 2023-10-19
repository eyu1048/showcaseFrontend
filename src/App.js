import { Route, Routes } from "react-router-dom";
// import Navbar from "./components/Navbar";
import HomePage from "./page/HomePage";
import AdminPage from "./page/adminPage";
import About from "./page/About";
import Contact from "./page/Contact";
// import Products from "./page/Products";
import AdminLogin from "./page/AdminLogin";
import AdminRegister from "./page/AdminRegister";
import Create from "./page/Create";
import View from "./page/View";
import Logout from "./page/Logout";
import ProductDetails from "./components/ProductDetails";
import Favorites from "./page/Favorites";

function App() {
  return (
    <div className="App">
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/adminRegister" element={<AdminRegister />} />
        <Route path="/create" element={<Create />} />
        <Route path="/view" element={<View />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  );
}

export default App;
