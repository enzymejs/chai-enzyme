export default function tagName ({ wrapper, markup, arg1, sig }) {
  const actual = wrapper.tagName()

  this.assert(
    actual === arg1,
    () => 'expected ' + sig + ' to have a #{exp} tag name, but it has #{act} ' + markup(),
    () => 'expected ' + sig + ' not to have a #{exp} tag name, but it has #{act} ' + markup(),
    arg1,
    actual
  )
}
