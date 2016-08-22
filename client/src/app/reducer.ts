import {Map, List} from 'immutable';

export interface IVote extends Map<string, any> {
  pair : List<string>,
  tally? : Map<string, number>
}

export interface IAppState extends Map<string, any> {
  movies? : List<string>,
  vote? : IVote,
  winner? : string
}

const INITIAL_STATE : IAppState = Map<string, any>();

const setState = (state, newState) => {
  return state.merge(newState);
}

export default (state : IAppState = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_STATE':
      return setState(state, action.state);
  }
  return state;
}
