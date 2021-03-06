import {
    POKEMONS_GET,
    POKEMONS_GET_DETAILS,
    POKEMONS_LOADING
} from "./actionTypes";

import PokemonApi from "./../api/Pokemon";

const pokemonApi = new PokemonApi();

export const fetchPokemon = (pokemonName) => {
    return (dispatch) => {
        const request = pokemonApi.getByName(pokemonName).then((data) => {
            dispatch({
                type: POKEMONS_GET_DETAILS,
                payload: {
                    focusOn: data,
                    status: "loaded"
                }
            });
        });

        return request;
    };
};

export const getPokemons = (params) => {
    return (dispatch) => {
        const request = pokemonApi.get(params).then((data) => {
            dispatch({
                type: POKEMONS_GET,
                payload: {
                    items: data,
                    itemsPerPage: params.itemsPerPage,
                    page: params.page,
                    status: "loaded"
                }
            });
        });

        return request;
    };
};

export const loading = () => {
    return (dispatch) => {
        dispatch({
            type: POKEMONS_LOADING,
            payload: {
                status: "loading"
            }
        });
    };
};
