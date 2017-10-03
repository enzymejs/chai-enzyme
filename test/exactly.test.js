class Fixture extends React.Component {
  render () {
    return (
      <div>
        <div id='root'>
          <div id='child'>
            <div className='multiple' />
            <div className='multiple' />
            <div className='multiple' />
            <div className='multiple' />
            <div className='multiple' />
            <div className='multiple' />
            <div className='multiple' />
            <div className='multiple' />
            <span id='last' />
          </div>
        </div>
      </div>
    )
  }
}

const it = createTest(<Fixture />)

describe('#exactly', () => {
  describe('descendants', () => {
    it('passes when the actual matches the expected', (wrapper) => {
      expect(wrapper).to.have.descendants('#root')
      expect(wrapper.find('#child')).to.have.descendants('#last')
      expect(wrapper).to.not.have.exactly(2).descendants('.multiple')
      expect(wrapper).to.have.exactly(8).descendants('.multiple')
    })

    it('passes when the the expected is 0 and there are none', (wrapper) => {
      expect(wrapper).to.have.exactly(0).descendants('#root1')
    })

    it('passes negated when the actual does not match the expected', (wrapper) => {
      expect(wrapper).to.not.have.exactly(3).descendants('#root1')
      expect(wrapper.find('#child')).to.not.have.exactly(5).descendants('#last1')
    })

    it('fails when the actual does not match the expected', (wrapper) => {
      expect(() => {
        expect(wrapper).to.have.exactly(3).descendants('.multiple')
      }).to.throw("to have 3 descendants '.multiple'")

      expect(() => {
        expect(wrapper.find('#child')).exactly(100).descendants('.multiple')
      }).to.throw("to have 100 descendants '.multiple'")

      expect(() => {
        expect(wrapper).to.not.have.exactly(8).descendants('.multiple')
      }).to.throw("not to have 8 descendants '.multiple'")
    })

    it('fails when the the expected is 0 and there are some', (wrapper) => {
      expect(() => {
        expect(wrapper).to.have.exactly(0).descendants('#root')
      }).to.throw("to have 0 descendants '#root'")
    })
  })
})
