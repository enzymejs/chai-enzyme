import reactElementToJSXString from 'react-element-to-jsx-string'

function reactArrayToJSXString (nodes) {
  let jsxString = '['
  nodes.forEach((node, idx) => {
    jsxString += `\n  ${reactElementToJSXString(node)}`
    if (idx < nodes.length - 1) {
      jsxString += ','
    }
  })
  return `${jsxString}\n]`
}

export default function reactNodeToString (node) {
  if (Array.isArray(node)) {
    return reactArrayToJSXString(node)
  } else {
    return reactElementToJSXString(node)
  }
}
