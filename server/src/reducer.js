import {setItems, next, vote, restart, INITIAL_STATE} from './core';

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_ITEMS':
      return setItems(state, action.payload.items);
    case 'NEXT':
      return next(state);
    case 'VOTE':
      return state.update('vote', voteState => vote(voteState, action.payload.item, action.payload.voter));
    case 'RESTART':
      return restart(state);
  }
  return state;
}