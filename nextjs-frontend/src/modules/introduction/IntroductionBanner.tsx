import { getIntroduction } from './contentful';
import { IntroductionColor } from './types';

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

  return (
    <section
      style={{
        ...bgStyle,
        height: '110px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          width: '100%',
          margin: '0 auto',
          padding: '0 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '40px',
        }}
      >
        {/* LEFT — Name, outside the card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <p
            style={{
              color: 'rgb(0, 102, 204)',
              fontSize: '10px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '2px',
              margin: 0,
            }}
          >
            Full Stack Developer
          </p>
          <h2
            style={{
              color: '#ffffff',
              fontSize: '22px',
              fontWeight: 700,
              lineHeight: 1.2,
              margin: 0,
              letterSpacing: '-0.5px',
            }}
          >
            {data.name}
          </h2>
        </div>

        {/* RIGHT — Black card containing only Stack Details */}
        <div
          style={{
            backgroundColor: 'rgb(0, 0, 0)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            borderRadius: '10px',
            padding: '14px 20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '10px',
            minWidth: '340px',
            maxWidth: '560px',
            flex: 1,
          }}
        >
          <p
            style={{
              color: 'rgb(0, 102, 204)',
              fontSize: '10px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '2px',
              margin: 0,
            }}
          >
            Tech Stack
          </p>
          <span
            style={{
              fontSize: '12px',
              color: '#ffffff',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              display: 'block',
            }}
          >
            {data.stackDetails}
          </span>
        </div>

      </div>
    </section>
  );
}
