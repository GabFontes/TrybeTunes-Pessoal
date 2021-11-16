import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

export default class MusicCard extends Component {
  constructor() {
    super();

    this.favorites = this.favorites.bind(this);

    this.state = {
      loading: false,
      checked: false,
    };
  }

  async favorites({ target: { checked } }) {
    const { music } = this.props;
    this.setState({
      loading: true,
      checked,
    });

    await addSong(music);

    this.setState({
      loading: false,
    });
  }

  render() {
    const { music: { trackName, previewUrl, trackId } } = this.props;
    const { loading, checked } = this.state;
    return (
      loading ? (<Loading />) : (
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
              onChange={ this.favorites }
              checked={ checked }
            />
          </label>
        </div>
      )
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
};
