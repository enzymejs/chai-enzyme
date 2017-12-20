import {shallow, render, mount} from 'enzyme'
import wrap from '../src/wrap'

class ClassSyntax extends React.Component {
  render () {
    return (
      <div>Hello world</div>
    )
  }
}

const DisplayNameSyntax = class extends React.Component {
  render () {
    return (
      <div>Hello world</div>
    )
  }
}

DisplayNameSyntax.displayName = 'DisplayNameSyntax'

const SymbolComponent = class extends React.Component {
  render () {
    return (<div />)
  }
}
SymbolComponent.displayName = Symbol('SymbolComponent')

function inspect (wrapper) {
  return wrap(wrapper).inspect()
}

describe('#inspect', () => {
  describe('ShallowTestWrapper', () => {
    it('returns the component name', () => {
      expect(String(inspect(shallow(<ClassSyntax />)))).to.equal('<ClassSyntax />')
      expect(String(inspect(shallow(<DisplayNameSyntax />)))).to.equal('<DisplayNameSyntax />')
      expect(String(inspect(shallow(<DisplayNameSyntax />).find('div')))).to.equal('the node in <DisplayNameSyntax />')
      expect(String(inspect(shallow(<DisplayNameSyntax />).find('span')))).to.equal('the node in <DisplayNameSyntax />')
      expect(String(inspect(shallow(<div />)))).to.equal('<div />')
      expect(String(inspect(shallow(<SymbolComponent />)))).to.equal(`<${String(SymbolComponent.displayName)} />`)
      expect(String(inspect(shallow(<SymbolComponent />).find('div')))).to.equal(`the node in <${String(SymbolComponent.displayName)} />`)
    })
  })

  describe('ReactTestWrapper', () => {
    it('returns the component name', () => {
      expect(String(inspect(mount(<ClassSyntax />)))).to.equal('<ClassSyntax />')
      expect(String(inspect(mount(<DisplayNameSyntax />)))).to.equal('<DisplayNameSyntax />')
      expect(String(inspect(mount(<DisplayNameSyntax />).find('div')))).to.equal('the node in <DisplayNameSyntax />')
      expect(String(inspect(mount(<DisplayNameSyntax />).find('span')))).to.equal('the node in <DisplayNameSyntax />')
      expect(String(inspect(mount(<SymbolComponent />)))).to.equal(`<${String(SymbolComponent.displayName)} />`)
      expect(String(inspect(mount(<SymbolComponent />).find('div')))).to.equal(`the node in <${String(SymbolComponent.displayName)} />`)
    })
  })

  describe('CheerioTestWrapper', () => {
    it('returns unknown', () => {
      expect(String(inspect(render(<ClassSyntax />)))).to.equal('the node in <??? />')
      expect(String(inspect(render(<DisplayNameSyntax />)))).to.equal('the node in <??? />')
      expect(String(inspect(render(<SymbolComponent />)))).to.equal(`the node in <??? />`)
    })
  })
})
