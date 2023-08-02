import React, { useState, useEffect, useRef } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TitlebarImageList from "./TitlebarImageList";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment-hijri";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { fetchPhotosData } from "../../store/photos-actions";

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
          <Typography component={"span"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function checkDate(maxDate, minDate, date) {
  var defaultDate = "";

  var today = "";
  if (!!date) {
    today = moment(date["$d"]).format("YYYY-MM-DD");
  } else {
    today = moment().format("YYYY-MM-DD");
  }

  if (moment(today).isAfter(moment(maxDate).format("YYYY-MM-DD"))) {
    defaultDate = moment(maxDate).format("YYYY-MM-DD");
  } else if (moment(today).isBefore(moment(minDate).format("YYYY-MM-DD"))) {
    defaultDate = moment(minDate).format("YYYY-MM-DD");
  } else {
    defaultDate = today;
  }

  defaultDate = dayjs(defaultDate);
  return defaultDate;
}

export default function BasicTabs(props) {
  const dispatch = useDispatch();
  const photos = useSelector((state) => state.photos).photos;

  const roverName = props.rover.name;
  const maxDate = props.rover["max_date"];
  const minDate = props.rover["landing_date"];
  const startDate = useRef(dayjs(checkDate(maxDate, minDate)));
  const [date, setDate] = useState(startDate.current);
  const [value, setValue] = useState(0);
  const loading = useRef(true);

  useEffect(() => {
    const newDate = dayjs(checkDate(maxDate, minDate, date));
    dispatch(fetchPhotosData(roverName, newDate));
  }, [date, dispatch, maxDate, minDate, roverName]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const cameraTabs = props.rover.cameras.map((cam, index) => (
    <Tab
      className="camera-tab"
      sx={{ textDecoration: "none !important" }}
      key={cam.name + cam.id}
      label={cam.name}
    />
  ));

  let tabPanel = [];
  if (photos.length > 0) {
    loading.current = false;
    tabPanel = props.rover.cameras.map((cam, index) => {
      var filteredArray = photos.filter((p) => p.camera.name === cam.name);

      if (filteredArray.length > 0) {
        return (
          <TabPanel
            className={"tab-Panel-Class"}
            key={`${cam.name}-${index}`}
            value={value}
            index={index + 1}
          >
            <TitlebarImageList
              className={"tab-Panel-Class"}
              onOpenModal={props.onOpenModal}
              photos={filteredArray}
              camera={cam.name}
            />
          </TabPanel>
        );
      } else {
        return (
          <TabPanel
            key={`${cam.name}-${index}`}
            value={value}
            index={index + 1}
          >
            No Images
          </TabPanel>
        );
      }
    });
  }

  return loading.current ? (
    <Box
      justifyContent="space-evenly"
      sx={{
        background: "transparent !important",
        width: "100%",
        display: "flex",
      }}
    >
      <CircularProgress
        sx={{
          background: "transparent !important",
          width: "500px",
          height: "auto",
        }}
      />
    </Box>
  ) : (
    <Box sx={{ background: "white !important", width: "100%", height: "auto" }}>
      <Box
        id="tabs-wrapper"
        sx={{
          borderBottom: 1,
          margin: 2,
          borderColor: "divider",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            className="date-picker-wrapper"
            label="Date"
            value={checkDate(maxDate, minDate, date)}
            onChange={(newValue) => {
              loading.current = true;
              const newDate = checkDate(maxDate, minDate, newValue);
              setDate(newDate);
            }}
            maxDate={dayjs(maxDate)}
            minDate={dayjs(minDate)}
            format="YYYY-MM-DD"
          />
        </LocalizationProvider>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{ maxWidth: "80%" }}
          id="camera-tabs-wrapper"
        >
          <Tab
            className="camera-tab"
            label="All Cameras"
            sx={{ textDecoration: "none !important" }}
          />
          {cameraTabs}
        </Tabs>
      </Box>

      <TabPanel
        className={"tab-Panel-Class"}
        key="all-cams"
        value={value}
        index={0}
      >
        {photos.length > 0 ? (
          <TitlebarImageList
            className={"tab-Panel-Class"}
            onOpenModal={props.onOpenModal}
            photos={photos}
          />
        ) : (
          "No Images"
        )}
      </TabPanel>

      {tabPanel}
    </Box>
  );
}
