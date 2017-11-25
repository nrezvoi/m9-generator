'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _matterInterpolate = require('../matter-interpolate');

var _matterInterpolate2 = _interopRequireDefault(_matterInterpolate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = m9matterInterpolate;


var EXCLUDE_PROPS = ['contents', 'mode'];

function m9matterInterpolate() {
  return function (files, metalsmith, done) {
    Object.keys(files).forEach(function (file) {
      return processFileMeta(files[file], metalsmith.metadata());
    });
    done();
  };
}

function processFileMeta(fileMeta, metadata) {
  Object.keys(fileMeta).forEach(function (propName) {
    var propValue = fileMeta[propName];
    if (EXCLUDE_PROPS.includes(propName)) return;
    if (typeof propValue !== 'string') return;
    fileMeta[propName] = (0, _matterInterpolate2.default)(propValue, metadata);
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvbWV0YWxzbWl0aC1wbHVnaW5zL205LW1hdHRlci1pbnRlcnBvbGF0ZS5qcyJdLCJuYW1lcyI6WyJtOW1hdHRlckludGVycG9sYXRlIiwiRVhDTFVERV9QUk9QUyIsImZpbGVzIiwibWV0YWxzbWl0aCIsImRvbmUiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsInByb2Nlc3NGaWxlTWV0YSIsImZpbGUiLCJtZXRhZGF0YSIsImZpbGVNZXRhIiwicHJvcFZhbHVlIiwicHJvcE5hbWUiLCJpbmNsdWRlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7OztrQkFDZUEsbUI7OztBQUVmLElBQU1DLGdCQUFnQixDQUNwQixVQURvQixFQUVwQixNQUZvQixDQUF0Qjs7QUFLQSxTQUFTRCxtQkFBVCxHQUFnQztBQUM5QixTQUFPLFVBQUNFLEtBQUQsRUFBUUMsVUFBUixFQUFvQkMsSUFBcEIsRUFBNkI7QUFDbENDLFdBQU9DLElBQVAsQ0FBWUosS0FBWixFQUFtQkssT0FBbkIsQ0FBMkI7QUFBQSxhQUN6QkMsZ0JBQWdCTixNQUFNTyxJQUFOLENBQWhCLEVBQTZCTixXQUFXTyxRQUFYLEVBQTdCLENBRHlCO0FBQUEsS0FBM0I7QUFHQU47QUFDRCxHQUxEO0FBTUQ7O0FBRUQsU0FBU0ksZUFBVCxDQUEwQkcsUUFBMUIsRUFBb0NELFFBQXBDLEVBQThDO0FBQzVDTCxTQUFPQyxJQUFQLENBQVlLLFFBQVosRUFBc0JKLE9BQXRCLENBQThCLG9CQUFZO0FBQ3hDLFFBQU1LLFlBQVlELFNBQVNFLFFBQVQsQ0FBbEI7QUFDQSxRQUFJWixjQUFjYSxRQUFkLENBQXVCRCxRQUF2QixDQUFKLEVBQXNDO0FBQ3RDLFFBQUksT0FBT0QsU0FBUCxLQUFxQixRQUF6QixFQUFtQztBQUNuQ0QsYUFBU0UsUUFBVCxJQUFxQixpQ0FBa0JELFNBQWxCLEVBQTZCRixRQUE3QixDQUFyQjtBQUNELEdBTEQ7QUFNRCIsImZpbGUiOiJtOS1tYXR0ZXItaW50ZXJwb2xhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbWF0dGVySW50ZXJwb2xhdGUgZnJvbSAnLi4vbWF0dGVyLWludGVycG9sYXRlJ1xuZXhwb3J0IGRlZmF1bHQgbTltYXR0ZXJJbnRlcnBvbGF0ZVxuXG5jb25zdCBFWENMVURFX1BST1BTID0gW1xuICAnY29udGVudHMnLFxuICAnbW9kZSdcbl1cblxuZnVuY3Rpb24gbTltYXR0ZXJJbnRlcnBvbGF0ZSAoKSB7XG4gIHJldHVybiAoZmlsZXMsIG1ldGFsc21pdGgsIGRvbmUpID0+IHtcbiAgICBPYmplY3Qua2V5cyhmaWxlcykuZm9yRWFjaChmaWxlID0+IChcbiAgICAgIHByb2Nlc3NGaWxlTWV0YShmaWxlc1tmaWxlXSwgbWV0YWxzbWl0aC5tZXRhZGF0YSgpKVxuICAgICkpXG4gICAgZG9uZSgpXG4gIH1cbn1cblxuZnVuY3Rpb24gcHJvY2Vzc0ZpbGVNZXRhIChmaWxlTWV0YSwgbWV0YWRhdGEpIHtcbiAgT2JqZWN0LmtleXMoZmlsZU1ldGEpLmZvckVhY2gocHJvcE5hbWUgPT4ge1xuICAgIGNvbnN0IHByb3BWYWx1ZSA9IGZpbGVNZXRhW3Byb3BOYW1lXVxuICAgIGlmIChFWENMVURFX1BST1BTLmluY2x1ZGVzKHByb3BOYW1lKSkgcmV0dXJuXG4gICAgaWYgKHR5cGVvZiBwcm9wVmFsdWUgIT09ICdzdHJpbmcnKSByZXR1cm5cbiAgICBmaWxlTWV0YVtwcm9wTmFtZV0gPSBtYXR0ZXJJbnRlcnBvbGF0ZShwcm9wVmFsdWUsIG1ldGFkYXRhKVxuICB9KVxufVxuIl19