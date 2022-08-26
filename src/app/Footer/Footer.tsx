import React from "react";
import classes from "./Footer.module.css";
import { Link } from "react-router-dom";
import home from "./home_icon.svg";
import list from "./list_icon.svg";
import add from "./add_icon.svg";
import person from "./person_icon.svg";
import about from "./about_icon.svg";

function Footer() {
  return (
    <div className={classes.container}>
      <div className={classes.iconsLeft}>
        <Link to="/">
          <img src={home} className={classes.logo} alt="home" height="40px" />
        </Link>
        <Link to="/list">
          <img src={list} className={classes.logo} alt="list" height="40px" />
        </Link>
      </div>
      <div className={classes.iconsCenter}>
        <div className={classes.cube}></div>
        <div className={classes.cube2}>
          <Link to="/listDetail">
            <img
              src={add}
              className={classes.addLogo}
              alt="add"
              height="40px"
            />
          </Link>
        </div>
      </div>
      <div className={classes.iconsRight}>
        <Link to="/about">
          <img src={about} className={classes.logo} alt="about" height="40px" />
        </Link>
        <Link to="/login">
          <img
            src={person}
            className={classes.logo}
            alt="person"
            height="40px"
          />
        </Link>
      </div>
    </div>
  );
}

export default Footer;
