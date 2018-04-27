

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {playSpotify} from './Spotify';
import Content from './Content';

interface AppState {
    player: any,
    token: string
}

class App extends React.Component <any, AppState>{

    constructor(props) {
        super(props);
        this.state = {
            player: null,
            token: null
        }
    }

    setPlayerAndToken = (player:any, token:string) => {
        this.setState({
            player: player,
            token: token
        }, () => {
            console.log("player set as", player, "token set as", token)
        });

    }

    render() {
        playSpotify(this.setPlayerAndToken.bind(this));

        return (
            <div>
                <Content player={this.state.player} token={this.state.token}/>
            </div>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('render-target')
)