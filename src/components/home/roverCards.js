import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import curiosity from "../../images/mars.nasa.jpg";
import opportunity from "../../images/opportunity-rover.jpg";
import perseverance from "../../images/perseverance-rover.jpeg";
import spirit from "../../images/spirit-rover.jpeg";
import Link from "@mui/material/Link";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const switchImage = (props) => {
  switch (props) {
    case "Curiosity":
      return { curiosity };
    case "Opportunity":
      return { opportunity };
    case "Perseverance":
      return { perseverance };
    case "Spirit":
      return { spirit };
    default:
      return "";
  }
};

export default function RoverCard(props) {
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const cameras = () => {
    return props.rover.cameras.map((c) => (
      <Typography variant="body2" fontSize="16px" color="text.main">
        {c.name}
      </Typography>
    ));
  };

  return (
    <Card id={props.rover.name} key={props.rover.id} sx={{ maxWidth: 600 }}>
      <CardHeader title={props.rover.name} />
      <CardMedia
        component="img"
        height="300"
        image={
          switchImage(props.rover.name)[
            Object.keys(switchImage(props.rover.name))[0]
          ]
        }
        alt="Curiosity Rover"
      />
      <CardContent>
        <Typography variant="body2" fontSize="16px" color="text.main">
          Status: {props.rover.status}
        </Typography>
        <Typography variant="body2" fontSize="16px" color="text.main">
          Launch Date: {props.rover.launch_date}
        </Typography>
        <Typography variant="body2" fontSize="16px" color="text.main">
          Landing Date: {props.rover.landing_date}
        </Typography>
        <Typography variant="body2" fontSize="16px" color="text.main">
          Final Date: {props.rover.max_date}
        </Typography>
        <Typography variant="body2" fontSize="16px" color="text.main">
          Photos: {props.rover.total_photos}
        </Typography>
        <Link href={"/" + props.rover.name} fontSize="16px" underline="hover">
          {"View Images"}
        </Link>
      </CardContent>

      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
        <Typography variant="body2" fontSize="14px" color="text.main">
          Camera List
        </Typography>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>{cameras()}</CardContent>
      </Collapse>
    </Card>
  );
}
