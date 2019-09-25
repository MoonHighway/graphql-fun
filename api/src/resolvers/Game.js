import { getCurrentGame, startGame, endGame } from "../db";

export const Query = {
  currentGame: (root, args) => getCurrentGame()
};

export const Mutation = {
  startGame: (root, args, { pubsub, isAdmin }) => {
    if (!isAdmin) {
      throw new Error("Only Eve can start Games");
    }
    const game = startGame();
    pubsub.publish("new-instructions");
    return game;
  },
  endGame: (root, args, { pubsub, isAdmin }) => {
    if (!isAdmin) {
      throw new Error("Only Eve can end a game");
    }
    endGame();
    pubsub.publish("new-instructions");
    return true;
  },
  play: (root, args, { currentGame, currentPlayer, pubsub }) => {
    let musician = currentGame.players.find(
      p => p.login === currentPlayer.login
    );
    if (musician) {
      if (
        !currentGame.playingMusic.map(m => m.login).includes(musician.login)
      ) {
        currentGame.playingMusic.push(musician);
        pubsub.publish("game-changer", { gameChange: currentGame });
      }
    } else {
      if (currentGame.faces.length < process.env.WEJAY_MAX_FACES) {
        if (
          !currentGame.faces.map(m => m.login).includes(currentPlayer.login)
        ) {
          currentGame.faces.push(currentPlayer);
          pubsub.publish("game-changer", { gameChange: currentGame });

          setTimeout(() => {
            currentGame.faces = currentGame.faces.filter(
              p => p.login !== currentPlayer.login
            );
            pubsub.publish("game-changer", { gameChange: currentGame });
          }, 8000);
        }
      } else {
        return false;
      }
    }
    return true;
  },
  pause: (root, args, { currentGame, currentPlayer, pubsub }) => {
    let musician = currentGame.players.find(
      p => p.login === currentPlayer.login
    );

    if (musician) {
      if (currentGame.playingMusic.map(p => p.login).includes(musician.login)) {
        currentGame.playingMusic = currentGame.playingMusic.filter(
          p => p.login !== musician.login
        );
        pubsub.publish("game-changer", { gameChange: currentGame });
      }
    }

    return true;
  },
  end: (_, args, { pubsub, isAdmin }) => {
    if (!isAdmin) {
      throw new Error("Only Eve can end her demo");
    }

    global.players = [];
    global.teams = [];
    global.playersOnDeck = [];
    global.availablePlayers = [];
    global.currentGame = {
      playerCount: 0,
      players: [],
      playingMusic: [],
      faces: []
    };
    pubsub.publish("new-instructions");
    return true;
  }
};

export const Subscription = {
  gameChange: {
    subscribe: (_, args, { pubsub }) => pubsub.asyncIterator("game-changer")
  }
};
