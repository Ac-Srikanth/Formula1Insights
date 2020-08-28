import axios from 'axios'

export const getDrivers = (drivers) => {
    return {type: 'GET_DRIVERS', payload: drivers}
}

export const startGetDrivers = (year) => {
    return ((dispatch) => {
        axios.get(`https://ergast.com/api/f1/${year}/drivers.json`)
        .then((response) => {
            let drivers = response.data.MRData.DriverTable.Drivers
            console.log(drivers)
            dispatch(getDrivers(drivers))
        })
    })
}