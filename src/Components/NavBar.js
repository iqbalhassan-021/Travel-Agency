import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({backgroundColor}) => {
  //buttons-holder

  function getNav() {
    const mobile_nav = document.getElementById('buttons_holder');

    if (mobile_nav) {
      if (mobile_nav.style.display === 'none') {
        mobile_nav.style.display = 'flex';
      } else {
        mobile_nav.style.display = 'none';
      }
    }
  }

  return (
    <div className="container header" id="navbar" style={{backgroundColor}}>
      <div className="body-cover">
        <div className="navbar">
          {/* Logo Section */}
          <div className="tab logo-holder">
            <Link to="/" className="no-decoration">
              <img
                src="assets/images/stars_logo_white.png"
                alt="logo"
                className="logo"
                id="logo"
              />
            </Link>
            <a className="bars" onClick={getNav}>
              <i className="fa-solid fa-bars"></i>
            </a>
          </div>

          {/* Navigation Links */}
          <div className="tab buttons-holder" id="buttons_holder">
            {["Home", "About", "Contact", "Tickets", "Appointments", "Visa"].map((item) => (
              <Link key={item} to={`/${item.toLowerCase()}`} className="no-decoration nav-button">
                <p>{item}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
