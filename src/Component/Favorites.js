import React from "react";
import "../CSS/Favorite.css";
import {Button, Header, Image, List} from 'semantic-ui-react';
import arrow from "../Image/arrows.png"

const Favorites = ({onFavorite, onRemoveFavorite, visible}) => {
	const createTable = () => {
		let rows = [];
		for (let i = 0; i < localStorage.length; i++) {
			rows.push(
				<List.Item key={i}>
					<a id="FavoriteLink" onClick={onFavorite}>{localStorage.key(i)}</a>
					<Button negative size='mini' onClick={() => onRemoveFavorite(localStorage.key(i))}>Delete</Button>
				</List.Item>
			)
		}
		return rows;
	};

	if (!visible) return <></>;
	return (
		<div className="FavoriteWindow">
			<Header id="FavoriteTitle">
				Favorites
			</Header>
			<hr className="brace"/>
			<List id="FavoriteText">
				{createTable()}
			</List>
			<Image className="arrow bounce" src={arrow} size="small" href="#"/>
		</div>
	)
};

export default Favorites;

