


export let playSpotify = (cbInfo): void => {

    window.onSpotifyWebPlaybackSDKReady = () => {
        // need to update this token every hour
        const token = 'BQDXlywyiHHUgqgOWXBbuxYxFlF_d6VHXEgIwZCHxHRKaj7Td2kGLsUo7GBPFFYb5kGf3ZK0LhMbmMIlhbbHp5s7kBQjeWD59IJsoaPiJpzvzhRAaw6cjjkeXZ3gxQOlTojtQmvD2RYs9y0q7Iy6CjX9KDS0VPolGUAF2A';

        //@ts-ignore
        const player = new Spotify.Player({
        
            name: 'DataPipe Spotify Player',
            getOAuthToken: cb => { 
                cb(token); 
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
    }

}