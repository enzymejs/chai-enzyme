class Fixture extends React.Component {
  render () {
    return (
      <div>
        <input ref='test' />
      </div>
    )
  }
}

const it = createTest(<Fixture />)

describe('#ref', () => {
  describe('(key)', () => {
    it('passes when the actual matches the expected', (wrapper) => {
      expect(wrapper).to.have.ref('test')
    }, { render: false, shallow: false })

    it('passes negated when the actual does not match the expected', (wrapper) => {
      expect(wrapper).to.not.have.ref('random')
    }, { render: false, shallow: false })

    it('fails when the actual does not match the expected', (wrapper) => {
      expect(() => {
        expect(wrapper).to.have.ref('random')
      }).to.throw("to have a 'random' ref")

      expect(() => {
        expect(wrapper).to.not.have.ref('test')
      }).to.throw("not to have a 'test' ref")
    }, { render: false, shallow: false })

    it('fails when the actual is undefined', () => {
      expect(() => {
        expect(undefined).to.have.ref('test')
      }).to.throw()
    })
  })
})
