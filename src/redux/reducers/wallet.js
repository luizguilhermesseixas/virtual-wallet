import {
/*   FETCH_FAILED,
  FETCH_START, */
  FETCH_SUCCESSFUL,
  SAVE_EXPENSES,
  REMOVE_EXPENSES,
  EDIT_EXPENSES,
  EDIT_SETUP,
  FINISH_EDIT,
} from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  errorMessage: '',
  /*   isFetching: false, */
  currencies: [],
  expenses: [],
  idToEdit: 0,
  editor: false,
  editSetup: false,
};

const removeAsk = (expense) => {
  const { value, currency, exchangeRates } = expense;
  const exchangeRate = exchangeRates[currency].ask;
  return (value * exchangeRate).toFixed(2);
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_SUCCESSFUL:
    return {
      ...state,
      currencies: Object.keys(action.payload).filter((currency) => currency !== 'USDT'),
    };
  case SAVE_EXPENSES:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        action.payload,
      ],
    };
  case REMOVE_EXPENSES:
    return {
      ...state,
      expenses: state.expenses.filter(({ id }) => id !== action.payload),
    };
  case EDIT_EXPENSES:
    return {
      ...state,
      editor: true,
      editSetup: true,
      idToEdit: action.payload,
    };
  case EDIT_SETUP:
    return {
      ...state,
      editSetup: false,
    };
  case FINISH_EDIT:
    return {
      ...state,
      editor: false,
      idToEdit: 0,
      expenses: state.expenses.map((expense) => (
        expense.id === action.expense.id ? action.expense : expense)),
      ask: (state.ask - removeAsk(
        state.expenses.find((expense) => expense.id === action.expense.id),
      )) + action.ask,
    };
  default:
    return state;
  }
};

export default wallet;

/*   case FETCH_FAILED:
return {
  ...state,
  isFetching: false,
  errorMessage: action.payload,
}; */

/*   case FETCH_START:
  return {
    ...state,
    isFetching: true,
  }; */
