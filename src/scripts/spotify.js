export default class {
  constructor(token) {
    this.token = token;
    this.requestOptions = {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.token}`
      }
    };
    this.device = '';
  }

  getUserProfile() {
    return fetch("https://api.spotify.com/v1/me", this.requestOptions).then(response => response.json());
  }

  getPlaylists() {
    return fetch("https://api.spotify.com/v1/me/playlists?limit=50", this.requestOptions).then(response => response.json());
  }

  getAlbums() {
    return fetch("https://api.spotify.com/v1/me/albums?limit=50", this.requestOptions).then(response => response.json());
  }

  getPodcasts() {
    return fetch("https://api.spotify.com/v1/me/shows?limit=50", this.requestOptions).then(response => response.json());
  }

  getCurrentPlayback() {
    return fetch("https://api.spotify.com/v1/me/player", this.requestOptions).then(response => {
      if (response.status === 200)
        return response.json();

      return null;
    });
  }

  setRepeat(state) {
    return fetch(`https://api.spotify.com/v1/me/player/repeat?state=${state}`, {
      ...this.requestOptions,
      method: "PUT",
    });
  }

  setShuffle(state) {
    return fetch(`https://api.spotify.com/v1/me/player/shuffle?state=${state}`, {
      ...this.requestOptions,
      method: "PUT",
    });
  }

  getDevices() {
    return fetch("https://api.spotify.com/v1/me/player/devices", {
      ...this.requestOptions,
    }).then(response => response.json());
  }

  resumePlayback() {
    return fetch(`https://api.spotify.com/v1/me/player/play?device_id=${this.device}`, {
      ...this.requestOptions,
      method: "PUT",
    });
  }

  pausePlayback() {
    return fetch(`https://api.spotify.com/v1/me/player/pause?device_id=${this.device}`, {
      ...this.requestOptions,
      method: "PUT",
    });
  }

  skipPrevious() {
    return fetch(`https://api.spotify.com/v1/me/player/previous?device_id=${this.device}`, {
      ...this.requestOptions,
      method: "POST",
    });
  }

  skipNext() {
    return fetch(`https://api.spotify.com/v1/me/player/next?device_id=${this.device}`, {
      ...this.requestOptions,
      method: "POST",
    });
  }

  playContext(context_uri) {
    console.log(context_uri);
    return fetch(`https://api.spotify.com/v1/me/player/play?device_id=${this.device}`, {
      ...this.requestOptions,
      method: "PUT",
      body: JSON.stringify({ context_uri }),
    });
  }

  playTrack(context_uri, track_uri) {
    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${this.device}`, {
      ...this.requestOptions,
      method: "PUT",
      body: JSON.stringify({ context_uri, offset: { uri: track_uri } }),
    });
  }

  getContext(context_uri) {
    const uri = context_uri.split(":");
    if (uri[1] === "playlist") {
      return fetch(`https://api.spotify.com/v1/playlists/${uri[2]}`, this.requestOptions).then(res => res.json()).then(playlist => {
        return {
          uri: playlist.uri,
          image: playlist.images[0].url,
          name: playlist.name,
          description: playlist.description,
          tracks: playlist.tracks.items.map(t => {
            return {
              album: {
                name: t.track.album.name,
                image: t.track.album.images && t.track.album.images[0] ? t.track.album.images[0].url : '',
                uri: t.track.album.uri
              },
              artist: t.track.artists[0].name,
              duration_ms: t.track.duration_ms,
              uri: t.track.uri,
              name: t.track.name,
            };
          })
        }
      });
    } else if (uri[1] === "show") {
      return fetch(`https://api.spotify.com/v1/shows/${uri[2]}`, this.requestOptions).then(res => res.json()).then(album => {
        return {
          uri: album.uri,
          image: album.images[0].url,
          name: album.name,
          description: album.artists[0].name,
          tracks: album.tracks.items.map(t => {
            return {
              duration_ms: t.duration_ms,
              name: t.name,
              uri: t.uri,
            };
          })
        };
      });
    } else if (uri[1] === "album") {
      return fetch(`https://api.spotify.com/v1/albums/${uri[2]}`, this.requestOptions).then(res => res.json()).then(album => {
        return {
          uri: album.uri,
          image: album.images[0].url,
          name: album.name,
          description: album.artists[0].name,
          tracks: album.tracks.items.map(t => {
            return {
              duration_ms: t.duration_ms,
              name: t.name,
              uri: t.uri,
            };
          })
        };
      });
    }
  }
}
