class Fixture extends React.Component {
  render () {
    return null
  }
}

const it = createTest(<Fixture />)

describe('#blank', () => {
  describe('()', () => {
    it('passes when the actual matches the expected', (wrapper) => {
      expect(wrapper).to.be.blank()
    })

    it('fails when the actual does not match the expected', (wrapper) => {
      expect(() => {
        expect(wrapper).to.not.be.blank()
      }).to.throw('not to be empty')
    })
  })
})

describe('#present', () => {
  describe('()', () => {
    it('passes when the actual matches the expected', (wrapper) => {
      expect(wrapper).to.be.present()
    }, { render: false })

    it('passes when the actual matches the expected', (wrapper) => {
      expect(wrapper).not.to.be.present()
    }, { shallow: false, mount: false })

    it('fails when the actual does not match the expected', (wrapper) => {
      expect(() => {
        expect(wrapper).to.not.be.present()
      }).to.throw('not to exist')
    }, { render: false })

    it('fails when the actual does not match the expected', (wrapper) => {
      expect(() => {
        expect(wrapper).to.be.present()
      }).to.throw('to exist')
    }, { shallow: false, mount: false })
  })
})
