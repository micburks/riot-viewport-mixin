import viewport from './viewport'

const { viewports } = viewport.config()

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

export const viewportMixin = Object.keys(viewports)
  .reduce((acc, viewport) => {
    acc[viewport] = callback => {
      return createMixin(viewport, viewports[viewport], callback)
    }
    return acc
  }, {})
