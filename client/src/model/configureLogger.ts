import * as Immutable from 'immutable';
import { __DEVMODE__ } from "../constants/config";


const createLogger = require('redux-logger');
const logger = createLogger({
  level: 'info',
  collapsed: true,
  predicate: (getState : any, action : any) => __DEVMODE__ === true,
  stateTransformer: (state : any) => {
    let newState = {};
    for (var i of Object.keys(state)) {
      if (Immutable.Iterable.isIterable(state[i])) {
        newState[i] = state[i].toJS();
      } else {
        newState[i] = state[i];
      }
    };
    return newState;
  }
});

export default logger;