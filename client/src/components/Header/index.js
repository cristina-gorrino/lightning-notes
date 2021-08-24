import React from "react";
import { Link } from "react-router-dom";
import FlashOnIcon from "@material-ui/icons/FlashOn";

import Auth from "../../utils/auth";

const Header = () => {
  const logout = (e) => {
    e.preventDefault();
    Auth.logout();
  };
  return (
    <header>
      <div className="container">
        <div>
          <Link to="/">
            <h1>
              <FlashOnIcon />
              Lightning Notes
              <FlashOnIcon />
            </h1>
          </Link>
        </div>
        <div>
          {Auth.loggedIn() ? (
            <>
              <Link
                to="/"
                style={{ fontSize: "20px", margin: "25px", padding: "25px" }}
              >
                Welcome to Your Dashboard {Auth.getProfile().data.username}
              </Link>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginBottom: "15px",
                }}
                to="/login"
              >
                Login
              </Link>
              {/* <Link to="/signup">Signup</Link> */}
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
