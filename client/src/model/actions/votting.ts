import { IAction } from './action';

export const setState = (state: any) : IAction => {
  return { type: 'SET_STATE', payload: { state } };
}

export const vote = (item : string) : IAction => {
  return { type: 'VOTE', payload: { item }, meta: { remote : true } }
}