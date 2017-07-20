const raf = require('raf')

global.requestAnimationFrame = raf
global.cancelAnimationFrame = raf.cancel

const Enzyme = require('enzyme')
const Adapter = require('enzyme/build/adapters/ReactSixteenAdapter')

Enzyme.configure({ adapter: new Adapter() })
