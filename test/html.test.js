class Fixture extends React.Component {
  render () {
    return (
      <div id='root'>
        <span id='child'>Test</span>
      </div>
    )
  }
}

const it = createTest(<Fixture />)

describe('#html', () => {
  describe('(html)', () => {
    it('passes when the actual matches the expected', (wrapper) => {
      expect(wrapper.find('#child')).to.have.html('<span id="child">Test</span>')
    })

    it('passes negated when the actual does not match the expected', (wrapper) => {
      expect(wrapper.find('#child')).to.not.have.html('<span id="child">Test 1</span>')
    })

    it('fails when the actual does not match the expected', (wrapper) => {
      expect(() => {
        expect(wrapper.find('#child')).to.have.html('<span id="child">Test 1</span>')
      }).to.throw("to be '<span id")

      expect(() => {
        expect(wrapper.find('#child')).to.not.have.html('<span id="child">Test</span>')
      }).to.throw("not to be '<span id")
    })

    it('fails when the actual is undefined', () => {
      expect(() => {
        expect(undefined).to.have.html('<span id="child">Test</span>')
      }).to.throw()
    })

    it('chains', (wrapper) => {
      expect(wrapper.find('#child')).to.have.html().match(/Test/)
    })
  })
})
