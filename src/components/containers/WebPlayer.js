import React, { useState, useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import Video from '../Video'
import Playlist from '../containers/Playlist'
import StyledWebPlayer from '../styles/StyledWebPlayer'

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

const WebPlayer = props => {
  const videos = JSON.parse(document.querySelector('[name="videos"]').value)
  const [state, setState] = useState(
    {
      videos: videos.playlist,
      activeVideo: videos.playlist[0],
      nightMode: true,
      autoplay: false,
      playlistId: videos.playlistId
    }
  )

  const endCallback = () => { }
  const propgressCallback = () => { }
  const nightModeCallback = () => { }

  return (
    <ThemeProvider theme={state.nightMode ? theme : themeLight} >
      {
        state.videos ?
          <StyledWebPlayer>
            <Video
              active={state.activeVideo}
              autoplay={state.autoplay}
              endCallback={endCallback}
              propgressCallback={propgressCallback}
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
