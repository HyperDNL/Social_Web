import { Routes, Route, BrowserRouter, useNavigate } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import {
  Login,
  Signup,
  Profile,
  Home,
  NotFoundPage,
  EditProfile,
} from "./pages/Index";
import { Toaster } from "react-hot-toast";
import { useCallback, useContext, useEffect } from "react";
import { UserContext } from "./context/UsersContext";
import axios from "axios";
import { Loader } from "./components/Loader";

function App() {
  const [userContext, setUserContext] = useContext(UserContext);

  const verifyUser = useCallback(() => {
    axios
      .post("http://localhost:3500/users/refreshToken")
      .then(async (response) => {
        if (response.data.message !== "Unauthorized") {
          setUserContext((oldValues) => {
            return { ...oldValues, token: response.data.token };
          });
        } else {
          setUserContext((oldValues) => {
            return { ...oldValues, token: null };
          });
        }
        setTimeout(verifyUser, 5 * 60 * 1000);
      });
  }, [setUserContext]);

  useEffect(() => {
    verifyUser();
  }, [verifyUser]);

  const syncLogout = useCallback((event) => {
    if (event.key === "logout") {
      window.location.reload();
    }
  }, []);

  useEffect(() => {
    window.addEventListener("storage", syncLogout);
    return () => {
      window.removeEventListener("storage", syncLogout);
    };
  }, [syncLogout]);

  return userContext.token === null ? (
    <>
      <BrowserRouter>
        <Navbar />
        <Toaster />
        <div className="children-container">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  ) : userContext.token ? (
    <>
      <BrowserRouter>
        <Navbar />
        <Toaster />
        <div className="children-container">
          <Routes>
            <Route path="/profile" element={<Profile />} />
            <Route path="/editProfile" element={<EditProfile />} />
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  ) : (
    <>
      <Loader />
    </>
  );
}

export default App;
