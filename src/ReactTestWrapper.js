import {findDOMNode} from 'enzyme/build/react-compat'

import TestWrapper from './TestWrapper'

export default class ReactTestWrapper extends TestWrapper {
  constructor (wrapper) {
    super()
    this.wrapper = wrapper
    this.el = this.wrapper.single((n) => findDOMNode(n))
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
    return this.el.getAttribute(name) || undefined
  }

  html () {
    return this.el.outerHTML.replace(/\sdata-reactid+="[^"]+"/g, '')
  }

  style (name) {
    return this.el.style[name] || undefined
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
    return this.attr('value')
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
