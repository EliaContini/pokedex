import { applyMiddleware, createStore } from "redux";
import rootReducer from "./reducers";

import { initialState as myPokemonsInitialState } from "./reducers/myPokemons";
import { initialState as pokemonsInitialState } from "./reducers/pokemons";

import thunk from "redux-thunk";

//
// save / retrieve My Pokemons from browser local storage
//
// adapted from https://github.com/techiediaries/react-jsjargon/blob/master/src/index.js
//
const saveState = (state) => {
    if (state.myPokemons.myPokemons.length > 0) {
        localStorage.setItem("state", JSON.stringify(state.myPokemons));
    }
};

const getState = () => {
    try {
        const state = localStorage.getItem("state");

        if (state == null) {
            return undefined;
        }

        return JSON.parse(state);
    } catch (e) {
        return undefined;
    }
};

const savedState = getState();

const initialState = {
    myPokemons: savedState == null ? myPokemonsInitialState : savedState,
    pokemons: pokemonsInitialState
};

const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

store.subscribe(() => {
    saveState({
        myPokemons: store.getState().myPokemons
    });
});

export default store;
