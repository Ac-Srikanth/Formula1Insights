import axios from 'axios'

export const getDriverStandings = (results) => {
    return {type: 'GET_DRIVER_STANDINGS', payload: results}
}

export const startGetDriverStandings = (year) => {
    return((dispatch) => {
        axios.get(`https://ergast.com/api/f1/${year}/driverStandings.json`)
        .then((response) => {
            let results = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings
            console.log('Driver Standings', results)
            dispatch(getDriverStandings(results))
        })
        .catch((err) =>{
            console.log(err)
        })
    })
}
