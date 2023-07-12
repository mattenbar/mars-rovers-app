import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TitlebarImageList from "./TitlebarImageList";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment-hijri";
import { API_KEY, API_URL } from "../../apiConstants";

import axios from "axios";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function checkDate(maxDate = "2020-02-20") {
  var today = moment().format("YYYY-MM-DD");
  var defaultDate = "";
  if (moment(today).isAfter(moment(maxDate).format("YYYY-MM-DD"))) {
    defaultDate = moment(maxDate).format("YYYY-MM-DD");
  } else {
    defaultDate = today;
  }

  return dayjs(defaultDate);
}

export default function BasicTabs(props) {
  const maxDate = props.rover["max_date"];
  const minDate = props.rover["landing_date"];

  var startDate = checkDate(maxDate);
  startDate = dayjs(startDate);

  const [value, setValue] = useState(0);
  const [date, setDate] = useState(startDate);
  const [photos, setPhotos] = useState([]);
  // const [roverName, setRoverName] = useState(props.rover.name);
  const roverName = props.rover.name
  useEffect(() => {
    
    const fetchData = async (roverName, date) => {
      const result = await axios(
        API_URL +
          roverName +
          "/photos" +
          API_KEY +
          "&earth_date=" +
          date.format("YYYY-MM-DD")
      );

      setPhotos(result.data.photos);
    };
    fetchData(roverName, date);
  }, [roverName, date]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const cameraTabs = props.rover.cameras.map((cam, index) => (
    <Tab key={cam.name+cam.id} label={cam.name} {...a11yProps(index + 1)} />
  ));

 

  let tabPanel = [];
  if (photos.length > 0) {
    
    tabPanel = props.rover.cameras.map((cam, index) => {
      var filteredArray = photos.filter((p) => p.camera.name === cam.name);

      if (filteredArray.length > 0) {
        return <TabPanel key={`${cam.name}-${index}`} value={value} index={index + 1}>
          <TitlebarImageList onOpen={props.onOpen} photos={filteredArray} camera={cam.name} />
        </TabPanel>;
      } else {
        return <TabPanel key={`${cam.name}-${index}`} value={value} index={index + 1}>
          No Images
        </TabPanel>;
      }
    });
  }

  return (
    <Box sx={{ width: "100%", height:'auto',}}>
      <Box
        sx={{
          borderBottom: 1,
          margin: 2,
          borderColor: "divider",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{ flexWrap: "wrap" }}
        >
          <Tab label="All Cameras" {...a11yProps(0)} />
          {photos.length > 0 && cameraTabs}
        </Tabs>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateField", "DateField"]}>
            <DatePicker
              label="Date"
              value={date}
              onChange={(newValue) => {
                setDate(newValue);
              }}
              maxDate={dayjs(maxDate)}
              minDate={dayjs(minDate)}
              format="YYYY-MM-DD"
            />
          </DemoContainer>
        </LocalizationProvider>
      </Box>
      <TabPanel className={'tab-Panel-Class'} key="all-cams" value={value} index={0}>
        {photos.length > 0 ? (
          <TitlebarImageList className={'tab-Panel-Class'} onOpenModal={props.onOpenModal} photos={photos} />
        ) : (
          "No Images"
        )}
      </TabPanel>
      
      {tabPanel}
    </Box>
  );
}
