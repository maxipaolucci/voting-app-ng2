import { IAction } from './action';

export const setState = (state: any) : IAction => {
  return { type: 'SET_STATE', payload: { state } };
};

export const vote = (item : string, voter : string) : IAction => {
  return { type: 'VOTE', payload: { item, voter }, meta: { remote : true } }
};

export const next = () : IAction => {
  return { type: 'NEXT', meta: { remote : true } }
};

export const restart = () : IAction => {
  return { type: 'RESTART', meta: { remote : true } }
};

export const clientRestart = () : IAction => {
  return { type: 'CLIENT_RESTART' }
};