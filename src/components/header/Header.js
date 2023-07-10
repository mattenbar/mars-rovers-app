import Typography from "@mui/material/Typography";
import Nav from "./nav";

const Header = (props) => {
  return (
    <header>
      <Typography id="mars-header" variant="h1" color="red">
        MARS ROVERS
      </Typography>
      
      <Nav roverNames={props.roverNames} />
        
    </header>
  );
};

export default Header;
