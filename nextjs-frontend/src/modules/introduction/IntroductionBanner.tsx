import Link from 'next/link';
import { getIntroduction } from './contentful';
import { IntroductionColor } from './types';
import BackButton from './BackButton';

const BACKGROUNDS: Record<IntroductionColor, React.CSSProperties> = {
  'Dark Gold': {
    background: 'linear-gradient(135deg, #2a1f00 0%, #7a5c00 30%, #c9a227 60%, #ffca28 100%)',
  },
  'Blue': {
    backgroundColor: 'rgb(0, 102, 204)',
  },
  'White': {
    backgroundColor: '#FFFFFF',
  },
};

export default async function IntroductionBanner() {
  const data = await getIntroduction();
  if (!data) return null;

  const bgStyle = BACKGROUNDS[data.color] ?? BACKGROUNDS['Dark Gold'];

  const nameEl = (
    <h2 className="intro-name">{data.name}</h2>
  );

  return (
    <>
      <style>{`
        .intro-section {
          height: 110px;
          width: 100%;
          display: flex;
          align-items: center;
        }
        .intro-inner {
          max-width: 1280px;
          width: 100%;
          margin: 0 auto;
          padding: 0 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
        }
        .intro-name-block {
          display: flex;
          flex-direction: column;
          gap: 6px;
          flex-shrink: 0;
        }
        .intro-label {
          color: rgb(0, 102, 204);
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin: 0;
        }
        .intro-name-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .intro-name {
          color: #ffffff;
          font-size: 22px;
          font-weight: 700;
          line-height: 1.2;
          margin: 0;
          letter-spacing: -0.5px;
        }
        .intro-name-link {
          text-decoration: none;
        }
        .intro-name-link:hover .intro-name {
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .intro-card {
          background-color: rgb(0, 0, 0);
          border: 1px solid rgba(255, 255, 255, 0.25);
          border-radius: 10px;
          padding: 14px 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 10px;
          min-width: 340px;
          max-width: 560px;
          flex: 1;
        }
        .intro-card-label {
          color: rgb(0, 102, 204);
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin: 0;
        }
        .intro-card-text {
          font-size: 12px;
          color: #ffffff;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          display: block;
        }

        /* Single back button — always visible when on /bio */
        .intro-back { display: flex; }

        @media (max-width: 767px) {
          .intro-section {
            height: auto;
            align-items: stretch;
          }
          .intro-inner {
            flex-direction: column;
            align-items: flex-start;
            gap: 0;
            padding: 0;
          }
          /* Push the button down a little on mobile */
          .intro-back {
            padding-top: 12px;
            padding-left: 16px;
          }
          .intro-name-block {
            width: 100%;
            padding: 8px 16px 16px;
            gap: 4px;
          }
          .intro-name {
            font-size: 18px;
          }
          .intro-card {
            width: 100%;
            min-width: unset;
            max-width: 100%;
            flex: none;
            border-radius: 0;
            border-left: none;
            border-right: none;
            border-bottom: none;
            padding: 12px 16px;
            gap: 6px;
          }
        }
      `}</style>

      <section className="intro-section" style={bgStyle}>
        <div className="intro-inner">

          {/* ONE back button — left of name on desktop, above name on mobile */}
          <BackButton className="intro-back" />

          {/* Name block */}
          <div className="intro-name-block">
            <p className="intro-label">Full Stack Developer</p>
            <div className="intro-name-row">
              {data.nameLink ? (
                <Link href={data.nameLink} className="intro-name-link">
                  {nameEl}
                </Link>
              ) : (
                nameEl
              )}
            </div>
          </div>

          {/* Tech Stack card */}
          <div className="intro-card">
            <p className="intro-card-label">Tech Stack</p>
            <span className="intro-card-text">{data.stackDetails}</span>
          </div>

        </div>
      </section>
    </>
  );
}
