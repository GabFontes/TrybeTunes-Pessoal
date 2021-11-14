import React, { Component } from 'react';
// import PropTypes from 'prop-types';

export default class MusicCard extends Component {
  render() {
    const { music: { trackName, previewUrl } } = this.props;
    // Créditos ao Léo, linha 7.
    return (previewUrl !== undefined ? (

      <div key={ trackName }>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
      </div>
    ) : null
    );
  }
}

// MusicCard.defaultProps = {
//   previewUrl: undefined,
//   trackName: '',
// }

// MusicCard.propTypes = {
//   music: PropTypes.arrayOf().isRequired,
//   trackName: PropTypes.string,
//   previewUrl: PropTypes.string,
// };
