"use strict";
(() => {
  // src/types.ts
  var tagToBadgeForMe = {
    ["discussions_not_resolved" /* DISCUSSIONS_NOT_RESOLVED */]: "actions" /* ACTIONS */,
    ["ci_unsuccessful" /* CI_UNSUCCESSFUL */]: "actions" /* ACTIONS */,
    ["need_rebase" /* NEED_REBASE */]: "actions" /* ACTIONS */,
    ["missing_approvals" /* MISSING_APPROVALS */]: "wait" /* WAIT */,
    ["not_approved_by_me" /* NOT_APPROVED_BY_ME */]: "neutral" /* NEUTRAL */,
    ["can_be_merged" /* CAN_BE_MERGED */]: "done" /* DONE */
  };
  var tagToBadgeForOthers = {
    ["ci_unsuccessful" /* CI_UNSUCCESSFUL */]: "wait" /* WAIT */,
    ["discussions_not_resolved" /* DISCUSSIONS_NOT_RESOLVED */]: "wait" /* WAIT */,
    ["not_approved_by_me" /* NOT_APPROVED_BY_ME */]: "actions" /* ACTIONS */,
    ["missing_approvals" /* MISSING_APPROVALS */]: "wait" /* WAIT */,
    ["need_rebase" /* NEED_REBASE */]: "wait" /* WAIT */,
    ["can_be_merged" /* CAN_BE_MERGED */]: "done" /* DONE */
  };
  var colors = {
    ["actions" /* ACTIONS */]: "#ec5941",
    ["wait" /* WAIT */]: "#c17d10",
    ["done" /* DONE */]: "#2da160",
    ["neutral" /* NEUTRAL */]: "white"
  };
  var getBadge = (isMine, tags) => {
    if (!tags.length) {
      return "done" /* DONE */;
    }
    const mapping = isMine ? tagToBadgeForMe : tagToBadgeForOthers;
    for (const [tag, badge] of Object.entries(mapping)) {
      if (tags.includes(tag)) {
        return badge;
      }
    }
    return "neutral" /* NEUTRAL */;
  };
  var capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  var displayBadge = (tag, isMine) => {
    const badge = getBadge(isMine, [tag]);
    const classMap = {
      ["actions" /* ACTIONS */]: "gb-tag-actions",
      ["wait" /* WAIT */]: "gb-tag-wait",
      ["done" /* DONE */]: "gb-tag-done",
      ["neutral" /* NEUTRAL */]: "gb-tag-neutral"
    };
    return `<span class="gb-tag ${classMap[badge]}">${capitalizeFirstLetter(tag).replace(/_/g, " ")}</span>`;
  };
  var isMrMine = (mr, options2) => mr.assignee?.username === options2.username;
  var tagsByMr = {};
  var addTag = (mr, tag) => {
    if (!(mr.id in tagsByMr)) {
      tagsByMr[mr.id] = [];
    }
    tagsByMr[mr.id].push(tag);
  };
  var getTags = (mr) => tagsByMr[mr.id] ?? [];

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
    var a3, h3, p3, v3, y3, _2, m3, b, S2, C3, M2, $2, P2, A2, H, L2, T2, j3 = u4.type;
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
      if (h3.context = M2, h3.props = b, h3.__P = n2, h3.__e = false, P2 = l.__r, A2 = 0, S2) {
        for (h3.state = h3.__s, h3.__d = false, P2 && P2(u4), a3 = h3.render(h3.props, h3.state, h3.context), H = 0; H < h3._sb.length; H++) h3.__h.push(h3._sb[H]);
        h3._sb = [];
      } else do {
        h3.__d = false, P2 && P2(u4), a3 = h3.render(h3.props, h3.state, h3.context), h3.state = h3.__s;
      } while (h3.__d && ++A2 < 25);
      h3.state = h3.__s, null != h3.getChildContext && (i4 = d(d({}, i4), h3.getChildContext())), S2 && !p3 && null != h3.getSnapshotBeforeUpdate && (_2 = h3.getSnapshotBeforeUpdate(v3, y3)), L2 = a3, null != a3 && a3.type === k && null == a3.key && (L2 = V(a3.props.children)), f4 = I(n2, w(L2) ? L2 : [L2], u4, t3, i4, r3, o3, e3, f4, c3, s3), h3.base = u4.__e, u4.__u &= -161, h3.__h.length && e3.push(h3), m3 && (h3.__E = h3.__ = null);
    } catch (n3) {
      if (u4.__v = null, c3 || null != o3) if (n3.then) {
        for (u4.__u |= c3 ? 160 : 128; f4 && 8 == f4.nodeType && f4.nextSibling; ) f4 = f4.nextSibling;
        o3[o3.indexOf(f4)] = null, u4.__e = f4;
      } else {
        for (T2 = o3.length; T2--; ) g(o3[T2]);
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

  // src/UserAvatar.tsx
  var UserAvatar = ({ user, size = 22, overlap = false }) => {
    const tooltip = `${user.username} \u2014 ${user.name}`;
    const style = {
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: "50%",
      objectFit: "cover",
      border: "1px solid #ccc",
      background: "#eee",
      display: "inline-block"
    };
    return /* @__PURE__ */ u3(
      "span",
      {
        title: tooltip,
        style: {
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: overlap ? "-6px" : "0"
        },
        children: user.avatar_url ? /* @__PURE__ */ u3("img", { src: user.avatar_url, alt: user.username, style }) : /* @__PURE__ */ u3("span", { style: { ...style, fontSize: "10px", lineHeight: `${size}px`, textAlign: "center", color: "#555" }, children: user.username?.charAt(0).toUpperCase() })
      }
    );
  };

  // src/overviewComponent.tsx
  var PROJECT_PATHS = [
    "sywa/sywa/frontend",
    "sywa/sywa/backend",
    "sywa/sywa/sywatt",
    "sywa/sywa/sywack"
  ];
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
  var useProjectMergeRequests = (baseUrl) => {
    const [mrs, setMrs] = d2([]);
    const [loading, setLoading] = d2(true);
    const [error, setError] = d2(null);
    y2(() => {
      if (!baseUrl) {
        setError("Missing baseUrl option");
        setLoading(false);
        return;
      }
      let cancelled = false;
      setLoading(true);
      Promise.all(PROJECT_PATHS.map((p3) => fetchOpenedMrsForProject(baseUrl, p3))).then((results) => {
        if (!cancelled) {
          setMrs(results.flat());
          setError(null);
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
    }, [baseUrl]);
    return { mrs, loading, error };
  };
  var isDraftMr = (mr) => {
    const title = mr.title.toLowerCase();
    return mr.draft || mr.work_in_progress || title.startsWith("draft:") || title.startsWith("wip:");
  };
  var isHotfixMr = (mr) => {
    const target = mr.target_branch.toLowerCase();
    return target === "main" || target === "master" || mr.title.includes("\u{1F691}");
  };
  var LS_FILTER_KEY = "gb_persistent_filters";
  var loadFilters = () => {
    try {
      const raw = localStorage.getItem(LS_FILTER_KEY);
      if (!raw) return { hideDrafts: false, onlyHotfixes: false, authorFilter: "all" };
      const parsed = JSON.parse(raw);
      return {
        hideDrafts: !!parsed.hideDrafts,
        onlyHotfixes: !!parsed.onlyHotfixes,
        authorFilter: ["all", "mine", "others"].includes(parsed.authorFilter) ? parsed.authorFilter : "all"
      };
    } catch {
      return { hideDrafts: false, onlyHotfixes: false, authorFilter: "all" };
    }
  };
  var saveFilters = (f4) => {
    try {
      localStorage.setItem(LS_FILTER_KEY, JSON.stringify(f4));
    } catch {
    }
  };
  var PersistantFilterBar = ({ hideDrafts, setHideDrafts, onlyHotfixes, setOnlyHotfixes, authorFilter, setAuthorFilter, username }) => /* @__PURE__ */ u3("div", { style: "margin-top:10px;padding:8px 12px;border:1px solid #ccc;border-radius:6px;display:flex;gap:18px;align-items:center;font-size:12px;flex-wrap:wrap", children: [
    /* @__PURE__ */ u3("label", { style: "display:flex;align-items:center;gap:6px;cursor:pointer", title: "Draft: GitLab draft/WIP flag or title starts with draft:/wip:", children: [
      /* @__PURE__ */ u3("input", { type: "checkbox", checked: hideDrafts, onChange: (e3) => setHideDrafts(e3.target.checked) }),
      /* @__PURE__ */ u3("span", { children: "Hide draft MRs" })
    ] }),
    /* @__PURE__ */ u3("label", { style: "display:flex;align-items:center;gap:6px;cursor:pointer", title: "Hotfix: targets main or master branch OR title contains \u{1F691}", children: [
      /* @__PURE__ */ u3("input", { type: "checkbox", checked: onlyHotfixes, onChange: (e3) => setOnlyHotfixes(e3.target.checked) }),
      /* @__PURE__ */ u3("span", { children: "Only hotfix MRs" })
    ] }),
    /* @__PURE__ */ u3("label", { style: "display:flex;align-items:center;gap:6px;cursor:pointer", title: "Filter by author relative to configured username", children: [
      /* @__PURE__ */ u3("span", { children: "Author:" }),
      /* @__PURE__ */ u3("select", { value: authorFilter, onChange: (e3) => setAuthorFilter(e3.target.value), style: "padding:4px 6px;border:1px solid #bbb;border-radius:4px;font-size:12px", children: [
        /* @__PURE__ */ u3("option", { value: "all", children: "All" }),
        /* @__PURE__ */ u3("option", { value: "mine", disabled: !username, children: "Mine" }),
        /* @__PURE__ */ u3("option", { value: "others", disabled: !username, children: "Others" })
      ] })
    ] })
  ] });
  var extractJiraTicket = (title) => {
    const match = title.toUpperCase().match(/([A-Z][A-Z0-9]+-\d+)/);
    return match ? match[1] : null;
  };
  var formatUpdatedAt = (iso) => {
    const d3 = new Date(iso);
    const pad = (n2) => String(n2).padStart(2, "0");
    return `${d3.getFullYear()}-${pad(d3.getMonth() + 1)}-${pad(d3.getDate())} ${pad(d3.getHours())}:${pad(d3.getMinutes())}`;
  };
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
  var reviewMetaCache = {};
  var REVIEW_META_BATCH_SIZE = 5;
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
      const toFetch = mrs.filter((mr) => {
        const cached = reviewMetaCache[mr.id];
        return !cached || cached.updated_at !== mr.updated_at;
      });
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
        if (!cancelled) {
          setLoading(false);
        }
      };
      run();
      return () => {
        cancelled = true;
      };
    }, [baseUrl, mrs, refreshToken]);
    return { approvalsUsersByMr, reviewersUsersByMr, loading };
  };
  var Table = ({ mrs, filter, setFilter, approvalsUsersByMr, reviewersUsersByMr }) => /* @__PURE__ */ u3("table", { style: "border-collapse:collapse;min-width:760px;width:100%;font-size:13px;line-height:18px", children: [
    /* @__PURE__ */ u3("thead", { children: /* @__PURE__ */ u3("tr", { children: [
      /* @__PURE__ */ u3("th", { style: "text-align:left;padding:6px 8px;border-bottom:2px solid #444", children: "Title" }),
      /* @__PURE__ */ u3("th", { style: "text-align:left;padding:6px 8px;border-bottom:2px solid #444", children: "Project" }),
      /* @__PURE__ */ u3("th", { style: "text-align:left;padding:6px 8px;border-bottom:2px solid #444", children: "Author" }),
      /* @__PURE__ */ u3("th", { style: "text-align:left;padding:6px 8px;border-bottom:2px solid #444;width:1%;white-space:nowrap", children: "Approvals" }),
      /* @__PURE__ */ u3("th", { style: "text-align:left;padding:6px 8px;border-bottom:2px solid #444;width:1%;white-space:nowrap", children: "Reviewers" }),
      /* @__PURE__ */ u3("th", { style: "text-align:left;padding:6px 8px;border-bottom:2px solid #444;width:1%;white-space:nowrap", children: "Updated" })
    ] }) }),
    /* @__PURE__ */ u3("tbody", { children: mrs.map((mr) => {
      const ticket = extractJiraTicket(mr.title);
      const disabled = !ticket;
      const addTicket = () => {
        if (!ticket) return;
        const parts = filter.trim().split(/\s+/).filter(Boolean);
        if (parts.includes(ticket)) {
          return;
        }
        const newFilter = filter.trim().length ? `${filter.trim()} ${ticket}` : ticket;
        setFilter(newFilter);
      };
      const approvalsUsers = approvalsUsersByMr[mr.id] || [];
      const reviewersUsers = reviewersUsersByMr[mr.id] || [];
      return /* @__PURE__ */ u3("tr", { children: [
        /* @__PURE__ */ u3("td", { style: "vertical-align:top;padding:4px 8px;border-top:1px solid #ddd", children: [
          /* @__PURE__ */ u3("div", { style: "display:flex;align-items:flex-start;gap:6px", children: [
            /* @__PURE__ */ u3(
              "button",
              {
                type: "button",
                onClick: addTicket,
                disabled,
                title: disabled ? "No JIRA-like ticket (ABC-123) found in title" : `Add ${ticket} to title filter`,
                style: "border:1px solid #bbb;background:${disabled ? '#f5f5f5' : '#fff'};color:${disabled ? '#999' : '#222'};padding:2px 5px;border-radius:4px;font-size:11px;cursor:${disabled ? 'not-allowed' : 'pointer'};line-height:1;display:inline-flex;align-items:center;gap:2px",
                children: "\u{1F50D}"
              }
            ),
            /* @__PURE__ */ u3("a", { href: mr.web_url, target: "_blank", style: "text-decoration:none;color:#1f78d1;flex:1", children: mr.title })
          ] }),
          /* @__PURE__ */ u3("div", { style: "opacity:.6;font-size:11px", children: [
            mr.source_branch,
            " \u2192 ",
            mr.target_branch
          ] })
        ] }),
        /* @__PURE__ */ u3("td", { style: "vertical-align:top;padding:4px 8px;border-top:1px solid #ddd", children: mr.projectPath }),
        /* @__PURE__ */ u3("td", { style: "vertical-align:top;padding:4px 8px;border-top:1px solid #ddd", children: mr.author && /* @__PURE__ */ u3(UserAvatar, { user: mr.author }) }),
        /* @__PURE__ */ u3("td", { style: "vertical-align:top;padding:4px 8px;border-top:1px solid #ddd;width:1%;white-space:nowrap;font-size:11px", children: approvalsUsers.length ? /* @__PURE__ */ u3("span", { title: `Approvals (${approvalsUsers.length})`, style: "display:inline-flex;align-items:center", children: approvalsUsers.map((u4, i4) => /* @__PURE__ */ u3(UserAvatar, { user: u4, overlap: i4 > 0 })) }) : "\u2013" }),
        /* @__PURE__ */ u3("td", { style: "vertical-align:top;padding:4px 8px;border-top:1px solid #ddd;width:1%;white-space:nowrap;font-size:11px", children: reviewersUsers.length ? /* @__PURE__ */ u3("span", { title: `Reviewers (${reviewersUsers.length})`, style: "display:inline-flex;align-items:center", children: reviewersUsers.map((u4, i4) => /* @__PURE__ */ u3(UserAvatar, { user: u4, overlap: i4 > 0 })) }) : "\u2013" }),
        /* @__PURE__ */ u3("td", { style: "vertical-align:top;padding:4px 8px;border-top:1px solid #ddd;width:1%;white-space:nowrap;font-size:11px", children: formatUpdatedAt(mr.updated_at) })
      ] }, mr.id);
    }) })
  ] });
  var OverviewPage = ({ options: options2 }) => {
    const { mrs, loading, error } = useProjectMergeRequests(options2.baseUrl);
    const [filter, setFilter] = d2("");
    const [hideDrafts, setHideDrafts] = d2(() => loadFilters().hideDrafts);
    const [onlyHotfixes, setOnlyHotfixes] = d2(() => loadFilters().onlyHotfixes);
    const [authorFilter, setAuthorFilter] = d2(() => loadFilters().authorFilter);
    const [selectedAuthor, setSelectedAuthor] = d2(null);
    const [reviewMetaRefreshToken, setReviewMetaRefreshToken] = d2(0);
    y2(() => {
      saveFilters({ hideDrafts, onlyHotfixes, authorFilter });
    }, [hideDrafts, onlyHotfixes, authorFilter]);
    y2(() => {
      if (authorFilter === "mine" && selectedAuthor) {
        setSelectedAuthor(null);
      }
    }, [authorFilter, selectedAuthor]);
    const authors = Array.from(new Map(mrs.map((mr) => [mr.author?.username || "", { username: mr.author?.username || "", name: mr.author?.name || "" }])).values()).filter((a3) => a3.username).sort((a3, b) => a3.username.localeCompare(b.username));
    const titleFiltered = filter.trim() ? mrs.filter((mr) => mr.title.toLowerCase().includes(filter.toLowerCase())) : mrs;
    const draftFiltered = hideDrafts ? titleFiltered.filter((mr) => !isDraftMr(mr)) : titleFiltered;
    const fullyFilteredBase = onlyHotfixes ? draftFiltered.filter(isHotfixMr) : draftFiltered;
    const fullyFilteredAfterPersistent = authorFilter === "mine" ? fullyFilteredBase.filter((mr) => mr.author?.username === options2.username) : authorFilter === "others" ? fullyFilteredBase.filter((mr) => mr.author?.username !== options2.username) : fullyFilteredBase;
    const fullyFiltered = selectedAuthor && authorFilter !== "mine" ? fullyFilteredAfterPersistent.filter((mr) => mr.author?.username === selectedAuthor || mr.author?.name === selectedAuthor) : fullyFilteredAfterPersistent;
    const totalHotfixes = mrs.filter(isHotfixMr).length;
    const displayedHotfixes = fullyFiltered.filter(isHotfixMr).length;
    const { approvalsUsersByMr, reviewersUsersByMr, loading: reviewMetaLoading } = useReviewMeta(options2.baseUrl, fullyFiltered, reviewMetaRefreshToken);
    const handleRefreshReviewMeta = () => {
      fullyFiltered.forEach((mr) => {
        delete reviewMetaCache[mr.id];
      });
      setReviewMetaRefreshToken((t3) => t3 + 1);
    };
    return /* @__PURE__ */ u3("div", { style: "min-height:calc(100vh - 60px);padding:24px;color:var(--gl-text-color,#222);font-family:var(--gl-font-family,system-ui,sans-serif);max-width:1100px", children: [
      /* @__PURE__ */ u3("h1", { style: "margin-top:0;", children: "Git Buster Overview" }),
      /* @__PURE__ */ u3(PersistantFilterBar, { hideDrafts, setHideDrafts, onlyHotfixes, setOnlyHotfixes, authorFilter, setAuthorFilter, username: options2.username }),
      /* @__PURE__ */ u3(
        NonPersistentAuthorFilter,
        {
          authors,
          selectedAuthor,
          setSelectedAuthor,
          disabled: authorFilter === "mine"
        }
      ),
      /* @__PURE__ */ u3("div", { style: "margin-top:12px;display:flex;gap:12px;align-items:center;flex-wrap:wrap", children: [
        /* @__PURE__ */ u3(
          "input",
          {
            value: filter,
            onInput: (e3) => setFilter(e3.target.value),
            placeholder: "Filter MRs by title...",
            style: "flex:1;min-width:260px;padding:6px 10px;border:1px solid #bbb;border-radius:6px;font-size:13px"
          }
        ),
        /* @__PURE__ */ u3("div", { style: "font-size:12px;opacity:.7", children: [
          fullyFiltered.length,
          "/",
          mrs.length,
          " displayed \xB7 Hotfixes: ",
          displayedHotfixes,
          "/",
          totalHotfixes
        ] }),
        /* @__PURE__ */ u3(
          "button",
          {
            type: "button",
            onClick: handleRefreshReviewMeta,
            disabled: reviewMetaLoading || !fullyFiltered.length,
            title: "Force refetch approvals & reviewers for visible MRs (clears cache for them)",
            style: "padding:6px 10px;border:1px solid #bbb;border-radius:6px;cursor:${reviewMetaLoading || !fullyFiltered.length ? 'not-allowed' : 'pointer'};font-size:12px",
            children: "Refresh review meta"
          }
        )
      ] }),
      /* @__PURE__ */ u3("div", { style: "margin-top:20px", children: [
        loading && /* @__PURE__ */ u3("div", { style: "opacity:.7", children: "Loading merge requests\u2026" }),
        error && !loading && /* @__PURE__ */ u3("div", { style: "color:#ec5941", children: [
          "Failed to load: ",
          error
        ] }),
        !loading && !error && !fullyFiltered.length && /* @__PURE__ */ u3("div", { style: "opacity:.6", children: "No opened merge requests found." }),
        !!fullyFiltered.length && /* @__PURE__ */ u3(Table, { mrs: fullyFiltered, filter, setFilter, approvalsUsersByMr, reviewersUsersByMr }),
        reviewMetaLoading && !!fullyFiltered.length && /* @__PURE__ */ u3("div", { style: "margin-top:6px;font-size:11px;opacity:.6", children: "Loading approvals & reviewers\u2026" })
      ] })
    ] });
  };
  var NonPersistentAuthorFilter = ({ authors, selectedAuthor, setSelectedAuthor, disabled }) => {
    return /* @__PURE__ */ u3("div", { style: "margin-top:10px;display:flex;gap:8px;align-items:center;flex-wrap:wrap;font-size:12px", children: /* @__PURE__ */ u3("div", { style: "display:flex;flex-direction:column;gap:4px;min-width:240px", children: [
      /* @__PURE__ */ u3("label", { style: "font-weight:600", children: "Ephemeral author filter" }),
      /* @__PURE__ */ u3("div", { style: "display:flex;gap:6px;align-items:center", children: [
        /* @__PURE__ */ u3(
          "input",
          {
            list: "gb-authors-list",
            disabled,
            value: selectedAuthor ?? "",
            onInput: (e3) => {
              const v3 = e3.target.value.trim();
              setSelectedAuthor(v3 ? v3 : null);
            },
            placeholder: disabled ? "Disabled (Mine)" : "Type to filter by author...",
            style: "flex:1;padding:6px 8px;border:1px solid #bbb;border-radius:6px;font-size:12px"
          }
        ),
        /* @__PURE__ */ u3(
          "button",
          {
            type: "button",
            disabled: disabled || !selectedAuthor,
            onClick: () => setSelectedAuthor(null),
            style: "padding:6px 10px;border:1px solid #bbb;border-radius:6px;cursor:pointer;font-size:12px",
            title: "Clear author filter",
            children: "Clear"
          }
        )
      ] }),
      /* @__PURE__ */ u3("datalist", { id: "gb-authors-list", children: authors.map((a3) => /* @__PURE__ */ u3("option", { value: a3.username, label: a3.name })) }),
      /* @__PURE__ */ u3("div", { style: "opacity:.6;font-size:11px", children: "Not persisted. Filters after persistent author scope. Matches username or full name." })
    ] }) });
  };
  var mountOverview = (container, options2) => {
    G(/* @__PURE__ */ u3(OverviewPage, { options: options2 }), container);
  };

  // src/index.ts
  var options;
  var EXTENSION_NAME = "git-buster";
  var EXT_PAGE_ID = "git-buster-page";
  var EXT_SIDEBAR_BTN_ID = "git-buster-sidebar-btn";
  var URL_ANCHOR = "git-buster";
  var syntheticPageVisible = false;
  var sidebarObserverStarted = false;
  var loadOptions = async () => {
    const options2 = await chrome.storage.sync.get([EXTENSION_NAME]);
    const scoppedOptions = options2[EXTENSION_NAME] ?? {};
    return {
      ...scoppedOptions,
      facultativeApprovers: (scoppedOptions.facultativeApprovers ?? "").split(",").filter(Boolean)
    };
  };
  var setBadge = (mr) => {
    const issueElem = document.getElementById(`merge_request_${mr.id}`);
    if (!issueElem) {
      console.error("could not find elem", { mr });
      return;
    }
    const isMine = isMrMine(mr, options);
    const tags = getTags(mr);
    const badge = getBadge(isMine, tags);
    const badgeColor = colors[badge];
    issueElem.style.borderLeft = `5px solid ${badgeColor}`;
    issueElem.style.paddingLeft = "10px";
    const issueInfoElem = issueElem.querySelector(".issuable-info");
    if (!issueInfoElem) {
      console.error("could not find issuable-info", { mr });
      return;
    }
    if (badge === "done" /* DONE */) {
      issueInfoElem.innerHTML += `<div>
        <div><br/></div>
        <div>${displayBadge("can_be_merged" /* CAN_BE_MERGED */, isMine)}</div>
    </div>`;
      return;
    }
    issueInfoElem.innerHTML += `<div>
        <div><br/></div>
        <div class="has-tooltip" title="is Mine: ${isMine ? "true" : "false"}" style="display: flex; gap: 5px">${tags.map((tag) => displayBadge(tag, isMine)).join("")}</div>
    </div>`;
  };
  var myFetch = async (url) => {
    return fetch(`${options.baseUrl}/api/v4${url}`).then((res) => res.json());
  };
  var getMrOfProject = async (projectName, mrIids) => {
    const project = (await myFetch(`/projects?search=${projectName}`)).shift();
    const params = mrIids.map((iid) => `iids[]=${iid}`).join("&");
    return myFetch(`/projects/${project.id}/merge_requests?with_labels_details=true&with_merge_status_recheck=true&${params}`);
  };
  var getAllMr = async () => {
    const mergeRequests = document.querySelectorAll("li.merge-request .merge-request-title-text a");
    const mrByProject = /* @__PURE__ */ new Map();
    for (let i4 = 0; i4 < mergeRequests.length; i4++) {
      const href = mergeRequests[i4].getAttribute("href");
      if (!href) {
        continue;
      }
      const [project, , , mrIid] = href.split("/").splice(-4);
      const iidList = mrByProject.get(project) ?? [];
      iidList.push(mrIid);
      mrByProject.set(project, iidList);
    }
    const mrsByProject = await Promise.all(
      Array.from(mrByProject).map(([projectName, mrIIds]) => getMrOfProject(projectName, mrIIds))
    );
    return mrsByProject.flat();
  };
  var processDiscussion = async (elem, mr) => {
    const discussions = await myFetch(`/projects/${mr.project_id}/merge_requests/${mr.iid}/discussions?per_page=100`);
    const humanDiscussions = discussions.filter((d3) => !d3.individual_note);
    if (!humanDiscussions.length) {
      elem.innerHTML += `<div class="discussion">No discussion</div>`;
      return;
    }
    const resolved = humanDiscussions.filter((discussion) => !!discussion.notes[0].resolved);
    const allResolved = resolved.length >= humanDiscussions.length;
    if (!allResolved) {
      addTag(mr, "discussions_not_resolved" /* DISCUSSIONS_NOT_RESOLVED */);
    }
    const color = allResolved ? colors["done" /* DONE */] : isMrMine(mr, options) ? colors["actions" /* ACTIONS */] : colors["wait" /* WAIT */];
    elem.innerHTML += `<div class="discussion" style="color: ${color}">Discussions ${resolved.length}/${humanDiscussions.length}</div>`;
  };
  var processApprovals = async (elem, mr) => {
    const approval = await myFetch(`/projects/${mr.project_id}/merge_requests/${mr.iid}/approvals`);
    if (!approval.approved) {
      const color2 = isMrMine(mr, options) ? colors["wait" /* WAIT */] : colors["actions" /* ACTIONS */];
      if (!isMrMine(mr, options)) {
        addTag(mr, "not_approved_by_me" /* NOT_APPROVED_BY_ME */);
      }
      addTag(mr, "missing_approvals" /* MISSING_APPROVALS */);
      elem.innerHTML += `<div class="approval" style="color: ${color2}">No approval</div>`;
      return;
    }
    const needed = options.requiredApprovals ?? 3;
    const requiredResolvers = approval.approved_by.filter((u4) => !options.facultativeApprovers.includes(u4.user.username));
    const allResolved = requiredResolvers.length >= needed;
    const approvedByMe = !!approval.approved_by.find((u4) => u4.user.username === options.username);
    if (!allResolved) {
      if (!approvedByMe && !isMrMine(mr, options)) {
        addTag(mr, "not_approved_by_me" /* NOT_APPROVED_BY_ME */);
      }
      addTag(mr, "missing_approvals" /* MISSING_APPROVALS */);
    }
    const color = allResolved ? colors["done" /* DONE */] : isMrMine(mr, options) || approvedByMe ? colors["wait" /* WAIT */] : colors["actions" /* ACTIONS */];
    const allAvatars = approval.approved_by.map((u4) => `<span class="author-link has-tooltip" title="Approved by ${u4.user.name}" data-container="body" data-qa-selector="assignee_link" data-original-title="Approved by ${u4.user.name}" aria-describedby="gl-tooltip5">
<img width="16" class="avatar avatar-inline s16 js-lazy-loaded" alt="" src="${u4.user.avatar_url}" loading="lazy" data-qa_selector="js_lazy_loaded_content">
</span>`).join("");
    elem.innerHTML += `<div class="discussion" style="color: ${color}">Approvals ${approval.approved_by.length}/${needed} (${allAvatars})</div>`;
  };
  var processCI = async (mr) => {
    const fullMR = await myFetch(`/projects/${mr.project_id}/merge_requests/${mr.iid}?include_diverged_commits_count=true`);
    if (fullMR.diverged_commits_count > 0) {
      addTag(mr, "need_rebase" /* NEED_REBASE */);
    }
    if (fullMR.detailed_merge_status === "ci_must_pass" || fullMR.pipeline && fullMR.pipeline.status !== "success") {
      addTag(mr, "ci_unsuccessful" /* CI_UNSUCCESSFUL */);
    }
  };
  var processMr = async (mr) => {
    const elem = document.querySelector(`#merge_request_${mr.id} .issuable-meta`);
    if (!elem) {
      return;
    }
    await Promise.all([
      processDiscussion(elem, mr),
      processApprovals(elem, mr),
      processCI(mr)
    ]);
    setBadge(mr);
  };
  var isOld = (mr, ignoreAfterMonth) => {
    if (!ignoreAfterMonth || ignoreAfterMonth < 1) {
      return false;
    }
    const now = /* @__PURE__ */ new Date();
    const targetDate = new Date(mr.updated_at);
    const monthDiff = Math.abs((now.getFullYear() - targetDate.getFullYear()) * 12 + (now.getMonth() - targetDate.getMonth()));
    return monthDiff > ignoreAfterMonth;
  };
  var getMainContentContainer = () => {
    return document.querySelector("#content-body") || document.querySelector("main") || document.querySelector(".content-wrapper");
  };
  var removeSyntheticPage = () => {
    const page = document.getElementById(EXT_PAGE_ID);
    if (page) {
      page.remove();
    }
    const main = getMainContentContainer();
    if (main) {
      main.style.display = "";
    }
  };
  var renderSyntheticPage = async () => {
    removeSyntheticPage();
    const main = getMainContentContainer();
    if (main) {
      main.style.display = "none";
    }
    const page = document.createElement("div");
    page.id = EXT_PAGE_ID;
    const containerTarget = document.querySelector(".content-wrapper") || document.body;
    containerTarget.appendChild(page);
    try {
      const allMr = await getAllMr();
      await Promise.all(allMr.filter((mr) => !isOld(mr, options.ignoreAfterMonth) && (!options.skipDrafts || !mr.draft)).map((mr) => processMr(mr)));
      mountOverview(page, options);
    } catch (e3) {
      page.innerHTML = `<div style="color:#ec5941;padding:24px;font-family:var(--gl-font-family,system-ui,sans-serif)">Failed to build overview: ${e3.message}</div>`;
      console.error("[git-buster] overview error", e3);
    }
  };
  var updateSidebarButtonState = () => {
    const btn = document.getElementById(EXT_SIDEBAR_BTN_ID);
    if (btn) {
      btn.style.background = syntheticPageVisible ? "#094d8b" : "#1f78d1";
      btn.setAttribute("aria-expanded", syntheticPageVisible ? "true" : "false");
    }
  };
  var updateUrlForVisibility = () => {
    const currentHash = window.location.hash.replace("#", "");
    if (syntheticPageVisible) {
      if (currentHash !== URL_ANCHOR) {
        history.replaceState(null, "", `${location.pathname}${location.search}#${URL_ANCHOR}`);
      }
    } else {
      if (currentHash === URL_ANCHOR) {
        history.replaceState(null, "", `${location.pathname}${location.search}`);
      }
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
      syntheticPageVisible = !syntheticPageVisible;
      if (syntheticPageVisible) {
        renderSyntheticPage();
      } else {
        removeSyntheticPage();
      }
      updateUrlForVisibility();
      updateSidebarButtonState();
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
    if (!syntheticPageVisible && window.location.hash.replace("#", "") === URL_ANCHOR) {
      syntheticPageVisible = true;
      renderSyntheticPage().then(() => updateSidebarButtonState());
    }
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
    if (!options.enable || !options.baseUrl || !document.location.href.startsWith(options.baseUrl)) {
      return;
    }
    if (window.location.hash.replace("#", "") === URL_ANCHOR) {
      syntheticPageVisible = true;
    }
    ensureSidebarButton();
    startSidebarObserver();
    if (syntheticPageVisible) {
      await renderSyntheticPage();
      updateSidebarButtonState();
    } else {
      const allMr = await getAllMr();
      await Promise.all(allMr.filter((mr) => !isOld(mr, options.ignoreAfterMonth) && (!options.skipDrafts || !mr.draft)).map((mr) => processMr(mr)));
    }
    window.addEventListener("hashchange", () => {
      const shouldBeVisible = window.location.hash.replace("#", "") === URL_ANCHOR;
      if (shouldBeVisible !== syntheticPageVisible) {
        syntheticPageVisible = shouldBeVisible;
        if (syntheticPageVisible) {
          renderSyntheticPage();
        } else {
          removeSyntheticPage();
        }
        updateSidebarButtonState();
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
        syntheticPageVisible = !syntheticPageVisible;
        if (syntheticPageVisible) {
          renderSyntheticPage();
        } else {
          removeSyntheticPage();
        }
        updateUrlForVisibility();
        updateSidebarButtonState();
      }
    });
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => init());
  } else {
    init();
  }
})();
