import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

import "./login.css";

import Message from "../components/Messanger";
import { useEffect, useRef } from "react";
import Loader from "../components/Loader";

const Register = ({ loginHandler, user }) => {
  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();

  const handleSubmit = (e) => {
    const userObj = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    loginHandler("register", userObj);

    e.preventDefault();
  };

  useEffect(() => {
    if (user?.user?.name) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="login">
      <h1 className="login__title">Register</h1>
      <div className="login__wrapper">
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Enter Your Name" ref={nameRef} />
          <input type="text" placeholder="Enter Your Email" ref={emailRef} />
          <input
            type="password"
            placeholder="Enter Your Password"
            ref={passwordRef}
          />

          {user.loading ? (
            <Loader size="30px" />
          ) : (
            <button className="submit" type="submit">
              Sign Up
            </button>
          )}
        </form>
      </div>

      {user.error && (
        <div className="error__info">
          <Message variant="danger">{user.error}</Message>
        </div>
      )}

      <div className="login__info">
        <span>
          Already have an account ? <Link to="/login">Login</Link> here.{" "}
        </span>
      </div>
    </div>
  );
};

export default Register;
