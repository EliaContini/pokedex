import { combineReducers } from "redux";
import feedback from "./feedback";
import myPokemons from "./myPokemons";
import pokemons from "./pokemons";

export default combineReducers({ feedback, myPokemons, pokemons });
