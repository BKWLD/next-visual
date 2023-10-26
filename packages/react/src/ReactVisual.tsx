import type { ReactElement } from 'react'

import VisualWrapper from './VisualWrapper'
import LazyVideo from './LazyVideo'
import PictureImage from './PictureImage'

import { collectDataAttributes } from './lib/attributes'
import { ReactVisualTypes } from './types/reactVisualTypes'

export default function ReactVisual(
  props: ReactVisualTypes
): ReactElement | null {

  // Destructure props
  const {
    image,
    video,
    expand,
    aspect,
    width,
    height,
    fit = 'cover',
    position,
    priority,
    sizes,
    imageLoader,
    paused,
    alt,
    className = '',
    style = {},
  } = props

  // If no asset, return nothing
  if (!image && !video) return null

  return (
    <VisualWrapper {...{
      expand,
      width,
      height,
      aspect,
      className,
      style,
      dataAttributes: collectDataAttributes(props),
    }}>

      {/* Render image */}
      { image && <PictureImage {...{
        src: image,
        sizes,
        alt,
        fit,
        position,
        priority,
        imageLoader,
      }} /> }

      {/* Render video element */}
      { video && <LazyVideo {...{
        src: video,
        alt,
        fit,
        position,
        priority,
        noPoster: !!image, // Use `image` as poster frame
        paused,
      }} /> }

    </VisualWrapper>
  )
}
