const circuitInitialState = []

const circuitReducer = (state=circuitInitialState, action) => {
    switch (action.type) {
        case 'GET_CIRCUITS':
            return [...action.payload]
        default:
            return state
    }
}

export default circuitReducer