import React from 'react'
import axios from 'axios'


import './Drivers.css'


class Drivers extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            driver: '',
            selected: 'max_verstappen',
            season: 2020,
            drivers: [],
            tableData: [],
            seasonsArray: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020]
        }
    }

    componentDidMount() {
        axios.get('https://ergast.com/api/f1/2020/drivers.json')
        .then((response) => {
            console.log(response.data.MRData.DriverTable)
            let data = response.data.MRData.DriverTable.Drivers
            this.setState({drivers: data}, ()=> {
                axios.get(`https://ergast.com/api/f1/${this.state.season}/drivers/${this.state.selected}/results.json`)
                .then((response) => {
                    console.log(response.data.MRData.RaceTable)
                    this.setState({tableData: response.data.MRData.RaceTable.Races})
                })
                .catch((err) => {
                    console.log(err)
                })
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    handleChange = (e) => {
        console.log(e.target.value)
        this.setState({selected: e.target.value}, ()=> {
            axios.get(`https://ergast.com/api/f1/${this.state.season}/drivers/${this.state.selected}/results.json`)
            .then((response) => {
                console.log(response.data.MRData.RaceTable)
                this.setState({tableData: response.data.MRData.RaceTable.Races})
            })
            .catch((err) => {
                console.log(err)
            })
        })
    }

    handleSeasonChange= (e) => {
        this.setState({season: e.target.value}, () => {
            axios.get(`https://ergast.com/api/f1/${this.state.season}/drivers.json`)
            .then((response) => {
                console.log(response.data.MRData.DriverTable)
                let data = response.data.MRData.DriverTable.Drivers
                this.setState({drivers: data}, () => {
                    axios.get(`https://ergast.com/api/f1/${this.state.season}/drivers/${this.state.selected}/results.json`)
                    .then((response) => {
                        console.log(response.data.MRData.RaceTable)
                        this.setState({tableData: response.data.MRData.RaceTable.Races})
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                })
            })
            .catch((err) => {
                console.log(err)
            })
        })
    }

    getVictories =()=> {
        axios.get(`https://ergast.com/api/f1/${this.state.season}/drivers/${this.state.selected}/results/1.json`)
        .then((response) => {
            console.log(response.data.MRData.RaceTable)
            this.setState({tableData: response.data.MRData.RaceTable.Races})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    render() {   
        if(this.state.tableData.length > 0) {
            console.log(this.state.tableData)
        }    
        return (
            <div>
            <h1>Formula 1 Driver  {this.state.selected ? this.state.selected.toUpperCase(): ''}</h1>
            <h2>Season  {this.state.season}</h2>
                <select value={this.state.season} onChange={this.handleSeasonChange}>
                {this.state.seasonsArray.map((year) => {
                    return (
                        <option key={year} value={year}>{year}</option>
                    )
                })}
                
                </select>
                <select value={this.state.selected} onChange={this.handleChange}>
                {this.state.drivers.map((driver) => {
                    return (
                        <option key={driver.driverId} value={driver.driverId}>{`${driver.givenName} ${driver.familyName}`}</option>
                    )
                })}            
                </select>

                <button onClick={this.getVictories}>Victories</button>
                <table border="1" cellSpacing="1">
                <thead>
                    <tr>
                        <td>Race Name</td>
                        <td>Round</td>  
                        <td>Circuit</td>
                        <td>Date</td>
                        <td>Constructor</td>
                        <td>Position</td>
                        <td>Grid</td>
                        <td>Fastest Lap</td>
                        <td>Points</td>                                             
                    </tr>                
                </thead>
                <tbody>
                    {this.state.tableData.map((row) => {
                        return (
                            <tr>
                                <td>{row.raceName}</td>
                                <td>{row.round}</td>
                                <td>{row.Circuit.circuitName}</td>
                                <td>{row.date}</td>
                                <td>{row.Results[0].Constructor.name}</td>
                                <td>{row.Results[0].position}</td>
                                <td>{row.Results[0].grid}</td>
                                <td>{row.Results[0].FastestLap ? row.Results[0].FastestLap.Time.time: '-'}</td>
                                <td>{row.Results[0].points}</td>
                            </tr>
                        )
                    })}
                </tbody>                
                </table>
            </div>
        )
    }
}

export default Drivers