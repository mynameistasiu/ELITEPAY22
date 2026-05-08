import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import { useState } from 'react';

const features = [
  {
    title: 'Pulse Miner',
    text: 'Start a guided mining session, track the progress phases, and claim your reward into your wallet.',
  },
  {
    title: 'Transfer Checkout',
    text: 'Buy your withdrawal code through a clean bank-transfer checkout with copy actions and vendor support.',
  },
  {
    title: 'Verified Records',
    text: 'Keep a readable history of mining, withdrawal, and code purchase activity with receipts.',
  },
  {
    title: 'Account Protection',
    text: 'Withdrawals use code verification and activation checks to keep the wallet flow controlled.',
  },
];

const steps = [
  ['Create account', 'Register with your name and phone number once.'],
  ['Run Pulse Miner', 'Use the mining center to generate and claim your wallet reward.'],
  ['Withdraw securely', 'Use your withdrawal code and bank details to submit a withdrawal.'],
];

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showGuide, setShowGuide] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState('Preparing secure session...');

  const goWithLoader = (path, message = 'Preparing secure session...') => {
    setShowGuide(false);
    setLoadingMessage(message);
    setLoading(true);

    setTimeout(() => setLoadingMessage('Opening ElitePay services...'), 550);
    setTimeout(() => setLoadingMessage('Securing your wallet session...'), 1100);

    setTimeout(() => {
      router.push(path);
    }, 1500);
  };

  return (
    <Layout title="ElitePay Wallet">
      <style>{`
        .home-shell {
          display: grid;
          gap: 18px;
          padding: 8px 0 22px;
        }

        .guide-overlay {
          position: fixed;
          inset: 0;
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 18px;
          background: rgba(16, 32, 51, 0.52);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .guide-modal {
          width: min(940px, 100%);
          max-height: min(92vh, 860px);
          overflow: auto;
          border-radius: 8px;
          border: 1px solid rgba(219, 230, 243, 0.96);
          background: #ffffff;
          box-shadow: 0 28px 80px rgba(16, 32, 51, 0.28);
          animation: settle 0.24s ease both;
        }

        .guide-header {
          display: flex;
          align-items: start;
          justify-content: space-between;
          gap: 14px;
          padding: 20px 20px 14px;
          border-bottom: 1px solid #edf3f8;
        }

        .guide-title {
          margin: 0;
          color: #102033;
          font-size: clamp(22px, 3vw, 32px);
          line-height: 1.08;
          font-weight: 950;
        }

        .guide-close {
          width: 38px;
          height: 38px;
          flex: 0 0 auto;
          display: grid;
          place-items: center;
          border: 1px solid #dbe6f3;
          border-radius: 8px;
          background: #ffffff;
          color: #102033;
          font-size: 24px;
          line-height: 1;
          cursor: pointer;
        }

        .guide-close:hover {
          background: #f3f8fb;
          color: #077a55;
        }

        .guide-body {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(310px, 0.92fr);
          gap: 18px;
          padding: 18px 20px 20px;
        }

        .guide-intro {
          margin: 0 0 14px;
          color: #52667a;
          font-size: 15px;
        }

        .guide-steps {
          display: grid;
          gap: 10px;
        }

        .guide-step {
          display: grid;
          grid-template-columns: 36px 1fr;
          gap: 11px;
          align-items: start;
          padding: 12px;
          border: 1px solid #dbe6f3;
          border-radius: 8px;
          background: #fbfdff;
        }

        .guide-step span {
          width: 36px;
          height: 36px;
          display: grid;
          place-items: center;
          border-radius: 8px;
          color: #ffffff;
          background: linear-gradient(135deg, #0f9f6e, #19b9a7);
          font-weight: 950;
        }

        .guide-step h3 {
          margin: 0 0 4px;
          color: #102033;
          font-size: 15px;
        }

        .guide-step p {
          margin: 0;
        }

        .guide-video-wrap {
          display: grid;
          gap: 12px;
          align-content: start;
        }

        .guide-video {
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: 8px;
          background: #102033;
          border: 1px solid #dbe6f3;
        }

        .guide-actions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: flex-end;
          padding: 0 20px 20px;
        }

        .hero-panel {
          position: relative;
          overflow: hidden;
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) minmax(300px, 0.85fr);
          gap: 26px;
          align-items: center;
          min-height: 430px;
          padding: 34px;
          background:
            linear-gradient(135deg, rgba(15, 159, 110, 0.12), transparent 46%),
            linear-gradient(180deg, #ffffff, #f6fbff);
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          width: fit-content;
          padding: 7px 10px;
          border-radius: 999px;
          background: #e9f8f2;
          color: #077a55;
          font-size: 12px;
          font-weight: 900;
          margin-bottom: 14px;
        }

        .hero-title {
          margin: 0;
          max-width: 680px;
          color: #102033;
          font-size: clamp(34px, 5vw, 58px);
          line-height: 1.02;
          font-weight: 950;
        }

        .hero-copy {
          max-width: 590px;
          margin: 16px 0 0;
          color: #52667a;
          font-size: 16px;
        }

        .hero-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 22px;
        }

        .hero-proof {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
          max-width: 560px;
          margin-top: 22px;
        }

        .proof-item {
          padding: 12px;
          border: 1px solid #dbe6f3;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.74);
        }

        .proof-value {
          color: #102033;
          font-weight: 950;
          font-size: 18px;
        }

        .proof-label {
          color: #64748b;
          font-size: 12px;
          margin-top: 2px;
        }

        .hero-visual {
          display: grid;
          gap: 14px;
          align-content: center;
        }

        .brand-showcase {
          display: grid;
          place-items: center;
          min-height: 265px;
          border-radius: 8px;
          background:
            radial-gradient(circle at 50% 35%, rgba(15, 159, 110, 0.22), transparent 48%),
            linear-gradient(135deg, #102033, #0d3f32);
          box-shadow: 0 26px 60px rgba(16, 32, 51, 0.18);
        }

        .brand-showcase img {
          width: min(250px, 78%);
          height: auto;
          object-fit: contain;
          filter: drop-shadow(0 18px 26px rgba(0, 0, 0, 0.26));
        }

        .wallet-preview {
          padding: 16px;
          border-radius: 8px;
          background: #ffffff;
          border: 1px solid #dbe6f3;
          box-shadow: 0 16px 34px rgba(16, 32, 51, 0.10);
        }

        .preview-row {
          display: flex;
          justify-content: space-between;
          gap: 14px;
          padding: 10px 0;
          border-top: 1px solid #edf3f8;
        }

        .preview-row:first-child {
          border-top: 0;
          padding-top: 0;
        }

        .section-head {
          display: flex;
          justify-content: space-between;
          align-items: end;
          gap: 18px;
          margin-bottom: 12px;
        }

        .section-title {
          margin: 0;
          color: #102033;
          font-size: 24px;
          font-weight: 950;
        }

        .section-copy {
          max-width: 540px;
          margin: 6px 0 0;
          color: #64748b;
          font-size: 14px;
        }

        .feature-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 12px;
        }

        .feature-card,
        .step-card,
        .security-card {
          padding: 16px;
          border-radius: 8px;
          background: #ffffff;
          border: 1px solid #dbe6f3;
        }

        .feature-number {
          width: 34px;
          height: 34px;
          display: grid;
          place-items: center;
          border-radius: 8px;
          background: #e9f8f2;
          color: #077a55;
          font-weight: 950;
          margin-bottom: 14px;
        }

        .feature-card h3,
        .step-card h3,
        .security-card h3 {
          margin: 0 0 8px;
          color: #102033;
          font-size: 16px;
        }

        .step-list {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
        }

        .step-card {
          display: grid;
          grid-template-columns: 42px 1fr;
          gap: 12px;
          align-items: start;
        }

        .step-index {
          width: 42px;
          height: 42px;
          display: grid;
          place-items: center;
          border-radius: 8px;
          color: #ffffff;
          background: linear-gradient(135deg, #0f9f6e, #19b9a7);
          font-weight: 950;
        }

        .security-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
        }

        .cta-panel {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          padding: 24px;
          color: #ffffff;
          background: linear-gradient(135deg, #102033, #0f5f48);
        }

        .cta-panel h2 {
          margin: 0;
          font-size: 26px;
        }

        .cta-panel p {
          margin: 6px 0 0;
          color: rgba(255, 255, 255, 0.76);
        }

        .cta-panel .btnGhost {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.10);
          border-color: rgba(255, 255, 255, 0.20);
        }

        @media (max-width: 900px) {
          .hero-panel {
            grid-template-columns: 1fr;
          }

          .guide-body {
            grid-template-columns: 1fr;
          }

          .feature-grid,
          .step-list,
          .security-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 640px) {
          .hero-panel {
            min-height: auto;
            padding: 22px 16px;
          }

          .hero-proof,
          .feature-grid,
          .step-list,
          .security-grid {
            grid-template-columns: 1fr;
          }

          .section-head,
          .cta-panel {
            align-items: stretch;
            flex-direction: column;
          }

          .brand-showcase {
            min-height: 220px;
          }

          .step-card {
            grid-template-columns: 1fr;
          }

          .guide-overlay {
            align-items: stretch;
            padding: 10px;
          }

          .guide-modal {
            max-height: calc(100vh - 20px);
          }

          .guide-header,
          .guide-body,
          .guide-actions {
            padding-left: 14px;
            padding-right: 14px;
          }

          .guide-actions {
            justify-content: stretch;
          }
        }
      `}</style>

      {showGuide && (
        <div className="guide-overlay" role="dialog" aria-modal="true" aria-labelledby="guide-title">
          <div className="guide-modal">
            <div className="guide-header">
              <div>
                <div className="eyebrow" style={{ marginBottom: 10 }}>Welcome To ElitePay</div>
                <h2 className="guide-title" id="guide-title">How to earn from this website</h2>
              </div>
              <button className="guide-close" type="button" aria-label="Close tutorial" onClick={() => setShowGuide(false)}>
                ×
              </button>
            </div>

            <div className="guide-body">
              <div>
                <p className="guide-intro">
                  ElitePay helps you create an account, run Pulse Miner, claim your reward into your wallet,
                  and withdraw securely when your account is ready.
                </p>

                <div className="guide-steps" aria-label="How to earn steps">
                  <article className="guide-step">
                    <span>1</span>
                    <div>
                      <h3>Create your account</h3>
                      <p className="small muted">Register with your name and phone number so the app can prepare your wallet.</p>
                    </div>
                  </article>
                  <article className="guide-step">
                    <span>2</span>
                    <div>
                      <h3>Open the mining center</h3>
                      <p className="small muted">Go to Pulse Miner, start a mining session, and wait for the progress to complete.</p>
                    </div>
                  </article>
                  <article className="guide-step">
                    <span>3</span>
                    <div>
                      <h3>Claim your reward</h3>
                      <p className="small muted">When the session is complete, claim the reward so it enters your ElitePay wallet balance.</p>
                    </div>
                  </article>
                  <article className="guide-step">
                    <span>4</span>
                    <div>
                      <h3>Withdraw with your code</h3>
                      <p className="small muted">Buy or verify your withdrawal code, add your bank details, and submit your withdrawal request.</p>
                    </div>
                  </article>
                </div>
              </div>

              <div className="guide-video-wrap">
                <video className="guide-video" controls preload="metadata" playsInline>
                  <source src="/tutorial.MP4" type="video/mp4" />
                  Your browser does not support the video tutorial.
                </video>
                <p className="small muted">
                  Watch this tutorial to see how the website works before you continue.
                </p>
              </div>
            </div>

            <div className="guide-actions">
              <button className="btnGhost" type="button" onClick={() => setShowGuide(false)}>
                Close
              </button>
              <button className="btn" type="button" onClick={() => goWithLoader('/register', 'Creating your ElitePay account...')}>
                Create Account
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="home-shell">
        <section className="card hero-panel">
          <div>
            <div className="eyebrow">ElitePay Wallet System</div>
            <h1 className="hero-title">Earn, verify, and withdraw from one clean wallet.</h1>
            <p className="hero-copy">
              ElitePay brings Pulse Miner rewards, secure wallet records, activation-code withdrawals,
              and a simple vendor checkout into one focused account experience.
            </p>

            <div className="hero-actions">
              <button className="btn" onClick={() => goWithLoader('/register', 'Creating your ElitePay account...')}>
                Create Account
              </button>
              <button className="btnGhost" onClick={() => goWithLoader('/login', 'Opening login...')}>
                Login
              </button>
            </div>

            <div className="hero-proof" aria-label="ElitePay highlights">
              <div className="proof-item">
                <div className="proof-value">NGN</div>
                <div className="proof-label">Wallet balance tracking</div>
              </div>
              <div className="proof-item">
                <div className="proof-value">4-digit</div>
                <div className="proof-label">Withdrawal code flow</div>
              </div>
              <div className="proof-item">
                <div className="proof-value">24/7</div>
                <div className="proof-label">Vendor contact access</div>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="brand-showcase">
              <img src="/elitepay-logo.png" alt="ElitePay logo" />
            </div>
            <div className="wallet-preview">
              <div className="preview-row">
                <span className="small muted">Wallet Status</span>
                <strong>Ready</strong>
              </div>
              <div className="preview-row">
                <span className="small muted">Miner Engine</span>
                <strong>Pulse Miner</strong>
              </div>
              <div className="preview-row">
                <span className="small muted">Checkout Method</span>
                <strong>Bank Transfer</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="card">
          <div className="section-head">
            <div>
              <h2 className="section-title">Built For The Main Wallet Actions</h2>
              <p className="section-copy">The first screen now explains the real product flow instead of feeling like a landing page only.</p>
            </div>
            <button className="btnGhost" onClick={() => goWithLoader('/buy-code', 'Opening code purchase...')}>
              Buy Code
            </button>
          </div>

          <div className="feature-grid">
            {features.map((feature, index) => (
              <article className="feature-card" key={feature.title}>
                <div className="feature-number">{index + 1}</div>
                <h3>{feature.title}</h3>
                <p className="small muted">{feature.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="card">
          <div className="section-head">
            <div>
              <h2 className="section-title">How Users Move</h2>
              <p className="section-copy">A simple path from signup to mining and withdrawal.</p>
            </div>
          </div>

          <div className="step-list">
            {steps.map(([title, text], index) => (
              <article className="step-card" key={title}>
                <div className="step-index">{index + 1}</div>
                <div>
                  <h3>{title}</h3>
                  <p className="small muted">{text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="card">
          <div className="section-head">
            <div>
              <h2 className="section-title">Security And Control</h2>
              <p className="section-copy">Key actions are kept visible so users understand what happens before they enter the dashboard.</p>
            </div>
          </div>

          <div className="security-grid">
            <article className="security-card">
              <h3>Local Account Session</h3>
              <p className="small muted">The app remembers the registered name and phone, so checkout does not ask for the same details again.</p>
            </article>
            <article className="security-card">
              <h3>Activation Gate</h3>
              <p className="small muted">Withdraw and activation flows keep the account lifecycle controlled after a transaction.</p>
            </article>
            <article className="security-card">
              <h3>Receipt History</h3>
              <p className="small muted">Users can review transaction records and generated receipts from the history area.</p>
            </article>
          </div>
        </section>

        <section className="card cta-panel">
          <div>
            <h2>Ready to continue?</h2>
            <p>Create an ElitePay account or log in to start from the dashboard.</p>
          </div>
          <div className="hero-actions" style={{ marginTop: 0 }}>
            <button className="btn" onClick={() => goWithLoader('/register', 'Creating your ElitePay account...')}>
              Get Started
            </button>
            <button className="btnGhost" onClick={() => goWithLoader('/login', 'Opening login...')}>
              Login
            </button>
          </div>
        </section>
      </div>

      {loading && (
        <div className="loadingOverlay" role="status" aria-live="polite">
          <div className="loadingBox">
            <div className="loader" aria-hidden="true">
              <span className="ring" />
              <span className="ring ring2" />
              <span className="spark" />
            </div>
            <div>
              <div className="loaderText">{loadingMessage}</div>
              <div className="small muted" style={{ marginTop: 4 }}>Please wait...</div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
