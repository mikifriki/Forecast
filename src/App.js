import React from "react";
import "./App.css"
import Weather from "./Component/Weather"
import {geolocated} from "react-geolocated";

class App extends React.Component {

	render() {
		return (
			<>
				<div>
					<Weather
						lat={this.props.coords ? this.props.coords.latitude : undefined}
						lon={this.props.coords ? this.props.coords.longitude : undefined}
					/>
				</div>
			</>
		);
	}
}

export default geolocated({
	positionOptions: {
		enableHighAccuracy: false,
	},
	userDecisionTimeout: 5000,
})(App);
