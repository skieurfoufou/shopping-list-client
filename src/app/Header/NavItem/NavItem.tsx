import React, { PropsWithChildren } from "react";
import classes from "./NavItem.module.css";
import { NavLink } from "react-router-dom";

interface NavItemProps extends PropsWithChildren {
  route: {
    link: string;
    title: string;
  };
}

function NavItem(props: NavItemProps) {
  const { route } = props;
  return (
    <NavLink
      to={route.link}
      className={({ isActive }) =>
        `${classes.header_link} ${isActive ? classes.active_link : ""}`
      }
    >
      <h5 className={classes.title_navBar}>{route.title}</h5>
    </NavLink>
  );
}

export default NavItem;
