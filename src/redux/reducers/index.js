import { combineReducers } from "redux";
import myPokemons from "./myPokemons";
import pokemons from "./pokemons";

export default combineReducers({ myPokemons, pokemons });
