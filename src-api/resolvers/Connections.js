export const Query = {
    playerCount: (root, args, { players }) => players.length,
    allPlayers: (root, args, { players }) => players
}