
import Peer = require('peerjs')
import * as React from 'react'

interface SongProps {
    name: string,
    uri: string,
    songNumber: number,
    numberSelected: number
    handleClick : (uri: string, songNumber: number) => void
}

interface SongState {
    name: string,
    uri: string,
    songNumber: number
    backgroundColor: string
}

class Song extends React.Component <SongProps, SongState>{
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.name,
            songNumber: this.props.songNumber,
            backgroundColor: null,
            uri : this.props.uri
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.numberSelected == this.state.songNumber) {
            this.setState({
                backgroundColor: "yellow"
            });
        }
        else {
            this.setState({
                backgroundColor: "white"
            });
        }
    }

    render() {
        return (
            <div style={{backgroundColor: this.state.backgroundColor}}
                onClick={() => this.props.handleClick(this.state.uri, this.state.songNumber)}>
                {this.state.name}
            </div>
        )
    }

}

const SongLine = (props):JSX.Element => {
    return (
        <div style={{backgroundColor: props.backgroundColor}}>
            {props.name}
        </div>
    )
} 

export interface ContentProps {
    peer: Peer,
    player: any,
    token: string
}


export default class Content extends React.Component<ContentProps, any> {
    constructor(props) {
        super(props);

        this.state = {
            numberSelected: -1,
        }
    }

    playSong = (uri:string, songNumber:number) => {
        console.log("player is", this.props.player)
        this.setState({
            numberSelected: songNumber
        })
        play({
            playerInstance: this.props.player,
            token: this.props.token,
            spotify_uri: uri
        });
    }

    render() {
        return (
            <div>
                <Song name="Quiet Nights of Quiet Stars" uri="spotify:track:6MH0J3KUfEVWpz7XEpHOJW" 
                    songNumber={0} numberSelected={this.state.numberSelected} handleClick={this.playSong}
                />
                <Song name="She Came in Through the Bathroom Window" uri="spotify:track:2jtUGFsqanQ82zqDlhiKIp"
                    songNumber={1} numberSelected={this.state.numberSelected} handleClick={this.playSong}
                />
                <Song name="Treasure" uri="spotify:track:55h7vJchibLdUkxdlX3fK7"
                    songNumber={2} numberSelected={this.state.numberSelected} handleClick={this.playSong}
                />
                <Song name="The Three Trumpeters" uri="spotify:track:4hwbmQjymEOZfHxyuPnVXB"
                    songNumber={1} numberSelected={this.state.numberSelected} handleClick={this.playSong}
                />
                <Song name="Radio Silence" uri="spotify:track:5kWHEzWJ9f6btqiotA6Xhi"
                    songNumber={1} numberSelected={this.state.numberSelected} handleClick={this.playSong}
                />
                <Song name="Creep" uri="spotify:track:6b2oQwSGFkzsMtQruIWm2p"
                    songNumber={1} numberSelected={this.state.numberSelected} handleClick={this.playSong}
                />
                <Song name="Cheek to Cheek" uri="spotify:track:0UuRIovHyU6KeTzY4gS0L2"
                    songNumber={1} numberSelected={this.state.numberSelected} handleClick={this.playSong}
                />
                <Song name="Light My Fire" uri="spotify:track:5uvosCdMlFdTXhoazkTI5R"
                    songNumber={1} numberSelected={this.state.numberSelected} handleClick={this.playSong}
                />
                
            </div>
        )
    }
}

const play = (
    {
        spotify_uri,
        token,
        playerInstance: {
            _options: {
                getOAuthToken,
                id
            }
        }
    }) => {
        getOAuthToken(token => {
            fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
                method: 'PUT',
                body: JSON.stringify({ uris: [spotify_uri] }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
        });
    };
    