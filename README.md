# GraphQL Fun

The arrival of [GraphQL](http://www.graphql.org) marks a tectonic shift in the way that APIs are designed and will be designed for many years to come. It's useful to talk about all of GraphQL's serious implications for how we fetch data in our applications, but let's not forget that GraphQL is really fun.

This app demonstrates the core concepts of GraphQL with two fun, interactive activities:

TODO: Extend Example Apps

- **Color Groups**: Break up an audience of any size into different groups, assigning each person a color. 🎨
- **WeJay**: Pick audience members at random to play a song together. 🎹

## Have Questions?

Email [Eve Porcello](mailto:eve@moonhighway.com).

## Want to learn more about GraphQL?

Check out [GraphQL Workshop](https://www.graphqlworkshop.com).

---

### Saved Board Queries

```graphql
query players {
  playerCount
  allPlayers {
    login
  }
}

mutation createPlayer {
  githubAuthorization(code: "TEST_PLAYER") {
    token
  }
}

query current {
  game {
    name
    state
    maxPlayers
    minPlayers
  }
  callout {
    name
    state
  }
}
mutation startPerf {
  startPerfIsRight {
    name
    state
    maxPlayers
    minPlayers
  }
}

mutation startFightJay {
  startFightjay {
    name
    state
  }
}

mutation startFaces {
  startFaces {
    name
    state
  }
}

mutation startSpotlight {
  startSpotlight {
    name
    state
  }
}

mutation startPerfIsRight {
  startPerfIsRight {
    name
    state
    maxPlayers
    minPlayers
  }
}

mutation startPerfIsRightFinal {
  startPerfIsRightFinal {
    name
    state
    maxPlayers
    minPlayers
  }
}

mutation endGame {
  endGame
}

mutation endCallout {
  endCallout
}

mutation endSession {
  end
}

# {
#   "authorization": "Bearer c5480bb8-c1ab-49f2-8ea2-783d76703506"
# }

# {
#   "authorization": "Bearer 8888b5ea-11e4-4d92-84e6-c3891f8e9b3a"
# }

# {
#   "authorization": "Bearer d0ecd0b9-2bed-489b-9c4c-7829099c9efe"
# }
```
