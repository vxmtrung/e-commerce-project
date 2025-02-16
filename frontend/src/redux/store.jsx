import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
// Dynamically import all index.jsx files from redux folders
let reducers = {};
let reducerContainer = {};

const context = require.context('../', true, /redux\.jsx$/);
context.keys().forEach((key) => {
    const storeModule = context(key).default;
    if (storeModule.redux) {
        const { redux } = storeModule;
        if (redux.parent && redux.reducers) {
            if (!reducerContainer[redux.parent]) {
                reducerContainer[redux.parent] = {};
            }
            reducerContainer[redux.parent] = Object.assign(reducerContainer[redux.parent], redux.reducers);
        }
        else {
            Object.keys(redux.reducers).forEach(key => reducers[key] = redux.reducers[key]);
        }
    }
});


Object.keys(reducerContainer).forEach((key) => {
    reducers[key] = combineReducers(reducerContainer[key]);
});
// Combine all reducers
const rootReducer = combineReducers(reducers);

//persist config
const createNoopStorage = () => {
    return {
        getItem: (_key) => Promise.resolve(null),
        setItem: (_key, value) => Promise.resolve(value),
        deleteItem: (_key) => Promise.resolve()
    };
};
const persistConfig = {
    key: 'root',
    storage: typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage(),
    whitelist: ['systemState'],
    stateReconciler: autoMergeLevel2,
};
const pReducer = persistReducer(persistConfig, rootReducer);
// Create the Redux store using configureStore and persist to store systemState
export const store = configureStore({
    reducer: pReducer,
    middleware: () => [thunk],
});
export const persistor = persistStore(store);