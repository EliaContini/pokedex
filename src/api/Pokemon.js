/**
 * Pokemon API <https://pokeapi.co/>
 *
 * Author: Elia Contini <https://elia.contini.page/>
 *
 * Dev notes about fetch()
 * https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch
 */
const API_BASE_URL = "https://pokeapi.co/api/v2/";
const API_END_POINTS = {
    get: API_BASE_URL + "pokemon/",
};
const API_FETCH_INITS = {
    GET: {
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: null,
    },
    POST: null,
    // ... other HTTP verbs
};
const LANGUAGE = "en";

class Pokemon {
    /**
     * Get information about all Pokemons
     *
     * @param {object} params
     * @param {number} params.itemsPerPage
     * @param {number} params.page
     *
     * @returns {Promise} - a promise fulfilled with requested data
     */
    async get(params) {
        let init = Object.assign({}, API_FETCH_INITS.GET);
        let uri = API_END_POINTS.get;

        if (params != null) {
            const limit = params.itemsPerPage;
            const offset = (params.page - 1) * params.itemsPerPage;

            uri = uri + `?limit=${limit}&offset=${offset}`;
        }

        const response = await fetch(uri, init);

        return response.json().then((response) => {
            const list = response.results;

            let requestDetails = [];

            list.forEach((item) => {
                requestDetails.push(
                    fetch(item.url, init).then((itemDetails) => {
                        return itemDetails.json();
                    })
                );
            });

            return Promise.all(requestDetails).then((items) => {
                let result = {
                    data: [],
                    dataCount: response.count,
                };

                items.forEach((item) => {
                    result.data.push(item);
                });

                return result;
            });
        });
    }

    /**
     * Get pokemon abilities
     *
     * @param {object} pokemon
     *
     * @returns {Promise} - a promise fulfilled with requested data
     */
    async getAbilities(pokemon) {
        let init = Object.assign({}, API_FETCH_INITS.GET);

        let requestDetails = [];
        pokemon.abilities.forEach((item) => {
            requestDetails.push(
                fetch(item.ability.url, init).then((ability) => {
                    return ability.json();
                })
            );
        });

        return Promise.all(requestDetails).then((items) => {
            let result = [];

            items.forEach((item) => {
                result.push(item.names.filter(this._getLang)[0].name);
            });

            return result.sort();
        });
    }

    /**
     * Get details about a Pokemon retrieving data by ID
     *
     * @param {number} pokemonId
     *
     * @returns {Promise} - a promise fulfilled with requested data
     */
    async getById(pokemonId) {
        return this._getBy(pokemonId);
    }

    /**
     * Get details about a Pokemon retrieving data by name
     *
     * @param {string} pokemonName
     *
     * @returns {Promise} - a promise fulfilled with requested data
     */
    async getByName(pokemonName) {
        return this._getBy(pokemonName);
    }

    /**
     * Get pokemon moves
     *
     * @param {object} pokemon
     *
     * @returns {Promise} - a promise fulfilled with requested data
     */
    async getMoves(pokemon) {
        let init = Object.assign({}, API_FETCH_INITS.GET);

        let requestDetails = [];
        pokemon.moves.forEach((item) => {
            requestDetails.push(
                fetch(item.move.url, init).then((move) => {
                    return move.json();
                })
            );
        });

        return Promise.all(requestDetails).then((items) => {
            let result = [];

            items.forEach((item) => {
                result.push(item.names.filter(this._getLang)[0].name);
            });

            return result.sort();
        });
    }

    /**
     * Get pokemon stats
     *
     * @param {object} pokemon
     *
     * @returns {Promise} - a promise fulfilled with requested data
     */
    async getStats(pokemon) {
        let init = Object.assign({}, API_FETCH_INITS.GET);

        let requestDetails = [];
        pokemon.stats.forEach((item) => {
            requestDetails.push(
                fetch(item.stat.url, init).then((stat) => {
                    return stat.json();
                })
            );
        });

        return Promise.all(requestDetails).then((items) => {
            let result = [];

            items.forEach((item, index) => {
                result.push({
                    base: pokemon.stats[index].base_stat,
                    effort: pokemon.stats[index].effort,
                    name: item.names.filter(this._getLang)[0].name,
                });
            });

            return result.sort((a, b) => {
                if (a.name > b.name) {
                    return 1;
                }

                if (a.name < b.name) {
                    return -1;
                }

                return 0;
            });
        });
    }

    //
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields
    //
    // Should be async #getBy(pokemonIdOrName) { ... }
    // Still not supported on Firefox (under experimental features)
    //
    async _getBy(pokemonIdOrName) {
        let init = Object.assign({}, API_FETCH_INITS.GET);
        const uri = API_END_POINTS.get + `${pokemonIdOrName}/`;

        const response = await fetch(uri, init);

        return response.json().then((pokemon) => {
            let requestDetails = [
                this.getAbilities(pokemon),
                this.getMoves(pokemon),
                this.getStats(pokemon),
            ];

            return Promise.all(requestDetails).then((data) => {
                let result = {
                    abilities: data[0],
                    id: pokemon.id,
                    image: pokemon.sprites.front_default,
                    moves: data[1],
                    name: pokemon.name,
                    stats: data[2],
                };

                return result;
            });
        });
    }

    // Should be #getLang(pokemonIdOrName) { ... }
    _getLang(item) {
        if (item.language.name === LANGUAGE) {
            return true;
        }

        return false;
    }
}

export default Pokemon;
