import {
  getCurrentGame,
  startGame,
  endGame,
  saveGameState,
  clearAllKeys,
  clearGame
} from "../db";

export const Query = {
  currentGame: (root, args) => getCurrentGame()
};

export const Mutation = {
  startGame: async (root, args, { pubsub, isAdmin }) => {
    if (!isAdmin) {
      throw new Error("Only Eve can start Games");
    }
    const game = await startGame();
    pubsub.publish("game-changer", { gameChange: game });
    pubsub.publish("new-instructions");
    return game;
  },
  endGame: (root, args, { pubsub, isAdmin }) => {
    if (!isAdmin) {
      throw new Error("Only Eve can end a game");
    }
    endGame();
    pubsub.publish("new-instructions");
    clearGame();
    pubsub.publish("game-changer", { gameChange: null });
    return true;
  },
  play: async (root, args, { currentPlayer, pubsub }) => {
    const game = await getCurrentGame();
    let musician = game.players.find(p => p.login === currentPlayer.login);
    if (musician) {
      if (!game.playingMusic.map(m => m.login).includes(musician.login)) {
        game.playingMusic.push(musician);
        saveGameState(game);
        pubsub.publish("game-changer", { gameChange: game });
      }
    } else {
      if (game.faces.length < process.env.WEJAY_MAX_FACES) {
        if (!game.faces.map(m => m.login).includes(currentPlayer.login)) {
          game.faces.push(currentPlayer);
          saveGameState(game);
          pubsub.publish("game-changer", { gameChange: game });

          setTimeout(() => {
            game.faces = game.faces.filter(
              p => p.login !== currentPlayer.login
            );
            saveGameState(game);
            pubsub.publish("game-changer", { gameChange: game });
          }, 8000);
        }
      } else {
        return false;
      }
    }
    return true;
  },
  pause: async (root, args, { currentGame, currentPlayer, pubsub }) => {
    const game = await getCurrentGame();
    let musician = game.players.find(p => p.login === currentPlayer.login);

    if (musician) {
      if (game.playingMusic.map(p => p.login).includes(musician.login)) {
        game.playingMusic = game.playingMusic.filter(
          p => p.login !== musician.login
        );
        saveGameState(game);
        pubsub.publish("game-changer", { gameChange: game });
      }
    }

    return true;
  },
  end: (_, args, { pubsub, isAdmin }) => {
    if (!isAdmin) {
      throw new Error("Only Eve can end her demo");
    }
    clearAllKeys();
    pubsub.publish("new-instructions");
    return true;
  }
};

export const Subscription = {
  gameChange: {
    subscribe: (_, args, { pubsub }) => pubsub.asyncIterator("game-changer")
  }
};
