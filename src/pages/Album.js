import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';

export default class Album extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.match.params.id,
      results: [],
    };
  }

  async componentDidMount() {
    const { id } = this.state;
    const results = await getMusics(id);
    this.putResultsInState(results);
  }

  putResultsInState(albums) {
    this.setState({
      results: albums,
    });
  }

  render() {
    const {
      results,
    } = this.state;
    console.log(results);
    return (
      !results.length ? (<Loading />) : (
        <div data-testid="page-album">
          <Header />
          <h2 data-testid="artist-name">{results[0].artistName}</h2>
          <h2 data-testid="album-name">{results[0].collectionName}</h2>
          {results.map((currentMusic, index) => (
            <MusicCard key={ index } music={ currentMusic } />
          ))}
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
