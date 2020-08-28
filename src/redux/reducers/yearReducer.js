const yearInitialState = new Date().getFullYear()

const yearReducer = (state = yearInitialState, action) => {
    switch (action.type) {
        case 'GET_YEAR' :
            return action.payload
         default:
             return state
    }
}

export default yearReducer