import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment-hijri';



export default function DateFieldValue(props) {

  const maxDate = props.rover['max_date']
  const minDate = props.rover['landing_date']

  function checkDate(){
    var today = moment().format('YYYY-MM-DD')
    var defaultDate = ''
    if(moment(today).isAfter(moment(maxDate).format('YYYY-MM-DD'))){
       defaultDate = moment(maxDate).format('YYYY-MM-DD')
    }else{
       defaultDate = today
    }
    
    return dayjs(defaultDate)
  }
  
  
  const [value, setValue] = React.useState(checkDate());
  
  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateField', 'DateField']}>
        <DatePicker
          label="Controlled field"
          value={value}
          onChange={(newValue) => {setValue(newValue)
         
          }}
          maxDate={dayjs(maxDate)}
          minDate={dayjs(minDate)}
          format='YYYY-MM-DD'
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}