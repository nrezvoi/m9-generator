import path from 'path'
import fs from 'fs'

export default readPartialsDir

function readPartialsDir (dir) {
  return fs.readdirSync(dir).reduce((partials, filename) => {
    const partialName = path.parse(filename)['name']
    const filePath = path.join(dir, filename)
    partials[partialName] = fs.readFileSync(filePath, { encoding: 'utf8' })
    return partials
  }, {})
}
