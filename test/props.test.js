import PropTypes from 'prop-types'

class User extends React.Component {
  render () {
    return (
      <span>User {this.props.index}</span>
    )
  }
}

User.propTypes = {
  index: PropTypes.number.isRequired
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

describe('#props', () => {
  describe('([ key, key, key... ])', () => {
    it('passes when the actual matches the expected', (wrapper) => {
      expect(wrapper.find(User).first()).to.have.props([ 'index' ])
    }, { render: false })

    it('passes negated when the actual does not match the expected', (wrapper) => {
      expect(wrapper.find(User).first()).to.not.have.props([ 'invalid' ])
    }, { render: false })

    it('fails when the actual does not match the expected', (wrapper) => {
      expect(() => {
        expect(wrapper.find(User).first()).to.have.props([ 'invalid' ])
      }).to.throw("to have props [ 'invalid' ]")

      expect(() => {
        expect(wrapper.find(User).first()).to.not.have.props([ 'index' ])
      }).to.throw("not to have props [ 'index' ]")
    }, { render: false })
  })

  describe('({ key: value, ... })', () => {
    it('passes when the actual matches the expected', (wrapper) => {
      expect(wrapper.find(User).first()).to.have.props({ index: 1 })
    }, { render: false })

    it('passes negated when the actual does not match the expected', (wrapper) => {
      expect(wrapper.find(User).first()).to.not.have.props({ index: 2 })
    }, { render: false })

    it('fails when the actual does not match the expected', (wrapper) => {
      expect(() => {
        expect(wrapper.find(User).first()).to.have.props({ index: 2 })
      }).to.throw('to have props { index: 2 }')

      expect(() => {
        expect(wrapper.find(User).first()).to.not.have.props({ index: 1 })
      }).to.throw('not to have props { index: 1 }')
    }, { render: false })

    it('fails when the actual is undefined', () => {
      expect(() => {
        expect(undefined).to.have.props([ 'index' ])
      }).to.throw()
    })
  })

  it('chains', (wrapper) => {
    expect(wrapper.find(User).first()).to.have.props([ 'index', 'objectProp' ]).deep.equal([ 1, {foo: 'bar'} ])
  }, { render: false })
})
