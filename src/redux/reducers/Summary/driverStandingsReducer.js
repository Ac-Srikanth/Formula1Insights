const initialStandings = []


const driverStandingsReducer = (state = initialStandings, action) => {
    switch (action.type) {
        case 'GET_DRIVER_STANDINGS' : {
            return [...action.payload]
        }
        default:
            return state
    }
}

export default driverStandingsReducer