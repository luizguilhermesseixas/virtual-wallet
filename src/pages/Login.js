import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { savedEmail } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    senha: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  };

  validateBtn = () => {
    const { email, senha } = this.state;
    const minCharacters = 6;
    const regex = /\S+@\S+\.\S+/;
    const validateEmail = regex.test(email);
    const validatePassword = senha.length >= minCharacters;
    return (
      !(validateEmail && validatePassword)
    );
  };

  render() {
    const {
      dispatch,
      history,
    } = this.props;

    const {
      email,
      senha,
    } = this.state;

    return (
      <div>
        <form>
          <input
            onChange={ this.handleChange }
            type="email"
            data-testid="email-input"
            placeholder="insira seu e-mail"
            name="email"
            value={ email }
          />
          <input
            onChange={ this.handleChange }
            type="password"
            minLength="6"
            data-testid="password-input"
            placeholder="insira sua senha"
            name="senha"
            value={ senha }
          />
          <button
            type="submit"
            disabled={ this.validateBtn() }
            onClick={ (e) => {
              e.preventDefault();
              dispatch(savedEmail(this.state));
              history.push('/carteira');
            } }
          >
            Entrar

          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.object,
  dispatch: PropTypes.func,
}.isRequired;

export default connect(null)(Login);
