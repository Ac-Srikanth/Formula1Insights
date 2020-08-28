import React from 'react'
import ImageCard from '../../components/ImageCard/ImageCard'
import InfoCard from '../../components/InfoCard/InfoCard'
import axios from 'axios'
import {connect} from 'react-redux'
import {startGetCircuits} from '../../redux/actions/circuitAction'
import { Select } from 'antd';
import './Circuits.css'

const { Option } = Select;


class Circuits extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            circuit: '',
            wiki: ''
        }
    }

    handleCircuitChange = (value) => {
        console.log(value)
        let circuitId = value[1].substring(value[1].lastIndexOf('/')+ 1)
        axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${circuitId}`)
        .then((response) => {
            console.log(response)
            this.setState({wiki: response.data})
        })
    }

    componentDidMount() {
        this.props.dispatch(startGetCircuits(this.props.season))
    }

    render() {
        const {circuits} = this.props
        return (
            <div>
                <div className="headings">
                    <h2>Circuits - {this.props.season}</h2>
                    <Select
                        showSearch
                        placeholder="Search Circuit"  
                        style={{width: 300}}
                        optionFilterProp="children"
                        onChange={this.handleCircuitChange} 
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                    {circuits.map((circuit, index) =>{
                        return (
                            <Option
                                key={index}
                                value={[circuit.circuitId, circuit.url]}
                            >
                                {`${circuit.circuitName}`}
                            </Option>
                        )
                    })}                    
                    </Select>
                </div>
                {
                    this.state.wiki ?
                    (
                        <div className="circuit-info-container">
                            <ImageCard info={this.state.wiki}/> 
                            <InfoCard info={this.state.wiki}/>
                        </div>
                    ): ''
                }
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        season: state.season,
        circuits: state.circuits
    }
}

export default connect(mapStateToProps)(Circuits)