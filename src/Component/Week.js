import React from "react";
import DayCard from "./DayCard";


const WeekReport = props => {
	if (props.days === undefined || props.days.length === 0) return <></>;

	//Using the city string as key value instead of index.This way each child element gets a unique key and lowers the risk of showing wrong data.
	return (
		props.days.filter(reading => {
			return reading.dt_txt.includes("15:00:00")
		}).map((day, city) => (
			<DayCard day={day} key={city} city={city}/>
		))

	);
};

export default WeekReport;
