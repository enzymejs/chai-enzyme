class Fixture extends React.Component {
  render () {
    return (
      <div id='root'>
        <span id='child'>test</span>
      </div>
    )
  }
}

const it = createTest(<Fixture />)

describe('#match', () => {
  describe('(selector)', () => {
    it('passes when the actual matches the expected', (wrapper) => {
      expect(wrapper.find('#root')).to.match('#root')
      expect(wrapper.find('span')).to.match('#child')
    })

    it('passes negated when the actual does not match the expected', (wrapper) => {
      expect(wrapper.find('#root')).to.not.match('#child')
      expect(wrapper.find('span')).to.not.match('#root')
    })

    it('fails when the actual does not match the expected', (wrapper) => {
      expect(() => {
        expect(wrapper.find('#root')).to.match('#child')
      }).to.throw("to match '#child'")

      expect(() => {
        expect(wrapper.find('span')).to.match('#root')
      }).to.throw("to match '#root'")

      expect(() => {
        expect(wrapper.find('#root')).to.not.match('#root')
      }).to.throw("not to match '#root'")

      expect(() => {
        expect(wrapper.find('span')).to.not.match('#child')
      }).to.throw("not to match '#child'")
    })
  })
})
