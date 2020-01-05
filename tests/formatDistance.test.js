const assert = require("chai").assert

const formatDistance = require("../src/components/Distance/formatDistance")

describe("Formatting distances", function() {
  it("formats distances less than 1 km", function() {
    assert.equal(formatDistance(0.275), "275 m")
    assert.equal(formatDistance(0.2756), "276 m")
  })

  it("formats distances more than 1 km", function() {
    assert.equal(formatDistance(1.2756), "1.28 km")
    assert.equal(formatDistance(1.275), "1.27 km")
  })
})
