import { get } from 'lodash'
export default matterInterpolate

const VARIABLE_PATTERN = '\\$\\{([^}]+)\\}'
const VARIABLE_REGEXP = new RegExp(VARIABLE_PATTERN, 'g')
const SINGLE_VARIABLE_REGEXP = new RegExp(`^${VARIABLE_PATTERN}$`)

function matterInterpolate (input, metadata, processFn = v => v) {
  let result = input.match(SINGLE_VARIABLE_REGEXP)
  if (result) {
    const variable = result[1]
    return interpolateOne(variable, metadata, processFn)
  }

  return input.replace(VARIABLE_REGEXP, (match, variable) =>
    interpolateOne(variable, metadata, processFn))
}

function interpolateOne (variable, object, processFn) {
  return processFn(resolve(variable, object))
}

function resolve (path, object) {
  const value = get(object, path)
  if (value === undefined) {
    throw new Error('Cannot resolve data path: ' + JSON.stringify({
      path,
      object
    }, null, 2))
  }

  return value
}
