import printDebug from './debug'

import checked from './assertions/checked'
import className from './assertions/className'
import contain from './assertions/contain'
import containMatchingElement from './assertions/containMatchingElement'
import descendants from './assertions/descendants'
import disabled from './assertions/disabled'
import empty from './assertions/empty'
import exist from './assertions/exist'
import generic from './assertions/generic'
import props from './assertions/props'
import html from './assertions/html'
import id from './assertions/id'
import match from './assertions/match'
import ref from './assertions/ref'
import selected from './assertions/selected'
import tagName from './assertions/tagName'
import text from './assertions/text'
import type from './assertions/type'
import value from './assertions/value'
import exactly from './chains/exactly'
import ChaiWrapper from './ChaiWrapper'

const plugins = new Map()

module.exports = function (debug = printDebug) {
  let plugin = plugins.get(debug)

  if (plugin) { return plugin }

  plugin = function (chai, utils) {
    const chaiWrapper = new ChaiWrapper(chai, utils, debug)

    chaiWrapper.addAssertion(generic('attr', 'attribute'), 'attr')
    chaiWrapper.addAssertion(generic('data', 'data attribute'), 'data')
    chaiWrapper.addAssertion(generic('style', 'CSS style property'), 'style')
    chaiWrapper.addAssertion(generic('state', 'state'), 'state')
    chaiWrapper.addAssertion(generic('prop', 'prop'), 'prop')

    chaiWrapper.addAssertion(props, 'props')
    chaiWrapper.addAssertion(checked, 'checked')
    chaiWrapper.addAssertion(className, 'className')
    chaiWrapper.addAssertion(disabled, 'disabled')
    chaiWrapper.addAssertion(id, 'id')
    chaiWrapper.addAssertion(selected, 'selected')
    chaiWrapper.addAssertion(value, 'value')
    chaiWrapper.addAssertion(match, 'match')
    chaiWrapper.addAssertion(descendants, 'descendants')
    chaiWrapper.addAssertion(ref, 'ref')
    chaiWrapper.addAssertion(html, 'html')
    chaiWrapper.addAssertion(tagName, 'tagName')
    chaiWrapper.addAssertion(text, 'text')
    chaiWrapper.addAssertion(type, 'type')

    chaiWrapper.overwriteProperty(empty, 'empty')
    chaiWrapper.addAssertion(empty, 'blank')

    chaiWrapper.overwriteProperty(exist, 'exist')
    chaiWrapper.addAssertion(exist, 'present')

    chaiWrapper.overwriteChainableMethod(contain, 'contain')
    chaiWrapper.addAssertion(containMatchingElement, 'containMatchingElement')

    chaiWrapper.addChainableMethod(exactly, 'exactly')
  }

  plugins.set(debug, plugin)

  return plugin
}
