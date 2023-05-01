import * as React from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

export default function Nav(props) {
  const links = () => {
    console.log('props NAV')
    console.log(props)
    return props.rovers.map((c) => (
      <Link sx={{padding:"1%"}} fontFamily={'marsBold'} color="text.main" href={'/'+ c.name} fontSize="16px" underline="hover">
          {c.name}
      </Link>
    ));
  };

  return (
    <React.Fragment>
      <Box
        maxWidth="lg"
        sx={{ display: "flex", alignItems: "center", textAlign: "center",flexWrap: "wrap" ,justifyContent: 'space-evenly', height:'2' }}
      >
        <Link fontFamily={'marsBold'} color="text.main" href={"/"} fontSize="16px" underline="hover" sk={{margin:'20px', height:'15px'}}>
          {"Home"}
        </Link>
        {links()}
        
        
      </Box>
    </React.Fragment>
  );
}
//sx={{ flexWrap: "wrap" }}