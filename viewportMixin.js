import viewport from './viewport'

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

export const viewportMixin = {
  mobile (callback) {
    return createMixin('mobile', 'sm', callback)
  },
  tablet (callback) {
    return createMixin('tablet', 'md', callback)
  }
}
