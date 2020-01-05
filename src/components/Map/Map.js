import React, { useRef, useEffect } from "react"
import PropTypes from "prop-types"

import L from "leaflet"
delete L.Icon.Default.prototype._getIconUrl

import "leaflet/dist/leaflet.css"
// Bundlers do not package the leaflet assets referenced from the leaflet.css
// properly, so we do it here manually.
// https://github.com/parcel-bundler/parcel/issues/973#issuecomment-484470626
L.Icon.Default.mergeOptions({
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  layerUrl: require("leaflet/dist/images/layers.png"),
  layerRetinaUrl: require("leaflet/dist/images/layers-2x.png"),
})

const finishIcon = L.icon({
  iconUrl: require("../../../images/destination-flag.svg"),

  iconSize:     [64, 64], // size of the icon
  iconAnchor:   [30, 50], // point of the icon which will correspond to marker's location
})

export default function Map({ coords, onAddMarker, onUpdateMarker }) {
  const mapRef = useRef()
  const mapElementRef = useRef()
  useEffect(() => {
    mapRef.current = L.map(mapElementRef.current, {
      center: [52.49399462011186, 13.048869228791695],
      zoom: 13,
      layers: [
        L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
          attribution:
            "&copy; <a href=\"http://osm.org/copyright\">OpenStreetMap</a> contributors",
        }),
      ],
    })
      .on("click", onMarkerLayerClick)
  }, [])

  const onMarkerLayerClick = ({ latlng, originalEvent: { ctrlKey } }) => {
    onAddMarker({ ...latlng, fast: !ctrlKey })
  }

  const markerLayerRef = useRef()
  useEffect(() => {
    markerLayerRef.current = L.layerGroup().addTo(mapRef.current).on("click", onMarkerLayerClick)
  }, [])

  useEffect(() => {
    markerLayerRef.current.clearLayers()
    const lastIndex = coords.length - 1
    coords.forEach((coord, index) => {
      let marker
      if (index > 0 && index === lastIndex) {
        marker = L.marker([coord[0], coord[1]], { draggable: true, icon: finishIcon })
      } else {
        marker = L.marker([coord[0], coord[1]], { draggable: true })
      }
      marker.on("dragend", (event) => {
        // FIXME: There must be a better way to get the coords from the event
        onUpdateMarker(index, { ...event.target._latlng })
      })
        .addTo(markerLayerRef.current)
    })
  }, [coords])

  const trackLayerRef = useRef()
  useEffect(() => {
    trackLayerRef.current = L.layerGroup().addTo(mapRef.current)
  }, [])

  useEffect(() => {
    trackLayerRef.current.clearLayers()
    L.polyline(coords.map(coord => [coord[0], coord[1]])).addTo(trackLayerRef.current)
  }, [coords])

  const style = {
    width: "100%",
    height: "100%",
    background: "green",
  }
  return <div ref={mapElementRef} style={style}></div>
}
Map.propTypes = {
  coords: PropTypes.arrayOf(PropTypes.array),
  onAddMarker: PropTypes.func,
  onUpdateMarker: PropTypes.func,
}

