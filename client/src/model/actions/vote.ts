import { IAction } from './action';
import { IVottingState } from '../reducers/vote';
import { List } from 'immutable';

export const setState = (state: IVottingState) : IAction => {
  return { type: 'SET_STATE', payload: { state } };
}