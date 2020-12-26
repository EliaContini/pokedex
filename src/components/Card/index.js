import React from "react";

import { formatId, formatName } from "./../../formatter";

import "./Card.css";
import notAvailable from "./../../static/ImageNotAvailable.png";

class Card extends React.Component {
    constructor(props) {
        super(props);

        this.handleAdd = this.handleAdd.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleImageNotFound = this.handleImageNotFound.bind(this);
    }

    handleAdd(event) {
        event.stopPropagation();

        const pokemon = this.props.item;
        this.props.handleAdd(pokemon);
    }

    handleClick() {
        const pokemon = this.props.item;
        this.props.handleClick(pokemon);
    }

    handleImageNotFound(item, event) {
        const target = event.target;
        target.setAttribute(
            "alt",
            "Image not available for " + formatName(item)
        );
        target.setAttribute("src", notAvailable);
    }

    render() {
        const item = this.props.item;
        const name = formatName(item);
        const image = item.image;
        const imageAlt = "An image of " + name;

        return (
            <div
                className="Card"
                onClick={this.handleClick}
                title={"Show details about " + name}
            >
                <h2 className="Card-name">{name}</h2>

                <img
                    alt={imageAlt}
                    className="Card-image"
                    height="96"
                    onError={(event) => {
                        this.handleImageNotFound(item, event);
                    }}
                    src={image}
                    width="96"
                />

                <div className="Card-footer">
                    <p className="Card-id">#{formatId(item)} </p>
                    <button
                        className="Card-add"
                        onClick={this.handleAdd}
                        title={"Add " + name + " to My Pokemons"}
                    >
                        Add
                    </button>
                </div>
            </div>
        );
    }
}

export default Card;
