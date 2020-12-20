import {
    MY_POKEMONS_ADD,
    MY_POKEMONS_REMOVE
} from "./actionTypes";

export const add = (pokemon) => {
    return (dispatch) => {
        dispatch({
            type: MY_POKEMONS_ADD,
            payload: {
                pokemon
            }
        });
    };
};

export const remove = (pokemon) => {
    return (dispatch) => {
        dispatch({
            type: MY_POKEMONS_REMOVE,
            payload: {
                pokemon
            }
        });
    };
};
