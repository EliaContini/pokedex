/**
 * Pokemon API <https://pokeapi.co/>
 *
 * Author: Elia Contini <https://elia.contini.page/>
 *
 * Dev notes about fetch()
 * https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch
 */
const API_BASE_URL = "https://pokeapi.co/";
const API_END_POINTS = {
    get: API_BASE_URL + "api/v2/pokemon/",
    media:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" // front_default
};
const API_FETCH_INITS = {
    GET: {
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: null
    },
    POST: null
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
        let cache = this.cache;
        if (cache == null) {
            cache = await this.init();
        }

        let end = 16;
        let start = 0;
        if (params != null) {
            end = params.itemsPerPage * params.page;
            start = (params.page - 1) * params.itemsPerPage;
        }

        let result = {
            data: cache.data.slice(start, end),
            dataCount: cache.dataCount
        };

        return result;
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
                fetch(item.move.url, init)
                    .then((move) => {
                        return move.json();
                    })
                    .catch((error) => {
                        console.error(
                            "There has been a problem with your fetch operation:",
                            error
                        );

                        const unavailable = {
                            names: [
                                {
                                    language: {
                                        name: LANGUAGE
                                    },
                                    name:
                                        item.move.name +
                                        " (unavailable details)"
                                }
                            ]
                        };

                        return unavailable;
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
                    name: item.names.filter(this._getLang)[0].name
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

    /**
     * Manages bootstrapping
     *
     * In order to avoid to requests all details about every single Pokemon just
     * to have ID info, a regex is used to extract ID from resource url property
     *
     * 1 - it requests only 1 item in order to receive the count
     * 2 - it requests all Pokemons
     * 3 - it creates the cache
     */
    async init() {
        let init = Object.assign({}, API_FETCH_INITS.GET);
        let uri = API_END_POINTS.get + "?limit=1&offset=0";

        const limitInfo = await fetch(uri, init);
        const limitInfoData = await limitInfo.json();

        const limit = limitInfoData.count;
        uri = API_END_POINTS.get + `?limit=${limit}&offset=0`;

        const allPokemons = await fetch(uri, init);
        const allPokemonsData = await allPokemons.json();
        const pokemonsList = allPokemonsData.results;

        this.cache = {
            data: [],
            dataCount: limit,
            dataIndexes: {
                byId: {},
                byName: {}
            },
            // populated calling getById or getByName
            details: [],
            detailsCount: 0,
            detailsIndexes: {
                byId: {},
                byName: {}
            }
        };

        pokemonsList.forEach((item, index) => {
            const pattern = new RegExp(API_END_POINTS.get + "(\\d+)/", "gi");

            const pokemonId = Number(pattern.exec(item.url)[1]);
            const pokemonImage = API_END_POINTS.media + `${pokemonId}.png`;

            this.cache.data.push({
                id: pokemonId,
                image: pokemonImage,
                name: item.name
            });

            this.cache.dataIndexes.byId[pokemonId] = index;
            this.cache.dataIndexes.byName[item.name] = index;
        });

        return this.cache;
    }
    // --------------------------------------------------------- private methods
    //
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields
    //
    // Should be async #getBy(pokemonIdOrName) { ... }
    // Still not supported on Firefox (under experimental features)
    //
    async _getBy(pokemonIdOrName) {
        let cache = this.cache;
        if (cache == null) {
            cache = await this.init();
        }

        if (/^[0-9]+$/gi.test(pokemonIdOrName)) {
            if (pokemonIdOrName in cache.detailsIndexes.byId) {
                return cache.details[
                    cache.detailsIndexes.byId[pokemonIdOrName]
                ];
            }
        } else {
            if (pokemonIdOrName in cache.detailsIndexes.byName) {
                return cache.details[
                    cache.detailsIndexes.byName[pokemonIdOrName]
                ];
            }
        }

        let init = Object.assign({}, API_FETCH_INITS.GET);
        const uri = API_END_POINTS.get + `${pokemonIdOrName}/`;

        const pokemonRequest = await fetch(uri, init);
        const pokemon = await pokemonRequest.json();

        let requestDetails = [
            this.getAbilities(pokemon),
            this.getMoves(pokemon),
            this.getStats(pokemon)
        ];
        const pokemonDetails = await Promise.all(requestDetails);

        const result = {
            abilities: pokemonDetails[0],
            id: pokemon.id,
            image: pokemon.sprites.front_default,
            moves: pokemonDetails[1],
            name: pokemon.name,
            stats: pokemonDetails[2]
        };

        // caching result
        this.cache.details.push(result);
        const index = this.cache.details.length - 1;
        this.cache.detailsIndexes.byId[pokemon.id] = index;
        this.cache.detailsIndexes.byName[pokemon.name] = index;

        return result;
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
