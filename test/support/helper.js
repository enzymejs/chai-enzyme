import jsdom from 'jsdom'
import chai from 'chai'
import Enzyme from 'enzyme'
import plugin from '../../src'

global.isEnzyme3 = (process.env.ENZYME_VERSION !== '^2')
if (isEnzyme3) {
  const Adapter = require('enzyme-adapter-react-15')
  Enzyme.configure({ adapter: new Adapter() })
}

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>')
const win = doc.defaultView

global.document = doc
global.window = win
global.navigator = win.navigator

global.React = require('react')
global.expect = require('chai').expect
global.createTest = require('./createTest').default

chai.use(plugin())
