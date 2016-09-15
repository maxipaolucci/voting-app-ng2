import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import makeStore from '../src/store';

describe('store', () => {

  it('is a Redux store configured with the correct reducer', () => {
    const store = makeStore();
    expect(store.getState()).to.equal(Map());

    store.dispatch({
      type: 'SET_ITEMS',
      payload : { items: ['Trainspotting', '28 Days Later'] }
    });
    expect(store.getState()).to.equal(fromJS({
      items: ['Trainspotting', '28 Days Later'],
      originalItems: ['Trainspotting', '28 Days Later'],
    }));
  });

});