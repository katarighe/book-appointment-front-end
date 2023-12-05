// store.js
 import { combineReducers, createStore } from 'redux';
 import DoctorDetailReducer from './doctorDetailSlice'; 



const reducer = combineReducers({
    DoctorDetailReducer,
});

const store = createStore(reducer);

export default store;
