export default function exist ({ wrapper, markup, sig }) {
  this.assert(
    wrapper.isPresent(),
    () => 'expected ' + sig + ' to exist ' + markup(),
    () => 'expected ' + sig + ' not to exist ' + markup()
  )
}
