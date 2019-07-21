import React from 'react';
import PlaylistHeader from '../PlaylistHeader';
import Nightmode from '../NightMode';
import StyledPlaylist from '../styles/StyledPlaylist'
import PlaylistItems from './PlaylistItems';
import PropTypes from 'prop-types'

const Playlist = ({ videos, active, nightModeCallback, nightMode }) => {
  const items = [1, 2, 3, 4, 5]

  return (
    <StyledPlaylist>
      <Nightmode nightMode={nightMode} nightModeCallback={nightModeCallback} />
      <PlaylistHeader active={active} total={videos.length} />
      <PlaylistItems videos={videos} active={active} />
    </StyledPlaylist>
  );
}

Playlist.propTypes = {
  videos: PropTypes.array,
  active: PropTypes.object,
  nightModeCallback: PropTypes.func,
  nightMode: PropTypes.bool
}

export default Playlist
