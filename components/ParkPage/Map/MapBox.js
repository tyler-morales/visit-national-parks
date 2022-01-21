import {useState} from 'react'
import MapGL, {Marker} from 'react-map-gl'

import {FaMapMarkerAlt} from 'react-icons/fa'

// mapboxgl.accessToken =
//   'pk.eyJ1IjoidHlsZXItbW9yYWxlcyIsImEiOiJja3lvcmVxZTkwMHN0MnVzMmtpdzcxZXVxIn0.X7-oB5R1wF2YFD294ThFaQ'
const MAPBOX_TOKEN =
  'pk.eyJ1IjoidHlsZXItbW9yYWxlcyIsImEiOiJja3lvcmVxZTkwMHN0MnVzMmtpdzcxZXVxIn0.X7-oB5R1wF2YFD294ThFaQ'

export default function MapBox({coordinates, title}) {
  const {latitude, longitude} = coordinates

  const [viewport, setViewport] = useState({
    latitude: +latitude,
    longitude: +longitude,
    zoom: 8,
  })

  return (
    <section className="mt-24">
      <h2 className="text-3xl font-bold text-green-800">{title}</h2>
      {/* Map */}
      <MapGL
        {...viewport}
        width="100%"
        height="450px"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={setViewport}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        className="border-2 border-green-800 rounded-lg">
        <Marker
          latitude={+latitude}
          longitude={+longitude}
          offsetLeft={-20}
          offsetTop={-10}>
          <FaMapMarkerAlt size="2em" />
        </Marker>
      </MapGL>
    </section>
  )
}
