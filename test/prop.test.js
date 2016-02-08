class User extends React.Component {
  render () {
    return (
      <span>User {this.props.index}</span>
    )
  }
}

User.propTypes = {
  index: React.PropTypes.number.isRequired
}

class Fixture extends React.Component {
  render () {
    return (
      <div>
        <ul>
          <li><User index={1} objectProp={{foo: 'bar'}} /></li>
          <li><User index={2} /></li>
        </ul>
      </div>
    )
  }
}

const it = createTest(<Fixture />)

describe('#prop', () => {
  describe('(key)', () => {
    it('passes when the actual matches the expected', (wrapper) => {
      expect(wrapper.find(User).first()).to.have.prop('index')
    }, { render: false })

    it('passes negated when the actual does not match the expected', (wrapper) => {
      expect(wrapper.find(User).first()).to.not.have.prop('invalid')
    }, { render: false })

    it('fails when the actual does not match the expected', (wrapper) => {
      expect(() => {
        expect(wrapper.find(User).first()).to.have.prop('invalid')
      }).to.throw("to have a 'invalid' prop")

      expect(() => {
        expect(wrapper.find(User).first()).to.not.have.prop('index')
      }).to.throw("not to have a 'index' prop")
    }, { render: false })
  })

  describe('(key, value)', () => {
    it('passes when the actual matches the expected', (wrapper) => {
      expect(wrapper.find(User).first()).to.have.prop('index', 1)
    }, { render: false })

    it('passes negated when the actual does not match the expected', (wrapper) => {
      expect(wrapper.find(User).first()).to.not.have.prop('index', 2)
    }, { render: false })

    it('fails when the actual does not match the expected', (wrapper) => {
      expect(() => {
        expect(wrapper.find(User).first()).to.have.prop('index', 2)
      }).to.throw("to have a 'index' prop with the value 2")

      expect(() => {
        expect(wrapper.find(User).first()).to.not.have.prop('index', 1)
      }).to.throw("not to have a 'index' prop with the value 1")
    }, { render: false })

    it('fails when the actual is undefined', () => {
      expect(() => {
        expect(undefined).to.have.prop('index')
      }).to.throw()
    })
  })

  it('chains', (wrapper) => {
    expect(wrapper.find(User).first()).to.have.prop('index').equal(1)
    expect(wrapper.find(User).first()).to.have.prop('objectProp').deep.equal({foo: 'bar'})
  }, { render: false })
})
