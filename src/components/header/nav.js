import * as React from "react";
import { NavLink } from "react-router-dom";
import classes from "./nav.module.css";

export default function Nav(props) {
  const roverNames = ["Curiosity", "Spirit", "Opportunity", "Perseverance"];

  const links = roverNames.map((c) => (
    <li key={c}>
      <NavLink
        className={({ isActive }) => (isActive ? classes.active : undefined)}
        fontFamily={"marsBold"}
        to={"/" + c}
      >
        {c}
      </NavLink>
    </li>
  ));

  return (
    <nav key="nav">
      <ul className={classes.list}>
        <li key="home">
          <NavLink
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
            to={"/"}
          >
            Home
          </NavLink>
        </li>
        {links}
      </ul>
    </nav>
  );
}
