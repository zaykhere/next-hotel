import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <nav className="navbar row justify-content-center sticky-top">
      <div className="container">
        <div className="col-3 p-0">
          <div className="navbar-brand">
            <h3 className="heading-text">
              
              <Link href="/">
              <a className="heading-text"> Next Hotel </a>
              </Link>
            </h3>
          </div>
        </div>

        <div className="col-3 mt-3 mt-md-0 text-center">
          <Link href="/login">
          <a className="btn btn-danger px-4 text-white login-header-btn float-right">
            Login
          </a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
