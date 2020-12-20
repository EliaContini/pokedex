import {
    POKEMONS_LOADING,
    POKEMONS_SHOW,
    POKEMONS_SHOW_ITEM
} from "../actionTypes";

export const initialState = {
    focusOn: null, // contains detailed info about a pokemon
    items: null,
    itemsPerPage: 16,
    page: 1,
    status: "loading" // or loaded
};

const shallowClone = (object) => {
    //
    // Avoid deep clone if it is not necessary
    // https://www.freecodecamp.org/news/handling-state-in-react-four-immutable-approaches-to-consider-d1f5c00249d5/
    //
    return Object.assign({}, object);
};

const pokemons = (state = initialState, action) => {
    switch (action.type) {
        case POKEMONS_LOADING: {
            const newState = shallowClone(state);

            newState.focusOn = null; // cleanup
            newState.status = action.payload.status;

            return newState;
        }
        case POKEMONS_SHOW: {
            const newState = shallowClone(state);

            newState.focusOn = null; // cleanup
            newState.items = action.payload.items;
            newState.itemsPerPage = action.payload.itemsPerPage;
            newState.page = action.payload.page;
            newState.status = action.payload.status;

            return newState;
        }
        case POKEMONS_SHOW_ITEM: {
            const newState = shallowClone(state);

            newState.focusOn = action.payload.focusOn;
            newState.status = action.payload.status;

            return newState;
        }
        default: {
            return state;
        }
    }
};

export default pokemons;
