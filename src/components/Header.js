import React, { Component } from "react";
import "./Header.css";

export default class Header extends Component {
	render() {
		return (
			<header id="header">
				<a className="header-text" href="https://nunamnir.github.io/Tetris-mind-game/">Tetris-mind-game</a>
				<a className="header-text" href="https://nunamnir.github.io/RoadRush-racing-game/">RoadRush-racing-game</a>
				<a className="header-text" href="https://nunamnir.github.io/Tanks-the-game/">Tanks-the-game</a>
				<a className="header-text" href="https://nunamnir.github.io/Reflex-the-game/">Reflex-the-game</a>	
			</header>
		);
	}
} 