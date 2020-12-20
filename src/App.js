import React from "react";

import { Provider } from "react-redux";
import store from "./redux/store";
import { fetchPokemons, loading } from "./redux/actions";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink
} from "react-router-dom";

import Pokemon from "./pages/Pokemon";
import Pokemons from "./pages/Pokemons";
import PageNotFound from "./pages/PageNotFound";

import logo from "./logo.svg";
import "./App.css";

// init App data
store.dispatch(loading());
store.dispatch(fetchPokemons({ itemsPerPage: 16, page: 1 }));

function App() {
    return (
        <Provider store={store}>
            <Router basename="/pokedex"> {/* to run properly on GitHub pages */}
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h1 className="App-name">Pok&eacute;dex</h1>
                    </header>
                    <hr />
                    <nav className="App-navigation">
                        <ul className="App-navigation-items">
                            <li className="App-navigation-item">
                                <NavLink
                                    activeClassName="App-navigation-link-is-selected"
                                    className="App-navigation-link"
                                    to="/"
                                >
                                    Pokemons
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                    <hr />
                    <main className="App-main">
                        <Switch>
                            <Route exact path="/">
                                <Pokemons />
                            </Route>
                            <Route path="/pokemons/:name/">
                                <Pokemon />
                            </Route>
                            <Route path="*">
                                <PageNotFound />
                            </Route>
                        </Switch>
                    </main>
                    <hr />
                    <footer className="App-footer">
                        &copy; 2020 Elia Contini.
                    </footer>
                </div>
            </Router>
        </Provider>
    );
}

export default App;
