import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Banner from "./pages/main/banner";
import Footer from "./components/footer";
import FormContainer from "./pages/main/formContainer";
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
              <FormContainer />
            </>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
