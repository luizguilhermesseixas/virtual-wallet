// Coloque aqui suas actions
const SAVED_EMAIL = 'SAVE_EMAIL';
const FETCH_SUCCESSFUL = 'FETCH_SUCCESSFUL';
const FETCH_START = 'FETCH_START';
const FETCH_FAILED = 'FETCH_FAILED';

const savedEmail = (state) => ({
  type: SAVED_EMAIL,
  payload: state.email,
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

export function fetchCurrencies() {
  return (dispatch) => {
    dispatch(fetchStart());
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => dispatch(fetchSuccessful(data)))
      .catch((error) => dispatch(fetchFailed(error)));
  };
}

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
};
