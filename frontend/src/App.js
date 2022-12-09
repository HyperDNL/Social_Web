import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import {
  Home,
  Login,
  Signup,
  Profile,
  Games,
  NotFoundPage,
} from "./pages/Index";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="children-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/games" element={<Games />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
