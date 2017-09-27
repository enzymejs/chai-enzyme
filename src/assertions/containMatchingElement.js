import reactNodeToString from '../reactNodeToString'

export default function containMatchingElement ({ wrapper, markup, arg1, sig }) {
  const arg1JSXString = reactNodeToString(arg1)

  this.assert(
    wrapper.wrapper.containsMatchingElement(arg1),
    () => 'expected ' + sig + ' to contain matching ' + arg1JSXString + markup(),
    () => 'expected ' + sig + ' not to contain matching ' + arg1JSXString + markup(),
    arg1
  )
}
