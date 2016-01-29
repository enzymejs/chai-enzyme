export default class TestWrapper {
  isPresent () {
    return this.wrapper.length > 0
  }

  isEmpty () {
    return this.wrapper.children().length === 0
  }

  hasId (id) {
    return this.id() === id
  }

  hasValue (value) {
    return this.value() === value
  }

  hasDescendants (selector) {
    return this.getDescendantsCount(selector) > 0
  }

  getDescendantsCount (selector) {
    return this.wrapper.find(selector).length
  }

  state (key) {
    return this.wrapper.state(key)
  }

  prop (key) {
    return this.wrapper.prop(key)
  }

  text () {
    return this.wrapper.text()
  }
}
