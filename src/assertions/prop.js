// purpose: enzyme `prop` calls `props()[key]` and doesn't need to check existance but chai-enzyme should
// so that:
//   thing = shallow(<Thing arg={undefined} />)
// passes for:
//   expect(thing).to.have.prop('arg')

export default function ref (args) {
  const { wrapper, markup, flag, inspect, arg1, arg2, sig } = args

  const props = wrapper.props()
  const actual = props[arg1]
  if ('arg2' in args) {
    this.assert(
      actual === arg2,
      () => 'expected ' + sig + ' to have a ' + inspect(arg1) + ' prop with the value #{exp}, but the value was #{act}' + markup(),
      () => 'expected ' + sig + ' not to have a ' + inspect(arg1) + ' prop with the value #{act}' + markup(),
      arg2,
      actual
    )
  } else {
    this.assert(
      arg1 in props,
      () => 'expected ' + sig + ' to have a #{exp} prop' + markup(),
      () => 'expected ' + sig + ' not to have a #{exp} prop' + markup(),
      arg1
    )
  }
  flag(this, 'object', actual)
}
