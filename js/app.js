(function () {
  var SITE = window.SITE;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  function safeGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function safeSet(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* storage dapat diblokir */ } }

  document.addEventListener('alpine:init', function () {
    Alpine.data('site', function () {
      return {
        lang: 'id',
        menu: false,
        scrolled: false,
        active: 'beranda',
        tlActive: -1,
        tlProgress: 0,
        svcActive: 0,
        prod: 'titipgracia',
        prods: {
          titipgracia: { name: 'TitipGracia', s: 'live', i18n: 'graciatitip', color: '#0a8f2a' },
          gudangku: { name: 'Gudangku', s: 'beta', i18n: 'warehouse', color: '#4b6a91' },
          restopos: { name: 'RestoPOS', s: 'beta', i18n: 'resto', color: '#e0442a' },
          hr: { name: 'HR & Payroll', s: 'planned', road: 0, color: '#8a8a84' },
          crm: { name: 'CRM', s: 'planned', road: 1, color: '#8a8a84' },
          church: { name: 'Church Management', short: 'Church Mgmt', s: 'planned', road: 2, color: '#8a8a84' }
        },
        mapLayout: { '2,4': 'titipgracia', '3,3': 'gudangku', '3,5': 'restopos', '4,2': 'hr', '2,6': 'crm', '4,6': 'church', '3,4': 'hub', '1,2': 'ghost', '1,6': 'ghost', '5,3': 'ghost', '5,5': 'ghost' },
        demo: 0,
        demoPrev: -1,
        playing: true,
        demoHover: false,
        cur: { x: 50, y: 70, show: false, instant: true, click: false },
        _demoTimers: [],
        rail: [
          { name: 'TitipGracia', s: 'live' }, { name: 'Gudangku', s: 'beta' }, { name: 'RestoPOS', s: 'beta' },
          { name: 'HR & Payroll', s: 'planned' }, { name: 'CRM', s: 'planned' }, { name: 'Church', s: 'planned' }
        ],
        vals: SITE.stats.map(function (s) { return s.static ? s.to : 0; }),
        counted: false,
        status: 'idle',
        form: { name: '', email: '', topic: 'consult', message: '', botcheck: '' },
        errors: { name: '', email: '', message: '' },
        touched: { name: false, email: false, message: false },
        formStart: 0,
        MIN_NAME: 4,
        MAX_NAME: 50,
        MIN_MSG: 21,
        MAX_MSG: 500,
        MAX_EMAIL: 50,

        init: function () {
          var saved = safeGet('ss-lang');
          var browser = (navigator.language || 'id').slice(0, 2);
          this.lang = saved === 'id' || saved === 'en' ? saved : (browser === 'en' ? 'en' : 'id');
          this.applyMeta();
          var self = this;
          this.$watch('lang', function (v) { safeSet('ss-lang', v); self.applyMeta(); self.revalidate(); });
          ['name', 'email', 'message'].forEach(function (f) {
            self.$watch('form.' + f, function () { if (self.touched[f]) self.validateField(f); });
          });
          this.$watch('prod', function () { self.$nextTick(function () { self.fitMockups(); }); });
          this.$watch('menu', function (v) { document.body.style.overflow = v ? 'hidden' : ''; });

          var onScroll = function () { self.onScroll(); };
          window.addEventListener('scroll', onScroll, { passive: true });
          window.addEventListener('resize', onScroll);
          this.$nextTick(function () { onScroll(); self.fitMockups(); self.setupFx(); self.demoStart(); });
          window.addEventListener('resize', function () { self.fitMockups(); });
        },

        t: function (path) {
          var v = path.split('.').reduce(function (o, k) { return o == null ? o : o[k]; }, SITE.i18n[this.lang]);
          return v == null ? path : v;
        },

        toggleLang: function () { this.lang = this.lang === 'id' ? 'en' : 'id'; },

        applyMeta: function () {
          document.documentElement.lang = this.lang;
          document.title = this.t('meta.title');
          var d = document.querySelector('meta[name="description"]');
          if (d) d.setAttribute('content', this.t('meta.description'));
        },

        words: function (path) { return this.t(path).split(' '); },

        statLabel: function (key) { return this.t('stats.labels.' + key); },

        status_label: function (s) { return this.t('products.' + s); },

        productHref: function (key) {
          var u = SITE.products[key] && SITE.products[key].url;
          return u ? u : '#kontak';
        },
        productExternal: function (key) { return !!(SITE.products[key] && SITE.products[key].url); },

        pick: function (topic) {
          this.form.topic = topic;
        },

        waHref: function () {
          return 'https://wa.me/' + SITE.config.whatsapp + '?text=' + encodeURIComponent(this.t('contact.waText'));
        },
        mailHref: function () { return 'mailto:' + SITE.config.email; },
        waLabel: function () { return SITE.config.whatsappLabel; },
        email: function () { return SITE.config.email; },
        testimonials: function () { return SITE.testimonials; },
        quote: function (item) { return item.quote[this.lang] || item.quote.id; },
        stats: function () { return SITE.stats; },

        msgLen: function () { return this.form.message.trim().length; },

        // validasi isian: nama lebih dari 3 karakter, email valid, pesan lebih dari 20 karakter
        validateField: function (f) {
          var v = (this.form[f] || '').trim(), msg = '';
          if (f === 'name' && (v.length < this.MIN_NAME || v.length > this.MAX_NAME)) msg = this.t('contact.form.errName');
          if (f === 'email') {
            if (v.length > this.MAX_EMAIL) msg = this.t('contact.form.errEmailLong');
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) msg = this.t('contact.form.errEmail');
          }
          if (f === 'message' && (v.length < this.MIN_MSG || v.length > this.MAX_MSG)) msg = this.t('contact.form.errMsg');
          this.errors[f] = msg;
          return !msg;
        },
        touch: function (f) { this.touched[f] = true; this.validateField(f); },
        revalidate: function () {
          var self = this;
          ['name', 'email', 'message'].forEach(function (f) { if (self.touched[f]) self.validateField(f); });
        },

        // penyaring spam sisi browser. Bukan bukti mutlak, hanya memblokir yang jelas-jelas sampah.
        spamScore: function () {
          var m = this.form.message.trim(), n = this.form.name.trim(), score = 0;
          var links = (m.match(/https?:\/\/|www\./gi) || []).length;
          if (links >= 1) score += 1;
          if (links >= 3) score += 3;
          if (/\b(casino|slot gacor|judi online|togel|viagra|forex|backlink|seo service|pinjol|pinjaman cepat|porn|xxx|click here|free money|investasi cepat)\b/i.test(m)) score += 3;
          var letters = (m.toLowerCase().match(/[a-z]/g) || []);
          if (letters.length >= 15) {
            var vowels = letters.filter(function (ch) { return 'aeiou'.indexOf(ch) > -1; }).length;
            if (vowels / letters.length < 0.2) score += 3;
          }
          if (/(.)\1{5,}/.test(m)) score += 2;
          var words = m.split(/\s+/).filter(Boolean);
          if (words.length < 3) score += 2;
          if (m.length >= 15 && new Set(m.toLowerCase().replace(/\s/g, '')).size / m.length < 0.2) score += 2;
          if (/(asdf|qwer|zxcv|hjkl|jkl;)/i.test(m)) score += 2;
          if (m.length > 30 && m === m.toUpperCase() && /[A-Z]/.test(m)) score += 1;
          if (n === this.form.email.trim()) score += 1;
          if (this.formStart && Date.now() - this.formStart < 4000) score += 2;
          return score;
        },

        send: function () {
          var self = this;
          if (this.status === 'sending') return;
          if (this.form.botcheck) return; // honeypot

          ['name', 'email', 'message'].forEach(function (f) { self.touched[f] = true; });
          var ok = ['name', 'email', 'message'].map(function (f) { return self.validateField(f); }).every(Boolean);
          if (!ok) {
            this.status = 'idle';
            var first = ['name', 'email', 'message'].find(function (f) { return self.errors[f]; });
            var el = document.getElementById({ name: 'f-name', email: 'f-email', message: 'f-msg' }[first]);
            if (el) el.focus();
            return;
          }

          if (this.spamScore() >= 3) { this.status = 'spam'; return; }

          var tokenEl = document.querySelector('[name="h-captcha-response"]');
          var token = tokenEl ? tokenEl.value : '';
          if (!token) { this.status = 'captcha'; return; }

          var last = parseInt(safeGet('ss-last-send') || '0', 10);
          if (last && Date.now() - last < 60000) { this.status = 'wait'; return; }

          this.status = 'sending';
          var key = SITE.config.web3formsAccessKey;
          if (!key || key === 'YOUR_ACCESS_KEY') { this.status = 'error'; return; }
          var topicLabel = this.t('contact.form.topics.' + this.form.topic);
          fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
              access_key: key,
              subject: 'Sheven Studio: ' + topicLabel,
              name: this.form.name.trim(),
              email: this.form.email.trim(),
              topic: topicLabel,
              message: this.form.message.trim(),
              'h-captcha-response': token
            })
          }).then(function (r) { return r.json(); }).then(function (j) {
            if (j && j.success) {
              self.status = 'success';
              safeSet('ss-last-send', String(Date.now()));
              self.form.name = ''; self.form.email = ''; self.form.message = '';
              self.touched = { name: false, email: false, message: false };
              self.errors = { name: '', email: '', message: '' };
              self.formStart = 0;
              try { if (window.hcaptcha) window.hcaptcha.reset(); } catch (e) { /* widget belum siap */ }
            } else { self.status = 'error'; }
          }).catch(function () { self.status = 'error'; });
        },

        onScroll: function () {
          this.scrolled = window.scrollY > 24;

          // bagian aktif pada navigasi
          var ids = ['beranda', 'produk', 'layanan', 'tentang', 'kontak'];
          var mid = window.innerHeight * 0.4, cur = ids[0];
          ids.forEach(function (id) {
            var el = document.getElementById(id);
            if (el && el.getBoundingClientRect().top <= mid) cur = id;
          });
          this.active = cur;

          // layanan yang sedang dibaca
          var rows = document.querySelectorAll('#layanan .svc-row');
          if (rows.length) {
            var c = window.innerHeight * 0.5, best = 0, bd = 1e9;
            rows.forEach(function (r, i) {
              var b = r.getBoundingClientRect(), d = Math.abs(b.top + b.height / 2 - c);
              if (d < bd) { bd = d; best = i; }
            });
            this.svcActive = best;
          }

          // progres timeline
          var tl = document.getElementById('timeline');
          if (tl) {
            var r = tl.getBoundingClientRect(), vh = window.innerHeight;
            var p = (vh * 0.6 - r.top) / r.height;
            p = Math.max(0, Math.min(1, p));
            this.tlProgress = p;
            var items = tl.querySelectorAll('.tl-item'), act = -1;
            items.forEach(function (it, i) { if (it.getBoundingClientRect().top < vh * 0.62) act = i; });
            this.tlActive = act;
          }

          // paralaks mockup hero
          var lap = document.querySelector('.laptop');
          if (lap && !reduce) lap.style.setProperty('--ty', Math.min(window.scrollY * -0.06, 0) + 'px');
        },

        demoTargets: [{ x: 93, y: 14 }, { x: 85.5, y: 5 }, { x: 9, y: 39 }],
        demoStarts: [{ x: 45, y: 72 }, { x: 25, y: 62 }, { x: 62, y: 78 }],

        demoClear: function () {
          this._demoTimers.forEach(clearTimeout);
          this._demoTimers = [];
        },
        demoAfter: function (ms, fn) { this._demoTimers.push(setTimeout(fn.bind(this), ms)); },

        // satu putaran: layar tampil, kursor bergerak, klik, pindah ke layar berikutnya
        demoSeq: function () {
          var i = this.demo, st = this.demoStarts[i], tg = this.demoTargets[i];
          this.demoClear();
          this.cur = { x: st.x, y: st.y, show: false, instant: true, click: false };
          this.demoAfter(1500, function () { this.cur.show = true; });
          this.demoAfter(1900, function () { this.cur.instant = false; this.cur.x = tg.x; this.cur.y = tg.y; });
          this.demoAfter(3200, function () { this.cur.click = true; });
          this.demoAfter(3900, function () { this.cur.click = false; this.cur.show = false; });
          this.demoAfter(4000, function () { this.demoSwitch((i + 1) % 3, true); });
        },

        demoSwitch: function (n, auto) {
          this.demoPrev = this.demo;
          this.demo = n;
          if (this.playing) this.demoSeq(); else this.demoClear();
        },

        demoGo: function (n) {
          if (n === this.demo) return;
          this.cur.show = false;
          this.demoSwitch(n);
        },

        demoToggle: function () {
          this.playing = !this.playing;
          if (this.playing) this.demoSeq();
          else { this.demoClear(); this.cur.show = false; }
        },

        demoStart: function () {
          if (reduce) { this.playing = false; return; }
          var self = this;
          this.demoSeq();
          document.addEventListener('visibilitychange', function () {
            if (document.hidden) self.demoClear();
            else if (self.playing) self.demoSeq();
          });
          var hero = document.getElementById('beranda');
          if ('IntersectionObserver' in window && hero) {
            new IntersectionObserver(function (en) {
              if (!self.playing) return;
              if (en[0].isIntersecting) self.demoSeq(); else self.demoClear();
            }, { threshold: 0.1 }).observe(hero);
          }
        },

        cellKey: function (i) {
          var r = Math.floor(i / 7) + 1, c = (i % 7) + 1;
          return this.mapLayout[r + ',' + c] || null;
        },
        selectProd: function (k) { this.prod = k; },
        pTitle: function () {
          var p = this.prods[this.prod];
          return p.road != null ? this.t('products.roadmap')[p.road].name : p.name;
        },
        pTag: function () {
          var p = this.prods[this.prod];
          return p.road != null ? this.t('products.planned') : this.t('products.' + p.i18n + '.tag');
        },
        pDesc: function () {
          var p = this.prods[this.prod];
          return p.road != null ? this.t('products.roadmap')[p.road].desc : this.t('products.' + p.i18n + '.desc');
        },
        icon: function (k) {
          var d = {
            titipgracia: '<path d="M5 8h14l-1 12H6L5 8z"/><path d="M9 8V6a3 3 0 016 0v2"/>',
            gudangku: '<path d="M12 3l8 4v10l-8 4-8-4V7l8-4z"/><path d="M4 7l8 4 8-4M12 11v10"/>',
            restopos: '<path d="M7 3v7a2 2 0 002 2v9M11 3v7a2 2 0 01-2 2M17 3c-2 2-3 5-3 8h3v10"/>',
            hr: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
            crm: '<path d="M4 5h16v11H9l-5 4V5z"/><path d="M8 9h8M8 12h5"/>',
            church: '<path d="M12 2v5M10 4.5h4"/><path d="M5 22V12l7-4 7 4v10z"/><path d="M10 22v-5h4v5"/>'
          };
          return '<svg viewBox="0 0 24 24" aria-hidden="true">' + (d[k] || '') + '</svg>';
        },

        fitMockups: function () {
          document.querySelectorAll('.fit').forEach(function (el) {
            var w = parseFloat(el.getAttribute('data-w'));
            if (w && el.clientWidth) el.style.setProperty('--s', el.clientWidth / w);
          });
        },

        setupFx: function () {
          var self = this;

          // reveal saat scroll
          var els = document.querySelectorAll('.reveal');
          if (reduce || !('IntersectionObserver' in window)) {
            els.forEach(function (e) { e.classList.add('in'); });
          } else {
            var io = new IntersectionObserver(function (entries) {
              entries.forEach(function (en) {
                if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
              });
            }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
            els.forEach(function (e) { io.observe(e); });
          }

          // counter angka
          var statsEl = document.getElementById('angka');
          var runCount = function () {
            if (self.counted) return;
            self.counted = true;
            SITE.stats.forEach(function (s, i) {
              if (s.static) return;
              if (reduce) { self.vals[i] = s.to; return; }
              var t0 = null, dur = 1600 + i * 250;
              var step = function (ts) {
                if (t0 === null) t0 = ts;
                var p = Math.min(1, (ts - t0) / dur);
                self.vals[i] = Math.round(s.to * (1 - Math.pow(1 - p, 4)));
                if (p < 1) requestAnimationFrame(step);
              };
              requestAnimationFrame(step);
            });
          };
          if (statsEl) {
            if (reduce || !('IntersectionObserver' in window)) runCount();
            else {
              var so = new IntersectionObserver(function (en) {
                if (en[0].isIntersecting) { runCount(); so.disconnect(); }
              }, { threshold: 0.35 });
              so.observe(statsEl);
            }
          }

          if (reduce) return;

          // spotlight kartu
          document.addEventListener('pointermove', function (e) {
            var card = e.target.closest && e.target.closest('.spot');
            if (!card) return;
            var r = card.getBoundingClientRect();
            card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
            card.style.setProperty('--my', (e.clientY - r.top) + 'px');
          });

          // tilt laptop
          var hero = document.getElementById('beranda');
          var lap = document.querySelector('.laptop');
          if (hero && lap && finePointer) {
            hero.addEventListener('pointermove', function (e) {
              var r = hero.getBoundingClientRect();
              var x = (e.clientX - r.left) / r.width - 0.5;
              var y = (e.clientY - r.top) / r.height - 0.5;
              lap.style.setProperty('--ry', (x * 7).toFixed(2) + 'deg');
              lap.style.setProperty('--rx', (-y * 4).toFixed(2) + 'deg');
            });
            hero.addEventListener('pointerleave', function () {
              lap.style.setProperty('--ry', '0deg');
              lap.style.setProperty('--rx', '0deg');
            });
          }

          if (!finePointer) return;

          // tombol magnetik
          document.querySelectorAll('.magnetic').forEach(function (b) {
            b.addEventListener('pointermove', function (e) {
              var r = b.getBoundingClientRect();
              var x = e.clientX - (r.left + r.width / 2);
              var y = e.clientY - (r.top + r.height / 2);
              b.style.transform = 'translate(' + (x * 0.18).toFixed(1) + 'px,' + (y * 0.25).toFixed(1) + 'px)';
            });
            b.addEventListener('pointerleave', function () { b.style.transform = ''; });
          });

          // kursor cincin
          var ring = document.getElementById('ring');
          if (ring) {
            var tx = 0, ty = 0, cx = 0, cy = 0, started = false;
            window.addEventListener('pointermove', function (e) {
              tx = e.clientX; ty = e.clientY;
              if (!started) { cx = tx; cy = ty; started = true; ring.classList.add('show'); }
              ring.classList.toggle('big', !!(e.target.closest && e.target.closest('a, button, select, summary')));
            });
            document.addEventListener('pointerleave', function () { ring.classList.remove('show'); started = false; });
            var loop = function () {
              cx += (tx - cx) * 0.16; cy += (ty - cy) * 0.16;
              ring.style.transform = 'translate(' + cx.toFixed(1) + 'px,' + cy.toFixed(1) + 'px)';
              requestAnimationFrame(loop);
            };
            requestAnimationFrame(loop);
          }
        }
      };
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var root = document.querySelector('[x-data]');
    if (root && root._x_dataStack && root._x_dataStack[0].menu) root._x_dataStack[0].menu = false;
  });
})();
