import {mount, render, shallow} from 'enzyme'

const defaults = {
  shallow: true,
  mount: true,
  render: true
}

function register (builder, desc, test, subject, options) {
  const use = Object.assign({}, defaults, options)

  if (use.shallow) {
    builder(`(shallow): ${desc}`, () => {
      test(shallow(subject))
    })
  }

  if (use.mount) {
    builder(`(mount): ${desc}`, () => {
      test(mount(subject))
    })
  }

  if (use.render) {
    builder(`(render): ${desc}`, () => {
      test(render(subject))
    })
  }
}

export default function createTest (subject) {
  return function (desc, test, options = {}) {
    register(it, desc, test, subject, options)
  }
}
