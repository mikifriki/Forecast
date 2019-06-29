import React from "react";
import moment from 'moment';
import "../CSS/DayContainer.css";
import {Container, Divider, Header, Image} from 'semantic-ui-react'

class DayCard extends React.Component {
	render() {
		//Setting up a new date display using moment.
		let newDate = new Date();
		const weekDay = this.props.day.dt * 1000
		newDate.setTime(weekDay);

		//this sets up each daycard
		return (
			<Container className="DayCard">
				<Divider className="one">
					<Header
						size='medium'>{moment(newDate).format('dddd')}, {moment(newDate).format('MMMM Do, HH:mm')}</Header>
					<div className='Humidity' size='small'>Humidity: {this.props.day.main.humidity} %</div>
					<Header className='Temp' size='small'>{Math.round(this.props.day.main.temp)}°C</Header>
					<Image className='CardImage' src={`http://openweathermap.org/img/w/${this.props.day.weather[0].icon}.png`}/>
					<Divider className='No'>{this.props.day.weather[0].description}</Divider>
				</Divider>
			</Container>
		)
	}
}

export default DayCard;