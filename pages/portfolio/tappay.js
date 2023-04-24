import Head from 'next/head';

import useGTMTrack from '@/hooks/useGTMTrack';

function Tappay() {
  useGTMTrack({ event: 'scnOpen', url: '/portfolio/tappay' });

  return (
    <div>
      <Head>
        <title>Parker Chan 的個人資料 - Tappay串接</title>
      </Head>
      <p>不好意思，頁面與動畫正在設計中，感謝您的來訪~</p>
    </div>
  );
}

export default Tappay;
