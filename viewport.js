let sizes = {}
let viewports = {}

export default {
  // Add callback to a size change
  on (size, callback) {
    sizes[size].addListener(callback)
  },

  // Remove callback from a size change
  off (size, callback) {
    sizes[size].removeListener(callback)
  },

  // Find if current viewport matches a size
  is (size) {
    return sizes[size].matches
  },

  // Find if current viewport does not match a size
  isNot (size) {
    return !sizes[size].matches
  },

  // Return the current viewport size
  current () {
    return Object.keys(sizes).find(size => this.is(size))
  },

  // Set config object
  config (mediaQueryConfig, viewportConfig) {
    if (!arguments.length) {
      return { sizes, viewports }
    } else {
      sizes = mediaQueryConfig
      viewports = viewportConfig
    }
  }
}
