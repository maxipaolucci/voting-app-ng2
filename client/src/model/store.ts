import { combineReducers } from 'redux';
import {IVoteState, voteReducer} from './reducers/vote';
import { List } from 'immutable';

export default combineReducers<IVoteState>({
  vote: voteReducer
});
