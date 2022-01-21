import React, {useRef, useEffect, useState} from 'react'
import mapboxgl from '!mapbox-gl' // eslint-disable-line import/no-webpack-loader-syntax
import 'mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken =
  'pk.eyJ1IjoidHlsZXItbW9yYWxlcyIsImEiOiJja3lvcmVxZTkwMHN0MnVzMmtpdzcxZXVxIn0.X7-oB5R1wF2YFD294ThFaQ'

export default function MapBox({latitude, longitude, title}) {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const [lng, setLng] = useState(longitude)
  const [lat, setLat] = useState(latitude)
  const [zoom, setZoom] = useState(9)

  useEffect(() => {
    if (map.current) return // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    })
  })

  useEffect(() => {
    if (!map.current) return // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4))
      setLat(map.current.getCenter().lat.toFixed(4))
      setZoom(map.current.getZoom().toFixed(2))
    })
  })

  return (
    <section className="mt-24">
      <h2 className="text-3xl font-bold text-green-800">{title}</h2>
      {/* Map */}
      <div ref={mapContainer} className="h-[500px] w-full rounded-md mt-10" />
    </section>
  )
}
