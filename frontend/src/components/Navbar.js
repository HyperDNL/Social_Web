import React, { useContext, useState } from "react";
import {
  FaBars,
  FaUserPlus,
  FaSignInAlt,
  FaUser,
  FaUserEdit,
} from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { AiFillHome } from "react-icons/ai";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBCollapse,
  MDBNavbarItem,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBDropdownToggle,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UsersContext";
import axios from "axios";

export function Navbar() {
  const [showNavSecond, setShowNavSecond] = useState(false);
  const [userContext, setUserContext] = useContext(UserContext);

  const logoutHandler = () => {
    axios
      .get("http://localhost:3500/users/logout", {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userContext.token}`,
        },
      })
      .then(async (response) => {
        setUserContext((oldValues) => {
          return { ...oldValues, details: undefined, token: null };
        });
        window.localStorage.setItem("logout", Date.now());
      });
  };

  return userContext.token === null ? (
    <MDBNavbar expand="lg" className="navbar-style">
      <MDBContainer fluid>
        <div className="pic-container">
          <img
            className="pic-nav"
            src="https://res.cloudinary.com/dh9ph7mpz/image/upload/v1670750816/uploads_webapp/logo_cipher_njpb29.png"
          ></img>
        </div>
        <MDBNavbarToggler
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowNavSecond(!showNavSecond)}
        >
          <FaBars className="navbar-bars" />
        </MDBNavbarToggler>
        <MDBCollapse navbar show={showNavSecond}>
          <MDBNavbarNav className="links-nav">
            <Link to={"/"} className="link-nav">
              <FaSignInAlt />
              Login
            </Link>
            <Link to={"/signup"} className="link-nav">
              <FaUserPlus />
              Signup
            </Link>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  ) : (
    <MDBNavbar expand="lg" className="navbar-style">
      <MDBContainer fluid>
        <div className="pic-container">
          <img
            className="pic-nav"
            src="https://res.cloudinary.com/dh9ph7mpz/image/upload/v1670750816/uploads_webapp/logo_cipher_njpb29.png"
          ></img>
        </div>
        <MDBNavbarToggler
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowNavSecond(!showNavSecond)}
        >
          <FaBars className="navbar-bars" />
        </MDBNavbarToggler>
        <MDBCollapse navbar show={showNavSecond}>
          <MDBNavbarNav className="links-nav">
            <Link to={"/home"} className="link-nav">
              <AiFillHome />
              Home
            </Link>
            <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle tag="a" className="link-nav" role="button">
                  Options
                </MDBDropdownToggle>
                <MDBDropdownMenu className="drop-menu">
                  <MDBDropdownItem className="drop-item">
                    <Link to={"/profile"} className="link-nav">
                      <FaUser />
                      Profile
                    </Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem className="drop-item">
                    <Link to={"/editProfile"} className="link-nav">
                      <FaUserEdit />
                      Edit Profile
                    </Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem className="drop-item">
                    <Link onClick={logoutHandler} to={"/"} className="link-nav">
                      <MdLogout />
                      Logout
                    </Link>
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
