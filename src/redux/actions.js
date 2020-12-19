import { POKEMONS_LOADING, POKEMONS_SHOW } from "./actionTypes";

import Pokemon from "./../api/Pokemon";

const pokemon = new Pokemon();

export const fetchPokemons = (params) => {
    return (dispatch) => {
        const request = pokemon.get(params).then((data) => {
            dispatch({
                type: POKEMONS_SHOW,
                payload: {
                    items: data,
                    itemsPerPage: params.itemsPerPage,
                    page: params.page,
                    status: "load"
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
