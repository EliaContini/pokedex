import React from "react";

import { Provider } from "react-redux";
import store from "./redux/store";
import { fetchPokemons, loading } from "./redux/actionsPokemons";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink
} from "react-router-dom";

import MyPokemons from "./pages/MyPokemons";
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
            {/* set basename to run properly on GitHub pages */}
            <Router basename="/pokedex">
                <div className="App">
                    <header className="App-header">
                        <img
                            alt="Logo"
                            className="App-logo"
                            height="48"
                            src={logo}
                            width="48"
                        />
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
                            <li className="App-navigation-item">
                                <NavLink
                                    activeClassName="App-navigation-link-is-selected"
                                    className="App-navigation-link"
                                    to="/my-pokemons/"
                                >
                                    My Pokemons
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                    <hr />
                    <main className="App-main">
                        <Switch>
                            <Route exact path={["/", "/pokemons/"]}>
                                <Pokemons />
                            </Route>
                            <Route exact path="/pokemons/:name/">
                                <Pokemon />
                            </Route>
                            <Route exact path="/my-pokemons/">
                                <MyPokemons />
                            </Route>
                            <Route exact path="/my-pokemons/:name/">
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
