import React, {useCallback, useEffect, useState} from "react";
import Swal from 'sweetalert2'
import LocationForm from "./Form";
import WeekReport from "./Week";
import Favorites from "./Favorites";
import Location from "./Location";
import Map from "./MapContainer";
import "../CSS/Weather.css";
import {Divider} from 'semantic-ui-react';


const Weather = (props) => {
	const [data, setData] = useState({days: [], location: [], gpsLocation: {}});
	const [, updateState] = React.useState();
	const forceUpdate = useCallback(() => updateState({}), []);
	useEffect(() => {
		//return if location is not available
		if (props.lat === undefined || props.lon === undefined) {
			return;
		}
		//sets the data to use gps coordinates if allowed
		getData(`https://api.openweathermap.org/data/2.5/forecast?lat=${props.lat}&lon=${props.lon}&units=metric&APPID=7ff9aafa73fb706223dd209f53908496`);
		//sets the data to use gps coordinates if allowed
	}, [props]);

	const getData = (url) => {
		fetch(url)
			.then(res => res.json())
			.then(data => {
				if (data.cod === "404") {
					Swal.fire({
						title: 'Please enter a valid location',
						showConfirmButton: false,
						toast: true,
						position: 'top',
						timer: 1800
					});
					return;
				}
				const newData = {
					days: data.list,
					location: data.city,
					gpsLocation: data.city.coord
				};
				setData(newData);
			}).catch(console.log);
	};

	//this sets up the fetch for the top submit form
	const handleSubmit = (e) => {
		e.preventDefault();
		getData(`https://api.openweathermap.org/data/2.5/forecast?q=${e.target.elements.city.value},${e.target.elements.country.value}&units=metric&APPID=7ff9aafa73fb706223dd209f53908496`);
	};

	//here the fetch is done if an item from the favorites list is clicked
	const handleFavorite = (e) => {
		const location = e.target.text.split(",");
		if (location.length !== 2) return;
		getData(`https://api.openweathermap.org/data/2.5/forecast?q=${location[0]},${location[1]}&units=metric&APPID=7ff9aafa73fb706223dd209f53908496`);
	};

	//removes the item from favorite section
	const handleRemoveFavorite = (location) => {
		localStorage.removeItem(location);
		forceUpdate()
	};

	//Sets up the button to add the city and country that id displayed into the favorites
	const handleClick = (e) => {
		e.preventDefault();
		localStorage.setItem(`${data.location.name}, ${data.location.country}`, "");
		forceUpdate()
	};


	return (
		<div>
			<LocationForm onSubmit={handleSubmit} defaultLocation={data.location}/>
			<Favorites visible={localStorage.length} onSubmit={handleSubmit} onFavorite={handleFavorite}
					   onRemoveFavorite={handleRemoveFavorite}/>
			<Divider className="Map">
				<Location location={data.location} onClick={handleClick}/>
				<WeekReport days={data.days}/>
			</Divider>
			<Map latitude={data.gpsLocation.lat} longitude={data.gpsLocation.lon}/>
		</div>
	)

};

export default Weather
