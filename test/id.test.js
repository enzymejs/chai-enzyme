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

describe('#id', () => {
  describe('(id)', () => {
    it('passes when the actual matches the expected', (wrapper) => {
      expect(wrapper).to.have.id('root')
      expect(wrapper.find('span')).to.have.id('child')
    })

    it('passes negated when the actual does not match the expected', (wrapper) => {
      expect(wrapper).to.not.have.id('child')
      expect(wrapper.find('span')).to.not.have.id('root')
    })

    it('fails when the actual does not match the expected', (wrapper) => {
      expect(() => {
        expect(wrapper).to.have.id('child')
      }).to.throw("to have a 'child' id")

      expect(() => {
        expect(wrapper.find('span')).to.have.id('root')
      }).to.throw("to have a 'root' id")

      expect(() => {
        expect(wrapper).to.not.id('root')
      }).to.throw("not to have a 'root' id")

      expect(() => {
        expect(wrapper.find('span')).to.not.have.id('child')
      }).to.throw("not to have a 'child' id")
    })

    it('fails when the actual is undefined', () => {
      expect(() => {
        expect(undefined).to.have.id('child')
      }).to.throw()
    })
  })
})
