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
import { fetchPhotosData, clearPhotosData } from "../../store/photos-actions";
import { useSearchParams } from "react-router-dom";


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
  let returnDate;
  
  if (!date) {
    date = moment(minDate).format("YYYY-MM-DD");
    returnDate = dayjs(date);
    return returnDate;
  }

 
  date = moment(date).format("YYYY-MM-DD");

  if (moment(date).isAfter(moment(maxDate).format("YYYY-MM-DD"))) {
    return "AFTER";
  } else if (moment(date).isBefore(moment(minDate).format("YYYY-MM-DD"))) {
    return "BEFORE";
  }
  returnDate = dayjs(date);

  return returnDate;
}

export default function BasicTabs(props) {
  const dispatch = useDispatch();
  const photos = useSelector((state) => state.photos).photos;
  const roverName = props.rover.name;
  const maxDate = props.rover["max_date"];
  const minDate = props.rover["landing_date"];
  const [searchParams, setSearchParams] = useSearchParams();
  const currentDate = searchParams.get("date");
  
  const [value, setValue] = useState(0);
  const loading = useRef(true);
  const validDate = useRef(checkDate(maxDate, minDate, currentDate))

  useEffect(() => {
    loading.current = true;
    dispatch(clearPhotosData());
    setValue(0);

    if(currentDate == null){
      setSearchParams({ date: minDate });
    }
    const newDate = checkDate(maxDate, minDate, currentDate);

    if(newDate === "BEFORE"){
      setSearchParams({ date: minDate })
    }

    if(newDate === "AFTER"){
      setSearchParams({ date: maxDate })
    }

    dispatch(fetchPhotosData(roverName, newDate));
    
  }, [validDate, currentDate, dispatch, maxDate, minDate, roverName, searchParams, setSearchParams, loading]);

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

  if(validDate.current !== 'BEFORE' && validDate.current !== 'AFTER'){
    loading.current = false
  }

  return loading.current && (validDate.current === 'BEFORE' || validDate.current === 'AFTER') ? (
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
            value={dayjs(currentDate)}
            onChange={(newValue) => {
              loading.current = true;
              
              const formatedValue = moment(newValue["$d"]).format("YYYY-MM-DD");
              setSearchParams({ date: formatedValue });
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
