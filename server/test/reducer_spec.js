import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/model/reducer';

describe('reducer', () => {

  it('handles undefined initial state as an empty Map', () => {
    const action = {type: 'SET_ITEMS', payload : { items: ['Trainspotting'] } };
    const nextState = reducer(undefined, action);

    expect(nextState).to.equal(fromJS({
      items: ['Trainspotting'],
      originalItems: ['Trainspotting']
    }));
  });

  it('handles SET_ITEMS', () => {
    const initialState = Map();
    const action = {type: 'SET_ITEMS', payload : { items: ['Trainspotting']} };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      items: ['Trainspotting'],
      originalItems: ['Trainspotting']
    }));
  });

  it('handles NEXT', () => {
    const initialState = fromJS({
      items: ['Trainspotting', '28 Days Later']
    });
    const action = {type: 'NEXT'};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later']
      },
      items: []
    }));
  });

  it('handles VOTE', () => {
    const initialState = fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later']
      },
      items: []
    });
    const action = {type: 'VOTE', payload : { item: 'Trainspotting', voter : 'maxi'} };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {Trainspotting: 1},
        votedBy: Map({
          'maxi' : 'Trainspotting'
        })
      },
      items: []
    }));
  });

  it('can be used with reduce', () => {
    const actions = [
      {type: 'SET_ITEMS', payload : { items: ['Trainspotting', '28 Days Later']} },
      {type: 'NEXT'},
      {type: 'VOTE', payload : { item: 'Trainspotting', voter: 'maxi'} },
      {type: 'VOTE', payload : { item: '28 Days Later', voter: 'fefi'} },
      {type: 'VOTE', payload : { item: 'Trainspotting', voter: 'lesi'} },
      {type: 'NEXT'}
    ];
    const finalState = actions.reduce(reducer, Map());

    expect(finalState).to.equal(fromJS({
      winner: 'Trainspotting',
      originalItems: ['Trainspotting', '28 Days Later']
    }));
  });

});