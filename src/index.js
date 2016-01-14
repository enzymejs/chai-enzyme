import wrap from './wrap'
import printDebug from './debug'

import checked from './assertions/checked'
import className from './assertions/className'
import contain from './assertions/contain'
import descendants from './assertions/descendants'
import disabled from './assertions/disabled'
import empty from './assertions/empty'
import exist from './assertions/exist'
import generic from './assertions/generic'
import html from './assertions/html'
import id from './assertions/id'
import match from './assertions/match'
import ref from './assertions/ref'
import selected from './assertions/selected'
import tagName from './assertions/tagName'
import text from './assertions/text'
import value from './assertions/value'

export default function (debug = printDebug) {
  return function (chai, utils) {
    const Assertion = chai.Assertion
    const {flag, inspect} = utils

    function wrapAssertion (assertion, _super) {
      return function (arg1, arg2) {
        const wrapper = wrap(flag(this, 'object'))

        if (!wrapper) {
          return _super.apply(this, arguments)
        }

        assertion.call(this, {
          markup: () => debug(wrapper),
          sig: inspect(wrapper),
          wrapper,
          arg1,
          arg2,
          flag,
          inspect
        })
      }
    }

    function overwriteMethod (assertion, name) {
      name = name || assertion.name

      Assertion.overwriteMethod(name, function (_super) {
        return wrapAssertion(assertion, _super)
      })
    }

    function overwriteProperty (assertion, name) {
      name = name || assertion.name

      Assertion.overwriteProperty(name, function (_super) {
        return wrapAssertion(assertion, _super)
      })
    }

    function overwriteChainableMethod (assertion, name) {
      name = name || assertion.name

      Assertion.overwriteChainableMethod(name, function (_super) {
        return wrapAssertion(assertion, _super)
      }, function (_super) {
        return function () {
          _super.call(this)
        }
      })
    }

    overwriteMethod(generic('attr', 'attribute'), 'attr')
    overwriteMethod(generic('data', 'data attribute'), 'data')
    overwriteMethod(generic('style', 'CSS style property'), 'style')
    overwriteMethod(generic('state', 'state'), 'state')
    overwriteMethod(generic('prop', 'prop'), 'prop')

    overwriteMethod(checked)
    overwriteMethod(className)
    overwriteMethod(disabled)
    overwriteMethod(id)
    overwriteMethod(selected)
    overwriteMethod(value)
    overwriteMethod(match)
    overwriteMethod(descendants)
    overwriteMethod(ref)
    overwriteMethod(html)
    overwriteMethod(tagName)
    overwriteMethod(text)

    overwriteProperty(empty)
    overwriteMethod(empty, 'blank')

    overwriteProperty(exist)
    overwriteMethod(exist, 'present')

    overwriteChainableMethod(contain)
  }
}
