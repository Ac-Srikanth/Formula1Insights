import  {nationalities} from '../assets/nationalities'
 
 
 export const findCode = (key, nationality) =>{
        let codes = nationalities.filter((obj) => {
            if( obj[key] == nationality){
                return obj['alpha_2_code']
            }
        })

        if(codes.length > 0){
            return codes[0]['alpha_2_code']
        } else {
            console.log('codelength', codes.length)
            console.log('Nationality', nationality)
            // console.log('codes', codes)
            return 'GB'
        }
        
}


const getSeasons = function() {
        let array = []
        let inaugralSeason = 1950
        const date = new Date()
        const currentSeason =  date.getFullYear()
        for(let i = inaugralSeason; i<=currentSeason; i++) {
            array.push(i)
        }        
        return array
}

export const seasonsArray = getSeasons()

