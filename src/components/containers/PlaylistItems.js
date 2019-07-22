import React from 'react'
import StyledPlaylistItems from '../styles/StyledPlaylistItems'
import PlaylistItem from '../PlaylistItem'
import withLink from '../hoc/withLink'
import PropTypes from 'prop-types';

const PlaylistItemWithLink = withLink(PlaylistItem)

const PlaylistItems = ({ videos, active }) => {
  return (
    <StyledPlaylistItems>
      {
        videos.map(
          video => (
            <PlaylistItemWithLink
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