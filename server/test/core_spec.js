import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import {setItems, next, vote, restart} from '../src/model/core';

describe('application logic', () => {

  describe('setItems', () => {

    it('adds the items to the state', () => {
      const state = Map();
      const items = List.of('Trainspotting', '28 Days Later');
      const nextState = setItems(state, items);
      expect(nextState).to.equal(Map({
        items: List.of('Trainspotting', '28 Days Later'),
        originalItems: List.of('Trainspotting', '28 Days Later')
      }));
    });

    it('converts to inmutable', () => {
      const state = Map();
      const items = ['Trainspotting', '28 Days Later'];
      const nextState = setItems(state, items);
      expect(nextState).to.equal(Map({
        items: List.of('Trainspotting', '28 Days Later'),
        originalItems: List.of('Trainspotting', '28 Days Later')
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
          }),
          votedBy: Map({
            'maxi' : 'Trainspotting'
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
          }),
          votedBy: Map({
            'maxi' : 'Trainspotting',
            'fefi' : '28 Days Later',
            'jesi' : '28 Days Later'
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
          }),
          votedBy: Map({
            'maxi' : 'Trainspotting',
            'juan' : 'Trainspotting',
            'fefi' : '28 Days Later',
            'jesi' : '28 Days Later'
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
          }),
          votedBy: Map({
            'maxi' : 'Trainspotting',
            'juan' : 'Trainspotting',
            'pipo' : 'Trainspotting',
            'fefi' : '28 Days Later',
            'jesi' : '28 Days Later'
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
      const nextState = vote(state, 'Trainspotting', 'maxi');
      expect(nextState).to.equal(Map({
        pair: List.of('Trainspotting', '28 Days Later'),
        tally: Map({
          'Trainspotting': 1
        }),
        votedBy: Map({
          'maxi' : 'Trainspotting'
        })
      }));
    });

    it('increment a tally for the voted entry', () => {
      const state = Map({
        pair: List.of('Trainspotting', '28 Days Later'),
        tally: Map({
          'Trainspotting': 3,
          '28 Days Later': 2
        }),
        votedBy: Map({
          'jesi' : '28 Days Later',
          'juan' : '28 Days Later',
          'pepe' : 'Trainspotting',
          'tito' : 'Trainspotting',
          'fefi' : 'Trainspotting'
        })
      });
      const nextState = vote(state, 'Trainspotting', 'maxi');
      expect(nextState).to.equal(Map({
        pair: List.of('Trainspotting', '28 Days Later'),
        tally: Map({
          'Trainspotting': 4,
          '28 Days Later': 2
        }),
        votedBy: Map({
          'jesi' : '28 Days Later',
          'juan' : '28 Days Later',
          'pepe' : 'Trainspotting',
          'tito' : 'Trainspotting',
          'fefi' : 'Trainspotting',
          'maxi' : 'Trainspotting'
        })
      }));
    });

    it('change vote from a user who already voted', () => {
      const state = Map({
        pair: List.of('Trainspotting', '28 Days Later'),
        tally: Map({
          'Trainspotting': 3,
          '28 Days Later': 2
        }),
        votedBy: Map({
          'jesi' : '28 Days Later',
          'juan' : '28 Days Later',
          'pepe' : 'Trainspotting',
          'tito' : 'Trainspotting',
          'fefi' : 'Trainspotting'
        })
      });
      const nextState = vote(state, 'Trainspotting', 'jesi');
      expect(nextState).to.equal(Map({
        pair: List.of('Trainspotting', '28 Days Later'),
        tally: Map({
          'Trainspotting': 4,
          '28 Days Later': 1
        }),
        votedBy: Map({
          'jesi' : 'Trainspotting',
          'juan' : '28 Days Later',
          'pepe' : 'Trainspotting',
          'tito' : 'Trainspotting',
          'fefi' : 'Trainspotting'
        })
      }));
    });

    it('discard vote from a user who already voted the same entry before', () => {
      const state = Map({
        pair: List.of('Trainspotting', '28 Days Later'),
        tally: Map({
          'Trainspotting': 3,
          '28 Days Later': 2
        }),
        votedBy: Map({
          'jesi' : '28 Days Later',
          'juan' : '28 Days Later',
          'pepe' : 'Trainspotting',
          'tito' : 'Trainspotting',
          'fefi' : 'Trainspotting'
        })
      });
      const nextState = vote(state, 'Trainspotting', 'tito');
      expect(nextState).to.equal(Map({
        pair: List.of('Trainspotting', '28 Days Later'),
        tally: Map({
          'Trainspotting': 3,
          '28 Days Later': 2
        }),
        votedBy: Map({
          'jesi' : '28 Days Later',
          'juan' : '28 Days Later',
          'pepe' : 'Trainspotting',
          'tito' : 'Trainspotting',
          'fefi' : 'Trainspotting'
        })
      }));
    });

  });
  
  describe('restart', () => {
    it('restart when we have a winner', () => {
      const state = Map({
        winner: 'Trainspotting',
        originalItems: List.of('Trainspotting', '28 Days Later')
      });
      const nextState = restart(state);
      expect(nextState).to.equal(Map({
        items: List(),
        originalItems: List.of('Trainspotting', '28 Days Later'),
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later')
        })
      }));
    });

    it('restart in the middle of the voting process', () => {
      const state = Map({
        items: List.of('Sunshine'),
        originalItems: List.of('Trainspotting', '28 Days Later','Sunshine'),
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            'Trainspotting': 1,
            '28 Days Later': 2
          }),
          votedBy: Map({
            'jesi' : '28 Days Later',
            'juan' : '28 Days Later',
            'pepe' : 'Trainspotting'
          })
        })
      });
      const nextState = restart(state);
      expect(nextState).to.equal(Map({
        items: List.of('Sunshine'),
        originalItems: List.of('Trainspotting', '28 Days Later','Sunshine'),
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later')
        })
      }));
    });
  });

});