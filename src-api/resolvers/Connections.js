export const Query = {
    playerCount: (_, args, { players }) => players.length,
    allPlayers: (_, args, { players }) => players
}
