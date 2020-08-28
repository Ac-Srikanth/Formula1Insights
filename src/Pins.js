import React, {useState} from 'react'
import {Marker, Popup} from 'react-map-gl'

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const SIZE = 20;

const Pins = (props) => {
    const [selectedTrack, setSelectedTrack] = useState(null);        
        return (
        <div>
        {props.trackData.map((circuit) => (
            <Marker 
                key={circuit.circuitId} 
                latitude={parseFloat(circuit.Location.lat)} 
                longitude={parseFloat(circuit.Location.long)}
            >

                <svg
                    height={SIZE}
                    viewBox="0 0 24 24"
                    style={{
                        cursor: 'pointer',
                        fill: '#d00',
                        stroke: 'none',
                        transform: `translate(${-SIZE / 2}px,${-SIZE}px)`
                    }}
                    onClick={e => {
                        e.preventDefault()
                        setSelectedTrack(circuit)
                    }}            
                >
                    <path d={ICON} />
                </svg>

            </Marker>
        ))}
        {selectedTrack ? (
            <Popup 
            latitude={parseFloat(selectedTrack.Location.lat)}
            longitude={parseFloat(selectedTrack.Location.long)}
            onClose={() => {
                setSelectedTrack(null)
            }}
            >
                <div>
                    <h2>{selectedTrack.circuitName}</h2>
                    <p>{selectedTrack.Location.locality},{selectedTrack.Location.country}</p>
                </div>
            </Popup>
        ) : null}
        </div>            
        
    )
}
export default Pins