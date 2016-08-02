export default function html ({ wrapper, markup, flag, arg1, sig }) {
  const actual = wrapper.html()

  if (undefined !== arg1) {
    if (flag(this, 'contains')) {
      this.assert(
        actual.includes(String(arg1)),
        () => 'expected ' + sig + ' to contain html #{exp}, but it has #{act} ' + markup(),
        () => 'expected ' + sig + ' not to contain html #{exp}, but it has #{act} ' + markup(),
        arg1,
        actual
      )
    } else {
      this.assert(
        actual === arg1,
        () => 'expected ' + sig + ' to be #{exp}, but it was #{act} ' + markup(),
        () => 'expected ' + sig + ' not to be #{exp}, but it was #{act} ' + markup(),
        arg1,
        actual
      )
    }
  }

  flag(this, 'object', actual)
}
