import { EventEmitter } from 'events';
import AppDispatcher from './AppDispatcher';
import { parse } from 'mathjs';
 
let input = '';
let result = null;
let tree = null;
let error = null;
 
const CalculatorStore = new EventEmitter();
 
CalculatorStore.getState = () => ({ input, result, tree, error });
 
CalculatorStore.emitChange = () => CalculatorStore.emit('change');
CalculatorStore.addChangeListener = (callback) => CalculatorStore.on('change', callback);
CalculatorStore.removeChangeListener = (callback) => CalculatorStore.removeListener('change', callback);
 
AppDispatcher.register((action) => {
  switch (action.actionType) {
    case 'UPDATE_INPUT':
      input = action.input;
      result = null;
      tree = null;
      error = null;
      CalculatorStore.emitChange();
      break;
 
    case 'EVALUATE':
      try {
        const node = parse(input);
        result = node.evaluate();
        tree = node;
        error = null;
      } catch (e) {
        result = null;
        tree = null;
        error = 'Помилка у виразі';
      }
      CalculatorStore.emitChange();
      break;
  }
});
 
export default CalculatorStore;


