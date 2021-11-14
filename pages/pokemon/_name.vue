<template lang="pug">
  
</template>

<script>
export default {
  name: 'PokemonDetailPage',
  data () {
    return {
      loading: false,
      pokemon: {},
    }
  },
  mounted() {
    this.fetchPokemon();
  },
  methods: {
    fetchPokemon() {
      this.$store.dispatch('pokemon/fetchPokemon', { name: this.$route.params.name })
        .then(pokemon => {
          this.pokemon = pokemon;
        });
    }
  }
}
</script>