import {List, Map} from 'immutable';

function getWinner(vote) {
  if (!vote) {
    return [];
  }
  const [a, b] = vote.get('pair');
  const aVotes = vote.getIn(['tally', a], 0);
  const bVotes = vote.getIn(['tally', b], 0);
  if (aVotes > bVotes) {
    return [a];
  } else if (aVotes < bVotes) {
    return [b];
  } else {
    return [a, b];
  }
}

export const INITIAL_STATE = Map();

export function setEntries(state, entries) {
  return state.set('entries', List(entries));
}

export function next(state) {
  const entries = state.get('entries').concat(getWinner(state.get('vote')));

  if (entries.count() == 1) {
    return state.set('winner', entries.first())
        .remove('entries')
        .remove('vote');
  } else {
    return state.merge(Map({
      entries: entries.skip(2),
      vote: Map({
        pair: entries.take(2)
      })
    }));
  }
}

export function vote(state, entry) {
  return state.updateIn(['tally', entry], 0, tally => tally + 1);
}