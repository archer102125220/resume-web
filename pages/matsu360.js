import Head from 'next/head';
import Image from 'next/image';
// import { makeStyles } from '@mui/styles';

// import { linkStyle } from '@/styles/linkStyle';
import useGTMTrack from '@/hooks/useGTMTrack';

function Matsu360() {
  useGTMTrack({ event: 'scnOpen', url: '/bbshop' });

  return (
    <div>
      <Head>
        <title>Parker Chan 的上線專案介紹- Matsu360</title>
      </Head>
      <div>
        <p>專案連結：</p>
        <a
          href="https://etravel.matsu.gov.tw/360vr"
          target="_blank"
          rel="noreferrer noopenner"
        >
          馬祖e點通 - 360°VR 線上玩
        </a>
      </div>
      <p>專案簡介：</p>
      <p>
        本專案為愛嬉遊臺灣青年旅館聯盟的網站翻新、網站內容管理系統開發以及會員系統的整合。
      </p>
      <p>
        本專案採SSR技術（Nuxt3）開發，提供google、FaceBook以及Line等第三方的快速註冊及登入，並有FaceBook分享功能，能便於會員可快速分享心儀的文章或資訊。
      </p>

      <Image
        loading="lazy"
        src="/img/isu.png"
        alt="ISU"
        width={920}
        height={500}
      />
    </div>
  );
}

export default Matsu360;