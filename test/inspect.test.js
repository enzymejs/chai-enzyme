import {shallow, render, mount} from 'enzyme'
import wrap from '../src/wrap'

class ClassSyntax extends React.Component {
  render () {
    return (
      <div>Hello world</div>
    )
  }
}

const DisplayNameSyntax = React.createClass({
  displayName: 'DisplayNameSyntax',

  render () {
    return (
      <div>Hello world</div>
    )
  }
})

function inspect (wrapper) {
  return wrap(wrapper).inspect()
}

describe('#inspect', () => {
  describe('ShallowTestWrapper', () => {
    it('returns the component name', () => {
      expect(String(inspect(shallow(<ClassSyntax />)))).to.equal('<ClassSyntax />')
      expect(String(inspect(shallow(<DisplayNameSyntax />)))).to.equal('<DisplayNameSyntax />')
      expect(String(inspect(shallow(<DisplayNameSyntax />).find('div')))).to.equal('the node in <DisplayNameSyntax />')
    })
  })

  describe('ReactTestWrapper', () => {
    it('returns the component name', () => {
      expect(String(inspect(mount(<ClassSyntax />)))).to.equal('<ClassSyntax />')
      expect(String(inspect(mount(<DisplayNameSyntax />)))).to.equal('<DisplayNameSyntax />')
      expect(String(inspect(mount(<DisplayNameSyntax />).find('div')))).to.equal('the node in <DisplayNameSyntax />')
    })
  })

  describe('CheerioTestWrapper', () => {
    it('returns unknown', () => {
      expect(String(inspect(render(<ClassSyntax />)))).to.equal('the node in <??? />')
      expect(String(inspect(render(<DisplayNameSyntax />)))).to.equal('the node in <??? />')
    })
  })
})
