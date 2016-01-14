export default function empty ({ wrapper, markup, sig }) {
  this.assert(
    wrapper.isEmpty(),
    () => 'expected ' + sig + ' to be empty ' + markup(),
    () => 'expected ' + sig + ' not to be empty ' + markup()
  )
}
