import Head from 'next/head';
import LogoHeader from './LogoHeader';

export default function Layout({ children, title='ElitePay Wallet' }) {
  return (
    <div className="app-root">
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/elitepay-logo.png" />
      </Head>

      <LogoHeader />
      <main className="container page-fade">
        {children}
      </main>

      <footer className="gt-footer">
        <div className="container">
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap:12, flexWrap:'wrap'}}>
            <div className="small muted">© {new Date().getFullYear()} ElitePay - Fast. Secure. Verified.</div>
            <div className="small muted">Version 1.0.0</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
