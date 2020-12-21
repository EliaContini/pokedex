import {
    POKEMONS_LOADING,
    POKEMONS_SHOW,
    POKEMONS_SHOW_ITEM
} from "./actionTypes";

import PokemonApi from "./../api/Pokemon";

const pokemonApi = new PokemonApi();

export const fetchPokemon = (pokemonName) => {
    return (dispatch) => {
        const request = pokemonApi.getByName(pokemonName).then((data) => {
            dispatch({
                type: POKEMONS_SHOW_ITEM,
                payload: {
                    focusOn: data,
                    status: "loaded"
                }
            });
        });

        return request;
    };
};

export const fetchPokemons = (params) => {
    return (dispatch) => {
        const request = pokemonApi.get(params).then((data) => {
            dispatch({
                type: POKEMONS_SHOW,
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
