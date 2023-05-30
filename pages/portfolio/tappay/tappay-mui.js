import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import useGTMTrack from '@/hooks/useGTMTrack';
import { importTappay } from '@/utils/tappay';
import { buttonStyle } from '@/styles/buttonStyle';

const styles = {
  tappayMuiTitlLogo: {
    margin: 'auto',
    display: 'block',
    maxWidth: '300px'
  },
  tappayMuiRow: {
    margin: '10px',
    // overflow: 'hidden'
  },
  tappayMuiButton: {
    ...buttonStyle,
    margin: 'auto'
  }
};

const useStyles = makeStyles(styles);

function TappayMui() {
  const [tappay, setTapPay] = useState(null);
  const [cardNumber, setCardNumber] = useState('6224314183841750');
  const [expirationDate, setExpirationDate] = useState('10/27');
  const [ccv, setCcv] = useState('048');

  const classes = useStyles();

  useEffect(() => {
    createdTapPay();
  }, []);

  useGTMTrack({ event: 'scnOpen', url: '/portfolio/tappay/tappay-mui' });

  async function createdTapPay() {
    try {
      const _tappay = await importTappay(
        process.env.TAPPAY_APP_ID,
        process.env.TAPPAY_APP_KEY,
        process.env.TAPPAY_PROD
      );
      console.log(_tappay);
      console.dir(_tappay.card);
      setTapPay(_tappay);
    } catch (error) {
      console.log(error);
    }
  }

  function getPrime() {
    const tappayStatus = tappay.card.getTappayFieldsStatus();
    console.log(tappayStatus);

    tappay.getPrime(result => {
      console.log(result);
    });
  }

  return (
    <div>
      <Head>
        <title>Parker Chan 的作品集 - Tappay Mui</title>
      </Head>
      <Box>
        <Image
          className={classes.tappayMuiTitlLogo}
          src="/img/tappay/tappay-logo.svg"
          alt="tappay"
          width={300}
          height={100}
        />
      </Box>
      <Divider>DirectPay</Divider>
      <Box className={classes.tappayMuiRow}>
        <TextField
          label="卡號"
          value={cardNumber}
          placeholder="**** **** **** ****"
          onChange={e => setCardNumber(e.target.value)}
        />
      </Box>
      <Box className={classes.tappayMuiRow}>
        <TextField
          label="卡片到期日"
          value={expirationDate}
          placeholder="MM / YY"
          onChange={e => setExpirationDate(e.target.value)}
        />
      </Box>
      <Box className={classes.tappayMuiRow}>
        <TextField
          label="卡片後三碼"
          value={ccv}
          placeholder="後三碼"
          onChange={e => setCcv(e.target.value)}
        />
      </Box>
      <Box>
        <Button
          variant="contained"
          onClick={getPrime}
          className={classes.tappayMuiButton}
        >
          <p>取得交易金鑰</p>
        </Button>
      </Box>
    </div>
  );
}

export default TappayMui;
