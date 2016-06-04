import {findDOMNode} from 'enzyme/build/react-compat'

import TestWrapper from './TestWrapper'

export default class ReactTestWrapper extends TestWrapper {
  constructor (wrapper) {
    super()
    this.wrapper = wrapper
  }

  get el () {
    if (!this.__el) {
      this.__el = this.wrapper.single((n) => findDOMNode(n))
    }

    return this.__el
  }

  inspect () {
    const name = this.wrapper.root.node.constructor.displayName ||
      this.wrapper.root.node.constructor.name ||
      '???'

    if (this.wrapper.root === this.wrapper) {
      return `<${name} />`
    }

    return `the node in <${name} />`
  }

  attr (name) {
    if (this.el.hasAttribute(name)) {
      return this.el.getAttribute(name) || ''
    }
  }

  html () {
    return this.el.outerHTML.replace(/\sdata-reactid+="[^"]+"/g, '')
  }

  style (name) {
    return this.el.style[name] || undefined
  }

  tagName () {
    return this.el.tagName.toLowerCase()
  }

  data (name) {
    return this.attr(`data-${name}`)
  }

  hasClass (name) {
    const classes = this.classNames().split(' ')
    return classes.indexOf(name) !== -1
  }

  classNames () {
    return this.el.className
  }

  id () {
    return this.el.id
  }

  value () {
    return this.el.value
  }

  isChecked () {
    return this.el.checked
  }

  isSelected () {
    return this.el.selected
  }

  isDisabled () {
    return this.el.disabled
  }

  is (selector) {
    return this.wrapper.is(selector)
  }

  hasNode (node) {
    return this.wrapper.contains(node)
  }

  hasRef (ref) {
    return !!this.wrapper.instance().refs[ref]
  }
}
