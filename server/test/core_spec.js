import {List, Map} from 'immutable';
import {expect} from 'chai';

import {setEntries, next, vote} from '../src/core';

describe('application logic', () => {

  describe('setEntries', () => {

    it('adds the entries to the state', () => {
      const state = Map();
      const entries = List.of('Trainspotting', '28 Days Later');
      const nextState = setEntries(state, entries);
      expect(nextState).to.equal(Map({
        entries: List.of('Trainspotting', '28 Days Later')
      }));
    });

    it('converts to inmutable', () => {
      const state = Map();
      const entries = ['Trainspotting', '28 Days Later'];
      const nextState = setEntries(state, entries);
      expect(nextState).to.equal(Map({
        entries: List.of('Trainspotting', '28 Days Later')
      }));
    });

  });

  describe('next', () => {

    it('takes the next two entries under vote', () => {
      const state = Map({
        entries: List.of('Trainspotting', '28 Days Later', 'Sunshine')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        entries: List.of('Sunshine'),
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later')
        })
      }));
    });

    it('puts winner of current vote back to entries', () => {
      const state = Map({
        entries: List.of('Sunshine'),
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            'Trainspotting': 1
          })
        })
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        entries: List.of(),
        vote: Map({
          pair: List.of('Sunshine', 'Trainspotting')
        })
      }));
    });

    it('puts winner of current vote back to entries when both has tally', () => {
      const state = Map({
        entries: List.of('Sunshine'),
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
        entries: List.of(),
        vote: Map({
          pair: List.of('Sunshine', '28 Days Later')
        })
      }));
    });

    it('puts both movies back to entries when there is a draw', () => {
      const state = Map({
        entries: List.of('Sunshine'),
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
        entries: List.of('28 Days Later'),
        vote: Map({
          pair: List.of('Sunshine', 'Trainspotting')
        })
      }));
    });

    it('marks winner when just one entry left', () => {
      const state = Map({
        entries: List.of(),
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
        entries: List.of('Trainspotting')
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

});