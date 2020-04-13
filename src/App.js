import React from "react";
import "./App.css"
import Weather from "./Component/Weather"
import {geolocated} from "react-geolocated";

const App = (props) => {
	return (
		<div>
			<Weather
				lat={props.coords ? props.coords.latitude : undefined}
				lon={props.coords ? props.coords.longitude : undefined}
			/>
		</div>
	);
};

export default geolocated({
	positionOptions: {
		enableHighAccuracy: false,
	},
	userDecisionTimeout: 5000,
})(App);
