import axios from 'axios'



export const getResults = (results) => {
    return {type: 'GET_RESULTS', payload:results}
}



export const startGetResults = (round, year) => {
    return((dispatch) => {
        axios.get(`https://ergast.com/api/f1/${year}/${round}/results.json`)
        .then((response) => {
            if(response.data.MRData.RaceTable.Races.length > 0) {
                console.log('Results', response.data.MRData.RaceTable.Races[0]['Results'])
                const Results = response.data.MRData.RaceTable.Races[0]['Results']
                dispatch(getResults(Results))
            }
            else {
                dispatch(getResults([]))
            }
           
        })
    })

}