import React from "react";
import 'semantic-ui-css/semantic.min.css';
import '../CSS/Location.css';
import {Button, Container, Header, Icon} from 'semantic-ui-react'

const Location = props => {

	if (props.location === undefined) {
		return <></>
	}

	//this sets up the top menu
	return (
		<Container className='TopM'>
			<Header className='CityCountry' size='huge'>
				{props.location.name},
				{props.location.country}
				<Button positive size='mini' animated onClick={props.onClick}>
					<Button.Content visible>
						Save to favorites
					</Button.Content>
					<Button.Content hidden>
						<Icon name='save'/>
					</Button.Content>
				</Button>
			</Header>
		</Container>
	);
};

export default Location
