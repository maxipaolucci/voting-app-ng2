import { combineReducers } from 'redux';
import * as votting from './reducers/votting';

export interface IAppState {
  vottingModel? : votting.IVottingState;
}

export const APP_INITIAL_STATE : IAppState = {};


export default combineReducers<IAppState>({
  vottingModel: votting.voteReducer
});
