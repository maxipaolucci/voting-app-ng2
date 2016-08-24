import { List, Map, fromJS } from 'immutable';
import { IAction } from '../actions/action';


export interface IVottingState extends Map<string, any> {
  movies? : List<string>,
  vote? : string,
  winner? : string
}

export const INITIAL_STATE : IVottingState = Map<string, any>({ vote : 'maxi'});

const setState = (state : IVottingState, newState: any) => {
  return <IVottingState>state.merge(fromJS(newState));
};

export function voteReducer(state : IVottingState = INITIAL_STATE, action : IAction) : IVottingState  {
  switch (action.type) {

    case 'SET_STATE':
      return setState(state, action.payload.state);

    default:
      return state;
  }
}