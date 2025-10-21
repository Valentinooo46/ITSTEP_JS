import React, { useState, useEffect } from 'react';
import CalculatorStore from './CalculatorStore';
import { CalculatorActions }  from './CalculatorActions';
 
const renderNode = (node, depth = 0) => {
  const indent = { marginLeft: `${depth * 20}px` };
 
  switch (node.type) {
    case 'OperatorNode':
      return (
        <div style={indent} key={Math.random()}>
          <strong>Operator:</strong> {node.op}
          {node.args.map((arg, i) => (
            <div key={i}>{renderNode(arg, depth + 1)}</div>
          ))}
        </div>
      );
    case 'ConstantNode':
      return (
        <div style={indent} key={Math.random()}>
          <strong>Value:</strong> {node.value}
        </div>
      );
    case 'ParenthesisNode':
      return (
        <div style={indent} key={Math.random()}>
          <strong>Parenthesis</strong>
          {renderNode(node.content, depth + 1)}
        </div>
      );
    default:
      return (
        <div style={indent} key={Math.random()}>
          <strong>{node.type}</strong>
        </div>
      );
  }
};
 
const Calculator = () => {
  const [state, setState] = useState(CalculatorStore.getState());
 
  useEffect(() => {
    const update = () => setState(CalculatorStore.getState());
    CalculatorStore.addChangeListener(update);
    return () => CalculatorStore.removeChangeListener(update);
  }, []);
 
  const handleInputChange = (e) => CalculatorActions.updateInput(e.target.value);
  const handleEvaluate = () => CalculatorActions.evaluate();
 
  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <h2>Flux  Calculator</h2>
      <input
        type="text"
        value={state.input}
        onChange={handleInputChange}
        style={{ width: '300px', fontSize: '16px' }}
      />
      <button onClick={handleEvaluate} style={{ marginLeft: '10px' }}>
        Обчислити
      </button>
      {state.error && <div style={{ color: 'red' }}>{state.error}</div>}
      {state.result !== null && <div><strong>Результат:</strong> {state.result}</div>}
      {/* {state.tree && (
        <div style={{ marginTop: '20px' }}>
          <h4>Дерево виразу:</h4>
          {renderNode(state.tree)}
        </div>
      )} */}
    </div>
  );
};
 
export default Calculator;