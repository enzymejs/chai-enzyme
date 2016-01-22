class Fixture extends React.Component {
  render () {
    return (
      <div>
        <input defaultValue='test' />
      </div>
    )
  }
}

const it = createTest(<Fixture />)

describe('#value', () => {
  describe('(value)', () => {
    it('passes when the actual matches the expected', (wrapper) => {
      expect(wrapper.find('input')).to.have.value('test')
    })

    it('passes negated when the actual does not match the expected', (wrapper) => {
      expect(wrapper.find('input')).to.not.have.value('other')
    })

    it('fails when the actual does not match the expected', (wrapper) => {
      expect(() => {
        expect(wrapper.find('input')).to.have.value('other')
      }).to.throw(`to have a 'other' value`)

      expect(() => {
        expect(wrapper.find('input')).to.not.have.value('test')
      }).to.throw(`not to have a 'test' value`)
    })

    it('fails when actual is undefined', () => {
      expect(() => {
        expect(undefined).to.have.value('test')
      }).to.throw()
    })
  })
})
