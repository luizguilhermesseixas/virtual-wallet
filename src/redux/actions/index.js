// Coloque aqui suas actions
const SAVED_EMAIL = 'SAVE_EMAIL';

const savedEmail = (state) => ({
  type: SAVED_EMAIL,
  payload: state.email,
});

export { savedEmail, SAVED_EMAIL };
