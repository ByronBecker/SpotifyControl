


export let playSpotify = (cbInfo): void => {

    //let token = null;
    //let player = null;

    window.onSpotifyWebPlaybackSDKReady = () => {
        const token = 'BQDUMhukTuoKgL0MYTdsXsK7dhPWc3hnOxGqADUNtNJ5o2HNCAvUkIPRXXtAinmOMYImgRPqcrfT8sL3JGo8rCJGThdHgjAYEfxlSbKsk36WfP38N1r6ftRCYzyF4XMk_QX63M60ihrY_XjbwFaEuqpxtpJ8ltyLgpf4cg';

        //@ts-ignore
        const player = new Spotify.Player({
        
            name: 'DataPipe Spotify Player',
            getOAuthToken: cb => { 
                cb(token); 
                /*fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
                    method: 'PUT',
                    body: JSON.stringify({ uris: ['spotify:track:7xGfFoTpQ2E7fRF5lN10tr'] }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                */
            }
        });
        
        player.connect().then(
            () => {
                console.log("connected to player!");
                cbInfo(player, token);
            }
        );
        // Error handling
        player.addListener('initialization_error', ({ message }) => { console.error(message); });
        player.addListener('authentication_error', ({ message }) => { console.error(message); });
        player.addListener('account_error', ({ message }) => { console.error(message); });
        player.addListener('playback_error', ({ message }) => { console.error(message); });
        
        // Playback status updates
        player.addListener('player_state_changed', state => { console.log(state); });
        
        // Ready
        // start off with song 0 on load
        player.addListener('ready', ({ device_id }) => {
            console.log('Ready with Device ID', device_id);
            play({
                playerInstance: player,
                token: token,
                spotify_uri: 'spotify:track:6MH0J3KUfEVWpz7XEpHOJW',
            });
            //connect(player)
        });
        
        
        
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



        
        
        /*
        play({
            playerInstance: player,
            token: token,
            spotify_uri: 'spotify:track:7xGfFoTpQ2E7fRF5lN10tr',
        });
        */
        
        
        /*
        let connect = (player) => {
            player.connect().then(
                console.log("connected to player!")
            );
        }
        */
        
        
        //} 
    }

    /*
    let retObj = {
        "player" : player,
        "token" : token
    }

    return retObj
    */
}