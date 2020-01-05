module.exports = function formatDistance(distance) {
  {/*i18n*/}
  if (distance < 1.0) {
    return (distance * 1000).toFixed(0) + " m"
  } else {
    return distance.toFixed(2) + " km"
  }
}
