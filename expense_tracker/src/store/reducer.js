import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage';
import entitiesReducer from './entities';
import { createFilter, createBlacklistFilter } from 'redux-persist-transform-filter';

const authBlacklist = createBlacklistFilter(
    'auth',
    ['user.isLoading', 'user.loginError'],
);

const entitiesBlacklist = createBlacklistFilter(
    'entities',
    [
        
        
    ],
);

const rootPersistConfig = {
    key: 'root',
    storage: AsyncStorage,
    transforms: [
        authBlacklist,
        entitiesBlacklist
    ]
}

const appReducer = combineReducers({
    entities: entitiesReducer,
})

const rootReducer = (state, action) => {
    // if (action.type === 'USER_LOGOUT') {
    //     // for all keys defined in your persistConfig(s)
    //     AsyncStorage.removeItem('persist:root')
    //     // storage.removeItem('persist:otherKey')

    //     // return state as undefined means or = return initial state
    //     state = undefined;
    // }
    return appReducer(state, action);
};

export default persistReducer(rootPersistConfig, rootReducer)
