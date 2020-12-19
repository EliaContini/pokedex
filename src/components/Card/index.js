import React from "react";

import { formatId, formatName } from "./../../formatter";

import "./Card.css";
import notAvailable from "./notAvailable.png";

class Card extends React.Component {
    render() {
        const item = this.props.item;
        const name = formatName(item);
        const image =
            item.sprites.front_default == null
                ? notAvailable
                : item.sprites.front_default;

        return (
            <div className="Card">
                <h3 className="Card-name">{name}</h3>

                <img
                    alt={"An image of " + name}
                    className="Card-image"
                    height="96"
                    src={image}
                    width="96"
                />

                <p className="Card-id">#{formatId(item)}</p>
            </div>
        );
    }
}

export default Card;
