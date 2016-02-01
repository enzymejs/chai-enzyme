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
import exactly from './chains/exactly'
import ChaiWrapper from './ChaiWrapper'

module.exports = function (debug = printDebug) {
  return function (chai, utils) {
    const chaiWrapper = new ChaiWrapper(chai, utils, debug)

    chaiWrapper.addAssertion(generic('attr', 'attribute'), 'attr')
    chaiWrapper.addAssertion(generic('data', 'data attribute'), 'data')
    chaiWrapper.addAssertion(generic('style', 'CSS style property'), 'style')
    chaiWrapper.addAssertion(generic('state', 'state'), 'state')
    chaiWrapper.addAssertion(generic('prop', 'prop'), 'prop')

    chaiWrapper.addAssertion(checked)
    chaiWrapper.addAssertion(className)
    chaiWrapper.addAssertion(disabled)
    chaiWrapper.addAssertion(id)
    chaiWrapper.addAssertion(selected)
    chaiWrapper.addAssertion(value)
    chaiWrapper.addAssertion(match)
    chaiWrapper.addAssertion(descendants)
    chaiWrapper.addAssertion(ref)
    chaiWrapper.addAssertion(html)
    chaiWrapper.addAssertion(tagName)
    chaiWrapper.addAssertion(text)

    chaiWrapper.overwriteProperty(empty)
    chaiWrapper.addAssertion(empty, 'blank')

    chaiWrapper.overwriteProperty(exist)
    chaiWrapper.addAssertion(exist, 'present')

    chaiWrapper.overwriteChainableMethod(contain)

    chaiWrapper.addChainableMethod(exactly)
  }
}
