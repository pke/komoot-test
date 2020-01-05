const convertCoordinate = (pos) => (
  `<trkpt lat="${pos[0]}" lon="${pos[1]}"><ele>${pos[2] | 0}</ele></trkpt>`
)

module.exports = function exportGPS({ coords, creator }) {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <gpx version="1.1" creator="${creator}">
    <trk>
      <name>Test Track</name>
      <trkseg>
        ${coords.map(convertCoordinate).join("")}
      </trkseg>
    </trk>
  </gpx>`
}
