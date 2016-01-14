export default function ref ({ wrapper, markup, arg1, sig }) {
  this.assert(
    wrapper.hasRef(arg1),
    () => 'expected ' + sig + ' to have a #{exp} ref ' + markup(),
    () => 'expected ' + sig + ' not to have a #{exp} ref ' + markup(),
    arg1
  )
}
