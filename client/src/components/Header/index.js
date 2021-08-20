import React from "react";
import { Link } from "react-router-dom";

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
            <h1>Lightning Notes</h1>
          </Link>
        </div>
        <div>
          {Auth.loggedIn() ? (
            <>
              <Link to="/me">
                Welcome Dear {Auth.getProfile().data.username}
              </Link>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
