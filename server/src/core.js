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

export function setEntries(state, entries) {
  return state.set('entries', List(entries));
}

export function next(state) {
  const entries = state.get('entries').concat(getWinner(state.get('vote')));
  return state.merge(Map({
    entries: entries.skip(2),
    vote: Map({
      pair: entries.take(2)
    })
  }));
}

export function vote(state, entry) {
  return state.updateIn(['vote', 'tally', entry], 0, tally => tally + 1);
}