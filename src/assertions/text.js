export default function text ({ wrapper, markup, flag, arg1, sig }) {
  const actual = wrapper.text()

  if (undefined !== arg1) {
    if (flag(this, 'contains')) {
      this.assert(
        actual.indexOf(String(arg1)) > -1,
        () => 'expected ' + sig + ' to contain text #{exp}, but it has #{act} ' + markup(),
        () => 'expected ' + sig + ' not to contain text #{exp}, but it has #{act} ' + markup(),
        arg1,
        actual
      )
    } else {
      this.assert(
        actual === String(arg1),
        () => 'expected ' + sig + ' to have text #{exp}, but it has #{act} ' + markup(),
        () => 'expected ' + sig + ' not to have text #{exp}, but it has #{act} ' + markup(),
        arg1,
        actual
      )
    }
  }

  flag(this, 'object', actual)
}
