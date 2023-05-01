import * as React from "react";
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

import { useState, useEffect } from "react";
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

  const [value, setValue] = React.useState(0);
  const [date, setDate] = React.useState(startDate);
  const [photos, setPhotos] = useState({ photos: [] });
  const [roverName] = useState(props.rover.name);

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

      setPhotos(result.data);
    };
    fetchData(roverName, date);
  }, [roverName, date]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const cameraTabs = [];
  for (let i = 0; i < props.rover.cameras.length; i++) {
    cameraTabs.push(
      <Tab label={props.rover.cameras[i].name} {...a11yProps(i + 1)} />
    );
  }

  const tabPanel = [];
  var ids = function (i) {
    return [props.rover.cameras[i].name];
  };

  for (let i = 0; i < props.rover.cameras.length; i++) {
    var data = photos;

    var filteredArray = data.photos.filter(function (itm) {
      return ids(i).indexOf(itm.camera.name) > -1;
    });

    if (filteredArray.length > 0) {
      tabPanel.push(
        <TabPanel value={value} index={i + 1}>
          <TitlebarImageList
            photos={filteredArray}
            camera={props.rover.cameras[i].name}
          />
        </TabPanel>
      );
    } else {
      tabPanel.push(
        <TabPanel value={value} index={i + 1}>
          No Images
        </TabPanel>
      );
    }
  }

  return (
    <Box sx={{ width: "100%" }}>
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
          {cameraTabs}
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
      <TabPanel value={value} index={0}>
        {photos.photos.length > 0 ? (
          <TitlebarImageList photos={photos} />
        ) : (
          "No Images"
        )}
      </TabPanel>
      {tabPanel}
    </Box>
  );
}

// const today = moment().format("YYYY-MM-DD");
//   const [photos, setPhotos] = useState({ photos: [] });
//   const [roverName, setRoverName] = useState(props.rover.name);
//   const [date, setDate] = useState(today);
