import { FETCH_FAILED, FETCH_START, FETCH_SUCCESSFUL } from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  errorMessage: '',
  isFetching: false,
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const wallet = (state = INITIAL_STATE, action) => {
  console.log(action.payload);
  switch (action.type) {
  case FETCH_START:
    return {
      ...state,
      isFetching: true,
    };

  case FETCH_SUCCESSFUL:
    return {
      ...state,
      isFetching: false,
      currencies: Object.keys(action.payload),
    };

  case FETCH_FAILED:
    return {
      ...state,
      isFetching: false,
      errorMessage: action.payload,
    };

  default:
    return state;
  }
};

export default wallet;
