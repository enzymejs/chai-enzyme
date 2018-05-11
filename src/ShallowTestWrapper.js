import $ from 'cheerio'

import TestWrapper from './TestWrapper'

const getDisplayName = type => type.displayName || type.name || type

export default class ShallowTestWrapper extends TestWrapper {
  constructor (wrapper) {
    super()
    this.wrapper = wrapper
  }

  get el () {
    if (!this.__el) {
      this.__el = $(this.wrapper.html())
    }

    return this.__el
  }

  inspect () {
    const root = this.root()

    const rootInstance = root.instance()
    const rootType = rootInstance && rootInstance.constructor
    const name = String(rootType ? getDisplayName(rootType) : (root.name() || '???'))

    if (root === this.wrapper) {
      return `<${name} />`
    }

    return `the node in <${name} />`
  }

  attr (name) {
    return this.el.attr(name)
  }

  html () {
    return this.wrapper.debug().replace(/\n(\s*)/g, '')
  }

  style (name) {
    return this.el.css(name)
  }

  tagName () {
    return this.el[0].name
  }

  data (name) {
    return this.el.data(name)
  }

  hasClass (name) {
    return this.wrapper.hasClass(name)
  }

  classNames () {
    return this.wrapper.props().className
  }

  id () {
    return this.wrapper.props().id
  }

  value () {
    if (this.tagName() === 'textarea') {
      return this.el.val()
    }

    if (this.tagName() === 'select') {
      return this.el.val()
    }

    return this.attr('value')
  }

  isChecked () {
    return this.el.is(':checked')
  }

  isDisabled () {
    return this.el.is(':disabled')
  }

  isSelected () {
    throw new Error('not implemented yet')
  }

  is (selector) {
    return this.wrapper.is(selector)
  }

  hasNode (node) {
    return this.wrapper.contains(node)
  }

  hasRef () {
    throw new Error('shallow rendering does not support refs')
  }

  type () {
    return this.wrapper.type()
  }
}
