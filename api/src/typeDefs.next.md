# Connecting

## Connect with Github

```grapqhql

```

## Listening for Connections

- with/without game start

```grapqhql

```

## Listening for Game Changes

```graphql

```

# Listing Games Games

```grapqhql

```

# Starting AllJay

```grapqhql

```

## AllJay Board : Listening for new Connections

```graphql

```

##

## AllJay Board : Listening for Track Volume Levels

```graphql
mutation addPlayer {
  githubAuthorization(code: "TEST_PLAYER") {
    token
  }
}

query listPlayers {
  playerCount
  allPlayers {
    login
    name
    instrument
  }
}

mutation pickPlayer {
  pickPlayer {
    count
    player {
      login
    }
  }
}

query listPlayersOnDeck {
  playerCount(onDeck: true)
  allPlayers(onDeck: true) {
    login
    name
    instrument
  }
}

mutation startGame {
  startGame {
    playerCount
    players {
      login
      instrument
    }
  }
}

query currentGame {
  currentGame {
    playerCount
    players {
      login
      instrument
    }
  }
}

mutation endGame {
  endGame
}
```

```graphql
query me {
  me {
    login
    instrument
    playingGame
  }
}

mutation play {
  play
}

mutation pause {
  pause
}
```

```graphql
subscription {
  instructions {
    login
    instrument
    playingGame
  }
}
```

```graphql
subscription {
  gameChange {
    players {
      login
    }
    playingMusic {
      login
      instrument
    }
    faces {
      login
      avatar
    }
  }
}
``
```
