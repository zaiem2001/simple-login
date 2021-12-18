import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import NavBar from "./components/NavBar";
import axios from "axios";

function App() {
  const userData = JSON.parse(localStorage.getItem("userData")) || null;

  const [user, setUser] = useState({
    user: userData,
    error: null,
    loading: false,
  });

  // `https://eshop-backend-pro.herokuapp.com/api/users/login`
  //       : "https://eshop-backend-pro.herokuapp.com/api/users/register";

  const loginHandler = async (req, userObj) => {
    const url =
      req === "login"
        ? "https://eshop-backend-pro.herokuapp.com/api/users/login"
        : "https://eshop-backend-pro.herokuapp.com/api/users/register";

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    setUser({ loading: true, user: null, error: null });

    if (!userObj.email || !userObj.password) {
      setUser({
        loading: false,
        user: null,
        error: "Enter Name, Email and Password.",
      });
      return;
    }

    try {
      const { data } = await axios.post(url, userObj, config);

      if (data) {
        setUser({ loading: false, user: data, error: null });
        localStorage.setItem("userData", JSON.stringify(data));
      }
    } catch (error) {
      setUser({
        loading: false,
        user: null,
        error:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });

      console.log(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  };

  return (
    <div className="main">
      <NavBar setUser={setUser} user={user} />
      <Routes>
        <Route path="/" element={<Home user={user} setUser={setUser} />} />
        <Route
          path="/login"
          element={<Login loginHandler={loginHandler} user={user} />}
        />
        <Route
          path="/register"
          element={<Register loginHandler={loginHandler} user={user} />}
        />
      </Routes>
    </div>
  );
}

export default App;
