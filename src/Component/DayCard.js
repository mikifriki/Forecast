import React from "react";
import moment from 'moment';
import "../CSS/DayCard.css";
import {Container, Divider, Header, Image} from 'semantic-ui-react'

const DayCard = ({day}) => {
	let newDate = new Date().setTime(day.dt * 1000);
	return (
		<Container className="DayCard">
			<Divider className="one">
				<Header size='medium'>
					{moment(newDate).format('dddd')}, {moment(newDate).format('MMMM Do, HH:mm')}
				</Header>
				<div className='Humidity' size='small'>
					Humidity: {day.main.humidity} %
				</div>
				<Header className='Temp' size='small'>{Math.round(day.main.temp)}°C</Header>
				<Image className='CardImage' src={`https://openweathermap.org/img/w/${day.weather[0].icon}.png`}/>
				<Divider className='No'>{day.weather[0].description}</Divider>
			</Divider>
		</Container>
	)
};

export default DayCard;
