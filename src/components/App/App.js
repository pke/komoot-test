import React, { useEffect } from "react"
import PropTypes from "prop-types"

import useLocalStorage from "../../hooks/useLocalStorage"
import useDialog from "../../hooks/useDialog"
import useTrackPoints from "../../hooks/useTrackPoints"
import useUndo from "../../hooks/useUndo"

import getDistance from "../Distance/getDistance"

import AddMarkerDialog from "./AddMarkerDialog"
import ExportButton from "../Export/ExportButton"
import Flex from "../Flex"
import Hint from "./Hint"
import Link from "../Link"
import Map from "../Map/Map"
import NegativeFeedbackLink from "../Feedback/NegativeFeedbackLink"
import PositiveFeedbackLink from "../Feedback/PositiveFeedbackLink"
import PrivacyPolicyLink from "../PrivacyPolicy/PrivacyPolicyLink"
import ResetTrackButton from "./ResetTrackButton"
import TrackPointList from "./TrackPointList"
import Tools from "./Tools"
import DistanceLabel from "../Distance/DistanceLabel"
import VersionLabel from "./VersionLabel"

export default function App({ feedbackEmail, coords:initialCoords, git }) {
  const [ savedTrackPoints, saveTrackPoints, clearLocalStorage ] = useLocalStorage("trackPoints", initialCoords)
  const [ currentTrackPoints, { set:setUndo, undo, canUndo }] = useUndo(savedTrackPoints)
  const [
    trackPoints,
    {
      add: addTrackPoint,
      remove: removeTrackPoint,
      update: updateTrackPoint,
      move: moveTrackPoint,
      clear: clearTrackPoints,
      set: setTrackPoints,
    },
  ] = useTrackPoints(currentTrackPoints)

  // When the track points are mutated, update the undo stack
  useEffect(() => {
    setUndo(trackPoints)
  }, [trackPoints])

  // When track point changes are undone, update the local storage and the
  // track points list
  useEffect(() => {
    saveTrackPoints(currentTrackPoints)
    setTrackPoints(currentTrackPoints)
  }, [currentTrackPoints])

  const onAddMarkerDone = (result) => {
    if (result) {
      const { lat, lng, title} = result
      addTrackPoint([lat, lng], title)
    }
    toggleAddMarkerDialog()
  }

  const [
    showAddMarkerDialog,
    toggleAddMarkerDialog,
    addMarkerDone,
    addMarkerFields,
  ] = useDialog(onAddMarkerDone)

  const onAddMarker = ({ lat, lng, fast }) => {
    if (fast) {
      addTrackPoint([lat, lng])
    } else {
      toggleAddMarkerDialog({ lat, lng })
    }
  }

  // FIXME: memoize this with useMemo
  const totalDistance = trackPoints.reduce((total, coord, index, all) => {
    if (index > 0) {
      const prev = all[index - 1]
      total += getDistance(coord[0], coord[1], prev[0], prev[1])
    }
    return total
  }, 0)

  return (
    <>
      <Tools>
        <span className="logo"><sup>test</sup></span>
        { canUndo && <button onClick={undo}>Undo</button> }
        <TrackPointList items={trackPoints} onRemove={removeTrackPoint} onMove={moveTrackPoint} totalDistance={totalDistance}>
          <p>Add some track points by clicking on the map.</p>
          <Hint>Hold down CTRL while clicking to give the track point a name.</Hint>
        </TrackPointList>
        { !!trackPoints.length && <div className="track-infos">
          { trackPoints.length > 1 && <span className="total-distance">Total: <DistanceLabel distance={totalDistance}/></span> }
          { trackPoints.length > 1 && <Hint>Re-arrange track points by drag & drop</Hint> }
          <ResetTrackButton reset={clearTrackPoints} disabled={!trackPoints.length} className="secondary"/>
        </div>
        }
        <div className="export">
          <ExportButton coords={trackPoints} creator={document.location.origin}>View GPX</ExportButton>
          <ExportButton coords={trackPoints} fileName="komoot-test.gpx" creator={document.location.origin}>Download GPX</ExportButton>
        </div>
        <Flex justifyContent="space-around" component="footer">
          <PrivacyPolicyLink clean={clearLocalStorage} style={{ fontSize: "smaller" }}/>
          <Link href="/docs/index.html" style={{ fontSize: "smaller" }}>Docs</Link>
          <NegativeFeedbackLink email={feedbackEmail}/>
          <PositiveFeedbackLink email={feedbackEmail}/>
        </Flex>
        <VersionLabel version={git.version} branch={git.branch} className="version"/>
      </Tools>
      <Map id="map" coords={trackPoints} onAddMarker={onAddMarker} onUpdateMarker={updateTrackPoint}/>
      { showAddMarkerDialog && <AddMarkerDialog {...addMarkerFields} done={addMarkerDone}/> }
    </>
  )
}
App.propTypes = {
  /** Info about the git repo used to build the app */
  git: PropTypes.shape({
    version: PropTypes.string.isRequired,
    branch: PropTypes.string,
  }).isRequired,
  coords: PropTypes.arrayOf(PropTypes.array),
  feedbackEmail: PropTypes.string.isRequired,
}
