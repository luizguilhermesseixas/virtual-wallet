import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveExpenses } from '../redux/actions';
import fetchApi from '../services';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  };

  onClickFunction = async () => {
    const {
      dispatch,
    } = this.props;
    const response = await fetchApi();
    const newObj = {
      ...this.state,
      exchangeRates: response,
    };
    dispatch(saveExpenses(newObj));
    this.setState((prevState) => ({
      id: prevState.id + 1,
    }), () => this.setState({
      value: '',
      description: '',
    }));
  };

  render() {
    const {
      currencies,
    } = this.props;

    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="value">
            Valor
            <input
              onChange={ this.handleChange }
              name="value"
              value={ value }
              id="value"
              type="number"
              data-testid="value-input"
            />
          </label>
          <label htmlFor="description">
            Descrição
            <input
              onChange={ this.handleChange }
              name="description"
              id="description"
              value={ description }
              type="text"
              data-testid="description-input"
            />
          </label>
          <select
            data-testid="currency-input"
            name="currency"
            onChange={ this.handleChange }
            value={ currency }
          >
            {
              currencies
                .map((eachCurrency) => (
                  <option
                    value={ eachCurrency }
                    key={ eachCurrency }
                  >
                    {eachCurrency}
                  </option>
                ))
            }
          </select>
          <select
            value={ method }
            name="method"
            onChange={ this.handleChange }
            data-testid="method-input"
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
          <select
            value={ tag }
            name="tag"
            onChange={ this.handleChange }
            data-testid="tag-input"
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
          <button
            type="button"
            onClick={ this.onClickFunction }
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
