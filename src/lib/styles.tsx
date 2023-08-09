import type { CSSProperties } from 'react'

// Mimic the styles that next/image sets when `fill` prop is applied
export const fillStyles = {
  position: 'absolute',
  height: '100%',
  width: '100%',
  inset: '0px',
} as CSSProperties

// Transparent gif to use own image as poster
// https://stackoverflow.com/a/13139830/59160
export const transparentGif = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
