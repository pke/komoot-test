import React, { useRef, useEffect } from "react"
import PropTypes from "prop-types"

import { map } from "leaflet/src/map"
import { icon } from "leaflet/src/layer/marker/Icon"
import { divIcon } from "leaflet/src/layer/marker/DivIcon"
import { Marker } from "leaflet/src/layer/marker/Marker"
import { tileLayer } from "leaflet/src/layer/tile/TileLayer"
import { layerGroup } from "leaflet/src/layer/LayerGroup"
// Required because dragging a marker tries to call closePopup
// See https://github.com/Leaflet/Leaflet/issues/6961
import "leaflet/src/layer/Popup"
import { polyline } from "leaflet/src/layer/vector/Polyline"
import "leaflet/src/layer/vector/Renderer.getRenderer"

//delete L.Icon.Default.prototype._getIconUrl

import "leaflet/dist/leaflet.css"
// Bundlers do not package the leaflet assets referenced from the leaflet.css
// properly, so we do it here manually.
// https://github.com/parcel-bundler/parcel/issues/973#issuecomment-484470626
/*L.Icon.Default.mergeOptions({
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  layerUrl: require("leaflet/dist/images/layers.png"),
  layerRetinaUrl: require("leaflet/dist/images/layers-2x.png"),
})*/

const finishIcon = icon({
  iconUrl: require("../../../images/destination-flag.svg"),

  iconSize:     [64, 64], // size of the icon
  iconAnchor:   [30, 50], // point of the icon which will correspond to marker's location
})

export default function Map({ coords, onAddMarker, onUpdateMarker, ...props }) {
  const mapRef = useRef()
  const mapElementRef = useRef()
  useEffect(() => {
    mapRef.current = map(mapElementRef.current, {
      center: [52.49399462011186, 13.048869228791695],
      zoom: 13,
      layers: [
        tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
          attribution:
            "&copy; <a href=\"https://osm.org/copyright\">OpenStreetMap</a> contributors",
        }),
      ],
    })
      .on("click", onMarkerLayerClick)

    return () => {
      mapRef.current.remove()
      mapRef.current = null
    }
  }, [mapElementRef.current])

  const onMarkerLayerClick = ({ latlng, originalEvent: { ctrlKey } }) => {
    onAddMarker({ ...latlng, fast: !ctrlKey })
  }

  const markerLayerRef = useRef()
  useEffect(() => {
    markerLayerRef.current = layerGroup().addTo(mapRef.current).on("click", onMarkerLayerClick)
    return () => {
      markerLayerRef.current.remove()
      markerLayerRef.current = null
    }
  }, [mapRef.current])

  useEffect(() => {
    markerLayerRef.current && markerLayerRef.current.clearLayers()
    const lastIndex = coords.length - 1
    coords.forEach((coord, index) => {
      let marker
      if (index > 0 && index === lastIndex) {
        marker = new Marker([coord[0], coord[1]], { draggable: true, icon: finishIcon })
      } else {
        marker = new Marker([coord[0], coord[1]], {
          draggable: true,
          icon: divIcon({
            html: `${1 + index}`,
            className: "marker",
            iconAnchor: [12, 12],
          }),
        })
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
    trackLayerRef.current = layerGroup().addTo(mapRef.current)
    return () => {
      trackLayerRef.current.remove()
      trackLayerRef.current = null
    }
  }, [mapRef.current])

  const trackLineRef = useRef()

  useEffect(() => {
    trackLayerRef.current.clearLayers()
    trackLineRef.current = polyline(coords.map(([lat, lng]) => [lat, lng])).addTo(trackLayerRef.current)
    return () => {
      trackLineRef.current.remove()
      trackLineRef.current = null
    }
  }, [coords, trackLayerRef.current])

  return <section ref={mapElementRef} {...props}></section>
}
Map.propTypes = {
  coords: PropTypes.arrayOf(PropTypes.array),
  onAddMarker: PropTypes.func,
  onUpdateMarker: PropTypes.func,
}

