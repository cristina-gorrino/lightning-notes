import React from "react";
//import { useLocation, useHistory } from "react-router-dom";

const Footer = () => {
  // const location = useLocation();
  // const history = useHistory();
  return (
    <footer>
      <div className="container">
        {/* {location.pathname !== "/" && (
          <button onClick={() => history.goBack()}>&larr; Go Back</button>
        )} */}
        <h4 style={{marginTop: '35px', marginLeft: '25px'}}>
          Made with <span>❤️</span> by the Lightning Notes Team.
        </h4>
      </div>
    </footer>
  );
};

export default Footer;
