import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

const INITIAL_STATE = {
  loading: true,
  name: '',
};

export default class Header extends Component {
  constructor() {
    super();

    this.getName = this.getName.bind(this);

    this.state = {
      ...INITIAL_STATE,
    };
  }

  componentDidMount() {
    this.getName();
  }

  async getName() {
    const obj = await getUser();
    const { name } = obj;
    this.setState({
      loading: false,
      name,
    });
  }

  render() {
    const { name, loading } = this.state;
    return (
      loading ? (<Loading />) : (
        <header data-testid="header-component">
          <h3 data-testid="header-user-name">{name}</h3>
          <ul>
            <li>
              <Link data-testid="link-to-search" to="/search">
                Search
              </Link>
            </li>
            <li>
              <Link data-testid="link-to-favorites" to="/favorites">
                Favorites
              </Link>
            </li>
            <li>
              <Link data-testid="link-to-profile" to="/profile">
                Profile
              </Link>
            </li>
          </ul>

        </header>
      )
    );
  }
}
