import reactNodeToString from '../reactNodeToString'

export default function containMatchingElement ({ wrapper, markup, arg1, sig }) {
  this.assert(
    wrapper.wrapper.containsMatchingElement(arg1),
    () => 'expected ' + sig + ' to contain matching ' + reactNodeToString(arg1) + markup(),
    () => 'expected ' + sig + ' not to contain matching ' + reactNodeToString(arg1) + markup(),
    arg1
  )
}
