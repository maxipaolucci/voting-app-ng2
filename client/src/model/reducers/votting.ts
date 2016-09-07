import { List, Map, fromJS } from 'immutable';
import { IAction } from '../actions/action';

// Reducer state interface
export interface IVottingState extends Map<string, any> {
  items? : List<string>,
  vote? : Map<string, any>,
  winner? : string
}

// The initial state of this reducer
export const VOTTING_INITIAL_STATE : IVottingState = Map<string, any>();

/**
 * Set the state merging the current state with a new state as parameter
 * @param state (IVottingState). The current state
 * @param newState (any) . The new state. Should be castable to <IVottingState>
 * @returns {IVottingState} . The merged new state
 */
const setState = (state : IVottingState, newState: any) : IVottingState => {
  return <IVottingState>state.merge(<IVottingState>fromJS(newState));
};

/**
 * Votting Reducer. This is the state reducer for the votting app.
 * @param state (IVottingState) . The state to reduce
 * @param action (IAction) . The action dispached
 * @returns {IVottingState} . The returned state after applied an action
 */
export function voteReducer(state : IVottingState = VOTTING_INITIAL_STATE, action : IAction) : IVottingState  {
  switch (action.type) {

    case 'SET_STATE':
      return setState(state, action.payload.state);

    default:
      return state;
  }
}