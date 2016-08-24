import { combineReducers } from 'redux';
import * as votting from './reducers/vote';
import { List } from 'immutable';

export interface IAppState {
  vottingModel? : votting.IVottingState;
}

export default combineReducers<IAppState>({
  vottingModel: votting.voteReducer
});
