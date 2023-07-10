import * as React from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

export default function Nav(props) {
//   console.log('Nav.js')
// console.log(props)

  const links =  props.roverNames.map((c) => (
      <Link
        key={c}
        sx={{ padding: "1%" }}
        fontFamily={"marsBold"}
        color="text.main"
        href={"/" + c}
        fontSize="16px"
        underline="hover"
      >
        {c}
      </Link>
    ));
  ;

  return (
    <div className="Nav">
      <Box
        maxWidth="lg"
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          height: "2",
        }}
      >
        <Link
          key="home"
          fontFamily={"marsBold"}
          color="text.main"
          href={"/"}
          fontSize="16px"
          underline="hover"
          sk={{ margin: "20px", height: "15px" }}
        >
          {"Home"}
        </Link>
        {links}
      </Box>
    </div>
  );
}

