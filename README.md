# ZErr

Custom JS error creator that subclasses `Error`, sets `.name` `.stack` and `.message`, and provides simple interpolation to construct error messages.

```js
var zerr = require('zerr')

var BadParam = zerr('BadParam', '% must be a %')

try { throw new BadParam('foo', 'string') }
catch (e) {
  console.log(e.name) // => 'BadParamError'
  console.log(e.message) // => 'foo must be a string'
  console.log(e.stack) // => 'BadParamError: foo must be a string\nat repl:1:13...'
  console.log(e instanceof Error) // => true
  console.log(e instanceof BadParam) // => true
}

// the `new` is optional
throw BadParam('foo', 'string')
```