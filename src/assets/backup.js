const [viewport, setviewport] = useState({
    latitude: 52.0786,
    longitude: -1.01694,
    width: '100vw',
    height: '90vh',
    zoom: 1

  })


<ReactMapGL 
{...viewport}
mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
mapStyle='mapbox://styles/srikanthac/ckcwalgkt02t01ip1plzjtrnu'
onViewportChange={viewport => {
  setviewport(viewport);
}}
>
{trackData.MRData.CircuitTable.Circuits.map((circuit)=> (
  <Marker key={circuit.circuitId} latitude={parseInt(circuit.Location.lat)} longitude={parseInt(circuit.Location.long)}>
    <p>Track</p>
  </Marker>
))}
</ReactMapGL>