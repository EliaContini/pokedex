import React from "react";

import { connect } from "react-redux";
import { fetchPokemon, loading } from "./../../redux/actions";

// https://stackoverflow.com/questions/44877821/how-to-navigate-on-path-by-button-click-in-react-router-v4
import { withRouter } from "react-router";

import { formatId, formatName } from "./../../formatter";

import "./Card.css";
import notAvailable from "./../../static/ImageNotAvailable.png";

class Card extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        const pokemon = this.props.item;
        const pokemonName = pokemon.name;

        this.props.handleShowDetails(pokemon);

        this.props.history.push(`/pokemons/${pokemonName}/`);
    }

    render() {
        const item = this.props.item;
        const name = formatName(item);

        let image = notAvailable;
        let imageAlt = "Image not available for " + name;
        if (item.sprites.front_default != null) {
            image = item.sprites.front_default;
            imageAlt = "An image of " + name;
        }

        return (
            <div
                className="Card"
                onClick={this.handleClick}
                title={"Show details about " + name}
            >
                <h3 className="Card-name">{name}</h3>

                <img
                    alt={imageAlt}
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

const mapDispatchToProps = (dispatch) => {
    return {
        handleShowDetails: (pokemon) => {
            dispatch(loading());
            dispatch(fetchPokemon(pokemon));
        }
    };
};

export default connect(null, mapDispatchToProps)(withRouter(Card));

//export default withRouter(Card);
