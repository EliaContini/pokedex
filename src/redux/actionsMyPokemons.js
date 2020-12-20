import {
    MY_POKEMONS_ADD,
    MY_POKEMONS_REMOVE,
    MY_POKEMONS_SHOW,
    MY_POKEMONS_SHOW_ITEM
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
