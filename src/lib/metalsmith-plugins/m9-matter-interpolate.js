import matterInterpolate from '../matter-interpolate'
export default m9matterInterpolate

const EXCLUDE_PROPS = [
  'contents',
  'mode'
]

function m9matterInterpolate () {
  return (files, metalsmith, done) => {
    Object.keys(files).forEach(file => (
      processFileMeta(files[file], metalsmith.metadata())
    ))
    done()
  }
}

function processFileMeta (fileMeta, metadata) {
  Object.keys(fileMeta).forEach(propName => {
    const propValue = fileMeta[propName]
    if (EXCLUDE_PROPS.includes(propName)) return
    if (typeof propValue !== 'string') return
    fileMeta[propName] = matterInterpolate(propValue, metadata)
  })
}
