import React from "react";

import { connect } from "react-redux";
import { remove } from "./../../redux/actionsMyPokemons";

// https://stackoverflow.com/questions/44877821/how-to-navigate-on-path-by-button-click-in-react-router-v4
import { withRouter } from "react-router";

import { formatFeedback, formatId, formatName } from "./../../formatter";

import Feedback from "./../../components/Feedback";
import "./MyPokemons.css";
import notAvailable from "./../../static/ImageNotAvailable.png";

class MyPokemons extends React.Component {
    constructor(props) {
        super(props);

        this.handleRemove = this.handleRemove.bind(this);
        this.handleShowDetails = this.handleShowDetails.bind(this);
        this.handleImageNotFound = this.handleImageNotFound.bind(this);
    }

    handleImageNotFound(item, event) {
        const target = event.target;
        target.setAttribute(
            "alt",
            "Image not available for " + formatName(item)
        );
        target.setAttribute("src", notAvailable);
    }

    handleRemove(pokemon) {
        this.props.handleMyPokemonsRemove(pokemon);
    }

    handleShowDetails(pokemon) {
        const pokemonName = pokemon.name;
        this.props.history.push(`/my-pokemons/${pokemonName}/`);
    }

    render() {
        const feedbackMessage = formatFeedback(
            this.props.data.feedback.message
        );
        const pokemons = this.props.data.myPokemons.myPokemons;

        if (pokemons.length === 0) {
            return (
                <div className="MyPokemons">
                    <Feedback message={feedbackMessage} />
                    <h2>No Pokemons in your list.</h2>
                </div>
            );
        }

        return (
            <div className="MyPokemons">
                <Feedback message={feedbackMessage} />
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
                            const id = formatId(item);
                            const name = formatName(item);
                            const image = item.image;
                            const imageAlt = "An image of " + name;

                            return (
                                <tr key={"my-pokemon" + idx}>
                                    <td>
                                        <img
                                            alt={imageAlt}
                                            height="48"
                                            onError={(event) => {
                                                this.handleImageNotFound(
                                                    item,
                                                    event
                                                );
                                            }}
                                            src={image}
                                            width="48"
                                        />
                                    </td>
                                    <td>{name}</td>
                                    <td>{id}</td>
                                    <td>
                                        <button
                                            className="MyPokemons-button MyPokemons-remove"
                                            onClick={() => {
                                                this.handleRemove(item);
                                            }}
                                        >
                                            Remove
                                        </button>
                                        <button
                                            className="MyPokemons-button MyPokemons-show"
                                            onClick={() => {
                                                this.handleShowDetails(item);
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
    return { data: state };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(MyPokemons));
