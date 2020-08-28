const constructorInitialState = []

const constructorReducer = (state=constructorInitialState, action) => {
    switch (action.type) {
        case 'GET_CONSTRUCTORS' :
            return [...action.payload]
        default:
            return state
    }
}

export default constructorReducer