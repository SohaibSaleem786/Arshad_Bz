// store.js
// import { createStore } from 'redux';
// import rootReducer from './Component/Dash_Before_Login/reducers';

// const store = createStore(rootReducer);

// export default store;



import { createStore, applyMiddleware } from 'redux';
import {thunk } from 'redux-thunk';
import rootReducer from './Redux/reducer';

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;