import React from 'react'
import ImageCard from '../../components/ImageCard/ImageCard'
import InfoCard from '../../components/InfoCard/InfoCard'
import axios from 'axios'
// import SelectYear from '../../components/SelectYear/SelectYear'
import {connect} from 'react-redux'
import {Table} from 'antd'
import { Select } from 'antd';
import {startGetConstructors} from '../../redux/actions/constructorAction'
import './Constructors.css'

const { Option } = Select;


class Constructors extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            results: '',
            wiki: ''
        }
    }
    componentDidMount() {
        this.props.dispatch(startGetConstructors(this.props.season))
    }
    handleConstructorChange = (value) => {
        console.log(value)
        let constructorId = value[1].substring(value[1].lastIndexOf('/')+ 1)
        axios.get(`http://ergast.com/api/f1/${this.props.season}/constructors/${value[0]}/results.json`)
        .then((response) => {
            console.log(response.data.MRData.RaceTable.Races)
            let results = response.data.MRData.RaceTable.Races
            this.setState({ results: results })
        })
        axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${constructorId}`)
        .then((response) => {
            console.log(response)
            this.setState({wiki: response.data})
        })
    }
    render() {
        const {constructors, season} = this.props        
        return (
            <div id="constructors-container">
                <div className="headings">
                    <h2>Season {season}</h2>
                        <div className="options">
                            {/*<SelectYear />*/}
                            <Select 
                                showSearch 
                                placeholder="Search Constructors"  
                                style={{width: 300}}
                                optionFilterProp="children"
                                onChange={this.handleConstructorChange} 
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {constructors.map((constructor, index) => {
                                    return (
                                        <Option 
                                            key={index} 
                                            value={[constructor.constructorId, constructor.url]}
                                            >
                                            {`${constructor.name}`}
                                        </Option>
                                    )
                                })}
                            </Select>
                        </div>
                </div>
               {
                   this.state.wiki ? 
                   (
                    <div className="constructor-container">
                        <ImageCard info={this.state.wiki}/> 
                        <InfoCard info={this.state.wiki}/>
                    </div>
                   )
                   : ""
               }
               <Table
                    size="small"
                    columns={columns}
                    dataSource={this.state.results}                
                    pagination={false}
                    bordered="true"
                    className="table-season"
               />               
            </div>
        )
    }
}

const columns = [
    {
        title: 'RaceName',
        dataIndex: 'raceName'
    },
    {
        title: 'Circuit',
        render: (record) => record['Circuit']['circuitName']
    },
    {
        title: 'Drivers',
        render: (record) => {
            return (
                record.Results.map((driver, index) => {
                    return (
                        <p key={index}  className="ant-table-cell">{`${driver.Driver.givenName} ${driver.Driver.familyName}`}</p>
                    )
                })
            )
        }
    },
    {
        title: 'Grid',
        render: (record) => {
            return (
                record.Results.map((driver, index) => {
                    return (
                        <p key={index} className="ant-table-cell">{driver.grid}</p>
                    )
                })
            )
        }
    },
    {
        title: 'Position',
        render: (record) => {
            return (
                record.Results.map((driver, index) => {
                    return (
                        <p key={index} className="ant-table-cell">{driver.positionText}</p>
                    )
                })
            )
        }
    },
    {
        title: 'Points',
        render: (record) => {
            return (
                record.Results.map((driver, index) => {
                    return (
                        <p key={index}  className="ant-table-cell">{driver.points}</p>
                    )
                })
            )
        }
    },
    {
        title: 'Status',
        render: (record) => {
            return (
                record.Results.map((driver, index) => {
                    return (
                        <p key={index}  className="ant-table-cell">{driver.status}</p>
                    )
                })
            )
        }
    },
    {
        title: 'Laps',
        render: (record) => {
            return (
                record.Results.map((driver, index) => {
                    return (
                        <p key={index} className="ant-table-cell">{driver.laps}</p>
                    )
                })
            )
        }
    }

]

const mapStateToProps = (state) => {
    return {
        season: state.season,
        constructors: state.constructors
    }
    
}



export default connect(mapStateToProps)(Constructors)