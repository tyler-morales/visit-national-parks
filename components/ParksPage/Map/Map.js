import {useState, useEffect, useMemo} from 'react'
import MapGL, {Marker, Popup} from 'react-map-gl'

import {FaMapMarkerAlt} from 'react-icons/fa'

export default function MapBox({parks, passMapData, width}) {
  const [viewport, setViewport] = useState({
    longitude: -100,
    latitude: 40,
    zoom: 4,
  })

  useEffect(() => {
    setViewport({
      longitude: -100,
      latitude: 40,
      zoom: 4,
    })
  }, [])

  const handleClickedPark = (code) => {
    passMapData(code)
  }

  const pins = useMemo(
    () =>
      parks.map((coordinate, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={+coordinate.longitude}
          latitude={+coordinate.latitude}
          anchor="bottom">
          <FaMapMarkerAlt
            size="2em"
            className="text-blue-700 cursor-pointer"
            onClick={() => handleClickedPark(coordinate.parkCode)}
          />
        </Marker>
      )),
    []
  )

  return (
    <section className={`${width ? 'col-span-3' : 'col-span-2'}`}>
      {/* Map */}
      <MapGL
        {...viewport}
        onViewportChange={setViewport}
        width="100%"
        height="750px"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
        className="rounded-md">
        {pins}
      </MapGL>
    </section>
  )
}
