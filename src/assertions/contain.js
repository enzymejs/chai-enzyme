export default function contain ({ wrapper, markup, arg1, sig }) {
  this.assert(
    wrapper.hasNode(arg1),
    () => 'expected ' + sig + ' to contain #{exp} ' + markup(),
    () => 'expected ' + sig + ' not to contain #{exp} ' + markup(),
    arg1
  )
}
