import axios from 'axios'

export const getRaces = (races) => {
    return {type: 'GET_RACES', payload:races}
}


export const startGetRaces = (year) => {
    return((dispatch) => {
        axios.get(`https://ergast.com/api/f1/${year}.json`)
        .then((response)=> {
            console.log('MAIN', response.data.MRData.RaceTable.Races)
            const Races = response.data.MRData.RaceTable.Races
            dispatch(getRaces(Races))
        })
        .catch((error) => {
            console.log('ERROR', error)
        })
    })
}