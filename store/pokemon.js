const actions = {
  fetchPokemons(context, param) {
    return this.$axios.$get(`https://pokeapi.co/api/v2/pokemon?limit=${param.limit}&offset=${param.offset}`);
  },
  fetchPokemon(context, param) {
    return this.$axios.$get(`https://pokeapi.co/api/v2/pokemon/${param.name}`);
  },
  fetchPokemonChar(context, param) {
    return this.$axios.$get(`https://pokeapi.co/api/v2/pokemon-species/${param.id}`);
  }
};
export default {
  namespaced: true,
  actions,
};
