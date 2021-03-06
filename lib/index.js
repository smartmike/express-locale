'use strict';

require('babel-polyfill');

var _cookie = require('./lookup/cookie');

var _cookie2 = _interopRequireDefault(_cookie);

var _query = require('./lookup/query');

var _query2 = _interopRequireDefault(_query);

var _hostname = require('./lookup/hostname');

var _hostname2 = _interopRequireDefault(_hostname);

var _default = require('./lookup/default');

var _default2 = _interopRequireDefault(_default);

var _acceptLanguage = require('./lookup/accept-language');

var _acceptLanguage2 = _interopRequireDefault(_acceptLanguage);

var _map = require('./lookup/map');

var _map2 = _interopRequireDefault(_map);

var _locale2 = require('./locale');

var _locale3 = _interopRequireDefault(_locale2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LOOKUP_CREATORS = {
  'cookie': _cookie2.default,
  'query': _query2.default,
  'hostname': _hostname2.default,
  'accept-language': _acceptLanguage2.default,
  'map': _map2.default,
  'default': _default2.default
};

var nonLocaleCharacters = /[^a-z]/ig;
var trailingUnderscores = /^_+|_+$/g;
var languageOrLocale = /^[a-z]{2}(?:_[a-z]{2})?$/i;

function trimLocale(locale) {
  return locale.replace(nonLocaleCharacters, '_').replace(trailingUnderscores, '');
}

function isLanguageOrLocale(locale) {
  return languageOrLocale.test(locale);
}

function createLocaleMiddleware() {
  var _marked = [lookup].map(regeneratorRuntime.mark);

  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  options = Object.assign({
    priority: ['accept-language', 'default']
  }, options);

  var lookups = Object.assign(Object.keys(LOOKUP_CREATORS).reduce(function (result, lookup) {
    result[lookup] = LOOKUP_CREATORS[lookup](options[lookup]);
    return result;
  }, {}), options.lookups || {});

  if (typeof options.priority === 'string') {
    options.priority = options.priority.split(/ *, */g);
  }

  if (!options.priority.every(function (source) {
    return source in lookups;
  })) {
    var notFound = options.priority.filter(function (source) {
      return !(source in lookups);
    });

    throw Error('Undefined lookup' + (notFound.length === 1 ? '' : 's') + ' (' + notFound.join(', ') + ')');
  }

  function isAllowed(locale) {
    return !options.allowed || options.allowed.indexOf(locale) >= 0;
  }

  function lookup(req, all) {
    var _this = this;

    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _loop, _iterator, _step;

    return regeneratorRuntime.wrap(function lookup$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context2.prev = 3;
            _loop = regeneratorRuntime.mark(function _loop() {
              var source, locales, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, locale;

              return regeneratorRuntime.wrap(function _loop$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      source = _step.value;
                      locales = lookups[source](req, all);


                      if (typeof locales === 'string') {
                        locales = [locales];
                      }

                      if (!(Array.isArray(locales) && locales.length > 0)) {
                        _context.next = 31;
                        break;
                      }

                      locales = locales.map(trimLocale).filter(isLanguageOrLocale).filter(isAllowed).map(function (code) {
                        return (0, _locale3.default)(code, source);
                      });

                      _iteratorNormalCompletion2 = true;
                      _didIteratorError2 = false;
                      _iteratorError2 = undefined;
                      _context.prev = 8;
                      _iterator2 = locales[Symbol.iterator]();

                    case 10:
                      if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                        _context.next = 17;
                        break;
                      }

                      locale = _step2.value;
                      _context.next = 14;
                      return locale;

                    case 14:
                      _iteratorNormalCompletion2 = true;
                      _context.next = 10;
                      break;

                    case 17:
                      _context.next = 23;
                      break;

                    case 19:
                      _context.prev = 19;
                      _context.t0 = _context['catch'](8);
                      _didIteratorError2 = true;
                      _iteratorError2 = _context.t0;

                    case 23:
                      _context.prev = 23;
                      _context.prev = 24;

                      if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                      }

                    case 26:
                      _context.prev = 26;

                      if (!_didIteratorError2) {
                        _context.next = 29;
                        break;
                      }

                      throw _iteratorError2;

                    case 29:
                      return _context.finish(26);

                    case 30:
                      return _context.finish(23);

                    case 31:
                    case 'end':
                      return _context.stop();
                  }
                }
              }, _loop, _this, [[8, 19, 23, 31], [24,, 26, 30]]);
            });
            _iterator = options.priority[Symbol.iterator]();

          case 6:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context2.next = 11;
              break;
            }

            return _context2.delegateYield(_loop(), 't0', 8);

          case 8:
            _iteratorNormalCompletion = true;
            _context2.next = 6;
            break;

          case 11:
            _context2.next = 17;
            break;

          case 13:
            _context2.prev = 13;
            _context2.t1 = _context2['catch'](3);
            _didIteratorError = true;
            _iteratorError = _context2.t1;

          case 17:
            _context2.prev = 17;
            _context2.prev = 18;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 20:
            _context2.prev = 20;

            if (!_didIteratorError) {
              _context2.next = 23;
              break;
            }

            throw _iteratorError;

          case 23:
            return _context2.finish(20);

          case 24:
            return _context2.finish(17);

          case 25:
          case 'end':
            return _context2.stop();
        }
      }
    }, _marked[0], this, [[3, 13, 17, 25], [18,, 20, 24]]);
  }

  var middleware = function middleware(req, res, next) {
    var locales = [];
    var result = void 0;
    var languageBuffer = void 0;

    function filterResult(locale) {
      if ('region' in locale) {
        if (languageBuffer) {
          if (languageBuffer.language === locale.language) {
            if (languageBuffer.source !== locale.source) {
              locale.source = [languageBuffer.source, locale.source];
            }

            return locale;
          }
        } else {
          return locale;
        }
      } else {
        if (!languageBuffer) {
          languageBuffer = locale;
        }
      }
    }

    // perform lookups one by one, exiting early
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = lookup(req, locales)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var _locale = _step3.value;

        if (result = filterResult(_locale)) {
          break;
        }

        locales.push(_locale);
      }

      // if no early exit was found, eliminate results one by one
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3.return) {
          _iterator3.return();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }

    while (!result && locales.length > 0) {
      languageBuffer = undefined;
      locales.shift();

      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = locales[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var locale = _step4.value;

          if (result = filterResult(locale)) {
            break;
          }
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }
    }

    req.locale = result;

    next();
  };

  return middleware;
}

module.exports = createLocaleMiddleware;