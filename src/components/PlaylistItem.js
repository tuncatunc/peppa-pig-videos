import React from 'react'
import StyledPlaylistItem from './styles/StyledPlaylistItem'

const PlaylistItem = ({ video, active, played }) => {
  return (
    <StyledPlaylistItem active={active} played={played}>
      <div className='web-player__video-nr'>{video.num}</div>
      <div className='web-player__video-thumb-container'>
        <img className='web-player__video-thumb' alt={video.id} src={`http://img.youtube.com/vi/${video.id}/1.jpg`} />
      </div>
      <div className='web-player__video-name'>{video.title}</div>
      <div className='web-player__video-time'>{video.duration}</div>
    </StyledPlaylistItem>
  )
}

export default PlaylistItem
