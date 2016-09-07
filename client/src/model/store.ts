import { combineReducers } from 'redux';
import { routerReducer } from 'ng2-redux-router';
import * as votting from './reducers/votting';

// App state interface
export interface IAppState {
  vottingModel? : votting.IVottingState,
  router?: string
}

// the initial state of the entire app
export const APP_INITIAL_STATE : IAppState = {};

// Combine reducers function. Here we combine all the reducers in our app in just one rootReducer
export default combineReducers<IAppState>({
  vottingModel: votting.voteReducer,
  router: routerReducer
});
