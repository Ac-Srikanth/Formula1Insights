import axios from 'axios'

export const getConstructorStandings = (results) => {
    return {type: 'GET_CONSTRUCTOR_STANDINGS', payload: results}
}

export const startGetConstructorStandings = (year) => {
    return((dispatch) => {
        axios.get(`http://ergast.com/api/f1/${year}/constructorStandings.json`)
        .then((response) => {
            console.log('ConstructorStandings', response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings)
            let constructorData = response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings
            dispatch(getConstructorStandings(constructorData))
        })
        .catch((err) =>{
            console.log(err)
            dispatch(getConstructorStandings([]))
        })
    })
}