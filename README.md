
## riot-viewport-mixin

Relies on matchMedia, which is supported in all browsers

Updates the riot tag when the results of a media query change


## Configure and use in javascript

``` javascript
import viewport from 'riot-viewport-mixin'

const mediaQueryConfig = {
  sm: matchMedia('screen and (max-width: 767px)'),
  md: matchMedia('screen and (min-width: 768px) and (max-width: 1024px)'),
  lg: matchMedia('screen and (min-width: 1025px) and (max-width: 1200px)')
}

// When using in riot tags (SEE `Use as a riot-mixin` below)
const viewportConfig = {
  mobile: 'sm',
  tablet: 'md',
  desktop: 'lg'
}

viewport.config(mediaQueryConfig, viewportConfig)

// on mobile viewport

// attach listener
viewport.on('sm', mql => {
  console.log(mql.matches) // => true
})

// remove listener
viewport.off('sm', listener)

// check specific media query
viewport.is('md') // => false
viewport.isNot('lg') // => true

// get current matching viewport
viewport.current() // => 'xs'
```


## Use as a riot mixin

``` javascript
<my-tag>

  <!--
    When component functionality changes drastically between viewports
    for example:
  -->
  <Simple-Inline-List if={ !mobile } />
  <Hidden-Mega-List if={ mobile } />

  <script>
    import viewportMixin from 'riot-viewport-mixin'

    this.mixin(viewportMixin.mobile())
    // this.mobile is set according to the media query
    // When the viewport changes to/from mobile, this.update() is called and the variable is updated

    // Alternatively, provide your own callback
    this.mixin(
      viewportMixin.mobile(() => {
        // this.mobile is already set with the new result
        console.log(this.mobile)
        this.update()
      })
    )
  </script>

</my-tag>
```


