(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{195:function(t,e,o){var content=o(261);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(56).default)("7388ab72",content,!0,{sourceMap:!1})},218:function(t,e,o){"use strict";var n={name:"defaultPage"},r=o(81),c=o(123),f=o.n(c),l=o(314),h=o(316),d=o(315),component=Object(r.a)(n,(function(){var t=this.$createElement,e=this._self._c||t;return e("v-app",[e("v-main",[e("v-container",[e("Nuxt")],1)],1)],1)}),[],!1,null,null,null);e.a=component.exports;f()(component,{VApp:l.a,VContainer:h.a,VMain:d.a})},228:function(t,e,o){o(229),t.exports=o(230)},260:function(t,e,o){"use strict";o(195)},261:function(t,e,o){var n=o(55)(!1);n.push([t.i,"h1[data-v-bfedb7fe]{font-size:20px}",""]),t.exports=n},266:function(t,e,o){var content=o(267);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(56).default)("ba5c3d16",content,!0,{sourceMap:!1})},267:function(t,e,o){var n=o(55)(!1);n.push([t.i,".v-chip.type-grass{background-color:#7c5}",""]),t.exports=n},283:function(t,e,o){"use strict";o.r(e);o(29),o(23);e.default={namespaced:!0,actions:{fetchPokemons:function(t,param){return this.$axios.$get("https://pokeapi.co/api/v2/pokemon?limit=".concat(param.limit,"&offset=").concat(param.offset))},fetchPokemon:function(t,param){return this.$axios.$get("https://pokeapi.co/api/v2/pokemon/".concat(param.name))},fetchPokemonChar:function(t,param){return this.$axios.$get("https://pokeapi.co/api/v2/pokemon-species/".concat(param.id))},fetchPokemonByUrl:function(t,e){return this.$axios.$get(e)}}}},65:function(t,e,o){"use strict";var n={layout:"empty",props:{error:{type:Object,default:null}},data:function(){return{pageNotFound:"404 Not Found",otherError:"An error occurred"}},head:function(){return{title:404===this.error.statusCode?this.pageNotFound:this.otherError}}},r=(o(260),o(81)),c=o(123),f=o.n(c),l=o(314),component=Object(r.a)(n,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-app",{attrs:{dark:""}},[404===t.error.statusCode?o("h1",[t._v("\n    "+t._s(t.pageNotFound)+"\n  ")]):o("h1",[t._v("\n    "+t._s(t.otherError)+"\n  ")]),t._v(" "),o("NuxtLink",{attrs:{to:"/"}},[t._v("\n    Home page\n  ")])],1)}),[],!1,null,"bfedb7fe",null);e.a=component.exports;f()(component,{VApp:l.a})}},[[228,9,2,10]]]);