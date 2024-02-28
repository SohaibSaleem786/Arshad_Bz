import { combineReducers } from 'redux';
import {
  FETCH_ITEM_REQUEST,
  FETCH_ITEM_SUCCESS,
  FETCH_ITEM_FAILURE,
  FETCH_CATEGORY_REQUEST,
  FETCH_CATEGORY_SUCCESS,
  FETCH_CATEGORY_FAILURE,
  FETCH_ORDERLIST_REQUEST,
  FETCH_ORDERLIST_SUCCESS,
  FETCH_ORDERLIST_FAILURE,
} from './action';


const itemReducer = (state = { loading: false, data: null, error: null }, action) => {
  switch (action.type) {
    case FETCH_ITEM_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_ITEM_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: null };
    case FETCH_ITEM_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};




const categoryReducer = (state = { loading: false, data: null, error: null }, action) => {
  switch (action.type) {
    case FETCH_CATEGORY_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_CATEGORY_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: null };
    case FETCH_CATEGORY_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};


const orderlistReducer = (state = { loading: false, data: null, error: null }, action) => {
  switch (action.type) {
    case FETCH_ORDERLIST_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_ORDERLIST_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: null };
    case FETCH_ORDERLIST_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
 
    item: itemReducer,
    category: categoryReducer,
    orderlist: orderlistReducer,

 
});

export default rootReducer;
