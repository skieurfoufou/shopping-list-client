import NavItem from "../../app/Header/NavItem/NavItem";
import classes from "./HomePage.module.css";
import React from "react";

function HomePage() {
  return (
    <div className={classes.container}>
      HomePage
      <div>
        <NavItem route={{ link: "/list", title: "choose a list" }} />
      </div>
    </div>
  );
}

export default HomePage;
