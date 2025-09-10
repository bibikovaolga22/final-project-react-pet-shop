import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Banner from "./pages/main/banner";
import Footer from "./components/footer";
import CategoriesMain from "./pages/main/categoriesMain";
import FormContainer from "./pages/main/formContainer";
import SalesMain from "./pages/main/salesMain";
import Categories from "./pages/categories";
import Products from "./pages/products";
import Sales from "./pages/sales";
import CategoryProducts from "./pages/categoryProducts";
import ProductDescription from "./components/productDescription";
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Banner />
              <CategoriesMain />
              <FormContainer />
              <SalesMain />
              <ProductDescription />
            </>
          }
        />
        <Route path="/categories" element={<Categories />} />
        <Route path="/products" element={<Products />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/categories/:categoryId" element={<CategoryProducts />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
