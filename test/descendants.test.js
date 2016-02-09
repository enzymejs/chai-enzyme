class Fixture extends React.Component {
  render () {
    return (
      <div id='root'>
        <span id='child'>
          <span id='last'></span>
        </span>
      </div>
    )
  }
}

const it = createTest(<Fixture />)

describe('#descendants', () => {
  describe('(selector)', () => {
    it('passes when the actual matches the expected', (wrapper) => {
      expect(wrapper).to.have.descendants('#root')
      expect(wrapper.find('#child')).to.have.descendants('#last')
    })

    it('passes negated when the actual does not match the expected', (wrapper) => {
      expect(wrapper).to.not.have.descendants('#root1')
      expect(wrapper.find('#child')).to.not.have.descendants('#last1')
    })

    it('fails when the actual does not match the expected', (wrapper) => {
      expect(() => {
        expect(wrapper).to.have.descendants('#root1')
      }).to.throw("to have descendants '#root1'")

      expect(() => {
        expect(wrapper.find('#child')).to.have.descendants('#root1')
      }).to.throw("to have descendants '#root1'")

      expect(() => {
        expect(wrapper).to.not.have.descendants('#root')
      }).to.throw("not to have descendants '#root'")

      expect(() => {
        expect(wrapper.find('#child')).to.not.have.descendants('#last')
      }).to.throw("not to have descendants '#last'")
    })

    it('fails when the actual is undefined', () => {
      expect(() => {
        expect(undefined).to.have.descendants('#root')
      }).to.throw()
    })
  })
})
