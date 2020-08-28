import axios from 'axios'



export const getConstructors = (constructors) => {
    return {type: 'GET_CONSTRUCTORS', payload:constructors}
}

export const startGetConstructors = (year) => {
    return((dispatch) => {
        axios.get(`https://ergast.com/api/f1/${year}/constructors.json`)
        .then((response) => {
            console.log(response.data.MRData.ConstructorTable.Constructors)
            let constructors = response.data.MRData.ConstructorTable.Constructors
            dispatch(getConstructors(constructors))
        })
    })
}