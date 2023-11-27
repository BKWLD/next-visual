import type { ReactElement } from 'react'

import VisualWrapper from './VisualWrapper'
import LazyVideo from './LazyVideo'
import PictureImage from './PictureImage'

import { collectDataAttributes } from './lib/attributes'
import { ReactVisualProps } from './types/reactVisualTypes'
import { fillStyles } from './lib/styles'

export default function ReactVisual(
  props: ReactVisualProps
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
    videoLoader,
    sourceTypes,
    sourceMedia,
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
      sourceMedia,
      image,
      video,
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
        sourceTypes,
        sourceMedia,
        style: { // Expand to wrapper when wrapper has layout
          ...(aspect || expand ? fillStyles : undefined),
          width: width ? '100%': undefined,
          height: height ? '100%' : undefined,
        }
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
        sourceMedia,
        videoLoader,
      }} /> }

    </VisualWrapper>
  )
}
