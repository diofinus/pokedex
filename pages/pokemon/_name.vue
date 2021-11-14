<template lang="pug">
  div(v-if="!loading")
    v-row(align="center", :style="`background-color: hsla(${pokemonType[pokemon.types[0].type.name].hue}, 70%, 80%, 1);`")
      v-col
        v-row
          v-icon.pr-2(
            large,
            color="black",
            style="cursor: pointer;",
            @click="$router.push(`/`)") mdi-chevron-left
        v-container(style="padding: 30px")
          v-row
            h3 {{pokemon.pokedexNum}}
          v-row
            h1(style="text-transform: capitalize") {{pokemon.name}} 
          v-row
            v-chip.ma-1(
              v-for="type in pokemon.types",
              small, :color="pokemonType[type.type.name].color"
              :key="type.type.name",
              :class="`type-${type.type.name}`")
              b(style="color: white; text-shadow: 1px 1px #6a6a6a;") {{type.type.name}}
          v-row(dense, align="center")
            v-col.col-md-10.col-sm-10.col-12
              v-img(
                :src="pokemon.sprites.other['official-artwork'].front_default"
                :aspect-ratio="1/1"
                :max-width="300"
                style="margin-left: auto; margin-right: auto;")
            v-col.col-md-2.col-sm-2.d-none.d-sm-block
                v-img(
                  :src="pokemon.sprites.front_default"
                  :aspect-ratio="1/1"
                  :max-width="125"
                  style="margin-left: auto; margin-right: auto;")
                v-img(
                  :src="pokemon.sprites.front_shiny"
                  :aspect-ratio="1/1"
                  :max-width="125"
                  style="margin-left: auto; margin-right: auto;")
            v-col.d-flex.d-sm-none.col-6
                v-img(
                  :src="pokemon.sprites.front_default"
                  :aspect-ratio="1/1"
                  :max-width="125"
                  style="margin-left: auto; margin-right: auto;")
            v-col.d-flex.d-sm-none.col-6
                v-img(
                  :src="pokemon.sprites.front_shiny"
                  :aspect-ratio="1/1"
                  :max-width="125"
                  style="margin-left: auto; margin-right: auto;")
    v-row
      v-tabs(right)
        v-tab About
        v-tab Base static
        v-tab Evolution
        v-tab-item
          v-card(flat)
            v-card-text
              p {{pokemon.flavor_text_entries[0].flavor_text}}
              p Height {{pokemon.height}}0 cm
              p Weight {{pokemon.weight/10}} kg
              p
                span Abilities 
                span(v-for="ability in pokemon.abilities") {{ability.ability.name}},&nbsp;
              p
                b Breeding
              p Gender {{100-pokemon.gender_rate/8*100}}% {{pokemon.gender_rate/8*100}}%
              p
                span Egg Groups 
                span(v-for="eggGroup in pokemon.egg_groups") {{eggGroup.name}},&nbsp;
              p Egg Cycles {{pokemon.hatch_counter}} ({{255*pokemon.hatch_counter}}-{{257*pokemon.hatch_counter}} steps)
        v-tab-item
          v-card(flat)
            v-card-text
              p qwe
        v-tab-item
          v-card(flat)
            v-card-text
              p zxc
</template>

<script>
import pokemonType from '~/static/pokemon-type.json'

export default {
  name: 'PokemonDetailPage',
  data () {
    return {
      loading: true,
      pokemon: {},
      pokemonType: {},
    }
  },
  mounted() {
    this.pokemonType = pokemonType;
    this.fetchPokemon();
  },
  methods: {
    fetchPokemon() {
      this.loading = true;
      this.$store.dispatch('pokemon/fetchPokemon', { name: this.$route.params.name })
        .then(pokemon => {
          switch(pokemon.id.toString().length) {
            case 1:
              pokemon.pokedexNum = '#00' + pokemon.id; break;
            case 2:
              pokemon.pokedexNum = '#0' + pokemon.id; break;
            default:
              pokemon.pokedexNum = '#' + pokemon.id; break;
          }
          this.$store.dispatch('pokemon/fetchPokemonChar', { id: pokemon.id })
            .then(char => {
              this.pokemon = {...pokemon, ...char};
              this.loading = false;
            });
        });
    }
  }
}
</script>