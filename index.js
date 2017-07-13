let sizes = {}
let viewports = {}

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
    return !sizes[size].matches
  },

  // Return the current viewport size
  current () {
    return Object.keys(sizes).find(size => this.is(size))
  }
}

const viewportMixin = function (viewportVariable) {
  if (arguments.length === 1 || typeof arguments[1] === 'function') {
    // individual tag
    return createMixin(viewportVariable, arguments[1])
  } else {
    // shared mixin
    sizes[viewportVariable] = arguments[1]
    return createMixin(viewportVariable, null)
  }
}

function createMixin (size, callback) {
  return {
    init () {
      this[size] = viewport.is(size)

      if (callback) {
        callback()
      }

      const sizeCallback = mql => {
        this[size] = mql.matches
        callback ? callback() : this.update()
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
