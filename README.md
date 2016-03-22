# chai-enzyme

[![npm version](https://img.shields.io/npm/v/chai-enzyme.svg)](https://www.npmjs.com/package/chai-enzyme) [![License](https://img.shields.io/npm/l/chai-enzyme.svg)](https://www.npmjs.com/package/chai-enzyme) [![Build Status](https://travis-ci.org/producthunt/chai-enzyme.svg)](https://travis-ci.org/producthunt/chai-enzyme)

[Chai.js](https://github.com/chaijs/chai) assertions for [enzyme](https://github.com/airbnb/enzyme/).

## Table of Contents

  1. [Installation](#installation)
  1. [Setup](#setup)
  1. [Debug output in assertion exceptions](#debug-output-in-assertion-exceptions)
  1. [Assertions](#assertions)
    1. [`checked()`](#checked)
    1. [`className(str)`](#classnamestr)
    1. [`contain(node)`](#containnode)
    1. [`descendants(selector)`](#descendantsselector)
    1. [`disabled()`](#disabled)
    1. [`blank()`](#blank)
    1. [`present()`](#present)
    1. [`html(str)`](#htmlstr)
    1. [`id(str)`](#idstr)
    1. [`match(selector)`](#matchselector)
    1. [`ref(key)`](#refkey)
    1. [`selected()`](#selected)
    1. [`tagName(str)`](#tagnamestr)
    1. [`text(str)`](#textstr)
    1. [`value(str)`](#valuestr)
    1. [`attr(key, [val])`](#attrkey-val)
    1. [`data(key, [val])`](#datakey-val)
    1. [`style(key, [val])`](#stylekey-val)
    1. [`state(key, [val])`](#statekey-val)
    1. [`prop(key, [val])`](#propkey-val)
  1. [Development](#development)
  1. [Contributing](#contributing)
  1. [License](#license)

## Installation

`chai-enzyme` depends on:

```js
"peerDependencies": {
  "chai": "3.x",
  "cheerio": "0.19.x || 0.20.x",
  "enzyme": "1.x || 2.x"
}
```

`cheerio` is already a dependency of `enzyme`, so most probably you will not have
to install it manually

```
$ npm install chai-enzyme --save-dev
```

## Setup

```js
import chai from 'chai'
import chaiEnzyme from 'chai-enzyme'

chai.use(chaiEnzyme()) // Note the invocation at the end
```

## Debug output in assertion exceptions

You can also provide a custom debug function that can print useful information
about the `wrapper` that you are using.

The default one that chai-enzyme comes with, will pretty print the HTML of the
wrapper under test.

```shell
  1) #text (text) (shallow): passes when the actual matches the expected:
     AssertionError: expected <Fixture /> to have text 'Test test', but it has 'Test'

     ---------- this is where the debug output starts ----------

     HTML:

     <span id="child">Test</span>

     ---------- this is where the debug output ends ----------
```

Here is how you can implement and configure one for yourself:

```js
function myAwesomeDebug (wrapper) {
  let html = wrapper.html()
  // do something cool with the html
  return html
}

chai.use(chaiEnzyme(myAwesomeDebug))
```

## Assertions

It's important to know that all assertions are registered with Chai's `overwrite*`
methods and therefore this plugin can work next to other Chai.js plugins that have
similar assertions, such as [chai-jquery](https://github.com/chaijs/chai-jquery).

At the beginning of each assertion, we verify if the provided object is a
`ShallowWrapper`, `ReactWrapper` or a `cheerio` object and if not we delegate
to the next assertion that responds to the given method.

Note that not all assertions work with every rendering strategy.

If you are wondering what rendering mechanism to use when, refer to [enzyme's
documentation](https://github.com/airbnb/enzyme).

#### `checked()`

| render | mount | shallow |
| -------|-------|-------- |
| yes    | yes   | yes     |


Assert that the given wrapper is checked:

```js
import React from 'react'
import {mount, render, shallow} from 'enzyme'

class Fixture extends React.Component {
  render () {
    return (
      <div>
        <input id='checked' defaultChecked />
        <input id='not' defaultChecked={false} />
      </div>
    )
  }
}

const wrapper = mount(<Fixture />) // mount/render/shallow when applicable

expect(wrapper.find('#checked')).to.be.checked()
expect(wrapper.find('#not')).to.not.be.checked()
```

#### `className(str)`

| render | mount | shallow |
| -------|-------|-------- |
| yes    | yes   | yes     |


Assert that the wrapper has a given class:

```js
import React from 'react'
import {mount, render, shallow} from 'enzyme'

class Fixture extends React.Component {
  render () {
    return (
      <div className='root top'>
        <span className='child bottom'>test</span>
      </div>
    )
  }
}

const wrapper = mount(<Fixture />) // mount/render/shallow when applicable

expect(wrapper.find('span')).to.have.className('child')
expect(wrapper.find('span')).to.not.have.className('root')
```

#### `contain(node)`

| render | mount | shallow |
| -------|-------|-------- |
| no     | yes   | yes     |


Assert that the wrapper contains a given node:

```js
import React from 'react'
import {mount, render, shallow} from 'enzyme'

class User extends React.Component {
  render () {
    return (
      <span>User {this.props.index}</span>
    )
  }
}

User.propTypes = {
  index: React.PropTypes.number.isRequired
}

class Fixture extends React.Component {
  render () {
    return (
      <div>
        <ul>
          <li><User index={1} /></li>
          <li><User index={2} /></li>
        </ul>
      </div>
    )
  }
}

const wrapper = mount(<Fixture />) // mount/render/shallow when applicable

expect(wrapper).to.contain(<User index={1} />)
expect(wrapper).to.not.contain(<User index={3} />)
```

#### `descendants(selector)`

| render | mount | shallow |
| -------|-------|-------- |
| yes    | yes   | yes     |


Assert that the wrapper contains a descendant matching the given selector:

```js
import React from 'react'
import {mount, render, shallow} from 'enzyme'

class Fixture extends React.Component {
  render () {
    return (
      <div id='root'>
        <span id='child'>
          <span id='last'></span>
        </span>
      </div>
    )
  }
}

const wrapper = mount(<Fixture />) // mount/render/shallow when applicable

expect(wrapper).to.have.descendants('#root')
expect(wrapper.find('#child')).to.have.descendants('#last')

expect(wrapper).to.not.have.descendants('#root1')
```

#### `exactly()`

| render | mount | shallow |
| -------|-------|-------- |
| yes    | yes   | yes     |


Assert that the wrapper contains an exact amount of descendants matching the given selector:

```js
import React from 'react'
import {mount, render, shallow} from 'enzyme'

class Fixture extends React.Component {
  render () {
    return (
      <div id='root'>
        <span id='child'>
          <span class='item'></span>
          <span class='item'></span>
        </span>
      </div>
    )
  }
}

const wrapper = mount(<Fixture />) // mount/render/shallow when applicable

expect(wrapper).to.have.exactly(2).descendants('.item')
```

#### `disabled()`

| render | mount | shallow |
| -------|-------|-------- |
| yes    | yes   | yes     |


Assert that the given wrapper is disabled:

```js
import React from 'react'
import {mount, render, shallow} from 'enzyme'

class Fixture extends React.Component {
  render () {
    return (
      <div>
        <input id='disabled' disabled />
        <input id='not' />
      </div>
    )
  }
}

const wrapper = mount(<Fixture />) // mount/render/shallow when applicable

expect(wrapper.find('#disabled')).to.be.disabled()
expect(wrapper.find('#not')).to.not.be.disabled()
```

#### `blank()`

| render | mount | shallow |
| -------|-------|-------- |
| yes    | yes   | yes     |


Assert that the given wrapper is empty:

```js
import React from 'react'
import {mount, render, shallow} from 'enzyme'

class Fixture extends React.Component {
  render () {
    return (
      <div id='parent'>
        <div id='child'>
        </div>
      </div>
    )
  }
}

const wrapper = mount(<Fixture />) // mount/render/shallow when applicable

expect(wrapper.find('#child')).to.be.blank()
expect(wrapper.find('#parent')).to.not.be.blank()

expect(wrapper.find('#child')).to.be.empty // an alias
expect(wrapper.find('#parent')).to.not.be.empty // an alias

class NullFixture extends React.Component {
  render () {
    return null
  }
}

const nullWrapper = mount(<NullFixture />) // mount/render/shallow when applicable

expect(nullWrapper).to.be.blank()
expect(nullWrapper).to.be.empty // an alias
```

#### `present()`

| render | mount | shallow |
| -------|-------|-------- |
| yes    | yes   | yes     |


Assert that the given wrapper exists:

```js
import React from 'react'
import {mount, render, shallow} from 'enzyme'

class Fixture extends React.Component {
  render () {
    return (
      <div id='parent'></div>
    )
  }
}

const wrapper = mount(<Fixture />) // mount/render/shallow when applicable

expect(wrapper.find('#parent')).be.present()
expect(wrapper.find('#parent')).to.exist // an alias

class NullFixture extends React.Component {
  render () {
    return null
  }
}

const nullWrapper = mount(<NullFixture />) // mount/render/shallow when applicable

expect(nullWrapper).to.be.present()
expect(nullWrapper).to.exist // an alias
```

#### `html(str)`

| render | mount | shallow |
| -------|-------|-------- |
| yes    | yes   | yes     |


Assert that the wrapper has given html:

```js
import React from 'react'
import {mount, render, shallow} from 'enzyme'

class Fixture extends React.Component {
  render () {
    return (
      <div id='root'>
        <span id='child'>Test</span>
      </div>
    )
  }
}

const wrapper = mount(<Fixture />) // mount/render/shallow when applicable

expect(wrapper.find('#child')).to.have.html('<span id="child">Test</span>')

expect(wrapper.find('#child')).to.not.have.html('<span id="child">Test 1</span>')

expect(wrapper.find('#child')).to.have.html().match(/Test/)
```

#### `id(str)`

| render | mount | shallow |
| -------|-------|-------- |
| yes    | yes   | yes     |


Assert that the wrapper has given ID attribute:

```js
import React from 'react'
import {mount, render, shallow} from 'enzyme'

class Fixture extends React.Component {
  render () {
    return (
      <div id='root'>
        <span id='child'>test</span>
      </div>
    )
  }
}

const wrapper = mount(<Fixture />) // mount/render/shallow when applicable

expect(wrapper).to.have.id('root')
expect(wrapper).to.not.have.id('child')
```

#### `match(selector)`

| render | mount | shallow |
| -------|-------|-------- |
| yes    | yes   | yes     |


Assert that the wrapper matches given selector:

```js
import React from 'react'
import {mount, render, shallow} from 'enzyme'

class Fixture extends React.Component {
  render () {
    return (
      <div id='root'>
        <span id='child'>test</span>
      </div>
    )
  }
}

const wrapper = mount(<Fixture />) // mount/render/shallow when applicable

expect(wrapper.find('span')).to.match('#child')
expect(wrapper.find('#root')).to.not.match('#child')
```

#### `ref(key)`

| render | mount | shallow |
| -------|-------|-------- |
| no     | yes   | no      |

```js
import React from 'react'
import {mount, render, shallow} from 'enzyme'

class Fixture extends React.Component {
  render () {
    return (
      <div>
        <input ref='test' />
      </div>
    )
  }
}

const wrapper = mount(<Fixture />) // mount/render/shallow when applicable

expect(wrapper).to.have.ref('test')
expect(wrapper).to.have.ref('random')
```

#### `selected()`

| render | mount | shallow |
| -------|-------|-------- |
| yes    | yes   | no      |


Assert that the given wrapper is selected:

```js
import React from 'react'
import {mount, render, shallow} from 'enzyme'

class Fixture extends React.Component {
  render () {
    return (
      <select defaultValue='test1'>
        <option id='test1' value='test1'>Test 1</option>
        <option id='test2' value='test2'>Test 1</option>
      </select>
    )
  }
}

const wrapper = mount(<Fixture />) // mount/render/shallow when applicable

expect(wrapper.find('#test1')).to.be.selected()
expect(wrapper.find('#test2')).to.not.be.selected()
```

#### `tagName(str)`

| render | mount | shallow |
| -------|-------|-------- |
| yes    | yes   | yes     |


Assert that the given wrapper has the tag name:

```js
import React from 'react'
import {mount, render, shallow} from 'enzyme'

class Fixture extends React.Component {
  render () {
    return (
      <div>
        <span />
      </div>
    )
  }
}

const wrapper = mount(<Fixture />) // mount/render/shallow when applicable

expect(wrapper).to.have.tagName('div')
expect(wrapper.find('span')).to.have.tagName('span')

expect(wrapper).to.not.have.tagName('a')
expect(wrapper.find('span')).to.not.have.tagName('a')
```

#### `text(str)`

| render | mount | shallow |
| -------|-------|-------- |
| yes    | yes   | yes     |


Assert that the given wrapper has the supplied text:

```js
import React from 'react'
import {mount, render, shallow} from 'enzyme'

class Fixture extends React.Component {
  render () {
    return (
      <div id='root'>
        <span id='child'>Test</span>
      </div>
    )
  }
}

const wrapper = mount(<Fixture />) // mount/render/shallow when applicable

expect(wrapper.find('#child')).to.have.text('Test')

expect(wrapper.find('#child')).to.contain.text('Te')
expect(wrapper.find('#child')).to.include.text('Te') // include is an alias of contain

expect(wrapper.find('#child')).to.not.have.text('Other text')
expect(wrapper.find('#child')).to.not.include.text('Other text') // include is an alias of contain

expect(wrapper.find('#child')).to.have.text().match(/Test/)
```

#### `value(str)`

| render | mount | shallow |
| -------|-------|-------- |
| yes    | yes   | yes     |


Assert that the given wrapper has given value:

```js
import React from 'react'
import {mount, render, shallow} from 'enzyme'

class Fixture extends React.Component {
  render () {
    return (
      <div>
        <input defaultValue='test' />
      </div>
    )
  }
}

const wrapper = mount(<Fixture />) // mount/render/shallow when applicable

expect(wrapper.find('input')).to.have.value('test')
expect(wrapper.find('input')).to.not.have.value('other')
```

#### `attr(key, [val])`

| render | mount | shallow |
| -------|-------|-------- |
| yes    | yes   | yes     |


Assert that the wrapper has given attribute [with value]:

```js
import React from 'react'
import {mount, render, shallow} from 'enzyme'

class Fixture extends React.Component {
  render () {
    return (
      <div id='root'>
        <span id='child'>test</span>
      </div>
    )
  }
}

const wrapper = mount(<Fixture />) // mount/render/shallow when applicable

expect(wrapper.find('span')).to.have.attr('id')
expect(wrapper).to.not.have.attr('disabled')

expect(wrapper).to.have.attr('id', 'root')
expect(wrapper).to.not.have.attr('id', 'invalid')

expect(wrapper).to.have.attr('id').equal('root')
```

#### `data(key, [val])`

| render | mount | shallow |
| -------|-------|-------- |
| yes    | yes   | yes     |


Assert that the wrapper has a given data attribute [with value]:

```js
import React from 'react'
import {mount, render, shallow} from 'enzyme'

class Fixture extends React.Component {
  render () {
    return (
      <div data-name='root'>
        <span data-name='child'>test</span>
      </div>
    )
  }
}

const wrapper = mount(<Fixture />) // mount/render/shallow when applicable

expect(wrapper).to.have.data('name')
expect(wrapper).to.not.have.data('random')

expect(wrapper).to.have.data('name', 'root')
expect(wrapper).to.not.have.data('name', 'invalid')

expect(wrapper).to.have.data('name').equal('root')
```

#### `style(key, [val])`

| render | mount | shallow |
| -------|-------|-------- |
| yes    | yes   | yes     |


Assert that the wrapper has given style:

```js
import React from 'react'
import {mount, render, shallow} from 'enzyme'

class Fixture extends React.Component {
  render () {
    return (
      <div style={{ border: 1 }}>
        <span style={{ color: 'red' }}>test</span>
      </div>
    )
  }
}

const wrapper = mount(<Fixture />) // mount/render/shallow when applicable

expect(wrapper).to.have.style('border')
expect(wrapper).to.not.have.style('color')

expect(wrapper).to.have.style('border', '1px')
expect(wrapper).to.not.have.style('border', '2px')

expect(wrapper).to.have.style('border').equal('1px')
```

#### `state(key, [val])`

| render | mount | shallow |
| -------|-------|-------- |
| no     | yes   | yes     |


Assert that the wrapper has given state [with value]:

```js
import React from 'react'
import {mount, render, shallow} from 'enzyme'

class Fixture extends React.Component {
  constructor () {
    super()
    this.state = { foo: 'bar' }
  }

  render () {
    return (
      <div id='root'>
      </div>
    )
  }
}

const wrapper = mount(<Fixture />) // mount/render/shallow when applicable

expect(wrapper).to.have.state('foo')
expect(wrapper).to.not.have.state('bar')


expect(wrapper).to.have.state('foo', 'bar')
expect(wrapper).to.not.have.state('foo', 'baz')

expect(wrapper).to.have.state('foo').equal('bar')
```


#### `prop(key, [val])`

| render | mount | shallow |
| -------|-------|-------- |
| no     | yes   | yes     |

Assert that the wrapper has given prop [with value]:

```js
import React from 'react'
import {mount, render, shallow} from 'enzyme'

class User extends React.Component {
  render () {
    return (
      <span>User {this.props.index}</span>
    )
  }
}

User.propTypes = {
  index: React.PropTypes.number.isRequired
}

class Fixture extends React.Component {
  render () {
    return (
      <div>
        <ul>
          <li><User index={1}  user={{name: 'Jane'}} /></li>
          <li><User index={2} /></li>
        </ul>
      </div>
    )
  }
}

const wrapper = mount(<Fixture />) // mount/render/shallow when applicable

expect(wrapper.find(User).first()).to.have.prop('index')
expect(wrapper.find(User).first()).to.not.have.prop('invalid')


expect(wrapper.find(User).first()).to.have.prop('index', 1)
expect(wrapper.find(User).first()).to.not.have.prop('index', 2)

expect(wrapper.find(User).first()).to.have.prop('index').equal(1)
expect(wrapper.find(User).first()).to.have.prop('user').deep.equal({name: 'Jane'})
```

## Development

#### Setup

```shell
$ git clone <this repo>
$ cd chai-enzyme
$ npm install
```

#### Tests

Linters:

```shell
$ npm run test:lint
```

Tests:

```shell
$ npm run test:tests
```

All:

```shell
$ npm test
```

## Contributing

We want to make this assertion library as robust and complete as possible. If
you think that there are missing features/assertions, please open a GitHub issue or even
better - a PR.

Bug reports and pull requests are welcome on GitHub. This project is intended to be a
safe, welcoming space for collaboration, and contributors are expected to adhere
to the [Contributor Covenant](http://contributor-covenant.org/) code of conduct.

## License

[![Product Hunt](http://i.imgur.com/dtAr7wC.png)](https://www.producthunt.com)

```
 _________________
< The MIT License >
 -----------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
```
