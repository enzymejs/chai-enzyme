class Fixture extends React.Component {
  render () {
    return (
      <div id='parent'></div>
    )
  }
}

const it = createTest(<Fixture />)

describe('#exist', () => {
  describe('()', () => {
    it('passes when the actual matches the expected', (wrapper) => {
      expect(wrapper.find('#parent')).to.exist
    })

    it('fails when the actual does not match the expected', (wrapper) => {
      expect(() => {
        expect(wrapper.find('#parent')).to.not.exist
      }).to.throw(`not to exist`)
    })
  })
})
