class User extends React.Component {
  render () {
    return (
      <span>User {this.props.index} {this.props.name}</span>
    )
  }
}

User.propTypes = {
  index: React.PropTypes.number,
  name: React.PropTypes.string.isRequired
}

class Fixture extends React.Component {
  render () {
    return (
      <div>
        <ul>
          <li><User index={1} name='John' /></li>
          <li><User index={2} name='Doe' /></li>
        </ul>
      </div>
    )
  }
}

const it = createTest(<Fixture />)

describe('#containsMatchingElement', () => {
  describe('(node)', () => {
    it('passes when the actual matches the expected', (wrapper) => {
      expect(wrapper).to.containsMatchingElement(<User name='John' />)
      expect(wrapper).to.containsMatchingElement(<User name='Doe' />)
    }, { render: false })

    it('passes negated when the actual does not match the expected', (wrapper) => {
      expect(wrapper).to.not.containsMatchingElement(<User name='Conor' />)
    }, { render: false })

    it('fails when the actual does not match the expected', (wrapper) => {
      expect(() => {
        expect(wrapper).to.containsMatchingElement(<User name='Conor' />)
      }).to.throw('to contain matching <User name="Conor" />')

      expect(() => {
        expect(wrapper).to.not.containsMatchingElement(<User name='Doe' />)
      }).to.throw('not to contain matching <User name="Doe" />')
    }, { render: false })

    it('fails when the actual is undefined', () => {
      expect(() => {
        expect(undefined).to.containsMatchingElement(<User name='John' />)
      }).to.throw()
    })
  })
})
