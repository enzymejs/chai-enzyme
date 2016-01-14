export default function id ({ wrapper, markup, arg1, sig }) {
  const actual = wrapper.id()

  this.assert(
    wrapper.hasId(arg1),
    () => 'expected ' + sig + ' to have a #{exp} id, but it has #{act} ' + markup(),
    () => 'expected ' + sig + ' not to have a #{exp} id, but it has #{act} ' + markup(),
    arg1,
    actual
  )
}
