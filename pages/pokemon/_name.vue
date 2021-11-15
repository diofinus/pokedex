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
      v-tabs(right, :style="`background-color: hsla(${pokemonType[pokemon.types[0].type.name].hue}, 70%, 80%, 1);`")
        v-tab.selection-tab.first About
        v-tab.selection-tab Base static
        v-tab.selection-tab Evolution
        v-tab-item
          v-card(flat)
            v-card-text
              p(style="color: darkslategrey;")
                b Description
              p(style="color: darkslategrey; font-size: 16px;") {{pokemon.flavor_text_entries[0].flavor_text}}
              v-divider
              br
              v-row(justify="start", no-gutters)
                v-col(md="auto")
                  p Height
                  p Weight
                  p Abilities
                  p(style="color: darkslategrey;")
                    b Breeding
                  p Gender
                  p Egg Groups
                  p Egg Cycles
                v-col.offset-md-1(md="auto", style="color: darkslategrey;")
                  p {{pokemon.height}}0 cm
                  p {{pokemon.weight/10}} kg
                  p 
                    span(v-for="(ability, idx) in pokemon.abilities", :key="idx")
                      span {{ability.ability.name}}
                      span(v-if="idx+1 < pokemon.abilities.length") ,&nbsp;
                  p &nbsp;
                  p 
                    v-icon(color="blue") mdi-gender-male
                    span.mr-2 {{100-pokemon.gender_rate/8*100}}%
                    v-icon(color="pink") mdi-gender-female
                    span {{pokemon.gender_rate/8*100}}%
                  p 
                    span(v-for="eggGroup in pokemon.egg_groups")
                      span {{eggGroup.name}}
                      span(v-if="idx+1 < pokemon.abilities.length") ,&nbsp;
                  p {{pokemon.hatch_counter}} ({{255*pokemon.hatch_counter}}-{{257*pokemon.hatch_counter}} steps)
        v-tab-item
          v-card(flat)
            v-card-text
              v-row(v-for="stat in stats")
                v-col.offset-md-2.col-md-8.offset-sm-2.col-sm-8
                  div(style="width: 100%;")
                    span {{stat.name}}
                    span(style="float: right;") {{pokemon[stat.attr]}}
                  v-progress-linear(v-model="pokemon[`${stat.attr}_perc`]", rounded, height="7")
        v-tab-item
          v-card(flat)
            v-card-text
              v-row(v-for="evolution in evolutionTree")
                v-col.offset-md-2.col-md-8.offset-sm-2.col-sm-8.col-xs-6
                  v-row(v-for="method in evolution.methods")
                    div(v-if="method.trigger.name === 'level-up'")
                      span Triggered by {{method.trigger.name}}&nbsp;
                      span at&nbsp;
                      span(v-for="requirement in evolutionReq")
                        span(v-if="method[requirement.attr]") {{requirement.name}} {{method[requirement.attr]}}&nbsp;
                    div(v-else) Coming Soon!
                  v-row
                    v-col.col-6
                      p {{evolution.from.name}}
                    v-col.col-6
                      p {{evolution.to.name}}
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
      stats: [
        { attr: 'hp', name: 'HP' },
        { attr: 'attack', name: 'Attack' },
        { attr: 'defense', name: 'Defense' },
        { attr: 'special-attack', name: 'Sp. Attack' },
        { attr: 'special-defense', name: 'Sp. Defense' },
        { attr: 'speed', name: 'Speed' },
      ],
      evolutionTree: [],
      evolutionReq: [
        { attr: 'min_affection', name: 'affection' },
        { attr: 'min_beauty', name: 'beauty' },
        { attr: 'min_happiness', name: 'happiness' },
        { attr: 'min_level', name: 'level' },
      ],
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
          pokemon.stats.forEach(stat => {
            pokemon[stat.stat.name] = stat.base_stat;
            pokemon[`${stat.stat.name}_perc`] = stat.base_stat/255*100;
          });
          this.$store.dispatch('pokemon/fetchPokemonChar', { id: pokemon.id })
            .then(char => {
              this.pokemon = {...pokemon, ...char};
              this.loading = false;
              this.fetchPokemonEvolution(this.pokemon.evolution_chain.url)
            });
        });
    },
    fetchPokemonEvolution(url) {
      this.$store.dispatch('pokemon/fetchPokemonByUrl', url)
        .then(evolution => {
          this.getEvolution(evolution.chain);
        });
    },
    getEvolution(evolution) {
      evolution.evolves_to.forEach(ev_to => {
        this.evolutionTree.push({
          from: { name: evolution.species.name },
          to: { name: ev_to.species.name },
          methods: ev_to.evolution_details,
        });
        console.log(this.evolutionTree);
        if(ev_to.evolves_to) this.getEvolution(ev_to);
      });
    }
  }
}
</script>

<style lang="scss">
  .theme--light.v-tabs > .v-tabs-bar {
    background-color: inherit !important;  
  }
  .selection-tab {
    background-color: white;
    &.first {
      border-radius: 20px 0 0 0;
    }
  }
</style>