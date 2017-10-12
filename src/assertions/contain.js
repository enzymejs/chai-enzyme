import reactNodeToString from '../reactNodeToString'

export default function contain ({ wrapper, markup, arg1, sig }) {
  this.assert(
    wrapper.hasNode(arg1),
    () => 'expected ' + sig + ' to contain ' + reactNodeToString(arg1) + markup(),
    () => 'expected ' + sig + ' not to contain ' + reactNodeToString(arg1) + markup(),
    arg1
  )
}
