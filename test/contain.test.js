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
          <li><User index={1} /></li>
          <li><User index={2} /></li>
        </ul>
      </div>
    )
  }
}

const it = createTest(<Fixture />)

describe('#contain', () => {
  describe('(node)', () => {
    it('passes when the actual matches the expected', (wrapper) => {
      expect(wrapper).to.contain(<User index={1} />)
      expect(wrapper).to.contain(<User index={2} />)
    }, { render: false })

    it('passes negated when the actual does not match the expected', (wrapper) => {
      expect(wrapper).to.not.contain(<User index={3} />)
    }, { render: false })

    it('fails when the actual does not match the expected', (wrapper) => {
      expect(() => {
        expect(wrapper).to.contain(<User index={3} />)
      }).to.throw('to contain')

      expect(() => {
        expect(wrapper).to.not.contain(<User index={2} />)
      }).to.throw('not to contain')
    }, { render: false })

    it('fails when the actual is undefined', () => {
      expect(() => {
        expect(undefined).to.contain(<User index={1} />)
      }).to.throw()
    })
  })
})
