import React, { Component } from 'react';
import PropTypes from 'prop-types';

class WalletForm extends Component {
  render() {
    const {
      currencies,
    } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="expenses">
            Valor
            <input
              id="expenses"
              type="number"
              data-testid="value-input"
            />
          </label>
          <label htmlFor="description">
            Descrição
            <input
              id="description"
              type="number"
              data-testid="description-input"
            />
          </label>
          <select
            data-testid="currency-input"
          >
            {
              currencies
                .map((currencie) => (<option key={ currencie }>{currencie}</option>))
            }
          </select>
          <select data-testid="method-input">
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
          <select data-testid="tag-input">
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </form>
      </div>
    );
  }
}

/* .filter((currencie) => currencie !== 'USDT') */

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf.isRequired,
};

export default WalletForm;
