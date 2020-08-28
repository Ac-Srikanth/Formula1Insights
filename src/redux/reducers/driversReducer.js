const driverInitialState = []

const driverReducer = (state=driverInitialState, action) =>{
    switch(action.type) {
        case 'GET_DRIVERS' : 
            return [...action.payload]

        default :
            return [...state]
    }
}

export default driverReducer