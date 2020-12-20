# Pokédex

Pokédex build on the top of [PokéAPI](https://pokeapi.co/).

This project was bootstrapped with [Create React App](https://create-react-app.dev/).

## 📢️ Demo site 🐨️

A Demo site is available at https://eliacontini.github.io/pokedex/.

## Set up development environment

    $ npm install

## Run dev environment

    $ npm start

The dev server will serve on http://localhost:3000/pokedex/.

## Build

    $ npm build

## Development notes

This project uses React, React Redux (with Redux Thunk) and React Router.

Some API tests are available in `tests/api` folder. To run them, first be sure
that in the folder there is a symbolic link to `src/api` folder.
If you need to create, open the terminal and run

    $ ln -s ./../../src/api api

The run the script

    $ ./dev_server.run

The test server will serve on http://localhost:8080/.

# Credits

App icons by https://www.iconfinder.com/iconsets/pokemon-go-vol-2/.
