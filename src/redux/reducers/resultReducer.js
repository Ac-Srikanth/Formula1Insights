const resultInitialState = []

const resultReducer = (state=resultInitialState, action) => {
    switch (action.type) {
        // case 'GET_RACES': {
        //     return [...action.payload]
        // }
        case 'GET_RESULTS': {
            return [...action.payload]
        }

    default: {
        return [...state]
    }

    }

}

export default resultReducer