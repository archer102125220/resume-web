import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import useGTMTrack from '@/hooks/useGTMTrack';
import { importTapPay, tapPayDirectPayInit } from '@/utils/tappay';

const rowStyle = {
  margin: '10px'
};

function TappayMui() {
  const [tapPay, setTapPay] = useState(null);
  const [cardNumber, setCardNumber] = useState('6224314183841750');
  const [expirationDate, setExpirationDate] = useState('10/27');
  const [ccv, setCcv] = useState('048');

  const cardNumberRef = useRef(null);
  const expirationDateRef = useRef(null);
  const ccvRef = useRef(null);

  useEffect(() => {
    createdTapPay();
  }, []);
  useEffect(() => {
    if (tapPay !== null) {
      tapPayDirectPayInit(
        {
          fields: {
            number: {
              element: cardNumberRef.current
            },
            expirationDate: {
              element: expirationDateRef.current
            },
            ccv: {
              element: ccvRef.current
            }
          },
          styles: {
            '.valid': {
              color: 'green'
            },
            '.invalid': {
              color: 'red'
            }
          },
          isMaskCreditCardNumber: true,
          maskCreditCardNumberRange: {
            beginIndex: 6,
            endIndex: 11
          }
        },
        tapPayUpdate
      );
    }
  }, [tapPay]);
  useGTMTrack({ event: 'scnOpen', url: '/portfolio/tappay' });

  async function createdTapPay() {
    try {
      const _tapPay = await importTapPay(
        process.env.TAPPAY_APP_ID,
        process.env.TAPPAY_APP_KEY,
        process.env.TAPPAY_PROD
      );
      console.log(_tapPay);
      console.dir(_tapPay.card);
      setTapPay(_tapPay);
    } catch (error) {
      console.log(error);
    }
  }

  function tapPayUpdate(update) {
    console.log(update);
  }

  return (
    <div>
      <Head>
        <title>Parker Chan 的作品集 - Tappay串接</title>
      </Head>
      <Box sx={rowStyle}>
        {/* <TextField
          label="卡號"
          value={cardNumber}
          inputRef={cardNumberRef}
          placeholder="**** **** **** ****"
          onChange={e => setCardNumber(e.target.value)}
        /> */}
        <div ref={cardNumberRef} />
      </Box>
      <Box sx={rowStyle}>
        <TextField
          label="卡片到期日"
          value={expirationDate}
          inputRef={expirationDateRef}
          placeholder="MM / YY"
          onChange={e => setExpirationDate(e.target.value)}
        />
      </Box>
      <Box sx={rowStyle}>
        <TextField
          label="卡片後三碼"
          value={ccv}
          inputRef={ccvRef}
          placeholder="後三碼"
          onChange={e => setCcv(e.target.value)}
        />
      </Box>
    </div>
  );
}

export default TappayMui;
