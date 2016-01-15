export default function descendantsCount ({ wrapper, markup, arg1, arg2=1, sig }) {
  this.assert(
      wrapper.hasDescendantsCount(arg1, arg2),
      () => 'expected ' + sig + ' to have ' + arg2 + ' descendants #{exp} ' + markup(),
      () => 'expected ' + sig + ' not to have ' + arg2 + ' descendants #{exp} ' + markup(),
      arg1
  )
}

function convenienceHelper(count) {
  return function ({ wrapper, markup, arg1, sig }) {
    const arg2 = count;
    descendantsCount.call(this, { wrapper, markup, arg1, arg2, sig});
  };
}

export const descendantsCountWrappers = {
  oneDescendents: convenienceHelper(1),
  twoDescendents: convenienceHelper(2),
  threeDescendents: convenienceHelper(3),
  fourDescendents: convenienceHelper(4)
};
