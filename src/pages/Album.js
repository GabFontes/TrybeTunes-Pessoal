import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class Album extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.match.params.id,
      results: [],
      loading: false,
      favorites: [],
    };
  }

  async componentDidMount() {
    const { id } = this.state;
    const results = await getMusics(id);
    this.putResultsInState(results);
    this.displayLoading();
  }

  putResultsInState(albums) {
    this.setState({
      results: albums,
    });
  }

  async displayLoading() {
    this.setState({
      loading: true,
    });

    const favorites = await getFavoriteSongs();

    this.setState({
      loading: false,
      favorites,
    });
  }

  render() {
    const {
      results,
      loading,
      favorites,
    } = this.state;
    console.log(favorites);
    return (
      loading ? (<Loading />) : (
        <div>
          <Header />
          {results.length && (
            <div data-testid="page-album">
              <h2 data-testid="artist-name">{results[0].artistName}</h2>
              <h2 data-testid="album-name">{results[0].collectionName}</h2>
              {results.map((currentMusic, index) => (
                currentMusic.previewUrl ? ( // Créditos ao Léo.
                  <MusicCard key={ index } music={ currentMusic } />
                ) : null
              ))}
            </div>
          )}
        </div>
      )
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: {
      id: PropTypes.string,
    },
  }).isRequired,
};
