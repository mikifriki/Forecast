import React from 'react';
import '../CSS/Form.css';
import {Button, Form, Icon, Input, Menu} from 'semantic-ui-react';

//Setting up the top form that is used for asking the locations
const LocationForm = props => (
	<Menu className='customMenu'>
		<Form onSubmit={props.onSubmit}>
			<Input size="small" type="text" name="city" placeholder="City..."/>
			<Input size="small" type="text" name="country" placeholder="Country..."/>
			<Button icon size="small" labelPosition='right'><Icon name='search'/>Get Weather</Button>
		</Form>
	</Menu>
);

export default LocationForm;
