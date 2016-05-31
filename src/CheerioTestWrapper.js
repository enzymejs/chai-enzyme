import TestWrapper from './TestWrapper'

export default class CheerioTestWrapper extends TestWrapper {
  constructor (wrapper) {
    super()
    this.wrapper = wrapper
  }

  get el () {
    if (!this.__el) {
      if (this.wrapper.first()['0'].type === 'root') {
        this.__el = this.wrapper.children().first()
      } else {
        this.__el = this.wrapper.first()
      }
    }

    return this.__el
  }

  inspect () {
    return 'the node in <??? />'
  }

  isEmpty () {
    // React 0.14.x returns an element with tag name <noscript />, while
    // 15.x returns no element at all.

    if (this.tagName() === null || this.tagName() === 'noscript') {
      return true
    }

    return super.isEmpty()
  }

  attr (name) {
    return this.el.attr(name)
  }

  html () {
    return this.el.toString()
  }

  innerHtml () {
    return this.el.html()
  }

  style (name) {
    return this.el.css(name)
  }

  tagName () {
    const el = this.el[0]

    if (el) {
      return el.name
    }

    return null
  }

  data (name) {
    return this.el.data(name)
  }

  hasClass (name) {
    return this.el.hasClass(name)
  }

  classNames () {
    return this.el.attr('class')
  }

  value () {
    if (this.tagName() === 'textarea') {
      return this.innerHtml()
    }

    if (this.tagName() === 'select') {
      return this.el.val()
    }

    return this.el.attr('value')
  }

  id () {
    return this.el.attr('id')
  }

  isChecked () {
    return this.is(':checked')
  }

  isDisabled () {
    return this.is(':disabled')
  }

  isSelected () {
    return this.is(':selected')
  }

  is (selector) {
    return this.el.is(selector)
  }

  hasNode () {
    throw new Error('static rendering does not support `contain` yet')
  }

  state () {
    throw new Error('static rendering does not support `state` yet')
  }

  prop () {
    throw new Error('static rendering does not support `prop` yet')
  }

  hasRef () {
    throw new Error('static rendering does not support refs')
  }
}
