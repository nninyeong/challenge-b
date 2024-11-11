import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = '드림카드';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';
const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};

const Image = async () => {
  const logoBuffer = await fetch(new URL('../../public/assets/images/branding/2D-logo.png', import.meta.url)).then(
    (res) => res.arrayBuffer(),
  );

  const logoSrc = `data:image/png;base64,${arrayBufferToBase64(logoBuffer)}`;

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: '#FF6666',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src={logoSrc}
          alt=''
          width='300'
        />
      </div>
    ),
    {
      ...size,
    },
  );
};

export default Image;
