import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard";
// import Users from "./pages/Users";
 import Products from "./pages/Products";
import "./index.css";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/shop/dashboard" element={<Dashboard />} />
          {/* <Route path="/users" element={<Users />} */}
          <Route path="/shop/dashboard/products" element={<Products />} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
