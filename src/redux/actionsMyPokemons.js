import { MY_POKEMONS_ADD, MY_POKEMONS_REMOVE } from "./actionTypes";

import { success } from "./actionsFeedback";

export const add = (pokemon) => {
    return (dispatch) => {
        dispatch({
            type: MY_POKEMONS_ADD,
            payload: {
                pokemon
            }
        });

        dispatch(success("add", pokemon));
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

        dispatch(success("remove", pokemon));
    };
};
