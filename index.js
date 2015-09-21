
module.exports = function zerr (name, msgTemplate) {
  // make sure the name ends with the word Error
  if (name.slice(-5) != 'Error')
    name += 'Error'

  function ZError () {
    // call as a class constructor if called as a function
    if (!(this instanceof ZError)) {
      // a bit tricker than usual, because we have to combine `apply()` with the `new` form...
      function ZE (args) { return ZError.apply(this, args) }
      ZE.prototype = ZError.prototype;
      return new ZE(arguments)
    }

    Error.call(this)
    Error.captureStackTrace(this, arguments.callee)
    this.name = name

    if (msgTemplate)
      this.message = interp(msgTemplate, arguments)
    else if (typeof arguments[0] == 'string')
      this.message = arguments[0]
  }
  ZError.prototype = Object.create(Error.prototype)
  return ZError
}

// interpolate function
// - takes a template string and a list of strings to insert
// - replaces '%' token in tmpl using values in `args`
// eg interp('hello %, how are you % today?', ['bob', 'doing']) => 'hello bob, how are you doing today?'
// eg interp('hello %, how are you % today?', ['bob']) => 'hello bob, how are you  today?'
var re = /%/g
function interp (tmpl, args) {
  var n = 0
  return tmpl.replace(re, function () { return args[n++] || '' })
}