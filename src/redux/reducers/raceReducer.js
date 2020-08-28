const racesInitialState = []

const raceReducer = (state=racesInitialState, action) => {
    switch (action.type) {
        case 'GET_RACES': {
            return [...action.payload]
        }

        default: {
            return [...state]
        }
    }
}

export default raceReducer