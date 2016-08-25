import { List, Map, fromJS } from 'immutable';
import { IAction } from '../actions/action';


export interface IVottingState extends Map<string, any> {
  movies? : List<string>,
  vote? : string,
  winner? : string
}

export const VOTTING_INITIAL_STATE : IVottingState = Map<string, any>();

//Privete methods
const setState = (state : IVottingState, newState: any) => {
  return <IVottingState>state.merge(fromJS(newState));
};

//Public reducer
export function voteReducer(state : IVottingState = VOTTING_INITIAL_STATE, action : IAction) : IVottingState  {
  switch (action.type) {

    case 'SET_STATE':
      return setState(state, action.payload.state);

    default:
      return state;
  }
}