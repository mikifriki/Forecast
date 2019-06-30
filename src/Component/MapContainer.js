import React from 'react';
import {compose, withProps} from 'recompose';
import "../CSS/MapContainer.css";
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from 'react-google-maps';

const API_KEY = `${process.env.REACT_APP_API_KEY}`;

//this sets up the use for the map section
const MapWithAMarker = compose(
	withProps({
		googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`,
		loadingElement: <div/>,
		containerElement: <div className="ContainerElement"/>,
		mapElement: <div className="MapElement"/>,
	}),
	withScriptjs,
	withGoogleMap
)((props) =>
	<GoogleMap
		defaultZoom={8}
		center={{lat: props.latitude, lng: props.longitude}}>
		<Marker position={{lat: props.latitude, lng: props.longitude}}/>
	</GoogleMap>
);

const Map = (props) => {
	if (props.latitude === undefined || props.longitude === undefined) return <></>;
	return <MapWithAMarker latitude={props.latitude} longitude={props.longitude}/>;
};

export default Map
