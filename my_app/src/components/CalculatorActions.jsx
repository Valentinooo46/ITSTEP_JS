import AppDispatcher from './AppDispatcher';

export const CalculatorActions = {
  updateInput(input) {
    AppDispatcher.dispatch({
      actionType: 'UPDATE_INPUT',
      input
    });
  },

  evaluate() {
    AppDispatcher.dispatch({
      actionType: 'EVALUATE'
    });
  }
};
