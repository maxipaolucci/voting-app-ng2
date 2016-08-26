import {setItems, next, vote, INITIAL_STATE} from './core';

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_ITEMS':
      return setItems(state, action.items);
    case 'NEXT':
      return next(state);
    case 'VOTE':
      return state.update('vote', voteState => vote(voteState, action.entry));
  }
  return state;
}