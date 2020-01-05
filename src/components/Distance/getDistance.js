const cos = Math.cos
const p = Math.PI / 180

export default function getDistance(lat1, lon1, lat2, lon2) {
  const a = 0.5 - cos((lat2 - lat1) * p) / 2 +
          cos(lat1 * p) * cos(lat2 * p) *
          (1 - cos((lon2 - lon1) * p)) / 2
  return 12742 * Math.asin(Math.sqrt(a)) // 2 * R; R = 6371 km
}
