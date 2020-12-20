import React from "react";

import { connect } from "react-redux";

import { formatId, formatName } from "./../../formatter";

import "./Pokemon.css";
import notAvailable from "./../../static/ImageNotAvailable.png";

class Pokemon extends React.Component {
    render() {
        const data = this.props.data;

        if (data.status === "loading") {
            return (
                <div className="Pokemon">
                    <h2>Pokemon data are loading ...</h2>
                </div>
            );
        }

        const pokemon = data.focusOn;
        const name = formatName(pokemon);
        let image = notAvailable;
        let imageAlt = "Image not available for " + name;
        if (pokemon.image != null) {
            image = pokemon.image;
            imageAlt = "An image of " + name;
        }

        return (
            <div className="Pokemon">
                <h2 className="Pokemon-name">{name}</h2>
                <p className="Pokemon-id">ID: {formatId(pokemon)}</p>
                <div className="Pokemon-details">
                    <div className="Pokemon-info">
                        <h3>Abilities</h3>
                        <ul className="Pokemon-abilities">
                            {pokemon.abilities.map((item, idx) => {
                                return (
                                    <li
                                        className="Pokemon-ability"
                                        key={"ability-" + idx}
                                    >
                                        {item}
                                    </li>
                                );
                            })}
                        </ul>

                        <h3>Moves</h3>
                        <ul className="Pokemon-moves">
                            {pokemon.moves.map((item, idx) => {
                                return (
                                    <li
                                        className="Pokemon-move"
                                        key={"move-" + idx}
                                    >
                                        {item}
                                    </li>
                                );
                            })}
                        </ul>

                        <h3>Stats</h3>
                        <table className="Pokemon-stats">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Value</th>
                                    <th>Effort</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pokemon.stats.map((item, idx) => {
                                    return (
                                        <tr key={"stat-" + idx}>
                                            <td>{item.name}</td>
                                            <td>{item.base}</td>
                                            <td>{item.effort}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <img
                            alt={imageAlt}
                            className="Pokemon-image"
                            height="96"
                            src={image}
                            width="96"
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { data: state.pokemons };
};

export default connect(mapStateToProps)(Pokemon);
