class Fixture extends React.Component {
  render () {
    return (
      <div>
        <input id='checked' defaultChecked />
        <input id='not' defaultChecked={false} />
      </div>
    )
  }
}

const it = createTest(<Fixture />)

describe('#checked', () => {
  describe('()', () => {
    it('passes when the actual matches the expected', (wrapper) => {
      expect(wrapper.find('#checked')).to.be.checked()
    })

    it('passes negated when the actual does not match the expected', (wrapper) => {
      expect(wrapper.find('#not')).to.not.be.checked()
    })

    it('fails when the actual does not match the expected', (wrapper) => {
      expect(() => {
        expect(wrapper.find('#not')).to.be.checked()
      }).to.throw('to be checked')

      expect(() => {
        expect(wrapper.find('#checked')).to.not.be.checked()
      }).to.throw('not to be checked')
    })

    it('fails when the actual is undefined', () => {
      expect(() => {
        expect(undefined).to.be.checked()
      }).to.throw()
    })
  })
})
