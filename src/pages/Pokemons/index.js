import React from "react";

import { connect } from "react-redux";
import { add } from "./../../redux/actionsMyPokemons";
import { getPokemons, loading } from "./../../redux/actionsPokemons";

// https://stackoverflow.com/questions/44877821/how-to-navigate-on-path-by-button-click-in-react-router-v4
import { withRouter } from "react-router";

import { formatFeedback } from "./../../formatter";

import Card from "./../../components/Card";
import Feedback from "./../../components/Feedback";
import Filter from "./../../components/Filter";
import Pagination from "./../../components/Pagination";

import "./Pokemons.css";

const DEFAULT_ITEMS_PER_PAGE = 16;

class Pokemons extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filter: {
                input: ""
            }
        };

        this.handleAdd = this.handleAdd.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.handleGoTo = this.handleGoTo.bind(this);
        this.handleShowDetails = this.handleShowDetails.bind(this);

        // used to reset scroll
        // https://reactjs.org/docs/refs-and-the-dom.html#creating-refs
        this.componentNode = React.createRef();
    }

    componentDidMount() {
        const params = this.props.match.params;
        const itemsPerPage =
            params.itemsPerPage == null
                ? DEFAULT_ITEMS_PER_PAGE
                : Number(params.itemsPerPage);
        const page = params.page == null ? 1 : Number(params.page);

        this.props.handleGetPokemons({
            filter: this.state.filter,
            itemsPerPage: itemsPerPage,
            page: page
        });
    }

    componentDidUpdate(prevProps) {
        //
        // User story: if the user is on a page different from 1 and clicks the
        // navigation tab "Pokemons", the route change is not enough to trigger
        // the state change (it needs to request 1st page data)
        //
        if (
            this.props.location.pathname === "/" &&
            prevProps.location.pathname !== this.props.location.pathname
        ) {
            this.props.handleGetPokemons({
                filter: this.state.filter,
                itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
                page: 1
            });
        }
    }

    handleAdd(pokemon) {
        this.props.handleMyPokemonsAdd(pokemon);
    }

    handleFilter(event) {
        const target = event.target;
        const input = target.value.trim();

        this.setState({
            filter: {
                input: input
            }
        });

        this.props.handleGetPokemons({
            filter: {
                input: input
            },
            itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
            page: 1
        });
    }

    handleGoTo(page) {
        const itemsPerPage = this.props.data.pokemons.itemsPerPage;

        this.props.history.push(`/pokemons/${page}/${itemsPerPage}/`);

        // reset scroll
        this.componentNode.current.parentNode.scrollTop = 0;

        this.props.handleGetPokemons({
            filter: this.state.filter,
            itemsPerPage: itemsPerPage,
            page: page
        });
    }

    handleShowDetails(pokemon) {
        const pokemonName = pokemon.name;

        this.props.history.push(`/pokemon/${pokemonName}/`);
    }

    render() {
        const data = this.props.data.pokemons;
        const feedbackMessage = formatFeedback(
            this.props.data.feedback.message
        );
        const items = data.items == null ? [] : data.items.data;

        let className = ["Pokemons"];
        if (data.status === "loading") {
            className.push("Pokemons-isLoading");
        }

        if (items.length === 0) {
            className.push("Pokemons-no-data");
        }

        return (
            <div className={className.join(" ")} ref={this.componentNode}>
                <Feedback message={feedbackMessage} />
                <Filter handleSearch={this.handleFilter} />
                <h2 className="Pokemons-loading-wrapper">
                    <span className="Pokemons-loading-message">
                        Pokemons data are loading ...
                    </span>
                </h2>
                <h2 className="Pokemons-no-data-message">No pokemons found.</h2>
                <ul className="Pokemons-list">
                    {items.map((item, idx) => {
                        return (
                            <li className="Pokemons-item" key={idx}>
                                <Card
                                    handleAdd={this.handleAdd}
                                    handleClick={this.handleShowDetails}
                                    item={item}
                                />
                            </li>
                        );
                    })}
                </ul>
                <Pagination data={data} handleGoTo={this.handleGoTo} />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleGetPokemons: (params) => {
            dispatch(loading());
            dispatch(getPokemons(params));
        },
        handleMyPokemonsAdd: (pokemon) => {
            dispatch(add(pokemon));
        }
    };
};

const mapStateToProps = (state) => {
    return { data: state };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Pokemons));
