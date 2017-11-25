'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = readPartialsDir;


function readPartialsDir(dir) {
  return _fs2.default.readdirSync(dir).reduce((partials, filename) => {
    const partialName = _path2.default.parse(filename)['name'];
    const filePath = _path2.default.join(dir, filename);
    partials[partialName] = _fs2.default.readFileSync(filePath, { encoding: 'utf8' });
    return partials;
  }, {});
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvcmVhZC1wYXJ0aWFscy1kaXIuanMiXSwibmFtZXMiOlsicmVhZFBhcnRpYWxzRGlyIiwiZGlyIiwicmVhZGRpclN5bmMiLCJyZWR1Y2UiLCJwYXJ0aWFscyIsImZpbGVuYW1lIiwicGFydGlhbE5hbWUiLCJwYXJzZSIsImZpbGVQYXRoIiwiam9pbiIsInJlYWRGaWxlU3luYyIsImVuY29kaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7a0JBRWVBLGU7OztBQUVmLFNBQVNBLGVBQVQsQ0FBMEJDLEdBQTFCLEVBQStCO0FBQzdCLFNBQU8sYUFBR0MsV0FBSCxDQUFlRCxHQUFmLEVBQW9CRSxNQUFwQixDQUEyQixDQUFDQyxRQUFELEVBQVdDLFFBQVgsS0FBd0I7QUFDeEQsVUFBTUMsY0FBYyxlQUFLQyxLQUFMLENBQVdGLFFBQVgsRUFBcUIsTUFBckIsQ0FBcEI7QUFDQSxVQUFNRyxXQUFXLGVBQUtDLElBQUwsQ0FBVVIsR0FBVixFQUFlSSxRQUFmLENBQWpCO0FBQ0FELGFBQVNFLFdBQVQsSUFBd0IsYUFBR0ksWUFBSCxDQUFnQkYsUUFBaEIsRUFBMEIsRUFBRUcsVUFBVSxNQUFaLEVBQTFCLENBQXhCO0FBQ0EsV0FBT1AsUUFBUDtBQUNELEdBTE0sRUFLSixFQUxJLENBQVA7QUFNRCIsImZpbGUiOiJyZWFkLXBhcnRpYWxzLWRpci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgZnMgZnJvbSAnZnMnXG5cbmV4cG9ydCBkZWZhdWx0IHJlYWRQYXJ0aWFsc0RpclxuXG5mdW5jdGlvbiByZWFkUGFydGlhbHNEaXIgKGRpcikge1xuICByZXR1cm4gZnMucmVhZGRpclN5bmMoZGlyKS5yZWR1Y2UoKHBhcnRpYWxzLCBmaWxlbmFtZSkgPT4ge1xuICAgIGNvbnN0IHBhcnRpYWxOYW1lID0gcGF0aC5wYXJzZShmaWxlbmFtZSlbJ25hbWUnXVxuICAgIGNvbnN0IGZpbGVQYXRoID0gcGF0aC5qb2luKGRpciwgZmlsZW5hbWUpXG4gICAgcGFydGlhbHNbcGFydGlhbE5hbWVdID0gZnMucmVhZEZpbGVTeW5jKGZpbGVQYXRoLCB7IGVuY29kaW5nOiAndXRmOCcgfSlcbiAgICByZXR1cm4gcGFydGlhbHNcbiAgfSwge30pXG59XG4iXX0=