export default function selected ({ wrapper, markup, sig }) {
  this.assert(
    wrapper.isSelected(),
    () => 'expected ' + sig + ' to be selected ' + markup(),
    () => 'expected ' + sig + ' not to be selected ' + markup()
  )
}
