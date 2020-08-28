import React from 'react'
import {connect} from 'react-redux'
import { Select } from 'antd';
import { Table } from 'antd';
import { startGetResults} from '../../redux/actions/resultAction'
import {startGetRaces} from '../../redux/actions/racesAction'

const { Option } = Select;
// const {Title} = Typography


class Results extends React.Component {
    constructor(props) {
        super(props)
        this.state = {            
            race: '',
            raceRound: 0
        }
    }
    
    handleRaceChange = (value) => {
        console.log(value) //race round
        this.setState({ race: value[1] })
        this.props.dispatch(startGetResults(value[0], this.props.season))
    }    

    componentDidMount() {
        this.props.dispatch(startGetRaces(this.props.season))
    }

    render(){
        const {races, results} = this.props
        console.log('results', results)       
        return (
            <div style={{'overflow': 'hidden'}}>
                <div className="headings">
                    <h2>Race Results - {this.state.race}({this.props.season})</h2>              
                    <Select style={{width: 300}}  onChange={this.handleRaceChange}>
                        {races.map((race, index) => {
                            return (
                                <Option key={index} value={[race.round, race.raceName]}>{race.raceName}</Option>
                            )
                        })}
                    </Select>
                </div>                
                <Table 
                    columns={resultsColumns}
                    dataSource={results}
                    pagination={false}
                    size="small"
                    className="table-season"
                />
            </div>
            
        )
    }
}

const resultsColumns = [
    {
       title: 'Position',
       dataIndex: 'position',
       key: 'position'      
    },
    {
        title: 'Points',
        dataIndex:'points',
        key: 'points'
    },
    {
        title: 'Driver',
        render: (record) => {
            return(
            `${record.Driver.givenName} ${record.Driver.familyName}`
            )}
    },
    {
        title: 'Constructor',
        render: (record) => {
            return(
                `${record.Constructor.name}`
            )
        }
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'number'
    },
    {
        title: 'Laps',
        dataIndex: 'laps',
    },
    {
        title: 'FastestLap',
        render: (record) => {
            return (
                record.FastestLap ? (record.FastestLap.Time.time): ''
            )
        }
    },
    {
        title: 'Lap Number',
        render: (record) => {
            return (
                record.FastestLap ? (record.FastestLap.lap) : ''
            )
        }
    }
]

const mapStateToProps = (state) => {
    return {        
        races: state.races.map((race) => {
            return {raceName: race.raceName, round: race.round}
        }),
        results: state.results,
        season: state.season
    }
}

export default connect(mapStateToProps)(Results)