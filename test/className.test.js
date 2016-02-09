class Fixture extends React.Component {
  render () {
    return (
      <div className='root top'>
        <span className='child bottom'>test</span>
      </div>
    )
  }
}

const it = createTest(<Fixture />)

describe('#className', () => {
  describe('(className)', () => {
    it('passes when the actual matches the expected', (wrapper) => {
      expect(wrapper).to.have.className('root')
      expect(wrapper.find('span')).to.have.className('child')
    })

    it('passes negated when the actual does not match the expected', (wrapper) => {
      expect(wrapper).to.not.have.className('child')
      expect(wrapper.find('span')).to.not.have.className('root')
    })

    it('fails when the actual does not match the expected', (wrapper) => {
      expect(() => {
        expect(wrapper).to.have.className('child')
      }).to.throw("to have a 'child' class")

      expect(() => {
        expect(wrapper.find('span')).to.have.className('root')
      }).to.throw("to have a 'root' class")

      expect(() => {
        expect(wrapper).to.not.className('root')
      }).to.throw("not to have a 'root' class")

      expect(() => {
        expect(wrapper.find('span')).to.not.have.className('child')
      }).to.throw("not to have a 'child' class")
    })

    it('fails when the actual is undefined', () => {
      expect(() => {
        expect(undefined).to.have.className('child')
      }).to.throw()
    })
  })
})
