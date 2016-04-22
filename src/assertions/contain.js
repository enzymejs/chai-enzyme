import reactElementToJSXString from 'react-element-to-jsx-string'

export default function contain ({ wrapper, markup, arg1, sig }) {
  const arg1JSXString = reactElementToJSXString(arg1)

  this.assert(
    wrapper.hasNode(arg1),
    () => 'expected ' + sig + ' to contain ' + arg1JSXString + markup(),
    () => 'expected ' + sig + ' not to contain ' + arg1JSXString + markup(),
    arg1
  )
}
