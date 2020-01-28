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
    return fetch("https://api.spotify.com/v1/me/playlists?limit=50", this.requestOptions)
    .then(response => response.json())
    .then(playlists => {
      return playlists.items.map(playlist => {
        return {
          id: playlist.id,
          uri: playlist.uri,
          name: playlist.name,
          type: playlist.type,
          image: playlist.images && playlist.images.length > 0 ? playlist.images[0].url : "",
          description: playlist.description,
        };
      });
    });
  }

  getAlbums() {
    return fetch("https://api.spotify.com/v1/me/albums?limit=50", this.requestOptions)
      .then(response => response.json())
      .then(albums => {
        return albums.items.map(item => {
          const album = item.album;
          return {
            id: album.id,
            uri: album.uri,
            name: album.name,
            type: album.type,
            image: album.images && album.images.length > 0 ? album.images[0].url : "",
            description: album.artists && album.artists.length > 0 ? album.artists[0].name : "",
          };
        })
      });
  }

  getPodcasts() {
    return fetch("https://api.spotify.com/v1/me/shows?limit=50", this.requestOptions).then(response => response.json());
  }

  getCurrentPlayback() {
    return fetch("https://api.spotify.com/v1/me/player", this.requestOptions).then(response => {
      if (response.status === 200)
        return response.json();

      if (response.status === 401)
        throw "not-authorized";

      return null;
    }).then(playback => {
      if (!playback) return null;

      return {
        contextUri: playback.context.uri,
        contextType: playback.context.type,
        progress: playback.progress_ms,
        isPlaying: playback.is_playing,
        shuffleState: playback.shuffle_state,
        repeatState: playback.repeat_state,
        device: {
          id: playback.device.id,
          name: playback.device.name,
          type: playback.device.type,
        },
        track: {
          id: playback.item.id,
          uri: playback.item.uri,
          name: playback.item.name,
          album: {
            uri: playback.item.album.uri,
            name: playback.item.album.name,
            image: playback.item.album.images.length > 0 ? playback.item.album.images[0].url : "",
          },
          artist: playback.item.artists.map(artist => artist.name).join(", "),
          duration: playback.item.duration_ms,
        }
      }
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
