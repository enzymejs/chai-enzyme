class Fixture extends React.Component {
  render () {
    return (
      <div id='root'>
        <span id='child'>
          <span id='last'></span>
          <span id='last'></span>
          <span id='first'></span>
        </span>
      </div>
    )
  }
}

const it = createTest(<Fixture />)

describe('#descendantsCount', () => {
  describe('(selector)', () => {
    it('passes when the actual matches the expected', (wrapper) => {
      expect(wrapper).to.have.descendantsCount('#root')
      expect(wrapper.find('#child')).to.have.descendantsCount('#last', 2)
    })

    it('passes negated when the actual does not match the expected', (wrapper) => {
      expect(wrapper).to.not.have.descendantsCount('#root1')
      expect(wrapper.find('#child')).to.not.have.descendantsCount('#last1')
    })

    it('fails when the actual does not match the expected', (wrapper) => {
      expect(() => {
        expect(wrapper).to.have.descendantsCount('#root1')
      }).to.throw(/to have [0-9] descendants '#root1'/)

      expect(() => {
        expect(wrapper.find('#child')).to.have.descendantsCount('#root1')
      }).to.throw(/to have [0-9] descendants '#root1'/)

      expect(() => {
        expect(wrapper).to.not.have.descendantsCount('#root')
      }).to.throw(/not to have [0-9] descendants '#root'/)

      expect(() => {
        expect(wrapper.find('#child')).to.not.have.descendantsCount('#last', 2)
      }).to.throw(/not to have [0-9] descendants '#last'/)
    })
    context('When no count is given', () => {
      it('passes when only 1 descendent is found', (wrapper) => {
        expect(wrapper).to.have.descendantsCount('#first');
      })
      it('fails if more then 1 descendent is found', (wrapper) => {
        expect(() => {
          expect(wrapper.find('#child')).to.have.descendantsCount('#last')
        }).to.throw(/to have [0-9] descendants '#last'/)
      })
    })
  })
})

// If this one works the others will work too
describe('#twoDescendents', () => {
  describe('(selector)', () => {
    it('passes when the actual matches the expected', (wrapper) => {
      expect(wrapper).to.not.have.twoDescendents('#root')
      expect(wrapper.find('#child')).to.have.twoDescendents('#last', 2)
    })
  })
})

