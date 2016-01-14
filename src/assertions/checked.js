export default function checked ({ wrapper, markup, sig }) {
  this.assert(
    wrapper.isChecked(),
    () => 'expected ' + sig + ' to be checked ' + markup(),
    () => 'expected ' + sig + ' not to be checked ' + markup()
  )
}
