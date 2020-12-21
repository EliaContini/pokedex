import React from "react";

import { connect } from "react-redux";
import { remove } from "./../../redux/actionsMyPokemons";

// https://stackoverflow.com/questions/44877821/how-to-navigate-on-path-by-button-click-in-react-router-v4
import { withRouter } from "react-router";

import { formatId, formatName } from "./../../formatter";

import "./MyPokemons.css";
import notAvailable from "./../../static/ImageNotAvailable.png";

class MyPokemons extends React.Component {
    constructor(props) {
        super(props);

        this.handleRemove = this.handleRemove.bind(this);
        this.handleShowDetails = this.handleShowDetails.bind(this);
    }

    handleRemove(pokemon) {
        this.props.handleMyPokemonsRemove(pokemon);
    }

    handleShowDetails(pokemon) {
        const pokemonName = pokemon.name;
        this.props.history.push(`/my-pokemons/${pokemonName}/`);
    }

    prepareData() {
        const pokemons = this.props.data.myPokemons;
        let prepared = [];

        pokemons.forEach((item) => {
            const name = formatName(item);

            let image = notAvailable;
            let imageAlt = "Image not available for " + name;
            if (item.sprites.front_default != null) {
                image = item.sprites.front_default;
                imageAlt = "An image of " + name;
            }

            prepared.push({
                id: "#" + formatId(item),
                image: image,
                imageAlt: imageAlt,
                name: name,
                raw: item
            });
        });

        return prepared;
    }

    render() {
        const pokemons = this.prepareData();

        if (pokemons.length === 0) {
            return (
                <div className="MyPokemons">
                    <h2>No Pokemons in your list.</h2>
                </div>
            );
        }

        return (
            <div className="MyPokemons">
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>ID</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {pokemons.map((item, idx) => {
                            return (
                                <tr key={"my-pokemon" + idx}>
                                    <td>
                                        <img
                                            alt={item.imageAlt}
                                            height="48"
                                            src={item.image}
                                            width="48"
                                        />
                                    </td>
                                    <td>{item.name}</td>
                                    <td>{item.id}</td>
                                    <td>
                                        <button
                                            className="MyPokemons-button MyPokemons-remove"
                                            onClick={() => {
                                                this.handleRemove(item.raw);
                                            }}
                                        >
                                            Remove
                                        </button>
                                        <button
                                            className="MyPokemons-button MyPokemons-show"
                                            onClick={() => {
                                                this.handleShowDetails(
                                                    item.raw
                                                );
                                            }}
                                        >
                                            Show
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleMyPokemonsRemove: (pokemon) => {
            dispatch(remove(pokemon));
        }
    };
};

const mapStateToProps = (state) => {
    return { data: state.myPokemons };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(MyPokemons));
