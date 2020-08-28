import {createStore, combineReducers, applyMiddleware} from 'redux'
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
    const store = createStore(combineReducers({
        results: resultReducer,
        races: raceReducer,
        drivers: driverReducer,
        season: seasonReducer ,
        constructors: constructorReducer,
        schedule: scheduleReducer,
        circuits: circuitReducer,
        driverStandings: driverStandingsReducer,
        constructorStandings:constructorStandingsReducer
    }), applyMiddleware(thunk))
    return store
}

export default configureStore