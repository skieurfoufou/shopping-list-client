import React, { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { List } from "../../../types/ListType";
import classes from "./DisplayList.module.css";

interface DisplayTextProps extends PropsWithChildren {
  lists: List[];
}

function DisplayList({ lists }: DisplayTextProps) {
  return (
    <div>
      {lists.map((list) => (
        <Link to={`/list-detail?id=${list._id}`} key={list._id}>
          <div className={classes.title}>{list.title}</div>
        </Link>
      ))}
    </div>
  );
}

export default DisplayList;
