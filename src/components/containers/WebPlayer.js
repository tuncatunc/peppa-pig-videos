import React, { useState, useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import Video from '../Video'
import Playlist from '../containers/Playlist'
import StyledWebPlayer from '../styles/StyledWebPlayer'
import playlistData from './PlaylistData'

const theme = {
  bgcolor: "#353535",
  bgcolorItem: "#414141",
  bgcolorItemActive: "#405c63",
  bgcolorPlayed: "#526d4e",
  border: "none",
  borderPlayed: "none",
  color: "white"
}

const themeLight = {
  bgcolor: "#fff",
  bgcolorItem: "#fff",
  bgcolorItemActive: "#80a7b1",
  bgcolorPlayed: "#7d9979",
  border: "1px solid #353535",
  borderPlayed: "none",
  color: "#353535"
}

const WebPlayer = ({ history, location, match }) => {
  //const videos = JSON.parse(document.querySelector('[name="videos"]').value)
  const videos = playlistData
  const savedState = JSON.parse(localStorage.getItem(`${videos.playlistId}`))

  const [state, setState] = useState(
    {
      videos: savedState ? savedState.videos : videos.playlist,
      activeVideo: savedState ? savedState.activeVideo : videos.playlist[0],
      nightMode: savedState ? savedState.nightMode :true,
      autoplay: savedState ? savedState.autoplay : false,
      playlistId: savedState ? savedState.playlistId :videos.playlistId
    }
  )

  useEffect(() => {
    localStorage.setItem(`${state.playlistId}`, JSON.stringify({...state}))
  }, [state])

  useEffect(
    () => {
      const videoId = match.params.activeVideo
      if (videoId) {
        const activeVideoIndex = state.videos.findIndex(
          video => video.id === videoId
        )

        // url: /:activeVideo is a valid active video
        if (activeVideoIndex !== -1) {
          setState(
            prev =>
              ({
                ...prev,
                activeVideo: prev.videos[activeVideoIndex],
                autoplay: false
              })
          )
        }
      }
      else {
        history.push(
          {
            pathname: `/${state.videos[0].id}`,
            autoplay: false
          }
        )
      }
    },
    [
      history,
      location.autoplay,
      match.params.activeVideo,
      state.activeVideo.id,
      state.videos,
    ]
  )

  const endCallback = () => {
    console.debug(`Video ended ${match.params.activeVideo}`)
    const finishedVideoIndex = state.videos.findIndex(video => video.id)
    const nextVideoIndex = (finishedVideoIndex + 1) % state.videos.length
    //setState(prev => ({...prev, activeVideo: videos[nextVideoIndex]}))
    history.push(
      {
        pathname: `/${state.videos[nextVideoIndex].id}`,
        autoplay: false
      }
    )
  }

  // After 10 seconds of playing, mark it as played
  const progressCallback = e => {
    console.log('Progress...', e)
    if (e.playedSeconds >= 5) {
      const videos = state.videos.map(
        video => (
          video.id === state.activeVideo.id
            ? { ...video, played: true }
            : video)
      )
      setState(prev => ({ ...prev, videos }))
    }
  }

  const nightModeCallback = () => {
    setState(
      prev => ({ ...prev, nightMode: !prev.nightMode })
    )
  }

  return (
    <ThemeProvider theme={state.nightMode ? theme : themeLight} >
      {
        state.videos ?
          <StyledWebPlayer>
            <Video
              active={state.activeVideo}
              autoplay={state.autoplay}
              endCallback={endCallback}
              progressCallback={progressCallback}
            />
            <Playlist
              videos={state.videos}
              active={state.activeVideo}
              nightMode={state.nightMode}
              nightModeCallback={nightModeCallback}
            />
          </StyledWebPlayer>
          : null
      }
    </ThemeProvider>
  )

}
export default WebPlayer
