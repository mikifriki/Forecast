/* eslint-disable */
import React from "react";
import "../CSS/Favorite.css";
import {Button, Header, Image, List} from 'semantic-ui-react';
import arrow from "../Image/arrows.png"

export default class Favorites extends React.Component {

	//Creating a table to be shown in the FavoriteWindow div
	createTable = () => {
		let rows = [];
		for (let i = 0; i < localStorage.length; i++) {
			let favorites = localStorage.key(i);
			rows.push(
				<List.Item key={i}>
					<a id="FavoriteLink" onClick={this.props.onFavorite}>{favorites}</a>
					<Button negative size='mini' onClick={() => this.props.onRemoveFavorite(favorites)}>Delete</Button>
				</List.Item>
			)
		}
		return rows;
	};

	//Setting up the structure for the favorite window
	render() {
		if (!this.props.visible) return <></>;
		return (
			<div id="FavoriteWindow">
				<Header id="FavoriteTitle">
					Favorites
				</Header>
				<hr className="brace"/>
				<List id="FavoriteText">
					{this.createTable()}
				</List>
				<Image className="arrow bounce" src={arrow} size="small" href="#"/>
			</div>
		)
	}
}

