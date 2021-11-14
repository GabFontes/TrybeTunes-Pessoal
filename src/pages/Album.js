import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

export default class Album extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.match.params.id,
      results: [],
      collectionName: '',
      artistName: '',
    };
  }

  async componentDidMount() {
    const { id } = this.state;
    const results = await getMusics(id);
    this.music(results);
    this.putResultsInState(results);
  }

  putResultsInState(albums) {
    this.setState({
      results: albums,
    });
  }

  music(results) {
    results.map((currentMusic) => (
      this.setState({
        artistName: currentMusic.artistName,
        collectionName: currentMusic.collectionName,
      })
    ));
  }

  render() {
    const {
      results,
      collectionName,
      artistName,
    } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h2 data-testid="artist-name">{artistName}</h2>
        <h2 data-testid="album-name">{collectionName}</h2>
        {results.map((currentMusic, index) => (
          <MusicCard key={ index } music={ currentMusic } />
        ))}
      </div>
    );
  }
}

// Album.propTypes = {
//   match: PropTypes.objectOf(PropTypes.object).isRequired,
// };
