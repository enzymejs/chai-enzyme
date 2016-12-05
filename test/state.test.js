class Fixture extends React.Component {
  constructor () {
    super()
    this.state = { foo: 'bar' }
  }

  render () {
    return (
      <div id='root' />
    )
  }
}

const it = createTest(<Fixture />)

describe('#state', () => {
  describe('(key)', () => {
    it('passes when the actual matches the expected', (wrapper) => {
      expect(wrapper).to.have.state('foo')
    }, { render: false })

    it('passes negated when the actual does not match the expected', (wrapper) => {
      expect(wrapper).to.not.have.state('bar')
    }, { render: false })

    it('fails when the actual does not match the expected', (wrapper) => {
      expect(() => {
        expect(wrapper).to.have.state('bar')
      }).to.throw("to have a 'bar' state")

      expect(() => {
        expect(wrapper).to.not.have.state('foo')
      }).to.throw("to have a 'foo' state")
    }, { render: false })
  })

  describe('(key, value)', () => {
    it('passes when the actual matches the expected', (wrapper) => {
      expect(wrapper).to.have.state('foo', 'bar')
    }, { render: false })

    it('passes negated when the actual does not match the expected', (wrapper) => {
      expect(wrapper).to.not.have.state('foo', 'baz')
    }, { render: false })

    it('fails when the actual does not match the expected', (wrapper) => {
      expect(() => {
        expect(wrapper).to.have.state('foo', 'baz')
      }).to.throw("to have a 'foo' state with the value 'baz'")

      expect(() => {
        expect(wrapper).to.not.have.state('foo', 'bar')
      }).to.throw("not to have a 'foo' state with the value 'bar'")

      expect(() => {
        expect(wrapper).to.have.state('foo', undefined)
      }).to.throw("to have a 'foo' state with the value undefined")
    }, { render: false })
  })

  it('chains', (wrapper) => {
    expect(wrapper).to.have.state('foo').equal('bar')
  }, { render: false })

  it('fails when the actual is undefined', () => {
    expect(() => {
      expect(undefined).to.have.state('foo')
    }).to.throw()
  })
})
