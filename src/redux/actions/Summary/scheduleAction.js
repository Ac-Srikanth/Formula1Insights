import axios from 'axios'

export const getSchedule = (schedule) => {
    return {type: 'GET_SCHEDULE', payload: schedule}
}

export const startGetSchedule = (year) => {
    return((dispatch) => {
        axios.get(`http://ergast.com/api/f1/${year}.json`)
        .then((response) => {
            let schedule = response.data.MRData.RaceTable.Races
            console.log('Schedule', schedule)
            dispatch(getSchedule(schedule))
        })
        .catch((err) =>{
            console.log(err)
        })
    })
}

