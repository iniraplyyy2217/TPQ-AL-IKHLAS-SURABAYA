import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'TPA Al-Ikhlas Surabaya - Belajar Ceria, Hafalan & Kuis Berpoint',
  description: 'Website resmi TPA Al-Ikhlas Surabaya. Pembelajaran Dinul Islam, Aqidah, Tajwid, Praktik Sholat, Bank Soal berhadiah point dengan tepuk tangan, Absensi WhatsApp otomatis, dan Cetak Ijazah.',
  openGraph: {
    title: 'TPA Al-Ikhlas Surabaya - Belajar Ceria, Hafalan & Kuis Berpoint',
    description: 'Website resmi TPA Al-Ikhlas Surabaya. Pembelajaran Dinul Islam, Aqidah, Tajwid, Praktik Sholat, Absensi WhatsApp otomatis, dan Cetak Ijazah.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TPA Al-Ikhlas Surabaya',
    description: 'Website resmi TPA Al-Ikhlas Surabaya untuk santri SD yang ceria dan berprestasi.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="id">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof window === 'undefined') return;

                function isFetchGetterError(err) {
                  if (!err) return false;
                  var msg = typeof err === 'string' ? err : (err.message || '');
                  return msg.indexOf('fetch') !== -1 && msg.indexOf('getter') !== -1;
                }

                window.addEventListener('error', function(e) {
                  if (isFetchGetterError(e.error) || isFetchGetterError(e.message)) {
                    if (typeof e.preventDefault === 'function') e.preventDefault();
                    if (typeof e.stopImmediatePropagation === 'function') e.stopImmediatePropagation();
                    return true;
                  }
                }, true);

                window.addEventListener('unhandledrejection', function(e) {
                  if (isFetchGetterError(e.reason)) {
                    if (typeof e.preventDefault === 'function') e.preventDefault();
                    return true;
                  }
                });

                var prevOnError = window.onerror;
                window.onerror = function(msg, url, line, col, err) {
                  if (isFetchGetterError(msg) || isFetchGetterError(err)) {
                    return true;
                  }
                  if (typeof prevOnError === 'function') {
                    return prevOnError.apply(this, arguments);
                  }
                  return false;
                };

                try {
                  var storedFetch = window.fetch ? window.fetch.bind(window) : function() { return Promise.reject(new Error('Fetch not available')); };
                  var desc = Object.getOwnPropertyDescriptor(window, 'fetch');
                  if (desc && !desc.set && desc.configurable) {
                    try { delete window.fetch; } catch(e) {}
                  }

                  try {
                    Object.defineProperty(window, 'fetch', {
                      get: function() { return storedFetch; },
                      set: function(fn) { storedFetch = fn; },
                      configurable: true,
                      enumerable: true
                    });
                  } catch(e1) {}

                  if (typeof Window !== 'undefined' && Window.prototype) {
                    try {
                      Object.defineProperty(Window.prototype, 'fetch', {
                        get: function() { return storedFetch; },
                        set: function(fn) { storedFetch = fn; },
                        configurable: true,
                        enumerable: true
                      });
                    } catch(e2) {}
                  }
                } catch(err) {}
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
