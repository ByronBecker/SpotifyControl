
//import Peer = require('peerjs')

import {PeerClient} from './Peer';
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
        if (newProps.numberSelected == newProps.songNumber) {
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
            <div style={{backgroundColor: this.state.backgroundColor, width: "fit-content"}}
                onClick={() => this.props.handleClick(this.state.uri, this.state.songNumber)}>
                {this.state.name}
            </div>
        )
    }
}

export interface ContentProps {
    player: any,
    token: string
}


export default class Content extends React.Component<ContentProps, any> {
    public peerSenderId: string = null;
    public peerClient: PeerClient = null;
    constructor(props) {
        super(props);
        this.state = {
            numberSelected: 0,
            dataReceived: null,
            id: null,
        }
        this.peerClient = new PeerClient(this.dataRelay.bind(this))
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

    setSenderId = (e) => {
        this.peerSenderId = e.target.value;
    }

    dataRelay = (key, data) => {
        if (key == "data") {
            console.log("peer received a message!");
            console.log("spotify app received data=", data);
            this.setState({
                dataReceived: data
            })
        }
        else if (key == "id") {
            console.log("setting app peerID");
            this.setState({
                id: data
            });

        }
    }

    connectPeers = () => {
        console.log("peer is ", this.peerClient.peer, "connecting to sender", this.peerSenderId);
        this.peerClient.connectP2P(this.peerSenderId);
    }


    render() {
        return (
            <div>
                <h4> Your PeerID is {this.state.id}</h4>
                Enter Peer to Subscribe to <input type="text" onChange={this.setSenderId}/>
                <input type="submit" onClick={this.connectPeers}/> <br/>
                <div>
                    <b> Song Title </b> <br/>
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
                        songNumber={3} numberSelected={this.state.numberSelected} handleClick={this.playSong}
                    />
                    <Song name="Radio Silence" uri="spotify:track:5kWHEzWJ9f6btqiotA6Xhi"
                        songNumber={4} numberSelected={this.state.numberSelected} handleClick={this.playSong}
                    />
                    <Song name="Creep" uri="spotify:track:6b2oQwSGFkzsMtQruIWm2p"
                        songNumber={5} numberSelected={this.state.numberSelected} handleClick={this.playSong}
                    />
                    <Song name="Cheek to Cheek" uri="spotify:track:0UuRIovHyU6KeTzY4gS0L2"
                        songNumber={6} numberSelected={this.state.numberSelected} handleClick={this.playSong}
                    />
                    <Song name="Light My Fire" uri="spotify:track:5uvosCdMlFdTXhoazkTI5R"
                        songNumber={7} numberSelected={this.state.numberSelected} handleClick={this.playSong}
                    />
                </div> 
                <div> Most recent data Received was {this.state.dataReceived} </div>
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
    