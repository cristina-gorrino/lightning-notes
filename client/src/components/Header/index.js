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
            <h1><FlashOnIcon />Lightning Notes<FlashOnIcon /></h1>
          </Link>
        </div>
        <div>
          {Auth.loggedIn() ? (
            <>
              <Link to="/" style={{fontSize: '18px', margin: '10px'}}>
                {Auth.getProfile().data.username}'s Dashboard 
              </Link>
              <button onClick={logout} style={{fontSize: '14px'}}>Logout</button>
            </>
          ) : (
            <>
              <Link style={{display: 'flex', justifyContent: 'flex-end', marginBottom: '15px'}} to="/login">Login</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
