# ZErr

Custom JS error creator that subclasses `Error`, sets `.name` `.stack` and `.message`, and provides simple interpolation to construct error messages.

```js
var zerr = require('zerr')

// first param: error name
// second param: string template for error messages (substitutes '%' with args in constructor)
var BadParam = zerr('BadParam', '% is an invalid parameter. Expected %.')

// using the created error:
try { throw new BadParam('x', 'y') }
catch (e) {
  console.log(e.name) // => 'BadParamError'
  console.log(e.message) // => 'x is an invalid parameter. Expected y.'
  console.log(e.stack) // => 'BadParamError: x is an invalid parameter. Expected y.\nat repl:1:13...'
  console.log(e instanceof Error) // => true
  console.log(e instanceof BadParam) // => true
}

// the `new` is optional
throw BadParam('x', 'y')

// if no string template is given, zerr will just use the constructor's param as the message
var BadParam = zerr('BadParam')
try { throw new BadParam('x is bad') }
catch (e) {
  console.log(e.message) // => 'x is bad'
}

// if you pass an error as the first param to the constructor, zerr will add its stack to the stack history
// this helps you follow the trail of an exception that is caught, and then rethrown
// (taken from https://github.com/dominictarr/explain-error)
try { throw new BadParam(new BadParam('earlier error'), 'later error') }
catch (e) {
  console.log(e.stack) /* =>
  BadPararmError: later error
      at repl:1:7
    BadPararmError: earlier error
      at repl:1:15
  */
}
```
