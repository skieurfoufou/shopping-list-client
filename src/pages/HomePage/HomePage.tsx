import NavItem from "../../app/Header/NavItem/NavItem";
import classes from "./HomePage.module.css";
import React from "react";

function HomePage() {
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>WELCOME TO MY SHOPPING LIST APPLICATION</h1>{" "}
      <br></br>
      <div>
        <h1>
          <NavItem route={{ link: "/list", title: "choose a list" }} />
        </h1>
      </div>
    </div>
  );
}

export default HomePage;
