import {useState, useEffect, useMemo} from 'react'
import MapGL, {Marker, Popup} from 'react-map-gl'
import Link from 'next/link'

import {FaMapMarkerAlt} from 'react-icons/fa'

export default function MapBox({coordinates}) {
  const [viewport, setViewport] = useState({
    latitude: coordinates[0]?.latitude,
    longitude: coordinates[0]?.longitude,
    zoom: 4,
  })

  const [popupInfo, setPopupInfo] = useState(null)

  useEffect(() => {
    setViewport({
      latitude: coordinates[0]?.latitude,
      longitude: coordinates[0]?.longitude,
      zoom: 4,
    })
  }, [popupInfo])

  const pins = useMemo(
    () =>
      coordinates.map((site, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={site.longitude}
          latitude={site.latitude}
          anchor="bottom">
          <FaMapMarkerAlt
            size="2em"
            className="text-blue-700 cursor-pointer"
            onClick={() => setPopupInfo(site)}
          />
        </Marker>
      )),
    [coordinates]
  )

  return (
    <section className="sticky top-10 h-[750px]">
      {/* Map */}
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={setViewport}
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
        className="rounded-md">
        {pins}

        {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number(popupInfo.longitude)}
            latitude={Number(popupInfo.latitude)}
            closeOnClick={false}
            onClose={() => setPopupInfo(null)}>
            <div className="max-w-full px-4">
              <h3 className="px-4 mb-2 text-lg">{popupInfo.fullName}</h3>
              <div className="flex flex-col gap-2">
                <Link href={`/park/${popupInfo.code}`}>
                  <a className="flex items-center justify-center w-full gap-4 py-2 text-center text-white bg-blue-700 rounded-md font-display">
                    <span>View Park</span>
                  </a>
                </Link>
              </div>
              <img
                className="object-cover w-full h-[200px] mt-4"
                src={popupInfo.image}
              />
            </div>
          </Popup>
        )}
      </MapGL>
    </section>
  )
}
