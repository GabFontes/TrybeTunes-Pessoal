import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import Card from '../components/Card';

const INITIAL_STATE = {
  artistInput: '',
  artistName: '',
  onButtonDisabled: true,
  loading: false,
  loaded: false,
  result: [],
};

export default class Search extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.requestReturn = this.requestReturn.bind(this);

    this.state = {
      ...INITIAL_STATE,
    };
  }

  handleChange({ target: { value } }) {
    this.setState({
      artistInput: value,
      artistName: value,
    }, this.buttonValidator);
  }

  async requestReturn(artist) {
    this.setState({
      loading: true,
    });
    const result = await searchAlbumsAPI(artist);
    this.setState({
      loading: false,
      result,
      artistInput: '',
      loaded: true,
    });
  }

  validatorDisplay() {
    const { artistName, result } = this.state;
    if (result.length === 0) return <span>Nenhum álbum foi encontrado</span>;
    if (result.length > 0) return <p>{`Resultado de álbuns de: ${artistName}`}</p>;
  }

  buttonValidator() {
    const { artistInput } = this.state;
    const minLength = 2;
    if (artistInput.length >= minLength) {
      this.setState({
        onButtonDisabled: false,
      });
    } else {
      this.setState({
        onButtonDisabled: true,
      });
    }
  }

  render() {
    const {
      artistInput,
      onButtonDisabled,
      loading,
      result,
      loaded,
    } = this.state;
    return (
      loading ? (<Loading />) : (
        <div data-testid="page-search">
          <Header />
          <form>
            <label htmlFor="search-artist-button">
              <input
                id="search-artist-button"
                data-testid="search-artist-input"
                value={ artistInput }
                onChange={ this.handleChange }
              />
            </label>
            <button
              type="submit"
              disabled={ onButtonDisabled }
              data-testid="search-artist-button"
              onClick={ () => this.requestReturn(artistInput) }
            >
              Pesquisar
            </button>
          </form>
          {loaded && this.validatorDisplay()}
          {result.map((obj) => <Card key={ obj.artistInput } { ...obj } />)}
        </div>
      )
    );
  }
}
