import React, { useReducer } from "react";
import "./styles.css";

const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate'
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`
      };
    case ACTIONS.CLEAR:
      return {};
    case ACTIONS.DELETE_DIGIT:
      return {
        ...state,
        currentOperand: state.currentOperand?.slice(0, -1) || ""
      };
    case ACTIONS.CHOOSE_OPERATION:
      return {
        ...state,
        operation: payload.operation,
        previousOperand: state.currentOperand,
        currentOperand: ""
      };
    case ACTIONS.EVALUATE:
      // Simplified evaluation logic for now
      return {
        ...state,
        previousOperand: null,
        operation: null,
        currentOperand: eval(`${state.previousOperand} ${state.operation} ${state.currentOperand}`)
      };
    default:
      return state;
  }
}

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {
    currentOperand: "",
    previousOperand: "",
    operation: null
  });

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">
          {previousOperand} {operation}
        </div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      <button className="span-two" onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>DEL</button>
      <button onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation: "+" } })}>+</button>
      <button onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: "1" } })}>1</button>
      <button onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: "2" } })}>2</button>
      <button onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: "3" } })}>3</button>
      <button onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation: "*" } })}>*</button>
      <button onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: "4" } })}>4</button>
      <button onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: "5" } })}>5</button>
      <button onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: "6" } })}>6</button>
      <button onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation: "-" } })}>-</button>
      <button onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: "7" } })}>7</button>
      <button onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: "8" } })}>8</button>
      <button onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: "9" } })}>9</button>
      <button onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation: "/" } })}>/</button>
      <button onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: "." } })}>.</button>
      <button onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: "0" } })}>0</button>
      <button className="span-two" onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</button>
    </div>
  );
}

export default App;
