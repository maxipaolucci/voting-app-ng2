import { List } from 'immutable';
import { IAction } from '../actions/action';

// export interface IVote extends Map<string, any> {
//   pair : List<string>,
//   tally? : Map<string, number>
// }
//
// export interface IAppState extends Map<string, any> {
//   movies? : List<string>,
//   vote? : IVote,
//   winner? : string
// }
//
// const INITIAL_STATE : IAppState = Map<string, any>();

export interface IVote {
  id: number;
  completed: boolean;
  text: string;
}

export interface IVoteState extends List<IVote> { }

export const INITIAL_STATE = IVoteState([
  {
    text: 'Use Redux',
    completed: false,
    id: 0
  }
]);



const setState = (state : IVoteState, newState: IVoteState) => {
  return state.merge(List.of(newState));
};

export function voteReducer(state : IVoteState = INITIAL_STATE, action : IAction) : IVoteState {
  switch (action.type) {

    case 'SET_STATE':
      return setState(state, action.payload.state);

    default:
      return state;
  }
}