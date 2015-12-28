import {prettyPrint} from 'html'

function indent (n) {
  return Array(n + 1).join(' ')
}

export default function debug (wrapper) {
  const html = prettyPrint(wrapper.html(), { indent_size: 2 })

  const out = `\n\nHTML:\n\n${html}`

  return out.split('\n').map((line) => {
    return indent(5) + line
  }).join('\n')
}
