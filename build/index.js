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
  function d(n2, l2) {
    for (var u3 in l2) n2[u3] = l2[u3];
    return n2;
  }
  function g(n2) {
    n2 && n2.parentNode && n2.parentNode.removeChild(n2);
  }
  function _(l2, u3, t2) {
    var i3, r2, o2, e2 = {};
    for (o2 in u3) "key" == o2 ? i3 = u3[o2] : "ref" == o2 ? r2 = u3[o2] : e2[o2] = u3[o2];
    if (arguments.length > 2 && (e2.children = arguments.length > 3 ? n.call(arguments, 2) : t2), "function" == typeof l2 && null != l2.defaultProps) for (o2 in l2.defaultProps) void 0 === e2[o2] && (e2[o2] = l2.defaultProps[o2]);
    return m(l2, e2, i3, r2, null);
  }
  function m(n2, t2, i3, r2, o2) {
    var e2 = { type: n2, props: t2, key: i3, ref: r2, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: null == o2 ? ++u : o2, __i: -1, __u: 0 };
    return null == o2 && null != l.vnode && l.vnode(e2), e2;
  }
  function k(n2) {
    return n2.children;
  }
  function x(n2, l2) {
    this.props = n2, this.context = l2;
  }
  function S(n2, l2) {
    if (null == l2) return n2.__ ? S(n2.__, n2.__i + 1) : null;
    for (var u3; l2 < n2.__k.length; l2++) if (null != (u3 = n2.__k[l2]) && null != u3.__e) return u3.__e;
    return "function" == typeof n2.type ? S(n2) : null;
  }
  function C(n2) {
    var l2, u3;
    if (null != (n2 = n2.__) && null != n2.__c) {
      for (n2.__e = n2.__c.base = null, l2 = 0; l2 < n2.__k.length; l2++) if (null != (u3 = n2.__k[l2]) && null != u3.__e) {
        n2.__e = n2.__c.base = u3.__e;
        break;
      }
      return C(n2);
    }
  }
  function M(n2) {
    (!n2.__d && (n2.__d = true) && i.push(n2) && !$.__r++ || r != l.debounceRendering) && ((r = l.debounceRendering) || o)($);
  }
  function $() {
    for (var n2, u3, t2, r2, o2, f3, c2, s2 = 1; i.length; ) i.length > s2 && i.sort(e), n2 = i.shift(), s2 = i.length, n2.__d && (t2 = void 0, r2 = void 0, o2 = (r2 = (u3 = n2).__v).__e, f3 = [], c2 = [], u3.__P && ((t2 = d({}, r2)).__v = r2.__v + 1, l.vnode && l.vnode(t2), O(u3.__P, t2, r2, u3.__n, u3.__P.namespaceURI, 32 & r2.__u ? [o2] : null, f3, null == o2 ? S(r2) : o2, !!(32 & r2.__u), c2), t2.__v = r2.__v, t2.__.__k[t2.__i] = t2, N(f3, t2, c2), r2.__e = r2.__ = null, t2.__e != o2 && C(t2)));
    $.__r = 0;
  }
  function I(n2, l2, u3, t2, i3, r2, o2, e2, f3, c2, s2) {
    var a2, h2, y2, w2, d2, g2, _2, m2 = t2 && t2.__k || v, b = l2.length;
    for (f3 = P(u3, l2, m2, f3, b), a2 = 0; a2 < b; a2++) null != (y2 = u3.__k[a2]) && (h2 = -1 == y2.__i ? p : m2[y2.__i] || p, y2.__i = a2, g2 = O(n2, y2, h2, i3, r2, o2, e2, f3, c2, s2), w2 = y2.__e, y2.ref && h2.ref != y2.ref && (h2.ref && B(h2.ref, null, y2), s2.push(y2.ref, y2.__c || w2, y2)), null == d2 && null != w2 && (d2 = w2), (_2 = !!(4 & y2.__u)) || h2.__k === y2.__k ? f3 = A(y2, f3, n2, _2) : "function" == typeof y2.type && void 0 !== g2 ? f3 = g2 : w2 && (f3 = w2.nextSibling), y2.__u &= -7);
    return u3.__e = d2, f3;
  }
  function P(n2, l2, u3, t2, i3) {
    var r2, o2, e2, f3, c2, s2 = u3.length, a2 = s2, h2 = 0;
    for (n2.__k = new Array(i3), r2 = 0; r2 < i3; r2++) null != (o2 = l2[r2]) && "boolean" != typeof o2 && "function" != typeof o2 ? (f3 = r2 + h2, (o2 = n2.__k[r2] = "string" == typeof o2 || "number" == typeof o2 || "bigint" == typeof o2 || o2.constructor == String ? m(null, o2, null, null, null) : w(o2) ? m(k, { children: o2 }, null, null, null) : null == o2.constructor && o2.__b > 0 ? m(o2.type, o2.props, o2.key, o2.ref ? o2.ref : null, o2.__v) : o2).__ = n2, o2.__b = n2.__b + 1, e2 = null, -1 != (c2 = o2.__i = L(o2, u3, f3, a2)) && (a2--, (e2 = u3[c2]) && (e2.__u |= 2)), null == e2 || null == e2.__v ? (-1 == c2 && (i3 > s2 ? h2-- : i3 < s2 && h2++), "function" != typeof o2.type && (o2.__u |= 4)) : c2 != f3 && (c2 == f3 - 1 ? h2-- : c2 == f3 + 1 ? h2++ : (c2 > f3 ? h2-- : h2++, o2.__u |= 4))) : n2.__k[r2] = null;
    if (a2) for (r2 = 0; r2 < s2; r2++) null != (e2 = u3[r2]) && 0 == (2 & e2.__u) && (e2.__e == t2 && (t2 = S(e2)), D(e2, e2));
    return t2;
  }
  function A(n2, l2, u3, t2) {
    var i3, r2;
    if ("function" == typeof n2.type) {
      for (i3 = n2.__k, r2 = 0; i3 && r2 < i3.length; r2++) i3[r2] && (i3[r2].__ = n2, l2 = A(i3[r2], l2, u3, t2));
      return l2;
    }
    n2.__e != l2 && (t2 && (l2 && n2.type && !l2.parentNode && (l2 = S(n2)), u3.insertBefore(n2.__e, l2 || null)), l2 = n2.__e);
    do {
      l2 = l2 && l2.nextSibling;
    } while (null != l2 && 8 == l2.nodeType);
    return l2;
  }
  function L(n2, l2, u3, t2) {
    var i3, r2, o2, e2 = n2.key, f3 = n2.type, c2 = l2[u3], s2 = null != c2 && 0 == (2 & c2.__u);
    if (null === c2 && null == n2.key || s2 && e2 == c2.key && f3 == c2.type) return u3;
    if (t2 > (s2 ? 1 : 0)) {
      for (i3 = u3 - 1, r2 = u3 + 1; i3 >= 0 || r2 < l2.length; ) if (null != (c2 = l2[o2 = i3 >= 0 ? i3-- : r2++]) && 0 == (2 & c2.__u) && e2 == c2.key && f3 == c2.type) return o2;
    }
    return -1;
  }
  function T(n2, l2, u3) {
    "-" == l2[0] ? n2.setProperty(l2, null == u3 ? "" : u3) : n2[l2] = null == u3 ? "" : "number" != typeof u3 || y.test(l2) ? u3 : u3 + "px";
  }
  function j(n2, l2, u3, t2, i3) {
    var r2, o2;
    n: if ("style" == l2) if ("string" == typeof u3) n2.style.cssText = u3;
    else {
      if ("string" == typeof t2 && (n2.style.cssText = t2 = ""), t2) for (l2 in t2) u3 && l2 in u3 || T(n2.style, l2, "");
      if (u3) for (l2 in u3) t2 && u3[l2] == t2[l2] || T(n2.style, l2, u3[l2]);
    }
    else if ("o" == l2[0] && "n" == l2[1]) r2 = l2 != (l2 = l2.replace(f, "$1")), o2 = l2.toLowerCase(), l2 = o2 in n2 || "onFocusOut" == l2 || "onFocusIn" == l2 ? o2.slice(2) : l2.slice(2), n2.l || (n2.l = {}), n2.l[l2 + r2] = u3, u3 ? t2 ? u3.u = t2.u : (u3.u = c, n2.addEventListener(l2, r2 ? a : s, r2)) : n2.removeEventListener(l2, r2 ? a : s, r2);
    else {
      if ("http://www.w3.org/2000/svg" == i3) l2 = l2.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
      else if ("width" != l2 && "height" != l2 && "href" != l2 && "list" != l2 && "form" != l2 && "tabIndex" != l2 && "download" != l2 && "rowSpan" != l2 && "colSpan" != l2 && "role" != l2 && "popover" != l2 && l2 in n2) try {
        n2[l2] = null == u3 ? "" : u3;
        break n;
      } catch (n3) {
      }
      "function" == typeof u3 || (null == u3 || false === u3 && "-" != l2[4] ? n2.removeAttribute(l2) : n2.setAttribute(l2, "popover" == l2 && 1 == u3 ? "" : u3));
    }
  }
  function F(n2) {
    return function(u3) {
      if (this.l) {
        var t2 = this.l[u3.type + n2];
        if (null == u3.t) u3.t = c++;
        else if (u3.t < t2.u) return;
        return t2(l.event ? l.event(u3) : u3);
      }
    };
  }
  function O(n2, u3, t2, i3, r2, o2, e2, f3, c2, s2) {
    var a2, h2, p2, v2, y2, _2, m2, b, S2, C2, M2, $2, P2, A2, H, L2, T2, j2 = u3.type;
    if (null != u3.constructor) return null;
    128 & t2.__u && (c2 = !!(32 & t2.__u), o2 = [f3 = u3.__e = t2.__e]), (a2 = l.__b) && a2(u3);
    n: if ("function" == typeof j2) try {
      if (b = u3.props, S2 = "prototype" in j2 && j2.prototype.render, C2 = (a2 = j2.contextType) && i3[a2.__c], M2 = a2 ? C2 ? C2.props.value : a2.__ : i3, t2.__c ? m2 = (h2 = u3.__c = t2.__c).__ = h2.__E : (S2 ? u3.__c = h2 = new j2(b, M2) : (u3.__c = h2 = new x(b, M2), h2.constructor = j2, h2.render = E), C2 && C2.sub(h2), h2.props = b, h2.state || (h2.state = {}), h2.context = M2, h2.__n = i3, p2 = h2.__d = true, h2.__h = [], h2._sb = []), S2 && null == h2.__s && (h2.__s = h2.state), S2 && null != j2.getDerivedStateFromProps && (h2.__s == h2.state && (h2.__s = d({}, h2.__s)), d(h2.__s, j2.getDerivedStateFromProps(b, h2.__s))), v2 = h2.props, y2 = h2.state, h2.__v = u3, p2) S2 && null == j2.getDerivedStateFromProps && null != h2.componentWillMount && h2.componentWillMount(), S2 && null != h2.componentDidMount && h2.__h.push(h2.componentDidMount);
      else {
        if (S2 && null == j2.getDerivedStateFromProps && b !== v2 && null != h2.componentWillReceiveProps && h2.componentWillReceiveProps(b, M2), !h2.__e && null != h2.shouldComponentUpdate && false === h2.shouldComponentUpdate(b, h2.__s, M2) || u3.__v == t2.__v) {
          for (u3.__v != t2.__v && (h2.props = b, h2.state = h2.__s, h2.__d = false), u3.__e = t2.__e, u3.__k = t2.__k, u3.__k.some(function(n3) {
            n3 && (n3.__ = u3);
          }), $2 = 0; $2 < h2._sb.length; $2++) h2.__h.push(h2._sb[$2]);
          h2._sb = [], h2.__h.length && e2.push(h2);
          break n;
        }
        null != h2.componentWillUpdate && h2.componentWillUpdate(b, h2.__s, M2), S2 && null != h2.componentDidUpdate && h2.__h.push(function() {
          h2.componentDidUpdate(v2, y2, _2);
        });
      }
      if (h2.context = M2, h2.props = b, h2.__P = n2, h2.__e = false, P2 = l.__r, A2 = 0, S2) {
        for (h2.state = h2.__s, h2.__d = false, P2 && P2(u3), a2 = h2.render(h2.props, h2.state, h2.context), H = 0; H < h2._sb.length; H++) h2.__h.push(h2._sb[H]);
        h2._sb = [];
      } else do {
        h2.__d = false, P2 && P2(u3), a2 = h2.render(h2.props, h2.state, h2.context), h2.state = h2.__s;
      } while (h2.__d && ++A2 < 25);
      h2.state = h2.__s, null != h2.getChildContext && (i3 = d(d({}, i3), h2.getChildContext())), S2 && !p2 && null != h2.getSnapshotBeforeUpdate && (_2 = h2.getSnapshotBeforeUpdate(v2, y2)), L2 = a2, null != a2 && a2.type === k && null == a2.key && (L2 = V(a2.props.children)), f3 = I(n2, w(L2) ? L2 : [L2], u3, t2, i3, r2, o2, e2, f3, c2, s2), h2.base = u3.__e, u3.__u &= -161, h2.__h.length && e2.push(h2), m2 && (h2.__E = h2.__ = null);
    } catch (n3) {
      if (u3.__v = null, c2 || null != o2) if (n3.then) {
        for (u3.__u |= c2 ? 160 : 128; f3 && 8 == f3.nodeType && f3.nextSibling; ) f3 = f3.nextSibling;
        o2[o2.indexOf(f3)] = null, u3.__e = f3;
      } else {
        for (T2 = o2.length; T2--; ) g(o2[T2]);
        z(u3);
      }
      else u3.__e = t2.__e, u3.__k = t2.__k, n3.then || z(u3);
      l.__e(n3, u3, t2);
    }
    else null == o2 && u3.__v == t2.__v ? (u3.__k = t2.__k, u3.__e = t2.__e) : f3 = u3.__e = q(t2.__e, u3, t2, i3, r2, o2, e2, c2, s2);
    return (a2 = l.diffed) && a2(u3), 128 & u3.__u ? void 0 : f3;
  }
  function z(n2) {
    n2 && n2.__c && (n2.__c.__e = true), n2 && n2.__k && n2.__k.forEach(z);
  }
  function N(n2, u3, t2) {
    for (var i3 = 0; i3 < t2.length; i3++) B(t2[i3], t2[++i3], t2[++i3]);
    l.__c && l.__c(u3, n2), n2.some(function(u4) {
      try {
        n2 = u4.__h, u4.__h = [], n2.some(function(n3) {
          n3.call(u4);
        });
      } catch (n3) {
        l.__e(n3, u4.__v);
      }
    });
  }
  function V(n2) {
    return "object" != typeof n2 || null == n2 || n2.__b && n2.__b > 0 ? n2 : w(n2) ? n2.map(V) : d({}, n2);
  }
  function q(u3, t2, i3, r2, o2, e2, f3, c2, s2) {
    var a2, h2, v2, y2, d2, _2, m2, b = i3.props, k2 = t2.props, x2 = t2.type;
    if ("svg" == x2 ? o2 = "http://www.w3.org/2000/svg" : "math" == x2 ? o2 = "http://www.w3.org/1998/Math/MathML" : o2 || (o2 = "http://www.w3.org/1999/xhtml"), null != e2) {
      for (a2 = 0; a2 < e2.length; a2++) if ((d2 = e2[a2]) && "setAttribute" in d2 == !!x2 && (x2 ? d2.localName == x2 : 3 == d2.nodeType)) {
        u3 = d2, e2[a2] = null;
        break;
      }
    }
    if (null == u3) {
      if (null == x2) return document.createTextNode(k2);
      u3 = document.createElementNS(o2, x2, k2.is && k2), c2 && (l.__m && l.__m(t2, e2), c2 = false), e2 = null;
    }
    if (null == x2) b === k2 || c2 && u3.data == k2 || (u3.data = k2);
    else {
      if (e2 = e2 && n.call(u3.childNodes), b = i3.props || p, !c2 && null != e2) for (b = {}, a2 = 0; a2 < u3.attributes.length; a2++) b[(d2 = u3.attributes[a2]).name] = d2.value;
      for (a2 in b) if (d2 = b[a2], "children" == a2) ;
      else if ("dangerouslySetInnerHTML" == a2) v2 = d2;
      else if (!(a2 in k2)) {
        if ("value" == a2 && "defaultValue" in k2 || "checked" == a2 && "defaultChecked" in k2) continue;
        j(u3, a2, null, d2, o2);
      }
      for (a2 in k2) d2 = k2[a2], "children" == a2 ? y2 = d2 : "dangerouslySetInnerHTML" == a2 ? h2 = d2 : "value" == a2 ? _2 = d2 : "checked" == a2 ? m2 = d2 : c2 && "function" != typeof d2 || b[a2] === d2 || j(u3, a2, d2, b[a2], o2);
      if (h2) c2 || v2 && (h2.__html == v2.__html || h2.__html == u3.innerHTML) || (u3.innerHTML = h2.__html), t2.__k = [];
      else if (v2 && (u3.innerHTML = ""), I("template" == t2.type ? u3.content : u3, w(y2) ? y2 : [y2], t2, i3, r2, "foreignObject" == x2 ? "http://www.w3.org/1999/xhtml" : o2, e2, f3, e2 ? e2[0] : i3.__k && S(i3, 0), c2, s2), null != e2) for (a2 = e2.length; a2--; ) g(e2[a2]);
      c2 || (a2 = "value", "progress" == x2 && null == _2 ? u3.removeAttribute("value") : null != _2 && (_2 !== u3[a2] || "progress" == x2 && !_2 || "option" == x2 && _2 != b[a2]) && j(u3, a2, _2, b[a2], o2), a2 = "checked", null != m2 && m2 != u3[a2] && j(u3, a2, m2, b[a2], o2));
    }
    return u3;
  }
  function B(n2, u3, t2) {
    try {
      if ("function" == typeof n2) {
        var i3 = "function" == typeof n2.__u;
        i3 && n2.__u(), i3 && null == u3 || (n2.__u = n2(u3));
      } else n2.current = u3;
    } catch (n3) {
      l.__e(n3, t2);
    }
  }
  function D(n2, u3, t2) {
    var i3, r2;
    if (l.unmount && l.unmount(n2), (i3 = n2.ref) && (i3.current && i3.current != n2.__e || B(i3, null, u3)), null != (i3 = n2.__c)) {
      if (i3.componentWillUnmount) try {
        i3.componentWillUnmount();
      } catch (n3) {
        l.__e(n3, u3);
      }
      i3.base = i3.__P = null;
    }
    if (i3 = n2.__k) for (r2 = 0; r2 < i3.length; r2++) i3[r2] && D(i3[r2], u3, t2 || "function" != typeof n2.type);
    t2 || g(n2.__e), n2.__c = n2.__ = n2.__e = void 0;
  }
  function E(n2, l2, u3) {
    return this.constructor(n2, u3);
  }
  function G(u3, t2, i3) {
    var r2, o2, e2, f3;
    t2 == document && (t2 = document.documentElement), l.__ && l.__(u3, t2), o2 = (r2 = "function" == typeof i3) ? null : i3 && i3.__k || t2.__k, e2 = [], f3 = [], O(t2, u3 = (!r2 && i3 || t2).__k = _(k, null, [u3]), o2 || p, p, t2.namespaceURI, !r2 && i3 ? [i3] : o2 ? null : t2.firstChild ? n.call(t2.childNodes) : null, e2, !r2 && i3 ? i3 : o2 ? o2.__e : t2.firstChild, r2, f3), N(e2, u3, f3);
  }
  n = v.slice, l = { __e: function(n2, l2, u3, t2) {
    for (var i3, r2, o2; l2 = l2.__; ) if ((i3 = l2.__c) && !i3.__) try {
      if ((r2 = i3.constructor) && null != r2.getDerivedStateFromError && (i3.setState(r2.getDerivedStateFromError(n2)), o2 = i3.__d), null != i3.componentDidCatch && (i3.componentDidCatch(n2, t2 || {}), o2 = i3.__d), o2) return i3.__E = i3;
    } catch (l3) {
      n2 = l3;
    }
    throw n2;
  } }, u = 0, t = function(n2) {
    return null != n2 && null == n2.constructor;
  }, x.prototype.setState = function(n2, l2) {
    var u3;
    u3 = null != this.__s && this.__s != this.state ? this.__s : this.__s = d({}, this.state), "function" == typeof n2 && (n2 = n2(d({}, u3), this.props)), n2 && d(u3, n2), null != n2 && this.__v && (l2 && this._sb.push(l2), M(this));
  }, x.prototype.forceUpdate = function(n2) {
    this.__v && (this.__e = true, n2 && this.__h.push(n2), M(this));
  }, x.prototype.render = k, i = [], o = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, e = function(n2, l2) {
    return n2.__v.__b - l2.__v.__b;
  }, $.__r = 0, f = /(PointerCapture)$|Capture$/i, c = 0, s = F(false), a = F(true), h = 0;

  // node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js
  var f2 = 0;
  var i2 = Array.isArray;
  function u2(e2, t2, n2, o2, i3, u3) {
    t2 || (t2 = {});
    var a2, c2, p2 = t2;
    if ("ref" in p2) for (c2 in p2 = {}, t2) "ref" == c2 ? a2 = t2[c2] : p2[c2] = t2[c2];
    var l2 = { type: e2, props: p2, key: n2, ref: a2, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --f2, __i: -1, __u: 0, __source: i3, __self: u3 };
    if ("function" == typeof e2 && (a2 = e2.defaultProps)) for (c2 in a2) void 0 === p2[c2] && (p2[c2] = a2[c2]);
    return l.vnode && l.vnode(l2), l2;
  }

  // src/overviewComponent.tsx
  var escapeHtml = (s2) => s2.replace(/</g, "&lt;");
  var OverviewTable = ({ mrs, options: options2 }) => {
    return /* @__PURE__ */ u2(k, { children: [
      "PATATE",
      /* @__PURE__ */ u2("table", { style: "border-collapse:collapse;min-width:680px;width:100%", children: [
        /* @__PURE__ */ u2("thead", { children: /* @__PURE__ */ u2("tr", { children: [
          /* @__PURE__ */ u2("th", { style: "text-align:left;padding:6px 8px;border-bottom:2px solid #444", children: "Title" }),
          /* @__PURE__ */ u2("th", { style: "text-align:left;padding:6px 8px;border-bottom:2px solid #444", children: "Author" }),
          /* @__PURE__ */ u2("th", { style: "text-align:left;padding:6px 8px;border-bottom:2px solid #444", children: "Tags" }),
          /* @__PURE__ */ u2("th", { style: "text-align:left;padding:6px 8px;border-bottom:2px solid #444", children: "Badge" })
        ] }) }),
        /* @__PURE__ */ u2("tbody", { children: mrs.map((mr) => {
          const tags = getTags(mr);
          const mine = isMrMine(mr, options2);
          const badge = getBadge(mine, tags);
          return /* @__PURE__ */ u2("tr", { children: [
            /* @__PURE__ */ u2("td", { style: "vertical-align:top;padding:4px 8px;border-top:1px solid #ddd", children: [
              /* @__PURE__ */ u2("a", { href: mr.web_url, target: "_blank", style: "text-decoration:none;color:#1f78d1", children: escapeHtml(mr.title) }),
              /* @__PURE__ */ u2("div", { style: "opacity:.6;font-size:11px", children: [
                mr.source_branch,
                " \u2192 ",
                mr.target_branch
              ] })
            ] }),
            /* @__PURE__ */ u2("td", { style: "vertical-align:top;padding:4px 8px;border-top:1px solid #ddd", children: mr.author?.name }),
            /* @__PURE__ */ u2("td", { style: "vertical-align:top;padding:4px 8px;border-top:1px solid #ddd", children: tags.length ? tags.map((t2) => /* @__PURE__ */ u2("span", { dangerouslySetInnerHTML: { __html: displayBadge(t2, mine) } })) : /* @__PURE__ */ u2("span", { dangerouslySetInnerHTML: { __html: displayBadge("can_be_merged" /* CAN_BE_MERGED */, mine) } }) }),
            /* @__PURE__ */ u2("td", { style: "vertical-align:top;padding:4px 8px;border-top:1px solid #ddd", children: /* @__PURE__ */ u2("span", { style: `background:${colors[badge]};padding:2px 6px;border-radius:4px;border:1px solid #000;`, children: badge }) })
          ] }, mr.id);
        }) })
      ] })
    ] });
  };
  var mountOverview = (container, allMr, options2) => {
    G(/* @__PURE__ */ u2(OverviewTable, { mrs: allMr, options: options2 }), container);
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
    for (let i3 = 0; i3 < mergeRequests.length; i3++) {
      const href = mergeRequests[i3].getAttribute("href");
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
    const humanDiscussions = discussions.filter((d2) => !d2.individual_note);
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
    const requiredResolvers = approval.approved_by.filter((u3) => !options.facultativeApprovers.includes(u3.user.username));
    const allResolved = requiredResolvers.length >= needed;
    const approvedByMe = !!approval.approved_by.find((u3) => u3.user.username === options.username);
    if (!allResolved) {
      if (!approvedByMe && !isMrMine(mr, options)) {
        addTag(mr, "not_approved_by_me" /* NOT_APPROVED_BY_ME */);
      }
      addTag(mr, "missing_approvals" /* MISSING_APPROVALS */);
    }
    const color = allResolved ? colors["done" /* DONE */] : isMrMine(mr, options) || approvedByMe ? colors["wait" /* WAIT */] : colors["actions" /* ACTIONS */];
    const allAvatars = approval.approved_by.map((u3) => `<span class="author-link has-tooltip" title="Approved by ${u3.user.name}" data-container="body" data-qa-selector="assignee_link" data-original-title="Approved by ${u3.user.name}" aria-describedby="gl-tooltip5">
<img width="16" class="avatar avatar-inline s16 js-lazy-loaded" alt="" src="${u3.user.avatar_url}" loading="lazy" data-qa_selector="js_lazy_loaded_content">
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
    page.id = "git-buster-page";
    page.style.minHeight = "calc(100vh - 60px)";
    page.style.padding = "24px";
    page.style.color = "var(--gl-text-color, #222)";
    page.style.fontFamily = "var(--gl-font-family, system-ui, sans-serif)";
    page.innerHTML = `<h1 style="margin-top:0;">Git Buster Overview</h1>
    <p style="max-width:720px">Synthetic page injected by the extension. It summarizes merge requests visible on the current list.</p>
    <div id="git-buster-overview" style="margin-top:20px;font-size:13px;line-height:18px"></div>
    <div style="margin-top:32px;font-size:12px;opacity:.7">Base URL: ${options.baseUrl}</div>`;
    const containerTarget = document.querySelector(".content-wrapper") || document.body;
    containerTarget.appendChild(page);
    try {
      const allMr = await getAllMr();
      await Promise.all(allMr.filter((mr) => !isOld(mr, options.ignoreAfterMonth) && (!options.skipDrafts || !mr.draft)).map((mr) => processMr(mr)));
      const overviewElem = page.querySelector("#git-buster-overview");
      mountOverview(overviewElem, allMr, options);
    } catch (e2) {
      const overviewElem = page.querySelector("#git-buster-overview");
      overviewElem.innerHTML = `<div style="color:#ec5941">Failed to build overview: ${e2.message}</div>`;
      console.error("[git-buster] overview error", e2);
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
    item.addEventListener("click", (e2) => {
      e2.preventDefault();
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
    document.addEventListener("keydown", (e2) => {
      if (e2.ctrlKey && !e2.altKey && !e2.shiftKey && e2.key.toLowerCase() === "q") {
        if (isEditableTarget(e2.target)) {
          return;
        }
        e2.preventDefault();
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
