import {createStore, combineReducers, applyMiddleware} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk'
import resultReducer from '../reducers/resultReducer'
import raceReducer from '../reducers/raceReducer'
import driverReducer from '../reducers/driversReducer'
import seasonReducer from '../reducers/yearReducer'
import constructorReducer from '../reducers/constructorReducer'
import circuitReducer from '../reducers/circuitReducer'
import scheduleReducer from '../reducers/Summary/scheduleReducer'
import driverStandingsReducer from '../reducers/Summary/driverStandingsReducer'
import constructorStandingsReducer from '../reducers/Summary/constructorStandingsReducer'

const configureStore = () => {
    return createStore(combineReducers({
        results: resultReducer,
        races: raceReducer,
        drivers: driverReducer,
        season: seasonReducer ,
        constructors: constructorReducer,
        schedule: scheduleReducer,
        circuits: circuitReducer,
        driverStandings: driverStandingsReducer,
        constructorStandings:constructorStandingsReducer
    }), composeWithDevTools(applyMiddleware(thunk)))
}

export default configureStore