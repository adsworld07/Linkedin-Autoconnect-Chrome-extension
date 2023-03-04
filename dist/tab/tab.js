function ee(e, t) {
  for (let r in e)
    t(e[r], r);
}
function R(e, t) {
  e.forEach(t);
}
function $(e, t) {
  if (!e)
    throw Error(t);
}
function K({ node: e = [], from: t, source: r, parent: n = t || r, to: o, target: a, child: i = o || a, scope: d = {}, meta: p = {}, family: f = { type: "regular" }, regional: g } = {}) {
  let h = be(n), m = be(f.links), c = be(f.owners), l = [];
  R(e, (u) => u && O(l, u));
  let s = { id: Yt(), seq: l, next: be(i), meta: p, scope: d, family: { type: f.type || "crosslink", links: m, owners: c } };
  return R(m, (u) => O(ze(u), s)), R(c, (u) => O(je(u), s)), R(h, (u) => O(u.next, s)), g && ce && de(ve(ce), [s]), s;
}
function ne(e, t, r) {
  let n, o = W, a = null, i = P;
  if (e.target && (t = e.params, r = e.defer, n = e.meta, o = "page" in e ? e.page : o, e.stack && (a = e.stack), i = Q(e) || i, e = e.target), i && P && i !== P && (P = null), Array.isArray(e))
    for (let l = 0; l < e.length; l++)
      Z("pure", o, F(e[l]), a, t[l], i, n);
  else
    Z("pure", o, F(e), a, t, i, n);
  if (r && !xe)
    return;
  let d, p, f, g, h, m, c = { isRoot: xe, currentPage: W, scope: P, isWatch: $e, isPure: Be };
  xe = 0;
  e:
    for (; g = nr(); ) {
      let { idx: l, stack: s, type: u } = g;
      f = s.node, W = h = s.page, P = Q(s), h ? m = h.reg : P && (m = P.reg);
      let S = !!h, b = !!P, C = { fail: 0, scope: f.scope };
      d = p = 0;
      for (let v = l; v < f.seq.length && !d; v++) {
        let y = f.seq[v];
        if (y.order) {
          let { priority: k, barrierID: w } = y.order, x = w ? h ? `${h.fullID}_${w}` : w : 0;
          if (v !== l || u !== k) {
            w ? Ee.has(x) || (Ee.add(x), He(v, s, k, w)) : He(v, s, k);
            continue e;
          }
          w && Ee.delete(x);
        }
        switch (y.type) {
          case "mov": {
            let w, x = y.data;
            switch (x.from) {
              case oe:
                w = ve(s);
                break;
              case "a":
              case "b":
                w = s[x.from];
                break;
              case "value":
                w = x.store;
                break;
              case "store":
                if (m && !m[x.store.id])
                  if (S) {
                    let De = Pt(h, x.store.id);
                    s.page = h = De, De ? m = De.reg : b ? (pe(P, x.store, 0, 1, x.softRead), m = P.reg) : m = void 0;
                  } else
                    b && pe(P, x.store, 0, 1, x.softRead);
                w = ke(m && m[x.store.id] || x.store);
            }
            switch (x.to) {
              case oe:
                s.value = w;
                break;
              case "a":
              case "b":
                s[x.to] = w;
                break;
              case "store":
                ar(h, P, f, x.target).current = w;
            }
            break;
          }
          case "compute":
            let k = y.data;
            if (k.fn) {
              $e = B(f, "op") === "watch", Be = k.pure;
              let w = k.safe ? (0, k.fn)(ve(s), C.scope, s) : lr(C, k.fn, s);
              k.filter ? p = !w : s.value = w, $e = c.isWatch, Be = c.isPure;
            }
        }
        d = C.fail || p;
      }
      if (!d) {
        let v = ve(s), y = Q(s);
        if (R(f.next, (k) => {
          Z("child", h, k, s, v, y);
        }), y) {
          B(f, "needFxCounter") && Z("child", h, y.fxCount, s, v, y), B(f, "storeChange") && Z("child", h, y.storeChange, s, v, y), B(f, "warnSerialize") && Z("child", h, y.warnSerializeNode, s, v, y);
          let k = y.additionalLinks[f.id];
          k && R(k, (w) => {
            Z("child", h, w, s, v, y);
          });
        }
      }
    }
  xe = c.isRoot, W = c.currentPage, P = Q(c);
}
function ht(e, t = "combine") {
  let r = t + "(", n = "", o = 0;
  return ee(e, (a) => {
    o < 25 && (a != null && (r += n, r += H(a) ? Ye(a).fullName : a.toString()), o += 1, n = ", ");
  }), r + ")";
}
function yt(e, t) {
  let r, n, o = e;
  if (t) {
    let a = Ye(t);
    e.length === 0 ? (r = a.path, n = a.fullName) : (r = a.path.concat([e]), n = a.fullName.length === 0 ? e : a.fullName + "/" + e);
  } else
    r = e.length === 0 ? [] : [e], n = e;
  return { shortName: o, fullName: n, path: r };
}
function le(e, t) {
  let r = t ? e : e[0];
  St(r);
  let n = r.or, o = r.and;
  if (o) {
    let a = t ? o : o[0];
    if (T(a) && "and" in a) {
      let i = le(o, t);
      e = i[0], n = { ...n, ...i[1] };
    } else
      e = o;
  }
  return [e, n];
}
function q(e, ...t) {
  let r = kt();
  if (r) {
    let n = r.handlers[e];
    if (n)
      return n(r, ...t);
  }
}
function A(e, t) {
  let r = me({ or: t, and: typeof e == "string" ? { name: e } : e }), n = (i, ...d) => (ae(!B(n, "derived"), "call of derived event", "createEvent"), ae(!Be, "unit call from pure function", "operators like sample"), W ? ((p, f, g, h) => {
    let m = W, c = null;
    if (f)
      for (c = W; c && c.template !== f; )
        c = J(c);
    pt(c);
    let l = p.create(g, h);
    return pt(m), l;
  })(n, o, i, d) : n.create(i, d)), o = kt(), a = Object.assign(n, { graphite: K({ meta: Nt("event", n, r), regional: 1 }), create: (i) => (ne({ target: n, params: i, scope: P }), i), watch: (i) => At(n, i), map: (i) => Te(n, ue, i, [L()]), filter: (i) => Te(n, "filter", i.fn ? i : i.fn, [L(et, 1)]), filterMap: (i) => Te(n, "filterMap", i, [L(), D((d) => !j(d), 1)]), prepend(i) {
    let d = A("* → " + n.shortName, { parent: J(n) });
    return q("eventPrepend", F(d)), Y(d, n, [L()], "prepend", i), xt(n, d), d;
  } });
  return r != null && r.domain && r.domain.hooks.event(a), a;
}
function ct(e, t, r, n) {
  return fe(r, t, "first argument"), $(M(n), "second argument should be a function"), ae(!B(e, "derived"), `${t} in derived store`, `${t} in store created via createStore`), R(Array.isArray(r) ? r : [r], (o) => {
    e.off(o), Me(e).set(o, nt($t(o, e, "on", tr, n)));
  }), e;
}
function G(e, t) {
  let r = me(t), n = ie(e), o = A({ named: "updates", derived: 1 });
  q("storeBase", n);
  let a = n.id, i = { subscribers: /* @__PURE__ */ new Map(), updates: o, defaultState: e, stateRef: n, getState() {
    let l, s = n;
    if (W) {
      let u = W;
      for (; u && !u.reg[a]; )
        u = J(u);
      u && (l = u);
    }
    return !l && P && (pe(P, n, 1), l = P), l && (s = l.reg[a]), ke(s);
  }, setState: (l) => ne({ target: i, params: l, defer: 1, scope: P }), reset: (...l) => (R(l, (s) => ct(i, ".reset", s, () => i.defaultState)), i), on: (l, s) => ct(i, ".on", l, s), off(l) {
    let s = Me(i).get(l);
    return s && (s(), Me(i).delete(l)), i;
  }, map(l, s) {
    let u, S;
    T(l) && (u = l, l = l.fn), ae(j(s), "second argument of store.map", "updateFilter");
    let b = i.getState();
    j(b) || (S = l(b, s));
    let C = G(S, { name: `${i.shortName} → *`, derived: 1, and: u }), v = $t(i, C, ue, Ve, l);
    return Re(z(C), { type: ue, fn: l, from: n }), z(C).noInit = 1, q("storeMap", n, v), C;
  }, watch(l, s) {
    if (!s || !H(l)) {
      let u = At(i, l);
      return q("storeWatch", n, l) || l(i.getState()), u;
    }
    return $(M(s), "second argument should be a function"), l.watch((u) => s(i.getState(), u));
  } }, d = Nt("store", i, r), p = i.defaultConfig.updateFilter;
  i.graphite = K({ scope: { state: n, fn: p }, node: [D((l, s, u) => (u.scope && !u.scope.reg[n.id] && (u.b = 1), l)), V(n), D((l, s, { a: u, b: S }) => !j(l) && (l !== u || S), 1), p && L(Ve, 1), I({ from: oe, target: n })], child: o, meta: d, regional: 1 });
  let f = B(i, "serialize"), g = B(i, "derived"), h = f === "ignore", m = !f || h ? 0 : f, c = B(i, "sid");
  return c && (te(i, "storeChange", 1), n.sid = c, m && (n.meta = { ...n == null ? void 0 : n.meta, serialize: m })), c || h || g || te(i, "warnSerialize", 1), $(g || !j(e), "current state can't be undefined, use null instead"), de(i, [o]), r != null && r.domain && r.domain.hooks.store(i), g || (i.reinit = A(), i.reset(i.reinit)), i;
}
function we(...e) {
  let t, r, n;
  [e, n] = le(e);
  let o, a, i, d = e[e.length - 1];
  if (M(d) ? (r = e.slice(0, -1), t = d) : r = e, r.length === 1) {
    let p = r[0];
    _(p) || (o = p, a = 1);
  }
  if (!a && (o = r, t)) {
    i = 1;
    let p = t;
    t = (f) => p(...f);
  }
  return $(T(o), "shape should be an object"), cr(Array.isArray(o), !i, o, n, t);
}
function Vt() {
  let e = {};
  return e.req = new Promise((t, r) => {
    e.rs = t, e.rj = r;
  }), e.req.catch(() => {
  }), e;
}
function E(e, t) {
  let r = me(M(e) ? { handler: e } : e, t), n = A(M(e) ? { handler: e } : e, t), o = F(n);
  te(o, "op", n.kind = "effect"), n.use = (c) => ($(M(c), ".use argument should be a function"), g.scope.handler = c, n), n.use.getCurrent = () => g.scope.handler;
  let a = n.finally = A({ named: "finally", derived: 1 }), i = n.done = a.filterMap({ named: "done", fn({ status: c, params: l, result: s }) {
    if (c === "done")
      return { params: l, result: s };
  } }), d = n.fail = a.filterMap({ named: "fail", fn({ status: c, params: l, error: s }) {
    if (c === "fail")
      return { params: l, error: s };
  } }), p = n.doneData = i.map({ named: "doneData", fn: ({ result: c }) => c }), f = n.failData = d.map({ named: "failData", fn: ({ error: c }) => c }), g = K({ scope: { handlerId: B(o, "sid"), handler: n.defaultConfig.handler || (() => $(0, `no handler used in ${n.getType()}`)) }, node: [D((c, l, s) => {
    let u = l, S = u.handler;
    if (Q(s)) {
      let b = Q(s).handlers[u.handlerId];
      b && (S = b);
    }
    return c.handler = S, c;
  }, 0, 1), D(({ params: c, req: l, handler: s, args: u = [c] }, S, b) => {
    let C = Mt(b), v = qe(c, l, 1, a, b, C), y = qe(c, l, 0, a, b, C), [k, w] = Bt(s, y, u);
    k && (T(w) && M(w.then) ? w.then(v, y) : v(w));
  }, 0, 1)], meta: { op: "fx", fx: "runner" } });
  o.scope.runner = g, O(o.seq, D((c, { runner: l }, s) => {
    let u = J(s) ? { params: c, req: { rs(S) {
    }, rj(S) {
    } } } : c;
    return s.meta || (s.meta = { fxID: Zt() }), ne({ target: l, params: u, defer: 1, scope: Q(s), meta: s.meta }), u.params;
  }, 0, 1)), n.create = (c) => {
    let l = Vt(), s = { params: c, req: l };
    if (P && !$e) {
      let u = P;
      l.req.finally(() => {
        or(u);
      }).catch(() => {
      });
    }
    return ne({ target: n, params: s, scope: P }), l.req;
  };
  let h = n.inFlight = G(0, { serialize: "ignore" }).on(n, (c) => c + 1).on(a, (c) => c - 1).map({ fn: (c) => c, named: "inFlight" });
  te(a, "needFxCounter", "dec"), te(n, "needFxCounter", 1);
  let m = n.pending = h.map({ fn: (c) => c > 0, named: "pending" });
  return de(n, [a, i, d, p, f, m, h]), r != null && r.domain && r.domain.hooks.effect(n), n;
}
function Ht(e) {
  let t;
  [e, t] = le(e, 1);
  let { source: r, effect: n, mapParams: o } = e, a = E(e, t);
  te(a, "attached", 1);
  let i, { runner: d } = F(a).scope, p = D((g, h, m) => {
    let c, { params: l, req: s, handler: u } = g, S = a.finally, b = Mt(m), C = qe(l, s, 0, S, m, b), v = m.a, y = We(u), k = 1;
    if (o ? [k, c] = Bt(o, C, [l, v]) : c = r && y ? v : l, k) {
      if (!y)
        return g.args = [v, c], 1;
      ne({ target: u, params: { params: c, req: { rs: qe(l, s, 1, S, m, b), rj: C } }, page: m.page, defer: 1, meta: m.meta });
    }
  }, 1, 1);
  if (r) {
    let g;
    _(r) ? (g = r, de(g, [a])) : (g = we(r), de(a, [g])), i = [V(z(g)), p];
  } else
    i = [p];
  d.seq.splice(1, 0, ...i), a.use(n);
  let f = J(n);
  return f && (Object.assign(Ye(a), yt(a.shortName, f)), a.defaultConfig.parent = f), xt(n, a, "effect"), a;
}
function Gt(e, t) {
  fe(e, "merge", "first argument");
  let r = A({ name: ht(e, "merge"), derived: 1, and: t });
  return Y(e, r, [], "merge"), r;
}
function bt(e, t) {
  let r = 0;
  return R(dr, (n) => {
    n in e && ($(e[n] != null, Rt(t, n)), r = 1);
  }), r;
}
function U(...e) {
  let t, r, n, o, [[a, i, d], p] = le(e), f = 1;
  return j(i) && T(a) && bt(a, "sample") && (i = a.clock, d = a.fn, f = !a.greedy, o = a.filter, t = a.target, r = a.name, n = a.sid, a = a.source), ot("sample", i, a, o, t, d, r, p, f, 1, 0, n);
}
function X(...e) {
  let [[t, r], n] = le(e);
  return r || (r = t, t = r.source), bt(r, "guard"), ot("guard", r.clock, t, r.filter, r.target, null, r.name, n, !r.greedy, 0, 1);
}
function Qe(e, t, r) {
  if (_(e))
    return ae(0, "restore($store)"), e;
  if (Kt(e) || We(e)) {
    let o = J(e), a = G(t, { parent: o, name: e.shortName, and: r });
    return Y(We(e) ? e.doneData : e, a), o && o.hooks.store(a), a;
  }
  let n = Array.isArray(e) ? [] : {};
  return ee(e, (o, a) => n[a] = _(o) ? o : G(o, { name: a })), n;
}
function Xe(...e) {
  let t, r, n = "split", [[o, a], i] = le(e), d = !a;
  d && (t = o.cases, a = o.match, r = o.clock, o = o.source);
  let p = _(a), f = !H(a) && M(a), g = !p && !f && T(a);
  $(H(o), "source must be a unit"), t || (t = {}), d ? ee(t, (s, u) => Ze(n, s, `cases.${u}`)) : ($(g, "match should be an object"), ee(a, (s, u) => t[u] = A({ derived: 1, and: i })), t.__ = A({ derived: 1, and: i }));
  let h, m = new Set([].concat(o, r || [], Object.values(t))), c = Object.keys(p || f ? t : a);
  if (p || f)
    p && m.add(a), h = [p && V(z(a), 0, 1), Ue({ safe: p, filter: 1, pure: !p, fn(s, u, S) {
      let b = String(p ? S.a : a(s));
      Le(u, ut(c, b) ? b : "__", s, S);
    } })];
  else if (g) {
    let s = ie({});
    s.type = "shape";
    let u, S = [];
    ee(a, (b, C) => {
      if (H(b)) {
        u = 1, O(S, C), m.add(b);
        let v = Y(b, [], [V(s), D((y, k, { a: w }) => w[C] = y)]);
        if (_(b)) {
          s.current[C] = b.getState();
          let y = z(b);
          Re(s, { from: y, field: C, type: "field" }), q("splitMatchStore", y, v);
        }
      }
    }), u && q("splitBase", s), h = [u && V(s, 0, 1), L((b, C, v) => {
      for (let y = 0; y < c.length; y++) {
        let k = c[y];
        if (ut(S, k) ? v.a[k] : a[k](b))
          return void Le(C, k, b, v);
      }
      Le(C, "__", b, v);
    }, 1)];
  } else
    $(0, "expect match to be unit, function or object");
  let l = K({ meta: { op: n }, parent: r ? [] : o, scope: t, node: h, family: { owners: Array.from(m) }, regional: 1 });
  if (r && ot(n, r, o, null, l, null, n, i, 0, 0, 0), !d)
    return t;
}
let Jt = typeof Symbol < "u" && Symbol.observable || "@@observable", ue = "map", oe = "stack", F = (e) => e.graphite || e, ze = (e) => e.family.owners, je = (e) => e.family.links, z = (e) => e.stateRef, ve = (e) => e.value, Me = (e) => e.subscribers, J = (e) => e.parent, Q = (e) => e.scope, B = (e, t) => F(e).meta[t], te = (e, t, r) => F(e).meta[t] = r, Ye = (e) => e.compositeName, H = (e) => (M(e) || T(e)) && "kind" in e;
const Fe = (e) => (t) => H(t) && t.kind === e;
let _ = Fe("store"), Kt = Fe("event"), We = Fe("effect"), Qt = Fe("domain"), ut = (e, t) => e.includes(t), Ne = (e, t) => {
  let r = e.indexOf(t);
  r !== -1 && e.splice(r, 1);
}, O = (e, t) => e.push(t), ae = (e, t, r) => !e && console.error(`${t} is deprecated${r ? `, use ${r} instead` : ""}`);
const _e = () => {
  let e = 0;
  return () => "" + ++e;
};
let Xt = _e(), vt = _e(), Yt = _e(), Zt = _e(), ce = null, kt = () => ce, er = (e) => (e && ce && ce.sidRoot && (e = `${ce.sidRoot}|${e}`), e), de = (e, t) => {
  let r = F(e);
  R(t, (n) => {
    let o = F(n);
    r.family.type !== "domain" && (o.family.type = "crosslink"), O(ze(o), r), O(je(r), o);
  });
}, be = (e = []) => (Array.isArray(e) ? e : [e]).flat().map(F), T = (e) => typeof e == "object" && e !== null, M = (e) => typeof e == "function", j = (e) => e === void 0, St = (e) => $(T(e) || M(e), "expect first argument be an object");
const dt = (e, t, r, n) => $(!(!T(e) && !M(e) || !("family" in e) && !("graphite" in e)), `${t}: expect ${r} to be a unit (store, event or effect)${n}`);
let fe = (e, t, r) => {
  Array.isArray(e) ? R(e, (n, o) => dt(n, t, `${o} item of ${r}`, "")) : dt(e, t, r, " or array of units");
}, Ze = (e, t, r = "target") => R(be(t), (n) => ae(!B(n, "derived"), `${e}: derived unit in "${r}"`, "createEvent/createStore")), Ve = (e, { fn: t }, { a: r }) => t(e, r), tr = (e, { fn: t }, { a: r }) => t(r, e), et = (e, { fn: t }) => t(e);
const wt = (e, t, r, n) => {
  let o = { id: vt(), type: e, data: t };
  return r && (o.order = { priority: r }, n && (o.order.barrierID = ++rr)), o;
};
let rr = 0, I = ({ from: e = "store", store: t, target: r, to: n = r ? "store" : oe, batch: o, priority: a }) => wt("mov", { from: e, store: t, to: n, target: r }, a, o), Ue = ({ fn: e, batch: t, priority: r, safe: n = 0, filter: o = 0, pure: a = 0 }) => wt("compute", { fn: e, safe: n, filter: o, pure: a }, r, t), Ct = ({ fn: e }) => Ue({ fn: e, priority: "effect" }), D = (e, t, r) => Ue({ fn: e, safe: 1, filter: t, priority: r && "effect" }), V = (e, t, r) => I({ store: e, to: t ? oe : "a", priority: r && "sampler", batch: 1 }), L = (e = et, t) => Ue({ fn: e, pure: 1, filter: t }), ie = (e) => ({ id: vt(), current: e }), ke = ({ current: e }) => e, Re = (e, t) => {
  e.before || (e.before = []), O(e.before, t);
}, se = null;
const tt = (e, t) => {
  if (!e)
    return t;
  if (!t)
    return e;
  let r;
  return (e.v.type === t.v.type && e.v.id > t.v.id || Ge(e.v.type) > Ge(t.v.type)) && (r = e, e = t, t = r), r = tt(e.r, t), e.r = e.l, e.l = r, e;
}, rt = [];
let ft = 0;
for (; ft < 6; )
  O(rt, { first: null, last: null, size: 0 }), ft += 1;
const nr = () => {
  for (let e = 0; e < 6; e++) {
    let t = rt[e];
    if (t.size > 0) {
      if (e === 3 || e === 4) {
        t.size -= 1;
        let n = se.v;
        return se = tt(se.l, se.r), n;
      }
      t.size === 1 && (t.last = null);
      let r = t.first;
      return t.first = r.r, t.size -= 1, r.v;
    }
  }
}, Z = (e, t, r, n, o, a, i) => He(0, { a: null, b: null, node: r, parent: n, value: o, page: t, scope: a, meta: i }, e), He = (e, t, r, n = 0) => {
  let o = Ge(r), a = rt[o], i = { v: { idx: e, stack: t, type: r, id: n }, l: null, r: null };
  o === 3 || o === 4 ? se = tt(se, i) : (a.size === 0 ? a.first = i : a.last.r = i, a.last = i), a.size += 1;
}, Ge = (e) => {
  switch (e) {
    case "child":
      return 0;
    case "pure":
      return 1;
    case "read":
      return 2;
    case "barrier":
      return 3;
    case "sampler":
      return 4;
    case "effect":
      return 5;
    default:
      return -1;
  }
}, Ee = /* @__PURE__ */ new Set();
let P, xe = 1, $e = 0, Be = 0, W = null, or = (e) => {
  P = e;
}, pt = (e) => {
  W = e;
};
const Pt = (e, t) => {
  if (e) {
    for (; e && !e.reg[t]; )
      e = J(e);
    if (e)
      return e;
  }
  return null;
};
let ar = (e, t, r, n, o) => {
  let a = Pt(e, n.id);
  return a ? a.reg[n.id] : t ? (pe(t, n, o), t.reg[n.id]) : n;
};
const ir = (e) => e;
let pe = (e, t, r, n, o) => {
  var a;
  let i = e.reg, d = t.sid, p = t == null || (a = t.meta) === null || a === void 0 ? void 0 : a.serialize;
  if (i[t.id])
    return;
  let f = { id: t.id, current: t.current, meta: t.meta };
  if (d && d in e.sidValuesMap && !(d in e.sidIdMap))
    f.current = (e.fromSerialize && p !== "ignore" && (p == null ? void 0 : p.read) || ir)(e.sidValuesMap[d]);
  else if (t.before && !o) {
    let g = 0, h = r || !t.noInit || n;
    R(t.before, (m) => {
      switch (m.type) {
        case ue: {
          let c = m.from;
          if (c || m.fn) {
            c && pe(e, c, r, n);
            let l = c && i[c.id].current;
            h && (f.current = m.fn ? m.fn(l) : l);
          }
          break;
        }
        case "field":
          g || (g = 1, f.current = Array.isArray(f.current) ? [...f.current] : { ...f.current }), pe(e, m.from, r, n), h && (f.current[m.field] = i[i[m.from.id].id].current);
      }
    });
  }
  d && (e.sidIdMap[d] = t.id), i[t.id] = f;
};
const lr = (e, t, r) => {
  try {
    return t(ve(r), e.scope, r);
  } catch (n) {
    console.error(n), e.fail = 1;
  }
};
let me = (e, t = {}) => (T(e) && (me(e.or, t), ee(e, (r, n) => {
  j(r) || n === "or" || n === "and" || (t[n] = r);
}), me(e.and, t)), t);
const mt = (e, t) => {
  Ne(e.next, t), Ne(ze(e), t), Ne(je(e), t);
}, Je = (e, t, r) => {
  let n;
  e.next.length = 0, e.seq.length = 0, e.scope = null;
  let o = je(e);
  for (; n = o.pop(); )
    mt(n, e), (t || r && B(e, "op") !== "sample" || n.family.type === "crosslink") && Je(n, t, B(n, "op") !== "on" && r);
  for (o = ze(e); n = o.pop(); )
    mt(n, e), r && n.family.type === "crosslink" && Je(n, t, B(n, "op") !== "on" && r);
}, ye = (e) => e.clear();
let sr = (e, { deep: t } = {}) => {
  let r = 0;
  if (e.ownerSet && e.ownerSet.delete(e), _(e))
    ye(Me(e));
  else if (Qt(e)) {
    r = 1;
    let n = e.history;
    ye(n.events), ye(n.effects), ye(n.stores), ye(n.domains);
  }
  Je(F(e), !!t, r);
}, nt = (e) => {
  let t = () => sr(e);
  return t.unsubscribe = t, t;
}, Y = (e, t, r, n, o) => K({ node: r, parent: e, child: t, scope: { fn: o }, meta: { op: n }, family: { owners: [e, t], links: t }, regional: 1 }), Ce = (e) => {
  let t = "forward", [{ from: r, to: n }, o] = le(e, 1);
  return fe(r, t, '"from"'), fe(n, t, '"to"'), Ze(t, n, "to"), nt(K({ parent: r, child: n, meta: { op: t, config: o }, family: {}, regional: 1 }));
}, At = (e, t) => ($(M(t), ".watch argument should be a function"), nt(K({ scope: { fn: t }, node: [Ct({ fn: et })], parent: e, meta: { op: "watch" }, family: { owners: e }, regional: 1 }))), xt = (e, t, r = "event") => {
  J(e) && J(e).hooks[r](t);
}, Nt = (e, t, r) => {
  let n = me(r), o = e === "domain", a = Xt(), { sid: i = null, named: d = null, domain: p = null, parent: f = p } = n, g = d || n.name || (o ? "" : a), h = yt(g, f), m = { op: t.kind = e, name: t.shortName = g, sid: t.sid = er(i), named: d, unitId: t.id = a, serialize: n.serialize, derived: n.derived, config: n };
  return t.parent = f, t.compositeName = h, t.defaultConfig = n, t.thru = (c) => (ae(0, "thru", "js pipe"), c(t)), t.getType = () => h.fullName, !o && (t.subscribe = (c) => (St(c), t.watch(M(c) ? c : (l) => c.next && c.next(l))), t[Jt] = () => t), m;
};
const Te = (e, t, r, n) => {
  let o;
  T(r) && (o = r, r = r.fn);
  let a = A({ name: `${e.shortName} → *`, derived: 1, and: o });
  return Y(e, a, n, t, r), a;
}, $t = (e, t, r, n, o) => {
  let a = z(t), i = I({ store: a, to: "a", priority: "read" });
  r === ue && (i.data.softRead = 1);
  let d = [i, L(n)];
  return q("storeOnMap", a, d, _(e) && z(e)), Y(e, t, d, r, o);
}, cr = (e, t, r, n, o) => {
  let a = e ? (l) => [...l] : (l) => ({ ...l }), i = e ? [] : {}, d = a(i), p = ie(d), f = ie(1);
  p.type = e ? "list" : "shape", p.noInit = 1, q("combineBase", p, f);
  let g = G(d, { name: ht(r), derived: 1, and: n }), h = z(g);
  h.noInit = 1, te(g, "isCombine", 1);
  let m = V(p);
  m.order = { priority: "barrier" };
  let c = [D((l, s, u) => (u.scope && !u.scope.reg[p.id] && (u.c = 1), l)), m, I({ store: f, to: "b" }), D((l, { key: s }, u) => {
    if (u.c || l !== u.a[s])
      return t && u.b && (u.a = a(u.a)), u.a[s] = l, 1;
  }, 1), I({ from: "a", target: p }), I({ from: "value", store: 0, target: f }), I({ from: "value", store: 1, target: f, priority: "barrier", batch: 1 }), V(p, 1), o && L()];
  return ee(r, (l, s) => {
    if (!_(l))
      return $(!H(l) && !j(l), `combine expects a store in a field ${s}`), void (d[s] = i[s] = l);
    i[s] = l.defaultState, d[s] = l.getState();
    let u = Y(l, g, c, "combine", o);
    u.scope.key = s;
    let S = z(l);
    Re(p, { type: "field", field: s, from: S }), q("combineField", S, u);
  }), g.defaultShape = r, Re(h, { type: ue, from: p, fn: o }), g.defaultState = o ? h.current = o(d) : i, g;
};
let Bt = (e, t, r) => {
  try {
    return [1, e(...r)];
  } catch (n) {
    return t(n), [0, null];
  }
}, Mt = (e) => {
  let t = Q(e), r = { ref: t };
  return t && O(t.activeEffects, r), r;
}, qe = (e, t, r, n, o, a) => (i) => {
  a.ref && Ne(a.ref.activeEffects, a), ne({ target: [n, ur], params: [r ? { status: "done", params: e, result: i } : { status: "fail", params: e, error: i }, { value: i, fn: r ? t.rs : t.rj }], defer: 1, page: o.page, scope: a.ref, meta: o.meta });
};
const ur = K({ node: [Ct({ fn: ({ fn: e, value: t }) => e(t) })], meta: { op: "fx", fx: "sidechain" } }), dr = ["source", "clock", "target"], Rt = (e, t) => e + `: ${t} should be defined`;
let ot = (e, t, r, n, o, a, i, d, p, f, g, h) => {
  let m = !!o;
  $(!j(r) || !j(t), Rt(e, "either source or clock"));
  let c = 0;
  j(r) ? c = 1 : H(r) || (r = we(r)), j(t) ? t = r : (fe(t, e, "clock"), Array.isArray(t) && (t = Gt(t))), c && (r = t), d || i || (i = r.shortName);
  let l = "none";
  (g || n) && (H(n) ? l = "unit" : ($(M(n), "`filter` should be function or unit"), l = "fn")), o ? (fe(o, e, "target"), Ze(e, o)) : l === "none" && f && _(r) && _(t) ? o = G(a ? a(ke(z(r)), ke(z(t))) : ke(z(r)), { name: i, sid: h, or: d }) : (o = A({ name: i, derived: 1, or: d }), q("sampleTarget", F(o)));
  let s = ie(), u = [];
  if (l === "unit") {
    let [v, y] = gt(n, o, t, s, e);
    u = [...Ie(y), ...Ie(v)];
  }
  let [S, b] = gt(r, o, t, s, e), C = Y(t, o, [q("sampleSourceLoader"), I({ from: oe, target: s }), ...Ie(b), V(S, 1, p), ...u, V(s), l === "fn" && L((v, y, { a: k }) => n(v, k), 1), a && L(Ve), q("sampleSourceUpward", m)], e, a);
  return de(r, [C]), Object.assign(C.meta, d, { joint: 1 }), o;
};
const Ie = (e) => [V(e), D((t, r, { a: n }) => n, 1)], gt = (e, t, r, n, o) => {
  let a = _(e), i = a ? z(e) : ie(), d = ie(a);
  return a || K({ parent: e, node: [I({ from: oe, target: i }), I({ from: "value", store: 1, target: d })], family: { owners: [e, t, r], links: t }, meta: { op: o }, regional: 1 }), q("sampleSource", d, i, n), [i, d];
}, Le = (e, t, r, n) => {
  let o = e[t];
  o && ne({ target: o, params: Array.isArray(o) ? o.map(() => r) : r, defer: 1, stack: n });
}, qt = E(
  (e) => new Promise((t) => {
    chrome.storage.sync.get(
      e,
      (r) => t(r)
    );
  })
), zt = A();
U({
  clock: qt.doneData,
  fn: ({ maximumAutoConnectionsPerSession: e }) => e,
  target: zt
});
var re = /* @__PURE__ */ ((e) => (e[e.Unidentified = 0] = "Unidentified", e[e.SearchPeople = 1] = "SearchPeople", e[e.MyNetwork = 2] = "MyNetwork", e))(re || {}), Se = /* @__PURE__ */ ((e) => (e.NextPageButton = "button.artdeco-pagination__button--next", e.ConnectButtonFromMyNetworkPage = "div.discover-entity-type-card__bottom-container button.ember-view:enabled:not(.artdeco-button--muted):not(.artdeco-button--full)", e.ConnectButtonFromSearchPage = "li.reusable-search__result-container div.entity-result__actions > div > button.ember-view:enabled:not(.artdeco-button--muted)", e.SendButtonFromSendInviteModal = "div.send-invite button.artdeco-button--primary", e))(Se || {});
const Pe = A();
var Ke = /* @__PURE__ */ ((e) => (e.SearchPeoplePage = "https://www.linkedin.com/search/results/people/", e.MyNetworkPage = "https://www.linkedin.com/mynetwork/", e.PatternOfSearchPage = "linkedin.com/search/results/people", e.PatternOfMyNetworkPage = "linkedin.com/mynetwork", e))(Ke || {});
const at = A(), {
  searchPageLoaded: jt,
  myNetworkPageLoaded: Ft,
  __: fr
} = Xe(at, {
  searchPageLoaded: (e) => e.includes(Ke.PatternOfSearchPage),
  myNetworkPageLoaded: (e) => e.includes(Ke.PatternOfMyNetworkPage)
}), _t = A(), it = A(), ge = G(!1).on(_t, () => !0).reset([it, fr]), pr = G(re.Unidentified).on(jt, () => re.SearchPeople).on(Ft, () => re.MyNetwork), Ut = E(
  (e) => new Promise((t) => {
    let r = 0;
    const n = setInterval(() => {
      window.scrollTo(0, document.body.scrollHeight);
      const o = document.querySelector(e);
      o ? (clearInterval(n), t(o)) : ++r > 5 && (clearInterval(n), t(null));
    }, 500);
  })
);
U({
  clock: X({
    clock: Pe,
    source: we({ isRunning: ge, currentLinkedInPage: pr }),
    filter: ({ isRunning: e, currentLinkedInPage: t }) => e && [re.MyNetwork, re.SearchPeople].includes(t)
  }),
  fn: ({ currentLinkedInPage: e }) => e === re.MyNetwork ? Se.ConnectButtonFromMyNetworkPage : Se.ConnectButtonFromSearchPage,
  target: Ut
});
function mr(e, t) {
  if (t === void 0 && (t = e, e = 0), typeof e != "number" || typeof t != "number")
    throw new TypeError("Expected all arguments to be numbers");
  return Math.floor(
    Math.random() * (t - e + 1) + e
  );
}
const Ot = E((e) => {
  e.focus(), e.click(), e.setAttribute("disabled", "disabled");
}), Oe = Ot.done, gr = E(
  () => new Promise((e) => {
    let t = 0;
    const r = setInterval(() => {
      const n = document.querySelector(Se.SendButtonFromSendInviteModal);
      n == null || n.click(), (n || ++t > 5) && (clearInterval(r), e(null));
    }, 500);
  })
), hr = E(
  (e) => new Promise((t) => setTimeout(t, e))
), Dt = Ht({ effect: hr }), lt = G(0).on(Oe, (e) => e + 1), Et = Qe(zt, "100");
U({ clock: Oe, target: gr });
U({
  clock: Oe,
  fn: () => mr(1500, 3e3),
  target: Dt
});
X({
  clock: Oe,
  source: we({
    buttonClicksCount: lt,
    maximumAutoConnectionsPerSession: Et
  }),
  filter: ({ buttonClicksCount: e, maximumAutoConnectionsPerSession: t }) => e >= Number(t),
  target: it
});
const Ae = E((e) => {
  const { message: t, port: r } = e;
  r.postMessage(t);
});
var N = /* @__PURE__ */ ((e) => (e[e.ConnectionEstablished = 0] = "ConnectionEstablished", e[e.RunningStateUpdated = 1] = "RunningStateUpdated", e[e.ButtonClicksCountUpdated = 2] = "ButtonClicksCountUpdated", e[e.StartAutoConnect = 3] = "StartAutoConnect", e[e.StopAutoConnect = 4] = "StopAutoConnect", e))(N || {});
const he = A(), Tt = Qe(he, null);
X({
  clock: U({
    clock: lt.updates,
    source: Tt,
    fn: (e, t) => ({
      message: { id: N.ButtonClicksCountUpdated, content: t },
      port: e
    })
  }),
  filter: (e) => e.port !== null,
  target: Ae
});
const It = A(), yr = E((e) => {
  e.onMessage.addListener((t) => {
    It({ message: t, port: e });
  });
});
Ce({ from: he, to: yr });
Ce({
  from: he.map((e) => ({ message: { id: N.ConnectionEstablished }, port: e })),
  to: Ae
});
U({
  clock: he,
  source: ge,
  fn: (e, t) => ({ message: { id: N.RunningStateUpdated, content: e }, port: t }),
  target: Ae
});
U({
  clock: he,
  source: lt,
  fn: (e, t) => ({
    message: { id: N.ButtonClicksCountUpdated, content: e },
    port: t
  }),
  target: Ae
});
Ce({ from: Dt.doneData, to: Pe });
const Lt = Xe(It, {
  [N.ConnectionEstablished]: ({ message: e }) => e.id === N.ConnectionEstablished,
  [N.RunningStateUpdated]: ({ message: e }) => e.id === N.RunningStateUpdated,
  [N.ButtonClicksCountUpdated]: ({ message: e }) => e.id === N.ButtonClicksCountUpdated,
  [N.StartAutoConnect]: ({ message: e }) => e.id === N.StartAutoConnect,
  [N.StopAutoConnect]: ({ message: e }) => e.id === N.StopAutoConnect
});
U({
  clock: Lt[N.StartAutoConnect],
  target: _t
});
U({
  clock: Lt[N.StopAutoConnect],
  target: it
});
X({ clock: ge.updates, filter: (e) => e, target: Pe });
X({
  clock: U({
    clock: ge.updates,
    source: Tt,
    fn: (e, t) => ({
      message: { id: N.RunningStateUpdated, content: t },
      port: e
    })
  }),
  filter: (e) => e.port !== null,
  target: Ae
});
X({ clock: Ft, filter: ge, target: Pe });
const { nextAvailableConnectButtonFound: br, nextAvailableConnectButtonNotFound: vr } = Xe(
  Ut.doneData,
  {
    nextAvailableConnectButtonFound: (e) => e !== null,
    nextAvailableConnectButtonNotFound: (e) => e === null
  }
);
Ce({
  from: br,
  to: Ot
});
const kr = E(() => {
  var e;
  (e = document.querySelector(Se.NextPageButton)) == null || e.click();
});
U({ clock: vr, target: kr });
const Wt = A(), Sr = Qe(at, "");
X({
  clock: Wt,
  source: Sr,
  filter: (e) => window.location.href !== e,
  target: at.prepend(() => window.location.href)
});
X({ clock: jt, filter: ge, target: Pe });
const st = A(), wr = E(
  () => chrome.runtime.onConnect.addListener(he)
), Cr = E(
  () => setInterval(Wt, 1e3)
);
Ce({
  from: st,
  to: [wr, Cr]
});
U({
  clock: st,
  source: we({
    maximumAutoConnectionsPerSession: Et
  }),
  target: qt
});
st();
