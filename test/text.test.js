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

describe('#text', () => {
  describe('(text)', () => {
    it('passes when the actual matches the expected', (wrapper) => {
      expect(wrapper.find('#child')).to.have.text('Test')
    })

    it('passes negated when the actual does not match the expected', (wrapper) => {
      expect(wrapper.find('#child')).to.not.have.text('Other text')
    })

    it('fails when the actual does not match the expected', (wrapper) => {
      expect(() => {
        expect(wrapper.find('#child')).to.have.text('Other text')
      }).to.throw("to have text 'Other text'")

      expect(() => {
        expect(wrapper.find('#child')).to.not.have.text('Test')
      }).to.throw("not to have text 'Test'")
    })

    it('chains', (wrapper) => {
      expect(wrapper.find('#child')).to.have.text().match(/Test/)
    })

    it('works with contain/include', (wrapper) => {
      expect(wrapper.find('#child')).to.contain.text('Te')
      expect(wrapper.find('#child')).to.include.text('Te')
      expect(wrapper.find('#child')).to.not.contain.text('other')
      expect(wrapper.find('#child')).to.not.include.text('other')
    })

    it('fails when the actual is undefined', () => {
      expect(() => {
        expect(undefined).to.have.text('Test')
      }).to.throw()
    })
  })
})
