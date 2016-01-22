class Fixture extends React.Component {
  render () {
    return (
      <div id='root'>
        <span id='child'>test</span>
      </div>
    )
  }
}

const it = createTest(<Fixture />)

describe('#attr', () => {
  it('fails when actual is not a enzymeWrapper', () => {
    expect(() => {
      expect(undefined).to.have.attr('key', 'somekey')
      expect({ 'foo': 'bar' }).to.have.attr('key', 'somekey')
      expect([]).to.have.attr('key', 'somekey')
      expect('test').to.have.attr('key', 'somekey')
      expect(12345).to.have.attr('key', 'somekey')
    }).to.throw()
  })

  describe('(attr)', () => {
    it('passes when the actual matches the expected', (wrapper) => {
      expect(wrapper.find('span')).to.have.attr('id')
      expect(wrapper).to.have.attr('id')
    })

    it('passes negated when the actual does not match the expected', (wrapper) => {
      expect(wrapper).to.not.have.attr('disabled')
      expect(wrapper.find('span')).to.not.have.attr('disabled')
    })

    it('fails when the actual does not match the expected', (wrapper) => {
      expect(() => {
        expect(wrapper).to.have.attr('disabled')
      }).to.throw(`to have a 'disabled' attr`)

      expect(() => {
        expect(wrapper.find('span')).to.have.attr('disabled')
      }).to.throw(`to have a 'disabled' attr`)
    })
  })

  describe('(attr, value)', () => {
    it('passes when the actual matches the expected', (wrapper) => {
      expect(wrapper).to.have.attr('id', 'root')
      expect(wrapper.find('span')).to.have.attr('id', 'child')
    })

    it('passes negated when the actual does not match the expected', (wrapper) => {
      expect(wrapper).to.not.have.attr('id', 'invalid')
      expect(wrapper.find('span')).to.not.have.attr('id', 'invalid')
    })

    it('fails when the actual does not match the expected', (wrapper) => {
      expect(() => {
        expect(wrapper).to.have.attr('id', 'invalid')
      }).to.throw(`to have a 'id' attr`)

      expect(() => {
        expect(wrapper.find('span')).to.have.attr('id', 'invalid')
      }).to.throw(`to have a 'id' attr`)
    })
  })

  it('chains', (wrapper) => {
    expect(wrapper).to.have.attr('id').equal('root')
    expect(wrapper.find('span')).to.have.attr('id').equal('child')
  })
})
