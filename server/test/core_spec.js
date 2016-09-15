import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import {setItems, next, vote, restart} from '../src/core';

describe('application logic', () => {

  describe('setItems', () => {

    it('adds the items to the state', () => {
      const state = Map();
      const items = List.of('Trainspotting', '28 Days Later');
      const nextState = setItems(state, items);
      expect(nextState).to.equal(Map({
        items: List.of('Trainspotting', '28 Days Later')
      }));
    });

    it('converts to inmutable', () => {
      const state = Map();
      const items = ['Trainspotting', '28 Days Later'];
      const nextState = setItems(state, items);
      expect(nextState).to.equal(Map({
        items: List.of('Trainspotting', '28 Days Later')
      }));
    });

  });

  describe('next', () => {

    it('takes the next two items under vote', () => {
      const state = Map({
        items: List.of('Trainspotting', '28 Days Later', 'Sunshine')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        items: List.of('Sunshine'),
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later')
        })
      }));
    });

    it('puts winner of current vote back to items', () => {
      const state = Map({
        items: List.of('Sunshine'),
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            'Trainspotting': 1
          })
        })
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        items: List.of(),
        vote: Map({
          pair: List.of('Sunshine', 'Trainspotting')
        })
      }));
    });

    it('puts winner of current vote back to items when both has tally', () => {
      const state = Map({
        items: List.of('Sunshine'),
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            'Trainspotting': 1,
            '28 Days Later': 2
          })
        })
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        items: List.of(),
        vote: Map({
          pair: List.of('Sunshine', '28 Days Later')
        })
      }));
    });

    it('puts both movies back to items when there is a draw', () => {
      const state = Map({
        items: List.of('Sunshine'),
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            'Trainspotting': 2,
            '28 Days Later': 2
          })
        })
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        items: List.of('28 Days Later'),
        vote: Map({
          pair: List.of('Sunshine', 'Trainspotting')
        })
      }));
    });

    it('marks winner when just one entry left', () => {
      const state = Map({
        items: List.of(),
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            'Trainspotting': 3,
            '28 Days Later': 2
          })
        })
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        winner: 'Trainspotting'
      }));
    });

    it('marks winner when just one entry is set', () => {
      const state = Map({
        items: List.of('Trainspotting')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        winner: 'Trainspotting'
      }));
    });
  });

  describe('vote', () => {

    it('creates a tally for the voted entry', () => {
      const state = Map({
        pair: List.of('Trainspotting', '28 Days Later')
      });
      const nextState = vote(state, 'Trainspotting');
      expect(nextState).to.equal(Map({
        pair: List.of('Trainspotting', '28 Days Later'),
        tally: Map({
          'Trainspotting': 1
        })
      }));
    });

    it('increment a tally for the voted entry', () => {
      const state = Map({
        pair: List.of('Trainspotting', '28 Days Later'),
        tally: Map({
          'Trainspotting': 3,
          '28 Days Later': 2
        })
      });
      const nextState = vote(state, 'Trainspotting');
      expect(nextState).to.equal(Map({
        pair: List.of('Trainspotting', '28 Days Later'),
        tally: Map({
          'Trainspotting': 4,
          '28 Days Later': 2
        })
      }));
    });

  });
  
  describe('restart', () => {
    it('restart when we have a winner', () => {
      const state = Map({
        winner: 'Trainspotting'
      });
      const nextState = restart(state);
      expect(nextState).to.equal(Map({
        items: fromJS(require('../entries.json'))
      }));
    });

    it('restart in the middle of the voting process', () => {
      const state = Map({
        items: List.of('Sunshine'),
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            'Trainspotting': 1,
            '28 Days Later': 2
          })
        })
      });
      const nextState = restart(state);
      expect(nextState).to.equal(Map({
        items: fromJS(require('../entries.json'))
      }));
    });
  });

});