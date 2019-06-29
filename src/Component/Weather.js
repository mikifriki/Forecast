import React from "react";
import Swal from 'sweetalert2'
import LocationForm from "./Form";
import WeekReport from "./Week";
import Favorites from "./Favorites";
import Location from "./Location";
import Map from "./MapContainer";
import "../CSS/Weather.css";
import {Divider} from 'semantic-ui-react';

export default class Weather extends React.Component {

	state = {
		days: [],
		gpsLocation: {}
	};

	//This starts automatically, add geolocation later.
	componentDidUpdate(prevProps, prevState, snapshot) {
		//return this if location has not changed
		if (this.props.lat === prevProps.lat && this.props.lon === prevProps.lon) return;
		//return if location is not available
		if (this.props.lat === undefined || this.props.lon === undefined) {
			return;
		}
		//sets the data to use gps coordinates if allowed
		this.getData(`http://api.openweathermap.org/data/2.5/forecast?lat=${this.props.lat}&lon=${this.props.lon}&units=metric&APPID=7ff9aafa73fb706223dd209f53908496`);
	};

	//this is where the data is fetched from the url and the states are set
	getData(url) {
		fetch(url)
			.then(resp => resp.json())
			.then(data => {
				if (data.cod === "404") {
					Swal.fire({
						title: 'Please enter a valid location',
						showConfirmButton: false,
						toast: true,
						position: 'top-end',
						timer: 1800
					})
					return;
				}
				this.setState({
					days: data.list,
					location: data.city,
					gpsLocation: data.city.coord
				});
			});
	};

	//this sets up the fetch for the top submit form
	handleSubmit = (e) => {
		e.preventDefault();
		const city = e.target.elements.city.value;
		const country = e.target.elements.country.value;

		this.getData(`http://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&units=metric&APPID=7ff9aafa73fb706223dd209f53908496`);
	};

	//here the fetch is done if an item from the favorites list is clicked
	handleFavorite = (e) => {
		const location = e.target.text.split(",")

		if (location.length !== 2) {
			return;
		}
		;
		this.getData(`http://api.openweathermap.org/data/2.5/forecast?q=${location[0]},${location[1]}&units=metric&APPID=7ff9aafa73fb706223dd209f53908496`);
	};

	//removes the item from favorite section
	handleRemoveFavorite = (location) => {
		localStorage.removeItem(location);
		this.forceUpdate();
	};

	//Sets up the button to add the city and country that id displayed into the favorites
	//uses local storage
	handleClick = (e) => {
		e.preventDefault();
		localStorage.setItem(`${this.state.location.name},${this.state.location.country}`, "")
		this.forceUpdate()
	};

	render() {
		return (
			<div>
				<LocationForm onSubmit={this.handleSubmit} defaultLocation={this.props.location}/>
				<Favorites visible={localStorage.length} onSubmit={this.handleSubmit} onFavorite={this.handleFavorite}
						   onRemoveFavorite={this.handleRemoveFavorite}/>
				<Divider className="Map">
					<Location location={this.state.location} onClick={this.handleClick}/>
					<WeekReport days={this.state.days}/>
				</Divider>
				<Map latitude={this.state.gpsLocation.lat} longitude={this.state.gpsLocation.lon}/>
			</div>
		)
	}
}


