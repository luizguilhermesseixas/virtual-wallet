import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies } from '../redux/actions';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  render() {
    const {
      email,
    } = this.props;
    return (
      <>
        <Header email={ email } />
        <WalletForm currencies />
        <Table />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Wallet);
