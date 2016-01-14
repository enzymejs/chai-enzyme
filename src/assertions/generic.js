export default function generic (assertion, desc) {
  return function ({ wrapper, markup, flag, inspect, arg1, arg2, sig }) {
    const actual = wrapper[assertion](arg1)

    if (!flag(this, 'negate') || undefined === arg2) {
      this.assert(
        undefined !== actual,
        () => 'expected ' + sig + ' to have a #{exp} ' + desc + markup(),
        () => 'expected ' + sig + ' not to have a #{exp} ' + desc + markup(),
        arg1
      )
    }

    if (undefined !== arg2) {
      this.assert(
        arg2 === actual,
        () => 'expected ' + sig + ' to have a ' + inspect(arg1) + ' ' + desc + ' with the value #{exp}, but the value was #{act}' + markup(),
        () => 'expected ' + sig + ' not to have a ' + inspect(arg1) + ' ' + desc + ' with the value #{act}' + markup(),
        arg2,
        actual
      )
    }

    flag(this, 'object', actual)
  }
}
