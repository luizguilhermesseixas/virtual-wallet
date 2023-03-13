import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../style.css';

class Table extends Component {
  render() {
    const {
      expenses,
    } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Moeda</th>
            <th>Moeda de conversão</th>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          <tr>

            <td>
              {expenses
                .map(({ exchangeRates, currency }) => (
                  exchangeRates[currency].name
                ))}
            </td>
            <td>
              {expenses
                .map(() => 'Real')}
            </td>
            <td>
              {expenses
                .map((expense) => (
                  expense.description
                ))}
            </td>
            <td>
              {expenses
                .map((expense) => expense.tag)}
            </td>
            <td>
              {expenses
                .map((expense) => expense.method)}
            </td>
            <td>
              {expenses
                .map((expense) => expense.value)}
            </td>
            <td>
              {expenses
                .map((expense) => (
                  expense.currency
                ))}
            </td>
            <td>
              {
                expenses.map(
                  ({ value, exchangeRates, currency }) => (
                    (exchangeRates[currency].ask * value).toFixed(2)
                  ),
                )
              }
            </td>
            <tr />
          </tr>
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps)(Table);
