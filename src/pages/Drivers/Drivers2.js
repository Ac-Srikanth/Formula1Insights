import React from 'react'
import ImageCard from '../../components/ImageCard/ImageCard'
import InfoCard from '../../components/InfoCard/InfoCard'
import axios from 'axios'
import {connect} from 'react-redux'
import { Select } from 'antd';
import { Table,  Button } from 'antd';
// import {seasonsArray} from '../../helpers/helpers'
import {startGetDrivers} from '../../redux/actions/driversAction'
import './Drivers.css'

const { Option } = Select;
// const {Title} = Typography



class Drivers extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            driver: '',
            selected: '',
            seasonYear: new Date().getFullYear(),
            tableData: [],
            wiki: ''
            
        }
    }

    componentDidMount() {
        this.props.dispatch(startGetDrivers(this.props.season))
    }

    handleSeasonChange = (value) => {
        this.setState({ seasonYear: value})
        this.props.dispatch(startGetDrivers(value))
    }

    handleDriverChange = (value) => {
        console.log(value[0])
        console.log(value[1].substring(value[1].lastIndexOf('/')+ 1))
        let driverid = value[1].split('/').pop()
        this.setState({selected: value[0]}, ()=> {
            axios.get(`https://ergast.com/api/f1/${this.props.season}/drivers/${this.state.selected}/results.json`)
            .then((response) => {
                console.log(response.data.MRData.RaceTable)
                this.setState({tableData: response.data.MRData.RaceTable.Races})
            })
            .catch((err) => {
                console.log(err)
            })
        })
        axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${driverid}`)
        .then((response) => {
            console.log(response)
            this.setState({wiki: response.data})
        })
    }

    getVictories =()=> {
        axios.get(`https://ergast.com/api/f1/${this.props.season}/drivers/${this.state.selected}/results/1.json`)
        .then((response) => {
            console.log(response.data.MRData.RaceTable)
            this.setState({tableData: response.data.MRData.RaceTable.Races})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    render() {
        const {drivers} = this.props
        console.log(drivers)
        return (
            <div id="driver-container-main">
                <div className="headings">                    
                    <h2>Season {this.props.season}</h2>               
                    <div className="options">                   
                        <Select 
                            showSearch 
                            onChange={this.handleDriverChange} 
                            placeholder="Search Drivers"
                            style={{width: 300}}                            
                            optionFilterProp="children" 
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {drivers.map((driver) => {
                                return (
                                    <Option key={driver.driverId} value={[driver.driverId, driver.url]}>{`${driver.givenName} ${driver.familyName}`}</Option>
                                )
                            })}
                        </Select>
                        <Button type="primary" onClick={this.getVictories}>Victories</Button>
                        </div>
                </div>
                {
                    this.state.wiki ? 
                        (
                            <div className="driver-container">
                                <ImageCard info={this.state.wiki}/> 
                                <InfoCard info={this.state.wiki}/>
                            </div>
                        )
                        : ''
                }
                <Table 
                    columns={driverColumns}
                    dataSource={this.state.tableData}
                    pagination={false}
                    size="small"
                    bordered="true"
                    className="table-season"
                />
            </div>
        )
    }
}

const driverColumns = [
    {
        title: 'RaceName',
        dataIndex: 'raceName'
    },
    {
        title: 'Round',
        dataIndex: 'round'
    },
    {
        title: 'Circuit',
        render: (record) => record.Circuit.circuitName
    },
    {
        title: 'Date',
        dataIndex: 'date'
    },
    {
        title: 'Constructor',
        render: (record) => record.Results[0].Constructor.name
    },
    {
        title: 'Position',
        render: (record) => record.Results[0].positionText
    },
    {
        title: 'Grid',
        render: (record) => record.Results[0].grid
    },
    {
        title: 'Points',
        render: (record) => record.Results[0].points
    },
    {
        title: 'Status',
        render: (record) => record.Results[0].status
    },
    {
        title: 'Fastest Lap',
        render: (record) => record.Results[0].FastestLap ? record.Results[0].FastestLap.Time.time: '-'
    }
]

const mapStateToProps = (state) => {
    return {
        season: state.season,
        drivers: state.drivers
    }
}

export default connect(mapStateToProps)(Drivers)