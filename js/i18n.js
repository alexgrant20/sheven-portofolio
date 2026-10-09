/*
  Semua teks dan data situs ada di file ini.
  Ganti nama founder, kontak, URL produk, dan testimoni di sini saja.

  TODO sebelum publikasi (lihat docs/superpowers/specs, bagian 7):
  - nama, foto, dan peran founder
  - nomor WhatsApp dan email
  - url TitipGracia dan Warehouse (kosong = tombol mengarah ke form kontak)
  - accessKey Web3Forms (aktifkan juga hCaptcha untuk form ini di dashboard Web3Forms)
  - testimonials: isi HANYA dengan testimoni asli
*/
window.SITE = {
  config: {
    siteUrl: 'studiosheven.my.id',
    web3formsAccessKey: '676f16b9-3154-427f-a465-98170e8078ed',
    whatsapp: '628567017461',
    whatsappLabel: '+62 856-7017-461',
    email: 'sgasheila21@gmail.com', // TODO
  },

  products: {
    graciatitip: { url: 'https://titipgracia.studiosheven.my.id/' },
    warehouse: { url: 'https://warehouse-management.studiosheven.my.id/' }, // TODO: tautan pendaftaran beta
  },

  // Fakta yang benar saja. Jangan isi angka karangan.
  stats: [
    { key: 'products', to: 3 },
    { key: 'live', to: 1 },
    { key: 'modules', to: 6 },
    { key: 'year', to: 2026, static: true },
  ],

  // Kosong = bagian testimoni menampilkan ajakan pengguna pertama.
  // Format: { quote: { id: "...", en: "..." }, name: "...", role: "..." }
  testimonials: [],

  i18n: {
    id: {
      meta: {
        title: 'Sheven Studio | Studio software untuk aplikasi skala besar',
        description:
          'Sheven Studio membantu pemilik bisnis membangun aplikasi besar secara bertahap. Produk kami: TitipGracia, Gudangku, dan RestoPOS.',
      },
      nav: {
        home: 'Beranda',
        products: 'Produk',
        services: 'Layanan',
        about: 'Tentang',
        contact: 'Kontak',
        cta: 'Konsultasi Gratis',
        menu: 'Buka menu',
        close: 'Tutup menu',
        lang: 'Ganti bahasa ke English',
      },
      hero: {
        l1: 'Wujudkan Aplikasi',
        l2: 'Besar Anda',
        sub: 'Sheven Studio membantu pemilik bisnis dan tim yang kesulitan membangun aplikasi besar: dari memetakan kebutuhan, mendesain, sampai merilis bertahap.',
        cta1: 'Jadwalkan Konsultasi Gratis',
        cta2: 'Lihat Produk Kami',
        pick: 'Pilih produk untuk dilihat',
        pause: 'Jeda animasi',
        play: 'Putar animasi',
        demo: [
          { name: 'Gudangku', note: 'Warehouse & Fleet, Beta' },
          { name: 'TitipGracia', note: 'Jasa titip, Live' },
          { name: 'RestoPOS', note: 'POS restoran, Beta' },
        ],
        scroll: 'Gulir ke bawah',
      },
      mock: {
        caption: 'Ilustrasi antarmuka, data contoh',
        wh: {
          tagline: 'Gudang tertata, pengiriman terpantau.',
          sub: 'Stok per rak, opname, histori mutasi, rekomendasi muatan truk, hingga pelacakan armada.',
          chips: [
            'Stok dan lokasi rak',
            'Stok opname',
            'Rekomendasi muatan',
            'Pelacakan truk',
          ],
          welcome: 'Selamat datang kembali',
          signin: 'Masuk untuk mengelola gudang dan pengiriman Anda.',
          user: 'Username',
          pass: 'Password',
          enter: 'Masuk',
          foot: 'Gudangku, Warehouse & Fleet. v0.1.0-beta.1',
        },
        gt: {
          title: 'Pesanan Titipan',
          cols: ['Dipesan', 'Dibeli', 'Dikirim'],
          card: 'Pesanan A',
        },
        rs: {
          title: 'Kasir',
          table: 'Meja',
          ticket: 'Pesanan meja 2',
          items: ['Menu contoh A', 'Menu contoh B', 'Menu contoh C'],
          state: ['Kosong', 'Terisi', 'Memesan'],
          total: 'Total',
          pay: 'Bayar',
        },
      },
      marquee: [
        'Gudangku',
        'RestoPOS',
        'TitipGracia',
        'HR & Payroll',
        'CRM',
        'Church Management',
      ],
      products: {
        title: 'Satu aplikasi terpusat untuk semua kebutuhan bisnis',
        intro:
          'Itu cita-cita kami. Hari ini kami membangunnya satu modul pada satu waktu: tiga sudah berjalan, tiga lagi menyusul.',
        more: 'Modul lain',
        notify: 'Kabari saya saat dimulai',
        mapHint: 'Pilih modul untuk melihat detailnya',
        notStarted:
          'Belum dimulai. Tampilan akan hadir saat pengerjaan dimulai.',
        live: 'Live',
        beta: 'Beta',
        soon: 'Segera hadir',
        planned: 'Direncanakan',
        graciatitip: {
          tag: 'Jasa titip',
          desc: 'Jasa titip belanja dari kota dan negara lain. Bayar deposit 50%, kami belikan, lalu lunasi sisanya setelah ongkir pasti.',
          cta: 'Buka TitipGracia',
        },
        warehouse: {
          tag: 'Warehouse & Fleet',
          desc: 'Aplikasi gudang dan armada untuk stok per rak, stok opname, histori mutasi, rekomendasi muatan truk, dan pelacakan truk.',
          cta: 'Gabung Beta Gudangku',
        },
        resto: {
          tag: 'Restoran',
          desc: 'POS restoran untuk banyak outlet: kasir, sesi meja dengan QR, layar dapur, menu dengan varian, promo, dan laporan.',
          cta: 'Gabung Beta RestoPOS',
        },
        roadmapTitle: 'Di peta jalan',
        railTitle: 'Status setiap produk',
        roadmap: [
          {
            name: 'HR & Payroll',
            desc: 'Data karyawan, absensi, dan penggajian.',
          },
          { name: 'CRM', desc: 'Mengelola pelanggan dan riwayat komunikasi.' },
          {
            name: 'Church Management',
            desc: 'Pengelolaan jemaat dan kegiatan gereja.',
          },
        ],
      },
      services: {
        title: 'Aplikasi Anda terasa terlalu besar untuk dimulai?',
        intro:
          'Kami memecahnya menjadi bagian yang bisa dibangun, diuji, dan dirilis satu per satu.',
        items: [
          {
            n: '01',
            title: 'Konsultasi dan pemetaan',
            desc: 'Kita bicarakan masalah bisnis Anda, lalu memetakannya menjadi daftar modul dan urutan pengerjaan.',
          },
          {
            n: '02',
            title: 'Desain produk',
            desc: 'Alur dan tampilan dirancang dulu, supaya Anda bisa melihat bentuknya sebelum kode ditulis.',
          },
          {
            n: '03',
            title: 'Pengembangan bertahap',
            desc: 'Dimulai dari versi kecil yang bisa dipakai, lalu modul ditambah sesuai kebutuhan nyata.',
          },
          {
            n: '04',
            title: 'Peluncuran dan perawatan',
            desc: 'Aplikasi dirilis, dipantau, dan diperbaiki berdasarkan pemakaian sesungguhnya.',
          },
        ],
      },
      process: {
        title: 'Cara kami bekerja sama',
        steps: [
          {
            title: 'Bercerita',
            desc: 'Anda ceritakan bisnis dan masalahnya. Konsultasi pertama gratis.',
          },
          {
            title: 'Memetakan',
            desc: 'Kami susun modul, prioritas, dan urutan rilis dalam satu dokumen yang jelas.',
          },
          {
            title: 'Membangun',
            desc: 'Setiap tahap selesai dengan versi yang bisa Anda coba.',
          },
          {
            title: 'Meluncur',
            desc: 'Aplikasi dipakai pengguna nyata, lalu kita lanjutkan dari masukan mereka.',
          },
        ],
      },
      stats: {
        title: 'Baru mulai, dan terbuka soal itu.',
        intro:
          'Kami belum punya ribuan pengguna. Yang kami punya: produk nyata yang sudah berjalan dan peta jalan yang jelas.',
        labels: {
          products: 'produk sedang dibangun',
          live: 'produk sudah live',
          modules: 'modul di peta jalan',
          year: 'tahun Sheven Studio berdiri',
        },
      },
      about: {
        title: 'Dua founder, satu studio',
        intro:
          'Sheven Studio dimulai dari dua orang yang ingin membuat aplikasi berguna untuk bisnis kecil dan menengah.',
        placeholder: 'Foto segera diganti',
        founders: [
          {
            name: '[Nama Founder 1]',
            role: 'Co-founder dan Lead Developer',
            img: 'assets/img/founders/founder-1.png',
          },
          {
            name: '[Nama Founder 2]',
            role: 'Co-founder, Produk dan Desain',
            img: 'assets/img/founders/founder-2.png',
          },
        ],
        timelineTitle: 'Perjalanan kami',
        timeline: [
          {
            when: 'Agustus 2026',
            title: 'Sheven Studio berdiri',
            desc: 'Dua founder memulai studio untuk membangun produk digital sendiri.',
          },
          {
            when: 'September 2026',
            title: 'Tiga produk mulai dibangun',
            desc: 'TitipGracia, Gudangku, dan RestoPOS dikerjakan bersamaan.',
          },
          {
            when: 'Sekarang',
            title: 'Satu live, dua beta',
            desc: 'TitipGracia sudah live. Gudangku dan RestoPOS dalam beta.',
          },
          {
            when: 'Berikutnya',
            title: 'HR & Payroll, CRM, Church Management',
            desc: 'Modul-modul ini ada di peta jalan dan belum dimulai.',
          },
        ],
      },
      testimonials: {
        title: 'Pengguna pertama kami',
        emptyTitle: 'Belum ada testimoni.',
        emptyBody:
          'Kami baru memulai, dan kami tidak akan mengarang kutipan. Coba salah satu produk kami, lalu ceritakan pengalaman Anda. Cerita pertama bisa muncul di sini.',
        emptyCta: 'Coba produk kami',
      },
      contact: {
        title: 'Ceritakan aplikasi yang ingin Anda bangun',
        intro:
          'Konsultasi pertama gratis. Pilih cara yang paling nyaman untuk Anda.',
        wa: 'Chat WhatsApp',
        mail: 'Kirim email',
        waText: 'Halo Sheven Studio, saya ingin konsultasi tentang aplikasi.',
        form: {
          name: 'Nama',
          email: 'Email',
          topic: 'Topik',
          message: 'Ceritakan kebutuhan Anda',
          topics: {
            consult: 'Konsultasi proyek',
            beta: 'Gabung beta Gudangku',
            resto: 'Gabung beta RestoPOS',
            other: 'Lainnya',
          },
          send: 'Kirim Pesan',
          sending: 'Mengirim...',
          ok: 'Pesan terkirim. Kami akan membalas lewat email Anda.',
          fail: 'Pesan belum terkirim. Silakan hubungi kami lewat WhatsApp atau email di samping.',
          note: 'Data Anda hanya dipakai untuk membalas pesan ini.',
          errName: 'Nama harus 4 sampai 50 karakter.',
          errEmail:
            'Masukkan alamat email yang valid, misalnya nama@email.com.',
          errEmailLong: 'Email maksimal 50 karakter.',
          errMsg: 'Ceritakan kebutuhan Anda dalam 21 sampai 500 karakter.',
          spam: 'Pesan ini terdeteksi seperti spam otomatis, jadi tidak dikirim. Jika ini keliru, tulis ulang dengan lebih jelas atau hubungi kami lewat WhatsApp.',
          wait: 'Pesan sebelumnya baru saja terkirim. Tunggu semenit sebelum mengirim lagi.',
          captcha:
            'Centang verifikasi "saya bukan robot" dulu. Jika kotaknya tidak muncul, muat ulang halaman.',
        },
      },
      footer: {
        rights: 'Semua hak dilindungi.',
        tagline: 'Studio software dari Indonesia.',
        top: 'Kembali ke atas',
      },
    },

    en: {
      meta: {
        title: 'Sheven Studio | A software studio for large-scale apps',
        description:
          'Sheven Studio helps business owners build large applications in stages. Our products: TitipGracia, Gudangku, and RestoPOS.',
      },
      nav: {
        home: 'Home',
        products: 'Products',
        services: 'Services',
        about: 'About',
        contact: 'Contact',
        cta: 'Free Consultation',
        menu: 'Open menu',
        close: 'Close menu',
        lang: 'Switch language to Bahasa Indonesia',
      },
      hero: {
        l1: 'Build the App',
        l2: 'You Dreamed Of',
        sub: 'Sheven Studio helps business owners and teams who struggle to build large applications: from mapping the needs and designing, to releasing in stages.',
        cta1: 'Book a Free Consultation',
        cta2: 'See Our Products',
        pick: 'Choose a product to view',
        pause: 'Pause animation',
        play: 'Play animation',
        demo: [
          { name: 'Gudangku', note: 'Warehouse & Fleet, Beta' },
          { name: 'TitipGracia', note: 'Personal shopper, Live' },
          { name: 'RestoPOS', note: 'Restaurant POS, Beta' },
        ],
        scroll: 'Scroll down',
      },
      mock: {
        caption: 'Interface illustration, sample data',
        wh: {
          tagline: 'Tested stock, tracked deliveries.',
          sub: 'Stock per rack, stock counts, movement history, truck load recommendations, and fleet tracking.',
          chips: [
            'Stock and rack location',
            'Stock count',
            'Load recommendation',
            'Truck tracking',
          ],
          welcome: 'Welcome back',
          signin: 'Sign in to manage your warehouse and deliveries.',
          user: 'Username',
          pass: 'Password',
          enter: 'Sign in',
          foot: 'Gudangku, Warehouse & Fleet. v0.1.0-beta.1',
        },
        gt: {
          title: 'Forwarded Orders',
          cols: ['Ordered', 'Bought', 'Shipped'],
          card: 'Order A',
        },
        rs: {
          title: 'Cashier',
          table: 'Table',
          ticket: 'Order, table 2',
          items: ['Sample dish A', 'Sample dish B', 'Sample dish C'],
          state: ['Empty', 'Seated', 'Ordering'],
          total: 'Total',
          pay: 'Pay',
        },
      },
      marquee: [
        'Gudangku',
        'RestoPOS',
        'TitipGracia',
        'HR & Payroll',
        'CRM',
        'Church Management',
      ],
      products: {
        title: 'One central app for every business need',
        intro:
          'That is our goal. Today we build it one module at a time: three are running, three more are coming.',
        more: 'More modules',
        notify: 'Tell me when it starts',
        mapHint: 'Select a module to see its details',
        notStarted: 'Not started yet. Screens will appear once work begins.',
        live: 'Live',
        beta: 'Beta',
        soon: 'Coming soon',
        planned: 'Planned',
        graciatitip: {
          tag: 'Personal shopper',
          desc: 'Personal shopping from other cities and countries. Pay a 50% deposit, we buy it for you, then pay the rest once shipping is final.',
          cta: 'Open TitipGracia',
        },
        warehouse: {
          tag: 'Warehouse & Fleet',
          desc: 'A warehouse and fleet app for stock per rack, stock counts, movement history, truck load recommendations, and truck tracking.',
          cta: 'Join the Gudangku Beta',
        },
        resto: {
          tag: 'Restaurants',
          desc: 'A multi-outlet restaurant POS: cashier, table sessions with QR, kitchen display, menus with variants, promos, and reports.',
          cta: 'Join the RestoPOS Beta',
        },
        roadmapTitle: 'On the roadmap',
        railTitle: 'Status of every product',
        roadmap: [
          {
            name: 'HR & Payroll',
            desc: 'Employee records, attendance, and payroll.',
          },
          { name: 'CRM', desc: 'Manage customers and conversation history.' },
          {
            name: 'Church Management',
            desc: 'Congregation and church activity management.',
          },
        ],
      },
      services: {
        title: 'Does your app feel too big to start?',
        intro:
          'We break it into parts that can be built, tested, and released one at a time.',
        items: [
          {
            n: '01',
            title: 'Consulting and mapping',
            desc: 'We talk through your business problem, then turn it into a list of modules and a build order.',
          },
          {
            n: '02',
            title: 'Product design',
            desc: 'Flows and screens are designed first, so you can see the shape before any code is written.',
          },
          {
            n: '03',
            title: 'Staged development',
            desc: 'We start with a small usable version, then add modules as real needs appear.',
          },
          {
            n: '04',
            title: 'Launch and upkeep',
            desc: 'The app ships, gets monitored, and is improved based on actual usage.',
          },
        ],
      },
      process: {
        title: 'How we work together',
        steps: [
          {
            title: 'Tell the story',
            desc: 'You describe the business and the problem. The first consultation is free.',
          },
          {
            title: 'Map it',
            desc: 'We write down modules, priorities, and the release order in one clear document.',
          },
          {
            title: 'Build it',
            desc: 'Every stage ends with a version you can try.',
          },
          {
            title: 'Launch it',
            desc: 'Real users start using it, and we continue from their feedback.',
          },
        ],
      },
      stats: {
        title: 'Just starting out, and open about it.',
        intro:
          "We don't have thousands of users yet. What we do have: real products that already run, and a clear roadmap.",
        labels: {
          products: 'products being built',
          live: 'product already live',
          modules: 'modules on the roadmap',
          year: 'the year Sheven Studio was founded',
        },
      },
      about: {
        title: 'Two founders, one studio',
        intro:
          'Sheven Studio started with two people who want to build useful software for small and mid-sized businesses.',
        placeholder: 'Photo to be replaced',
        founders: [
          {
            name: 'Sheila Gracia Angelina',
            role: 'Founder',
            img: 'assets/img/founders/founder-1.png',
          },
          {
            name: 'Steven Alexander Grant',
            role: 'Founder',
            img: 'assets/img/founders/founder-2.png',
          },
        ],
        timelineTitle: 'Our journey',
        timeline: [
          {
            when: 'August 2026',
            title: 'Sheven Studio is founded',
            desc: 'Two founders start a studio to build their own digital products.',
          },
          {
            when: 'September 2026',
            title: 'Three products begin',
            desc: 'TitipGracia, Gudangku, and RestoPOS are built side by side.',
          },
          {
            when: 'Now',
            title: 'One live, two in beta',
            desc: 'TitipGracia is live. Gudangku and RestoPOS are in beta.',
          },
          {
            when: 'Next',
            title: 'HR & Payroll, CRM, Church Management',
            desc: 'These modules are on the roadmap and have not started yet.',
          },
        ],
      },
      testimonials: {
        title: 'Our first users',
        emptyTitle: 'No testimonials yet.',
        emptyBody:
          "We are just starting, and we won't invent quotes. Try one of our products and tell us how it went. Your story could be the first one here.",
        emptyCta: 'Try our products',
      },
      contact: {
        title: 'Tell us about the app you want to build',
        intro:
          'The first consultation is free. Pick whichever way suits you best.',
        wa: 'Chat on WhatsApp',
        mail: 'Send an email',
        waText: 'Hello Sheven Studio, I would like to talk about an app.',
        form: {
          name: 'Name',
          email: 'Email',
          topic: 'Topic',
          message: 'Tell us what you need',
          topics: {
            consult: 'Project consultation',
            beta: 'Join Gudangku beta',
            resto: 'Join RestoPOS beta',
            other: 'Something else',
          },
          send: 'Send Message',
          sending: 'Sending...',
          ok: 'Message sent. We will reply to your email.',
          fail: 'The message was not sent. Please reach us on WhatsApp or by email beside this form.',
          note: 'Your details are only used to reply to this message.',
          errName: 'Name must be 4 to 50 characters.',
          errEmail: 'Enter a valid email address, for example name@email.com.',
          errEmailLong: 'Email must be at most 50 characters.',
          errMsg: 'Tell us what you need in 21 to 500 characters.',
          spam: 'This message looks like automated spam, so it was not sent. If this is a mistake, rewrite it more clearly or reach us on WhatsApp.',
          wait: 'Your previous message was just sent. Please wait a minute before sending another.',
          captcha:
            'Please complete the "I am human" check first. If the box does not appear, reload the page.',
        },
      },
      footer: {
        rights: 'All rights reserved.',
        tagline: 'A software studio from Indonesia.',
        top: 'Back to top',
      },
    },
  },
};
