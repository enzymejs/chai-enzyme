class Foo extends React.Component {
  render () {
    return (
      <div>Foo</div>
    )
  }
}

class Bar extends React.Component {
  render () {
    return (
      <div>Bar</div>
    )
  }
}

class Fixture extends React.Component {
  render () {
    return (
      <Foo />
    )
  }
}

const it = createTest(<Fixture />)

describe('#type', () => {
  describe('(type)', () => {
    it('passes when the actual matches the expected', (wrapper) => {
      expect(wrapper).to.have.type(Foo)
    }, { render: false, mount: false })

    it('passes negated when the actual does not match the expected', (wrapper) => {
      expect(wrapper).to.not.have.type(Bar)
    }, { render: false, mount: false })

    it('fails when the actual does not match the expected', (wrapper) => {
      expect(() => {
        expect(wrapper).to.have.type(Bar)
      }).to.throw('to be of type [Function: Bar], but it is of type [Function: Foo]')
    }, { render: false, mount: false })

    it('fails when the actual is undefined', () => {
      expect(() => {
        expect(undefined).to.have.type(Foo)
      }).to.throw()
    }, { render: false, mount: false })
  })
})
