import {mount, shallow} from 'enzyme'

class Foo extends React.Component {
  render () {
    return (
      <div>Foo</div>
    )
  }
}

class Bar extends React.Component {
  render () {
    return (
      <div>Bar</div>
    )
  }
}

class Null extends React.Component {
  render () {
    return null
  }
}

class Fixture extends React.Component {
  render () {
    return (
      <Foo />
    )
  }
}

const it = createTest(<Fixture />)

describe('#type', () => {
  describe('(type)', () => {
    it('passes when the actual matches the expected', (wrapper) => {
      expect(wrapper).to.have.type(Foo)
      expect(wrapper.find(Foo)).to.have.type(Foo)
      expect(shallow(<Null />)).to.have.type(null)
      expect(shallow(<Bar />)).to.have.type('div')
      expect(shallow(<div />)).to.have.type('div')
    }, { render: false, mount: false })

    it('passes when the actual matches the expected', (wrapper) => {
      expect(wrapper).to.have.type(Fixture)
      expect(wrapper.find(Foo)).to.have.type(Foo)
      expect(mount(<Null />)).to.have.type(Null)
      expect(mount(<Bar />)).to.have.type(Bar)
      expect(mount(<div />)).to.have.type('div')
    }, { render: false, shallow: false })

    it('passes negated when the actual does not match the expected', (wrapper) => {
      expect(wrapper).to.not.have.type(Bar)
      expect(wrapper.find(Foo)).to.not.have.type(Bar)
    }, { render: false })

    it('fails when the actual does not match the expected', (wrapper) => {
      expect(() => {
        expect(wrapper).to.have.type(Bar)
      }).to.throw('to be of type [Function: Bar], but it is of type [Function: Foo]')
    }, { render: false, mount: false })

    it('fails when the actual does not match the expected', (wrapper) => {
      expect(() => {
        expect(wrapper).to.have.type(Bar)
      }).to.throw('to be of type [Function: Bar], but it is of type [Function: Fixture]')
    }, { render: false, shallow: false })

    it('fails when the actual is undefined', () => {
      expect(() => {
        expect(undefined).to.have.type(Foo)
      }).to.throw()
    }, { render: false })
  })
})
