<template lang="pug">
  div
    v-row(justify="center" align="center")
      h2 Pokédex ({{totalPokemon}})
    v-row(justify="center" align="center")
        v-row(justify="center" align="center")
          v-col.col-md-3.col-sm-4.col-xs-6(v-if="pokemonList", v-for="pokemon in pokemonList", :key="pokemon.id")
            v-card.justify-center.pokemon-card(
              flat,
              @click="$router.push(`/pokemon/${pokemon.name}`)",
              :style="`background-color: hsla(${pokemonType[pokemon.types[0].type.name].hue}, 70%, 80%, 1);`")
              v-img(
                :src="pokemon.sprites.other['official-artwork'].front_default"
                :aspect-ratio="1/1"
                :width="180"
                style="margin-left: auto; margin-right: auto;")
              v-card-subtitle {{pokemon.pokedexNum}}
              v-card-text
                div.pb-1(style="text-transform: capitalize;") 
                  h2 {{pokemon.name}}
                v-chip.ma-1(
                  v-for="type in pokemon.types",
                  small, :color="pokemonType[type.type.name].color"
                  :key="type.type.name",
                  :class="`type-${type.type.name}`")
                  b(style="color: white; text-shadow: 1px 1px #6a6a6a;") {{type.type.name}}
</template>

<script>
import pokemonType from '~/static/pokemon-type.json'

export default {
  name: "IndexPage",
  data () {
    return {
      loading: false,
      totalPokemon: 0,
      pokemonList: [],
      pokemonType: {},
      pageAttr: { limit: 20, offset: 0 },
    }
  },
  mounted() {
    this.pokemonType = pokemonType;
    this.fetchPokemons();
      window.onscroll = () => {
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight + 500 > document.documentElement.offsetHeight;
        if (bottomOfWindow) {
          console.log('reach bottom');
          this.fetchPokemons();
        }
      }
  },
  methods: {
    fetchPokemons() {
      if (!this.loading && this.pageAttr.offset <= this.totalPokemon) {
        this.loading = true
        this.$store.dispatch('pokemon/fetchPokemons', this.pageAttr)
          .then(async (pokemons) => {
            this.pageAttr.offset += this.pageAttr.limit;
            this.totalPokemon = pokemons.count - 220; // 220 is variant or other form that doesn't related to pokedex
            for (let i = 0; i < pokemons.results.length; i++) {
              const pokemon = await this.$store.dispatch('pokemon/fetchPokemon', pokemons.results[i]);
              switch(pokemon.id.toString().length) {
                case 1:
                  pokemon.pokedexNum = '#00' + pokemon.id; break;
                case 2:
                  pokemon.pokedexNum = '#0' + pokemon.id; break;
                default:
                  pokemon.pokedexNum = '#' + pokemon.id; break;
              }
              if (pokemon.id < 10000) this.pokemonList.push(pokemon); // id start from 10000 is variant or other form that doesn't related to pokedex
            }
            this.loading = false;
          });
      }
    }
  }

}
</script>

<style lang="scss" scoped>
  .pokemon-card {
    cursor: pointer;
    border-radius: 20px;
    padding-top: 5px;
    .v-card__subtitle {
      padding-bottom: 0;
      font-size: 1rem;
    }
  }
</style>