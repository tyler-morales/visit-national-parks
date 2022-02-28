import {useState, useEffect, useMemo} from 'react'
import MapGL, {Marker, Popup} from 'react-map-gl'
import Link from 'next/link'

import {FaMapMarkerAlt} from 'react-icons/fa'

export default function MapBox({longitude, latitude}) {
  console.log(longitude, latitude)

  const [viewport, setViewport] = useState({
    latitude: latitude,
    longitude: longitude,
    zoom: 2,
  })

  useEffect(() => {
    setViewport({
      latitude: latitude,
      longitude: longitude,
      zoom: 4,
    })
  }, [])

  return (
    <section>
      {/* Map */}
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={setViewport}
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
        className="rounded-tr-md">
        <Marker longitude={longitude} latitude={latitude} anchor="bottom">
          <FaMapMarkerAlt size="2em" className="text-blue-700" />
        </Marker>
      </MapGL>
    </section>
  )
}
