import React from "react";

import { connect } from "react-redux";

import Card from "./../../components/Card";
import Pagination from "./../../components/Pagination";

import "./Pokemons.css";

class Pokemons extends React.Component {
    render() {
        const data = this.props.data;
        const items = data.items == null ? [] : data.items.data;

        let className = ["Pokemons"];
        if (data.status === "loading") {
            className.push("Pokemons-isLoading");
        }

        return (
            <div className={className.join(" ")}>
                <h2 className="Pokemons-loading-wrapper">
                    <span className="Pokemons-loading-message">
                        Pokemons data are loading ...
                    </span>
                </h2>
                <ul className="Pokemons-list">
                    {items.map((item, idx) => {
                        return (
                            <li className="Pokemons-item" key={idx}>
                                <Card item={item} />
                            </li>
                        );
                    })}
                </ul>
                <Pagination data={data} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { data: state.pokemons };
};

export default connect(mapStateToProps)(Pokemons);
