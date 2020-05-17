(this['webpackJsonpecommerce-store-client'] =
  this['webpackJsonpecommerce-store-client'] || []).push([
  [0],
  {
    101(e, n, t) {
      e.exports = `${t.p}static/media/NotoSans-Bold.98f0cacc.ttf`;
    },
    110(e, n, t) {
      t.r(n);
      const a = t(0);
      const r = t.n(a);
      const o = t(12);
      const c = t.n(o);
      const i = t(43);
      const l = t(65);
      const u = t(155);
      const s = t(154);
      const m = t(31);
      const d = t(33);
      const f = t(90);
      const p = t(91);
      const g = t(9);
      const h = t(88);
      const v = t(89);
      const b = (t(101), t(73));
      const E = {
        fontFamily: 'Noto Sans',
        fontStyle: 'normal',
        fontDisplay: 'swap',
        fontWeight: 400,
        src: "\n    local('Noto Sans'),\n    local('NotoSans-Regular'),\n    url(".concat(
          t.n(b).a,
          ") format('ttf')\n  "
        ),
      };
      const w = {
        fontFamily: ['"Noto Sans"', 'Algerian'].join(','),
        overrides: { MuiCssBaseline: { '@global': { '@font-face': [E] } } },
      };
      const y = Object(v.a)({
        palette: { primary: { main: '#f99028' }, secondary: { main: '#2490ff' } },
        typography: w,
        themeName: 'Sea Buckthorn Dodger Blue Goats',
      });
      const k = t(10);
      const x = (t(58), t(13));
      const j = t(55);
      function O() {
        const e = Object(k.a)([
          '\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background: transparent;\n  color: ',
          ';\n  padding: 10px;\n  line-height: 2;\n  border-radius: 5px;\n  font-weight: bold;\n  border: 4px solid ',
          ';\n  font-size: inherit;\n  cursor: pointer;\n  text-decoration: none;\n',
        ]);
        return (
          (O = function () {
            return e;
          }),
          e
        );
      }
      const C = x.a.button(
        O(),
        function (e) {
          return e.color || 'white';
        },
        function (e) {
          return e.color || 'white';
        }
      );
      const S = function (e) {
        const n = e.children;
        const t = e.color;
        const a = e.onClick;
        return r.a.createElement(C, { color: t, onClick: a }, n);
      };
      S.defaultProps = { color: 'white' };
      const B = S;
      const N = t(34);
      const I = t.n(N);
      function T() {
        const e = Object(k.a)([
          '\n  mutation addToCart($productId: Int!) {\n    addToCart(input: { productId: $productId }) {\n      total\n    }\n  }\n',
        ]);
        return (
          (T = function () {
            return e;
          }),
          e
        );
      }
      function P() {
        const e = Object(k.a)([
          '\n  query getCart {\n    user {\n      total\n      product {\n        id\n        title\n        thumbnail\n      }\n    }\n  }\n',
        ]);
        return (
          (P = function () {
            return e;
          }),
          e
        );
      }
      function F() {
        const e = Object(k.a)(['\n  query getCartTotal {\n    user {\n      total\n    }\n  }\n']);
        return (
          (F = function () {
            return e;
          }),
          e
        );
      }
      function q() {
        const e = Object(k.a)([
          '\n  query getProducts($limit: Int) {\n    product(limit: $limit) {\n      id\n      title\n      thumbnail\n    }\n  }\n',
        ]);
        return (
          (q = function () {
            return e;
          }),
          e
        );
      }
      function $() {
        const e = Object(k.a)(['\n  query getLimit {\n    limit @client\n  }\n']);
        return (
          ($ = function () {
            return e;
          }),
          e
        );
      }
      function A() {
        const e = Object(k.a)([
          '\n  mutation loginUser($username: String!, $password: String!) {\n    loginUser(userName: $username, password: $password) {\n      userName\n      token\n    }\n  }\n',
        ]);
        return (
          (A = function () {
            return e;
          }),
          e
        );
      }
      function R() {
        const e = Object(k.a)([
          '\n  mutation completeCart {\n    completeCart {\n      complete\n    }\n  }\n',
        ]);
        return (
          (R = function () {
            return e;
          }),
          e
        );
      }
      const U = I()(R());
      const W = I()(A());
      const z = I()($());
      const L = I()(q());
      const D = I()(F());
      const G = I()(P());
      const M = I()(T());
      const J = function (e) {
        const n = e.onClick;
        return r.a.createElement(j.b, { query: D }, function (e) {
          const t = e.loading;
          const a = e.error;
          const o = e.data;
          return r.a.createElement(
            B,
            { onClick: n },
            'Cart ('.concat(t || a ? 0 : o && o.cart.total, ')')
          );
        });
      };
      function Q() {
        const e = Object(k.a)(['\n  margin: 10px 5%;\n']);
        return (
          (Q = function () {
            return e;
          }),
          e
        );
      }
      function Y() {
        const e = Object(k.a)([
          '\n  text-align: center;\n  flex-basis: 60%;\n\n  &:first-child {\n    margin-left: 20%;\n  }\n\n  &:last-child {\n    margin-right: 20%;\n  }\n',
        ]);
        return (
          (Y = function () {
            return e;
          }),
          e
        );
      }
      function H() {
        const e = Object(k.a)([
          '\n  width: 100%;\n  display: flex;\n  justify-content: space-between;\n  background: cornflowerBlue;\n',
        ]);
        return (
          (H = function () {
            return e;
          }),
          e
        );
      }
      const K = x.a.div(H());
      const V = x.a.h2(Y());
      const X = Object(x.a)(B)(Q());
      const Z = function (e) {
        const n = e.goBack;
        const t = e.title;
        const a = e.goToCart;
        const o = void 0 !== a && a;
        return r.a.createElement(
          K,
          null,
          n && r.a.createElement(X, { onClick: n }, '< Go Back'),
          r.a.createElement(V, null, t),
          o && r.a.createElement(J, { onClick: o })
        );
      };
      const _ = function (e) {
        const n = e.productId;
        return r.a.createElement(
          j.a,
          { mutation: M, refetchQueries: [{ query: G }, { query: D }] },
          function (e) {
            return r.a.createElement(
              B,
              {
                onClick() {
                  return e({ variables: { productId: n } });
                },
              },
              '+ Add to Cart'
            );
          }
        );
      };
      function ee() {
        const e = Object(k.a)(['\n  border-radius: 5px;\n']);
        return (
          (ee = function () {
            return e;
          }),
          e
        );
      }
      function ne() {
        const e = Object(k.a)(['\n  margin-left: 2%;\n']);
        return (
          (ne = function () {
            return e;
          }),
          e
        );
      }
      function te() {
        const e = Object(k.a)([
          '\n  display: flex;\n  text-align: left;\n  align-items: center;\n  justify-content: space-between;\n  padding: 1%;\n  background: lightGray;\n  border-radius: 5px;\n  padding: 10px;\n  margin-bottom: 2%;\n  text-decoration: none;\n',
        ]);
        return (
          (te = function () {
            return e;
          }),
          e
        );
      }
      const ae = x.a.div(te());
      const re = x.a.h3(ne());
      const oe = x.a.img(ee());
      const ce = function (e) {
        const n = e.data;
        return r.a.createElement(
          ae,
          null,
          r.a.createElement(oe, { src: n.thumbnail, width: 200 }),
          r.a.createElement(re, null, n.title),
          r.a.createElement(_, { productId: n.id })
        );
      };
      function ie() {
        const e = Object(k.a)([
          '\n  width: 100%;\n  font-size: 18px;\n  color: white;\n  font-weight: bold;\n  text-align: right;\n',
        ]);
        return (
          (ie = function () {
            return e;
          }),
          e
        );
      }
      function le() {
        const e = Object(k.a)([
          '\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 1%;\n  background: gray;\n  border-radius: 5px;\n  padding: 10px;\n  margin-bottom: 2%;\n',
        ]);
        return (
          (le = function () {
            return e;
          }),
          e
        );
      }
      const ue = x.a.div(le());
      const se = x.a.span(ie());
      const me = function (e) {
        const n = e.count;
        return r.a.createElement(
          ue,
          null,
          r.a.createElement(se, null, 'Total product: '.concat(n))
        );
      };
      function de() {
        const e = Object(k.a)(['\n  width: 100%;\n  text-align: center;\n']);
        return (
          (de = function () {
            return e;
          }),
          e
        );
      }
      function fe() {
        const e = Object(k.a)([
          '\n  display: flex;\n  justify-content: space-between;\n  flex-direction: column;\n',
        ]);
        return (
          (fe = function () {
            return e;
          }),
          e
        );
      }
      function pe() {
        const e = Object(k.a)([
          '\n  display: flex;\n  justify-content: space-between;\n  flex-direction: column;\n  margin: 2% 5%;\n',
        ]);
        return (
          (pe = function () {
            return e;
          }),
          e
        );
      }
      const ge = x.a.div(pe());
      const he = x.a.div(fe());
      const ve = x.a.span(de());
      const be = function (e) {
        const n = e.history;
        return r.a.createElement(
          r.a.Fragment,
          null,
          n &&
            r.a.createElement(Z, {
              title: 'Cart',
              goToCart() {
                return n.push('/user');
              },
            }),
          r.a.createElement(j.b, { query: G }, function (e) {
            const n = e.loading;
            const t = e.error;
            const a = e.data;
            return n || t
              ? r.a.createElement(ve, null, n ? 'Loading...' : t)
              : r.a.createElement(
                  ge,
                  null,
                  r.a.createElement(
                    he,
                    null,
                    a.cart &&
                      a.cart.products.map(function (e) {
                        return r.a.createElement(ce, { key: e.id, data: e });
                      })
                  ),
                  r.a.createElement(me, { count: a.cart.total }),
                  a.cart &&
                    a.cart.products.length > 0 &&
                    r.a.createElement(
                      i.b,
                      { to: '/checkout' },
                      r.a.createElement(B, { color: 'royalBlue' }, 'Checkout')
                    )
                );
          })
        );
      };
      const Ee = t(146);
      const we = Object(Ee.a)(function (e) {
        const n = e.limit;
        const t = e.client;
        return r.a.createElement(
          r.a.Fragment,
          null,
          r.a.createElement('label', { htmlFor: 'limit' }, 'Number of product: '),
          ' ',
          r.a.createElement(
            'select',
            {
              id: 'limit',
              value: n,
              onChange(e) {
                return t.writeData({ data: { limit: e.target.value } });
              },
            },
            r.a.createElement('option', { value: 5 }, '5'),
            r.a.createElement('option', { value: 10 }, '10'),
            r.a.createElement('option', { value: 20 }, '20')
          )
        );
      });
      function ye() {
        const e = Object(k.a)(['\n  width: 100%;\n  text-align: center;\n']);
        return (
          (ye = function () {
            return e;
          }),
          e
        );
      }
      function ke() {
        const e = Object(k.a)([
          '\n  display: flex;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  flex-direction: column;\n  margin: 2% 5%;\n',
        ]);
        return (
          (ke = function () {
            return e;
          }),
          e
        );
      }
      const xe = x.a.div(ke());
      const je = x.a.span(ye());
      const Oe = function (e) {
        const n = e.history;
        return r.a.createElement(
          r.a.Fragment,
          null,
          n &&
            r.a.createElement(Z, {
              title: 'Available product',
              goToCart() {
                return n.push('/user');
              },
            }),
          r.a.createElement(j.b, { query: z }, function (e) {
            const n = e.data;
            return r.a.createElement(
              r.a.Fragment,
              null,
              r.a.createElement(we, { limit: parseInt(n.limit, 10) }),
              r.a.createElement(
                j.b,
                { query: L, variables: { limit: parseInt(n.limit, 10) } },
                function (e) {
                  const n = e.loading;
                  const t = e.error;
                  const a = e.data;
                  return n || t
                    ? r.a.createElement(je, null, n ? 'Loading...' : t)
                    : r.a.createElement(
                        xe,
                        null,
                        a.products &&
                          a.products.map(function (e) {
                            return r.a.createElement(ce, { key: e.id, data: e });
                          })
                      );
                }
              )
            );
          })
        );
      };
      const Ce = t(28);
      const Se = t(147);
      const Be = t(148);
      const Ne = t(150);
      const Ie = t(115);
      const Te = t(151);
      const Pe = t(84);
      const Fe = t.n(Pe);
      const qe = t(85);
      const $e = t.n(qe);
      const Ae = t(157);
      const Re = t(156);
      const Ue = Object(Se.a)(function (e) {
        return {
          root: { flexGrow: 1 },
          menuButton: { marginRight: e.spacing(2) },
          title: { flexGrow: 1 },
        };
      });
      const We = function () {
        const e = Ue();
        const n = r.a.useState(!0);
        const t = Object(Ce.a)(n, 2);
        const a = t[0];
        const o = (t[1], r.a.useState(null));
        const c = Object(Ce.a)(o, 2);
        const i = c[0];
        const l = c[1];
        const u = Boolean(i);
        const s = function () {
          l(null);
        };
        return r.a.createElement(
          'div',
          { className: e.root },
          r.a.createElement(
            Be.a,
            { position: 'static' },
            r.a.createElement(
              Ne.a,
              null,
              r.a.createElement(
                Te.a,
                {
                  edge: 'start',
                  className: e.menuButton,
                  color: 'inherit',
                  'aria-label': 'menu',
                },
                r.a.createElement(Fe.a, null)
              ),
              r.a.createElement(Ie.a, { variant: 'h6', className: e.title }, 'Photos'),
              a &&
                r.a.createElement(
                  'div',
                  null,
                  r.a.createElement(
                    Te.a,
                    {
                      'aria-label': 'account of current user',
                      'aria-controls': 'menu-appbar',
                      'aria-haspopup': 'true',
                      onClick(e) {
                        l(e.currentTarget);
                      },
                      color: 'inherit',
                    },
                    r.a.createElement($e.a, null)
                  ),
                  r.a.createElement(
                    Re.a,
                    {
                      id: 'menu-appbar',
                      anchorEl: i,
                      anchorOrigin: { vertical: 'top', horizontal: 'right' },
                      keepMounted: !0,
                      transformOrigin: { vertical: 'top', horizontal: 'right' },
                      open: u,
                      onClose: s,
                    },
                    r.a.createElement(Ae.a, { onClick: s }, 'Profile'),
                    r.a.createElement(Ae.a, { onClick: s }, 'My account')
                  )
                )
            )
          )
        );
      };
      const ze = t(152);
      const Le = t(153);
      const De = t(86);
      const Ge = t.n(De);
      const Me = Object(Se.a)(function (e) {
        return {
          gridItem: { margin: 'auto' },
          mainFeaturedPost: {
            position: 'relative',
            backgroundColor: e.palette.background.default,
            color: e.palette.text.primary,
            marginBottom: e.spacing(4),
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          },
          mainFeaturedPostContent: {
            position: 'relative',
            padding: e.spacing(5),
            [e.breakpoints.up('md')]: { padding: e.spacing(6), paddingRight: 0 },
          },
        };
      });
      const Je = function () {
        return r.a.createElement('img', { src: Ge.a, alt: 'Header', style: { width: '100%' } });
      };
      const Qe = function (e) {
        const n = Me();
        const t = e.post;
        return r.a.createElement(
          ze.a,
          { container: !0, className: n.mainFeaturedPost },
          r.a.createElement(
            ze.a,
            { item: !0, md: 6, classes: { item: n.gridItem } },
            r.a.createElement(
              'div',
              { className: n.mainFeaturedPostContent },
              r.a.createElement(
                Ie.a,
                { component: 'h1', variant: 'h3', color: 'inherit', gutterBottom: !0 },
                t.title
              ),
              r.a.createElement(
                Ie.a,
                { variant: 'h5', color: 'inherit', paragraph: !0 },
                t.description
              ),
              r.a.createElement(Le.a, { variant: 'subtitle1', href: '#' }, t.linkText)
            )
          ),
          r.a.createElement(ze.a, { item: !0, md: 6 }, r.a.createElement(Je, null))
        );
      };
      Qe.defaultProps = {
        post: { imageText: Je, title: 'shopping', description: 'the place to shop', linkText: '' },
      };
      const Ye = Qe;
      const He = t(64);
      const Ke = t.n(He);
      const Ve = t(87);
      const Xe = t(56);
      function Ze() {
        const e = Object(k.a)([
          '\n  padding: 18px;\n  display: flex;\n  align-items: center;\n  justify-content: space-around;\n  border-radius: 5px;\n  border: 1px solid #ccc;\n  background-color: #fff;\n  font-size: 16px;\n  margin-bottom: 10px;\n',
        ]);
        return (
          (Ze = function () {
            return e;
          }),
          e
        );
      }
      function _e() {
        const e = Object(k.a)([
          '\n  display: flex;\n  justify-content: space-between;\n  flex-direction: column;\n  width: 30%;\n  margin: 2% auto;\n',
        ]);
        return (
          (_e = function () {
            return e;
          }),
          e
        );
      }
      const en = x.a.div(_e());
      const nn = x.a.input(Ze());
      const tn = function (e) {
        const n = e.history;
        const t = Object(Xe.a)(W);
        const a = Object(Ce.a)(t, 1)[0];
        const o = r.a.useState('');
        const c = Object(Ce.a)(o, 2);
        const i = c[0];
        const l = c[1];
        const u = r.a.useState('');
        const s = Object(Ce.a)(u, 2);
        const m = s[0];
        const d = s[1];
        return r.a.createElement(
          en,
          null,
          r.a.createElement(nn, {
            onChange(e) {
              return l(e.target.value);
            },
            value: i,
            placeholder: 'Your username',
          }),
          r.a.createElement(nn, {
            onChange(e) {
              return d(e.target.value);
            },
            value: m,
            placeholder: 'Your password',
          }),
          r.a.createElement(
            B,
            {
              color: 'royalBlue',
              onClick: Object(Ve.a)(
                Ke.a.mark(function e() {
                  let t;
                  let r;
                  return Ke.a.wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (e.next = 2), a({ variables: { username: i, password: m } });
                        case 2:
                          if (((t = e.sent), !(r = t.data).loginUser || !r.loginUser.token)) {
                            e.next = 7;
                            break;
                          }
                          return (
                            sessionStorage.setItem('token', r.loginUser.token),
                            e.abrupt('return', n.push('/checkout'))
                          );
                        case 7:
                          return e.abrupt(
                            'return',
                            alert('Please provide (valid) authentication details.')
                          );
                        case 8:
                        case 'end':
                          return e.stop();
                      }
                  }, e);
                })
              ),
            },
            'Login'
          )
        );
      };
      function an() {
        const e = Object(k.a)([
          '\n  display: flex;\n  justify-content: space-between;\n  flex-direction: column;\n  margin: 2% 5%;\n',
        ]);
        return (
          (an = function () {
            return e;
          }),
          e
        );
      }
      const rn = x.a.div(an());
      const on = function () {
        const e = Object(Xe.a)(U);
        const n = Object(Ce.a)(e, 2);
        const t = n[0];
        const a = n[1].data;
        return r.a.createElement(
          rn,
          null,
          a && a.completeCart.complete
            ? r.a.createElement('p', null, 'Checkout completed successfully')
            : r.a.createElement(
                r.a.Fragment,
                null,
                r.a.createElement(
                  'p',
                  null,
                  'This is the checkout, press the button below to complete:'
                ),
                r.a.createElement(B, { color: 'royalBlue', onClick: t }, 'Complete checkout')
              )
        );
      };
      const cn = sessionStorage.getItem('token');
      const ln = new f.a();
      const un = new p.a({ uri: 'http://localhost:4000/graphql' });
      const sn = Object(h.a)(function (e, n) {
        const t = n.headers;
        const a = cn;
        return {
          headers: Object(l.a)(
            Object(l.a)({}, t),
            {},
            { authorization: a ? 'Bearer '.concat(a) : '' }
          ),
        };
      });
      const mn = new d.c({
        link: sn.concat(un),
        cache: ln,
        resolvers: {},
        typeDefs: '\n    extend type Query {\n      limit: Int!\n    }\n  ',
      });
      ln.writeData({ data: { limit: 5 } });
      const dn = function () {
        return r.a.createElement(
          g.b,
          { client: mn },
          r.a.createElement(s.a, null),
          r.a.createElement(
            u.a,
            { theme: y },
            r.a.createElement(We, null),
            r.a.createElement(Ye, null),
            r.a.createElement(
              m.d,
              null,
              r.a.createElement(m.b, { exact: !0, path: '/', component: Oe }),
              r.a.createElement(m.b, { path: '/user', component: be }),
              r.a.createElement(m.b, {
                path: '/checkout',
                render() {
                  return cn
                    ? r.a.createElement(on, null)
                    : r.a.createElement(m.a, { to: '/login/' });
                },
              }),
              r.a.createElement(m.b, { path: '/login/', component: tn })
            )
          )
        );
      };
      const fn = Boolean(
        window.location.hostname === 'localhost' ||
          window.location.hostname === '[::1]' ||
          window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
      );
      function pn(e, n) {
        navigator.serviceWorker
          .register(e)
          .then(function (e) {
            e.onupdatefound = function () {
              const t = e.installing;
              t != null &&
                (t.onstatechange = function () {
                  t.state === 'installed' &&
                    (navigator.serviceWorker.controller
                      ? (console.log(
                          'New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA.'
                        ),
                        n && n.onUpdate && n.onUpdate(e))
                      : (console.log('Content is cached for offline use.'),
                        n && n.onSuccess && n.onSuccess(e)));
                });
            };
          })
          .catch(function (e) {
            console.error('Error during service worker registration:', e);
          });
      }
      c.a.render(
        r.a.createElement(i.a, null, r.a.createElement(dn, null)),
        document.getElementById('root')
      ),
        (function (e) {
          if ('serviceWorker' in navigator) {
            if (new URL('', window.location.href).origin !== window.location.origin) return;
            window.addEventListener('load', function () {
              const n = ''.concat('', '/service-worker.js');
              fn
                ? (!(function (e, n) {
                    fetch(e)
                      .then(function (t) {
                        const a = t.headers.get('content-type');
                        t.status === 404 || (a != null && a.indexOf('javascript') === -1)
                          ? navigator.serviceWorker.ready.then(function (e) {
                              e.unregister().then(function () {
                                window.location.reload();
                              });
                            })
                          : pn(e, n);
                      })
                      .catch(function () {
                        console.log(
                          'No internet connection found. App is running in offline mode.'
                        );
                      });
                  })(n, e),
                  navigator.serviceWorker.ready.then(function () {
                    console.log(
                      'This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA'
                    );
                  }))
                : pn(n, e);
            });
          }
        })();
    },
    73(e, n, t) {
      e.exports = `${t.p}static/media/NotoSans-Regular.5a87cce8.ttf`;
    },
    86(e, n, t) {
      e.exports = `${t.p}static/media/header-bg.08aaf026.png`;
    },
    96(e, n, t) {
      e.exports = t(110);
    },
  },
  [[96, 1, 2]],
]);
// # sourceMappingURL=main.ac1d0a68.chunk.js.map
