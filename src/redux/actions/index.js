import fetchApi from '../../services';

// Coloque aqui suas actions
const SAVED_EMAIL = 'SAVE_EMAIL';
const FETCH_SUCCESSFUL = 'FETCH_SUCCESSFUL';
const FETCH_START = 'FETCH_START';
const FETCH_FAILED = 'FETCH_FAILED';
const SAVE_EXPENSES = 'SAVE_EXPENSES';

const savedEmail = (state) => ({
  type: SAVED_EMAIL,
  payload: state.email,
});

const saveExpenses = (state) => ({
  type: SAVE_EXPENSES,
  payload: state,
});

const fetchStart = () => ({
  type: FETCH_START,
});

const fetchSuccessful = (data) => ({
  type: FETCH_SUCCESSFUL,
  payload: data,
});

const fetchFailed = (error) => ({
  type: FETCH_FAILED,
  payload: error,
});

export const fetchCurrencies = () => async (dispatch) => {
  dispatch(fetchStart());
  const data = await fetchApi();
  dispatch(fetchSuccessful(data));
};

/* export async function fetchCurrencies() {
  return async (dispatch) => {
    dispatch(fetchStart());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => {
        dispatch(fetchSuccessful(data));
        return data;
      })
      .catch((error) => dispatch(fetchFailed(error)));
  };
} */

/* const fetchApi = () => async () => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    return data;
  } catch {
    return new Error();
  }
}; */

/* console.log(fetchApi()); */

export {
  savedEmail,
  SAVED_EMAIL,
  fetchStart,
  FETCH_START,
  fetchSuccessful,
  FETCH_SUCCESSFUL,
  fetchFailed,
  FETCH_FAILED,
  saveExpenses,
  SAVE_EXPENSES,
};
