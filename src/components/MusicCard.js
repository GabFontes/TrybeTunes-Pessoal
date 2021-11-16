import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { addSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  favorites() {

  }

  render() {
    const { music: { trackName, previewUrl, trackId } } = this.props;
    // Créditos ao Léo, linha 9.
    return (previewUrl !== undefined ? (

      <div key={ trackName }>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label htmlFor="favorite">
          Favorita
          <input
            id="favorite"
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
          />
        </label>
      </div>
    ) : null
    );
  }
}

// MusicCard.defaultProps = {
//   previewUrl: undefined,
//   trackName: '',
// }

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.string,
  }).isRequired,
};
