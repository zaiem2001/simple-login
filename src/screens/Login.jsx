import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./login.css";
import Message from "../components/Messanger";
import Loader from "../components/Loader";

const Login = ({ loginHandler, user }) => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    if (user?.user?.name) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    const userObj = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    loginHandler("login", userObj);

    e.preventDefault();
  };

  return (
    <div className="login">
      <h1 className="login__title">Login</h1>
      <div className="login__wrapper">
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Enter Your Email" ref={emailRef} />
          <input
            type="password"
            placeholder="Enter Your Password"
            ref={passwordRef}
          />

          {user.loading ? (
            <Loader size="30px" />
          ) : (
            <button className="submit" type="submit" disabled={user.loading}>
              Login
            </button>
          )}
        </form>
      </div>

      <div className="error__info">
        {user.error && <Message variant="danger">{user.error}</Message>}
      </div>

      <div className="login__info">
        <span>
          Don't have an account ? <Link to="/register">Register</Link> here.{" "}
        </span>
      </div>
    </div>
  );
};

export default Login;
