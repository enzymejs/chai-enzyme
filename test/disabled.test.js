class Fixture extends React.Component {
  render () {
    return (
      <div>
        <input id='disabled' disabled />
        <input id='not' />
      </div>
    )
  }
}

const it = createTest(<Fixture />)

describe('#disabled', () => {
  describe('()', () => {
    it('passes when the actual matches the expected', (wrapper) => {
      expect(wrapper.find('#disabled')).to.be.disabled()
    })

    it('passes negated when the actual does not match the expected', (wrapper) => {
      expect(wrapper.find('#not')).to.not.be.disabled()
    })

    it('fails when the actual does not match the expected', (wrapper) => {
      expect(() => {
        expect(wrapper.find('#not')).to.be.disabled()
      }).to.throw('to be disabled')

      expect(() => {
        expect(wrapper.find('#disabled')).to.not.be.disabled()
      }).to.throw('not to be disabled')
    })

    it('fails when the actual is undefined', () => {
      expect(() => {
        expect(undefined).to.be.disabled()
      }).to.throw()
    })
  })
})
