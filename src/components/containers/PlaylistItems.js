import React from 'react'
import StyledPlaylistItems from '../styles/StyledPlaylistItems'
import PlaylistItem from '../PlaylistItem'
import PropTypes from 'prop-types';

const PlaylistItems = ({ videos, active }) => {
  return (
    <StyledPlaylistItems>
      {
        videos.map(
          video => (
            <PlaylistItem
              key={video.id}
              video={video}
              active={video.id === active.id}
              played={video.played}
            />
          )
        )
      }
    </StyledPlaylistItems>
  )
}

export default PlaylistItems

PlaylistItems.propTypes = {
  videos: PropTypes.array,
  active: PropTypes.object
}