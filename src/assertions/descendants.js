export default function descendants ({ wrapper, markup, arg1, sig, flag }) {
  const exactlyCount = flag(this, 'exactlyCount')

  if (exactlyCount) {
    const descendantCount = wrapper.getDescendantsCount(arg1)

    this.assert(
        descendantCount === exactlyCount,
        () => 'expected ' + sig + ' to have ' + exactlyCount + ' descendants #{exp} but actually found ' + descendantCount + markup(),
        () => 'expected ' + sig + ' not to have ' + exactlyCount + ' descendants #{exp} but actually found ' + descendantCount + markup(),
        arg1
    )
  } else {
    this.assert(
        wrapper.hasDescendants(arg1),
        () => 'expected ' + sig + ' to have descendants #{exp} ' + markup(),
        () => 'expected ' + sig + ' not to have descendants #{exp} ' + markup(),
        arg1
    )
  }
}
