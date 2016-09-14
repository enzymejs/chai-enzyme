class Fixture extends React.Component {
  render () {
    return (
      <div id='parent' />
    )
  }
}

const it = createTest(<Fixture />)

describe('#exist', () => {
  describe('()', () => {
    it('passes when the actual matches the expected', (wrapper) => {
      expect(wrapper.find('#parent')).to.exist
    })

    it('fails when the actual does not match the expected', (wrapper) => {
      expect(() => {
        expect(wrapper.find('#parent')).to.not.exist
      }).to.throw('not to exist')
    })

    it('fails when the actual is undefined', () => {
      expect(() => {
        expect(undefined).to.exist
      }).to.throw()
    })
  })
})

describe('not#exist', () => {
  describe('()', () => {
    it('passes when the actual matches the expected', (wrapper) => {
      expect(wrapper.find('#notfound')).to.not.exist
    })

    it('fails when the actual does not match the expected', (wrapper) => {
      expect(() => {
        expect(wrapper.find('#notfound')).to.exist
      }).to.throw('to exist')
    })

    it('passes when the actual is undefined', () => {
      expect(undefined).to.not.exist
    })
  })
})
