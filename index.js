let sizes = {}
let viewports = {}
const viewportMixin = {}

const viewport = {
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
    console.log(sizes)
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

      Object.keys(viewports)
        .forEach(viewport => {
          viewportMixin[viewport] = callback => {
            return createMixin(viewport, viewports[viewport], callback)
          }
        })
    }
  }
}

function createMixin (variable, size, callback) {
  return {
    init () {
      this[variable] = viewport.is(size)
      if (callback) {
        callback()
      }

      callback = callback || (() => this.update())

      const sizeCallback = mql => {
        this[variable] = mql.matches
        callback()
      }

      this.on('mount', () => {
        viewport.on(size, sizeCallback)
      })

      this.on('unmount', () => {
        viewport.off(size, sizeCallback)
      })
    }
  }
}

export { viewport, viewportMixin }
