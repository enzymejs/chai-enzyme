export default function ref ({ wrapper, markup, flag, arg1, sig }) {
  const actual = wrapper.props()

  if (Array.isArray(arg1)) {
    this.assert(
      arg1.every(Object.prototype.hasOwnProperty.bind(actual)),
      () => 'expected ' + sig + ' to have props #{exp} but props were #{act} ' + markup(),
      () => 'expected ' + sig + ' not to have props #{exp} but props were #{act} ' + markup(),
      arg1,
      Object.keys(actual)
    )
    flag(this, 'object', arg1.map((key) => actual[key]))
  } else {
    const actualProps = Object.keys(arg1).reduce((props, key) => {
      props[key] = actual[key]
      return props
    }, {})
    this.assert(
      Object.keys(arg1).every((key) => actualProps[key] === arg1[key]),
      () => 'expected ' + sig + ' to have props #{exp} but props were #{act} ' + markup(),
      () => 'expected ' + sig + ' not to have props #{exp} but props were #{act} ' + markup(),
      arg1,
      actualProps
    )
    flag(this, 'object', actualProps)
  }
}
