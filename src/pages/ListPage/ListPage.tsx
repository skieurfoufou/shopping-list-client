import React from "react";
import { Link } from "react-router-dom";
import classes from "./ListPage.module.css";
import ListDetail from "../ListDetail/ListDetail";

function ListPage() {
  return (
    <div className={classes.container}>
      <h2 className={classes.title}>ListPage</h2>
      <br></br>
      <div className={classes.link}>
        <Link to="/listDetail?id=1">Benichou List</Link>
      </div>
      <div className={classes.link}>
        <Link to="/listDetail">sayada list</Link>
      </div>
      <div className={classes.link}>
        <Link to="/listDetail">mamy fortune list</Link>
      </div>
    </div>
  );
}

export default ListPage;
