class Fixture extends React.Component {
  render () {
    return (
      <div style={{ border: 1 }}>
        <span style={{ color: 'red' }}>test</span>
      </div>
    )
  }
}

const it = createTest(<Fixture />)

describe('#style', () => {
  describe('(name)', () => {
    it('passes when the actual matches the expected', (wrapper) => {
      expect(wrapper).to.have.style('border')
      expect(wrapper.find('span')).to.have.style('color')
    })

    it('passes negated when the actual does not match the expected', (wrapper) => {
      expect(wrapper).to.not.have.style('color')
      expect(wrapper.find('span')).to.not.have.style('border')
    })

    it('fails when the actual does not match the expected', (wrapper) => {
      expect(() => {
        expect(wrapper).to.have.style('color')
      }).to.throw("to have a 'color' CSS style property")

      expect(() => {
        expect(wrapper.find('span')).to.have.style('border')
      }).to.throw("to have a 'border' CSS style property")

      expect(() => {
        expect(wrapper).to.not.have.style('border')
      }).to.throw("not to have a 'border' CSS style property")

      expect(() => {
        expect(wrapper.find('span')).to.not.have.style('color')
      }).to.throw("not to have a 'color' CSS style property")
    })

    it('fails when the actual is undefined', () => {
      expect(() => {
        expect(undefined).to.have.style('border')
      }).to.throw()
    })
  })

  describe('(name, value)', () => {
    it('passes when the actual matches the expected', (wrapper) => {
      expect(wrapper).to.have.style('border', '1px')
      expect(wrapper.find('span')).to.have.style('color', 'red')
    })

    it('passes negated when the actual does not match the expected', (wrapper) => {
      expect(wrapper).to.not.have.style('border', '2px')
      expect(wrapper.find('span')).to.not.have.style('color', 'blue')
    })

    it('fails when the actual does not match the expected', (wrapper) => {
      expect(() => {
        expect(wrapper).to.have.style('color', 'red')
      }).to.throw("to have a 'color' CSS style property")

      expect(() => {
        expect(wrapper.find('span')).to.have.style('border', '2px')
      }).to.throw("to have a 'border' CSS style property")

      expect(() => {
        expect(wrapper).to.not.have.style('border', '1px')
      }).to.throw("not to have a 'border' CSS style property")

      expect(() => {
        expect(wrapper.find('span')).to.not.have.style('color', 'red')
      }).to.throw("not to have a 'color' CSS style property")
    })
  })

  it('chains', (wrapper) => {
    expect(wrapper).to.have.style('border').equal('1px')
    expect(wrapper.find('span')).to.have.style('color').equal('red')
  })
})
