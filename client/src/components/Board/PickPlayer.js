import React from "react";
// import { Mutation } from 'react-apollo'
// import { PICK_PLAYER, START_GAME } from '.'
// import styled from 'styled-components'

export function PickPlayer() {
  return <h1>Pick Player</h1>;
}

// export class PickPlayer extends Component {

//     comeOnDown = mutation =>
//         <div>
//             <button onClick={mutation}>Pick Player</button>
//         </div>

//     maxPlayers = count => 5 - count

//     playerPicked = (data, mutation) =>
//         <div>
//             <img src={data.pickPlayer.player.avatar} alt="" width={100} height={100} />
//             <h1>{data.pickPlayer.player.name || data.pickPlayer.player.login}</h1>
//             <button onClick={mutation}>
//                 Pick {this.maxPlayers(data.pickPlayer.count)} more
//             </button>
//         </div >

//     startGame = (data) =>
//         <Mutation mutation={START_GAME} update={this.onGameStart}>
//             {startGame => {
//                 return (
//                     <div>
//                         <img src={data.pickPlayer.player.avatar} alt="" width={100} height={100} />
//                         <h1>{data.pickPlayer.player.name || data.pickPlayer.player.login}</h1>
//                         <button onClick={startGame}>START GAME!</button>
//                     </div>
//                 )
//             }}
//         </Mutation>

//     onGameStart = () => {
//         this.props.history.replace('/board')
//     }

//     render() {
//         return (
//             <Container>
//                 <Mutation mutation={PICK_PLAYER}>
//                     {(mutation, { data }) => {
//                         return !data ?
//                             this.comeOnDown(mutation) :
//                             data.pickPlayer.count === 5 ?
//                                 this.startGame(data) :
//                                 this.playerPicked(data, mutation)
//                     }
//                     }
//                 </Mutation >
//             </Container>
//         )
//     }
// }

// const Container = styled.div`
//     align-self: stretch;
//     width: 100%;

//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;

//     img {
//         width: 400px;
//         height: 400px;
//         border-radius: 50%;
//     }

//     h1 {
//         text-align: center;
//         margin: .5em;
//         font-size: 4em;
//         color: white;
//         font-family: ${props => props.theme.fonts.fun};
//     }

//     div {
//         text-align: center;
//     }

//     button {
//         border: solid 1px white;
//         background-color: transparent;
//         color: white;
//         font-family: ${props => props.theme.fonts.creativeLight};
//         font-size: 3em;
//         padding: .5em 1em;

//         &:hover {
//             background-color: ${props => props.theme.colors.contrast};
//             color: ${props => props.theme.colors.dark};
//         }
//     }
// `
