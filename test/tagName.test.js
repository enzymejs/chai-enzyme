class Fixture extends React.Component {
  render () {
    return (
      <div>
        <span />
      </div>
    )
  }
}

const it = createTest(<Fixture />)

describe('#tagName', () => {
  describe('(tagName)', () => {
    it('passes when the actual matches the expected', (wrapper) => {
      expect(wrapper).to.have.tagName('div')
      expect(wrapper.find('span')).to.have.tagName('span')
    })

    it('passes negated when the actual does not match the expected', (wrapper) => {
      expect(wrapper).to.not.have.tagName('a')
      expect(wrapper.find('span')).to.not.have.tagName('a')
    })

    it('fails when the actual does not match the expected', (wrapper) => {
      expect(() => {
        expect(wrapper).to.have.tagName('a')
      }).to.throw("to have a 'a' tag name, but it has 'div'")

      expect(() => {
        expect(wrapper.find('span')).to.have.tagName('a')
      }).to.throw("to have a 'a' tag name, but it has 'span'")
    })

    it('fails when the actual is undefined', () => {
      expect(() => {
        expect(undefined).to.have.tagName('div')
      }).to.throw()
    })
  })
})
