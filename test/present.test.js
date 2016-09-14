class Fixture extends React.Component {
  render () {
    return (
      <div id='parent' />
    )
  }
}

const it = createTest(<Fixture />)

describe('#present', () => {
  describe('()', () => {
    it('passes when the actual matches the expected', (wrapper) => {
      expect(wrapper.find('#parent')).to.be.present()
    })

    it('fails when the actual does not match the expected', (wrapper) => {
      expect(() => {
        expect(wrapper.find('#parent')).to.not.be.present()
      }).to.throw('not to exist')
    })

    it('fails when the actual is undefined', () => {
      expect(() => {
        expect(undefined).to.be.present()
      }).to.throw()
    })
  })
})
