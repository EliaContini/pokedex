import React from "react";

import { Provider } from "react-redux";
import store from "./redux/store";

import {
    // BrowserRouter as Router,
    //
    // It does not work on GitHub pages. To use it, it needs to be able to
    // configure web server
    //
    // For NGINX
    // server {
    //     # ...
    //
    //     location / {
    //         try_files $uri $uri/ =404;
    //     }
    //
    //     # ...
    // }
    //
    HashRouter as Router,
    NavLink,
    Route,
    Switch
} from "react-router-dom";

import MyPokemons from "./pages/MyPokemons";
import Pokemon from "./pages/Pokemon";
import Pokemons from "./pages/Pokemons";
import PageNotFound from "./pages/PageNotFound";

import logo from "./logo.svg";
import "./App.css";

function App() {
    return (
        <Provider store={store}>
            <Router>
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
                                    isActive={(match, location) => {
                                        const pathname = location.pathname;

                                        if (
                                            pathname === "/" ||
                                            /^\/\d+\/\d+\//gi.test(pathname) ||
                                            /^\/[a-z]+\//gi.test(pathname)
                                        ) {
                                            return true;
                                        }

                                        return false;
                                    }}
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
                            <Route component={Pokemons} exact path="/" strict />
                            <Route
                                component={Pokemons}
                                exact
                                path="/pokemons/:page/:itemsPerPage/"
                                strict
                            />
                            <Route
                                component={Pokemon}
                                exact
                                path="/pokemon/:name/"
                                strict
                            />
                            <Route exact path="/my-pokemons/" strict>
                                <MyPokemons />
                            </Route>
                            <Route
                                component={Pokemon}
                                exact
                                path="/my-pokemons/:name/"
                                strict
                            />
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
