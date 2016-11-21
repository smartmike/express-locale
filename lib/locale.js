"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function splitLocale(locale) {
  var _locale$match = locale.match(/([a-z]{2})(?:_([a-z]{2}))?/i),
      _locale$match2 = _slicedToArray(_locale$match, 3),
      language = _locale$match2[1],
      region = _locale$match2[2];

  var result = { language: language.toLowerCase() };

  if (region) {
    result.region = region.toUpperCase();
  }

  return result;
};

function createLocale(code, source) {
  var cachedString = void 0;

  var proto = _extends({}, splitLocale(code), {
    toString: function toString() {
      if (!cachedString) {
        cachedString = proto.language + "_" + proto.region;
      }

      return cachedString;
    }
  });

  if (source) {
    proto.source = source;
  }

  return proto;
}

module.exports = createLocale;