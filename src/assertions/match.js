export default function match ({ wrapper, markup, arg1, sig }) {
  this.assert(
    wrapper.is(arg1),
    () => 'expected ' + sig + ' to match #{exp} ' + markup(),
    () => 'expected ' + sig + ' not to match #{exp} ' + markup(),
    arg1
  )
}
