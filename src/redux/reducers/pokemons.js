import {
    POKEMONS_LOADING,
    POKEMONS_SHOW,
    POKEMONS_SHOW_ITEM
} from "../actionTypes";

const initialState = {
    items: null,
    itemsPerPage: 16,
    page: 1
};

const pokemons = (state = initialState, action) => {
    switch (action.type) {
        case POKEMONS_LOADING: {
            const newState = Object.assign({}, state);
            newState.status = action.payload.status;

            return newState;
        }
        case POKEMONS_SHOW: {
            const newState = Object.assign({}, state);
            newState.items = action.payload.items;
            newState.itemsPerPage = action.payload.itemsPerPage;
            newState.page = action.payload.page;
            newState.status = action.payload.status;

            return newState;
        }
        case POKEMONS_SHOW_ITEM: {
            return { items: action.payload };
        }
        default: {
            return state;
        }
    }
};

export default pokemons;
