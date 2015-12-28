import {ShallowWrapper, ReactWrapper} from 'enzyme'

import CheerioTestWrapper from './CheerioTestWrapper'
import ShallowTestWrapper from './ShallowTestWrapper'
import ReactTestWrapper from './ReactTestWrapper'

export default function wrap (el) {
  if (el instanceof ShallowWrapper) {
    return new ShallowTestWrapper(el)
  }

  if (el instanceof ReactWrapper) {
    return new ReactTestWrapper(el)
  }

  if (el && el._root && el.options) {
    return new CheerioTestWrapper(el)
  }
}
