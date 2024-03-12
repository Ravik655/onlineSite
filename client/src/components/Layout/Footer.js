import React from "react";
import { Link } from "react-router-dom";

const footer = () => {
  return (
    <div className="footer mb-3">
      <p className="text-center m3">
        <Link to="/about">About</Link>|<Link to="/contact">Contact Us</Link>|
        <Link to="/policy">privecy policy</Link>
      </p>
    </div>
  );
};

export default footer;
