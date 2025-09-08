import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Banner from "./pages/main/banner";
import Footer from "./components/footer";
// import CategoriesMain from "./pages/main/categoriesMain";
import FormContainer from "./pages/main/formContainer";
import SalesMain from "./pages//main/salesMain";
import Categories from "./pages/categories";
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
              {/* <CategoriesMain /> */}
              <FormContainer />
              <SalesMain />
            </>
          }
        />
        <Route path="/categories" element={<Categories />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
