import {
    MY_POKEMONS_ADD,
    MY_POKEMONS_REMOVE,
    MY_POKEMONS_SHOW,
    MY_POKEMONS_SHOW_ITEM
} from "../actionTypes";

const initialState = {
    myPokemons: [],
    myPokemonsIndex: {}
};

const shallowClone = (object) => {
    //
    // Avoid deep clone if it is not necessary
    // https://www.freecodecamp.org/news/handling-state-in-react-four-immutable-approaches-to-consider-d1f5c00249d5/
    //
    return Object.assign({}, object);
};

const myPokemons = (state = initialState, action) => {
    switch (action.type) {
        case MY_POKEMONS_ADD: {
            const pokemon = action.payload.pokemon;
            const pokemonId = pokemon.id;

            // avoid duplicates entries
            if (state.myPokemonsIndex[pokemonId] == null) {
                const newState = {
                    myPokemons: [...state.myPokemons, pokemon],
                    myPokemonsIndex: shallowClone(state.myPokemonsIndex)
                };
                newState.myPokemonsIndex[pokemonId] =
                    newState.myPokemons.length - 1;

                return newState;
            }

            return state;
        }
        case MY_POKEMONS_REMOVE: {
            const pokemon = action.payload.pokemon;
            const pokemonId = pokemon.id;
            const index = state.myPokemonsIndex[pokemonId];

            let myPokemons = [...state.myPokemons];
            myPokemons.splice(index, 1);

            const newState = {
                myPokemons: myPokemons,
                myPokemonsIndex: shallowClone(state.myPokemonsIndex)
            };
            // set to null instead of delete key
            newState.myPokemonsIndex[pokemonId] = null;

            // rebuild index: after a remove indeces are changed
            let item = null;
            for (
                let i = 0, length = newState.myPokemons.length;
                i < length;
                i++
            ) {
                item = newState.myPokemons[i];
                newState.myPokemonsIndex[item.id] = i;
            }

            return newState;
        }
        case MY_POKEMONS_SHOW_ITEM: {
            const newState = shallowClone(state);

            return newState;
        }
        case MY_POKEMONS_SHOW:
        default: {
            return state;
        }
    }
};

export default myPokemons;
