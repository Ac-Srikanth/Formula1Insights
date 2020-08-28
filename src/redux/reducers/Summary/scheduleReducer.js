const scheduleInitalState = []

const scheduleReducer = (state = scheduleInitalState, action) => {
    switch (action.type) {
        case 'GET_SCHEDULE' :
            return [...action.payload]
        default:
            return state
    }
}

export default scheduleReducer
