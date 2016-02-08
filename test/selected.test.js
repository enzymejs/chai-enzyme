class Fixture extends React.Component {
  render () {
    return (
      <select defaultValue='test1'>
        <option id='test1' value='test1'>Test 1</option>
        <option id='test2' value='test2'>Test 1</option>
      </select>
    )
  }
}

const it = createTest(<Fixture />)

describe('#selected', () => {
  describe('()', () => {
    it('passes when the actual matches the expected', (wrapper) => {
      expect(wrapper.find('#test1')).to.be.selected()
    }, { shallow: false })

    it('passes negated when the actual does not match the expected', (wrapper) => {
      expect(wrapper.find('#test2')).to.not.be.selected()
    }, { shallow: false })

    it('fails when the actual does not match the expected', (wrapper) => {
      expect(() => {
        expect(wrapper.find('#test2')).to.be.selected()
      }).to.throw('to be selected')

      expect(() => {
        expect(wrapper.find('#test1')).to.not.be.selected()
      }).to.throw('not to be selected')
    }, { shallow: false })

    it('fails when the actual is undefined', () => {
      expect(() => {
        expect(undefined).to.be.selected()
      }).to.throw()
    })
  })
})
