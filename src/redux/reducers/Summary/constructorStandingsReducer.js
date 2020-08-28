const initialStandings = []

const constructorStandingsReducer = (state=initialStandings, action) => {
    switch (action.type){
        case 'GET_CONSTRUCTOR_STANDINGS':
            return [...action.payload]
        default:
            return state
    }
}

export default constructorStandingsReducer