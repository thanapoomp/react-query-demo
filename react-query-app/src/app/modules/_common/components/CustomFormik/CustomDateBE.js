/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Grid, FormControl, FormLabel } from "@material-ui/core";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import PropTypes from "prop-types";
var dayjs = require("dayjs");

function CustomDateBE(props) {
  const [selectedDay, setSelectedDay] = React.useState(-1);
  const [selectedMonth, setSelectedMonth] = React.useState(-1);
  const [selectedYear, setSelectedYear] = React.useState(-1);
  const [days, setDays] = React.useState([]);
  const [months, setMonths] = React.useState([]);
  const [years, setYears] = React.useState([]);

  const initDays = () => {
    let dayToSet = [];
    dayToSet.push({ id: -1, name: "วัน" });
    for (let index = 1; index <= 31; index++) {
      dayToSet.push({ id: index, name: index.toString() });
    }
    setDays(dayToSet);
  };

  const initMonths = () => {
    let monthToSet = [];
    monthToSet.push({ id: -1, name: "เดือน" });
    monthToSet.push({ id: 1, name: "ม.ค." });
    monthToSet.push({ id: 2, name: "ก.พ." });
    monthToSet.push({ id: 3, name: "มี.ค." });
    monthToSet.push({ id: 4, name: "เม.ย." });
    monthToSet.push({ id: 5, name: "พ.ค." });
    monthToSet.push({ id: 6, name: "มิ.ย." });
    monthToSet.push({ id: 7, name: "ก.ค." });
    monthToSet.push({ id: 8, name: "ส.ค." });
    monthToSet.push({ id: 9, name: "ก.ย." });
    monthToSet.push({ id: 10, name: "ต.ค." });
    monthToSet.push({ id: 11, name: "พ.ย." });
    monthToSet.push({ id: 12, name: "ธ.ค." });
    setMonths(monthToSet);
  };

  const initYears = () => {
    let yearToSet = [{ id: -1, name: "พ.ศ." }];
    let yearFrom = 1900;
    let yearTo = dayjs().year();
    for (let index = yearFrom; index <= yearTo; index++) {
      yearToSet.push({ id: index, name: `${index + 543}` });
    }
    setYears(yearToSet);
  };

  const handleSelectedDayChange = (event) => {
    setSelectedDay(event.target.value);
  };

  const handleSelectedMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleSelectedYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const isValidDate = () => {
    let day = ("0" + selectedDay).slice(-2);
    let month = ("0" + selectedMonth).slice(-2);
    let year = selectedYear;
    let mixStringDate = `${year}-${month}-${day}`;
    let result = dayjs(mixStringDate, "YYYY-MM-DD", true).isValid();
    return result;
  };

  const getSelectedDate = () => {
    let day = ("0" + selectedDay).slice(-2);
    let month = ("0" + selectedMonth).slice(-2);
    let year = selectedYear;
    let mixStringDate = `${year}-${month}-${day}`;
    let result = dayjs(mixStringDate, "YYYY-MM-DD");
    return result;
  };

  const getFormikInitialValues = () => {
    // console.log(props.formik.values[`${props.name}`]);
    if (props.formik.values[`${props.name}`]) {
      let inputDate = dayjs(props.formik.values[`${props.name}`]);

      setSelectedDay(inputDate.date());
      setSelectedMonth(inputDate.month() + 1);
      setSelectedYear(inputDate.year());
    }
  };

  React.useEffect(() => {
    if (selectedDay > -1 && selectedMonth > -1 && selectedYear > -1) {
      //set touched
      props.formik.setFieldTouched(props.name, true);
      //Validate date
      if (isValidDate()) {
        //Set formik  value
        props.formik.setFieldValue(props.name, getSelectedDate());
      } else {
        //set formik value
        props.formik.setFieldValue(props.name, null);
      }
    } else {
      //set formik value
      props.formik.setFieldValue(props.name, null);
    }
  }, [selectedDay, selectedMonth, selectedYear]);

  React.useEffect(() => {
    initDays();
    initMonths();
    initYears();
    getFormikInitialValues();
  }, []);

  return (
    <React.Fragment>
      <FormControl component="fieldset">
        <FormLabel component="legend">{props.label}</FormLabel>
      </FormControl>
      <Grid
        container
        spacing={1}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        {/* start day */}
        <Grid item xs={4} lg={4}>
          <Select
            fullWidth
            variant="outlined"
            native
            value={selectedDay}
            onChange={handleSelectedDayChange}
            inputProps={{
              name: `${props.name}-day`,
              id: `${props.name}-day`,
            }}
          >
            {days.map((item) => (
              <option key={`${props.name}-day-${item.id}`} value={item.id}>
                {item.name}
              </option>
            ))}
          </Select>
        </Grid>
        {/* end day */}

        {/* start month */}
        <Grid item xs={4} lg={4}>
          <Select
            fullWidth
            variant="outlined"
            native
            value={selectedMonth}
            onChange={handleSelectedMonthChange}
            inputProps={{
              name: `${props.name}-month`,
              id: `${props.name}-month`,
            }}
          >
            {months.map((item) => (
              <option key={`${props.name}-month-${item.id}`} value={item.id}>
                {item.name}
              </option>
            ))}
          </Select>
        </Grid>
        {/* end month */}

        {/* start year */}
        <Grid item xs={4} lg={4}>
          <Select
            fullWidth
            variant="outlined"
            native
            value={selectedYear}
            onChange={handleSelectedYearChange}
            inputProps={{
              name: `${props.name}-year`,
              id: `${props.name}-year`,
            }}
          >
            {years.map((item) => (
              <option key={`${props.name}-year-${item.id}`} value={item.id}>
                {item.name}
              </option>
            ))}
          </Select>
        </Grid>
        {/* end year */}
      </Grid>
      {props.formik.errors[`${props.name}`] &&
        props.formik.touched[`${props.name}`] && (
          <FormHelperText style={{ color: "red" }}>
            {props.formik.errors[`${props.name}`]}
          </FormHelperText>
        )}
    </React.Fragment>
  );
}

CustomDateBE.propTypes = {
  formik: PropTypes.object,
  name: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
};

// Same approach for defaultProps too
CustomDateBE.defaultProps = {
  formik: {},
  name: "Do not forget to set name",
  label: "Do not forget to set label",
  disabled: false,
  required: false,
};

export default CustomDateBE;
