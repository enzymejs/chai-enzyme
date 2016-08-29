export default function type ({wrapper, markup, arg1, sig}) {
  const actual = wrapper.type()

  this.assert(
    actual === arg1,
    () => `expected ${sig} to be of type #{exp}, but it is of type #{act} ${markup()}`,
    () => `expected ${sig} to not be of type #{exp}, but it is of type #{act} ${markup()}`,
    arg1,
    actual
  )
}
