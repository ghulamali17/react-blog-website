import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer"; // Import Footer
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Outlet } from "react-router";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  return (
    <>
      <Navbar /> {/* Display Navbar */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <main>
          <Outlet />
        </main>
      )}
      <Footer /> {/* Display Footer */}
    </>
  );
}

export default App;
