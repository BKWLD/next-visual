import { useInView } from 'react-intersection-observer'
import type { ReactElement } from 'react'

import { fillStyles, transparentGif } from './lib/styles'

// An video rendered within a Visual that supports lazy loading
export default function LazyVideo({
  src, alt, fit, position, priority, noPoster
}: any): ReactElement {

  // Watch for in viewport to load video unless using priority
  const { ref, inView } = useInView({
    skip: priority
  })

  // Simplify logic for whether to load sources
  const shouldLoad = priority || inView

  return (
    <video

      // Props that allow us to autoplay videos like a gif
      playsInline
      autoPlay
      muted
      loop

      // Load a transparent gif as a poster if an `image` was specified so
      // the image is used as poster rather than the first frame of video. This
      // lets us all use responsive poster images (via `next/image`).
      poster={ noPoster ? transparentGif : undefined }

      // Straightforward props
      ref={ref}
      preload={ shouldLoad ? 'auto' : 'none' }
      aria-label={ alt }
      style={{
        ...fillStyles,
        objectFit: fit,
        objectPosition: position,
      }}>

      {/* Implement lazy loading by not adding the source until ready */}
      { shouldLoad && <source src={ src } /> }
    </video>
  )
}
