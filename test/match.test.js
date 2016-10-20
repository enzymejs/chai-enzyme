class MyComponent extends React.Component {
  render () {
    return <div />
  }
}

class Fixture extends React.Component {
  render () {
    return (
      <div id='root'>
        <span id='child'>test</span>
        <MyComponent id='my-component' />
      </div>
    )
  }
}

const it = createTest(<Fixture />)

describe('#match', () => {
  describe('(selector)', () => {
    it('passes when the actual matches the expected', (wrapper) => {
      expect(wrapper.find('#root')).to.match('#root')
      expect(wrapper.find('span')).to.match('#child')
    })

    it('passes negated when the actual does not match the expected', (wrapper) => {
      expect(wrapper.find('#root')).to.not.match('#child')
      expect(wrapper.find('span')).to.not.match('#root')
    })

    it('fails when the actual does not match the expected', (wrapper) => {
      expect(() => {
        expect(wrapper.find('#root')).to.match('#child')
      }).to.throw("to match '#child'")

      expect(() => {
        expect(wrapper.find('span')).to.match('#root')
      }).to.throw("to match '#root'")

      expect(() => {
        expect(wrapper.find('#root')).to.not.match('#root')
      }).to.throw("not to match '#root'")

      expect(() => {
        expect(wrapper.find('span')).to.not.match('#child')
      }).to.throw("not to match '#child'")
    })
  })

  describe('(EnzymeSelector)', () => {
    it('passes when the actual matches the expected', (wrapper) => {
      expect(wrapper.find(MyComponent)).to.match('MyComponent')
      expect(wrapper.find(MyComponent)).to.match(MyComponent)
    }, { render: false })

    it('passes negated when the actual does not match the expected', (wrapper) => {
      expect(wrapper.find('#root')).to.not.match('MyComponent')
      expect(wrapper.find('#root')).to.not.match(MyComponent)
    }, { render: false })

    it('fails when the actual does not match the expected', (wrapper) => {
      expect(() => {
        expect(wrapper.find('#root')).to.match('MyComponent')
      }).to.throw("to match 'MyComponent'")

      expect(() => {
        expect(wrapper.find('#root')).to.match(MyComponent)
      }).to.throw('to match [Function: MyComponent]')
    }, { render: false })
  })
})
