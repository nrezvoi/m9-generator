"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = resolveReferences;


function resolveReferences(content) {
  Object.keys(content).forEach(contentType => {
    const entities = content[contentType];
    if (!Array.isArray(entities)) {
      processEntity(content, entities);
    } else {
      entities.forEach(entity => processEntity(content, entity));
    }
  });

  return content;
}

function processEntity(srcContent, entity) {
  const { acf } = entity;
  if (!acf) return;

  Object.keys(acf).forEach(propertyName => {
    const propertyValue = acf[propertyName];
    if (!isReference(propertyValue)) return;

    acf[propertyName] = resolvePropertyReferences(srcContent, propertyName, propertyValue);
  });
}

function isReference(entity) {
  return Array.isArray(entity) && entity.length && entity[0].ID && entity[0].post_type;
}

function getReferencedEntity(content, refEntitySrc) {
  const {
    ID: id,
    post_type: postType
  } = refEntitySrc;

  const entities = content[postType];
  return entities ? getById(entities, id) : refEntitySrc;
}

function resolvePropertyReferences(content, propertyName, propertyValue) {
  const resolvedValue = propertyValue.map(refEntitySrc => getReferencedEntity(content, refEntitySrc));

  if (isSingleEntityReference(propertyName, propertyValue[0].post_type)) {
    return resolvedValue[0];
  }

  return resolvedValue;
}

function isSingleEntityReference(srcPropertyName, dstPropertyName) {
  const regexp = /^(?:.*_)?(.+)$/;
  const src = regexp.exec(srcPropertyName)[1];
  const dst = regexp.exec(dstPropertyName)[1];

  return src === dst;
}

function getById(entities, id) {
  for (const entity of entities) {
    if (entity.id === id) return entity;
  }

  throw new Error(`Entity with id: '${id}' was not found in given list`);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvY29udGVudC10cmFuc2Zvcm1lcnMvd29yZHByZXNzL3Jlc29sdmUtcmVmZXJlbmNlcy5qcyJdLCJuYW1lcyI6WyJyZXNvbHZlUmVmZXJlbmNlcyIsImNvbnRlbnQiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsImNvbnRlbnRUeXBlIiwiZW50aXRpZXMiLCJBcnJheSIsImlzQXJyYXkiLCJwcm9jZXNzRW50aXR5IiwiZW50aXR5Iiwic3JjQ29udGVudCIsImFjZiIsInByb3BlcnR5TmFtZSIsInByb3BlcnR5VmFsdWUiLCJpc1JlZmVyZW5jZSIsInJlc29sdmVQcm9wZXJ0eVJlZmVyZW5jZXMiLCJsZW5ndGgiLCJJRCIsInBvc3RfdHlwZSIsImdldFJlZmVyZW5jZWRFbnRpdHkiLCJyZWZFbnRpdHlTcmMiLCJpZCIsInBvc3RUeXBlIiwiZ2V0QnlJZCIsInJlc29sdmVkVmFsdWUiLCJtYXAiLCJpc1NpbmdsZUVudGl0eVJlZmVyZW5jZSIsInNyY1Byb3BlcnR5TmFtZSIsImRzdFByb3BlcnR5TmFtZSIsInJlZ2V4cCIsInNyYyIsImV4ZWMiLCJkc3QiLCJFcnJvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7a0JBQWVBLGlCOzs7QUFFZixTQUFTQSxpQkFBVCxDQUE0QkMsT0FBNUIsRUFBcUM7QUFDbkNDLFNBQU9DLElBQVAsQ0FBWUYsT0FBWixFQUFxQkcsT0FBckIsQ0FBNkJDLGVBQWU7QUFDMUMsVUFBTUMsV0FBV0wsUUFBUUksV0FBUixDQUFqQjtBQUNBLFFBQUksQ0FBQ0UsTUFBTUMsT0FBTixDQUFjRixRQUFkLENBQUwsRUFBOEI7QUFDNUJHLG9CQUFjUixPQUFkLEVBQXVCSyxRQUF2QjtBQUNELEtBRkQsTUFFTztBQUNMQSxlQUFTRixPQUFULENBQWlCTSxVQUFVRCxjQUFjUixPQUFkLEVBQXVCUyxNQUF2QixDQUEzQjtBQUNEO0FBQ0YsR0FQRDs7QUFTQSxTQUFPVCxPQUFQO0FBQ0Q7O0FBRUQsU0FBU1EsYUFBVCxDQUF3QkUsVUFBeEIsRUFBb0NELE1BQXBDLEVBQTRDO0FBQzFDLFFBQU0sRUFBRUUsR0FBRixLQUFVRixNQUFoQjtBQUNBLE1BQUksQ0FBQ0UsR0FBTCxFQUFVOztBQUVWVixTQUFPQyxJQUFQLENBQVlTLEdBQVosRUFBaUJSLE9BQWpCLENBQXlCUyxnQkFBZ0I7QUFDdkMsVUFBTUMsZ0JBQWdCRixJQUFJQyxZQUFKLENBQXRCO0FBQ0EsUUFBSSxDQUFDRSxZQUFZRCxhQUFaLENBQUwsRUFBaUM7O0FBRWpDRixRQUFJQyxZQUFKLElBQW9CRywwQkFDbEJMLFVBRGtCLEVBRWxCRSxZQUZrQixFQUdsQkMsYUFIa0IsQ0FBcEI7QUFLRCxHQVREO0FBVUQ7O0FBRUQsU0FBU0MsV0FBVCxDQUFzQkwsTUFBdEIsRUFBOEI7QUFDNUIsU0FDRUgsTUFBTUMsT0FBTixDQUFjRSxNQUFkLEtBQ0VBLE9BQU9PLE1BRFQsSUFFRVAsT0FBTyxDQUFQLEVBQVVRLEVBRlosSUFHRVIsT0FBTyxDQUFQLEVBQVVTLFNBSmQ7QUFNRDs7QUFFRCxTQUFTQyxtQkFBVCxDQUE4Qm5CLE9BQTlCLEVBQXVDb0IsWUFBdkMsRUFBcUQ7QUFDbkQsUUFBTTtBQUNKSCxRQUFJSSxFQURBO0FBRUpILGVBQVdJO0FBRlAsTUFHRkYsWUFISjs7QUFLQSxRQUFNZixXQUFXTCxRQUFRc0IsUUFBUixDQUFqQjtBQUNBLFNBQU9qQixXQUNIa0IsUUFBUWxCLFFBQVIsRUFBa0JnQixFQUFsQixDQURHLEdBRUhELFlBRko7QUFHRDs7QUFFRCxTQUFTTCx5QkFBVCxDQUFvQ2YsT0FBcEMsRUFBNkNZLFlBQTdDLEVBQTJEQyxhQUEzRCxFQUEwRTtBQUN4RSxRQUFNVyxnQkFBZ0JYLGNBQWNZLEdBQWQsQ0FBa0JMLGdCQUN0Q0Qsb0JBQW9CbkIsT0FBcEIsRUFBNkJvQixZQUE3QixDQURvQixDQUF0Qjs7QUFHQSxNQUFJTSx3QkFBd0JkLFlBQXhCLEVBQXNDQyxjQUFjLENBQWQsRUFBaUJLLFNBQXZELENBQUosRUFBdUU7QUFDckUsV0FBT00sY0FBYyxDQUFkLENBQVA7QUFDRDs7QUFFRCxTQUFPQSxhQUFQO0FBQ0Q7O0FBRUQsU0FBU0UsdUJBQVQsQ0FBa0NDLGVBQWxDLEVBQW1EQyxlQUFuRCxFQUFvRTtBQUNsRSxRQUFNQyxTQUFTLGdCQUFmO0FBQ0EsUUFBTUMsTUFBTUQsT0FBT0UsSUFBUCxDQUFZSixlQUFaLEVBQTZCLENBQTdCLENBQVo7QUFDQSxRQUFNSyxNQUFNSCxPQUFPRSxJQUFQLENBQVlILGVBQVosRUFBNkIsQ0FBN0IsQ0FBWjs7QUFFQSxTQUFPRSxRQUFRRSxHQUFmO0FBQ0Q7O0FBRUQsU0FBU1QsT0FBVCxDQUFrQmxCLFFBQWxCLEVBQTRCZ0IsRUFBNUIsRUFBZ0M7QUFDOUIsT0FBSyxNQUFNWixNQUFYLElBQXFCSixRQUFyQixFQUErQjtBQUM3QixRQUFJSSxPQUFPWSxFQUFQLEtBQWNBLEVBQWxCLEVBQXNCLE9BQU9aLE1BQVA7QUFDdkI7O0FBRUQsUUFBTSxJQUFJd0IsS0FBSixDQUFXLG9CQUFtQlosRUFBRywrQkFBakMsQ0FBTjtBQUNEIiwiZmlsZSI6InJlc29sdmUtcmVmZXJlbmNlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IHJlc29sdmVSZWZlcmVuY2VzXG5cbmZ1bmN0aW9uIHJlc29sdmVSZWZlcmVuY2VzIChjb250ZW50KSB7XG4gIE9iamVjdC5rZXlzKGNvbnRlbnQpLmZvckVhY2goY29udGVudFR5cGUgPT4ge1xuICAgIGNvbnN0IGVudGl0aWVzID0gY29udGVudFtjb250ZW50VHlwZV1cbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoZW50aXRpZXMpKSB7XG4gICAgICBwcm9jZXNzRW50aXR5KGNvbnRlbnQsIGVudGl0aWVzKVxuICAgIH0gZWxzZSB7XG4gICAgICBlbnRpdGllcy5mb3JFYWNoKGVudGl0eSA9PiBwcm9jZXNzRW50aXR5KGNvbnRlbnQsIGVudGl0eSkpXG4gICAgfVxuICB9KVxuXG4gIHJldHVybiBjb250ZW50XG59XG5cbmZ1bmN0aW9uIHByb2Nlc3NFbnRpdHkgKHNyY0NvbnRlbnQsIGVudGl0eSkge1xuICBjb25zdCB7IGFjZiB9ID0gZW50aXR5XG4gIGlmICghYWNmKSByZXR1cm5cblxuICBPYmplY3Qua2V5cyhhY2YpLmZvckVhY2gocHJvcGVydHlOYW1lID0+IHtcbiAgICBjb25zdCBwcm9wZXJ0eVZhbHVlID0gYWNmW3Byb3BlcnR5TmFtZV1cbiAgICBpZiAoIWlzUmVmZXJlbmNlKHByb3BlcnR5VmFsdWUpKSByZXR1cm5cblxuICAgIGFjZltwcm9wZXJ0eU5hbWVdID0gcmVzb2x2ZVByb3BlcnR5UmVmZXJlbmNlcyhcbiAgICAgIHNyY0NvbnRlbnQsXG4gICAgICBwcm9wZXJ0eU5hbWUsXG4gICAgICBwcm9wZXJ0eVZhbHVlXG4gICAgKVxuICB9KVxufVxuXG5mdW5jdGlvbiBpc1JlZmVyZW5jZSAoZW50aXR5KSB7XG4gIHJldHVybiAoXG4gICAgQXJyYXkuaXNBcnJheShlbnRpdHkpICYmXG4gICAgICBlbnRpdHkubGVuZ3RoICYmXG4gICAgICBlbnRpdHlbMF0uSUQgJiZcbiAgICAgIGVudGl0eVswXS5wb3N0X3R5cGVcbiAgKVxufVxuXG5mdW5jdGlvbiBnZXRSZWZlcmVuY2VkRW50aXR5IChjb250ZW50LCByZWZFbnRpdHlTcmMpIHtcbiAgY29uc3Qge1xuICAgIElEOiBpZCxcbiAgICBwb3N0X3R5cGU6IHBvc3RUeXBlXG4gIH0gPSByZWZFbnRpdHlTcmNcblxuICBjb25zdCBlbnRpdGllcyA9IGNvbnRlbnRbcG9zdFR5cGVdXG4gIHJldHVybiBlbnRpdGllc1xuICAgID8gZ2V0QnlJZChlbnRpdGllcywgaWQpXG4gICAgOiByZWZFbnRpdHlTcmNcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZVByb3BlcnR5UmVmZXJlbmNlcyAoY29udGVudCwgcHJvcGVydHlOYW1lLCBwcm9wZXJ0eVZhbHVlKSB7XG4gIGNvbnN0IHJlc29sdmVkVmFsdWUgPSBwcm9wZXJ0eVZhbHVlLm1hcChyZWZFbnRpdHlTcmMgPT5cbiAgICBnZXRSZWZlcmVuY2VkRW50aXR5KGNvbnRlbnQsIHJlZkVudGl0eVNyYykpXG5cbiAgaWYgKGlzU2luZ2xlRW50aXR5UmVmZXJlbmNlKHByb3BlcnR5TmFtZSwgcHJvcGVydHlWYWx1ZVswXS5wb3N0X3R5cGUpKSB7XG4gICAgcmV0dXJuIHJlc29sdmVkVmFsdWVbMF1cbiAgfVxuXG4gIHJldHVybiByZXNvbHZlZFZhbHVlXG59XG5cbmZ1bmN0aW9uIGlzU2luZ2xlRW50aXR5UmVmZXJlbmNlIChzcmNQcm9wZXJ0eU5hbWUsIGRzdFByb3BlcnR5TmFtZSkge1xuICBjb25zdCByZWdleHAgPSAvXig/Oi4qXyk/KC4rKSQvXG4gIGNvbnN0IHNyYyA9IHJlZ2V4cC5leGVjKHNyY1Byb3BlcnR5TmFtZSlbMV1cbiAgY29uc3QgZHN0ID0gcmVnZXhwLmV4ZWMoZHN0UHJvcGVydHlOYW1lKVsxXVxuXG4gIHJldHVybiBzcmMgPT09IGRzdFxufVxuXG5mdW5jdGlvbiBnZXRCeUlkIChlbnRpdGllcywgaWQpIHtcbiAgZm9yIChjb25zdCBlbnRpdHkgb2YgZW50aXRpZXMpIHtcbiAgICBpZiAoZW50aXR5LmlkID09PSBpZCkgcmV0dXJuIGVudGl0eVxuICB9XG5cbiAgdGhyb3cgbmV3IEVycm9yKGBFbnRpdHkgd2l0aCBpZDogJyR7aWR9JyB3YXMgbm90IGZvdW5kIGluIGdpdmVuIGxpc3RgKVxufVxuIl19