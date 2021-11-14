import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class Card extends Component {
  render() {
    const {
      artistId,
      artistName,
      collectionId,
      collectionName,
      collectionPrice,
      artworkUrl100,
      releaseDate,
      trackCount,
    } = this.props;

    return (
      <div key={ artistId }>
        <span>{artistId}</span>
        <p>{artistName}</p>
        <p>
          <Link
            to={ `/album/${collectionId}` }
            data-testid={ `link-to-album-${collectionId}` }
          >
            Id da coleção
          </Link>
        </p>
        <p>{collectionName}</p>
        <p>{collectionPrice}</p>
        <img src={ artworkUrl100 } alt={ artistName } />
        <p>{releaseDate}</p>
        <p>{trackCount}</p>
      </div>
    );
  }
}

Card.propTypes = {
  artistId: PropTypes.number.isRequired,
  artistName: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
  collectionName: PropTypes.string.isRequired,
  collectionPrice: PropTypes.number.isRequired,
  artworkUrl100: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  trackCount: PropTypes.number.isRequired,
};
