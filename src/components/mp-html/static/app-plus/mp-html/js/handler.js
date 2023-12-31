'use strict'
function t(t) {
  for (var e = Object.create(null), n = t.attributes.length; n--; ) {
    e[t.attributes[n].name] = t.attributes[n].value
  }
  return e
}
function e() {
  o[1] && ((this.src = o[1]), (this.onerror = null)),
    (this.onclick = null),
    (this.ontouchstart = null),
    uni.postMessage({ data: { action: 'onError', source: 'img', attrs: t(this) } })
}
function n(r, i, s) {
  for (var c = 0; c < r.length; c++) {
    !(function (c) {
      var u = r[c],
        l = void 0
      if (u.type && 'node' !== u.type) {
        l = document.createTextNode(u.text.replace(/&amp;/g, '&'))
      } else {
        var d = u.name
        'svg' === d && (s = 'http://www.w3.org/2000/svg'),
          ('html' !== d && 'body' !== d) || (d = 'div'),
          (l = s ? document.createElementNS(s, d) : document.createElement(d))
        for (var g in u.attrs) {
          l.setAttribute(g, u.attrs[g])
        }
        if ((u.children && n(u.children, l, s), 'img' === d)) {
          if (
            (!l.src && l.getAttribute('data-src') && (l.src = l.getAttribute('data-src')),
            u.attrs.ignore ||
              (l.onclick = function (e) {
                e.stopPropagation(), uni.postMessage({ data: { action: 'onImgTap', attrs: t(this) } })
              }),
            o[2])
          ) {
            var p = new Image()
            ;(p.src = l.src),
              (l.src = o[2]),
              (p.onload = function () {
                l.src = this.src
              }),
              (p.onerror = function () {
                l.onerror()
              })
          }
          l.onerror = e
        } else if ('a' === d) {
          l.addEventListener(
            'click',
            function (e) {
              e.stopPropagation(), e.preventDefault()
              var n,
                o = this.getAttribute('href')
              o && '#' === o[0] && (n = (document.getElementById(o.substr(1)) || {}).offsetTop),
                uni.postMessage({ data: { action: 'onLinkTap', attrs: t(this), offset: n } })
            },
            !0
          )
        } else if ('video' === d || 'audio' === d) {
          a.push(l),
            u.attrs.autoplay || u.attrs.controls || l.setAttribute('controls', 'true'),
            (l.onplay = function () {
              if ((uni.postMessage({ data: { action: 'onPlay' } }), o[3])) {
                for (var t = 0; t < a.length; t++) {
                  a[t] !== this && a[t].pause()
                }
              }
            }),
            (l.onerror = function () {
              uni.postMessage({ data: { action: 'onError', source: d, attrs: t(this) } })
            })
        } else if ('table' === d && o[4] && !l.style.cssText.includes('inline')) {
          var f = document.createElement('div')
          ;(f.style.overflow = 'auto'), f.appendChild(l), (l = f)
        } else {
          'svg' === d && (s = void 0)
        }
      }
      i.appendChild(l)
    })(c)
  }
}
document.addEventListener('UniAppJSBridgeReady', function () {
  ;(document.body.onclick = function () {
    return uni.postMessage({ data: { action: 'onClick' } })
  }),
    uni.postMessage({ data: { action: 'onJSBridgeReady' } })
})
var o,
  a = []
;(window.setContent = function (t, e, r) {
  var i = document.getElementById('content')
  e[0] && (document.body.style.cssText = e[0]), e[5] || (i.style.userSelect = 'none'), r || ((i.innerHTML = ''), (a = [])), (o = e)
  var s = document.createDocumentFragment()
  n(t, s), i.appendChild(s)
  var c = i.scrollHeight
  uni.postMessage({ data: { action: 'onLoad', height: c } }), clearInterval(window.timer)
  var u = !1
  window.timer = setInterval(function () {
    i.scrollHeight !== c
      ? ((c = i.scrollHeight), uni.postMessage({ data: { action: 'onHeightChange', height: c } }))
      : u || ((u = !0), uni.postMessage({ data: { action: 'onReady' } }))
  }, 350)
}),
  (window.onunload = function () {
    clearInterval(window.timer)
  })
