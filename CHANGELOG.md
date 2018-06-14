1.0.0 / Unreleased
==================

* [feature] Add support for enzyme ^3.0.0 (which implies React 16 support)
* [feature] Support an array of nodes in `contain`
* [breaking] If you are using cheerio 1.0, there's' a possibility you will have
to wrap your React components with a div wrapper.

```jsx
<div id='parent'>
  <div id='child' />
<div>
```

```js
// Enzyme 2
wrapper.find('#parent').length //=> 1
wrapper.is('#parent') //=> false

// Enzyme 3
wrapper.find('#parent').length //=> 0
wrapper.is('#parent') //=> true

The new version returns a cheerio wrapper with a type of tag that IS the parent element.
Before it returned a wrapper with a type root that contains the parent element.
```

* [fix] Add support for components with a symbol as display name
* [feature] Only show one-level-deep components in error messages when shallow rendering

0.8.0 / June 29 2017
===================

* [feature] Add support for chai ^4.0.0
* [fix] Protect against duplicate plugin use

0.7.1 / May 24 2017
===================

* [fix] Don't repeat enzyme's peer dependencies

0.7.0 / May 22 2017
===================

* **[breaking]** Upgrade Enzyme dependency to 2.3.x or above
* [feature] add containMatchingElement support
* [fix] Handle `.exactly(0)`
* [fix] Add support for undefined argument values

0.6.1 / November 18 2016
========================

* [fix] React 15.4.x support

0.6.0 / November 5 2016
=======================

* [fix] Fix cross-browser issue when using text assertions
* [fix] Delegate to Enzyme wrapper `.is` for match assertions
* [feature] props assertion
* [feature] add contain/include support for html assertions
* [feature] type assertion

0.5.2 / September 30 2016
=========================

 * [fix] Loosen up cheerio peer dependency

0.5.1 / August 23 2016
======================

 * [fix] Add `exactly` to TOC
 * [fix] Bump html dependency for less deprecation warnings

0.5.0 / June 13 2016
====================

  * [feature] Add textarea support for contain assertions
  * [feature] Add select support for value assertions
  * [feature] Improve failure message for contain assertions
  * [fix] Truthy-ness values

0.4.2 / April 8 2016
====================

  * [fix] Support React 15.0.x
  * [fix] Fixes a bug in IE, because function.name is not available

0.4.1 / February 19 2016
========================

  * [fix] Loosen up peer dependencies
  * [fix] Make the assertion messages lazy for shallow rendering

0.4.0 / February 8 2016
=======================

  * [feature] `exactly` matcher
  * [fix] Loosen cheerio dependency

0.3.0 / February 1 2016
=======================

  * [feature] Add support for components that return `null`
  * [feature] Throw if the passed objects are not an enzyme wrapper
  * [fix] Don't export to Babel's named default

0.2.2 / January 19 2016
=======================

  * [fix] Don't create el in constructor for shallow

0.2.1 / January 14 2016
=======================

  * [fix] Make the assertion messages lazy

0.2.0 / January 11 2016
=======================

  * [feature] Introduce aliases of empty/exist
  * [feature] `tagName` matcher

0.1.0 / January 6 2016
======================

  * Initial implementation
