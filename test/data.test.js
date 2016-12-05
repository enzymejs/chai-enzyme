class Fixture extends React.Component {
  render () {
    return (
      <div data-name='root'>
        <span data-name='child'>test</span>
      </div>
    )
  }
}

const it = createTest(<Fixture />)

describe('#data', () => {
  describe('(attr)', () => {
    it('passes when the actual matches the expected', (wrapper) => {
      expect(wrapper).to.have.data('name')
      expect(wrapper.find('span')).to.have.data('name')
    })

    it('passes negated when the actual does not match the expected', (wrapper) => {
      expect(wrapper).to.not.have.data('random')
      expect(wrapper.find('span')).to.not.have.data('random')
    })

    it('fails when the actual does not match the expected', (wrapper) => {
      expect(() => {
        expect(wrapper).to.have.data('color')
      }).to.throw("to have a 'color' data attribute")

      expect(() => {
        expect(wrapper.find('span')).to.have.data('border')
      }).to.throw("to have a 'border' data attribute")

      expect(() => {
        expect(wrapper).to.not.have.data('name')
      }).to.throw("not to have a 'name' data attribute")

      expect(() => {
        expect(wrapper.find('span')).to.not.have.data('name')
      }).to.throw("not to have a 'name' data attribute")
    })

    it('fails when the actual is undefined', () => {
      expect(() => {
        expect(undefined).to.have.data('name')
      }).to.throw()
    })
  })

  describe('(attr, value)', () => {
    it('passes when the actual matches the expected', (wrapper) => {
      expect(wrapper).to.have.data('name', 'root')
      expect(wrapper.find('span')).to.have.data('name', 'child')
    })

    it('passes negated when the actual does not match the expected', (wrapper) => {
      expect(wrapper).to.not.have.data('name', 'invalid')
      expect(wrapper.find('span')).to.not.have.data('name', 'other')
    })

    it('fails when the actual does not match the expected', (wrapper) => {
      expect(() => {
        expect(wrapper).to.have.data('name', 'red')
      }).to.throw("to have a 'name' data attribute")

      expect(() => {
        expect(wrapper.find('span')).to.have.data('name', 'blue')
      }).to.throw("to have a 'name' data attribute")

      expect(() => {
        expect(wrapper).to.not.have.data('name', 'root')
      }).to.throw("not to have a 'name' data attribute")

      expect(() => {
        expect(wrapper.find('span')).to.not.have.data('name', 'child')
      }).to.throw("not to have a 'name' data attribute")

      expect(() => {
        expect(wrapper).to.have.data('name', undefined)
      }).to.throw("to have a 'name' data attribute")
    })
  })

  it('chains', (wrapper) => {
    expect(wrapper).to.have.data('name').equal('root')
    expect(wrapper.find('span')).to.have.data('name').equal('child')
  })
})
