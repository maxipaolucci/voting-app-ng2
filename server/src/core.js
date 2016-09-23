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

export function setItems(state, items) {
  return state.set('items', List(items))
      .set('originalItems', List(items));
}

export function next(state) {
  const items = state.get('items').concat(getWinner(state.get('vote')));

  if (items.count() == 1) {
    return state.set('winner', items.first())
        .remove('items')
        .remove('vote');
  } else {
    return state.merge(Map({
      items: items.skip(2),
      vote: Map({
        pair: items.take(2)
      })
    }));
  }
}

export function vote(state, item, voter) {

  //TODO update this method to increment or decrememnt tally depending on the voter changed the last selection or is a new vote

  if (!state.hasIn(['votedBy', voter])) {
    return state.updateIn(['tally', item], 0, tally => tally + 1)
        .updateIn(['votedBy', voter], '', voted => item);
  }

  // let newState = state.updateIn(['votedBy', voter], '', voted => item); //we has
  // newState.updateIn(['tally', item], 0, tally => tally + 1)
}

export function restart(state) {
  let newState = state.remove('winner')
      .remove('items')
      .remove('vote');

  newState = setItems(newState, state.get('originalItems'));
  return next(newState);
}