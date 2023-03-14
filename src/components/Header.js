import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const {
      email,
      expenses,
    } = this.props;
    return (
      <header>
        <span data-testid="email-field">{email}</span>
        {' '}
        <span data-testid="total-field">
          { expenses.map(
            ({ value, exchangeRates, currency }) => exchangeRates[currency].ask * value,
          )
            .reduce((acc, curr) => acc + curr, 0).toFixed(2) }
        </span>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default connect(mapStateToProps)(Header);
