import {createStore, combineReducers, applyMiddleware} from 'redux';
import { machineReducer } from '../reducers/machineReducer/machineReducer';
import { complaintReducer } from '../reducers/complaintReducer/complaintReducer';
import { maintenanceReducer } from '../reducers/maintenanceReducer/maintenanceReducer';
import { currentUserReducer } from '../reducers/currentUserReducer/currentUserReducer';
import { otherModelsReducer } from '../reducers/otherModelsReducer/otherModelsReducer';
import { idRetrieveReducer } from '../reducers/idRetrieveReducer/idRetrieveReducer';
// import { unauthorizedReducer } from '../reducers/unauthorizedReducer/unauthorizedReducer';
import {thunk} from 'redux-thunk';

const rootReducer = combineReducers({
    machine: machineReducer,
    complaint: complaintReducer,
    maintenance: maintenanceReducer,
    user: currentUserReducer,
    otherModels: otherModelsReducer,
    // token: currentUserReducer
    id: idRetrieveReducer,
    // unauthorized: unauthorizedReducer,
})

export const store = createStore(rootReducer, (applyMiddleware(thunk)))