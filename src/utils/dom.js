const $ = function $(el) {
  if (typeof el === 'string') {
    el = document.querySelector(el)
  }
  if (el && el.nodeType === 1) {
    return el
  }
  return null
}
const throttle = function (fn, delay) {
  const ctx = this
  let now = Date.now()
  return function(...args) {
    if((Date.now() - now) < delay) return
    fn.call(ctx, ...args)
    now = Date.now()
  }
}
export {
  $,
  throttle
}
