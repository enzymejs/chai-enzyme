import wrap from './wrap'

export default class ChaiWrapper {

  /**
   * Constructs a instance of the chai wrapper.
   *
   * @param chai the instance of chai to wrap around
   * @param utils the instance of the utils
   * @param debug the debug method
   */

  constructor (chai, utils, debug) {
    this.chai = chai
    this.Assertion = chai.Assertion
    this.utils = utils
    this.debug = debug
  }

  /**
   * Adds or overwrites a assertion method.
   *
   * @param assertion the assertion to add
   * @param name the name of the assertion to add
   */

  addAssertion (assertion, name) {
    if (this.chai.Assertion.prototype[name]) {
      this._overwriteMethod(assertion, name)
    } else {
      this._addMethod(assertion, name)
    }
  }

  /**
   * Adds a chainable method.
   *
   * @param assertion the assertion to add
   * @param [name] the name of the assertion to add
   */

  addChainableMethod (assertion, name) {
    this.Assertion.addChainableMethod(name, this._wrapAssertion(assertion, this))
  }

  /**
   * Overwrites a assertion property.
   *
   * @param assertion the assertion with which to overwrite the existing assertion
   * @param [name] the name of the assertion to overwrite
   */

  overwriteProperty (assertion, name) {
    const _wrapOverwriteAssertion = this._wrapOverwriteAssertion
    const chaiWrapper = this

    this.Assertion.overwriteProperty(name, function (_super) {
      return _wrapOverwriteAssertion(assertion, _super, chaiWrapper)
    })
  }

  /**
   * Overwrites a chainable assertion method, but NOT the chainingBehaviour
   * ChainingBehaviour calls any pre-existing method.
   *
   * @param assertion the assertion with which to overwrite the existing assertion
   * @param [name] the name of the assertion to overwrite
   */

  overwriteChainableMethod (assertion, name) {
    name = name || assertion.name

    const _wrapOverwriteAssertion = this._wrapOverwriteAssertion
    const chaiWrapper = this

    this.Assertion.overwriteChainableMethod(name, function (_super) {
      return _wrapOverwriteAssertion(assertion, _super, chaiWrapper)
    }, function (_super) {
      return function () {
        _super.call(this)
      }
    })
  }

  /**
   * Wraps the given assertion with a function passing in all the required
   * chai elements.
   *
   * @param assertion the assertion to wrap
   * @param _super the super as passed to the chai assertion
   * @param chaiWrapper the instance of the chaiWrapper
   * @returns {Function}
   * @private
   */

  _wrapOverwriteAssertion (assertion, _super, chaiWrapper) {
    const {flag, inspect} = chaiWrapper.utils
    const debug = chaiWrapper.debug

    return function (arg1, arg2) {
      const wrapper = wrap(flag(this, 'object'))

      if (!wrapper) {
        return _super.apply(this, arguments)
      }

      assertion.call(this, {
        markup: () => debug(wrapper),
        sig: inspect(wrapper),
        wrapper,
        arg1,
        arg2,
        flag,
        inspect
      })
    }
  }

  /**
   * Wraps and overwrites a chai assertion method.
   *
   * @param assertion The new assertion to overwrite the existing with
   * @param [name] the name of the assertion
   * @private
   */

  _overwriteMethod (assertion, name) {
    name = name || assertion.name

    const _wrapOverwriteAssertion = this._wrapOverwriteAssertion
    const chaiWrapper = this

    this.Assertion.overwriteMethod(name, function (_super) {
      return _wrapOverwriteAssertion(assertion, _super, chaiWrapper)
    })
  }

  /**
   * Wraps the given assertion with a function passing in all the required
   * chai elements.
   *
   * @param assertion the assertion to wrap
   * @param chaiWrapper the instance of the chai wrapper
   * @returns {Function}
   * @private
   */

  _wrapAssertion (assertion, chaiWrapper) {
    const {flag, inspect} = chaiWrapper.utils
    const debug = chaiWrapper.debug

    return function (arg1, arg2) {
      const wrapper = wrap(flag(this, 'object'))
      const config = {
        markup: () => debug(wrapper),
        sig: inspect(wrapper),
        wrapper,
        arg1,
        flag,
        inspect
      }

      /**
       * Checking the length of the arguments array to make
       * sure that we have a defined argument assigned to arg2.
       * By default, 'undefined' is assigned to arg2 if no specific arguments exist...
       *
       */
      if (arguments.length > 1) {
        config.arg2 = arg2
      }

      assertion.call(this, config)
    }
  }

  /**
   * Wraps then adds the given assertion.
   *
   * @param assertion The assertion to add
   * @param [name] the name of the assertion
   * @private
   */

  _addMethod (assertion, name) {
    name = name || assertion.name

    this.Assertion.addMethod(name, this._wrapAssertion(assertion, this))
  }
}
