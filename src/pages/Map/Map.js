import React, {useState, useEffect} from 'react'
import Pins from '../../Pins'
import ReactMapGL from 'react-map-gl'
import {connect} from 'react-redux'
import {startGetCircuits} from '../../redux/actions/circuitAction'
// import * as trackData from '../../assets/circuit-info.json'

const Map = (props) => {
    const [viewport, setviewport] = useState({
        latitude: 52.0786,
        longitude: -1.01694,
        width: '100vw',
        height: '100vh',
        zoom: 1
    
      })

      useEffect(() => {
        props.dispatch(startGetCircuits(props.season))
      }, []);

    return (
        <div>
        <ReactMapGL 
            {...viewport}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            mapStyle='mapbox://styles/srikanthac/ckcwalgkt02t01ip1plzjtrnu'
            onViewportChange={viewport => {
            setviewport(viewport);
            }}
        >
            <Pins trackData={props.circuits}></Pins>
        </ReactMapGL>
        
        
        </div>
    )  
}

const mapStateToProps = (state) =>{
    return {
        season: state.season,
        circuits: state.circuits
    }
}

export default connect(mapStateToProps)(Map)