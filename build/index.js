"use strict";
(() => {
  // node_modules/preact/dist/preact.module.js
  var n;
  var l;
  var u;
  var t;
  var i;
  var r;
  var o;
  var e;
  var f;
  var c;
  var s;
  var a;
  var h;
  var p = {};
  var v = [];
  var y = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
  var w = Array.isArray;
  function d(n2, l3) {
    for (var u4 in l3) n2[u4] = l3[u4];
    return n2;
  }
  function g(n2) {
    n2 && n2.parentNode && n2.parentNode.removeChild(n2);
  }
  function _(l3, u4, t3) {
    var i4, r3, o3, e3 = {};
    for (o3 in u4) "key" == o3 ? i4 = u4[o3] : "ref" == o3 ? r3 = u4[o3] : e3[o3] = u4[o3];
    if (arguments.length > 2 && (e3.children = arguments.length > 3 ? n.call(arguments, 2) : t3), "function" == typeof l3 && null != l3.defaultProps) for (o3 in l3.defaultProps) void 0 === e3[o3] && (e3[o3] = l3.defaultProps[o3]);
    return m(l3, e3, i4, r3, null);
  }
  function m(n2, t3, i4, r3, o3) {
    var e3 = { type: n2, props: t3, key: i4, ref: r3, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: null == o3 ? ++u : o3, __i: -1, __u: 0 };
    return null == o3 && null != l.vnode && l.vnode(e3), e3;
  }
  function k(n2) {
    return n2.children;
  }
  function x(n2, l3) {
    this.props = n2, this.context = l3;
  }
  function S(n2, l3) {
    if (null == l3) return n2.__ ? S(n2.__, n2.__i + 1) : null;
    for (var u4; l3 < n2.__k.length; l3++) if (null != (u4 = n2.__k[l3]) && null != u4.__e) return u4.__e;
    return "function" == typeof n2.type ? S(n2) : null;
  }
  function C(n2) {
    var l3, u4;
    if (null != (n2 = n2.__) && null != n2.__c) {
      for (n2.__e = n2.__c.base = null, l3 = 0; l3 < n2.__k.length; l3++) if (null != (u4 = n2.__k[l3]) && null != u4.__e) {
        n2.__e = n2.__c.base = u4.__e;
        break;
      }
      return C(n2);
    }
  }
  function M(n2) {
    (!n2.__d && (n2.__d = true) && i.push(n2) && !$.__r++ || r != l.debounceRendering) && ((r = l.debounceRendering) || o)($);
  }
  function $() {
    for (var n2, u4, t3, r3, o3, f4, c3, s3 = 1; i.length; ) i.length > s3 && i.sort(e), n2 = i.shift(), s3 = i.length, n2.__d && (t3 = void 0, r3 = void 0, o3 = (r3 = (u4 = n2).__v).__e, f4 = [], c3 = [], u4.__P && ((t3 = d({}, r3)).__v = r3.__v + 1, l.vnode && l.vnode(t3), O(u4.__P, t3, r3, u4.__n, u4.__P.namespaceURI, 32 & r3.__u ? [o3] : null, f4, null == o3 ? S(r3) : o3, !!(32 & r3.__u), c3), t3.__v = r3.__v, t3.__.__k[t3.__i] = t3, N(f4, t3, c3), r3.__e = r3.__ = null, t3.__e != o3 && C(t3)));
    $.__r = 0;
  }
  function I(n2, l3, u4, t3, i4, r3, o3, e3, f4, c3, s3) {
    var a3, h3, y3, w3, d3, g2, _2, m3 = t3 && t3.__k || v, b = l3.length;
    for (f4 = P(u4, l3, m3, f4, b), a3 = 0; a3 < b; a3++) null != (y3 = u4.__k[a3]) && (h3 = -1 == y3.__i ? p : m3[y3.__i] || p, y3.__i = a3, g2 = O(n2, y3, h3, i4, r3, o3, e3, f4, c3, s3), w3 = y3.__e, y3.ref && h3.ref != y3.ref && (h3.ref && B(h3.ref, null, y3), s3.push(y3.ref, y3.__c || w3, y3)), null == d3 && null != w3 && (d3 = w3), (_2 = !!(4 & y3.__u)) || h3.__k === y3.__k ? f4 = A(y3, f4, n2, _2) : "function" == typeof y3.type && void 0 !== g2 ? f4 = g2 : w3 && (f4 = w3.nextSibling), y3.__u &= -7);
    return u4.__e = d3, f4;
  }
  function P(n2, l3, u4, t3, i4) {
    var r3, o3, e3, f4, c3, s3 = u4.length, a3 = s3, h3 = 0;
    for (n2.__k = new Array(i4), r3 = 0; r3 < i4; r3++) null != (o3 = l3[r3]) && "boolean" != typeof o3 && "function" != typeof o3 ? (f4 = r3 + h3, (o3 = n2.__k[r3] = "string" == typeof o3 || "number" == typeof o3 || "bigint" == typeof o3 || o3.constructor == String ? m(null, o3, null, null, null) : w(o3) ? m(k, { children: o3 }, null, null, null) : null == o3.constructor && o3.__b > 0 ? m(o3.type, o3.props, o3.key, o3.ref ? o3.ref : null, o3.__v) : o3).__ = n2, o3.__b = n2.__b + 1, e3 = null, -1 != (c3 = o3.__i = L(o3, u4, f4, a3)) && (a3--, (e3 = u4[c3]) && (e3.__u |= 2)), null == e3 || null == e3.__v ? (-1 == c3 && (i4 > s3 ? h3-- : i4 < s3 && h3++), "function" != typeof o3.type && (o3.__u |= 4)) : c3 != f4 && (c3 == f4 - 1 ? h3-- : c3 == f4 + 1 ? h3++ : (c3 > f4 ? h3-- : h3++, o3.__u |= 4))) : n2.__k[r3] = null;
    if (a3) for (r3 = 0; r3 < s3; r3++) null != (e3 = u4[r3]) && 0 == (2 & e3.__u) && (e3.__e == t3 && (t3 = S(e3)), D(e3, e3));
    return t3;
  }
  function A(n2, l3, u4, t3) {
    var i4, r3;
    if ("function" == typeof n2.type) {
      for (i4 = n2.__k, r3 = 0; i4 && r3 < i4.length; r3++) i4[r3] && (i4[r3].__ = n2, l3 = A(i4[r3], l3, u4, t3));
      return l3;
    }
    n2.__e != l3 && (t3 && (l3 && n2.type && !l3.parentNode && (l3 = S(n2)), u4.insertBefore(n2.__e, l3 || null)), l3 = n2.__e);
    do {
      l3 = l3 && l3.nextSibling;
    } while (null != l3 && 8 == l3.nodeType);
    return l3;
  }
  function L(n2, l3, u4, t3) {
    var i4, r3, o3, e3 = n2.key, f4 = n2.type, c3 = l3[u4], s3 = null != c3 && 0 == (2 & c3.__u);
    if (null === c3 && null == n2.key || s3 && e3 == c3.key && f4 == c3.type) return u4;
    if (t3 > (s3 ? 1 : 0)) {
      for (i4 = u4 - 1, r3 = u4 + 1; i4 >= 0 || r3 < l3.length; ) if (null != (c3 = l3[o3 = i4 >= 0 ? i4-- : r3++]) && 0 == (2 & c3.__u) && e3 == c3.key && f4 == c3.type) return o3;
    }
    return -1;
  }
  function T(n2, l3, u4) {
    "-" == l3[0] ? n2.setProperty(l3, null == u4 ? "" : u4) : n2[l3] = null == u4 ? "" : "number" != typeof u4 || y.test(l3) ? u4 : u4 + "px";
  }
  function j(n2, l3, u4, t3, i4) {
    var r3, o3;
    n: if ("style" == l3) if ("string" == typeof u4) n2.style.cssText = u4;
    else {
      if ("string" == typeof t3 && (n2.style.cssText = t3 = ""), t3) for (l3 in t3) u4 && l3 in u4 || T(n2.style, l3, "");
      if (u4) for (l3 in u4) t3 && u4[l3] == t3[l3] || T(n2.style, l3, u4[l3]);
    }
    else if ("o" == l3[0] && "n" == l3[1]) r3 = l3 != (l3 = l3.replace(f, "$1")), o3 = l3.toLowerCase(), l3 = o3 in n2 || "onFocusOut" == l3 || "onFocusIn" == l3 ? o3.slice(2) : l3.slice(2), n2.l || (n2.l = {}), n2.l[l3 + r3] = u4, u4 ? t3 ? u4.u = t3.u : (u4.u = c, n2.addEventListener(l3, r3 ? a : s, r3)) : n2.removeEventListener(l3, r3 ? a : s, r3);
    else {
      if ("http://www.w3.org/2000/svg" == i4) l3 = l3.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
      else if ("width" != l3 && "height" != l3 && "href" != l3 && "list" != l3 && "form" != l3 && "tabIndex" != l3 && "download" != l3 && "rowSpan" != l3 && "colSpan" != l3 && "role" != l3 && "popover" != l3 && l3 in n2) try {
        n2[l3] = null == u4 ? "" : u4;
        break n;
      } catch (n3) {
      }
      "function" == typeof u4 || (null == u4 || false === u4 && "-" != l3[4] ? n2.removeAttribute(l3) : n2.setAttribute(l3, "popover" == l3 && 1 == u4 ? "" : u4));
    }
  }
  function F(n2) {
    return function(u4) {
      if (this.l) {
        var t3 = this.l[u4.type + n2];
        if (null == u4.t) u4.t = c++;
        else if (u4.t < t3.u) return;
        return t3(l.event ? l.event(u4) : u4);
      }
    };
  }
  function O(n2, u4, t3, i4, r3, o3, e3, f4, c3, s3) {
    var a3, h3, p3, v3, y3, _2, m3, b, S2, C3, M2, $2, P2, A3, H, L2, T3, j3 = u4.type;
    if (null != u4.constructor) return null;
    128 & t3.__u && (c3 = !!(32 & t3.__u), o3 = [f4 = u4.__e = t3.__e]), (a3 = l.__b) && a3(u4);
    n: if ("function" == typeof j3) try {
      if (b = u4.props, S2 = "prototype" in j3 && j3.prototype.render, C3 = (a3 = j3.contextType) && i4[a3.__c], M2 = a3 ? C3 ? C3.props.value : a3.__ : i4, t3.__c ? m3 = (h3 = u4.__c = t3.__c).__ = h3.__E : (S2 ? u4.__c = h3 = new j3(b, M2) : (u4.__c = h3 = new x(b, M2), h3.constructor = j3, h3.render = E), C3 && C3.sub(h3), h3.props = b, h3.state || (h3.state = {}), h3.context = M2, h3.__n = i4, p3 = h3.__d = true, h3.__h = [], h3._sb = []), S2 && null == h3.__s && (h3.__s = h3.state), S2 && null != j3.getDerivedStateFromProps && (h3.__s == h3.state && (h3.__s = d({}, h3.__s)), d(h3.__s, j3.getDerivedStateFromProps(b, h3.__s))), v3 = h3.props, y3 = h3.state, h3.__v = u4, p3) S2 && null == j3.getDerivedStateFromProps && null != h3.componentWillMount && h3.componentWillMount(), S2 && null != h3.componentDidMount && h3.__h.push(h3.componentDidMount);
      else {
        if (S2 && null == j3.getDerivedStateFromProps && b !== v3 && null != h3.componentWillReceiveProps && h3.componentWillReceiveProps(b, M2), !h3.__e && null != h3.shouldComponentUpdate && false === h3.shouldComponentUpdate(b, h3.__s, M2) || u4.__v == t3.__v) {
          for (u4.__v != t3.__v && (h3.props = b, h3.state = h3.__s, h3.__d = false), u4.__e = t3.__e, u4.__k = t3.__k, u4.__k.some(function(n3) {
            n3 && (n3.__ = u4);
          }), $2 = 0; $2 < h3._sb.length; $2++) h3.__h.push(h3._sb[$2]);
          h3._sb = [], h3.__h.length && e3.push(h3);
          break n;
        }
        null != h3.componentWillUpdate && h3.componentWillUpdate(b, h3.__s, M2), S2 && null != h3.componentDidUpdate && h3.__h.push(function() {
          h3.componentDidUpdate(v3, y3, _2);
        });
      }
      if (h3.context = M2, h3.props = b, h3.__P = n2, h3.__e = false, P2 = l.__r, A3 = 0, S2) {
        for (h3.state = h3.__s, h3.__d = false, P2 && P2(u4), a3 = h3.render(h3.props, h3.state, h3.context), H = 0; H < h3._sb.length; H++) h3.__h.push(h3._sb[H]);
        h3._sb = [];
      } else do {
        h3.__d = false, P2 && P2(u4), a3 = h3.render(h3.props, h3.state, h3.context), h3.state = h3.__s;
      } while (h3.__d && ++A3 < 25);
      h3.state = h3.__s, null != h3.getChildContext && (i4 = d(d({}, i4), h3.getChildContext())), S2 && !p3 && null != h3.getSnapshotBeforeUpdate && (_2 = h3.getSnapshotBeforeUpdate(v3, y3)), L2 = a3, null != a3 && a3.type === k && null == a3.key && (L2 = V(a3.props.children)), f4 = I(n2, w(L2) ? L2 : [L2], u4, t3, i4, r3, o3, e3, f4, c3, s3), h3.base = u4.__e, u4.__u &= -161, h3.__h.length && e3.push(h3), m3 && (h3.__E = h3.__ = null);
    } catch (n3) {
      if (u4.__v = null, c3 || null != o3) if (n3.then) {
        for (u4.__u |= c3 ? 160 : 128; f4 && 8 == f4.nodeType && f4.nextSibling; ) f4 = f4.nextSibling;
        o3[o3.indexOf(f4)] = null, u4.__e = f4;
      } else {
        for (T3 = o3.length; T3--; ) g(o3[T3]);
        z(u4);
      }
      else u4.__e = t3.__e, u4.__k = t3.__k, n3.then || z(u4);
      l.__e(n3, u4, t3);
    }
    else null == o3 && u4.__v == t3.__v ? (u4.__k = t3.__k, u4.__e = t3.__e) : f4 = u4.__e = q(t3.__e, u4, t3, i4, r3, o3, e3, c3, s3);
    return (a3 = l.diffed) && a3(u4), 128 & u4.__u ? void 0 : f4;
  }
  function z(n2) {
    n2 && n2.__c && (n2.__c.__e = true), n2 && n2.__k && n2.__k.forEach(z);
  }
  function N(n2, u4, t3) {
    for (var i4 = 0; i4 < t3.length; i4++) B(t3[i4], t3[++i4], t3[++i4]);
    l.__c && l.__c(u4, n2), n2.some(function(u5) {
      try {
        n2 = u5.__h, u5.__h = [], n2.some(function(n3) {
          n3.call(u5);
        });
      } catch (n3) {
        l.__e(n3, u5.__v);
      }
    });
  }
  function V(n2) {
    return "object" != typeof n2 || null == n2 || n2.__b && n2.__b > 0 ? n2 : w(n2) ? n2.map(V) : d({}, n2);
  }
  function q(u4, t3, i4, r3, o3, e3, f4, c3, s3) {
    var a3, h3, v3, y3, d3, _2, m3, b = i4.props, k3 = t3.props, x2 = t3.type;
    if ("svg" == x2 ? o3 = "http://www.w3.org/2000/svg" : "math" == x2 ? o3 = "http://www.w3.org/1998/Math/MathML" : o3 || (o3 = "http://www.w3.org/1999/xhtml"), null != e3) {
      for (a3 = 0; a3 < e3.length; a3++) if ((d3 = e3[a3]) && "setAttribute" in d3 == !!x2 && (x2 ? d3.localName == x2 : 3 == d3.nodeType)) {
        u4 = d3, e3[a3] = null;
        break;
      }
    }
    if (null == u4) {
      if (null == x2) return document.createTextNode(k3);
      u4 = document.createElementNS(o3, x2, k3.is && k3), c3 && (l.__m && l.__m(t3, e3), c3 = false), e3 = null;
    }
    if (null == x2) b === k3 || c3 && u4.data == k3 || (u4.data = k3);
    else {
      if (e3 = e3 && n.call(u4.childNodes), b = i4.props || p, !c3 && null != e3) for (b = {}, a3 = 0; a3 < u4.attributes.length; a3++) b[(d3 = u4.attributes[a3]).name] = d3.value;
      for (a3 in b) if (d3 = b[a3], "children" == a3) ;
      else if ("dangerouslySetInnerHTML" == a3) v3 = d3;
      else if (!(a3 in k3)) {
        if ("value" == a3 && "defaultValue" in k3 || "checked" == a3 && "defaultChecked" in k3) continue;
        j(u4, a3, null, d3, o3);
      }
      for (a3 in k3) d3 = k3[a3], "children" == a3 ? y3 = d3 : "dangerouslySetInnerHTML" == a3 ? h3 = d3 : "value" == a3 ? _2 = d3 : "checked" == a3 ? m3 = d3 : c3 && "function" != typeof d3 || b[a3] === d3 || j(u4, a3, d3, b[a3], o3);
      if (h3) c3 || v3 && (h3.__html == v3.__html || h3.__html == u4.innerHTML) || (u4.innerHTML = h3.__html), t3.__k = [];
      else if (v3 && (u4.innerHTML = ""), I("template" == t3.type ? u4.content : u4, w(y3) ? y3 : [y3], t3, i4, r3, "foreignObject" == x2 ? "http://www.w3.org/1999/xhtml" : o3, e3, f4, e3 ? e3[0] : i4.__k && S(i4, 0), c3, s3), null != e3) for (a3 = e3.length; a3--; ) g(e3[a3]);
      c3 || (a3 = "value", "progress" == x2 && null == _2 ? u4.removeAttribute("value") : null != _2 && (_2 !== u4[a3] || "progress" == x2 && !_2 || "option" == x2 && _2 != b[a3]) && j(u4, a3, _2, b[a3], o3), a3 = "checked", null != m3 && m3 != u4[a3] && j(u4, a3, m3, b[a3], o3));
    }
    return u4;
  }
  function B(n2, u4, t3) {
    try {
      if ("function" == typeof n2) {
        var i4 = "function" == typeof n2.__u;
        i4 && n2.__u(), i4 && null == u4 || (n2.__u = n2(u4));
      } else n2.current = u4;
    } catch (n3) {
      l.__e(n3, t3);
    }
  }
  function D(n2, u4, t3) {
    var i4, r3;
    if (l.unmount && l.unmount(n2), (i4 = n2.ref) && (i4.current && i4.current != n2.__e || B(i4, null, u4)), null != (i4 = n2.__c)) {
      if (i4.componentWillUnmount) try {
        i4.componentWillUnmount();
      } catch (n3) {
        l.__e(n3, u4);
      }
      i4.base = i4.__P = null;
    }
    if (i4 = n2.__k) for (r3 = 0; r3 < i4.length; r3++) i4[r3] && D(i4[r3], u4, t3 || "function" != typeof n2.type);
    t3 || g(n2.__e), n2.__c = n2.__ = n2.__e = void 0;
  }
  function E(n2, l3, u4) {
    return this.constructor(n2, u4);
  }
  function G(u4, t3, i4) {
    var r3, o3, e3, f4;
    t3 == document && (t3 = document.documentElement), l.__ && l.__(u4, t3), o3 = (r3 = "function" == typeof i4) ? null : i4 && i4.__k || t3.__k, e3 = [], f4 = [], O(t3, u4 = (!r3 && i4 || t3).__k = _(k, null, [u4]), o3 || p, p, t3.namespaceURI, !r3 && i4 ? [i4] : o3 ? null : t3.firstChild ? n.call(t3.childNodes) : null, e3, !r3 && i4 ? i4 : o3 ? o3.__e : t3.firstChild, r3, f4), N(e3, u4, f4);
  }
  n = v.slice, l = { __e: function(n2, l3, u4, t3) {
    for (var i4, r3, o3; l3 = l3.__; ) if ((i4 = l3.__c) && !i4.__) try {
      if ((r3 = i4.constructor) && null != r3.getDerivedStateFromError && (i4.setState(r3.getDerivedStateFromError(n2)), o3 = i4.__d), null != i4.componentDidCatch && (i4.componentDidCatch(n2, t3 || {}), o3 = i4.__d), o3) return i4.__E = i4;
    } catch (l4) {
      n2 = l4;
    }
    throw n2;
  } }, u = 0, t = function(n2) {
    return null != n2 && null == n2.constructor;
  }, x.prototype.setState = function(n2, l3) {
    var u4;
    u4 = null != this.__s && this.__s != this.state ? this.__s : this.__s = d({}, this.state), "function" == typeof n2 && (n2 = n2(d({}, u4), this.props)), n2 && d(u4, n2), null != n2 && this.__v && (l3 && this._sb.push(l3), M(this));
  }, x.prototype.forceUpdate = function(n2) {
    this.__v && (this.__e = true, n2 && this.__h.push(n2), M(this));
  }, x.prototype.render = k, i = [], o = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, e = function(n2, l3) {
    return n2.__v.__b - l3.__v.__b;
  }, $.__r = 0, f = /(PointerCapture)$|Capture$/i, c = 0, s = F(false), a = F(true), h = 0;

  // node_modules/preact/hooks/dist/hooks.module.js
  var t2;
  var r2;
  var u2;
  var i2;
  var o2 = 0;
  var f2 = [];
  var c2 = l;
  var e2 = c2.__b;
  var a2 = c2.__r;
  var v2 = c2.diffed;
  var l2 = c2.__c;
  var m2 = c2.unmount;
  var s2 = c2.__;
  function p2(n2, t3) {
    c2.__h && c2.__h(r2, n2, o2 || t3), o2 = 0;
    var u4 = r2.__H || (r2.__H = { __: [], __h: [] });
    return n2 >= u4.__.length && u4.__.push({}), u4.__[n2];
  }
  function d2(n2) {
    return o2 = 1, h2(D2, n2);
  }
  function h2(n2, u4, i4) {
    var o3 = p2(t2++, 2);
    if (o3.t = n2, !o3.__c && (o3.__ = [i4 ? i4(u4) : D2(void 0, u4), function(n3) {
      var t3 = o3.__N ? o3.__N[0] : o3.__[0], r3 = o3.t(t3, n3);
      t3 !== r3 && (o3.__N = [r3, o3.__[1]], o3.__c.setState({}));
    }], o3.__c = r2, !r2.__f)) {
      var f4 = function(n3, t3, r3) {
        if (!o3.__c.__H) return true;
        var u5 = o3.__c.__H.__.filter(function(n4) {
          return !!n4.__c;
        });
        if (u5.every(function(n4) {
          return !n4.__N;
        })) return !c3 || c3.call(this, n3, t3, r3);
        var i5 = o3.__c.props !== n3;
        return u5.forEach(function(n4) {
          if (n4.__N) {
            var t4 = n4.__[0];
            n4.__ = n4.__N, n4.__N = void 0, t4 !== n4.__[0] && (i5 = true);
          }
        }), c3 && c3.call(this, n3, t3, r3) || i5;
      };
      r2.__f = true;
      var c3 = r2.shouldComponentUpdate, e3 = r2.componentWillUpdate;
      r2.componentWillUpdate = function(n3, t3, r3) {
        if (this.__e) {
          var u5 = c3;
          c3 = void 0, f4(n3, t3, r3), c3 = u5;
        }
        e3 && e3.call(this, n3, t3, r3);
      }, r2.shouldComponentUpdate = f4;
    }
    return o3.__N || o3.__;
  }
  function y2(n2, u4) {
    var i4 = p2(t2++, 3);
    !c2.__s && C2(i4.__H, u4) && (i4.__ = n2, i4.u = u4, r2.__H.__h.push(i4));
  }
  function A2(n2) {
    return o2 = 5, T2(function() {
      return { current: n2 };
    }, []);
  }
  function T2(n2, r3) {
    var u4 = p2(t2++, 7);
    return C2(u4.__H, r3) && (u4.__ = n2(), u4.__H = r3, u4.__h = n2), u4.__;
  }
  function j2() {
    for (var n2; n2 = f2.shift(); ) if (n2.__P && n2.__H) try {
      n2.__H.__h.forEach(z2), n2.__H.__h.forEach(B2), n2.__H.__h = [];
    } catch (t3) {
      n2.__H.__h = [], c2.__e(t3, n2.__v);
    }
  }
  c2.__b = function(n2) {
    r2 = null, e2 && e2(n2);
  }, c2.__ = function(n2, t3) {
    n2 && t3.__k && t3.__k.__m && (n2.__m = t3.__k.__m), s2 && s2(n2, t3);
  }, c2.__r = function(n2) {
    a2 && a2(n2), t2 = 0;
    var i4 = (r2 = n2.__c).__H;
    i4 && (u2 === r2 ? (i4.__h = [], r2.__h = [], i4.__.forEach(function(n3) {
      n3.__N && (n3.__ = n3.__N), n3.u = n3.__N = void 0;
    })) : (i4.__h.forEach(z2), i4.__h.forEach(B2), i4.__h = [], t2 = 0)), u2 = r2;
  }, c2.diffed = function(n2) {
    v2 && v2(n2);
    var t3 = n2.__c;
    t3 && t3.__H && (t3.__H.__h.length && (1 !== f2.push(t3) && i2 === c2.requestAnimationFrame || ((i2 = c2.requestAnimationFrame) || w2)(j2)), t3.__H.__.forEach(function(n3) {
      n3.u && (n3.__H = n3.u), n3.u = void 0;
    })), u2 = r2 = null;
  }, c2.__c = function(n2, t3) {
    t3.some(function(n3) {
      try {
        n3.__h.forEach(z2), n3.__h = n3.__h.filter(function(n4) {
          return !n4.__ || B2(n4);
        });
      } catch (r3) {
        t3.some(function(n4) {
          n4.__h && (n4.__h = []);
        }), t3 = [], c2.__e(r3, n3.__v);
      }
    }), l2 && l2(n2, t3);
  }, c2.unmount = function(n2) {
    m2 && m2(n2);
    var t3, r3 = n2.__c;
    r3 && r3.__H && (r3.__H.__.forEach(function(n3) {
      try {
        z2(n3);
      } catch (n4) {
        t3 = n4;
      }
    }), r3.__H = void 0, t3 && c2.__e(t3, r3.__v));
  };
  var k2 = "function" == typeof requestAnimationFrame;
  function w2(n2) {
    var t3, r3 = function() {
      clearTimeout(u4), k2 && cancelAnimationFrame(t3), setTimeout(n2);
    }, u4 = setTimeout(r3, 35);
    k2 && (t3 = requestAnimationFrame(r3));
  }
  function z2(n2) {
    var t3 = r2, u4 = n2.__c;
    "function" == typeof u4 && (n2.__c = void 0, u4()), r2 = t3;
  }
  function B2(n2) {
    var t3 = r2;
    n2.__c = n2.__(), r2 = t3;
  }
  function C2(n2, t3) {
    return !n2 || n2.length !== t3.length || t3.some(function(t4, r3) {
      return t4 !== n2[r3];
    });
  }
  function D2(n2, t3) {
    return "function" == typeof t3 ? t3(n2) : t3;
  }

  // node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js
  var f3 = 0;
  var i3 = Array.isArray;
  function u3(e3, t3, n2, o3, i4, u4) {
    t3 || (t3 = {});
    var a3, c3, p3 = t3;
    if ("ref" in p3) for (c3 in p3 = {}, t3) "ref" == c3 ? a3 = t3[c3] : p3[c3] = t3[c3];
    var l3 = { type: e3, props: p3, key: n2, ref: a3, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --f3, __i: -1, __u: 0, __source: i4, __self: u4 };
    if ("function" == typeof e3 && (a3 = e3.defaultProps)) for (c3 in a3) void 0 === p3[c3] && (p3[c3] = a3[c3]);
    return l.vnode && l.vnode(l3), l3;
  }

  // src/components/PersistentFilterBar.tsx
  var PersistentFilterBar = ({ hideDrafts, setHideDrafts, onlyHotfixes, setOnlyHotfixes, groupByTicket, setGroupByTicket, pipelineStatus, setPipelineStatus, approvalReadyFilter, setApprovalReadyFilter, reviewerReadyFilter, setReviewerReadyFilter }) => /* @__PURE__ */ u3("div", { className: "gb-filter-bar", children: [
    /* @__PURE__ */ u3("label", { title: "Draft: GitLab draft/WIP flag or title starts with draft:/wip:", className: "gb-filter-item", children: [
      /* @__PURE__ */ u3("input", { type: "checkbox", checked: hideDrafts, onChange: (e3) => setHideDrafts(e3.target.checked) }),
      " Hide draft MRs"
    ] }),
    /* @__PURE__ */ u3("label", { title: "Hotfix: targets main or master branch OR title contains \u{1F691}", className: "gb-filter-item", children: [
      /* @__PURE__ */ u3("input", { type: "checkbox", checked: onlyHotfixes, onChange: (e3) => setOnlyHotfixes(e3.target.checked) }),
      " Only hotfix MRs"
    ] }),
    /* @__PURE__ */ u3("label", { title: "Group rows by first JIRA-like ticket (ABC-123) in title", className: "gb-filter-item", children: [
      /* @__PURE__ */ u3("input", { type: "checkbox", checked: groupByTicket, onChange: (e3) => setGroupByTicket(e3.target.checked) }),
      " Group by ticket"
    ] }),
    /* @__PURE__ */ u3("label", { title: "Filter by head pipeline status", className: "gb-filter-item", children: [
      /* @__PURE__ */ u3("span", { children: "Pipeline:" }),
      /* @__PURE__ */ u3("select", { value: pipelineStatus, onChange: (e3) => setPipelineStatus(e3.target.value), className: "gb-pipeline-select", children: [
        /* @__PURE__ */ u3("option", { value: "all", children: "All" }),
        /* @__PURE__ */ u3("option", { value: "success", children: "Success" }),
        /* @__PURE__ */ u3("option", { value: "failed", children: "Failed" })
      ] })
    ] }),
    /* @__PURE__ */ u3("label", { className: "gb-filter-item", title: "Filter by readiness of team approval requirements", children: [
      /* @__PURE__ */ u3("span", { children: "Approvers:" }),
      /* @__PURE__ */ u3("select", { value: approvalReadyFilter, onChange: (e3) => setApprovalReadyFilter(e3.target.value), className: "gb-pipeline-select", children: [
        /* @__PURE__ */ u3("option", { value: "all", children: "All" }),
        /* @__PURE__ */ u3("option", { value: "ready", children: "Ready" }),
        /* @__PURE__ */ u3("option", { value: "not_ready", children: "Not ready" })
      ] })
    ] }),
    /* @__PURE__ */ u3("label", { className: "gb-filter-item", title: "Filter by readiness of team reviewer requirements", children: [
      /* @__PURE__ */ u3("span", { children: "Reviewers:" }),
      /* @__PURE__ */ u3("select", { value: reviewerReadyFilter, onChange: (e3) => setReviewerReadyFilter(e3.target.value), className: "gb-pipeline-select", children: [
        /* @__PURE__ */ u3("option", { value: "all", children: "All" }),
        /* @__PURE__ */ u3("option", { value: "ready", children: "Ready" }),
        /* @__PURE__ */ u3("option", { value: "not_ready", children: "Not ready" })
      ] })
    ] })
  ] });

  // src/components/NonPersistentProjectFilter.tsx
  var NonPersistentProjectFilter = ({ projects, selectedProject, setSelectedProject }) => {
    const [open, setOpen] = d2(false);
    const choose = (p3) => {
      setSelectedProject(p3);
      setOpen(false);
    };
    return /* @__PURE__ */ u3("div", { className: "gb-project-filter", children: /* @__PURE__ */ u3("div", { className: "gb-select", children: [
      /* @__PURE__ */ u3("button", { type: "button", className: `gb-select-trigger ${projects.length ? "" : "disabled"}`, disabled: !projects.length, onClick: () => projects.length && setOpen(!open), children: selectedProject ? /* @__PURE__ */ u3("span", { className: "gb-select-value", children: selectedProject }) : /* @__PURE__ */ u3("span", { className: "gb-select-placeholder", children: "All projects" }) }),
      open && /* @__PURE__ */ u3("div", { className: "gb-select-menu", children: [
        /* @__PURE__ */ u3("div", { className: `gb-select-item ${!selectedProject ? "active" : ""}`, onClick: () => choose(null), children: /* @__PURE__ */ u3("span", { className: "gb-select-placeholder", children: "All projects" }) }),
        projects.map((p3) => /* @__PURE__ */ u3("div", { className: `gb-select-item ${p3 === selectedProject ? "active" : ""}`, onClick: () => choose(p3), children: /* @__PURE__ */ u3("span", { children: p3 }) }, p3)),
        !projects.length && /* @__PURE__ */ u3("div", { className: "gb-select-empty", children: "No projects" })
      ] })
    ] }) });
  };

  // src/components/NonPersistentAuthorFilter.tsx
  var NOT_ME = "__NOT_ME__";
  var NonPersistentAuthorFilter = ({ authors, selectedAuthor, setSelectedAuthor, disabled, username, invertAuthor, setInvertAuthor }) => {
    const [open, setOpen] = d2(false);
    const ref = A2(null);
    y2(() => {
      const handler = (e3) => {
        if (open && ref.current && !ref.current.contains(e3.target)) {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, [open]);
    const uniqueAuthors = authors.filter((a3) => !!a3?.username);
    const isNotMe = selectedAuthor === NOT_ME;
    const meUser = username ? uniqueAuthors.find((a3) => a3.username === username) || null : null;
    const current = isNotMe ? meUser : uniqueAuthors.find((a3) => a3.username === selectedAuthor) || null;
    const choose = (usernameChoice) => {
      setSelectedAuthor(usernameChoice);
      if (usernameChoice === null) {
        setInvertAuthor(false);
      }
      setOpen(false);
    };
    const chooseNotMe = () => {
      setSelectedAuthor(NOT_ME);
      setInvertAuthor(false);
      setOpen(false);
    };
    const displayName = isNotMe ? "(not) me" : current ? `${invertAuthor ? "(not) " : ""}${current.username}` : "";
    return /* @__PURE__ */ u3("div", { className: "gb-select", ref, children: [
      /* @__PURE__ */ u3("button", { type: "button", className: `gb-select-trigger ${disabled ? "disabled" : ""}`, disabled, onClick: () => !disabled && setOpen(!open), "aria-expanded": open, title: disabled ? "Disabled when author scope is Mine" : "", children: [
        current && current.avatar_url ? /* @__PURE__ */ u3("span", { className: "gb-avatar-wrapper gb-avatar-filter-value", children: [
          /* @__PURE__ */ u3("img", { src: current.avatar_url, alt: current.username, className: "gb-avatar" }),
          (isNotMe || invertAuthor) && /* @__PURE__ */ u3("span", { className: "gb-avatar-invert-marker", children: "\u2717" })
        ] }) : /* @__PURE__ */ u3("span", { className: "gb-select-placeholder", children: "All authors" }),
        /* @__PURE__ */ u3("span", { className: "gb-select-value", children: displayName })
      ] }),
      open && !disabled && /* @__PURE__ */ u3("div", { className: "gb-select-menu", children: [
        /* @__PURE__ */ u3("div", { className: `gb-select-item ${!current && !isNotMe ? "active" : ""}`, onClick: () => choose(null), children: /* @__PURE__ */ u3("span", { className: "gb-select-placeholder", children: "All authors" }) }),
        username && /* @__PURE__ */ u3("div", { className: `gb-select-item ${isNotMe ? "active" : ""}`, onClick: chooseNotMe, children: /* @__PURE__ */ u3("span", { children: "Not me" }) }),
        uniqueAuthors.map((a3) => /* @__PURE__ */ u3("div", { className: `gb-select-item ${a3.username === selectedAuthor ? "active" : ""}`, onClick: () => choose(a3.username), children: [
          /* @__PURE__ */ u3("img", { src: a3.avatar_url, alt: a3.username, className: "gb-avatar" }),
          /* @__PURE__ */ u3("span", { children: a3.username })
        ] }, a3.id)),
        !uniqueAuthors.length && /* @__PURE__ */ u3("div", { className: "gb-select-empty", children: "No authors" }),
        current && !isNotMe && /* @__PURE__ */ u3("div", { className: "gb-select-item", onClick: () => setInvertAuthor(!invertAuthor), children: [
          /* @__PURE__ */ u3("input", { type: "checkbox", checked: invertAuthor, onChange: (e3) => setInvertAuthor(e3.target.checked) }),
          " ",
          /* @__PURE__ */ u3("span", { children: "Invert (not)" })
        ] })
      ] })
    ] });
  };

  // src/components/NonPersistentReviewerFilter.tsx
  var NonPersistentReviewerFilter = ({ users, selectedReviewer, setSelectedReviewer, invert, setInvert, disabled }) => {
    const [open, setOpen] = d2(false);
    const ref = A2(null);
    y2(() => {
      const handler = (e3) => {
        if (open && ref.current && !ref.current.contains(e3.target)) {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, [open]);
    const unique = users.filter((u4) => !!u4?.username);
    const current = unique.find((u4) => u4.username === selectedReviewer) || null;
    const choose = (usernameChoice) => {
      setSelectedReviewer(usernameChoice);
      setOpen(false);
    };
    return /* @__PURE__ */ u3("div", { className: "gb-select", ref, title: "Filter by reviewers (from approvals/comments excluding author)", children: [
      /* @__PURE__ */ u3("button", { type: "button", className: `gb-select-trigger ${disabled ? "disabled" : ""}`, disabled, onClick: () => !disabled && setOpen(!open), "aria-expanded": open, children: [
        current && current.avatar_url ? /* @__PURE__ */ u3("span", { className: "gb-avatar-wrapper gb-avatar-filter-value", children: [
          /* @__PURE__ */ u3("img", { src: current.avatar_url, alt: current.username, className: "gb-avatar" }),
          invert && /* @__PURE__ */ u3("span", { className: "gb-avatar-invert-marker", children: "\u2717" })
        ] }) : /* @__PURE__ */ u3("span", { className: "gb-select-placeholder", children: "All reviewers" }),
        /* @__PURE__ */ u3("span", { className: "gb-select-value", children: current ? `${invert ? "(not) " : ""}${current.username}` : "" })
      ] }),
      open && !disabled && /* @__PURE__ */ u3("div", { className: "gb-select-menu", children: [
        /* @__PURE__ */ u3("div", { className: `gb-select-item ${!current ? "active" : ""}`, onClick: () => choose(null), children: /* @__PURE__ */ u3("span", { className: "gb-select-placeholder", children: "All reviewers" }) }),
        unique.map((u4) => /* @__PURE__ */ u3("div", { className: `gb-select-item ${u4.username === selectedReviewer ? "active" : ""}`, onClick: () => choose(u4.username), children: [
          /* @__PURE__ */ u3("img", { src: u4.avatar_url, alt: u4.username, className: "gb-avatar" }),
          /* @__PURE__ */ u3("span", { children: u4.username })
        ] }, u4.id)),
        !unique.length && /* @__PURE__ */ u3("div", { className: "gb-select-empty", children: "No reviewers" }),
        current && /* @__PURE__ */ u3("div", { className: "gb-select-item", onClick: () => setInvert(!invert), children: [
          /* @__PURE__ */ u3("input", { type: "checkbox", checked: invert, onChange: (e3) => setInvert(e3.target.checked) }),
          " ",
          /* @__PURE__ */ u3("span", { children: "Invert (not)" })
        ] })
      ] })
    ] });
  };

  // src/components/NonPersistentApproverFilter.tsx
  var NonPersistentApproverFilter = ({ users, selectedApprover, setSelectedApprover, invert, setInvert, disabled }) => {
    const [open, setOpen] = d2(false);
    const ref = A2(null);
    y2(() => {
      const handler = (e3) => {
        if (open && ref.current && !ref.current.contains(e3.target)) {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, [open]);
    const unique = users.filter((u4) => !!u4?.username);
    const current = unique.find((u4) => u4.username === selectedApprover) || null;
    const choose = (usernameChoice) => {
      setSelectedApprover(usernameChoice);
      setOpen(false);
    };
    return /* @__PURE__ */ u3("div", { className: "gb-select", ref, title: "Filter by approvers (users who approved)", children: [
      /* @__PURE__ */ u3("button", { type: "button", className: `gb-select-trigger ${disabled ? "disabled" : ""}`, disabled, onClick: () => !disabled && setOpen(!open), "aria-expanded": open, children: [
        current && current.avatar_url ? /* @__PURE__ */ u3("span", { className: "gb-avatar-wrapper gb-avatar-filter-value", children: [
          /* @__PURE__ */ u3("img", { src: current.avatar_url, alt: current.username, className: "gb-avatar" }),
          invert && /* @__PURE__ */ u3("span", { className: "gb-avatar-invert-marker", children: "\u2717" })
        ] }) : /* @__PURE__ */ u3("span", { className: "gb-select-placeholder", children: "All approvers" }),
        /* @__PURE__ */ u3("span", { className: "gb-select-value", children: current ? `${invert ? "(not) " : ""}${current.username}` : "" })
      ] }),
      open && !disabled && /* @__PURE__ */ u3("div", { className: "gb-select-menu", children: [
        /* @__PURE__ */ u3("div", { className: `gb-select-item ${!current ? "active" : ""}`, onClick: () => choose(null), children: /* @__PURE__ */ u3("span", { className: "gb-select-placeholder", children: "All approvers" }) }),
        unique.map((u4) => /* @__PURE__ */ u3("div", { className: `gb-select-item ${u4.username === selectedApprover ? "active" : ""}`, onClick: () => choose(u4.username), children: [
          /* @__PURE__ */ u3("img", { src: u4.avatar_url, alt: u4.username, className: "gb-avatar" }),
          /* @__PURE__ */ u3("span", { children: u4.username })
        ] }, u4.id)),
        !unique.length && /* @__PURE__ */ u3("div", { className: "gb-select-empty", children: "No approvers" }),
        current && /* @__PURE__ */ u3("div", { className: "gb-select-item", onClick: () => setInvert(!invert), children: [
          /* @__PURE__ */ u3("input", { type: "checkbox", checked: invert, onChange: (e3) => setInvert(e3.target.checked) }),
          " ",
          /* @__PURE__ */ u3("span", { children: "Invert (not)" })
        ] })
      ] })
    ] });
  };

  // src/components/NonPersistantFilter.tsx
  var NonPersistantFilter = ({ projects, selectedProject, setSelectedProject, authors, selectedAuthor, setSelectedAuthor, reviewerUsers, selectedReviewer, setSelectedReviewer, invertReviewer, setInvertReviewer, approverUsers, selectedApprover, setSelectedApprover, invertApprover, setInvertApprover, username, disabled, reviewMetaLoading, invertAuthor, setInvertAuthor }) => /* @__PURE__ */ u3("div", { className: "gb-filter-bar", children: [
    /* @__PURE__ */ u3(NonPersistentProjectFilter, { projects, selectedProject, setSelectedProject }),
    /* @__PURE__ */ u3(NonPersistentAuthorFilter, { authors, selectedAuthor, setSelectedAuthor, disabled: !!disabled, username, invertAuthor, setInvertAuthor }),
    /* @__PURE__ */ u3(NonPersistentReviewerFilter, { users: reviewerUsers, selectedReviewer, setSelectedReviewer, invert: invertReviewer, setInvert: setInvertReviewer, disabled: reviewMetaLoading }),
    /* @__PURE__ */ u3(NonPersistentApproverFilter, { users: approverUsers, selectedApprover, setSelectedApprover, invert: invertApprover, setInvert: setInvertApprover, disabled: reviewMetaLoading })
  ] });

  // src/UserAvatar.tsx
  var UserAvatar = ({ user, overlap = false }) => {
    const tooltip = `${user.username} \u2014 ${user.name}`;
    const cls = overlap ? "overlap" : "";
    return /* @__PURE__ */ u3("span", { title: tooltip, className: "gb-avatar-wrapper", children: user.avatar_url ? /* @__PURE__ */ u3("img", { src: user.avatar_url, alt: user.username, className: `gb-avatar ${cls}` }) : /* @__PURE__ */ u3("span", { className: `gb-avatar-fallback ${cls}`, children: user.username?.charAt(0).toUpperCase() }) });
  };

  // src/utils/mrUtils.ts
  var isDraftMr = (mr) => {
    const title = mr.title.toLowerCase();
    return mr.draft || mr.work_in_progress || title.startsWith("draft:") || title.startsWith("wip:");
  };
  var isHotfixMr = (mr) => {
    const target = mr.target_branch.toLowerCase();
    return target === "main" || target === "master" || mr.title.includes("\u{1F691}");
  };
  var extractJiraTicket = (title) => {
    const match = title.toUpperCase().match(/([A-Z][A-Z0-9]+-\d+)/);
    return match ? match[1] : null;
  };

  // src/components/UpdatedDate.tsx
  var computeRelative = (iso) => {
    const target = new Date(iso);
    if (isNaN(target.getTime())) return "Invalid date";
    const now = /* @__PURE__ */ new Date();
    let diffMs = target.getTime() - now.getTime();
    const past = diffMs < 0;
    diffMs = Math.abs(diffMs);
    const sec = Math.floor(diffMs / 1e3);
    const min = Math.floor(sec / 60);
    const hr = Math.floor(min / 60);
    const day = Math.floor(hr / 24);
    const month = Math.floor(day / 30);
    const year = Math.floor(day / 365);
    const fmt = (val, unit) => `${val} ${unit}${val > 1 ? "s" : ""}`;
    let phrase;
    if (sec < 45) phrase = "just now";
    else if (min < 2) phrase = "1 minute ago";
    else if (min < 60) phrase = `${fmt(min, "minute")} ago`;
    else if (hr < 2) phrase = "1 hour ago";
    else if (hr < 24) phrase = `${fmt(hr, "hour")} ago`;
    else if (day < 2) phrase = "1 day ago";
    else if (day < 30) phrase = `${fmt(day, "day")} ago`;
    else if (month < 2) phrase = "1 month ago";
    else if (month < 12) phrase = `${fmt(month, "month")} ago`;
    else if (year < 2) phrase = "1 year ago";
    else phrase = `${fmt(year, "year")} ago`;
    if (!past) {
      if (sec < 45) return "in a moment";
      if (min < 2) return "in 1 minute";
      if (min < 60) return `in ${fmt(min, "minute")}`;
      if (hr < 2) return "in 1 hour";
      if (hr < 24) return `in ${fmt(hr, "hour")}`;
      if (day < 2) return "in 1 day";
      if (day < 30) return `in ${fmt(day, "day")}`;
      if (month < 2) return "in 1 month";
      if (month < 12) return `in ${fmt(month, "month")}`;
      if (year < 2) return "in 1 year";
      return `in ${fmt(year, "year")}`;
    }
    return phrase;
  };
  var formatFrenchDate = (iso) => {
    const d3 = new Date(iso);
    if (isNaN(d3.getTime())) return "-";
    const pad = (n2) => String(n2).padStart(2, "0");
    return `${pad(d3.getDate())}/${pad(d3.getMonth() + 1)}/${d3.getFullYear()} ${pad(d3.getHours())}:${pad(d3.getMinutes())}`;
  };
  var UpdatedDate = ({ iso }) => {
    const [relative, setRelative] = d2(() => computeRelative(iso));
    y2(() => {
      const id = setInterval(() => setRelative(computeRelative(iso)), 6e4);
      return () => clearInterval(id);
    }, [iso]);
    const display = formatFrenchDate(iso);
    return /* @__PURE__ */ u3("time", { dateTime: iso, title: relative, className: "gb-date", children: display });
  };

  // src/components/MergeRequestsTable.tsx
  var pipelineCell = (mr) => {
    const status = mr.head_pipeline?.status;
    if (!status) return "\u2013";
    if (status === "success") return /* @__PURE__ */ u3("span", { className: "gb-pipeline-status success", title: "Pipeline succeeded", children: "\u2713" });
    if (status === "failed") return /* @__PURE__ */ u3("span", { className: "gb-pipeline-status failed", title: "Pipeline failed", children: "\u2717" });
    return /* @__PURE__ */ u3("span", { className: "gb-pipeline-status other", title: `Pipeline status: ${status}`, children: "\u2022" });
  };
  var reviewersCell = (reviewers, status) => {
    const missingEntries = status?.teamCounts.filter((c3) => c3.need > 0 && c3.have < c3.need) || [];
    const tooltip = missingEntries.length ? `Missing reviewers: ${missingEntries.map((c3) => `${c3.team} ${c3.have}/${c3.need}`).join(", ")}` : status ? `Reviewer requirements: ${status.details}` : "No reviewer data";
    return /* @__PURE__ */ u3("div", { className: "gb-right", children: /* @__PURE__ */ u3("span", { className: "gb-inline-cell right", children: [
      reviewers.length ? /* @__PURE__ */ u3("span", { title: `Reviewers (${reviewers.length})`, className: "gb-avatar-stack", children: reviewers.map((u4, i4) => /* @__PURE__ */ u3(UserAvatar, { user: u4, overlap: i4 > 0 })) }) : "\u2013",
      status && /* @__PURE__ */ u3("span", { className: `gb-req-status ${status.ready ? "ready" : "not-ready"}`, title: status.ready ? `All reviewer team requirements met` : `Some reviewer team requirements missing`, children: status.ready ? "\u2713" : "\u2717" }),
      !!missingEntries.length && /* @__PURE__ */ u3("span", { className: "gb-miss-agg", title: tooltip, children: [
        "!",
        missingEntries.length
      ] })
    ] }) });
  };
  var approversCell = (approvers, status) => {
    const missingEntries = status?.teamCounts.filter((c3) => c3.need > 0 && c3.have < c3.need) || [];
    const tooltip = missingEntries.length ? `Missing approvals: ${missingEntries.map((c3) => `${c3.team} ${c3.have}/${c3.need}`).join(", ")}` : status ? `Approver requirements: ${status.details}` : "No approval data";
    return /* @__PURE__ */ u3("div", { className: "gb-right", children: /* @__PURE__ */ u3("span", { className: "gb-inline-cell right", children: [
      approvers.length ? /* @__PURE__ */ u3("span", { title: `Approvers (${approvers.length})`, className: "gb-avatar-stack", children: approvers.map((u4, i4) => /* @__PURE__ */ u3(UserAvatar, { user: u4, overlap: i4 > 0 })) }) : "\u2013",
      status && /* @__PURE__ */ u3("span", { className: `gb-req-status ${status.ready ? "ready" : "not-ready"}`, title: status.ready ? `All approval team requirements met` : `Some approval team requirements missing`, children: status.ready ? "\u2713" : "\u2717" }),
      !!missingEntries.length && /* @__PURE__ */ u3("span", { className: "gb-miss-agg", title: tooltip, children: [
        "!",
        missingEntries.length
      ] })
    ] }) });
  };
  var MergeRequestsTable = ({ mrs, filter, setFilter, approvalsUsersByMr, reviewersUsersByMr, approvalsStatusByMr, reviewersStatusByMr, groupByTicket, sortDirection, setSortDirection }) => {
    const sortedMrs = [...mrs].sort((a3, b) => {
      const da = new Date(a3.updated_at).getTime();
      const db = new Date(b.updated_at).getTime();
      return sortDirection === "asc" ? da - db : db - da;
    });
    const toggleSort = () => setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    const updatedHeader = /* @__PURE__ */ u3("button", { type: "button", className: "gb-sortable", onClick: toggleSort, title: "Sort by updated date", children: [
      "Updated ",
      /* @__PURE__ */ u3("span", { className: "gb-sort-indicator", children: sortDirection === "asc" ? "\u25B2" : "\u25BC" })
    ] });
    if (!groupByTicket) {
      return /* @__PURE__ */ u3("table", { className: "gb-table", children: [
        /* @__PURE__ */ u3("thead", { children: /* @__PURE__ */ u3("tr", { children: [
          /* @__PURE__ */ u3("th", { className: "gb-th", children: "Title" }),
          /* @__PURE__ */ u3("th", { className: "gb-th", children: "Project" }),
          /* @__PURE__ */ u3("th", { className: "gb-th", children: "Author" }),
          /* @__PURE__ */ u3("th", { className: "gb-th gb-td-small", children: "Reviewers" }),
          /* @__PURE__ */ u3("th", { className: "gb-th gb-td-small", children: "Approvers" }),
          /* @__PURE__ */ u3("th", { className: "gb-th gb-td-small", children: "Pipeline" }),
          /* @__PURE__ */ u3("th", { className: "gb-th gb-td-small", children: updatedHeader })
        ] }) }),
        /* @__PURE__ */ u3("tbody", { children: sortedMrs.map((mr) => {
          const ticket = extractJiraTicket(mr.title);
          const disabled = !ticket;
          const addTicket = () => {
            if (!ticket) return;
            const parts = filter.trim().split(/\s+/).filter(Boolean);
            if (parts.includes(ticket)) return;
            setFilter(filter.trim().length ? `${filter.trim()} ${ticket}` : ticket);
          };
          const approvers = approvalsUsersByMr[mr.id] || [];
          const reviewers = reviewersUsersByMr[mr.id] || [];
          return /* @__PURE__ */ u3("tr", { children: [
            /* @__PURE__ */ u3("td", { className: "gb-td", children: /* @__PURE__ */ u3("div", { className: "gb-mr-title-block", children: [
              /* @__PURE__ */ u3("div", { className: "gb-mr-title-line", children: [
                /* @__PURE__ */ u3("span", { className: "gb-mr-iid", children: [
                  "!",
                  mr.iid
                ] }),
                isDraftMr(mr) && /* @__PURE__ */ u3("span", { className: "gb-mr-draft", children: "Draft:" }),
                /* @__PURE__ */ u3("a", { href: mr.web_url, target: "_blank", className: "gb-mr-link", title: mr.title, children: isDraftMr(mr) ? mr.title.replace(/^\s*(?:draft:|wip:)\s*/i, "") : mr.title })
              ] }),
              /* @__PURE__ */ u3("div", { className: "gb-mr-meta-line", children: [
                /* @__PURE__ */ u3("button", { type: "button", onClick: addTicket, disabled, title: disabled ? "No JIRA-like ticket (ABC-123) found in title" : `Add ${ticket} to title filter`, className: "gb-magnify-btn", children: "\u{1F50D}" }),
                /* @__PURE__ */ u3("span", { className: "gb-mr-branches", children: [
                  mr.source_branch,
                  " \\u2192 ",
                  mr.target_branch
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ u3("td", { className: "gb-td", children: mr.projectPath.split("/").slice(-1)[0] }),
            /* @__PURE__ */ u3("td", { className: "gb-td", children: mr.author && /* @__PURE__ */ u3(UserAvatar, { user: mr.author }) }),
            /* @__PURE__ */ u3("td", { className: "gb-td gb-td-small gb-right", children: reviewersCell(reviewers, reviewersStatusByMr[mr.id]) }),
            /* @__PURE__ */ u3("td", { className: "gb-td gb-td-small gb-right", children: approversCell(approvers, approvalsStatusByMr[mr.id]) }),
            /* @__PURE__ */ u3("td", { className: "gb-td gb-td-small", children: pipelineCell(mr) }),
            /* @__PURE__ */ u3("td", { className: "gb-td gb-td-small", children: /* @__PURE__ */ u3(UpdatedDate, { iso: mr.updated_at }) })
          ] }, mr.id);
        }) })
      ] });
    }
    const groupMap = /* @__PURE__ */ new Map();
    for (const mr of sortedMrs) {
      const ticket = extractJiraTicket(mr.title);
      const key = ticket || "__NO_TICKET__";
      if (!groupMap.has(key)) groupMap.set(key, { key, ticket, items: [], latestTs: 0 });
      const g2 = groupMap.get(key);
      g2.items.push(mr);
      const ts = new Date(mr.updated_at).getTime();
      if (ts > g2.latestTs) g2.latestTs = ts;
    }
    const groups = Array.from(groupMap.values());
    groups.sort((a3, b) => sortDirection === "asc" ? a3.latestTs - b.latestTs : b.latestTs - a3.latestTs);
    groups.forEach((g2) => g2.items.sort((a3, b) => {
      const da = new Date(a3.updated_at).getTime();
      const db = new Date(b.updated_at).getTime();
      return sortDirection === "asc" ? da - db : db - da;
    }));
    return /* @__PURE__ */ u3("table", { className: "gb-table", children: [
      /* @__PURE__ */ u3("thead", { children: /* @__PURE__ */ u3("tr", { children: [
        /* @__PURE__ */ u3("th", { className: "gb-th", children: "Title" }),
        /* @__PURE__ */ u3("th", { className: "gb-th", children: "Project" }),
        /* @__PURE__ */ u3("th", { className: "gb-th", children: "Author" }),
        /* @__PURE__ */ u3("th", { className: "gb-th gb-td-small", children: "Reviewers" }),
        /* @__PURE__ */ u3("th", { className: "gb-th gb-td-small", children: "Approvers" }),
        /* @__PURE__ */ u3("th", { className: "gb-th gb-td-small", children: "Pipeline" }),
        /* @__PURE__ */ u3("th", { className: "gb-th gb-td-small", children: updatedHeader })
      ] }) }),
      /* @__PURE__ */ u3("tbody", { children: groups.map((group) => /* @__PURE__ */ u3(k, { children: [
        /* @__PURE__ */ u3("tr", { className: "gb-group-row", children: /* @__PURE__ */ u3("td", { className: "gb-group-cell", colSpan: 7, children: /* @__PURE__ */ u3("div", { className: "gb-group-header", children: [
          /* @__PURE__ */ u3("span", { className: "gb-group-title", children: group.ticket ? `${group.ticket} (${group.items.length})` : `No ticket (${group.items.length})` }),
          /* @__PURE__ */ u3("span", { className: "gb-group-latest", title: "Latest updated MR in this group", children: /* @__PURE__ */ u3(UpdatedDate, { iso: new Date(group.latestTs).toISOString() }) })
        ] }) }) }, `group-${group.key}`),
        group.items.map((mr) => {
          const ticket = extractJiraTicket(mr.title);
          const disabled = !ticket;
          const addTicket = () => {
            if (!ticket) return;
            const parts = filter.trim().split(/\s+/).filter(Boolean);
            if (parts.includes(ticket)) return;
            setFilter(filter.trim().length ? `${filter.trim()} ${ticket}` : ticket);
          };
          const approvers = approvalsUsersByMr[mr.id] || [];
          const reviewers = reviewersUsersByMr[mr.id] || [];
          return /* @__PURE__ */ u3("tr", { children: [
            /* @__PURE__ */ u3("td", { className: "gb-td", children: /* @__PURE__ */ u3("div", { className: "gb-mr-title-block", children: [
              /* @__PURE__ */ u3("div", { className: "gb-mr-title-line", children: [
                /* @__PURE__ */ u3("span", { className: "gb-mr-iid", children: [
                  "!",
                  mr.iid
                ] }),
                isDraftMr(mr) && /* @__PURE__ */ u3("span", { className: "gb-mr-draft", children: "Draft:" }),
                /* @__PURE__ */ u3("a", { href: mr.web_url, target: "_blank", className: "gb-mr-link", title: mr.title, children: isDraftMr(mr) ? mr.title.replace(/^\s*(?:draft:|wip:)\s*/i, "") : mr.title })
              ] }),
              /* @__PURE__ */ u3("div", { className: "gb-mr-meta-line", children: [
                /* @__PURE__ */ u3("button", { type: "button", onClick: addTicket, disabled, title: disabled ? "No JIRA-like ticket (ABC-123) found in title" : `Add ${ticket} to title filter`, className: "gb-magnify-btn", children: "\u{1F50D}" }),
                /* @__PURE__ */ u3("span", { className: "gb-mr-branches", children: [
                  mr.source_branch,
                  " \\u2192 ",
                  mr.target_branch
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ u3("td", { className: "gb-td", children: mr.projectPath.split("/").slice(-1)[0] }),
            /* @__PURE__ */ u3("td", { className: "gb-td", children: mr.author && /* @__PURE__ */ u3(UserAvatar, { user: mr.author }) }),
            /* @__PURE__ */ u3("td", { className: "gb-td gb-td-small gb-right", children: reviewersCell(reviewers, reviewersStatusByMr[mr.id]) }),
            /* @__PURE__ */ u3("td", { className: "gb-td gb-td-small gb-right", children: approversCell(approvers, approvalsStatusByMr[mr.id]) }),
            /* @__PURE__ */ u3("td", { className: "gb-td gb-td-small", children: pipelineCell(mr) }),
            /* @__PURE__ */ u3("td", { className: "gb-td gb-td-small", children: /* @__PURE__ */ u3(UpdatedDate, { iso: mr.updated_at }) })
          ] }, mr.id);
        })
      ] })) })
    ] });
  };

  // src/hooks/useProjectMergeRequests.ts
  var fetchOpenedMrsForProject = async (baseUrl, projectPath) => {
    const encoded = encodeURIComponent(projectPath);
    const url = `${baseUrl}/api/v4/projects/${encoded}/merge_requests?state=opened&per_page=100`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed ${projectPath}: ${res.status}`);
    }
    const data = await res.json();
    return data.map((mr) => ({ ...mr, projectPath }));
  };
  var fetchMrDetails = async (baseUrl, projectPath, iid) => {
    const encoded = encodeURIComponent(projectPath);
    const url = `${baseUrl}/api/v4/projects/${encoded}/merge_requests/${iid}`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed details ${projectPath}!${iid}: ${res.status}`);
    }
    const data = await res.json();
    return { head_pipeline: data.head_pipeline };
  };
  var useProjectMergeRequests = (baseUrl, projectGroups, groupName) => {
    const [mrs, setMrs] = d2([]);
    const [loading, setLoading] = d2(true);
    const [error, setError] = d2(null);
    y2(() => {
      if (!baseUrl) {
        setError("Missing baseUrl option");
        setLoading(false);
        return;
      }
      if (!projectGroups || !projectGroups.length) {
        setError("No projects configured");
        setMrs([]);
        setLoading(false);
        return;
      }
      let cancelled = false;
      setLoading(true);
      const group = projectGroups.find((g2) => g2.name === groupName) || projectGroups[0];
      const paths = group?.projects || [];
      Promise.all(paths.map((p3) => fetchOpenedMrsForProject(baseUrl, p3))).then(async (results) => {
        if (cancelled) return;
        const flat = results.flat();
        setError(null);
        const needDetails = flat.filter((mr) => typeof mr.head_pipeline === "undefined");
        const concurrency = 6;
        const detailResults = [];
        let i4 = 0;
        const runNext = async () => {
          if (i4 >= needDetails.length) return;
          const currentIndex = i4++;
          const mr = needDetails[currentIndex];
          try {
            const partial = await fetchMrDetails(baseUrl, mr.projectPath, mr.iid);
            detailResults.push({ idx: flat.indexOf(mr), pipeline: partial.head_pipeline });
          } catch {
          }
          await runNext();
        };
        await Promise.all(Array.from({ length: concurrency }, () => runNext()));
        for (const { idx, pipeline } of detailResults) {
          if (pipeline && flat[idx]) {
            flat[idx].head_pipeline = pipeline;
          }
        }
        if (!cancelled) {
          setMrs(flat);
        }
      }).catch((e3) => {
        if (!cancelled) {
          setError(e3.message);
        }
      }).finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });
      return () => {
        cancelled = true;
      };
    }, [baseUrl, projectGroups, groupName]);
    return { mrs, loading, error };
  };

  // src/hooks/useReviewMeta.ts
  var REVIEW_META_BATCH_SIZE = 5;
  var reviewMetaCache = {};
  var fetchReviewMeta = async (baseUrl, mr) => {
    const approvalsUrl = `${baseUrl}/api/v4/projects/${mr.project_id}/merge_requests/${mr.iid}/approvals`;
    let approvalsUsers = [];
    try {
      const res = await fetch(approvalsUrl);
      if (res.ok) {
        const data = await res.json();
        approvalsUsers = Array.isArray(data.approved_by) ? data.approved_by.map((a3) => a3.user).filter((u4) => !!u4?.username) : [];
      }
    } catch {
    }
    const notesUrl = `${baseUrl}/api/v4/projects/${mr.project_id}/merge_requests/${mr.iid}/notes?per_page=100`;
    let commentUsers = [];
    try {
      const res = await fetch(notesUrl);
      if (res.ok) {
        const notes = await res.json();
        commentUsers = notes.filter((n2) => !n2.system && n2.author?.username).map((n2) => n2.author);
      }
    } catch {
    }
    const authorUsername = mr.author?.username;
    const reviewerMap = {};
    for (const u4 of approvalsUsers.concat(commentUsers)) {
      if (!u4?.username || u4.username === authorUsername) continue;
      reviewerMap[u4.username] = u4;
    }
    const reviewersUsers = Object.values(reviewerMap);
    return { approvalsUsers, reviewersUsers };
  };
  var useReviewMeta = (baseUrl, mrs, refreshToken) => {
    const [approvalsUsersByMr, setApprovalsUsersByMr] = d2({});
    const [reviewersUsersByMr, setReviewersUsersByMr] = d2({});
    const [loading, setLoading] = d2(false);
    y2(() => {
      let cancelled = false;
      if (!baseUrl || !mrs.length) {
        setApprovalsUsersByMr({});
        setReviewersUsersByMr({});
        setLoading(false);
        return;
      }
      const toFetch = mrs.filter((mr) => !reviewMetaCache[mr.id] || reviewMetaCache[mr.id].updated_at !== mr.updated_at);
      const populateFromCache = () => {
        const approvals = {};
        const reviewers = {};
        mrs.forEach((mr) => {
          const c3 = reviewMetaCache[mr.id];
          approvals[mr.id] = c3.approvalsUsers;
          reviewers[mr.id] = c3.reviewersUsers;
        });
        setApprovalsUsersByMr(approvals);
        setReviewersUsersByMr(reviewers);
      };
      if (!toFetch.length) {
        populateFromCache();
        setLoading(false);
        return;
      }
      setLoading(true);
      const run = async () => {
        for (let i4 = 0; i4 < toFetch.length && !cancelled; i4 += REVIEW_META_BATCH_SIZE) {
          const slice = toFetch.slice(i4, i4 + REVIEW_META_BATCH_SIZE);
          try {
            const results = await Promise.all(slice.map((mr) => fetchReviewMeta(baseUrl, mr).then((meta) => ({ id: mr.id, updated_at: mr.updated_at, meta }))));
            if (cancelled) return;
            for (const r3 of results) {
              reviewMetaCache[r3.id] = { updated_at: r3.updated_at, approvalsUsers: r3.meta.approvalsUsers, reviewersUsers: r3.meta.reviewersUsers };
            }
            populateFromCache();
          } catch {
          }
        }
        if (!cancelled) setLoading(false);
      };
      run();
      return () => {
        cancelled = true;
      };
    }, [baseUrl, mrs, refreshToken]);
    return { approvalsUsersByMr, reviewersUsersByMr, loading };
  };

  // src/overviewStyles.ts
  var OVERVIEW_CSS = `
.gb-container { min-height:calc(100vh - 60px); padding:24px; color:var(--gl-text-color,#222); font-family:var(--gl-font-family,system-ui,sans-serif); max-width:1100px; }
.gb-container h1 { margin-top:0; }
.gb-filter-bar { margin-top:10px; padding:8px 12px; border:1px solid #ccc; border-radius:6px; display:flex; gap:18px; align-items:center; font-size:12px; flex-wrap:wrap; }
.gb-filter-item { display:flex; align-items:center; gap:6px; cursor:pointer; margin-bottom: 0; }
.gb-pipeline-select { padding:4px 6px; border:1px solid #bbb; border-radius:4px; background:#fff; font-size:12px; }
@media (prefers-color-scheme: dark) { .gb-pipeline-select { background:#333238; color:#fff; } }
body[data-theme='dark'] .gb-pipeline-select, body.theme-dark .gb-pipeline-select { background:#333238; color:#fff; }
.gb-filter-row { margin-top:12px; display:flex; gap:12px; align-items:center; flex-wrap:wrap; }
.gb-input { flex:1; min-width:260px; padding:6px 10px; border:1px solid #bbb; border-radius:6px; font-size:13px; }
.gb-small-text { font-size:12px; opacity:.7; }
.gb-btn { padding:6px 10px; border:1px solid #bbb; border-radius:6px; cursor:pointer; font-size:12px; line-height:1; }
.gb-btn[disabled] { cursor:not-allowed; opacity:.5; }
.gb-ephemeral-wrapper { margin-top:10px; display:flex; gap:8px; align-items:center; flex-wrap:wrap; font-size:12px; }
.gb-filter-bar .gb-ephemeral-wrapper { margin-top:0; }
.gb-ephemeral-inner { display:flex; flex-direction:column; gap:4px; min-width:240px; }
.gb-ephemeral-row { display:flex; gap:6px; align-items:center; }
.gb-ephemeral-input { flex:1; padding:6px 8px; border:1px solid #bbb; border-radius:6px; font-size:12px; }
.gb-helper { opacity:.6; font-size:11px; }
.gb-table { border-collapse:collapse; min-width:760px; width:100%; font-size:13px; line-height:18px; }
.gb-th { text-align:left; padding:6px 8px; border-bottom:2px solid #444; }
.gb-td { vertical-align:top; padding:4px 8px; border-top:1px solid #ddd; }
.gb-td-small { width:1%; white-space:nowrap; font-size:11px; }
.gb-title-cell { display:flex; align-items:flex-start; gap:6px; }
.gb-sub { opacity:.6; font-size:11px; }
.gb-avatar-stack { display:inline-flex; align-items:center; }
.gb-magnify-btn { border:1px solid #bbb; color:#222; padding:0; width:24px; height:22px; border-radius:4px; font-size:14px; cursor:pointer; line-height:1; display:inline-flex; align-items:center; justify-content:center; }
.gb-magnify-btn:hover:not([disabled]) { background:#e6ebf1; }
@media (prefers-color-scheme: dark){ .gb-magnify-btn { background:#333238; color:#fff; } .gb-magnify-btn:hover:not([disabled]) { background:#444b53; } }
.gb-avatar-wrapper { display:inline-flex; align-items:center; justify-content:center; }
.gb-avatar { width:22px; height:22px; border-radius:50%; object-fit:cover; border:1px solid #ccc; background:#eee; display:inline-block; }
.gb-avatar-fallback { width:22px; height:22px; border-radius:50%; border:1px solid #ccc; background:#eee; display:inline-block; font-size:10px; line-height:22px; text-align:center; color:#555; }
.gb-avatar.overlap, .gb-avatar-fallback.overlap { margin-left:-6px; }
.gb-link { text-decoration:none; color:#1f78d1; font-weight:600; font-size:14px; line-height:20px; }
.gb-link:hover { text-decoration:underline; }
.gb-select { position:relative; display:inline-block; }
.gb-select-trigger { padding:6px 10px; border:1px solid #bbb; border-radius:6px; background:#333238; font-size:12px; cursor:pointer; display:flex; align-items:center; gap:6px; color:#fff; }
.gb-select-trigger.disabled { cursor:not-allowed; opacity:.5; }
.gb-select-menu { position:absolute; top:100%; left:0; background:#333238; border:1px solid #bbb; border-radius:6px; box-shadow:0 2px 6px rgba(0,0,0,.15); width:220px; padding:4px 0; z-index:999; max-height:260px; overflow:auto; }
.gb-select-item { display:flex; align-items:center; gap:6px; padding:6px 10px; font-size:12px; cursor:pointer; }
.gb-select-item:hover { background-color: buttonface; }
.gb-select-item.active { background-color: buttonface; }
.gb-select-empty { padding:6px 10px; font-size:11px; opacity:.6; }
.gb-select-placeholder { font-size:11px; opacity:.7; }
.gb-select-value { font-size:11px; }
.gb-label { font-size:12px; font-weight:600; }
.gb-filter-group { display:flex; flex-wrap:wrap; gap:18px; margin-top:10px; }
.gb-project-filter-wrapper { display:flex; flex-direction:column; gap:4px; }
.gb-project-filter-label, .gb-author-filter-label { font-weight:600; font-size:12px; }
.gb-project-filter { display:flex; flex-direction:column; gap:4px; }
.gb-mt6 { margin-top:6px; }
.gb-mr-title-block { display:flex; flex-direction:column; gap:2px; }
.gb-mr-title-line { display:flex; align-items:center; gap:6px; flex-wrap:wrap; }
.gb-mr-link { text-decoration:none; color:#1f78d1; font-weight:600; font-size:15px; line-height:22px; }
.gb-mr-link:hover { text-decoration:underline; color:#1f78d1; }
.gb-mr-draft { background:none; padding:0; border-radius:0; color:#c17d10; font-weight:600; font-size:12px; }
.gb-mr-meta-line { display:flex; align-items:center; gap:8px; font-size:11px; color:#6b6b6b; }
.gb-mr-branches { font-family:monospace; font-size:11px; }
.gb-mr-iid { font-size:12px; font-weight:500; color:#6b6b6b; }
.gb-header-row { display:flex; align-items:center; justify-content:space-between; gap:16px; flex-wrap:wrap; }
.gb-group-select-label { display:flex; align-items:center; gap:6px; font-size:12px; }
.gb-group-select-text { font-weight:600; font-size:12px; }
.gb-group-select { padding:6px 10px; border:1px solid #bbb; border-radius:6px; background:#333238; color:#fff; font-size:12px; }
.gb-group-row .gb-group-cell { background:#e6ebf1; font-weight:600; font-size:12px; padding:6px 8px; border-top:2px solid #444; color:#222; letter-spacing:.25px; }
.gb-group-row:first-child .gb-group-cell { border-top:2px solid #444; }
/* Dark theme support */
@media (prefers-color-scheme: dark) {
  .gb-group-row .gb-group-cell { background:#2d3640; color:#f1f3f5; border-top:2px solid #555; }
}
body[data-theme='dark'] .gb-group-row .gb-group-cell,
body.theme-dark .gb-group-row .gb-group-cell { background:#2d3640; color:#f1f3f5; border-top:2px solid #555; }
/* Extra separation between successive groups */
.gb-group-row + .gb-group-row .gb-group-cell { border-top:3px solid #444; }
.gb-sortable { background:none; border:none; padding:0; cursor:pointer; font:inherit; color:inherit; display:inline-flex; align-items:center; gap:4px; font-weight:600; }
.gb-sortable .gb-sort-indicator { font-size:10px; opacity:.8; }
.gb-sortable:hover .gb-sort-indicator { opacity:1; }
.gb-group-header { display:flex; justify-content:space-between; align-items:center; gap:12px; }
.gb-group-title { font-weight:600; }
.gb-group-latest { font-size:11px; opacity:.75; font-family:monospace; }
@media (prefers-color-scheme: dark) { .gb-group-latest { opacity:.85; } }
body[data-theme='dark'] .gb-group-latest, body.theme-dark .gb-group-latest { opacity:.85; }
.gb-date { font-size:11px; font-family:monospace; white-space:nowrap; cursor:help; }
.gb-date:hover { text-decoration:underline; }
@media (prefers-color-scheme: dark) { .gb-date { color:#d1d5da; } }
body[data-theme='dark'] .gb-date, body.theme-dark .gb-date { color:#d1d5da; }
.gb-pipeline-status { font-size:11px; display:inline-flex; min-width:20px; height:18px; align-items:center; justify-content:center; font-weight:600; border:1px solid #bbb; border-radius:4px; line-height:1; background:#f5f5f5; padding:0 4px; }
.gb-pipeline-status.success { background:#2da160; color:#fff; border-color:#2da160; }
.gb-pipeline-status.failed { background:#ec5941; color:#fff; border-color:#ec5941; }
.gb-pipeline-status.other { background:#c17d10; color:#fff; border-color:#c17d10; }
@media (prefers-color-scheme: dark){ .gb-pipeline-status { background:#333238; } }
body[data-theme='dark'] .gb-pipeline-status, body.theme-dark .gb-pipeline-status { background:#333238; }
.gb-avatar-filter-value { position:relative; display:inline-block; }
.gb-avatar-invert-marker { position:absolute; top:-3px; right:-3px; background:#fff; color:#ec5941; font-size:10px; line-height:1; padding:1px 3px; border:1px solid #ec5941; border-radius:8px; box-shadow:0 0 2px rgba(0,0,0,.25); }
@media (prefers-color-scheme: dark){ .gb-avatar-invert-marker { background:#333238; } }
body[data-theme='dark'] .gb-avatar-invert-marker, body.theme-dark .gb-avatar-invert-marker { background:#333238; }
.gb-req-status { font-size:10px; font-family:monospace; padding:2px 4px; border:1px solid #bbb; border-radius:4px; display:inline-block; background:#f5f5f5; }
.gb-req-status { white-space:nowrap; }
.gb-req-status.ready { background:#2da160; border-color:#2da160; color:#fff; }
.gb-req-status.not-ready { background:#ec5941; border-color:#ec5941; color:#fff; }
@media (prefers-color-scheme: dark){ .gb-req-status.ready { background:#2da160; } .gb-req-status.not-ready { background:#ec5941; } }
.gb-inline-cell { display:inline-flex; align-items:center; gap:4px; }
.gb-inline-cell.right { justify-content:flex-end; }
.gb-right { text-align:right; }
.gb-team-miss-container { display:flex; flex-wrap:wrap; gap:4px; }
.gb-team-miss { background:#ec5941; color:#fff; font-size:10px; padding:2px 4px; border-radius:4px; line-height:1.2; font-family:monospace; }
.gb-team-miss-block { display:flex; flex-wrap:wrap; gap:4px; margin-top:4px; }
@media (prefers-color-scheme: dark){ .gb-team-miss { background:#ec5941; } }
body[data-theme='dark'] .gb-team-miss, body.theme-dark .gb-team-miss { background:#ec5941; }
.gb-miss-agg { background:#ec5941; color:#fff; font-size:10px; padding:2px 5px; border-radius:10px; font-family:monospace; font-weight:600; display:inline-flex; align-items:center; line-height:1; opacity:.35; transition:opacity .15s ease-in-out; }
tr:hover .gb-miss-agg { opacity:1; }
`;

  // src/hooks/usePageTitle.ts
  var usePageTitle = (title) => {
    y2(() => {
      const previous = document.title;
      document.title = title;
      return () => {
        document.title = previous;
      };
    }, [title]);
  };

  // src/components/NonPersistentTeamReqFilter.tsx
  var NonPersistentTeamReqFilter = ({ teams, selectedApprovalTeam, setSelectedApprovalTeam, approvalTeamMode, setApprovalTeamMode, selectedReviewerTeam, setSelectedReviewerTeam, reviewerTeamMode, setReviewerTeamMode, approvalsMissingMode, setApprovalsMissingMode, reviewersMissingMode, setReviewersMissingMode, disabled }) => {
    const [openA, setOpenA] = d2(false);
    const [openR, setOpenR] = d2(false);
    const chooseA = (team) => {
      setSelectedApprovalTeam(team);
      setOpenA(false);
    };
    const chooseR = (team) => {
      setSelectedReviewerTeam(team);
      setOpenR(false);
    };
    return /* @__PURE__ */ u3("div", { style: { display: "flex", gap: "18px", flexWrap: "wrap" }, children: [
      /* @__PURE__ */ u3("div", { className: "gb-ephemeral-inner", children: [
        /* @__PURE__ */ u3("div", { className: "gb-ephemeral-row", children: [
          /* @__PURE__ */ u3("span", { className: "gb-label", title: "Filter by presence of ANY missing team approvals", children: "Approvals missing" }),
          /* @__PURE__ */ u3("select", { disabled, value: approvalsMissingMode, onChange: (e3) => setApprovalsMissingMode(e3.target.value), className: "gb-pipeline-select", children: [
            /* @__PURE__ */ u3("option", { value: "all", children: "All" }),
            /* @__PURE__ */ u3("option", { value: "missing", children: "Has missing" }),
            /* @__PURE__ */ u3("option", { value: "none_missing", children: "None missing" })
          ] })
        ] }),
        /* @__PURE__ */ u3("div", { className: "gb-ephemeral-row", title: "Filter counts for a specific team approvals requirement", children: [
          /* @__PURE__ */ u3("span", { className: "gb-label", children: "Team approvals" }),
          /* @__PURE__ */ u3("select", { disabled, value: approvalTeamMode, onChange: (e3) => setApprovalTeamMode(e3.target.value), className: "gb-pipeline-select", children: [
            /* @__PURE__ */ u3("option", { value: "all", children: "All" }),
            /* @__PURE__ */ u3("option", { value: "missing", children: "Missing" }),
            /* @__PURE__ */ u3("option", { value: "ready", children: "Ready" })
          ] }),
          /* @__PURE__ */ u3("div", { className: "gb-select", children: [
            /* @__PURE__ */ u3("div", { className: `gb-select-trigger ${disabled ? "disabled" : ""}`, onClick: () => !disabled && setOpenA((o3) => !o3), children: selectedApprovalTeam || "Select team" }),
            openA && /* @__PURE__ */ u3("div", { className: "gb-select-menu", children: [
              /* @__PURE__ */ u3("div", { className: "gb-select-item", onClick: () => chooseA(null), children: "(All teams)" }),
              teams.map((t3) => /* @__PURE__ */ u3("div", { className: `gb-select-item ${selectedApprovalTeam === t3 ? "active" : ""}`, onClick: () => chooseA(t3), children: t3 }, t3))
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ u3("div", { className: "gb-ephemeral-inner", children: [
        /* @__PURE__ */ u3("div", { className: "gb-ephemeral-row", children: [
          /* @__PURE__ */ u3("span", { className: "gb-label", title: "Filter by presence of ANY missing team reviewers", children: "Reviewers missing" }),
          /* @__PURE__ */ u3("select", { disabled, value: reviewersMissingMode, onChange: (e3) => setReviewersMissingMode(e3.target.value), className: "gb-pipeline-select", children: [
            /* @__PURE__ */ u3("option", { value: "all", children: "All" }),
            /* @__PURE__ */ u3("option", { value: "missing", children: "Has missing" }),
            /* @__PURE__ */ u3("option", { value: "none_missing", children: "None missing" })
          ] })
        ] }),
        /* @__PURE__ */ u3("div", { className: "gb-ephemeral-row", title: "Filter counts for a specific team reviewer requirement", children: [
          /* @__PURE__ */ u3("span", { className: "gb-label", children: "Team reviewers" }),
          /* @__PURE__ */ u3("select", { disabled, value: reviewerTeamMode, onChange: (e3) => setReviewerTeamMode(e3.target.value), className: "gb-pipeline-select", children: [
            /* @__PURE__ */ u3("option", { value: "all", children: "All" }),
            /* @__PURE__ */ u3("option", { value: "missing", children: "Missing" }),
            /* @__PURE__ */ u3("option", { value: "ready", children: "Ready" })
          ] }),
          /* @__PURE__ */ u3("div", { className: "gb-select", children: [
            /* @__PURE__ */ u3("div", { className: `gb-select-trigger ${disabled ? "disabled" : ""}`, onClick: () => !disabled && setOpenR((o3) => !o3), children: selectedReviewerTeam || "Select team" }),
            openR && /* @__PURE__ */ u3("div", { className: "gb-select-menu", children: [
              /* @__PURE__ */ u3("div", { className: "gb-select-item", onClick: () => chooseR(null), children: "(All teams)" }),
              teams.map((t3) => /* @__PURE__ */ u3("div", { className: `gb-select-item ${selectedReviewerTeam === t3 ? "active" : ""}`, onClick: () => chooseR(t3), children: t3 }, t3))
            ] })
          ] })
        ] })
      ] })
    ] });
  };

  // src/overviewComponent.tsx
  var LS_FILTER_KEY = "gb_persistent_filters";
  var LS_PROJECT_GROUP_KEY = "gb_project_group";
  var loadFilters = () => {
    try {
      const raw = localStorage.getItem(LS_FILTER_KEY);
      if (!raw) return { hideDrafts: false, onlyHotfixes: false, groupByTicket: false, pipelineStatus: "all", approvalReadyFilter: "all", reviewerReadyFilter: "all" };
      const parsed = JSON.parse(raw);
      const approvalReadyFilter = (() => {
        if (parsed.approvalReadyFilter === "ready" || parsed.approvalReadyFilter === "not_ready") return parsed.approvalReadyFilter;
        if (parsed.approvalReadyFilter === "all") return "all";
        if (typeof parsed.onlyApprovalReady === "boolean") return parsed.onlyApprovalReady ? "ready" : "all";
        return "all";
      })();
      const reviewerReadyFilter = (() => {
        if (parsed.reviewerReadyFilter === "ready" || parsed.reviewerReadyFilter === "not_ready") return parsed.reviewerReadyFilter;
        if (parsed.reviewerReadyFilter === "all") return "all";
        if (typeof parsed.onlyReviewerReady === "boolean") return parsed.onlyReviewerReady ? "ready" : "all";
        return "all";
      })();
      return {
        hideDrafts: !!parsed.hideDrafts,
        onlyHotfixes: !!parsed.onlyHotfixes,
        groupByTicket: !!parsed.groupByTicket,
        pipelineStatus: parsed.pipelineStatus === "success" || parsed.pipelineStatus === "failed" ? parsed.pipelineStatus : "all",
        approvalReadyFilter,
        reviewerReadyFilter
      };
    } catch {
      return { hideDrafts: false, onlyHotfixes: false, groupByTicket: false, pipelineStatus: "all", approvalReadyFilter: "all", reviewerReadyFilter: "all" };
    }
  };
  var saveFilters = (f4) => {
    try {
      localStorage.setItem(LS_FILTER_KEY, JSON.stringify(f4));
    } catch {
    }
  };
  var OverviewRoot = ({ options: options2, initialVisible }) => {
    if (!options2.projects || !options2.projects.length) {
      return null;
    }
    const [visible, setVisible] = d2(initialVisible);
    window.gitBusterSetVisible = (v3) => setVisible(!!v3);
    const groups = options2.projects;
    const initialGroup = (() => {
      try {
        const v3 = localStorage.getItem(LS_PROJECT_GROUP_KEY);
        return groups.find((g2) => g2.name === v3)?.name || groups[0].name;
      } catch {
        return groups[0].name;
      }
    })();
    const [projectGroup, setProjectGroup] = d2(initialGroup);
    const [selectedProject, setSelectedProject] = d2(null);
    y2(() => {
      try {
        localStorage.setItem(LS_PROJECT_GROUP_KEY, projectGroup);
      } catch {
      }
    }, [projectGroup]);
    y2(() => {
      setSelectedProject(null);
    }, [projectGroup]);
    const { mrs, loading, error } = useProjectMergeRequests(options2.baseUrl, groups, projectGroup);
    const [filter, setFilter] = d2("");
    const [hideDrafts, setHideDrafts] = d2(() => loadFilters().hideDrafts);
    const [onlyHotfixes, setOnlyHotfixes] = d2(() => loadFilters().onlyHotfixes);
    const [groupByTicket, setGroupByTicket] = d2(() => loadFilters().groupByTicket);
    const [pipelineStatus, setPipelineStatus] = d2(() => loadFilters().pipelineStatus);
    const [selectedAuthor, setSelectedAuthor] = d2(null);
    const [selectedReviewer, setSelectedReviewer] = d2(null);
    const [invertReviewer, setInvertReviewer] = d2(false);
    const [selectedApprover, setSelectedApprover] = d2(null);
    const [invertApprover, setInvertApprover] = d2(false);
    const [reviewMetaRefreshToken, setReviewMetaRefreshToken] = d2(0);
    const [sortDirection, setSortDirection] = d2("desc");
    const [invertAuthor, setInvertAuthor] = d2(false);
    const [approvalReadyFilter, setApprovalReadyFilter] = d2(() => loadFilters().approvalReadyFilter);
    const [reviewerReadyFilter, setReviewerReadyFilter] = d2(() => loadFilters().reviewerReadyFilter);
    const [selectedApprovalTeam, setSelectedApprovalTeam] = d2(null);
    const [approvalTeamMode, setApprovalTeamMode] = d2("all");
    const [selectedReviewerTeam, setSelectedReviewerTeam] = d2(null);
    const [reviewerTeamMode, setReviewerTeamMode] = d2("all");
    const [approvalsMissingMode, setApprovalsMissingMode] = d2("all");
    const [reviewersMissingMode, setReviewersMissingMode] = d2("all");
    y2(() => {
      saveFilters({ hideDrafts, onlyHotfixes, groupByTicket, pipelineStatus, approvalReadyFilter, reviewerReadyFilter });
    }, [hideDrafts, onlyHotfixes, groupByTicket, pipelineStatus, approvalReadyFilter, reviewerReadyFilter]);
    usePageTitle(visible ? "Git Buster Overview" : document.title);
    y2(() => {
      const main = document.querySelector("#content-body") || document.querySelector("main") || document.querySelector(".content-wrapper");
      if (main) {
        main.style.display = visible ? "none" : "";
      }
    }, [visible]);
    y2(() => {
      const anchor = "git-buster";
      const currentHash = window.location.hash.replace("#", "");
      if (visible && currentHash !== anchor) {
        history.replaceState(null, "", `${location.pathname}${location.search}#${anchor}`);
      } else if (!visible && currentHash === anchor) {
        history.replaceState(null, "", `${location.pathname}${location.search}`);
      }
      if (window.gitBusterOnVisibleChange) {
        window.gitBusterOnVisibleChange(visible);
      }
    }, [visible]);
    y2(() => {
      const handler = () => {
        const shouldBeVisible = window.location.hash.replace("#", "") === "git-buster";
        setVisible((v3) => v3 === shouldBeVisible ? v3 : shouldBeVisible);
      };
      window.addEventListener("hashchange", handler);
      return () => window.removeEventListener("hashchange", handler);
    }, []);
    const authors = Array.from(new Map(mrs.map((mr) => [mr.author?.username || "", mr.author])).values()).filter((a3) => !!a3?.username);
    const projectNames = Array.from(new Set(mrs.map((mr) => mr.projectPath.split("/").slice(-1)[0]))).sort((a3, b) => a3.localeCompare(b));
    const titleFiltered = filter.trim() ? mrs.filter((mr) => mr.title.toLowerCase().includes(filter.toLowerCase())) : mrs;
    const draftFiltered = hideDrafts ? titleFiltered.filter((mr) => !isDraftMr(mr)) : titleFiltered;
    const hotfixFiltered = onlyHotfixes ? draftFiltered.filter(isHotfixMr) : draftFiltered;
    const pipelineFiltered = pipelineStatus === "all" ? hotfixFiltered : hotfixFiltered.filter((mr) => mr.head_pipeline && mr.head_pipeline.status === pipelineStatus);
    const projectFiltered = selectedProject ? pipelineFiltered.filter((mr) => mr.projectPath.split("/").slice(-1)[0] === selectedProject) : pipelineFiltered;
    const { approvalsUsersByMr, reviewersUsersByMr, loading: reviewMetaLoading } = useReviewMeta(options2.baseUrl, projectFiltered, reviewMetaRefreshToken);
    const reviewerFiltered = selectedReviewer ? projectFiltered.filter((mr) => {
      const reviewers = reviewersUsersByMr[mr.id] || [];
      const has = reviewers.some((u4) => u4.username === selectedReviewer);
      return invertReviewer ? !has : has;
    }) : projectFiltered;
    const approverFiltered = selectedApprover ? reviewerFiltered.filter((mr) => {
      const approvers = approvalsUsersByMr[mr.id] || [];
      const has = approvers.some((u4) => u4.username === selectedApprover);
      return invertApprover ? !has : has;
    }) : reviewerFiltered;
    const teamReqs = (options2.teamRequirements || []).map((t3) => ({ ...t3, members: t3.members.map((m3) => m3.trim().toLowerCase()).filter(Boolean) }));
    const approvalsStatusByMr = {};
    const reviewersStatusByMr = {};
    for (const mr of projectFiltered) {
      const approvalsUsers = approvalsUsersByMr[mr.id] || [];
      const reviewersUsers = reviewersUsersByMr[mr.id] || [];
      const approvalsUsernames = approvalsUsers.map((u4) => u4.username.toLowerCase());
      const reviewersUsernames = reviewersUsers.map((u4) => u4.username.toLowerCase());
      let approvalsReadyAll = true;
      let reviewersReadyAll = true;
      const approvalsParts = [];
      const reviewersParts = [];
      const approvalsCounts = [];
      const reviewersCounts = [];
      for (const team of teamReqs) {
        const aCount = team.members.reduce((acc, m3) => acc + (approvalsUsernames.includes(m3) ? 1 : 0), 0);
        const aReq = team.approvalsRequired;
        approvalsCounts.push({ team: team.name, have: aCount, need: aReq });
        approvalsParts.push(`${team.name}: ${aCount}/${aReq}`);
        if (aCount < aReq) approvalsReadyAll = false;
        const rReq = team.reviewersRequired ?? 0;
        if (rReq > 0) {
          const rCount = team.members.reduce((acc, m3) => acc + (reviewersUsernames.includes(m3) ? 1 : 0), 0);
          reviewersCounts.push({ team: team.name, have: rCount, need: rReq });
          reviewersParts.push(`${team.name}: ${rCount}/${rReq}`);
          if (rCount < rReq) reviewersReadyAll = false;
        }
      }
      approvalsStatusByMr[mr.id] = { ready: approvalsReadyAll, details: approvalsParts.join(" | ") || "No team requirements", teamCounts: approvalsCounts };
      reviewersStatusByMr[mr.id] = { ready: reviewersReadyAll, details: reviewersParts.join(" | ") || "No reviewer requirements", teamCounts: reviewersCounts };
    }
    const applyReadyFilter = (list, statusMap, mode) => {
      if (mode === "ready") return list.filter((mr) => statusMap[mr.id]?.ready);
      if (mode === "not_ready") return list.filter((mr) => statusMap[mr.id] && !statusMap[mr.id].ready);
      return list;
    };
    const applyTeamReqFilters = (list) => {
      let out = list;
      if (approvalsMissingMode !== "all") {
        out = out.filter((mr) => {
          const counts = approvalsStatusByMr[mr.id]?.teamCounts || [];
          const hasMissing = counts.some((c3) => c3.have < c3.need);
          return approvalsMissingMode === "missing" ? hasMissing : !hasMissing;
        });
      }
      if (reviewersMissingMode !== "all") {
        out = out.filter((mr) => {
          const counts = reviewersStatusByMr[mr.id]?.teamCounts || [];
          const hasMissing = counts.some((c3) => c3.have < c3.need);
          return reviewersMissingMode === "missing" ? hasMissing : !hasMissing;
        });
      }
      if (selectedApprovalTeam) {
        out = out.filter((mr) => {
          const counts = approvalsStatusByMr[mr.id]?.teamCounts || [];
          const entry = counts.find((c3) => c3.team === selectedApprovalTeam);
          if (!entry) return false;
          const missing = entry.have < entry.need;
          if (approvalTeamMode === "missing") return missing;
          if (approvalTeamMode === "ready") return !missing;
          return true;
        });
      }
      if (selectedReviewerTeam) {
        out = out.filter((mr) => {
          const counts = reviewersStatusByMr[mr.id]?.teamCounts || [];
          const entry = counts.find((c3) => c3.team === selectedReviewerTeam);
          if (!entry) return false;
          const missing = entry.have < entry.need;
          if (reviewerTeamMode === "missing") return missing;
          if (reviewerTeamMode === "ready") return !missing;
          return true;
        });
      }
      return out;
    };
    const teamFiltered = applyTeamReqFilters(approverFiltered);
    const approvalFiltered = applyReadyFilter(teamFiltered, approvalsStatusByMr, approvalReadyFilter);
    const reviewerReadyFiltered = applyReadyFilter(approvalFiltered, reviewersStatusByMr, reviewerReadyFilter);
    const authorFiltered = selectedAuthor ? selectedAuthor === NOT_ME && options2.username ? reviewerReadyFiltered.filter((mr) => invertAuthor ? mr.author?.username === options2.username : mr.author?.username !== options2.username) : reviewerReadyFiltered.filter((mr) => invertAuthor ? mr.author?.username !== selectedAuthor && mr.author?.name !== selectedAuthor : mr.author?.username === selectedAuthor || mr.author?.name === selectedAuthor) : reviewerReadyFiltered;
    const totalHotfixes = mrs.filter(isHotfixMr).length;
    const displayedHotfixes = authorFiltered.filter(isHotfixMr).length;
    const handleRefreshReviewMeta = () => setReviewMetaRefreshToken((t3) => t3 + 1);
    if (!visible) {
      return null;
    }
    const reviewerUsers = Array.from(new Map(projectFiltered.flatMap((mr) => (reviewersUsersByMr[mr.id] || []).map((u4) => [u4.username, u4]))).values()).filter((u4) => !!u4?.username);
    const approverUsers = Array.from(new Map(projectFiltered.flatMap((mr) => (approvalsUsersByMr[mr.id] || []).map((u4) => [u4.username, u4]))).values()).filter((u4) => !!u4?.username);
    return /* @__PURE__ */ u3("div", { className: "gb-container", children: [
      /* @__PURE__ */ u3("div", { className: "gb-header-row", children: [
        /* @__PURE__ */ u3("h1", { children: "Git Buster Overview" }),
        /* @__PURE__ */ u3("label", { className: "gb-group-select-label", children: /* @__PURE__ */ u3("select", { className: "gb-group-select", value: projectGroup, onChange: (e3) => setProjectGroup(e3.target.value), children: groups.map((g2) => /* @__PURE__ */ u3("option", { value: g2.name, children: g2.name }, g2.name)) }) })
      ] }),
      /* @__PURE__ */ u3(PersistentFilterBar, { hideDrafts, setHideDrafts, onlyHotfixes, setOnlyHotfixes, groupByTicket, setGroupByTicket, pipelineStatus, setPipelineStatus, approvalReadyFilter, setApprovalReadyFilter, reviewerReadyFilter, setReviewerReadyFilter }),
      /* @__PURE__ */ u3(NonPersistantFilter, { projects: projectNames, selectedProject, setSelectedProject, authors, selectedAuthor, setSelectedAuthor, reviewerUsers, selectedReviewer, setSelectedReviewer, invertReviewer, setInvertReviewer, approverUsers, selectedApprover, setSelectedApprover, invertApprover, setInvertApprover, username: options2.username, disabled: false, reviewMetaLoading, invertAuthor, setInvertAuthor }),
      !!teamReqs.length && /* @__PURE__ */ u3("div", { className: "gb-filter-bar", style: { marginTop: "8px" }, children: /* @__PURE__ */ u3(NonPersistentTeamReqFilter, { teams: teamReqs.map((t3) => t3.name), selectedApprovalTeam, setSelectedApprovalTeam, approvalTeamMode, setApprovalTeamMode, selectedReviewerTeam, setSelectedReviewerTeam, reviewerTeamMode, setReviewerTeamMode, approvalsMissingMode, setApprovalsMissingMode, reviewersMissingMode, setReviewersMissingMode, disabled: reviewMetaLoading }) }),
      /* @__PURE__ */ u3("div", { className: "gb-filter-row", children: [
        /* @__PURE__ */ u3("input", { value: filter, onInput: (e3) => setFilter(e3.target.value), placeholder: "Filter MRs by title...", className: "gb-input" }),
        /* @__PURE__ */ u3("div", { className: "gb-small-text", children: [
          authorFiltered.length,
          "/",
          mrs.length,
          " displayed \xB7 Hotfixes: ",
          displayedHotfixes,
          "/",
          totalHotfixes
        ] }),
        /* @__PURE__ */ u3("button", { type: "button", onClick: handleRefreshReviewMeta, disabled: reviewMetaLoading || !authorFiltered.length, className: "gb-btn", title: "Force refetch approvals & reviewers for visible MRs", children: "Refresh review meta" })
      ] }),
      /* @__PURE__ */ u3("div", { className: "gb-section", children: [
        loading && /* @__PURE__ */ u3("div", { className: "gb-sub", children: "Loading merge requests\u2026" }),
        error && !loading && /* @__PURE__ */ u3("div", { className: "gb-error", children: [
          "Failed to load: ",
          error
        ] }),
        !loading && !error && !authorFiltered.length && /* @__PURE__ */ u3("div", { className: "gb-sub", children: "No opened merge requests found." }),
        !!authorFiltered.length && /* @__PURE__ */ u3(MergeRequestsTable, { mrs: authorFiltered, filter, setFilter, approvalsUsersByMr, reviewersUsersByMr, approvalsStatusByMr, reviewersStatusByMr, groupByTicket, sortDirection, setSortDirection }),
        reviewMetaLoading && !!authorFiltered.length && /* @__PURE__ */ u3("div", { className: "gb-helper", children: "Loading approvals & reviewers\u2026" })
      ] })
    ] });
  };
  var mountOverview = (container, options2, initialVisible) => {
    if (!document.getElementById("gb-overview-styles")) {
      const style = document.createElement("style");
      style.id = "gb-overview-styles";
      style.textContent = OVERVIEW_CSS;
      document.head.appendChild(style);
    }
    G(/* @__PURE__ */ u3(OverviewRoot, { options: options2, initialVisible }), container);
  };

  // src/index.ts
  var options;
  var configError = null;
  var EXTENSION_NAME = "git-buster";
  var EXT_PAGE_ID = "git-buster-page";
  var EXT_SIDEBAR_BTN_ID = "git-buster-sidebar-btn";
  var URL_ANCHOR = "git-buster";
  var syntheticPageVisible = false;
  var sidebarObserverStarted = false;
  var loadOptions = async () => {
    const options2 = await chrome.storage.sync.get([EXTENSION_NAME]);
    const scoppedOptions = options2[EXTENSION_NAME] ?? {};
    const parseProjects = (val) => {
      if (val == null) {
        return { error: "Missing projects configuration in extension options." };
      }
      let raw = val;
      if (typeof raw === "string") {
        try {
          raw = JSON.parse(raw);
        } catch {
          return { error: "projects option is not valid JSON." };
        }
      }
      if (!Array.isArray(raw)) {
        return { error: "projects should be an array." };
      }
      const isValid = raw.every((g2) => g2 && typeof g2 === "object" && typeof g2.name === "string" && g2.name.trim().length && Array.isArray(g2.projects) && g2.projects.every((p3) => typeof p3 === "string" && p3.trim().length));
      if (!isValid) {
        return { error: "projects array items must be { name: string; projects: string[] } with non-empty strings." };
      }
      return { parsed: raw };
    };
    const parseTeamRequirements = (val) => {
      if (val == null) {
        return { parsed: [] };
      }
      let raw = val;
      if (typeof raw === "string") {
        try {
          raw = JSON.parse(raw);
        } catch {
          return { error: "teamRequirements option is not valid JSON." };
        }
      }
      if (!Array.isArray(raw)) {
        return { error: "teamRequirements should be an array." };
      }
      const isValid = raw.every((t3) => t3 && typeof t3 === "object" && typeof t3.name === "string" && Array.isArray(t3.members) && t3.members.every((m3) => typeof m3 === "string") && typeof t3.approvalsRequired === "number" && t3.approvalsRequired >= 0 && (t3.reviewersRequired == null || typeof t3.reviewersRequired === "number" && t3.reviewersRequired >= 0));
      if (!isValid) {
        return { error: "teamRequirements items must be { name: string; members: string[]; approvalsRequired: number; reviewersRequired?: number }." };
      }
      return { parsed: raw };
    };
    const { parsed, error } = parseProjects(scoppedOptions.projects);
    if (error) {
      configError = error;
      console.error("[git-buster] config error:", error);
    }
    const { parsed: teamsParsed, error: teamsError } = parseTeamRequirements(scoppedOptions.teamRequirements);
    if (teamsError && !configError) {
      configError = teamsError;
      console.error("[git-buster] config error:", teamsError);
    }
    return {
      ...scoppedOptions,
      projects: parsed,
      teamRequirements: teamsParsed
    };
  };
  var createOrGetPageContainer = () => {
    let page = document.getElementById(EXT_PAGE_ID);
    if (!page) {
      page = document.createElement("div");
      page.id = EXT_PAGE_ID;
      const containerTarget = document.querySelector(".content-wrapper") || document.body;
      containerTarget.appendChild(page);
    }
    return page;
  };
  var updateSidebarButtonState = () => {
    const btn = document.getElementById(EXT_SIDEBAR_BTN_ID);
    if (btn) {
      ;
      btn.style.background = syntheticPageVisible ? "#094d8b" : "#1f78d1";
      btn.setAttribute("aria-expanded", syntheticPageVisible ? "true" : "false");
    }
  };
  var ensureSidebarButton = () => {
    if (!options?.baseUrl || !document.location.href.startsWith(options.baseUrl)) {
      return;
    }
    if (document.getElementById(EXT_SIDEBAR_BTN_ID)) {
      return;
    }
    const topBarContainer = document.querySelector(".top-bar-container");
    const sidebarContainer = document.querySelector(".super-sidebar-nav") || document.querySelector(".nav-sidebar") || document.querySelector(".sidebar") || document.querySelector(".layout-page .aside");
    let target = null;
    let mode = "sidebar";
    if (topBarContainer) {
      target = topBarContainer;
      mode = "topbar";
    } else if (sidebarContainer) {
      target = sidebarContainer;
    }
    if (!target) {
      return;
    }
    const item = document.createElement("button");
    item.type = "button";
    item.id = EXT_SIDEBAR_BTN_ID;
    item.style.cursor = "pointer";
    item.style.display = "flex";
    item.style.alignItems = "center";
    item.style.gap = "6px";
    item.style.padding = mode === "topbar" ? "4px 12px" : "6px 10px";
    item.style.margin = mode === "topbar" ? "0 0 0 auto" : "4px 8px";
    item.style.borderRadius = "6px";
    item.style.fontSize = "13px";
    item.style.lineHeight = "18px";
    item.style.fontWeight = "500";
    item.style.background = "#1f78d1";
    item.style.color = "#fff";
    item.style.border = "1px solid rgba(255,255,255,0.18)";
    item.style.boxShadow = "inset 0 0 0 1px rgba(255,255,255,0.15)";
    item.style.userSelect = "none";
    item.style.whiteSpace = "nowrap";
    item.title = "Toggle Git Buster Overview";
    item.innerHTML = `<span>Git Buster</span>`;
    item.addEventListener("mouseenter", () => {
      item.style.filter = "brightness(1.1)";
    });
    item.addEventListener("mouseleave", () => {
      item.style.filter = "none";
    });
    item.addEventListener("click", (e3) => {
      e3.preventDefault();
      const next = !syntheticPageVisible;
      if (typeof window.gitBusterSetVisible === "function") {
        window.gitBusterSetVisible(next);
      }
    });
    if (mode === "topbar") {
      const parentIsFlex = getComputedStyle(target).display.includes("flex");
      if (parentIsFlex) {
        item.style.marginLeft = "auto";
        target.appendChild(item);
      } else {
        const wrapper = document.createElement("div");
        wrapper.style.display = "flex";
        wrapper.style.marginLeft = "auto";
        wrapper.appendChild(item);
        target.appendChild(wrapper);
      }
    } else {
      const insertBefore = Array.from(target.children).find((ch) => ch.textContent?.match(/help|feedback/i));
      if (insertBefore) {
        target.insertBefore(item, insertBefore);
      } else {
        target.appendChild(item);
      }
    }
    updateSidebarButtonState();
  };
  var startSidebarObserver = () => {
    if (sidebarObserverStarted) {
      return;
    }
    sidebarObserverStarted = true;
    const observer = new MutationObserver(() => {
      if (!document.getElementById(EXT_SIDEBAR_BTN_ID)) {
        ensureSidebarButton();
        updateSidebarButtonState();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  };
  var init = async () => {
    options = await loadOptions();
    if (configError) {
      const container2 = createOrGetPageContainer();
      container2.innerHTML = `<div style="padding:24px;font-family:system-ui,sans-serif;color:#b00020;background:#2b1d1f;border:1px solid #b00020;border-radius:6px;max-width:640px;margin:24px auto;"><h2 style="margin-top:0;color:#ffb4c1;font-size:18px;">Git Buster configuration error</h2><p style="line-height:1.4;margin:8px 0;">${configError}</p><p style="font-size:12px;opacity:.8;margin:12px 0 0;">Update the extension options (projects JSON) and reload the page.</p></div>`;
      ensureSidebarButton();
      updateSidebarButtonState();
      return;
    }
    if (!options.enable || !options.baseUrl || !document.location.href.startsWith(options.baseUrl)) {
      return;
    }
    syntheticPageVisible = window.location.hash.replace("#", "") === URL_ANCHOR;
    window.gitBusterOnVisibleChange = (v3) => {
      syntheticPageVisible = v3;
      updateSidebarButtonState();
    };
    ensureSidebarButton();
    startSidebarObserver();
    const container = createOrGetPageContainer();
    mountOverview(container, options, syntheticPageVisible);
    updateSidebarButtonState();
    window.addEventListener("hashchange", () => {
      const shouldBeVisible = window.location.hash.replace("#", "") === URL_ANCHOR;
      if (shouldBeVisible !== syntheticPageVisible && typeof window.gitBusterSetVisible === "function") {
        window.gitBusterSetVisible(shouldBeVisible);
      }
    });
    const isEditableTarget = (el) => {
      if (!(el instanceof HTMLElement)) return false;
      const tag = el.tagName.toLowerCase();
      return tag === "input" || tag === "textarea" || el.isContentEditable;
    };
    document.addEventListener("keydown", (e3) => {
      if (e3.ctrlKey && !e3.altKey && !e3.shiftKey && e3.key.toLowerCase() === "q") {
        if (isEditableTarget(e3.target)) {
          return;
        }
        e3.preventDefault();
        if (typeof window.gitBusterSetVisible === "function") {
          window.gitBusterSetVisible(!syntheticPageVisible);
        }
      }
    });
  };
  init();
})();
