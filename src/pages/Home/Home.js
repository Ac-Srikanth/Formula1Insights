import React from 'react'
// import axios from 'axios'
import {connect} from 'react-redux'
import { Table, Typography } from 'antd';
import moment from 'moment'
import {findCode} from '../../helpers/helpers'
import {startGetSchedule} from '../../redux/actions/Summary/scheduleAction'
import {startGetDriverStandings} from '../../redux/actions/Summary/driverStandingsAction'
import {startGetConstructorStandings} from '../../redux/actions/Summary/constructorStandingsAction'
import Flag from 'react-world-flags'
import './Home.css'
const {Title} = Typography




class Home extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            year: 2020,
            data: [],
            driverData: [],
            constructorData: []
        }
    }

    componentDidMount() {       
        this.props.dispatch(startGetSchedule(this.props.season))
        this.props.dispatch(startGetDriverStandings(this.props.season))
        this.props.dispatch(startGetConstructorStandings(this.props.season))     
    }
    render() {
        // console.log(nationalities[0]['nationality'])        
        return (
            <div id="homeContainer">
                <Title className="heading">Season - {this.props.season}</Title>
                <Table 
                    columns={raceColumns} 
                    dataSource={this.props.schedule}
                    pagination={false}
                    size="small"                    
                    className="table-season"
                />
                <div className="secondary-tables">
                    <div>
                    <Title style={{'textAlign':'center'}} level={3}>Driver Standings</Title>
                        <Table
                        columns={driverColumns}
                        dataSource={this.props.driverStandings}
                        pagination={false}
                        size="small"
                        className="table-season">            
                        </Table>
                    </div>

                    <div>
                        <Title style={{'textAlign':'center'}} level={3}>Constructor Standings</Title>
                        <Table
                        columns = {constructorColumns}
                        dataSource={this.props.constructorStandings}
                        pagination = {false}
                        size="large"
                        className="table-season"></Table>
                    </div> 
                </div>
            </div>           
        )
    }
}

const raceColumns = [
    {
        title: 'Round',
        dataIndex: 'round',
        key: 'round',
        responsive: ['lg']
    },
    {
        title: 'Race Name',
        dataIndex: 'raceName',
        key: 'raceName'
    },
    {
        title: 'Circuit',
        responsive: ['lg'],
        render: (record) => {
            let countryCode = findCode('en_short_name', record.Circuit.Location.country)
            return (
                <React.Fragment>
                <Flag className="flag" code={countryCode} height='20' width='20' /> 
                {record.Circuit.circuitName}
                </React.Fragment>
                
            )
        }
       
    },
    {
        title: 'Date',
        render: (record) => moment(record.date).format('MMMM Do YYYY')
    },
    {
        title: 'Time',
        render: (record) => {
            return (
                record.time ? (moment(`${record.date} ${record.time}`).format('LT')): 'NA'
            )
        }
    }
]

const driverColumns = [
    {
        title: 'Position',
        dataIndex: 'position',
        key: 'position',
        responsive: ['lg']
    },
    {
        title: 'Driver',
        render: (record) => {
            let countryCode = findCode('nationality', record.Driver.nationality)
            return(
            <React.Fragment>           
                <Flag className="flag" code={countryCode} height='20' width='20' />           
                {record.Driver.givenName} {record.Driver.familyName}
            </React.Fragment> 
            )
           }
    },
    {
        title: 'Constructor',
        render: (record) => record.Constructors[0] ? record.Constructors[0].name: '-',
        responsive: ['lg']
    },
    {
        title: 'Points',
        dataIndex: 'points',
        key: 'positionText'
    },
    {
        title: 'Wins',
        dataIndex: 'wins',
        responsive: ['lg']
    }
]

const constructorColumns = [
    {
        title: 'Position',
        dataIndex: 'position',
        key: 'position',
        responsive: ['lg']
    },
    {
        title: 'Constructor',
        render: (record) => {
            let countryCode = findCode('nationality', record.Constructor.nationality)
            return (
                <React.Fragment>
                <Flag className="flag" code={countryCode} height='20' width='20' /> 
                {record.Constructor.name}
                </React.Fragment>
                
            )
            }
    },
    {
        title: 'Wins',
        dataIndex: 'wins',
        responsive: ['lg']
        
    },
    {
        title: 'Points',
        dataIndex: 'points'
    }
]

const mapStateToProps = (state) => {
    return {
        season: state.season,
        schedule: state.schedule,
        driverStandings: state.driverStandings,
        constructorStandings: state.constructorStandings
    }
}


export default connect(mapStateToProps)(Home)