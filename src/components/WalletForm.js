import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveExpenses, finishEditSetup, finishEdit } from '../redux/actions';
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

  expenseEditor = () => {
    const { expenses, idToEdit, dispatch } = this.props;
    const expenseToEdit = expenses[idToEdit];
    const { value, description, currency, method, tag } = expenseToEdit;
    this.setState({
      value, description, currency, method, tag,
    });
    dispatch(finishEditSetup());
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  };

  onClickFunction = async (editor) => {
    const {
      dispatch,
      idToEdit,
    } = this.props;
    const exchangeRates = await fetchApi();

    const newObj = {
      ...this.state,
      exchangeRates,
    };

    const objEdit = {
      ...this.state,
      id: idToEdit,
      exchangeRates,
    };

    if (editor) {
      dispatch(finishEdit(objEdit));
    } else {
      dispatch(saveExpenses(newObj));
    }
    this.setState((prevState) => ({
      id: prevState.id + 1,
    }));
    this.setState((prevState) => ({
      ...prevState,
      value: '',
      description: '',
    }));
  };

  render() {
    const {
      currencies,
      editor,
      editSetup,
    } = this.props;

    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;

    if (editSetup) {
      this.expenseEditor();
    }
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
            onClick={ () => this.onClickFunction(editor) }
          >
            {editor ? 'Editar despesa ' : 'Adicionar despesa'}
          </button>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  editor: PropTypes.bool.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  idToEdit: PropTypes.number.isRequired,
  editSetup: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  editor: state.wallet.editor,
  expenses: state.wallet.expenses,
  idToEdit: state.wallet.idToEdit,
  editSetup: state.wallet.editSetup,
});

export default connect(mapStateToProps)(WalletForm);
