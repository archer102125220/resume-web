import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import useGTMTrack from '@/hooks/useGTMTrack';
import { importTapPay, tapPayDirectPayInit } from '@/utils/tappay';
import { buttonStyle } from '@/styles/buttonStyle';
import TappayInputField from '@/components/Tappay/InputField';

const styles = theme => ({
  tappayIframeTitlLogo: {
    margin: 'auto',
    display: 'block'
  },
  tappayIframeRow: {
    margin: '10px',
    overflow: 'hidden'
  },
  tappayIframeButton: {
    ...buttonStyle,
    margin: 'auto'
  },
  tappayIframeInputSuccess: {
    color: theme.palette.success.main,
    borderColor: theme.palette.success.main
  },
  tappayIframeInputError: {
    color: theme.palette.error.main,
    borderColor: theme.palette.error.main
  }
});

const useStyles = makeStyles(styles);

function TappayIframe() {
  const [tapPay, setTapPay] = useState(null);
  const [cardNumberStatus, setCardNumberStatus] = useState('');
  const [expirationDateStatus, setExpirationDateStatus] = useState('');
  const [ccvStatus, setCcvStatus] = useState('');
  const [canGetPrime, setCanGetPrime] = useState(false);
  // const [cardNumber, setCardNumber] = useState('6224314183841750');
  // const [expirationDate, setExpirationDate] = useState('10/27');
  // const [ccv, setCcv] = useState('048');

  const cardNumberRef = useRef(null);
  const expirationDateRef = useRef(null);
  const ccvRef = useRef(null);
  const theme = useTheme();

  const classes = useStyles();

  useEffect(() => {
    createdTapPay();
  }, []);
  useEffect(() => {
    if (tapPay !== null) {
      tapPayDirectPayInit(
        {
          fields: {
            number: {
              element: cardNumberRef.current,
              placeholder: '**** **** **** ****'
            },
            expirationDate: {
              element: expirationDateRef.current,
              placeholder: 'MM / YY'
            },
            ccv: {
              element: ccvRef.current,
              placeholder: '驗證碼'
            }
          },
          styles: {
            '.valid': {
              color: theme.palette.success.main
            },
            '.invalid': {
              color: theme.palette.error.main
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

  useGTMTrack({ event: 'scnOpen', url: '/portfolio/tappay/tappay-iframe' });

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
    if (update.status.number === 2) {
      setCardNumberStatus(classes.tappayIframeInputError);
    } else if (update.status.number === 0) {
      setCardNumberStatus(classes.tappayIframeInputSuccess);
    } else {
      setCardNumberStatus('');
    }

    if (update.status.expiry === 2) {
      setExpirationDateStatus(classes.tappayIframeInputError);
    } else if (update.status.expiry === 0) {
      setExpirationDateStatus(classes.tappayIframeInputSuccess);
    } else {
      setExpirationDateStatus('');
    }

    if (update.status.ccv === 2) {
      setCcvStatus(classes.tappayIframeInputError);
    } else if (update.status.ccv === 0) {
      setCcvStatus(classes.tappayIframeInputSuccess);
    } else {
      setCcvStatus('');
    }

    setCanGetPrime(update.canGetPrime);
    console.log(update);
  }

  function getPrime() {
    const tappayStatus = tapPay.card.getTappayFieldsStatus();
    console.log(tappayStatus);

    tapPay.getPrime(result => {
      console.log(result);
    });
  }

  return (
    <div>
      <Head>
        <title>Parker Chan 的作品集 - Tappay Ui</title>
      </Head>
      <Box>
        <Image
          className={classes.tappayIframeTitlLogo}
          src="/img/tappay-logo.svg"
          alt="tappay"
          width={500}
          height={100}
        />
      </Box>
      <Divider>DirectPay</Divider>
      <Box className={classes.tappayIframeRow}>
        <TappayInputField
          label="卡號"
          ref={cardNumberRef}
          inputStatusClassName={cardNumberStatus}
        />
      </Box>
      <Box className={classes.tappayIframeRow}>
        <TappayInputField
          label="卡片到期日"
          ref={expirationDateRef}
          inputStatusClassName={expirationDateStatus}
        />
      </Box>
      <Box className={classes.tappayIframeRow}>
        <TappayInputField
          label="卡片驗證碼"
          ref={ccvRef}
          inputStatusClassName={ccvStatus}
        />
      </Box>
      <Box>
        <Button
          variant="contained"
          onClick={getPrime}
          disabled={canGetPrime === false}
          className={classes.tappayIframeButton}
        >
          <p>取得交易金鑰</p>
        </Button>
      </Box>
    </div>
  );
}

export default TappayIframe;
