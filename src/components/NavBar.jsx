import { NavLink } from "react-router-dom";

import "./navbar.css";

const NavBar = ({ setUser, user }) => {
  const handleLogout = () => {
    setUser({ user: null });
    localStorage.removeItem("userData");
  };

  return (
    <div className="navbar">
      <div className="nav__wrapper">
        <div className="nav__left">
          <div className="nav__logo">
            <i class="fas fa-store-alt"></i>
            <h2 className="nav__title">
              {" "}
              <span>{!user?.loading && user?.user?.name}</span>
            </h2>
          </div>
        </div>

        <div className="nav__center">
          <ul className="nav__link__container">
            <NavLink
              to="/"
              style={{ textDecoration: "none", color: "lightgray" }}
              activeclassname="active-link"
            >
              <li className="nav__link">Home Page</li>
            </NavLink>

            {!user.user && (
              <>
                <NavLink
                  to="/login"
                  style={{ textDecoration: "none", color: "lightgray" }}
                  activeclassname="active-link"
                >
                  <li className="nav__link">Login</li>
                </NavLink>

                <NavLink
                  to="/register"
                  style={{ textDecoration: "none", color: "lightgray" }}
                  activeclassname="active-link"
                >
                  <li className="nav__link">Sign Up</li>
                </NavLink>
              </>
            )}
          </ul>

          {user?.user?.name && (
            <button className="nav__link logout" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>

        <div className="nav__right">
          <i className="fas fa-search"></i>
          <i className="fas fa-shopping-cart"></i>
          <i className="fas fa-user"></i>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
