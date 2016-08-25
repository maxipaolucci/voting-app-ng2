import { IAction } from './action';

export const setState = (state: any) : IAction => {
  return { type: 'SET_STATE', payload: { state } };
}