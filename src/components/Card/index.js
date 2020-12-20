import React from "react";

import { connect } from "react-redux";
import { add } from "./../../redux/actionsMyPokemons";
import { fetchPokemon, loading } from "./../../redux/actionsPokemons";

// https://stackoverflow.com/questions/44877821/how-to-navigate-on-path-by-button-click-in-react-router-v4
import { withRouter } from "react-router";

import { formatId, formatName } from "./../../formatter";

import "./Card.css";
import notAvailable from "./../../static/ImageNotAvailable.png";

class Card extends React.Component {
    constructor(props) {
        super(props);

        this.handleAdd = this.handleAdd.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleAdd(event) {
        event.stopPropagation();

        const pokemon = this.props.item;
        this.props.handleMyPokemonsAdd(pokemon);
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
                <h2 className="Card-name">{name}</h2>

                <img
                    alt={imageAlt}
                    className="Card-image"
                    height="96"
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

const mapDispatchToProps = (dispatch) => {
    return {
        handleMyPokemonsAdd: (pokemon) => {
            dispatch(add(pokemon));
        },
        handleShowDetails: (pokemon) => {
            dispatch(loading());
            dispatch(fetchPokemon(pokemon));
        }
    };
};

export default connect(null, mapDispatchToProps)(withRouter(Card));

//export default withRouter(Card);
