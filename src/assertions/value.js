export default function value ({ wrapper, markup, arg1, sig }) {
  const actual = wrapper.value()

  this.assert(
    wrapper.hasValue(arg1),
    () => 'expected ' + sig + ' to have a #{exp} value, but it has #{act} ' + markup(),
    () => 'expected ' + sig + ' not to have a #{exp} value, but it has #{act} ' + markup(),
    arg1,
    actual
  )
}
