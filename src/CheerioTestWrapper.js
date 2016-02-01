import TestWrapper from './TestWrapper'

export default class CheerioTestWrapper extends TestWrapper {
  constructor (wrapper) {
    super()
    this.wrapper = wrapper

    if (wrapper.first()['0'].type === 'root') {
      this.el = wrapper.children().first()
    } else {
      this.el = wrapper.first()
    }
  }

  inspect () {
    return 'the node in <??? />'
  }

  isEmpty () {
    if (this.tagName() === 'noscript') {
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
    return this.el.hasClass(name)
  }

  classNames () {
    return this.el.attr('class')
  }

  value () {
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
