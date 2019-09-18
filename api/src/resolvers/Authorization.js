import { authorizeWithGithub } from '../lib'

export const Query = {

    me: (_, args, { currentPlayer }) => currentPlayer

}

export const Mutation = {

    async githubAuthorization(_, { code }, { players }) {

        let cnxLimit = process.env.REACT_APP_MAX_CONNECTIONS || 1500

        if (cnxLimit <= players.length) {
            throw new Error(`${cnxLimit} connections exceeded. No new connections allowed`)
        }

        const { message, access_token, avatar_url, login, name, email } = await authorizeWithGithub({
            client_id: process.env.REACT_APP_GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code
        })

        if (message) {
            console.log('client_id: ', process.env.REACT_APP_GITHUB_CLIENT_ID)
            console.log('client_secret: ', process.env.GITHUB_CLIENT_SECRET)
            console.log('code: ', code)
            throw new Error(`Github Authorization Error: ${message}`)
        }

        var player = {
            login,
            name,
            email,
            token: access_token,
            avatar: avatar_url
        }

        var playerIndex = players.map(p => p.login).indexOf(player.login)

        if (playerIndex !== -1) players[playerIndex] = player
        else players.push(player)

        return { player, token: access_token }

    },

    logout(_, args, { players, currentPlayer }) {
        if (currentPlayer) {
            let pIndex = players.map(p => p.login).indexOf(currentPlayer.login)
            players.splice(pIndex, 1)
        }
    }

}