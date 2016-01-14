export default function descendants ({ wrapper, markup, arg1, sig }) {
  this.assert(
    wrapper.hasDescendants(arg1),
    () => 'expected ' + sig + ' to have descendants #{exp} ' + markup(),
    () => 'expected ' + sig + ' not to have descendants #{exp} ' + markup(),
    arg1
  )
}
