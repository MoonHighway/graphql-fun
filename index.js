!function(e,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define([],n):"object"==typeof exports?exports.library=n():e.library=n()}(global,function(){return function(e){var n={};function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)t.d(r,o,function(n){return e[n]}.bind(null,o));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=0)}([function(e,n,t){"use strict";var r=t(1),o=l(t(2)),u=l(t(3)),a=l(t(4));function l(e){return e&&e.__esModule?e:{default:e}}var i=(0,o.default)();new r.ApolloServer({typeDefs:u.default,resolvers:{},mocks:!0}).applyMiddleware({app:i}),i.get("/playground",(0,a.default)({endpoint:"/graphql"})),i.use("/",o.default.static("./build")),i.listen({port:process.env.PORT||3e3},function(){return console.log("GraphQL Fun Running")})},function(e,n){e.exports=require("apollo-server-express")},function(e,n){e.exports=require("express")},function(e,n){e.exports="type Player {\n  login: ID!\n  avatar: String\n  name: String\n  team: Team\n  instrument: Instrument\n}\n\ntype Team {\n  color: String!\n  players: [Player!]!\n}\n\nenum Instrument {\n  BASS\n  DRUMS\n  PERCUSSION\n  SAMPLER\n  SYNTH\n}\n\ntype Query {\n  me: Player!\n  allPlayers: [Player!]!\n  playerCount: Int!\n  allTeams: [Team!]!\n  Team(color: String!): Team\n}\n\ntype Mutation {\n  createTeams(count: Int): [Team!]!\n  destroyTeams: Boolean\n  comeOnDown: Player!\n  kickOut(login: ID): Player!\n  play: Boolean!\n  pause: Boolean!\n}\n\ntype Subscription {\n  myTeam: Team\n  playingMusic: [Instrument!]!\n}\n"},function(e,n){e.exports=require("graphql-playground-middleware-express")}])});
//# sourceMappingURL=index.map