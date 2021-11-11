import React, { Component } from 'react'
import { createUser } from '../services/userAPI'
import Loading from '../components/Loading';
import { BrowserRouter, Redirect } from 'react-router-dom';

const INITIAL_STATE = {
  name: '',
  isButtonDisabled: true,
  loading: false,
  redirect: false,
}

export default class Login extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.loading = this.loading.bind(this);

    this.state = {
      ...INITIAL_STATE,
    }
  }

  handleChange({ target }) {
    const value = target.value;
    this.setState({
      name: value
    }, this.buttonValidator)
  }

  buttonValidator() {
    const { name } = this.state;
    if (name.length >= 3) {
      this.setState({
        isButtonDisabled: false,
      })
    } else {
      this.setState({
        isButtonDisabled: true,
      })
    }
  }

  async loading(name) {
    this.setState({
      loading: true,
    })
    await createUser(name);
    this.setState({
      redirect: true,
      loading: false,
    })
  }

  render() {
    const {
      name,
      isButtonDisabled,
      loading,
      redirect,
    } = this.state;
    return (
      loading ? ( <Loading /> ) : (
        redirect ? <Redirect to="/search" /> : 
      <div data-testid="page-login">
        <form>
          <label htmlFor="login-name-input">
            Nome
            <input
              value={name}
              onChange={this.handleChange}
              name="login-name-input"
              id="login-name-input"
              type="text"
              data-testid="login-name-input" />
          </label>
          <button
            type="submit"
            disabled={isButtonDisabled}
            onClick={ () => this.loading({ name: name })}
            data-testid="login-submit-button">
            Entrar
          </button>
        </form>
      </div>
      )
    )
  }
}
