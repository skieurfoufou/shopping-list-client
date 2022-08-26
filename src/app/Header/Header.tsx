import React from "react";
import logo from "./logo.svg";
import classes from "./Header.module.css";
import NavItem from "./NavItem/NavItem";

function Header() {
  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <img src={logo} className={classes.appLogo} alt="logo" height="40px" />
        <h3>SHOPPING LIST</h3>
        <img src={logo} className={classes.appLogo} alt="logo" height="40px" />
      </div>
      <div className={classes.login}>
        <NavItem route={{ link: "/login", title: "Login" }} />
        <NavItem route={{ link: "/register", title: "Register" }} />
      </div>
    </div>
  );
}

export default Header;
