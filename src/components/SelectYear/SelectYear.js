import React from 'react'
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux'
import { Select } from 'antd';
import {seasonAction} from '../../redux/actions/seasonAction'
import {startGetConstructors} from '../../redux/actions/constructorAction'
import {startGetCircuits} from '../../redux/actions/circuitAction'
import {seasonsArray} from '../../helpers/helpers'
import {startGetSchedule} from '../../redux/actions/Summary/scheduleAction'
import {startGetDriverStandings} from '../../redux/actions/Summary/driverStandingsAction'
import {startGetConstructorStandings} from '../../redux/actions/Summary/constructorStandingsAction'
import {startGetDrivers} from '../../redux/actions/driversAction'
import {startGetRaces} from '../../redux/actions/racesAction'
const { Option } = Select;


const SelectYear = (props) => {

    const handleSeasonChange = (value) => {
        console.log(value)
        props.dispatch(seasonAction(value))
        props.dispatch(startGetConstructors(value))
        if (props.location.pathname === '/'){            
            props.dispatch(startGetSchedule(value))
            props.dispatch(startGetDriverStandings(value))
            props.dispatch(startGetConstructorStandings(value))
        } else if (props.location.pathname === '/drivers'){
            props.dispatch(startGetDrivers(value))
        } else if (props.location.pathname === '/results'){
            props.dispatch(startGetRaces(value))
        } else if (props.location.pathname === '/map' || props.location.pathname === '/circuits'){
              props.dispatch(startGetCircuits(value))
          }
    }

    // console.log(props.location.pathname)
    return (
        <Select 
            defaultValue={props.season}
            style={{width: 120}} 
            onChange={handleSeasonChange}
        >
            {seasonsArray.map((year) => {
                return (
                    <Option key={year} value={year}>{year}</Option>
                )
            })}
        </Select>
    )
}

const mapStateToProps = (state) => {
    return {
        season: state.season
    }
}

export default withRouter(connect(mapStateToProps)(SelectYear))