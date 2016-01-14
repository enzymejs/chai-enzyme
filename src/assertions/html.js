export default function html ({ wrapper, markup, flag, arg1, sig }) {
  const actual = wrapper.html()

  if (undefined !== arg1) {
    this.assert(
      actual === arg1,
      () => 'expected ' + sig + ' to be #{exp}, but it was #{act} ' + markup(),
      () => 'expected ' + sig + ' not to be #{exp}, but it was #{act} ' + markup(),
      arg1,
      actual
    )
  }

  flag(this, 'object', actual)
}
