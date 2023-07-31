import Typography from "@mui/material/Typography";
import Nav from "./nav";
import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <header className={classes["main-header"]}>
      <Typography
        variant="h1"
      >
        MARS ROVERS
      </Typography>
      <Nav />
    </header>
  );
};

export default Header;
