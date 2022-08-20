import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

export default class MusicCard extends Component {
  constructor() {
    super();

    this.favorites = this.favorites.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      loading: false,
      checkedInput: false,
    };
  }

  componentDidMount() {
    const { checked } = this.props;
    (() => { // Créditos ao Hugo Daniel.
      this.setState({ checkedInput: checked });
    })();
  }

  handleChange({ target }) {
    const { checked } = target.checked;
    this.setState({
      checkedInput: checked,
    });
  }

  async favorites() {
    const { music } = this.props;
    this.setState({
      loading: true,
    });

    await addSong(music);

    this.setState({
      loading: false,
    });
  }

  render() {
    const { music: { trackName, previewUrl, trackId } } = this.props;
    const { loading, checkedInput } = this.state;
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
              onClick={ this.handleChange }
              checked={ checkedInput }
              name="checkedInput"
            />
          </label>
        </div>
      )
    );
  }
}

MusicCard.propTypes = {
  checked: PropTypes.bool.isRequired,
  music: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
};
