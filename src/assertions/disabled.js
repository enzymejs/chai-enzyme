export default function disabled ({ wrapper, markup, sig }) {
  this.assert(
    wrapper.isDisabled(),
    () => 'expected ' + sig + ' to be disabled ' + markup(),
    () => 'expected ' + sig + ' not to be disabled ' + markup()
  )
}
