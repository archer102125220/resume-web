import Head from 'next/head';
import { makeStyles } from '@mui/styles';

import useGTMTrack from '@/hooks/useGTMTrack';
import Youtube from '@/components/Youtube';

const styles = {
  youtube: {
    height: '600px'
  }
};

const useStyles = makeStyles(styles);

function YoutubeApi(props) {
  const classes = useStyles(props);

  useGTMTrack({ event: 'scnOpen', url: '/portfolio/youtube-api' });

  return (
    <div className={classes.container}>
      <Head>
        <title>Parker Chan 的個人資料 - youtube api react整合</title>
      </Head>
      <div className={classes.main}>
        <p>
          參與BBS專案時，有將youtube
          api整合至Vue2的經驗，想說嘗試也整合進react中試試看
        </p>
        <div className={classes.youtube}>
          <Youtube videoId="W8p5RPTPsoU" />
        </div>
      </div>
    </div>
  );
}

export default YoutubeApi;
