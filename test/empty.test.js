class Fixture extends React.Component {
  render () {
    return (
      <div id='parent'>
        <div id='child' />
      </div>
    )
  }
}

const it = createTest(<Fixture />)

describe('#empty', () => {
  describe('()', () => {
    it('passes when the actual matches the expected', (wrapper) => {
      expect(wrapper.find('#child')).to.be.empty
    })

    it('passes negated when the actual does not match the expected', (wrapper) => {
      expect(wrapper.find('#parent')).to.not.be.empty
    })

    it('fails when the actual does not match the expected', (wrapper) => {
      expect(() => {
        expect(wrapper.find('#child')).to.not.be.empty
      }).to.throw('not to be empty')

      expect(() => {
        expect(wrapper.find('#parent')).to.be.empty
      }).to.throw('to be empty')
    })
  })
})
