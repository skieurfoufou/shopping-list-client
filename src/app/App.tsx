import { useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "./App.css";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import Header from "./Header/Header";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import ListPage from "../pages/ListPage/ListPage";
import Footer from "./Footer/Footer";
import ListDetail from "../pages/ListDetail/ListDetail";
import About from "../pages/About/About";
import CreateList from "../pages/CreateList/CreateList";

function App() {
  const auth = useAuth();
  const navigate = useNavigate();
  const { login, isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    auth.init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (!isLoggedIn) {
      return navigate("/login");
    }
  }, []);

  return (
    <AuthContext.Provider value={auth}>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/list-detail" element={<ListDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/create-list" element={<CreateList />} />
        </Routes>
        <Footer />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
