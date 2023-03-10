import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies } from '../redux/actions';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  render() {
    const {
      currencies,
      email,
      /*       isFetching, */
    } = this.props;
    console.log(currencies);
    return (
      <>
        <Header email={ email } />
        <WalletForm currencies={ currencies } />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  isFetching: state.wallet.isFetching,
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf.isRequired,
/*   isFetching: PropTypes.bool.isRequired, */
};

export default connect(mapStateToProps)(Wallet);
