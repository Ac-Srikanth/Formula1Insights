import { Select } from 'antd';
import { Table } from 'antd';
import React from 'react'
import {connect} from 'react-redux'

import { startGetResults} from '../../redux/actions/resultAction'
import {startGetRaces} from '../../redux/actions/racesAction'

const { Option } = Select;

class Results extends React.Component {
    constructor(props) {
        super(props)
        this.state = {            
            race: '',
            raceRound: 0
        }
    }
    
    componentDidMount() {
        this.props.dispatch(startGetRaces(this.props.season))
    }

    handleRaceChange = (raceName) => {
        const {dispatch, races, season} = this.props;
        const race = races.find((race) => race.raceName === raceName);
        this.setState({ race: race.raceName });
        dispatch(startGetResults(race.round, season));
    }

    render(){
        const {races, results} = this.props
        return (
            <div style={{'overflow': 'hidden'}}>
                <div className="headings">
                    <h2>Race Results - {this.state.race}({this.props.season})</h2>              
                    <Select style={{width: 300}} onChange={this.handleRaceChange}>
                        {races.map((race, index) => (
                            <Option key={index} value={race.raceName}>{race.raceName}</Option>
                          )
                        )}
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
        render: (record) => (
            `${record.Driver.givenName} ${record.Driver.familyName}`
        )
    },
    {
        title: 'Constructor',
        render: (record) => (
            `${record.Constructor.name}`
        )
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
        render: (record) => (
            record.FastestLap ? (record.FastestLap.Time.time) : ''
        )
    },
    {
        title: 'Lap Number',
        render: (record) => (
            record.FastestLap ? (record.FastestLap.lap) : ''
        )
    }
]

const mapStateToProps = (state) => {
    return {        
        races: state.races.map((race) => ({raceName: race.raceName, round: race.round})),
        results: state.results,
        season: state.season
    }
}

export default connect(mapStateToProps)(Results)