import axios from 'axios'


export const getCircuits = (circuits) => {
    return {type: 'GET_CIRCUITS', payload: circuits}
}

export const startGetCircuits = (year) => {
    return((dispatch) =>{
        axios.get(`https://ergast.com/api/f1/${year}/circuits.json`)
        .then((response) => {
            console.log('CIRCUITS', response.data.MRData.CircuitTable.Circuits)
            let circuits = response.data.MRData.CircuitTable.Circuits
            dispatch(getCircuits(circuits))
        })
        .catch((err) => {
            console.log(err)
        })
    })
}