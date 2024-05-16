import { createStore } from 'redux';
import reducer from './reducer/DataProvider';

const store = createStore(reducer);

export default store;
