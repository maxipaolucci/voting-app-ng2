import makeStore from './src/store';
import {startServer} from './src/server'


//create a store
export const store = makeStore();
startServer(store);

store.dispatch({
  type: 'SET_ITEMS',
  payload : { items: require('./entries.json') }
});
store.dispatch({type: 'NEXT'});