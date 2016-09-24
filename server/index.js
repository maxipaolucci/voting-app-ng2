import makeStore from './src/model/store';
import {startServer} from './src/server'


//create a store
export const store = makeStore();
startServer(store);

//set the initial data to the Redux Store
store.dispatch({
  type: 'SET_ITEMS',
  payload : { items: require('./entries.json') }
});

//Dispatch the next action to generate the first voting pair to display on the clients.
store.dispatch({type: 'NEXT'});