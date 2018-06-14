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
          <li><User index={1} /></li>
          <li>
            <User index={2} />
            <User index={3} />
          </li>
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
      expect(wrapper).to.not.contain(<User index={4} />)
    }, { render: false })

    it('fails when the actual does not match the expected', (wrapper) => {
      expect(() => {
        expect(wrapper).to.contain(<User index={4} />)
      }).to.throw('to contain <User index={4} />')

      expect(() => {
        expect(wrapper).to.not.contain(<User index={2} />)
      }).to.throw('not to contain <User index={2} />')
    }, { render: false })

    it('fails when the actual is undefined', () => {
      expect(() => {
        expect(undefined).to.contain(<User index={1} />)
      }).to.throw()
    })
  })

  describe('(nodes)', () => {
    it('passes when the actual matches the expected', (wrapper) => {
      expect(wrapper).to.contain([<User index={2} />, <User index={3} />])
    }, { render: false })

    it('passes negated when the actual does not match the expected', (wrapper) => {
      expect(wrapper).to.not.contain([<User index={3} />, <User index={4} />])
    }, { render: false })

    it('fails when the actual does not match the expected', (wrapper) => {
      expect(() => {
        expect(wrapper).to.contain([<User index={3} />, <User index={4} />])
      }).to.throw('to contain [\n  <User index={3} />,\n  <User index={4} />\n]')

      expect(() => {
        expect(wrapper).to.not.contain([<User index={2} />, <User index={3} />])
      }).to.throw('not to contain [\n  <User index={2} />,\n  <User index={3} />\n]')
    }, { render: false })

    it('fails when the actual is undefined', () => {
      expect(() => {
        expect(undefined).to.contain([<User index={2} />, <User index={3} />])
      }).to.throw()
    })

    it('fails and shows one level deep', (wrapper) => {
      expect(() => {
        expect(wrapper).to.contain([<User index={3} />, <User index={4} />])
      }).to.throw('<li>\n           <User index={1} />\n         </li>')
    }, { render: false, mount: false })
  })
})
