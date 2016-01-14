export default function className ({ wrapper, markup, arg1, sig }) {
  const actual = wrapper.classNames()

  this.assert(
    wrapper.hasClass(arg1),
    () => 'expected ' + sig + ' to have a #{exp} class, but it has #{act} ' + markup(),
    () => 'expected ' + sig + ' not to have a #{exp} class, but it has #{act} ' + markup(),
    arg1,
    actual
  )
}
