import { SAVED_EMAIL } from '../actions';

// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  email: '', // string que armazena o email da pessoa usuária
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVED_EMAIL: {
    return {
      email: action.payload,
    };
  }
  default:
    return state;
  }
};

export default user;
